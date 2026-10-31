import fs from 'node:fs';
const html=fs.readFileSync('source/index.template.html','utf8')
.replace('/* SYNC_CLIENT */',fs.readFileSync('source/gist-core.mjs','utf8').replace(/^export /gm,'')+'\n'+fs.readFileSync('source/gist-sync.js','utf8')+'\n'+fs.readFileSync('source/pairing-core.mjs','utf8').replace(/^export /gm,'')+'\n'+fs.readFileSync('source/pairing-client.js','utf8'))
.replace('/* ZHUYIN_CLIENT */',fs.readFileSync('source/zhuyin.js','utf8').replace('/* ZHUYIN_DATA */',fs.readFileSync('source/zhuyin-data.json','utf8')));
new Function(html.match(/<script>([\s\S]*)<\/script>/)[1]);
fs.writeFileSync('index.html',html);
console.log('Rebuilt GitHub Pages index.html');
