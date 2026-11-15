export const GARDEN_PLANTS=[{name:'向日葵',color:'#efbd43',center:'#80583c',icon:'🌻'},{name:'櫻花',color:'#f2abc5',center:'#e3b453',icon:'🌸'},{name:'小雛菊',color:'#fff8e9',center:'#e5b742',icon:'🌼'},{name:'鬱金香',color:'#e98879',center:'#e98879',icon:'🌷'},{name:'幸運草',color:'#83b76e',center:'#e1cb65',icon:'🍀'},{name:'薰衣草',color:'#b4a1da',center:'#8f79bf',icon:'🪻'},{name:'藍色小花',color:'#94b9df',center:'#f1d074',icon:'💠'},{name:'草莓花',color:'#fff6f1',center:'#e7bd62',icon:'🍓'}];
export const BASIC_PLANT_COUNT = GARDEN_PLANTS.length;
GARDEN_PLANTS.push(
  {name:'巨型蓮花', icon:'🪷', color:'#e992af', center:'#f4c960', cost:90},
  {name:'藍紫繡球花', icon:'💠', color:'#849dd6', center:'#ad86c4', cost:120},
  {name:'垂枝紫藤', icon:'🪻', color:'#a68bd3', center:'#d6b5ea', cost:150},
  {name:'彩虹花樹', icon:'🌈', color:'#ec9d80', center:'#f4c96e', cost:180}
);

export function gardenPlantProgress(water) {
  const basicWater = BASIC_PLANT_COUNT * 30;
  let threshold = basicWater;
  let rareCount = 0;
  for (const plant of GARDEN_PLANTS.slice(BASIC_PLANT_COUNT)) {
    if (water < threshold + plant.cost) break;
    threshold += plant.cost;
    rareCount++;
  }
  const nextRareIndex = BASIC_PLANT_COUNT + rareCount;
  const rareTarget = water >= basicWater && nextRareIndex < GARDEN_PLANTS.length;
  const index = rareTarget ? nextRareIndex : Math.floor(water / 30) % BASIC_PLANT_COUNT;
  const goal = rareTarget ? GARDEN_PLANTS[index].cost : 30;
  const drops = rareTarget ? water - threshold : water % 30;
  return {
    index, goal, drops, rareCount, rareTarget,
    available:Math.min(Math.floor(water / 30), BASIC_PLANT_COUNT) + rareCount,
    stage:drops * 6 < goal ? 0 : drops * 2 < goal ? 1 : 2
  };
}

