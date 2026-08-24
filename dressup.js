
const tabsEl = document.getElementById('dressTabs');
const optionsEl = document.getElementById('dressOptions');

const state = {
  skin:'#d7a07b',
  hair:'brownWave',
  face:'smile',
  shadow:'none',
  lips:'#c54d7b',
  top:'pinkCardigan',
  bottom:'denimMini',
  dress:'none',
  shoes:'pinkHeel',
  bag:'whiteBag'
};

const categories = ['skin','hair','face','shadow','lips','top','bottom','dress','shoes','bag'];

const data = {
  skin:[
    ['fair','#f2d7c8'],['light','#e5bfa3'],['warm','#d7a07b'],
    ['tan','#c88858'],['brown','#8b532f'],['deep','#5b321f']
  ],
  hair:[
    ['brown waves','brownWave'],['black long','blackLong'],['blonde','blonde'],
    ['ginger curls','gingerCurl'],['pink bob','pinkBob'],['pink pony','pinkPony'],['red waves','redWave']
  ],
  face:[
    ['smile','smile'],['kissy','kiss'],['sad','sad'],['crying','cry'],
    ['wink','wink'],['surprised','surprise']
  ],
  shadow:[
    ['none','none'],['frosty white','white'],['baby pink','pink'],
    ['icy blue','blue'],['smoky','smoke'],['cheetah','leopard']
  ],
  lips:[
    ['nude','#b86f70'],['pink gloss','#ef6a9d'],['hot pink','#ee238e'],
    ['cherry red','#c72e48'],['brown gloss','#8b4d43'],['berry','#7e2457']
  ],
  top:[
    ['pink cardigan','pinkCardigan'],['white tank','whiteTank'],['brown top','brownTop'],
    ['blue floral','blueFloral'],['lime bow','limeTop'],['aqua blouse','aquaTop'],['black tank','blackTank']
  ],
  bottom:[
    ['denim mini','denimMini'],['pink mini','pinkMini'],['peach mini','peachMini'],
    ['wide jeans','wideJeans'],['olive shorts','oliveShorts'],['red pants','redPants'],
    ['teal flares','tealFlares'],['blue shorts','blueShorts']
  ],
  dress:[
    ['none','none'],['pink fitted','pinkDress'],['cheetah mini','leopardDress'],
    ['black sparkle','blackSparkle'],['cream mini','creamDress']
  ],
  shoes:[
    ['pink heels','pinkHeel'],['black pumps','blackHeel'],['sneakers','sneaker'],
    ['fluffy pink','fluffy'],['pink boots','boots']
  ],
  bag:[
    ['none','none'],['white bag','whiteBag'],['brown bag','brownBag'],['pink bag','pinkBag']
  ]
};

let activeCategory = 'skin';

function renderTabs(){
  tabsEl.innerHTML = '';
  categories.forEach(cat=>{
    const b=document.createElement('button');
    b.className='cat-tab'+(cat===activeCategory?' active':'');
    b.textContent=cat.toUpperCase();
    b.addEventListener('click',()=>{
      activeCategory=cat;
      renderTabs();
      renderOptions();
    });
    tabsEl.appendChild(b);
  });
}

function renderOptions(){
  optionsEl.innerHTML='';
  data[activeCategory].forEach(([label,value])=>{
    const b=document.createElement('button');
    b.className='option'+(state[activeCategory]===value?' active':'');
    if(activeCategory==='skin'||activeCategory==='lips'){
      b.innerHTML=`<span class="swatch" style="background:${value}"></span><span>${label}</span>`;
    } else {
      const ico=document.createElement('span');
      ico.className='option-icon';
      ico.textContent = activeCategory==='hair'?'✂':
                        activeCategory==='face'?'☺':
                        activeCategory==='shadow'?'✦':
                        activeCategory==='top'?'👚':
                        activeCategory==='bottom'?'👗':
                        activeCategory==='dress'?'👗':
                        activeCategory==='shoes'?'👠':'👜';
      const txt=document.createElement('span');txt.textContent=label;
      b.append(ico,txt);
    }
    b.addEventListener('click',()=>{
      state[activeCategory]=value;
      if(activeCategory==='dress' && value!=='none'){state.top='none';state.bottom='none';}
      if((activeCategory==='top'||activeCategory==='bottom') && value!=='none'){state.dress='none';}
      applyAll();
      renderOptions();
    });
    optionsEl.appendChild(b);
  });
}

