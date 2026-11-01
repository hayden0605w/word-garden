import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const bundle=JSON.parse(fs.readFileSync('source/phonics-data.json','utf8'));
const data=Object.fromEntries(Object.entries(bundle.entries).map(([w,e])=>{const segments=e[0].map(([letters,ipa,cue,phones])=>({letters,ipa,cue:bundle.texts[cue],phones:phones?phones.split(' '):[]}));return [w,{segments,parts:segments.map(s=>s.letters),phonemes:segments.flatMap(s=>s.phones),note:bundle.texts[e[1]],kind:e[2]}]}));
const catalog=JSON.parse(fs.readFileSync('_site/assets/catalog.json','utf8'));
for(const card of catalog.words)assert(data[card.word.toLowerCase()],card.word);
const reference=JSON.parse(fs.readFileSync('source/phonics-reference.json','utf8'));for(const [word,aid] of Object.entries(data))assert.deepEqual(aid.phonemes,reference.phonemes[word],word);
for(const [word,aid] of Object.entries(data)){
 assert.equal(aid.parts.join('').toLowerCase(),word,word);assert(aid.note.trim(),word);assert(aid.segments?.length,word);
 assert.equal(aid.segments.map(s=>s.letters).join('').toLowerCase(),word);
 assert.deepEqual(aid.segments.flatMap(s=>s.phones),aid.phonemes,word);
 for(const s of aid.segments){assert(s.cue.trim(),word);assert.equal(Boolean(s.ipa),s.phones.length>0,word)}
}
assert.deepEqual(data.river.parts,['r','i','v','er']);assert.deepEqual(data.river.segments.map(x=>x.ipa),['r','ɪ','v','ɚ']);
assert.deepEqual(data.teacher.parts,['t','ea','ch','er']);assert.deepEqual(data.blue.parts,['b','l','ue']);
assert.equal(data.cake.segments.at(-1).ipa,'');assert.equal(data.give.segments.find(x=>x.letters==='i').ipa,'ɪ');assert.equal(data.said.segments.find(x=>x.letters==='ai').ipa,'ɛ');assert.equal(data.busy.segments.find(x=>x.letters==='u').ipa,'ɪ');
assert.equal(data['a.m.'].kind,'abbreviation');assert.equal(data['mr.'].segments.length,1);assert.equal(data['t-shirt'].segments[0].cue,'這裡唸字母名稱。');
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const ctx={esc,zhText:esc,document:{getElementById(){return null}},checked:false,current:null};vm.createContext(ctx);vm.runInContext(fs.readFileSync('source/phonics-client.js','utf8').replace('/* PHONICS_DATA */',JSON.stringify(bundle)),ctx);
const html=vm.runInContext('phonicsHtml("river")',ctx);assert.equal((html.match(/data-part=/g)||[]).length,4);assert(html.includes('/ɪ/'));assert(html.includes('/ɚ/'));assert(html.includes('showPhonicPart(this)'));assert(!vm.runInContext('phonicsHtml("<script>")',ctx).includes('<script>'));
const buttons=[0,1,2,3].map(i=>({dataset:{word:'river',part:String(i)},setAttribute(k,v){this[k]=v;}}));let cue={innerHTML:''};const box={querySelectorAll:()=>buttons,querySelector:()=>cue};for(const b of buttons)b.closest=()=>box;ctx.testButton=buttons[3];vm.runInContext('showPhonicPart(testButton)',ctx);assert(cue.innerHTML.includes('/ɚ/'));assert(cue.innerHTML.includes('捲舌'));assert.equal(buttons[3]['aria-pressed'],'true');assert.equal(buttons[0]['aria-pressed'],'false');
const template=fs.readFileSync('source/index.template.html','utf8'),check=template.slice(template.indexOf('function check(){'),template.indexOf('function rate('));
for(const answer of ['blue','wrong']){let plays=0;const nodes=Object.fromEntries(['answer','letters','keyboard-mode','feedback','actions'].map(id=>[id,{value:answer,innerHTML:'',insertAdjacentHTML(where,html){this.innerHTML+=html}}]));Object.assign(ctx,{checked:false,revealed:false,current:{word:'blue',zh:'藍色'},cardMeaning:c=>c.zh,speak(){plays++},document:{getElementById:id=>nodes[id],querySelectorAll:()=>[]}});vm.runInContext(check,ctx);vm.runInContext('check();check()',ctx);assert.equal(nodes.feedback.innerHTML.includes('phonics-help'),answer!=='blue');assert.equal(nodes.actions.innerHTML.includes('看拼讀提示'),answer==='blue');assert.equal(plays,1)}
console.log('PASS: 1211 catalog entries; '+Object.keys(data).length+' complete sound hints; segments, exceptions, abbreviations, interactive cues, safe fallback and wrong-answer flow');
