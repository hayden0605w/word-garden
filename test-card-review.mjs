import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const catalog=JSON.parse(fs.readFileSync('_site/assets/catalog.json','utf8')).words;
const review=JSON.parse(fs.readFileSync('source/card-review.json','utf8'));
const template=fs.readFileSync('source/index.template.html','utf8');
const visuals=fs.readFileSync('source/card-visuals.js','utf8').replace('/* CARD_REVIEW_DATA */',JSON.stringify(review));
const spatial=template.slice(template.indexOf('const spatialScenes='),template.indexOf('const pronunciationCache='));
const ctx={Map,esc:s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;'),zhText:s=>s};vm.createContext(ctx);vm.runInContext(visuals+'\n'+spatial,ctx);
assert.equal(Object.keys(review).length,1211);
for(const row of catalog){assert(review[row.word],row.word);const html=vm.runInContext('reviewedArt('+JSON.stringify({...row,emoji:review[row.word].originalEmoji})+')',ctx);assert(html.length>20,row.word);assert(!html.includes('undefined'),row.word);assert(!/[\u3400-\u9fff]/.test(html),'Chinese caption remains: '+row.word);assert(review[row.word].zh.trim(),row.word)}
for(const word of ['actress','actually','after','afternoon']){const art=vm.runInContext('reviewedArt('+JSON.stringify({word})+')',ctx);assert(!art.includes('visual-context'),word);assert(!art.includes('🔄'),word)}
assert.notEqual(vm.runInContext("reviewedArt({word:'January'})",ctx),vm.runInContext("reviewedArt({word:'February'})",ctx));assert.notEqual(vm.runInContext("reviewedArt({word:'Monday'})",ctx),vm.runInContext("reviewedArt({word:'Friday'})",ctx));assert.notEqual(vm.runInContext("reviewedArt({word:'five'})",ctx),vm.runInContext("reviewedArt({word:'ten'})",ctx));assert.notEqual(vm.runInContext("reviewedArt({word:'May'})",ctx),vm.runInContext("reviewedArt({word:'may'})",ctx));
assert.equal(vm.runInContext("cardMeaning({word:'download',zh:'解除安裝'})",ctx),'下載');assert.equal(vm.runInContext("cardMeaning({word:'download',zh:'我的自訂意思'})",ctx),'我的自訂意思');assert.equal(vm.runInContext("reviewedArt({word:'apple',emoji:'🌟'})",ctx),'');assert(vm.runInContext("art({word:'after',image:'https://example.com/photo.png'})",ctx).includes('photo.png'));
console.log('PASS: all 1211 cards covered and renderable; scenario replacements, distinct numbers/dates, May/may, old meaning corrections and custom content preservation');
