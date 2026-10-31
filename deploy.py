from pathlib import Path
import hashlib,io,json,zipfile,shutil
root=Path(__file__).parent
out=root/'_site'
out.mkdir(exist_ok=True)
for name in ['index.html','sources.html']:shutil.copy2(root/name,out/name)
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
(out/'.nojekyll').touch()
print('GitHub Pages build complete')
