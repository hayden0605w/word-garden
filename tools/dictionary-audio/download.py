"""Checkpointed, single-worker Free Dictionary pronunciation review/download.
Never bypass a rate limit. No website assets are replaced automatically.
"""
import datetime, hashlib, json, os, pathlib, subprocess, time, urllib.error, urllib.parse, urllib.request
SOURCE=pathlib.Path(__file__).resolve().parent
ROOT=SOURCE/'work'; ROOT.mkdir(exist_ok=True)
seed=json.loads((SOURCE/'seed.json').read_text())
for folder in ('dictionary','commons','downloads'):(ROOT/folder).mkdir(exist_ok=True)
for folder in ('dictionary','commons'):
    for name,data in seed[folder].items():
        p=ROOT/folder/name
        if not p.exists():p.write_text(json.dumps(data,ensure_ascii=False))
if not (ROOT/'download-state.json').exists():
    initial=seed['state']
    # Download results must be revalidated on each new runner unless restored from cache.
    initial['words']={w:v for w,v in initial['words'].items() if v['status']!='downloaded'}
    (ROOT/'download-state.json').write_text(json.dumps(initial,ensure_ascii=False))
DEADLINE=time.monotonic()+int(os.environ.get('AUDIO_MAX_SECONDS','5400'))

CACHE=ROOT/'dictionary'
OUT=ROOT/'downloads'; OUT.mkdir(exist_ok=True)
META=ROOT/'media'; META.mkdir(exist_ok=True)
STATE=ROOT/'download-state.json'
RECORDS=seed['records']
state=json.loads(STATE.read_text()) if STATE.exists() else {'words':{},'started':datetime.datetime.now(datetime.timezone.utc).isoformat()}
last_request=0
KNOWN_IDS={}
for cached_file in (ROOT/'commons').glob('*.json'):
    raw=json.loads(cached_file.read_text())
    for page in raw.get('query',{}).get('pages',{}).values():
        if page.get('pageid',-1)>0:KNOWN_IDS[urllib.parse.unquote(page['title']).replace('_',' ').lower()]=str(page['pageid'])
    for redirect in raw.get('query',{}).get('redirects',[]):
        to=urllib.parse.unquote(redirect['to']).replace('_',' ').lower()
        if to in KNOWN_IDS:KNOWN_IDS[urllib.parse.unquote(redirect['from']).replace('_',' ').lower()]=KNOWN_IDS[to]


def save(path,value):
    temporary=path.with_suffix(path.suffix+'.tmp')
    temporary.write_text(json.dumps(value,ensure_ascii=False,indent=2)); temporary.replace(path)

def checkpoint():
    state['total']=len(RECORDS)
    state['updated']=datetime.datetime.now(datetime.timezone.utc).isoformat()
    state['counts']={s:sum(v['status']==s for v in state['words'].values()) for s in sorted({v['status'] for v in state['words'].values()})}
    save(STATE,state)

def request(url):
    global last_request
    wait=5-(time.monotonic()-last_request)
    if wait>0:time.sleep(wait)
    if time.monotonic()>DEADLINE:
        state['stop_reason']='time_budget';checkpoint();raise SystemExit('Time budget reached; resume from saved checkpoint')
    last_request=time.monotonic()
    req=urllib.request.Request(url,headers={'User-Agent':'WordGarden/1.0 (educational pronunciation verification; single worker)'})
    try:
        with urllib.request.urlopen(req,timeout=35) as response:return response.read()
    except urllib.error.HTTPError as error:
        if error.code in (429,503):
            raw=error.headers.get('Retry-After','')
            try:delay=max(900,int(raw))
            except ValueError:delay=900
            state['paused_until']=time.time()+delay
            state['pause_reason']='HTTP '+str(error.code)
            checkpoint()
            print('PAUSED',error.code,'seconds',delay,flush=True)
            raise SystemExit('Rate limited; stopped without retry. Checkpoint retained; resume only after cooldown.')
        raise

def key(word):return urllib.parse.quote(word,safe='')
def identity(url):return urllib.parse.parse_qs(urllib.parse.urlparse(url or '').query).get('curid',[None])[0]
def title(url):return urllib.parse.unquote((url or '').split('/wiki/')[-1]).replace('_',' ').lower()

