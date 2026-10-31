from pathlib import Path
import hashlib,io,json,zipfile,shutil
root=Path(__file__).parent
out=root/'_site'
out.mkdir(exist_ok=True)
for name in ['index.html','sources.html','social-preview.png']:shutil.copy2(root/name,out/name)
manifest=root/'assets-parts/manifest.json'
if manifest.exists():
    chunks=[]
    for entry in json.loads(manifest.read_text()):
        blob=(root/entry['path']).read_bytes()
        if len(blob)!=entry['size'] or hashlib.sha256(blob).hexdigest()!=entry['sha256']:raise ValueError('Asset checksum failed: '+entry['path'])
        chunks.append(blob)
    archive=io.BytesIO(b''.join(chunks))
else:archive=root/'assets.zip'
with zipfile.ZipFile(archive) as z:
    for entry in z.infolist():
        target=(out/entry.filename).resolve()
        if not target.is_relative_to(out.resolve()):raise ValueError('Unsafe archive path')
    z.extractall(out)
# Small reviewed pronunciation replacements overlay the original bundled archive.
overrides=root/'audio-overrides/manifest.json'
if overrides.exists():
    pronunciation_path=out/'assets/pronunciations.json'
    pronunciations=json.loads(pronunciation_path.read_text())
    for word,entry in json.loads(overrides.read_text()).items():
        entry=dict(entry)
        filename=entry.pop('file')
        shutil.copy2(root/'audio-overrides'/filename,out/entry['url'])
        pronunciations[word]=entry
    pronunciation_path.write_text(json.dumps(pronunciations,ensure_ascii=False,separators=(',',':')))
shutil.copytree(root/'vendor',out/'vendor',dirs_exist_ok=True)
(out/'.nojekyll').touch()
print('GitHub Pages build complete')
