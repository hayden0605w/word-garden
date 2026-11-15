let gardenRoundId=null,gardenRoundWords=new Set(),gardenRoundCredited=new Set(),gardenRoundStartBadges=[],gardenRoundStartFlowers=0,gardenRoundStartRare=0,gardenRoundFinished=false;
function beginGardenRound(){gardenRoundId='r:'+(typeof crypto.randomUUID==='function'?crypto.randomUUID():Array.from(crypto.getRandomValues(new Uint8Array(16)),b=>b.toString(16).padStart(2,'0')).join('').replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/,'$1-$2-$3-$4-$5'));gardenRoundWords=new Set();gardenRoundCredited=new Set();gardenRoundFinished=false;const p=gardenProgress(db.garden,day());gardenRoundStartBadges=p.badges.filter(b=>b.earned).map(b=>b.id);gardenRoundStartFlowers=p.flowers;gardenRoundStartRare=p.target.rareCount}
function rewardGardenPractice(word,grade){const before=gardenProgress(db.garden,day());db.garden=gardenPractice(db.garden,word,day(),grade);const after=gardenProgress(db.garden,day());gardenRoundWords.add(word.toLowerCase());if(after.water>before.water)gardenRoundCredited.add(word.toLowerCase())}
function finishGardenRound(){if(!gardenRoundId||gardenRoundFinished||!done)return;gardenRoundFinished=true;if(gardenRoundWords.size>=5&&gardenRoundCredited.size){db.garden.events[gardenRoundId]={type:'round',day:day(),count:gardenRoundWords.size};save()}}
function plantArt(index,stage=3,animate=false){if(index>=BASIC_PLANT_COUNT)return rarePlantArt(index,stage,animate);const p=GARDEN_PLANTS[index%GARDEN_PLANTS.length],petals=Array.from({length:index%3===0?10:6},(_,i)=>{const angle=i*360/(index%3===0?10:6);return `<ellipse cx="140" cy="55" rx="14" ry="28" transform="rotate(${angle} 140 82)" fill="${p.color}" stroke="#385b3820" stroke-width="1"/>`}).join('');let bloom=petals+'<circle cx="140" cy="82" r="20" fill="'+p.center+'"/><circle cx="134" cy="79" r="2.5" fill="#fff8dc"/><circle cx="146" cy="79" r="2.5" fill="#fff8dc"/><path d="M134 88q6 5 12 0" fill="none" stroke="#fff8dc" stroke-width="2" stroke-linecap="round"/>';
if(index%8===3)bloom='<path d="M102 63l20 11 18-27 18 27 20-11c0 43-15 59-38 59s-38-16-38-59" fill="'+p.color+'"/><path d="M140 61v47" stroke="#bf685d" stroke-width="3"/>';
if(index%8===4)bloom=Array.from({length:4},(_,i)=>'<path d="M140 84c-37-8-38-39-20-39 10 0 17 9 20 17 4-8 10-17 20-17 18 0 17 31-20 39" transform="rotate('+i*90+' 140 84)" fill="'+(i%2?'#8dbd6a':'#6ba858')+'"/>').join('');
if(index%8===5)bloom='<path d="M140 108V44m-12 66V59m24 49V59" stroke="#6c9851" stroke-width="4"/>'+Array.from({length:5},(_,i)=>'<ellipse cx="140" cy="'+(46+i*11)+'" rx="11" ry="8" fill="'+(i%2?'#aa91d1':'#c1ade0')+'"/>').join('')+'<ellipse cx="125" cy="77" rx="9" ry="18" fill="#bda4dc"/><ellipse cx="155" cy="77" rx="9" ry="18" fill="#bda4dc"/>';
if(index%8===7)bloom+='<path d="M168 132q17-9 25 6c3 12-16 27-16 27s-18-14-16-25q1-6 7-8" fill="#e98075"/><path d="M162 136l8-10 5 8 8-8 5 10" fill="#779f57"/><circle cx="171" cy="144" r="1.5" fill="#f9e5a2"/><circle cx="181" cy="147" r="1.5" fill="#f9e5a2"/>';
return `<svg class="garden-plant-art ${animate?'plant-growing':''}" viewBox="0 0 280 250" role="img" aria-label="${p.name}，${['種子','發芽','長葉','開花'][stage]}"><ellipse cx="140" cy="229" rx="75" ry="9" fill="#6c89561c"/><path d="M87 175h106l-14 52H101z" fill="#cb9677"/><path d="M85 173h110v14H85z" rx="5" fill="#ddb292"/><ellipse cx="140" cy="175" rx="51" ry="7" fill="#8c684c"/>${stage===0?'<ellipse cx="140" cy="171" rx="10" ry="6" fill="#d5bc83"/>':`<path d="M140 173V${stage===1?126:84}" stroke="#6c9851" stroke-width="8" stroke-linecap="round" fill="none"/><path d="M140 148C102 152 94 129 96 119c30-2 44 12 44 29" fill="#94bd67"/><path d="M140 136c37 1 49-22 45-33-29-1-45 15-45 33" fill="#b2d37d"/>${stage>=2?'<path d="M139 111c-30-3-41-18-37-27 24 1 37 13 37 27" fill="#83ad59"/>':''}${stage===2?'<path d="M140 92c-22-14-20-34 0-40 21 6 23 26 0 40" fill="'+p.color+'"/>':''}${stage===3?bloom:''}`}</svg>`}
function growthStage(p){return ['種子休息中','小芽冒出來了','正在長葉子'][p.stage]}
function gardenSidebar(){const p=gardenProgress(db.garden,day());return `<span class="eyebrow">LITTLE GARDENER</span><h3>今天也有小小進步</h3><div class="garden-water-number">💧 ${p.todayWater}<small> / 20 滴</small></div><p class="note">水滴會自動澆灌植物。<br>今天再認真練一點就好。</p><div class="days">${Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-6+i);return `<span class="${db.history[d.toLocaleDateString('en-CA')]?'yes':''}">${['日','一','二','三','四','五','六'][d.getDay()]}</span>`}).join('')}</div><div class="hint">💚 答錯也沒關係<br>完成練習就有水滴，訂正還能收集徽章。漏練不扣點，植物也不會枯死。</div>`}
function gardenSection(){const p=gardenProgress(db.garden,day()),target=p.target;return `<section class="garden-section" aria-labelledby="garden-title"><div class="garden-title-row"><div><div class="eyebrow">YOUR GROWING GARDEN</div><h2 id="garden-title">我的小花園</h2></div><span class="tag">💧 累積 ${p.water} 滴 · 🌼 ${p.flowers+target.rareCount} 株開花</span></div>${renderFlowerbed(p)}<div class="garden-display-grid"><article class="panel garden-current">${plantArt(target.index,target.stage)}<div><span class="tag">${target.rareTarget?'特色植物':'一般植物'} · ${growthStage(target)}</span><h3>${GARDEN_PLANTS[target.index].name}</h3><div class="garden-growth-track" role="progressbar" aria-label="植物開花進度" aria-valuemin="0" aria-valuemax="${target.goal}" aria-valuenow="${target.drops}"><i style="width:${target.drops/target.goal*100}%"></i></div><p><b>${target.drops} / ${target.goal}</b> 滴水 · 還差 ${target.goal-target.drops} 滴開花</p><div class="growth-stages"><span class="${target.stage===0?'current':''}">種子</span><span class="${target.stage===1?'current':''}">發芽</span><span class="${target.stage===2?'current':''}">長葉</span><span>開花</span></div></div></article><article class="panel"><h3>我的植物收藏 <small>${target.available} / ${GARDEN_PLANTS.length} 種</small></h3><div class="plant-collection">${GARDEN_PLANTS.map((plant,i)=>{const count=i<BASIC_PLANT_COUNT?(p.flowers>i?Math.floor((p.flowers-1-i)/BASIC_PLANT_COUNT)+1:0):Number(i<target.available);return `<div class="plant-collection-item ${plant.cost?'plant-rare ':''}${count?'':'plant-locked'}">${count?plantArt(i,3):'<div class="seed-mystery" aria-hidden="true">🌰</div>'}<strong>${count||plant.cost?plant.name:'神祕種子'}</strong><small>${count?'已養成 '+count+' 株':plant.cost?plant.cost+' 滴':i===target.index?'正在照顧':'尚未種下'}</small></div>`}).join('')}</div></article></div><div class="panel garden-badges"><h3>我的成就徽章 <small>${p.badges.filter(b=>b.earned).length} / ${p.badges.length}</small></h3><div class="badge-collection">${p.badges.map(b=>`<div class="garden-badge ${b.earned?'earned':''}"><span aria-hidden="true">${b.earned?b.icon:'🔒'}</span><strong>${b.name}</strong><small>${b.text}</small><em>${b.earned?'已獲得':'繼續探索'}</em></div>`).join('')}</div></div><details class="garden-rules"><summary>水滴與獎勵怎麼獲得？</summary><p>每個不同單字每天第一次完成練習，獲得 1 滴水；答錯也有，每天最多 20 滴。每 30 滴會養成一株一般植物。集滿 8 種後，累積的水滴也會依序澆灌特色植物。重複練同一字不會重複集點，但仍會更新複習進度。回合徽章需完成至少 5 個不同單字，且這回有獲得新水滴。水滴從這次更新後的練習開始累積。水滴、植物和徽章會跟著學習進度同步。</p></details></section>`}
function gardenRoundSummary(){const p=gardenProgress(db.garden,day()),newBadges=p.badges.filter(b=>b.earned&&!gardenRoundStartBadges.includes(b.id)),rareBloom=p.target.rareCount>gardenRoundStartRare,bloom=rareBloom||p.flowers>gardenRoundStartFlowers;return `<div class="garden-round-reward" role="status"><div class="round-plant">${plantArt(rareBloom?BASIC_PLANT_COUNT+p.target.rareCount-1:bloom?(p.flowers-1)%BASIC_PLANT_COUNT:p.target.index,bloom?3:p.target.stage,true)}${gardenRoundCredited.size?'<div class="reward-drops" aria-hidden="true"><span>💧</span><span>💧</span><span>💧</span></div>':''}</div><h2>${bloom?'新的花朵開了！':gardenRoundCredited.size?'小花園收到你的照顧了！':'今天的努力，也都記住了！'}</h2><strong class="water-earned">${gardenRoundCredited.size?'💧 ＋'+gardenRoundCredited.size+' 滴水':'💚 複習進度已保存'}</strong><p>${rareBloom?'特色植物已加入收藏，也可以放進蝴蝶花圃。':bloom?'一般植物已加入收藏。':gardenRoundCredited.size?`再 ${p.target.goal-p.target.drops} 滴水，${GARDEN_PLANTS[p.target.index].name}就會開花。`:'這些單字今天已領過水滴，或今日水滴已集滿。'}</p>${newBadges.length?`<div class="new-badges">${newBadges.map(b=>`<span>新徽章 ${b.icon} ${b.name}</span>`).join('')}</div>`:''}</div>`}

