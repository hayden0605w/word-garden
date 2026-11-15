import assert from 'node:assert/strict';
import {gardenProgress,gardenPractice,mergeGardenEvents,cleanGardenEvents,mergeFlowerbeds,flowerbedChallenges} from './source/garden-core.mjs';
import {cleanLearning,emptyDevice,recordChanges,materialize,mergeOwnDevice,seal,unseal,bytesToBase64} from './source/gist-core.mjs';
const date='2026-11-01';const base={cards:[{id:'card1',word:'river',zh:'河流',reps:0,due:0,interval:0}],history:{}};
assert.deepEqual(cleanLearning(base).garden,{events:{}});let g=gardenPractice(null,'river',date,0);assert.equal(gardenProgress(g,date).water,1);assert(!gardenProgress(g,date).badges.find(b=>b.id==='helper').earned);
g=gardenPractice(g,'river',date,2);assert.equal(gardenProgress(g,date).water,1);assert(gardenProgress(g,date).badges.find(b=>b.id==='helper').earned);
g=gardenPractice(g,'river',date,2);assert.equal(gardenProgress(g,date).water,1);
const alpha=n=>String.fromCharCode(97+Math.floor(n/26))+String.fromCharCode(97+n%26);
for(let i=0;i<50;i++)g=gardenPractice(g,'word'+alpha(i),date,2);
assert.equal(gardenProgress(g,date).water,20);assert(gardenProgress(g,date).badges.find(b=>b.id==='words').earned);
for(let i=0;i<10;i++)g=gardenPractice(g,'word'+alpha(i),'2026-11-02',1);
assert.equal(gardenProgress(g,date).water,30);assert.equal(gardenProgress(g,date).flowers,1);assert.equal(gardenProgress(g,date).growth,0);
assert.equal(gardenProgress(g,'2030-01-01').water,30);assert.equal(gardenProgress(g,'2030-01-01').flowers,1);
const laterCorrection=gardenPractice(gardenPractice(null,'moon',date,0),'moon','2026-11-02',2);assert(gardenProgress(laterCorrection,'2026-11-02').badges.find(b=>b.id==='helper').earned);
const a=gardenPractice(null,'river',date,0),b=gardenPractice(null,'river',date,2);const merged=mergeGardenEvents(a.events,b.events);assert.equal(gardenProgress({events:merged},date).water,1);assert.deepEqual(mergeGardenEvents(merged,a.events,b.events),merged);
let devA=recordChanges(emptyDevice('device-aaaa'),base,{...base,garden:a},10),devB=recordChanges(emptyDevice('device-bbbb'),base,{...base,garden:b},11);
let material=materialize(base,[devA,devB]);assert.equal(gardenProgress(material.garden,date).water,1);assert.equal(material.cards[0].word,'river');assert.deepEqual(materialize(base,[devB,devA]),material);
const corrected=gardenPractice(material.garden,'river',date,2);devA=recordChanges(devA,material,{...material,garden:corrected},12);material=materialize(base,[devA,devB]);assert(gardenProgress(material.garden,date).badges.find(b=>b.id==='helper').earned);
const remote=structuredClone(devA);remote.gardenEvents={...remote.gardenEvents,...gardenPractice(null,'star',date,2).events};const own=mergeOwnDevice(devA,remote);assert.equal(gardenProgress({events:own.gardenEvents},date).water,2);assert.deepEqual(mergeOwnDevice(own,remote),own);
const rid='r:11111111-1111-1111-1111-111111111111';const rounds={...merged,[rid]:{type:'round',day:date,count:5}};assert.equal(gardenProgress({events:mergeGardenEvents(rounds,rounds)},date).rounds,1);
assert.throws(()=>cleanGardenEvents({'p:wrong':{type:'practice',day:date,word:'river'}}));assert.throws(()=>cleanGardenEvents({'r:bad':{type:'round',day:date,count:5}}));
const key=bytesToBase64(crypto.getRandomValues(new Uint8Array(32)));assert.deepEqual(await unseal(await seal(material,key),key),material);
console.log('PASS: legacy migration, wrong-answer reward, daily dedup/cap, correction badge, growth, no inactivity penalty, two-device merge, own-device recovery, round dedup, validation and encrypted round trip');

const bed = {started:date,choices:{0:{at:100,value:0}}};
const challengeDays = ['2026-11-02','2026-11-03','2026-11-04'];
let challenge = gardenPractice({events:{},flowerbed:bed},'old',date,2);
for(const day of challengeDays){
  challenge = gardenPractice(challenge,'river',day,0);
  challenge = gardenPractice(challenge,'river',day,2);
}
assert.equal(flowerbedChallenges(challenge,challengeDays[2])[0].dayCount,1);
assert.equal(flowerbedChallenges(challenge,challengeDays[2])[1].wordCount,1);
for(const [i,word] of ['star','sun','moon','tree'].entries()){
  const day=challengeDays[i%3];
  challenge=gardenPractice(challenge,word,day,0);
  challenge=gardenPractice(challenge,word,day,2);
}
assert.equal(flowerbedChallenges(challenge,challengeDays[2])[0].unlocked,true);
assert.equal(flowerbedChallenges(challenge,challengeDays[1])[0].unlocked,false);
const plotA=recordChanges(emptyDevice('plot-device-a'),base,{...base,garden:challenge},100);
const plotB=recordChanges(emptyDevice('plot-device-b'),base,{...base,garden:{events:{},flowerbed:{started:challengeDays[0],choices:{1:{at:101,value:2}}}}},101);
const flowerbedState=materialize(base,[plotA,plotB]);
assert.equal(flowerbedState.garden.flowerbed.started,date);
assert.equal(flowerbedState.garden.flowerbed.choices[0].value,0);
assert.equal(flowerbedState.garden.flowerbed.choices[1].value,2);
assert.equal(mergeFlowerbeds(bed,{choices:{0:{at:101,value:-1}}}).choices[0].value,-1);
assert.equal(mergeOwnDevice(plotA,{...plotA,flowerbed:undefined}).flowerbed.started,date);
console.log('PASS: challenge start and distinct days, placement and removal, cross-device merge');
