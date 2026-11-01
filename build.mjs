import fs from 'node:fs';
const html=fs.readFileSync('source/index.template.html','utf8')
.replace('/* GARDEN_CLIENT */',fs.readFileSync('source/garden-client.js','utf8'))
.replace('/* PHONICS_CLIENT */',fs.readFileSync('source/phonics-client.js','utf8').replace('/* PHONICS_DATA */',fs.readFileSync('source/phonics-data.json','utf8')))
.replace('/* SCENE_ART */',fs.readFileSync('source/scene-art.js','utf8').replace('/* SCENE_PLAN */',fs.readFileSync('source/scene-plan.json','utf8')))
.replace('/* CARD_VISUALS */',fs.readFileSync('source/card-visuals.js','utf8').replace('/* CARD_REVIEW_DATA */',fs.readFileSync('source/card-review.json','utf8')))
.replace('/* SYNC_CLIENT */',fs.readFileSync('source/garden-core.mjs','utf8').replace(/^export /gm,'')+'\n'+fs.readFileSync('source/gist-core.mjs','utf8').replace(/^import .*$/gm,'').replace(/^export /gm,'')+'\n'+fs.readFileSync('source/gist-sync.js','utf8')+'\n'+fs.readFileSync('source/pairing-core.mjs','utf8').replace(/^export /gm,'')+'\n'+fs.readFileSync('source/pairing-client.js','utf8'))
.replace('/* ZHUYIN_CLIENT */',fs.readFileSync('source/zhuyin.js','utf8').replace('/* ZHUYIN_DATA */',fs.readFileSync('source/zhuyin-data.json','utf8')));
new Function(html.match(/<script>([\s\S]*)<\/script>/)[1]);
fs.writeFileSync('index.html',html);
console.log('Rebuilt GitHub Pages index.html');