let flowerbedPlant = -1;
function renderFlowerbed(progress) {
  const bed = mergeFlowerbeds(db.garden?.flowerbed);
  const visitors = flowerbedChallenges(db.garden,day());
  const available = progress.target.available;
  const selected = visitors[bed.choices.visitor?.value];
  const slots = [0,1,2].map(slot => {
    const plant = GARDEN_PLANTS[bed.choices[slot]?.value];
    return `<div class="flowerbed-position">
      <button type="button" class="flowerbed-plot" onclick="placeFlowerbedPlant(${slot})" ${available?'':'disabled'} aria-label="花位 ${slot+1}，${plant?plant.name:'空位'}">
        ${plant?plantArt(bed.choices[slot].value,3):'<span aria-hidden="true">＋</span>'}
        <strong>${plant?plant.name:'空花位'}</strong>
      </button>
      ${plant?'<button type="button" class="flowerbed-clear" onclick="clearFlowerbedPlot('+slot+')">收回</button>':''}
    </div>`;
  }).join('');
  return `<section class="panel flowerbed" aria-labelledby="flowerbed-title">
    <div class="flowerbed-heading"><h3 id="flowerbed-title">🦋 蝴蝶花圃</h3>
      ${selected?.unlocked?`<span class="tag">${selected.icon} ${selected.name}正在拜訪</span>`:''}
    </div>
    <p>${available?'先選一種花，再點花位放進去。':'養出第一朵花，就能布置花圃。'}</p>
    ${available?`<div class="flowerbed-palette" aria-label="可布置的植物">${GARDEN_PLANTS.slice(0,available).map((plant,index)=>
      `<button type="button" aria-pressed="${flowerbedPlant===index}" onclick="selectFlowerbedPlant(${index})">${plant.icon} ${plant.name}</button>`).join('')}</div>`:''}
    <div class="flowerbed-plots">${slots}</div>
    <p id="flowerbed-status" role="status" tabindex="-1"></p>
    <h4>訪客圖鑑</h4>
    <p>${bed.started?'每個任務分開累計，每個字只算一次。每項任務達標後，可以邀請一位訪客來花圃。':'放入第一株花後，隔天開始累計挑戰。'}</p>
    <div class="flowerbed-visitors">${visitors.map((visitor,index)=>`
      <article class="flowerbed-visitor">
        <strong>${visitor.icon} ${visitor.name}</strong>
        <p>${visitor.corrected?'訂正':'成功拼出'} <b>${visitor.words}</b> 個不同單字，分至少 <b>${visitor.days}</b> 天完成。</p>
        <p>${Math.min(visitor.wordCount,visitor.words)} / ${visitor.words} 字 · ${Math.min(visitor.dayCount,visitor.days)} / ${visitor.days} 天</p>
        ${visitor.unlocked?`<button type="button" onclick="chooseFlowerbedVisitor(${index})" ${selected===visitor?'disabled':''}>${selected===visitor?'拜訪中':'邀請拜訪'}</button>`:'<span class="tag">等待解鎖</span>'}
      </article>`).join('')}</div>
  </section>`;
}
function selectFlowerbedPlant(index) {
  flowerbedPlant = index;
  document.querySelectorAll('.flowerbed-palette button').forEach((button,i) =>
    button.setAttribute('aria-pressed',String(i===index)));
  document.getElementById('flowerbed-status').textContent = '已選擇'+GARDEN_PLANTS[index].name+'，請點一個花位。';
}
function placeFlowerbedPlant(slot) {
  if (flowerbedPlant<0) {
    document.getElementById('flowerbed-status').textContent = '先從上面選一種花。';
    return;
  }
  if (flowerbedPlant>=gardenProgress(db.garden,day()).target.available) return;
  updateFlowerbed(String(slot),flowerbedPlant,true);
}
function clearFlowerbedPlot(slot) {
  updateFlowerbed(String(slot),-1,false);
}
function chooseFlowerbedVisitor(index) {
  if (flowerbedChallenges(db.garden,day())[index]?.unlocked) updateFlowerbed('visitor',index,false);
}
function updateFlowerbed(slot,value,startsChallenge) {
  const bed = mergeFlowerbeds(db.garden.flowerbed);
  if (startsChallenge&&!bed.started) bed.started = day();
  bed.choices[slot] = {value,at:Math.max(Date.now(),(bed.choices[slot]?.at||0)+1)};
  db.garden.flowerbed = bed;
  const saved = save();
  render();
  const status = document.getElementById('flowerbed-status');
  status.textContent = saved ? '花圃已更新。' : '目前無法儲存花圃。';
  status.focus({preventScroll:true});
}

