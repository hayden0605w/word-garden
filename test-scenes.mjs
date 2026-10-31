import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const root=fs.existsSync('source/scene-art.js')?'source/':'.github-release/source/';
const review=JSON.parse(fs.readFileSync(root+'card-review.json','utf8'));
const plan=JSON.parse(fs.readFileSync(root+'scene-plan.json','utf8'));
const ctx={esc:s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'),reviewSVG:c=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 180"><rect width="280" height="180" rx="22" fill="#f2f5e8"/>'+c+'</svg>'};vm.createContext(ctx);vm.runInContext(fs.readFileSync(root+'scene-art.js','utf8').replace('/* SCENE_PLAN */',JSON.stringify(plan)),ctx);
const seg=new Intl.Segmenter('zh',{granularity:'grapheme'});
for(const [word,entry] of Object.entries(plan)){assert(review[word],word);const html=vm.runInContext('unifiedSceneArt('+JSON.stringify(word)+')',ctx);assert(html.length>20,word);assert(!html.includes('NaN')&&!html.includes('undefined'),word);assert(!/[\u3400-\u9fff]/.test(html),'Chinese caption '+word);if(entry.scene){assert(html.startsWith('<svg'),word);assert(!html.includes('review-symbol'),word)}else assert.equal([...seg.segment(entry.symbol)].length,1,word)}
const multi=Object.keys(review).filter(w=>!review[w].symbol.startsWith('@')&&[...seg.segment(review[w].symbol)].length>1);
assert(multi.every(w=>plan[w]),'all old multi-emoji entries have a replacement');
for(const word of ['busy','but','actually','after','give','borrow','buy']){assert(plan[word].scene,word);assert(vm.runInContext('unifiedSceneArt('+JSON.stringify(word)+')',ctx).startsWith('<svg'),word)}
assert.notEqual(vm.runInContext('unifiedSceneArt("busy")',ctx),vm.runInContext('unifiedSceneArt("but")',ctx));
console.log(`PASS: ${multi.length} multi-icon replacements covered; ${Object.keys(plan).length} reviewed plans render; no caption text, missing scenes or pasted emoji inside SVG scenes`);