export function cleanGardenEvents(input={}){if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).length>40000)throw Error('花園進度格式不正確');const out={};for(const [id,e] of Object.entries(input)){if(!e||!/^\d{4}-\d{2}-\d{2}$/.test(e.day))throw Error('花園日期錯誤');if(e.type==='practice'){if(typeof e.word!=='string'||!/^[a-z][a-z .'-]{0,59}$/.test(e.word)||id!==`p:${e.day}:${e.word}`)throw Error('花園練習紀錄錯誤');out[id]={type:'practice',day:e.day,word:e.word,correct:e.correct===true,needsHelp:e.needsHelp===true,corrected:e.corrected===true}}else if(e.type==='round'){if(!/^r:[a-f0-9-]{36}$/.test(id)||!Number.isSafeInteger(e.count)||e.count<1||e.count>2000)throw Error('花園回合紀錄錯誤');out[id]={type:'round',day:e.day,count:e.count}}else throw Error('花園紀錄類型錯誤')}return out}
export function mergeGardenEvents(...sources){const merged={};for(const source of sources)for(const [id,e] of Object.entries(cleanGardenEvents(source||{}))){const old=merged[id];if(!old)merged[id]=e;else if(e.type==='practice')merged[id]={...e,correct:old.correct||e.correct,needsHelp:old.needsHelp||e.needsHelp,corrected:old.corrected||e.corrected};else merged[id]={...old,count:Math.max(old.count,e.count)}}return cleanGardenEvents(merged)}
export function gardenProgress(input,today){const events=cleanGardenEvents(input?.events||{}),days={},words=new Set(),corrected=new Set();let rounds=0;for(const e of Object.values(events)){if(e.type==='round'){rounds++;continue}days[e.day]=(days[e.day]||0)+1;if(e.correct)words.add(e.word);if(e.corrected)corrected.add(e.word)}const water=Object.values(days).reduce((n,v)=>n+Math.min(v,20),0),flowers=Math.floor(water/30),growth=water%30;const badges=[{id:'first',icon:'🌱',name:'第一滴水',text:'完成第一張練習',earned:water>=1},{id:'helper',icon:'🦁',name:'勇敢訂正',text:'答錯後再答對一個單字',earned:corrected.size>=1},{id:'bloom',icon:'🌼',name:'第一朵花',text:'養成第一株植物',earned:flowers>=1},{id:'days',icon:'☀️',name:'三日園丁',text:'在不同的三天照顧花園',earned:Object.keys(days).length>=3},{id:'rounds',icon:'🏅',name:'練習小能手',text:'完成五個有新水滴的回合',earned:rounds>=5},{id:'words',icon:'📚',name:'單字探險家',text:'答對五十個不同單字',earned:words.size>=50},{id:'collector',icon:'🌷',name:'花園收藏家',text:'養成三株植物',earned:flowers>=3},{id:'care',icon:'💚',name:'訂正小高手',text:'訂正十個不同單字',earned:corrected.size>=10}];return {water,todayWater:Math.min(days[today]||0,20),flowers,growth,stage:growth<5?0:growth<15?1:2,plant:GARDEN_PLANTS[flowers%BASIC_PLANT_COUNT],target:gardenPlantProgress(water),badges,rounds,words:words.size}}
export function gardenPractice(garden,word,today,grade){const events=mergeGardenEvents(garden?.events),key=`p:${today}:${word.toLowerCase()}`,old=events[key],pendingHelp=Object.values(events).some(e=>e.type==='practice'&&e.word===word.toLowerCase()&&e.needsHelp&&!e.corrected);events[key]={type:'practice',day:today,word:word.toLowerCase(),correct:grade>0||old?.correct===true,needsHelp:grade===0||old?.needsHelp===true,corrected:old?.corrected===true||grade>0&&(old?.needsHelp===true||pendingHelp)};return {...garden,events:cleanGardenEvents(events)}}

export const FLOWERBED_VISITORS = [
  {name:'蝴蝶', icon:'🦋', words:5, days:3, corrected:true},
  {name:'小鳥', icon:'🐦', words:20, days:4, corrected:false},
  {name:'兔子', icon:'🐇', words:10, days:5, corrected:true}
];

export function mergeFlowerbeds(...beds) {
  const result = {started:'', choices:{}};
  for (const bed of beds) {
    if (!bed || typeof bed !== 'object') continue;
    if (typeof bed.started === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(bed.started)) {
      if (!result.started || bed.started < result.started) result.started = bed.started;
    }
    for (const key of ['0','1','2','visitor']) {
      const choice = bed.choices?.[key];
      const max = key === 'visitor' ? FLOWERBED_VISITORS.length : GARDEN_PLANTS.length;
      if (!choice || !Number.isSafeInteger(choice.at) || choice.at < 1 ||
          !Number.isInteger(choice.value) || choice.value < -1 || choice.value >= max) continue;
      const previous = result.choices[key];
      if (!previous || choice.at > previous.at ||
          (choice.at === previous.at && choice.value > previous.value)) {
        result.choices[key] = {at:choice.at, value:choice.value};
      }
    }
  }
  return result;
}

export function flowerbedChallenges(garden, today) {
  const {started} = mergeFlowerbeds(garden?.flowerbed);
  const events = Object.values(garden?.events || {}).filter(event =>
    event.type === 'practice' && started && event.day > started && event.day <= today
  );
  return FLOWERBED_VISITORS.map(visitor => {
    const firstDayByWord = new Map();
    for (const event of events) {
      if (!(visitor.corrected ? event.corrected : event.correct)) continue;
      const firstDay = firstDayByWord.get(event.word);
      if (!firstDay || event.day < firstDay) firstDayByWord.set(event.word,event.day);
    }
    const words = firstDayByWord.size;
    const days = new Set(firstDayByWord.values()).size;
    return {...visitor, wordCount:words, dayCount:days, unlocked:words >= visitor.words && days >= visitor.days};
  });
}