function rarePlantArt(index,stage,animate){
  const plant=GARDEN_PLANTS[index],type=index-BASIC_PLANT_COUNT;
  const colors=['#f2ad93','#edbc55','#9abf78','#8cb9d7','#bc9bd9'];
  const dots=(points,radius,palette)=>points.map(([x,y],i)=>
    `<circle cx="${x}" cy="${y}" r="${radius}" fill="${palette[i%palette.length]}"/>`).join('');
  const stems='<path d="M140 212V92m0 55l-45-36m45 32l45-41" fill="none" stroke="#729458" stroke-width="9" stroke-linecap="round"/>';
  const leaves='<path d="M140 181q-47 3-57-36 40-5 57 36m0-9q44 0 57-38-39-4-57 38" fill="#9abc73"/>';
  let crown='';
  if(type===0){
    crown=Array.from({length:7},(_,i)=>`<ellipse cx="140" cy="77" rx="19" ry="46" fill="${i%2?'#f5bdce':plant.color}" stroke="#cf7f9c" transform="rotate(${(i-3)*24} 140 122)"/>`).join('')+'<ellipse cx="140" cy="119" rx="25" ry="13" fill="#edc56c"/>';
  }else if(type===1){
    crown=dots([[86,93],[103,63],[123,87],[151,61],[170,91],[196,73],[151,108],[114,114],[183,116],[128,61]],22,['#9fb7e4','#859dd8','#bea4db','#a68acb']);
    crown+=dots([[86,93],[103,63],[123,87],[151,61],[170,91],[196,73],[151,108],[114,114],[183,116],[128,61]],4,['#ecedf8']);
  }else if(type===2){
    crown='<path d="M140 97q-34-73-85-32m85 32q34-73 85-32" fill="none" stroke="#779563" stroke-width="9" stroke-linecap="round"/>';
    for(const x of [61,93,127,153,187,219]){
      crown+=dots([[x,67],[x-5,85],[x+4,99],[x,113],[x,125]],10,['#ae90d7','#bc9cde','#c8abe7','#d6bef0']);
    }
  }else{
    crown='<path d="M140 212q-10-58 0-106m0 45l-41-45m40 39l42-42" fill="none" stroke="#8b664c" stroke-width="14" stroke-linecap="round"/>';
    crown+=dots([[69,103],[93,74],[124,56],[156,52],[187,72],[212,101],[175,112],[143,96],[110,110]],24,colors);
    crown+=dots([[69,103],[93,74],[124,56],[156,52],[187,72],[212,101],[175,112],[143,96],[110,110]],5,['#fff5d4']);
  }
  return `<svg class="garden-plant-art garden-rare-art ${animate?'plant-growing':''}" viewBox="0 0 280 250" role="img" aria-label="${plant.name}，${['種子','發芽','長葉','開花'][stage]}">
    <ellipse cx="140" cy="229" rx="94" ry="10" fill="#789b622a"/>
    <path d="M84 198q56-35 112 0l-11 23H95z" fill="#c49a73"/>
    ${stage===0?'<ellipse cx="140" cy="194" rx="13" ry="7" fill="#e0bc7d"/>':stage===1?
      '<path d="M140 198v-30m0 17q-32 0-39-26 30-1 39 26m0-8q30-2 36-24-25-2-36 24" fill="#9abb7b" stroke="#779a5a" stroke-width="4"/>':
      stems+leaves+(stage===3?crown:'<ellipse cx="140" cy="91" rx="17" ry="25" fill="'+plant.color+'"/>')}
  </svg>`;
}