def process(word,current):
    path=CACHE/(key(word)+'.json')
    data=json.loads(path.read_text()) if path.exists() else {}
    if data.get('deferred') or data.get('status') not in ('ok','not_found'):
        try:
            entries=json.loads(request('https://api.dictionaryapi.dev/api/v2/entries/en/'+key(word)))
            clips=[]
            for entry in entries:
                for clip in entry.get('phonetics',[]):
                    if clip.get('audio') and not any(x['audio']==clip['audio'] for x in clips):clips.append(clip)
            data={'word':word,'status':'ok','clips':clips}
        except urllib.error.HTTPError as error:
            if error.code!=404:raise
            data={'word':word,'status':'not_found','clips':[]}
        save(path,data)
    clips=data.get('clips',[])
    if not clips:return {'status':'no_dictionary_entry' if data['status']=='not_found' else 'no_dictionary_audio'}
    preferred=next((x for x in clips if '-us.' in x['audio']),clips[0])
    result={'preferred':preferred}
    if (identity(current.get('source')) or KNOWN_IDS.get(title(current.get('source'))))==identity(preferred.get('sourceUrl')) and identity(preferred.get('sourceUrl')):
        return dict(result,status='already_matches')
    # The source URL supplied by the dictionary identifies the exact recording.
    source=preferred.get('sourceUrl','');pageid=identity(source)
    if not pageid:return dict(result,status='source_needs_review')
    metadata=META/(pageid+'.json')
    if metadata.exists():info=json.loads(metadata.read_text())
    else:
        query=urllib.parse.urlencode({'action':'query','pageids':pageid,'prop':'imageinfo','iiprop':'url|extmetadata','format':'json'})
        raw=json.loads(request('https://commons.wikimedia.org/w/api.php?'+query))
        page=next(iter(raw.get('query',{}).get('pages',{}).values()),{})
        info={'title':page.get('title'),'imageinfo':page.get('imageinfo',[])}
        save(metadata,info)
    if title(current.get('source'))==title(info.get('title')):return dict(result,status='already_matches')
    if not info.get('imageinfo'):return dict(result,status='source_needs_review')
    media=info['imageinfo'][0];url=media.get('url','')
    if not url.startswith('https://upload.wikimedia.org/'):return dict(result,status='source_needs_review')
    ext=pathlib.PurePosixPath(urllib.parse.urlparse(url).path).suffix.lower()
    if ext not in ('.ogg','.oga','.wav','.mp3','.flac'):return dict(result,status='unsupported_media')
    filename=key(word)+'-'+pageid+ext;target=OUT/filename
    if not target.exists():
        blob=request(url)
        if len(blob)<100:raise ValueError('Empty or invalid audio')
        temporary=target.with_suffix(ext+'.part');temporary.write_bytes(blob);temporary.replace(target)
    probe=subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','json',str(target)],capture_output=True,text=True)
    if probe.returncode:raise ValueError('Audio validation failed')
    duration=float(json.loads(probe.stdout)['format']['duration'])
    if not 0.05<duration<20:raise ValueError('Unexpected audio duration: '+str(duration))
    return dict(result,status='downloaded',file=filename,sha256=hashlib.sha256(target.read_bytes()).hexdigest(),duration=duration,commons=info)

print('START single worker, minimum request interval 5 seconds',flush=True)
if state.get('paused_until',0)>time.time():raise SystemExit('Server cooldown remains active; not making requests')
state.pop('paused_until',None);state.pop('pause_reason',None);state.pop('finished',None);checkpoint()
# Reuse verified API cache first; deferred placeholders must be fetched again.
def cached(item):
    p=CACHE/(key(item[0])+'.json')
    if not p.exists():return False
    d=json.loads(p.read_text());return not d.get('deferred') and d.get('status') in ('ok','not_found')
items=sorted(RECORDS.items(),key=lambda x:not cached(x))
for word,current in items:
    previous=state['words'].get(word,{})
    if previous.get('status')=='downloaded' and not (OUT/previous.get('file','')).is_file():previous={}
    if previous.get('status') not in (None,'error'):continue
    try:result=process(word,current)
    except Exception as error:result={'status':'error','error':str(error)}
    state['words'][word]=result;state['current_word']=word;checkpoint()
    print(len(state['words']),word,result['status'],state['counts'],flush=True)
state['finished']=datetime.datetime.now(datetime.timezone.utc).isoformat();checkpoint()
print('FINISHED',state['counts'],flush=True)