function setSkin(){
  document.getElementById('skinLayer').setAttribute('fill',state.skin);
}

function drawHair(){
  const back=document.getElementById('hairBackLayer');
  const front=document.getElementById('hairFrontLayer');
  back.innerHTML='';front.innerHTML='';
  const colors={
    brownWave:'#6b3826',blackLong:'#20171a',blonde:'#e2b34d',
    gingerCurl:'#c97821',pinkBob:'#f6a1c8',pinkPony:'#ff6a91',redWave:'#c82b2e'
  };
  const c=colors[state.hair]||'#6b3826';
  if(state.hair==='pinkBob'){
    front.innerHTML=`<path d="M194 97 Q198 42 250 44 Q303 43 306 99 L298 181 Q279 196 271 169 L272 103 Q250 73 225 102 L225 173 Q204 190 193 169Z" fill="${c}"/>`;
  } else if(state.hair==='pinkPony'){
    back.innerHTML=`<path d="M293 74 Q360 52 351 157 Q329 193 297 155Z" fill="${c}"/>`;
    front.innerHTML=`<path d="M196 96 Q202 48 250 45 Q299 45 304 96 Q284 78 270 75 Q248 57 224 78 Q210 77 196 96Z" fill="${c}"/>`;
  } else if(state.hair==='gingerCurl'){
    back.innerHTML=`<path d="M191 93 Q194 32 250 39 Q315 32 315 103 L326 286 Q293 309 283 265 L285 117 Q267 66 249 70 Q223 65 208 118 L211 277 Q181 306 176 268Z" fill="${c}"/>`;
    front.innerHTML=`<path d="M197 93 Q215 56 249 61 Q282 53 304 92 Q282 77 269 79 Q250 66 224 82 Q210 78 197 93Z" fill="${c}"/>`;
  } else {
    back.innerHTML=`<path d="M191 92 Q194 31 250 38 Q312 32 314 104 L324 310 Q291 333 282 286 L284 117 Q268 64 248 69 Q223 64 208 118 L212 298 Q182 329 176 288Z" fill="${c}"/>`;
    front.innerHTML=`<path d="M197 93 Q215 52 250 60 Q283 52 304 92 Q283 76 269 79 Q249 65 224 81 Q211 77 197 93Z" fill="${c}"/>`;
  }
}

function drawFace(){
  const l=document.getElementById('eyeLeft');
  const r=document.getElementById('eyeRight');
  const m=document.getElementById('mouthLine');
  const t=document.getElementById('tearDrop');

  l.setAttribute('d','M218 110 Q229 101 240 110');
  r.setAttribute('d','M260 110 Q271 101 282 110');
  m.setAttribute('d','M231 141 Q250 151 269 141');
  t.setAttribute('d','');

  if(state.face==='kiss') m.setAttribute('d','M241 141 Q250 133 259 141 Q250 149 241 141');
  if(state.face==='sad') m.setAttribute('d','M232 150 Q250 136 268 150');
  if(state.face==='cry'){m.setAttribute('d','M232 150 Q250 136 268 150');t.setAttribute('d','M279 118 Q287 131 279 144 Q271 131 279 118');}
  if(state.face==='wink') l.setAttribute('d','M218 111 Q229 118 240 111');
  if(state.face==='surprise') m.setAttribute('d','M250 139 m-8 0 a8 10 0 1 0 16 0 a8 10 0 1 0 -16 0');
  m.setAttribute('stroke',state.lips);
}

function drawMakeup(){
  const s=document.getElementById('shadowLayer');
  s.innerHTML='';
  if(state.shadow==='none') return;
  const fill={
    white:'#fff',pink:'#f18cc4',blue:'#85bfff',smoke:'#66505f',leopard:'url(#leopardPattern)'
  }[state.shadow];
  s.innerHTML=`<ellipse cx="229" cy="108" rx="18" ry="9" fill="${fill}" opacity=".82"/>
               <ellipse cx="271" cy="108" rx="18" ry="9" fill="${fill}" opacity=".82"/>`;
}

