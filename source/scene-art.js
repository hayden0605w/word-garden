const SCENE_PLAN=/* SCENE_PLAN */;
const SCENE_LOWER=new Map();for(const [word,entry] of Object.entries(SCENE_PLAN))if(!SCENE_LOWER.has(word.toLowerCase()))SCENE_LOWER.set(word.toLowerCase(),entry);
const SC={ink:'#52694f',coral:'#df8972',blue:'#8fb2be',olive:'#9bb77e',tan:'#d2b48a',paper:'#fffdf5',line:'#cbd6bd'};
const sr=(x,y,w,h,fill=SC.tan,r=5)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>`;
const sl=(x1,y1,x2,y2,color=SC.ink,width=4)=>`<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;
const sc=(x,y,r,fill)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
function sa(x,y,xx,yy,color=SC.ink){const a=Math.atan2(yy-y,xx-x),n=10;return sl(x,y,xx,yy,color,4)+`<path d="M${xx-n*Math.cos(a-.6)} ${yy-n*Math.sin(a-.6)}L${xx} ${yy}L${xx-n*Math.cos(a+.6)} ${yy-n*Math.sin(a+.6)}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`}
function sp(x,y,scale=1,pose='stand',shirt=SC.blue,mood='happy'){const arms=pose==='up'?'M-10-38L-26-60M10-38L26-60':pose==='reach'?'M-10-38L-23-20M10-38L42-39':pose==='carry'?'M-10-37L-21-26L0-20M10-37L28-28L13-20':pose==='sit'?'M-10-38L-20-20M10-38L36-29':'M-10-38L-22-22M10-38L22-22';const legs=pose==='kick'?'M-5-15L-10 0M5-15L32-30':pose==='walk'?'M-5-15L-16 0M5-15L20-3':pose==='sit'?'M-5-15H22V0M5-15H31V0':'M-5-15L-8 0M5-15L8 0';return `<g transform="translate(${x} ${y}) scale(${scale})">${sc(0,-62,14,'#ebc49d')}<path d="M-13-67q12-18 26 0" fill="#817259"/>${sr(-11,-45,22,31,shirt,8)}<path d="${arms}${legs}" fill="none" stroke="${shirt}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>${sc(-5,-62,1.5,SC.ink)}${sc(5,-62,1.5,SC.ink)}<path d="${mood==='sad'?'M-5-53q5-6 10 0':mood==='tired'?'M-5-54h10':'M-5-55q5 5 10 0'}" fill="none" stroke="${SC.ink}" stroke-width="1.6" stroke-linecap="round"/></g>`}
function sBook(x,y,s=1,color=SC.coral){return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 4q15-7 30 0 15-7 30 0v34q-15-7-30 0-15-7-30 0Z" fill="${SC.paper}" stroke="${color}" stroke-width="3"/><path d="M30 5v33M7 13h16m-16 7h16m14-7h16m-16 7h16" stroke="${color}" stroke-width="2"/></g>`}
function sApple(x,y,r=13,color=SC.coral){return `<path d="M${x} ${y-r+3}c${-r*1.2} ${-r*.8} ${-r*1.7} ${r*.9} ${-r*.5} ${r*1.8}q${r*.5} ${r*.35} ${r} 0c${r*1.2} ${-r*.9} ${r*.7} ${-r*2.6} ${-r*.5} ${-r*1.8}" fill="${color}"/>${sl(x,y-r+1,x+2,y-r-7,SC.ink,2)}<path d="M${x+2} ${y-r-2}q10-8 13 0-7 5-13 0" fill="${SC.olive}"/>`}
function sHouse(x,y,s=1){return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 29L42 0l42 29" fill="#d79779"/>${sr(9,29,66,60,'#e4d4af',2)}${sr(35,55,18,34,SC.blue,2)}${sr(18,39,13,15,SC.paper,1)}${sr(56,39,12,15,SC.paper,1)}</g>`}
function sTree(x,y,s=1){return `<g transform="translate(${x} ${y}) scale(${s})">${sr(-5,-55,10,55,'#ad8f68',2)}${sc(-14,-66,23,SC.olive)}${sc(13,-69,25,'#adca8b')}${sc(0,-88,23,SC.olive)}</g>`}
function sDesk(x,y,w=105){return sr(x,y,w,9,SC.tan,3)+sl(x+9,y+9,x+9,y+48,SC.tan,6)+sl(x+w-9,y+9,x+w-9,y+48,SC.tan,6)}
function sClock(x,y,hour=3,s=1){const a=hour*Math.PI/6;return `<g transform="translate(${x} ${y}) scale(${s})">${sc(0,0,23,SC.paper)}<circle r="23" fill="none" stroke="${SC.blue}" stroke-width="4"/>${sl(0,0,0,-16,SC.ink,3)}${sl(0,0,Math.sin(a)*11,-Math.cos(a)*11,SC.coral,4)}</g>`}
function sRain(x=42,y=35){return `<g transform="translate(${x} ${y})">${sc(0,0,16,'#b1bfca')}${sc(20,-8,22,'#b1bfca')}${sc(43,2,17,'#b1bfca')}${sr(-13,0,70,17,'#b1bfca',8)}${[0,22,43].map(v=>sl(v,26,v-5,37,SC.blue,3)).join('')}</g>`}
function sUmbrella(x,y){return `<path d="M${x-39} ${y}a39 34 0 0 1 78 0q-13-10-26 0-13-10-26 0-13-10-26 0" fill="${SC.coral}"/>${sl(x,y,x,y+49,SC.ink,3)}<path d="M${x} ${y+49}q0 11-10 11t-10-11" fill="none" stroke="${SC.ink}" stroke-width="3"/>`}
function sPaper(x,y,s=1){return `<g transform="translate(${x} ${y}) scale(${s})">${sr(0,0,34,44,SC.paper,2)}<path d="M7 12h20M7 20h20M7 28h15" stroke="${SC.blue}" stroke-width="2"/></g>`}
function sBox(x,y,w=42,open=false){return `<g transform="translate(${x} ${y})">${sr(0,0,w,w*.75,SC.tan,3)}${open?`<path d="M0 0l-10-13h${w/2+10}l${w/2} 13 12-13H${w/2}L0 0" fill="#e4cda4"/>`:sl(w/2,0,w/2,w*.75,'#eee0bc',4)}</g>`}
function sPlant(x,y,s=1){return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-17-23h34l-5 27h-24Z" fill="${SC.coral}"/>${sl(0,-23,0,-58,SC.olive,4)}<path d="M0-43q-33-1-27-22 25 0 27 22m0-7q28-25 29-2-19 15-29 2" fill="${SC.olive}"/></g>`}
function sFace(x,y,mood='happy'){return sc(x,y,29,'#efc99e')+sc(x-9,y-4,3,SC.ink)+sc(x+9,y-4,3,SC.ink)+`<path d="${mood==='sad'?`M${x-12} ${y+15}q12-16 24 0`:mood==='surprise'?`M${x-4} ${y+8}q4-5 8 0v8q-4 5-8 0Z`:`M${x-12} ${y+8}q12 15 24 0`}" fill="${mood==='surprise'?SC.ink:'none'}" stroke="${SC.ink}" stroke-width="3" stroke-linecap="round"/>`}
function sCheck(x,y,ok=true){return ok?`<path d="M${x} ${y}l9 10 23-29" fill="none" stroke="${SC.olive}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`:sl(x,y-10,x+23,y+13,SC.coral,6)+sl(x+23,y-10,x,y+13,SC.coral,6)}
function sQuestion(x,y,s=1){return `<path transform="translate(${x} ${y}) scale(${s})" d="M-9-13c0-16 24-16 24-2 0 10-14 10-14 21m0 9v2" fill="none" stroke="${SC.ink}" stroke-width="4" stroke-linecap="round"/>`}
function sCloudSun(rain=false){return rain?sRain(50,32):sc(218,37,18,'#e8c96f')+[0,1,2,3,4,5,6,7].map(i=>{const a=i*Math.PI/4;return sl(218+Math.cos(a)*23,37+Math.sin(a)*23,218+Math.cos(a)*29,37+Math.sin(a)*29,'#e8c96f',3)}).join('')}
function sScreen(x,y,s=1){return `<g transform="translate(${x} ${y}) scale(${s})">${sr(0,0,74,47,SC.ink,5)}${sr(5,5,64,36,'#d5e4dc',2)}${sl(37,47,37,60,SC.ink,5)}${sl(19,60,55,60,SC.ink,5)}</g>`}
function sDoor(x,y,open=false){return `<g transform="translate(${x} ${y})">${sr(0,0,54,99,'#dbc7a2',3)}${open?`<path d="M5 5h44v90H5Z" fill="#b6c9b2"/><path d="M5 5l30 15v59L5 95Z" fill="${SC.tan}"/>`:`${sr(5,5,44,90,SC.tan,2)}${sc(40,52,3,SC.ink)}`}</g>`}
function sBubble(x,y,question=false){return `<path d="M${x} ${y}h44q9 0 9 9v22q0 9-9 9h-21l-12 10v-10H${x}q-9 0-9-9V${y+9}q0-9 9-9Z" fill="${SC.paper}" stroke="${SC.line}" stroke-width="2"/>${question?sQuestion(x+20,y+20,.6):sl(x+5,y+14,x+36,y+14,SC.blue,3)+sl(x+5,y+23,x+26,y+23,SC.blue,3)}`}
function sFruitTray(n=5,selected=false){return `<path d="M56 104h168l-17 40H73Z" fill="#cfb590"/>`+Array.from({length:n},(_,i)=>sApple(84+(i%5)*29,97-Math.floor(i/5)*31,12,selected&&i>0?'#d4d9c6':SC.coral)).join('')}
function sTrophy(x=140,y=99){return sr(x-7,y+9,14,35,SC.tan,3)+sr(x-24,y+39,48,8,SC.tan,3)+`<path d="M${x-27} ${y-35}h54v25q0 30-27 30t-27-30Z" fill="#e7ca76"/><path d="M${x-27} ${y-25}h-15q0 34 25 32m44-32h15q0 34-25 32" fill="none" stroke="#d3b36b" stroke-width="6"/>`}
function sBoat(x,y){return `<path d="M${x-45} ${y}h90l-19 23h-50Z" fill="${SC.tan}"/>${sl(x,y,x,y-74,SC.ink,3)}<path d="M${x+4} ${y-72}v62h39Z" fill="${SC.paper}"/><path d="M${x-4} ${y-61}v51h-34Z" fill="${SC.coral}"/>`}
function sStar(x,y,r=15){return `<path d="${Array.from({length:10},(_,i)=>{const a=-Math.PI/2+i*Math.PI/5,n=i%2?r*.45:r;return (i?'L':'M')+(x+Math.cos(a)*n)+' '+(y+Math.sin(a)*n)}).join('')}Z" fill="#e7ca76"/>`}
function sBasketball(x,y,r=18){return sc(x,y,r,SC.coral)+`<path d="M${x-r} ${y}h${r*2}m-${r}-${r}v${r*2}m-${r*.8}-${r*1.8}q${r} ${r*.8} 0 ${r*1.6}m${r*1.6}-${r*1.6}q-${r} ${r*.8} 0 ${r*1.6}" fill="none" stroke="#a76f56" stroke-width="2"/>`}
function sGround(){return sl(35,155,245,155,SC.line,3)}
function completeScene(kind,option=''){
 let b=sGround();
 switch(kind){
 case 'busy': b+=sp(87,152,1,'sit',SC.blue,'tired')+sDesk(115,119,111)+sPaper(146,96,.5)+sPaper(197,85,.6)+sPaper(199,91,.6)+sPaper(201,97,.6)+sClock(220,45,10,.8)+sl(66,108,71,83,SC.ink,8)+sl(126,120,161,107,SC.ink,2);break;
 case 'work':b+=sp(83,152,1,'sit')+sDesk(112,115,109)+sScreen(143,65,.8);break;
 case 'read':b+=sp(113,150,1,'carry')+sBook(105,111,.7);break;
 case 'write':b+=sp(86,151,1,'sit')+sDesk(114,118,110)+sPaper(145,98,.55)+sl(124,119,162,109,SC.ink,3);break;
 case 'rainHappy':b+=sRain(135,38)+sp(159,153,1.05,'up',SC.coral)+`<path d="M120 150q34-14 78 0" fill="#c0d8d7"/>`;break;
 case 'shelter':b+=sRain(50,30)+sp(166,154,.9,'reach')+sUmbrella(163,60);break;
 case 'unbox':b+=sp(73,151,1,'reach',SC.blue)+sBox(141,105,67,true)+sBook(146,80,.8)+sStar(222,63,13);break;
 case 'weatherMaybe':b+=sRain(47,35)+sCloudSun()+sp(140,154,.85,'stand',SC.blue)+sQuestion(145,48,.7);break;
 case 'sunHappy':b+=sCloudSun()+sp(140,153,1,'up',SC.coral);break;
 case 'family':{const roles={father:0,mother:1,brother:2,sister:3,son:2,daughter:3,parent:0,husband:0,wife:1,uncle:0,aunt:1,cousin:3,relative:0};const target=roles[option]??-1;b+=sl(105,64,175,64,SC.line,3)+sl(140,64,140,83,SC.line,3)+sl(101,83,179,83,SC.line,3);[[96,72,.65],[184,72,.65],[104,148,.65],[176,148,.65]].forEach(([x,y,z],i)=>{b+=sp(x,y,z,'stand',i===target?SC.coral:SC.blue);if(i===target)b+=`<ellipse cx="${x}" cy="${y-26}" rx="26" ry="34" fill="none" stroke="#dca08c" stroke-width="3"/>`});break;}
 case 'conversation':b+=sp(68,153,.9,'stand')+sp(215,153,.9,'stand',SC.coral)+sBubble(91,32,option==='ask');if(option==='book')b+=sBook(113,102,.55);break;
 case 'classroom':b+=sr(83,24,153,73,'#9db48f',5)+sr(91,32,137,57,'#486b56',1)+`<path d="M107 49h43m-43 15h78" stroke="#fffdf5" stroke-width="3"/>`+sp(54,132,.9,'reach',SC.coral)+sp(122,164,.6,'sit')+sp(190,164,.6,'sit')+sDesk(105,134,105);break;
 case 'stage':b+=sr(42,24,196,113,'#e6dfc8',4)+`<path d="M42 24h45q-2 74-45 102Zm196 0h-45q2 74 45 102Z" fill="#d49b88"/>`+sp(140,139,1.1,'up',option==='woman'?SC.coral:SC.blue)+sr(37,139,206,15,'#b59975',3);if(option==='woman')b+=`<path d="M124 60q-6 19-1 26m33-26q6 19 1 26" stroke="#817259" stroke-width="6"/>`;break;
 case 'music':b+=sp(95,151,1,'stand',SC.coral)+sl(137,75,137,151,SC.ink,3)+sc(137,73,7,SC.ink)+`<path d="M174 52v37m0-32 23-7v31" stroke="${SC.blue}" stroke-width="4" fill="none"/>`+sc(168,90,7,SC.blue)+sc(191,83,7,SC.blue);break;
 case 'piano':b+=sp(72,154,.9,'sit')+sr(117,66,116,48,SC.ink,3)+sr(117,102,116,18,SC.paper,1)+Array.from({length:9},(_,i)=>sl(122+i*12,102,122+i*12,119,SC.ink,1)).join('')+sl(128,120,128,154,SC.ink,5)+sl(220,120,220,154,SC.ink,5);break;
 case 'eat':b+=sp(87,152,1,'sit')+sDesk(111,116,114)+`<ellipse cx="166" cy="112" rx="34" ry="8" fill="${SC.paper}"/>`+sApple(164,102,11)+sl(106,110,128,99,SC.ink,3);break;
 case 'drink':b+=sp(125,152,1,'reach')+sr(158,96,23,32,'#bcd8d9',3)+sl(159,89,169,109,SC.ink,2);break;
 case 'sleep':b+=sr(55,100,176,44,SC.tan,6)+sr(65,80,157,43,'#bac7dc',8)+sc(90,80,17,'#e9c39d')+sr(109,72,115,59,SC.blue,9)+sl(65,144,65,155,SC.tan,5)+sl(221,144,221,155,SC.tan,5)+sc(218,37,15,'#e2cf92');break;
 case 'tired':b+=sp(139,152,1,'sit',SC.blue,'tired')+sr(111,131,73,8,SC.tan,2)+sl(117,140,117,155,SC.tan,5)+sClock(213,43,10,.75);break;
 case 'running':b+=sp(120,151,1.08,'walk',SC.coral)+sl(49,101,82,101,SC.line,4)+sl(44,117,76,117,SC.line,4)+sa(175,117,230,117);break;
 case 'walk':b+=sp(109,153,1,'walk')+sa(168,130,225,130);break;
 case 'jump':b+=sp(140,115,1,'up',SC.coral)+`<ellipse cx="140" cy="155" rx="29" ry="5" fill="#d8dec9"/>`+sa(194,137,194,89);break;
 case 'kick':b+=sp(106,153,1,'kick',SC.blue)+sBasketball(173,125,16)+sa(197,124,234,108);break;
 case 'throw':b+=sp(100,152,1,'up',SC.coral)+sc(162,58,13,SC.blue)+`<path d="M177 51q31-5 53 30" fill="none" stroke="${SC.ink}" stroke-width="3" stroke-dasharray="5 5"/>`;break;
 case 'catch':b+=sp(166,152,1,'up')+sc(137,76,13,SC.coral)+sa(64,55,111,69);break;
 case 'carry':b+=sp(126,153,1,'carry')+sBox(117,115,39)+sa(187,134,226,134);break;
 case 'push':b+=sp(83,153,1,'reach')+sBox(127,106,59)+sa(196,129,235,129);break;
 case 'pull':b+=sp(92,152,1,'carry')+sBox(183,113,47)+sl(108,126,183,126,SC.tan,4)+sa(154,102,115,102);break;
 case 'put':b+=sp(83,151,1,'reach')+sBox(165,111,62,true)+sc(193,77,13,SC.coral)+sa(193,91,193,116);break;
 case 'give':b+=sp(69,151,.9,'reach')+sp(210,151,.9,'carry',SC.coral)+sBox(134,105,32)+sa(111,91,164,91);break;
 case 'share':b+=sp(64,151,.85,'reach')+sp(217,151,.85,'carry',SC.coral)+`<circle cx="140" cy="111" r="28" fill="#ddbb84"/><path d="M139 84v54" stroke="#fffdf5" stroke-width="4"/>`+sa(125,72,89,86)+sa(154,72,191,86);break;
 case 'help':b+=sp(84,151,.9,'reach')+sp(195,151,.9,'carry',SC.coral)+sBox(118,116,51);break;
 case 'care':b+=sp(85,151,1,'reach')+sPlant(192,145,.9)+`<path d="M124 105h26l-4 18h-21Z" fill="${SC.blue}"/>`+sl(151,111,176,124,SC.blue,3)+sc(179,129,3,SC.blue);break;
 case 'wash':b+=sr(113,104,105,24,'#d4e3dc',8)+sl(185,70,185,92,SC.ink,6)+sl(185,70,162,70,SC.ink,6)+sp(75,152,1,'reach')+sl(164,82,164,110,SC.blue,3);break;
 case 'clean':b+=sp(97,152,1,'reach')+sl(128,111,158,151,SC.tan,4)+sr(146,147,34,8,SC.olive,3)+sStar(208,87,11);break;
 case 'dirty':b+=`<path d="M100 43l-36 24 20 28 20-11v65h76V84l20 11 20-28-36-24q-40 17-84 0" fill="${SC.blue}"/>`+sc(129,105,11,'#b59a7d')+sc(157,122,8,'#b59a7d')+sc(154,91,5,'#b59a7d');break;
 case 'wet':b+=`<path d="M100 43l-36 24 20 28 20-11v65h76V84l20 11 20-28-36-24q-40 17-84 0" fill="${SC.blue}"/>`+[115,141,165].map(x=>sl(x,157,x-3,165,SC.blue,3)).join('');break;
 case 'dry':b+=sl(46,69,234,69,SC.tan,3)+sr(94,73,83,69,'#b5c9d4',5)+sl(103,65,103,80,SC.ink,4)+sl(165,65,165,80,SC.ink,4)+sCloudSun();break;
 case 'grow':b+=sPlant(78,148,.55)+sTree(204,151,.9)+sa(112,113,153,113);break;
 case 'garden':b+=sPlant(74,147,.8)+sPlant(142,148,1.05)+sPlant(212,148,.65);break;
 case 'farm':b+=sTree(56,151,.7)+sHouse(157,71,.85)+[92,115,138].map(x=>sl(x,119,x,153,SC.olive,5)+sl(x,135,x-11,126,SC.olive,3)+sl(x,132,x+9,121,SC.olive,3)).join('');break;
 case 'house':b+=sHouse(98,60,1.05)+sTree(53,153,.65);break;
 case 'neighborhood':b+=sHouse(35,76,.85)+sHouse(174,76,.85)+sp(143,150,.55,'up',SC.coral);break;
 case 'apartment':b+=sr(96,29,96,127,'#d7ccad',5)+[0,1,2].flatMap(row=>[0,1,2].map(col=>sr(107+col*28,41+row*30,17,19,SC.paper,2))).join('')+sr(129,132,25,24,SC.blue,2);break;
 case 'room':b+=`<path d="M42 151V40h190v111Z" fill="#e9e2ce"/>`+sr(65,62,48,40,'#c2d7db',3)+sr(145,94,64,47,SC.blue,5)+sr(141,135,72,11,SC.tan,3);break;
 case 'door':b+=sDoor(164,51,option==='open')+sp(89,153,.9,'walk')+sa(111,129,161,129);break;
 case 'leave':b+=sDoor(51,51,true)+sp(174,153,.9,'walk')+sa(187,133,232,133);break;
 case 'desk':b+=sDesk(61,99,163)+sBook(89,69,.75)+sPaper(164,75,.5)+sl(167,100,190,85,SC.coral,4);break;
 case 'shopping':b+=sr(154,64,68,76,'#d6c8a5',4)+sApple(188,83,12)+sp(74,153,.95,'reach')+sr(119,101,29,17,'#c1d1a8',2)+sc(132,109,4,SC.olive)+sa(123,83,156,83);break;
 case 'store':b+=sr(65,63,152,90,'#e2d3b7',3)+`<path d="M58 64h166l-14-28H74Z" fill="${SC.coral}"/>`+sr(78,82,59,46,'#c5d8d9',2)+sr(166,87,32,66,SC.blue,2)+sApple(106,112,11);break;
 case 'cooking':b+=sp(87,151,1,'reach')+sDesk(117,113,111)+sr(163,89,53,28,SC.blue,5)+`<path d="M159 90h61m-23-37q-9 9 0 18m-17-17q-9 9 0 18" fill="none" stroke="${SC.ink}" stroke-width="3"/>`;break;
 case 'bake':b+=sr(102,53,119,103,'#d9d7ca',5)+sr(112,79,99,62,SC.ink,5)+sr(122,101,80,24,'#dab17a',10)+sl(124,84,198,84,SC.line,2)+[122,145,168,191].map(x=>sc(x,66,4,SC.ink)).join('');break;
 case 'breakfast':b+=sDesk(71,119,141)+sApple(118,101,12)+sr(157,88,24,29,SC.paper,3)+sCloudSun();break;
 case 'night':b+=`<path d="M208 30a26 26 0 1 0 29 36 30 30 0 0 1-29-36" fill="#e5ce89"/>`+sHouse(75,76,.9)+sStar(78,40,8)+sStar(140,32,6);break;
 case 'bedroom':b+=sr(58,105,160,37,SC.tan,4)+sr(65,85,147,42,SC.blue,7)+sr(70,83,38,24,SC.paper,5)+sl(62,142,62,155,SC.tan,5)+sl(214,142,214,155,SC.tan,5)+sClock(216,47,7,.65);break;
 case 'ball':b+=sp(108,153,1,'kick')+sBasketball(180,132,20);break;
 case 'sport':b+=sp(125,149,1,'up',SC.coral)+sBasketball(153,58,16)+sr(206,54,35,9,SC.tan,2)+sl(229,57,229,154,SC.ink,3);break;
 case 'trophy':b+=sTrophy();break;
 case 'gift':b+=sBox(102,77,81)+sr(138,77,9,61,SC.coral,1)+sl(103,98,182,98,SC.coral,9)+`<path d="M143 77q-49-42-40-10 7 17 40 10m0 0q49-42 40-10-7 17-40 10" fill="none" stroke="${SC.coral}" stroke-width="6"/>`;break;
 case 'birthday':b+=sr(89,92,106,49,'#e8bb9b',8)+sr(87,88,110,15,'#ecd8c3',8)+[113,143,172].map(x=>sl(x,87,x,65,SC.blue,4)+sc(x,56,4,'#e8c96f')).join('');break;
 case 'face':b+=sFace(140,91,option);break;
 case 'thinking':b+=sp(135,153,1,'stand',SC.blue,'tired')+sBubble(171,32,true)+sc(159,79,4,SC.paper)+sc(152,85,3,SC.paper);break;
 case 'happy':b+=sFace(140,91)+sStar(211,45,10);break;
 case 'sad':b+=sFace(140,91,'sad')+`<path d="M121 94q-8 14 0 14 8 0 0-14" fill="${SC.blue}"/>`;break;
 case 'calendar':{b='';const pattern=option||'now';b+=sr(68,31,146,122,SC.paper,10)+sr(68,31,146,29,SC.olive,7);[0,1,2].forEach(row=>[0,1,2,3,4].forEach(col=>{const i=row*5+col;const yes=pattern==='always'||pattern==='often'&&i%4!==0||pattern==='sometimes'&&i%3===0||pattern==='seldom'&&i===7||pattern==='now'&&i===7;b+=sr(80+col*26,73+row*23,17,15,yes?SC.coral:'#e5eadc',3)}));if(pattern==='past')b+=sa(165,115,106,115);if(pattern==='future')b+=sa(106,115,165,115);break;}
 case 'clock':b=sClock(140,90,Number(option)||3,2.2);break;
 case 'timeOrder':b='';b+=sr(21,36,100,111,'#e8e6d4',12)+sr(159,36,100,111,'#e8e6d4',12);if(option==='before'){b+=sBook(37,70,1.1)+sClock(210,95,9,1.2)}else{b+=sClock(70,95,9,1.2)+sBook(174,70,1.1)}b+=sa(128,90,151,90);break;
 case 'quantity':{const n=Number(option)||3;b+=sFruitTray(n);break;}
 case 'comparison':{const mode=option||'big';if(['same','different'].includes(mode)){b+=sApple(89,110,32)+sApple(192,110,32,mode==='same'?SC.coral:SC.olive)}else{b+=sBox(55,87,64)+(mode==='equal'?sBox(187,87,64):sBox(187,119,32));if(mode!=='equal') b+=sl(140,99,162,112,SC.ink,4)+sl(162,112,140,125,SC.ink,4)}break;}
 case 'choice':b+=sp(140,155,.8,'stand')+sApple(72,65,22)+sApple(211,65,22,SC.olive)+sa(123,105,89,84)+sa(157,105,194,84);break;
 case 'pair':b+=sApple(107,104,24)+sApple(176,104,24)+`<path d="M77 143h128" stroke="${SC.olive}" stroke-width="4"/>`;break;
 case 'increase':b+=sApple(59,110,19)+sa(91,107,131,107)+sApple(161,113,17)+sApple(204,113,17)+sApple(183,83,17);break;
 case 'decrease':b+=sApple(55,111,15)+sApple(88,111,15)+sApple(71,84,15)+sa(118,105,163,105)+sApple(211,111,20);break;
 case 'empty':b+=sBox(88,89,103,true);break;
 case 'document':b+=sPaper(111,37,1.8)+sCheck(167,126,option!=='wrong');break;
 case 'copy':b+=sPaper(53,59,1.5)+sa(119,92,155,92)+sPaper(178,59,1.5);break;
 case 'computer':b+=sScreen(73,58,1.7);if(option==='down')b+=sa(136,45,136,101,SC.coral);else if(option==='up')b+=sa(136,105,136,44,SC.coral);break;
 case 'build':b+=sp(70,153,.85,'reach')+[0,1,2].map(row=>Array.from({length:3-row},(_,col)=>sr(125+row*19+col*42,133-row*26,39,23,SC.tan,2)).join('')).join('');break;
 case 'fix':b+=sp(87,153,.95,'reach')+sDesk(116,118,109)+sr(160,97,34,20,SC.blue,3)+sl(133,112,165,92,SC.ink,5);break;
 case 'globe':b+=sc(141,88,52,SC.blue)+`<path d="M108 42l-10 25 17 15-4 26 25 17 12 14 22-24-6-23 15-21-25-27Z" fill="${SC.olive}"/>`+sl(140,141,140,156,SC.tan,6);break;
 case 'travel':b+=sHouse(32,87,.6)+sHouse(204,87,.6)+`<path d="M81 76q60-63 120 0" fill="none" stroke="${SC.blue}" stroke-width="4" stroke-dasharray="7 5"/>`+`<path d="M127 44l16 3 16-16 7 3-9 19 23 9-4 7-26-6-13 13-7-2 4-16-12-6Z" fill="${SC.coral}"/>`;break;
 case 'map':b+=`<path d="M51 49l60-17 58 17 60-17v106l-60 17-58-17-60 17Z" fill="#dce5cc" stroke="${SC.olive}" stroke-width="3"/><path d="M110 34v104m59-90v107" stroke="${SC.paper}" stroke-width="3"/>`+sc(165,89,12,SC.coral)+`<path d="M155 96l10 18 10-18" fill="${SC.coral}"/>`;break;
 case 'direction':b+=sHouse(45,93,.6)+`<path d="M115 155V63h100" fill="none" stroke="#b8c4b4" stroke-width="30"/>`+sa(115,130,115,87,SC.paper);break;
 case 'wide':b+=sr(68,19,146,143,'#b7c5b4',3)+sl(140,25,140,154,SC.paper,3)+sa(83,99,199,99,SC.coral);break;
 case 'fire':b+=`<path d="M140 30q0 43 29 55 30 37 3 60-57 25-80-6-24-35 9-66 0 32 16 19 16-15 23-62" fill="${SC.coral}"/><path d="M137 88q2 26 18 33 12 20-9 25-27-1-25-22 3-19 16-36" fill="#edc979"/>`;break;
 case 'danger':b+=`<path d="M140 34L55 150h170Z" fill="#e4c979" stroke="#b59d62" stroke-width="4"/>`+sl(140,77,140,113,SC.ink,8)+sc(140,131,4,SC.ink);break;
 case 'body':b+=sp(140,158,1.65,'stand');{const points={neck:[140,74],shoulder:[120,87],stomach:[140,111],height:[205,91],front:[140,100],back:[140,100],head:[140,56]};const [x,y]=points[option]||[140,102];b+=sc(x,y,10,SC.coral);if(option==='height')b+=sa(202,151,202,32)}break;
 case 'careful':b+=sp(112,153,1,'carry')+sr(128,109,25,33,SC.paper,2)+sr(132,119,17,20,SC.blue,1)+sCheck(191,100);break;
 case 'sick':b+=sFace(119,85,'sad')+sr(153,72,13,54,SC.paper,5)+sc(159,116,7,SC.coral)+sl(159,83,159,111,SC.coral,3);break;
 case 'doctor':b+=sp(88,153,1,'reach',SC.paper)+sp(191,153,.8,'sit',SC.blue,'sad')+sl(113,111,168,106,SC.ink,2)+sc(171,106,5,SC.ink);break;
 case 'healthy':b+=sp(140,154,1.05,'up',SC.olive)+sApple(66,114,16)+sStar(215,53,15);break;
 case 'listen':b+=sp(129,154,1.1,'stand')+`<path d="M159 62q22 8 0 22m11-30q37 19 0 39" fill="none" stroke="${SC.blue}" stroke-width="4"/>`;break;
 case 'smell':b+=sp(97,151,1,'reach')+sPlant(196,150,.7)+`<path d="M182 77q-24-12-49 5" stroke="${SC.blue}" stroke-width="3" stroke-dasharray="4 5" fill="none"/>`;break;
 case 'size':b+=sr(59,72,35,75,SC.blue,6)+sr(117,50,46,97,SC.blue,6)+sr(186,28,58,119,SC.blue,6);break;
 case 'height':b+=sp(97,151,.7)+sp(190,151,1.5,'stand',SC.coral);break;
 case 'long':b+=sl(53,71,228,71,SC.coral,10)+sl(53,115,129,115,SC.blue,10);break;
 case 'deep':b+=`<path d="M56 53h57v105h110V53h18" fill="#dfd8bf" stroke="#b4a78b" stroke-width="5"/>`+sa(168,72,168,139,SC.coral);break;
 case 'choicePath':b+=sp(139,154,.8,'stand')+sa(128,102,80,59)+sa(153,102,199,59)+sCheck(197,42)+sQuestion(75,37,.6);break;
 case 'team':b+=sp(67,152,.8)+sp(140,152,.9,'up',SC.coral)+sp(213,152,.8)+sBasketball(141,143,14);break;
 case 'people':b+=sp(73,153,.85)+sp(141,153,1,'stand',SC.coral)+sp(208,153,.85);break;
 case 'alone':b+=sp(140,154,1,'sit',SC.blue,'sad')+sr(91,133,104,8,SC.tan,3);break;
 case 'group':b+=sp(65,153,.7)+sp(116,153,.75,'stand',SC.coral)+sp(167,153,.7)+sp(216,153,.75,'stand',SC.olive);break;
 case 'point':b+=sp(80,153,1,'reach')+sc(195,110,25,SC.coral)+sa(132,111,161,111);break;
 case 'choose':b+=sFruitTray(3)+sa(201,45,143,80);break;
 case 'bridge':b+=`<path d="M37 140q104-30 206 0v24H37Z" fill="#a9c9cc"/><path d="M50 125q90-106 180 0" fill="none" stroke="${SC.tan}" stroke-width="17"/><path d="M50 111q90-106 180 0" fill="none" stroke="${SC.ink}" stroke-width="3"/>`;break;
 case 'animal':b+=sTree(209,153,.7)+`<ellipse cx="118" cy="125" rx="44" ry="24" fill="${SC.tan}"/><circle cx="77" cy="104" r="24" fill="${SC.tan}"/><path d="M58 86l-9-19 25 12m21 6 16-18 1 28m-23 47v14m55-14v14m15-29q21-19 26 4" stroke="${SC.tan}" stroke-width="10" stroke-linecap="round"/>`+sc(70,100,3,SC.ink);break;
 case 'flowers':b+=sPlant(111,151,1.15)+[0,1,2,3,4].map(i=>sc(111+Math.cos(i*1.256)*17,71+Math.sin(i*1.256)*17,12,SC.coral)).join('')+sc(111,71,10,'#e7ca76')+sPlant(202,153,.6);break;
 case 'forest':b+=sTree(66,154,.85)+sTree(143,153,1.15)+sTree(220,154,.75);break;
 case 'fruit':b+=sFruitTray(5);break;
 case 'clothes':b+=sl(65,39,221,39,SC.tan,4)+`<path d="M142 39q-14-25 0-25 9 0 6 9" fill="none" stroke="${SC.ink}" stroke-width="3"/><path d="M140 34l-42 27h84Z" fill="none" stroke="${SC.ink}" stroke-width="3"/><path d="M110 57 76 78l20 25 17-12v59h57V91l17 12 18-25-34-21q-27 20-61 0" fill="${SC.blue}"/>`;break;
 case 'paint':b+=sp(74,153,.9,'reach')+sl(180,52,149,155,SC.tan,5)+sl(180,52,218,155,SC.tan,5)+sr(143,43,78,76,SC.paper,2)+sc(181,77,17,SC.coral)+sl(103,116,165,88,SC.ink,3);break;
 case 'party':b+=sp(80,154,.8,'up')+sp(200,154,.8,'up',SC.coral)+sDesk(105,118,72)+sr(122,99,39,21,'#e6bc99',4)+[68,140,214].map((x,i)=>`<ellipse cx="${x}" cy="${36+i%2*11}" rx="14" ry="19" fill="${i%2?SC.olive:SC.coral}"/>`+sl(x,56+i%2*11,x-9,93,SC.line,1)).join('');break;
 case 'polite':b+=sp(83,153,.9,'stand')+sp(207,153,.9,'stand',SC.coral)+sBubble(112,37)+sStar(143,109,13);break;
 case 'knowledge':b+=sBook(75,102,1.15)+sBook(119,63,1.05)+sStar(218,47,15);break;
 case 'search':b+=sBox(65,103,49,true)+`<circle cx="175" cy="83" r="29" fill="none" stroke="${SC.blue}" stroke-width="8"/>`+sl(196,105,225,139,SC.blue,11);break;
 case 'invite':b+=sp(70,153,.8,'reach')+sp(217,153,.8,'stand',SC.coral)+sr(118,88,46,31,SC.paper,3)+`<path d="M118 88l23 20 23-20" stroke="${SC.coral}" stroke-width="3" fill="none"/>`;break;
 case 'mail':b+=sr(169,68,55,66,SC.blue,5)+sl(195,134,195,155,SC.tan,6)+sp(70,153,.9,'reach')+sr(121,99,38,25,SC.paper,2)+`<path d="M121 99l19 14 19-14" stroke="${SC.coral}" fill="none" stroke-width="2"/>`;break;
 case 'vehicle':b+=sr(83,86,128,45,SC.blue,12)+sr(105,56,78,44,SC.blue,12)+sr(116,63,56,25,'#dbe8df',4)+sc(112,132,15,SC.ink)+sc(184,132,15,SC.ink)+sa(225,105,250,105);break;
 case 'bicycle':b+=`<circle cx="82" cy="127" r="28" fill="none" stroke="${SC.ink}" stroke-width="5"/><circle cx="200" cy="127" r="28" fill="none" stroke="${SC.ink}" stroke-width="5"/><path d="M82 127l34-58 28 58H82m62 0 38-55 18 55m-19-55h21m-87-3h24" fill="none" stroke="${SC.coral}" stroke-width="5" stroke-linecap="round"/>`;break;
 case 'sail':b+=sBoat(143,129)+`<path d="M43 157q16-12 32 0t32 0 32 0 32 0 32 0 32 0" fill="none" stroke="${SC.blue}" stroke-width="4"/>`;break;
 case 'musicListen':b+=sp(112,153,1,'stand')+`<path d="M94 93V77q18-29 36 0v16" fill="none" stroke="${SC.ink}" stroke-width="5"/>`+sr(89,80,10,23,SC.coral,4)+sr(127,80,10,23,SC.coral,4)+sBook(160,112,.65);break;
 case 'season':b='';[[77,83,.43,SC.olive],[200,83,.43,'#76a260'],[77,163,.43,'#d8a96e'],[200,163,.43,'#c7d3d2']].forEach(([x,y,z,c])=>{b+=`<g transform="translate(${x} ${y}) scale(${z})">${sl(0,0,0,-70,SC.tan,13)}${sc(0,-75,45,c)}</g>`});break;
 case 'order':b='';[1,2,3].forEach((n,i)=>{b+=sr(35+i*83,66,51,54,i===1?SC.coral:SC.blue,8)+`<text x="${60+i*83}" y="103" text-anchor="middle" fill="${SC.paper}" font-size="29">${n}</text>`;if(i<2)b+=sa(91+i*83,93,108+i*83,93)});break;
 case 'shapes':b+=sc(78,100,29,SC.coral)+sr(128,73,55,55,SC.blue,5)+`<path d="M217 63l-28 66h56Z" fill="${SC.olive}"/>`;break;
 case 'light':b+=sr(131,117,18,25,SC.tan,3)+`<path d="M123 119q1-14-13-29a38 38 0 1 1 60 0q-14 14-13 29Z" fill="#e8cf86"/>`+sl(122,147,158,147,SC.ink,4);break;
 case 'star':b+=sStar(140,87,53);break;
 case 'rain':b+=sRain(112,53)+`<path d="M67 149q72-28 149 0" fill="#bfd6d6"/>`;break;
 case 'sky':b+=sCloudSun()+`<path d="M51 103q0-19 20-19 12-33 38-12 29-4 25 27Z" fill="${SC.paper}"/>`;break;
 case 'wind':b+=sTree(182,155,.85)+`<path d="M36 51h72q20 0 20-13t-20-9M36 76h115q23 0 23 17t-20 17M36 103h56" fill="none" stroke="${SC.blue}" stroke-width="4" stroke-linecap="round"/>`;break;
 case 'video':b+=sScreen(67,43,1.95)+`<path d="M130 70l32 21-32 21Z" fill="${SC.coral}"/>`;break;
 case 'name':b+=sp(91,152,1,'stand')+sr(151,69,74,49,SC.paper,6)+sc(164,80,3,SC.blue)+sl(164,94,211,94,SC.coral,4)+sl(164,104,196,104,SC.blue,3);break;
 case 'belong':b+=sp(85,152,1,'stand')+sr(161,90,55,57,SC.blue,8)+`<path d="M174 90V77h29v13" fill="none" stroke="${SC.ink}" stroke-width="4"/>`+sl(132,100,161,106,SC.coral,3);break;
 case 'clockPerson':b+=sp(86,153,.9,'walk')+sClock(193,77,Number(option)||9,1.4);break;
 case 'doorPerson':b+=sp(87,153,.85,'stand')+sDoor(178,53,true)+sBubble(105,29);break;
 case 'rule':b+=sPaper(107,36,1.9)+sCheck(123,76)+sCheck(123,110);break;
 case 'faceMirror':b+=sFace(109,90)+`<ellipse cx="200" cy="81" rx="32" ry="47" fill="none" stroke="${SC.tan}" stroke-width="5"/>`+sl(200,129,200,155,SC.tan,7);break;
 case 'boxArrow':b+=sBox(95,83,93,option==='open')+sa(218,135,218,78);break;
 case 'line':b+=sl(47,96,233,96,SC.blue,6)+sc(47,96,6,SC.coral)+sc(233,96,6,SC.coral);break;
 case 'question':b+=sQuestion(138,87,2.6);break;
 case 'check':b+=sCheck(113,104,option!=='no');break;
 case 'repeat':b+=sBasketball(143,109,22)+`<path d="M96 109a47 47 0 1 1 55 46m-18-12 18 12-18 10" fill="none" stroke="${SC.olive}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;break;
 case 'bench':b+=sr(61,91,158,15,SC.tan,4)+sr(64,59,152,17,SC.tan,4)+sr(64,80,152,9,SC.tan,2)+sl(77,106,77,153,SC.tan,8)+sl(203,106,203,153,SC.tan,8);break;
 case 'band':b+=sr(39,142,202,12,SC.tan,3)+sp(75,142,.75,'carry')+sp(207,142,.75,'stand',SC.coral)+sc(140,118,23,SC.coral)+sl(119,140,119,151,SC.ink,3)+sl(161,140,161,151,SC.ink,3)+`<ellipse cx="197" cy="112" rx="17" ry="23" fill="${SC.tan}"/>`+sl(197,108,218,78,SC.tan,7);break;
 case 'bite':b+=sFace(106,84)+sApple(173,104,28)+sc(158,87,12,'#f2f5e8')+sc(150,103,10,'#f2f5e8');break;
 case 'blow':b+=sp(90,153,1,'reach')+sr(199,101,14,48,SC.coral,3)+`<path d="M205 92q-12-8 0-24 12 16 0 24" fill="#e8cc78"/><path d="M119 93q35-20 66 0m-64 10q30-9 62 4" stroke="${SC.blue}" stroke-width="3" fill="none"/>`;break;
 case 'moneyPrice':{const n=option==='expensive'?6:1;b+=sBox(63,102,60)+sr(171,49,59,42,SC.paper,4)+sl(172,91,154,111,SC.line,2);for(let i=0;i<n;i++)b+=sc(175+(i%3)*21,119-Math.floor(i/3)*22,9,'#dfc476');break;}
 case 'comfortable':b+=sr(51,91,177,55,SC.blue,13)+sr(65,66,149,48,'#a5bfcd',12)+sr(47,97,26,51,SC.blue,9)+sr(207,97,26,51,SC.blue,9)+sp(139,144,.8,'sit',SC.coral);break;
 case 'cold':b+=sp(135,154,1,'stand',SC.blue,'sad')+sr(121,108,30,9,SC.coral,3)+sl(147,110,153,130,SC.coral,8)+[57,214].map(x=>sl(x,47,x,71,SC.blue,3)+sl(x-10,53,x+10,65,SC.blue,3)+sl(x+10,53,x-10,65,SC.blue,3)).join('');break;
 case 'puzzle':b+=sr(141,69,84,67,SC.tan,6)+sr(151,79,27,20,SC.blue,2)+sr(184,79,27,20,SC.coral,2)+sr(151,106,27,20,SC.olive,2)+(option==='easy'?sr(184,106,27,20,'#e7cf8d',2):'')+sp(75,153,.95,'reach',SC.blue,option==='easy'?'happy':'tired');if(option==='easy')b+=sCheck(184,46);else b+=sQuestion(222,40,.6);break;
 case 'drop':b+=sr(68,49,49,9,SC.tan,2)+`<path d="M145 72q-19 30 0 30t0-30" fill="${SC.blue}"/>`+sa(204,59,204,129)+`<ellipse cx="145" cy="151" rx="24" ry="5" fill="#bfd9d7"/>`;break;
 case 'each':b+=sp(66,154,.75)+sp(141,154,.75,'stand',SC.coral)+sp(216,154,.75)+[66,141,216].map(x=>sApple(x,65,15)).join('');break;
 case 'enough':b+=sp(62,135,.7,'sit')+sp(143,135,.7,'sit',SC.coral)+sp(224,135,.7,'sit')+[62,143,224].map(x=>sr(x-15,129,39,8,SC.tan,2)+sl(x-12,137,x-12,155,SC.tan,4)+sl(x+18,137,x+18,155,SC.tan,4)).join('');break;
 case 'except':b+=[76,141,206].map((x,i)=>sApple(x,104,24,i===2?SC.blue:SC.coral)).join('')+`<path d="M43 143h128" stroke="${SC.olive}" stroke-width="4"/>`+sl(183,142,228,142,SC.coral,3);break;
 case 'fill':b+=`<path d="M113 72h64l-7 77h-50Z" fill="${SC.paper}" stroke="${SC.blue}" stroke-width="3"/><path d="M119 94h51l-5 48h-41Z" fill="#b3d1d4"/>`+sl(146,27,146,74,SC.blue,7)+sa(208,133,208,88);break;
 case 'far':b+=sHouse(26,91,.55)+sHouse(211,91,.55)+sl(82,145,206,145,SC.line,3)+sa(87,128,203,128,SC.coral);break;
 case 'floor':b+=`<path d="M44 149V35h188v114Z" fill="#e5dfca"/><path d="M44 149l38-32h112l38 32Z" fill="${SC.tan}"/>`+sa(141,71,141,132,SC.coral);break;
 case 'heavy':b+=sp(99,153,1,'carry',SC.blue,option==='strong'?'happy':'tired')+sBox(107,98,option==='weak'?32:64);if(option!=='strong')b+=`<path d="M65 92q-9 13 0 13t0-13" fill="${SC.blue}"/>`;break;
 case 'hike':b+=`<path d="M80 154l73-115 87 115Z" fill="#c2cfab"/><path d="M153 39l-22 35h45Z" fill="${SC.paper}"/>`+sp(81,153,.8,'walk',SC.coral)+sl(104,126,119,154,SC.tan,3);break;
 case 'hit':b+=sp(104,153,1,'carry')+sl(112,104,161,61,SC.tan,10)+sc(187,73,14,SC.paper)+`<path d="M184 59v28" stroke="${SC.coral}" stroke-width="2"/>`;break;
 case 'knock':b+=sDoor(170,51)+sp(94,153,1,'reach')+`<path d="M155 96l7-4m-7 13 7 3" stroke="${SC.coral}" stroke-width="3"/>`;break;
 case 'middle':b+=[76,140,204].map((x,i)=>sApple(x,108,24,i===1?SC.coral:SC.blue)).join('');break;
 case 'over':b+=sp(136,112,.85,'walk',SC.coral)+sr(89,133,94,20,SC.tan,8)+`<path d="M62 121q75-119 153 0" fill="none" stroke="${SC.olive}" stroke-width="3" stroke-dasharray="6 5"/>`;break;
 case 'proud':b+=sp(104,153,1,'up',SC.coral)+sTrophy(193,96);break;
 case 'reach':b+=sTree(205,154,1.1)+sApple(168,93,14)+sp(106,154,1.05,'reach');break;
 case 'seed':b+=`<path d="M59 124h169v33H59Z" fill="#c5ac85"/>`+sc(108,140,8,'#947356')+`<path d="M167 135v-45q-35-3-31-25 27 1 31 25 28-25 30-2-12 12-30 11" fill="${SC.olive}"/>`;break;
 case 'handshake':b+=sp(75,154,.9,'reach')+sp(217,154,.9,'stand',SC.coral)+sl(217,122,151,119,SC.coral,7)+sl(111,120,151,119,SC.blue,7);break;
 case 'shy':b+=sp(138,153,1,'carry',SC.coral)+sc(130,91,4,'#df9c8f')+sc(145,91,4,'#df9c8f')+sl(141,117,151,102,'#edc49d',6);break;
 case 'sit':b+=sr(106,125,81,9,SC.tan,3)+sl(116,133,116,155,SC.tan,5)+sl(178,133,178,155,SC.tan,5)+sp(137,143,.95,'sit');break;
 case 'emptyRoom':b+=sDoor(65,45,true)+sr(167,119,46,8,SC.tan,2)+sl(172,127,172,155,SC.tan,4)+sl(205,127,205,155,SC.tan,4)+sl(207,118,207,87,SC.tan,6);break;
 case 'uniform':b+=sp(71,153,.85,'stand',SC.blue)+sp(141,153,.85,'stand',SC.blue)+sp(211,153,.85,'stand',SC.blue)+[71,141,211].map(x=>sc(x+3,121,3,SC.paper)).join('');break;
 case 'palette':b+=`<path d="M126 39c-96-4-108 111-20 111 34 0 5-35 32-38 26-2 31 32 65 11 68-42-1-88-77-84" fill="${SC.tan}"/>`+sc(167,92,15,'#f2f5e8')+[['#df8972',81,82],['#8fb2be',114,60],['#9bb77e',151,59],['#e5c779',195,77]].map(([c,x,y])=>sc(x,y,12,c)).join('');break;
 case 'camp':b+=`<path d="M63 151l76-112 77 112Z" fill="${SC.coral}"/><path d="M139 39l-9 112h-29Z" fill="#e8cda3"/><path d="M139 39l13 112h-22Z" fill="#94775e"/>`+sTree(231,154,.6);break;
 case 'roll':b+=sBasketball(100,128,24)+sa(146,132,227,132)+`<path d="M79 100q24-25 46 0" stroke="${SC.olive}" stroke-width="3" fill="none"/>`;break;
 case 'wear':b+=sp(136,154,1.1,'stand')+sr(121,103,30,34,SC.coral,6)+sl(115,109,102,124,SC.coral,8)+sl(155,109,168,124,SC.coral,8);break;
 case 'attack':b+=sp(74,154,.9,'reach',SC.coral)+sp(215,154,.9,'carry')+`<path d="M161 90h35v31q-17 26-35 0Z" fill="${SC.olive}"/>`+sa(119,108,151,108,SC.coral);break;
 case 'park':b+=sTree(55,155,.8)+sTree(223,155,.8)+sr(93,113,95,10,SC.tan,3)+sl(105,123,105,155,SC.tan,5)+sl(177,123,177,155,SC.tan,5)+sr(95,88,91,14,SC.tan,3);break;
 case 'pond':b+=`<ellipse cx="141" cy="129" rx="91" ry="27" fill="#b2cfd0"/><path d="M108 113q8-24 27-7 34-8 27 17-22 25-48 3Z" fill="#ebd18e"/><circle cx="122" cy="102" r="12" fill="#ebd18e"/><path d="M111 104l-14 5 14 4Z" fill="${SC.coral}"/>`+sc(118,100,2,SC.ink);break;
 case 'badApple':b+=sApple(140,105,43)+sc(121,104,13,'#9e886d')+`<path d="M151 99q15-15 28-4t22-6" fill="none" stroke="${SC.olive}" stroke-width="8" stroke-linecap="round"/>`+sc(201,88,2,SC.ink);break;
 case 'cheat':b+=sp(66,151,.85,'sit')+sp(204,151,.85,'sit',SC.coral)+sDesk(40,123,81)+sDesk(166,123,81)+sPaper(73,102,.5)+sPaper(195,102,.5)+`<path d="M70 92q58-36 124 11" fill="none" stroke="${SC.coral}" stroke-width="3" stroke-dasharray="5 5"/>`;break;
 case 'compass':{b='';const n=Number(option)||0;for(let i=0;i<4;i++)b+=`<path transform="rotate(${i*90} 140 90)" d="M140 24l-13 57h26Z" fill="${i===n?SC.coral:'#bdc9b5'}"/>`;b+=sc(140,90,13,SC.paper)+`<circle cx="140" cy="90" r="68" fill="none" stroke="${SC.line}" stroke-width="3"/>`;break;}
 case 'pronoun':{b+=sp(55,155,.75,'reach');if(option==='group'){b+=sp(160,154,.72,'stand',SC.coral)+sp(205,154,.72,'stand',SC.coral)}else{b+=sp(195,154,1,'stand',SC.coral);if(option==='female')b+=`<path d="M181 87q-6 22-1 28m29-28q6 22 1 28" fill="none" stroke="#817259" stroke-width="6"/>`}b+=sa(101,116,150,116);break;}
 case 'demonstrative':{const far=option.startsWith('far'),plural=option.endsWith('many'),x=far?214:135;b+=sp(58,155,.8,'reach');b+=sApple(x,128,18);if(plural)b+=sApple(x-25,106,14)+sApple(x+24,106,14);b+=sa(93,127,x-27,127);break;}
 case 'location':{const far=option==='there';b+=sp(65,154,.9,'stand')+sTree(222,155,.7);b+=sc(far?214:101,143,9,SC.coral)+`<ellipse cx="${far?214:101}" cy="153" rx="18" ry="4" fill="none" stroke="${SC.coral}" stroke-width="2"/>`;break;}
 default:return '';
 }
 return reviewSVG(b);
}
function unifiedSceneArt(word){const key=String(word||'').trim(),exact=typeof CARD_REVIEW!=='undefined'&&Object.prototype.hasOwnProperty.call(CARD_REVIEW,key),plan=SCENE_PLAN[key]||(!exact?SCENE_LOWER.get(key.toLowerCase()):null);if(!plan)return '';if(plan.symbol)return `<span class="review-symbol" style="--symbol-count:1" aria-hidden="true">${esc(plan.symbol)}</span>`;return completeScene(plan.scene,plan.option||'')}