function drawClothes(){
  const top=document.getElementById('topLayer');
  const bottom=document.getElementById('bottomLayer');
  const dress=document.getElementById('dressLayer');
  const shoe=document.getElementById('shoeLayer');
  const bag=document.getElementById('bagLayer');
  top.innerHTML=bottom.innerHTML=dress.innerHTML=shoe.innerHTML=bag.innerHTML='';

  const tops={
    pinkCardigan:`<path d="M190 207 Q250 180 310 207 L299 326 Q270 313 250 319 Q229 313 201 326Z" fill="#d78ca9"/><circle cx="250" cy="236" r="4" fill="#fff"/><circle cx="250" cy="255" r="4" fill="#fff"/>`,
    whiteTank:`<path d="M208 196 L228 187 L272 187 L292 196 L291 320 Q250 334 209 320Z" fill="#fffdf8"/>`,
    brownTop:`<path d="M194 217 Q250 181 306 217 L296 314 Q250 333 204 314Z" fill="#6e4b40"/><path d="M208 208 Q250 246 292 208" fill="none" stroke="#4b302b" stroke-width="8"/>`,
    blueFloral:`<path d="M190 207 Q250 180 310 207 L299 322 Q250 339 201 322Z" fill="#d8eeff"/><circle cx="223" cy="239" r="6" fill="#6a9bd0"/><circle cx="278" cy="276" r="6" fill="#6a9bd0"/>`,
    limeTop:`<path d="M199 208 Q250 187 301 208 L294 314 Q250 329 206 314Z" fill="#caff72"/><path d="M231 299 L250 318 L269 299" fill="#332333"/>`,
    aquaTop:`<path d="M195 208 Q250 181 305 208 L297 328 Q250 341 203 328Z" fill="#b9eff2"/>`,
    blackTank:`<path d="M208 196 L228 187 L272 187 L292 196 L291 320 Q250 334 209 320Z" fill="#171319"/>`
  };
  if(tops[state.top]) top.innerHTML=tops[state.top];

  const bottoms={
    denimMini:`<path d="M205 369 Q250 390 295 369 L291 449 Q250 465 209 449Z" fill="#6c8cb5"/><path d="M250 382 V457" stroke="#d5e4f4" stroke-width="2"/>`,
    pinkMini:`<path d="M204 369 Q250 389 296 369 L291 456 Q250 475 209 456Z" fill="#f3a1c7"/>`,
    peachMini:`<path d="M204 369 Q250 389 296 369 L290 454 Q250 473 210 454Z" fill="#f0c19b"/>`,
    wideJeans:`<path d="M205 371 L246 381 L238 716 L193 716 L207 449 M254 381 L295 371 L307 716 L262 716 L285 449" fill="#657992"/>`,
    oliveShorts:`<path d="M204 370 Q250 389 296 370 L291 450 L255 445 L250 403 L245 445 L209 450Z" fill="#55622c"/>`,
    redPants:`<path d="M205 371 L246 381 L238 716 L193 716 L207 449 M254 381 L295 371 L307 716 L262 716 L285 449" fill="#aa3937"/>`,
    tealFlares:`<path d="M205 371 L246 381 L233 716 L183 716 L211 455 M254 381 L295 371 L316 716 L266 716 L289 455" fill="#157f78"/>`,
    blueShorts:`<path d="M204 370 Q250 389 296 370 L291 447 L255 444 L250 404 L245 444 L209 447Z" fill="#6ca5d5"/>`
  };
  if(bottoms[state.bottom]) bottom.innerHTML=bottoms[state.bottom];

  const dresses={
    pinkDress:`<path d="M190 205 Q250 180 310 205 L299 321 L326 501 Q250 530 174 501 L201 321Z" fill="#f2a4c8"/>`,
    leopardDress:`<path d="M190 205 Q250 180 310 205 L299 321 L326 501 Q250 530 174 501 L201 321Z" fill="url(#leopardPattern)"/>`,
    blackSparkle:`<path d="M190 205 Q250 180 310 205 L299 321 L326 501 Q250 530 174 501 L201 321Z" fill="#171218"/><g fill="#fff" filter="url(#glow)"><circle cx="220" cy="257" r="3"/><circle cx="277" cy="333" r="3"/><circle cx="248" cy="440" r="3"/></g>`,
    creamDress:`<path d="M193 205 Q250 181 307 205 L297 329 L313 489 Q250 511 187 489 L203 329Z" fill="#f1ece4"/>`
  };
  if(dresses[state.dress]) dress.innerHTML=dresses[state.dress];

  const shoes={
    pinkHeel:`<path d="M192 706 Q216 721 239 707 L237 741 L193 741Z M262 707 Q281 721 307 708 L309 742 L261 742Z" fill="#ee7eac"/>`,
    blackHeel:`<path d="M192 706 Q216 721 239 707 L237 741 L193 741Z M262 707 Q281 721 307 708 L309 742 L261 742Z" fill="#171217"/>`,
    sneaker:`<path d="M187 705 Q216 725 240 707 L244 741 L187 741Z M257 707 Q281 725 312 709 L317 742 L256 742Z" fill="#fff" stroke="#222" stroke-width="3"/>`,
    fluffy:`<path d="M190 708 Q216 721 239 707 L239 741 L190 741Z M260 708 Q282 722 308 709 L310 742 L260 742Z" fill="#ff4aa8"/><path d="M190 707 L239 707 M260 708 L309 708" stroke="#ffd5e9" stroke-width="9"/>`,
    boots:`<path d="M193 651 L239 651 L239 742 L193 742Z M261 651 L307 651 L307 742 L261 742Z" fill="#e6a7c9"/>`
  };
  if(shoes[state.shoes]) shoe.innerHTML=shoes[state.shoes];

  const bags={
    whiteBag:`<rect x="332" y="276" width="61" height="56" rx="9" fill="#fffdf7" stroke="#cba97b" stroke-width="4"/><path d="M344 276 Q363 242 382 276" fill="none" stroke="#cba97b" stroke-width="5"/>`,
    brownBag:`<path d="M331 282 Q362 260 394 282 L388 340 L337 340Z" fill="#785138"/><path d="M344 281 Q363 244 384 281" fill="none" stroke="#4b321f" stroke-width="5"/>`,
    pinkBag:`<rect x="332" y="279" width="61" height="56" rx="8" fill="#ff79b8"/><path d="M344 279 Q363 245 383 279" fill="none" stroke="#aa336e" stroke-width="5"/>`
  };
  if(bags[state.bag]) bag.innerHTML=bags[state.bag];
}

function applyAll(){
  setSkin(); drawHair(); drawFace(); drawMakeup(); drawClothes();
}

document.getElementById('randomizeBtn').addEventListener('click',()=>{
  categories.forEach(cat=>{
    const choices=data[cat];
    state[cat]=choices[Math.floor(Math.random()*choices.length)][1];
  });
  if(state.dress!=='none'){state.top='none';state.bottom='none';}
  applyAll(); renderOptions();
});

document.getElementById('resetBtn').addEventListener('click',()=>{
  Object.assign(state,{
    skin:'#d7a07b',hair:'brownWave',face:'smile',shadow:'none',lips:'#c54d7b',
    top:'pinkCardigan',bottom:'denimMini',dress:'none',shoes:'pinkHeel',bag:'whiteBag'
  });
  applyAll(); activeCategory='skin'; renderTabs(); renderOptions();
});

document.getElementById('saveDollBtn').addEventListener('click',()=>{
  const svg=document.getElementById('dollSvg');
  const source=new XMLSerializer().serializeToString(svg);
  const img=new Image();
  img.onload=()=>{
    const c=document.createElement('canvas'); c.width=1000;c.height=1640;
    const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);
    x.drawImage(img,0,0,c.width,c.height);
    const a=document.createElement('a');a.download='thesweetcherry-doll.png';a.href=c.toDataURL();a.click();
  };
  img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(source);
});

renderTabs();
renderOptions();
applyAll();
