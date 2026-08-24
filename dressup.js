
const state={skin:'#d9a27d',hair:'longBrown',face:'smile',shadow:'none',lips:'#c74b78',top:'pinkCardigan',bottom:'denimMini',dress:'none',shoes:'pinkHeel',bag:'whiteBag'};
const categories=['skin','hair','face','shadow','lips','top','bottom','dress','shoes','bag'];
const data={
 skin:[['fair','#f2d6c6'],['light','#e4bc9f'],['tan','#c98d62'],['golden','#b86d36'],['brown','#87502d'],['deep','#5c321f']],
 hair:[['long brown','longBrown'],['black waves','blackWave'],['blonde','blonde'],['ginger curls','gingerCurl'],['pink bob','pinkBob'],['pink pony','pinkPony'],['red waves','redWave']],
 face:[['smile','smile'],['kissy','kiss'],['sad','sad'],['crying','cry'],['wink','wink'],['surprised','surprise']],
 shadow:[['none','none'],['frosty white','white'],['baby pink','pink'],['blue','blue'],['smoky','smoke'],['cheetah','leopard']],
 lips:[['nude','#b96f72'],['pink gloss','#ef6a9d'],['hot pink','#ee238e'],['cherry red','#c72748'],['brown gloss','#8a4b43'],['berry','#7c2356']],
 top:[['pink cardigan','pinkCardigan'],['white tank','whiteTank'],['brown going-out','brownTop'],['blue floral','blueFloral'],['lime bow top','limeTop'],['aqua blouse','aquaTop'],['black tank','blackTank']],
 bottom:[['denim mini','denimMini'],['pink mini','pinkMini'],['peach mini','peachMini'],['wide jeans','wideJeans'],['olive shorts','oliveShorts'],['red pants','redPants'],['teal flares','tealFlares'],['blue shorts','blueShorts']],
 dress:[['none','none'],['pink mini dress','pinkDress'],['cheetah dress','leopardDress'],['black sparkle','blackSparkle'],['cream fitted','creamDress']],
 shoes:[['pink heels','pinkHeel'],['black pumps','blackHeel'],['sneakers','sneaker'],['fluffy heels','fluffy'],['boots','boots']],
 bag:[['none','none'],['white bag','whiteBag'],['brown bag','brownBag'],['pink bag','pinkBag']]
};
const colors={longBrown:'#6c3725',blackWave:'#241a1d',blonde:'#e4b54c',gingerCurl:'#c97621',pinkBob:'#f7a4cb',pinkPony:'#ff668d',redWave:'#c92b2b'};
let activeCat='skin';
const $=id=>document.getElementById(id);
function tabs(){tabsEl=$('tabs');categories.forEach(c=>{let b=document.createElement('button');b.className='cat-tab'+(c===activeCat?' active':'');b.textContent=c.toUpperCase();b.onclick=()=>{activeCat=c;renderTabs();renderOptions()};tabsEl.appendChild(b)})}
function renderTabs(){tabs.innerHTML='';categories.forEach(c=>{let b=document.createElement('button');b.className='cat-tab'+(c===activeCat?' active':'');b.textContent=c.toUpperCase();b.onclick=()=>{activeCat=c;renderTabs();renderOptions()};tabs.appendChild(b)})}
function renderOptions(){options.innerHTML='';data[activeCat].forEach(([label,val])=>{let b=document.createElement('button');b.className='option'+(state[activeCat]===val?' active':'');if(activeCat==='skin'||activeCat==='lips'){b.innerHTML=`<span class="swatch" style="background:${val}"></span><span>${label}</span>`}else{b.textContent=label}b.onclick=()=>{state[activeCat]=val;if(activeCat==='dress'&&val!=='none'){state.top='none';state.bottom='none'}if((activeCat==='top'||activeCat==='bottom')&&val!=='none')state.dress='none';apply();renderOptions()};options.appendChild(b)})}
function hair(){
 const c=colors[state.hair]||'#6c3725',B=hairBack,F=hairFront;B.innerHTML='';F.innerHTML='';
 if(state.hair==='pinkBob'){F.innerHTML=`<path d="M145 88 Q155 22 210 28 Q270 26 281 91 L269 169 Q250 182 236 158 L239 86 Q210 53 179 83 L180 164 Q157 177 145 151Z" fill="${c}"/>`}
 else if(state.hair==='pinkPony'){B.innerHTML=`<path d="M251 61 Q325 39 319 131 Q302 177 263 143Z" fill="${c}"/>`;F.innerHTML=`<path d="M147 88 Q155 32 210 30 Q263 29 274 87 Q250 68 237 62 Q208 41 175 68 L162 151 Q141 131 147 88Z" fill="${c}"/>`}
 else if(state.hair==='gingerCurl'){B.innerHTML=`<path d="M139 83 Q141 22 210 24 Q287 24 287 94 L300 255 Q270 282 251 240 L253 119 Q235 53 207 54 Q177 52 159 120 L164 248 Q138 279 120 246Z" fill="${c}"/>`;F.innerHTML=`<path d="M150 80 Q176 40 208 47 Q245 38 270 83 Q249 66 238 70 Q210 54 178 72 Q165 66 150 80Z" fill="${c}"/>`}
 else if(state.hair==='blackWave'||state.hair==='redWave'){B.innerHTML=`<path d="M139 80 Q145 20 210 24 Q281 22 286 91 L299 279 Q266 303 248 257 L250 111 Q231 51 209 54 Q181 51 162 113 L166 267 Q139 302 118 266Z" fill="${c}"/>`;F.innerHTML=`<path d="M151 81 Q167 40 210 42 Q250 40 273 81 Q250 64 235 68 Q210 48 176 71Z" fill="${c}"/>`}
 else {B.innerHTML=`<path d="M141 83 Q146 18 210 22 Q280 20 284 91 L292 292 Q260 311 247 270 L249 111 Q232 52 208 54 Q180 50 162 114 L167 279 Q139 307 120 273Z" fill="${c}"/>`;F.innerHTML=`<path d="M151 82 Q171 37 210 42 Q251 38 273 81 Q249 63 235 69 Q210 48 176 71Z" fill="${c}"/>`}
}
function face(){
 const l=eyeL,r=eyeR,m=mouth,t=tear;
 l.setAttribute('d','M177 102 Q189 92 200 102');r.setAttribute('d','M220 102 Q231 92 243 102');t.setAttribute('d','');m.setAttribute('d','M194 131 Q210 142 226 131');m.setAttribute('stroke','#a82c67');
 if(state.face==='kiss')m.setAttribute('d','M201 132 Q210 124 219 132 Q210 141 201 132');
 if(state.face==='sad')m.setAttribute('d','M194 140 Q210 126 226 140');
 if(state.face==='cry'){m.setAttribute('d','M194 140 Q210 126 226 140');t.setAttribute('d','M238 111 Q247 125 238 138 Q229 125 238 111')}
 if(state.face==='wink')l.setAttribute('d','M177 103 Q189 109 200 103');
 if(state.face==='surprise')m.setAttribute('d','M210 128 m-8 0 a8 10 0 1 0 16 0 a8 10 0 1 0 -16 0');
}
function makeup(){
 shadow.innerHTML='';shadow.setAttribute('opacity',state.shadow==='none'?'0':'1');
 if(state.shadow!=='none'){let fill={white:'#fff',pink:'#f28ec4',blue:'#8cc2ff',smoke:'#60475a',leopard:'url(#leopardPattern)'}[state.shadow];shadow.innerHTML=`<ellipse cx="188" cy="99" rx="17" ry="9" fill="${fill}" opacity=".75"/><ellipse cx="232" cy="99" rx="17" ry="9" fill="${fill}" opacity=".75"/>`}
 lipsFill.setAttribute('fill',state.lips);lipsFill.setAttribute('rx','0');lipsFill.setAttribute('ry','0');mouth.setAttribute('stroke',state.lips)
}
function clothes(){
 topLayer.innerHTML='';bottomLayer.innerHTML='';dressLayer.innerHTML='';shoeLayer.innerHTML='';bagLayer.innerHTML='';
 const tops={
  pinkCardigan:`<path d="M144 197 Q210 169 276 197 L264 291 Q236 278 210 286 Q183 278 156 291Z" fill="#d88aa8"/><circle cx="210" cy="220" r="4" fill="#fff"/><circle cx="210" cy="238" r="4" fill="#fff"/>`,
  whiteTank:`<path d="M164 190 L185 182 L235 182 L256 190 L252 285 Q210 299 168 285Z" fill="#fffdf9"/>`,
  brownTop:`<path d="M147 205 Q210 168 273 205 L262 278 Q210 296 158 278Z" fill="#715142"/><path d="M161 199 Q210 236 259 199" fill="none" stroke="#4d3029" stroke-width="8"/>`,
  blueFloral:`<path d="M145 197 Q210 170 275 197 L264 283 Q210 301 156 283Z" fill="#d7ecff"/><circle cx="183" cy="220" r="6" fill="#5b8fc5"/><circle cx="236" cy="248" r="6" fill="#5b8fc5"/>`,
  limeTop:`<path d="M154 198 Q210 175 266 198 L258 276 Q210 290 162 276Z" fill="#caff71"/><path d="M190 260 L210 282 L230 260" fill="#392933"/>`,
  aquaTop:`<path d="M151 197 Q210 170 269 197 L260 289 Q210 302 160 289Z" fill="#b8eef0"/>`,
  blackTank:`<path d="M164 190 L185 182 L235 182 L256 190 L252 285 Q210 299 168 285Z" fill="#181419"/>`
 };
 if(tops[state.top])topLayer.innerHTML=tops[state.top];
 const bottoms={
  denimMini:`<path d="M151 347 Q210 370 269 347 L260 415 Q210 430 160 415Z" fill="#6f8fb8"/><path d="M210 360 V420" stroke="#d5e4f4" stroke-width="2"/>`,
  pinkMini:`<path d="M149 347 Q210 370 271 347 L263 421 Q210 440 157 421Z" fill="#f5a2c8"/>`,
  peachMini:`<path d="M149 347 Q210 368 271 347 L260 418 Q210 438 160 418Z" fill="#f2c399"/>`,
  wideJeans:`<path d="M151 350 L204 356 L198 574 Q174 586 153 572 L151 350 M216 356 L269 350 L270 573 Q245 588 223 574Z" fill="#667991"/>`,
  oliveShorts:`<path d="M149 348 Q210 370 271 348 L262 418 L214 410 L210 376 L206 410 L158 418Z" fill="#53602a"/>`,
  redPants:`<path d="M151 350 L204 356 L198 574 Q174 586 153 572 L151 350 M216 356 L269 350 L270 573 Q245 588 223 574Z" fill="#a73335"/>`,
  tealFlares:`<path d="M151 350 L204 356 L195 575 L143 575 L166 430 M216 356 L269 350 L278 575 L225 575 L254 430" fill="#167f78"/>`,
  blueShorts:`<path d="M149 348 Q210 368 271 348 L263 412 L215 410 L210 380 L205 410 L157 412Z" fill="#6da4d5"/>`
 };
 if(bottoms[state.bottom])bottomLayer.innerHTML=bottoms[state.bottom];
 const dresses={
  pinkDress:`<path d="M147 194 Q210 169 273 194 L262 290 L289 438 Q210 462 131 438 L158 290Z" fill="#f3a7c8"/>`,
  leopardDress:`<path d="M147 194 Q210 169 273 194 L262 290 L287 438 Q210 462 133 438 L158 290Z" fill="url(#leopardPattern)"/>`,
  blackSparkle:`<path d="M147 194 Q210 169 273 194 L262 290 L289 438 Q210 462 131 438 L158 290Z" fill="#161118"/><g fill="#fff"><circle cx="180" cy="245" r="3"/><circle cx="238" cy="315" r="3"/><circle cx="205" cy="400" r="3"/></g>`,
  creamDress:`<path d="M149 194 Q210 170 271 194 L260 300 L274 430 Q210 447 146 430 L160 300Z" fill="#f3eee6"/>`
 };
 if(dresses[state.dress])dressLayer.innerHTML=dresses[state.dress];
 const shoes={
  pinkHeel:`<path d="M151 566 Q174 579 197 567 L195 593 L153 593Z M236 568 Q253 580 270 571 L272 594 L235 594Z" fill="#ef7fae"/>`,
  blackHeel:`<path d="M151 566 Q174 579 197 567 L195 593 L153 593Z M236 568 Q253 580 270 571 L272 594 L235 594Z" fill="#171217"/>`,
  sneaker:`<path d="M145 566 Q174 583 199 568 L202 592 L145 592Z M230 568 Q253 584 274 571 L279 594 L229 594Z" fill="#fff" stroke="#222" stroke-width="3"/>`,
  fluffy:`<path d="M149 568 Q174 579 198 568 L198 592 L149 592Z M233 568 Q253 580 272 571 L274 594 L233 594Z" fill="#ff4ca8"/><path d="M148 566 L198 566 M232 567 L274 567" stroke="#ffd2e8" stroke-width="9"/>`,
  boots:`<path d="M151 525 L198 525 L198 593 L151 593Z M233 525 L272 525 L272 594 L233 594Z" fill="#e6a8ca"/>`
 };
 if(shoes[state.shoes])shoeLayer.innerHTML=shoes[state.shoes];
 const bags={whiteBag:`<rect x="282" y="260" width="58" height="54" rx="9" fill="#fffdf8" stroke="#cba97b" stroke-width="4"/><path d="M294 260 Q310 232 327 260" fill="none" stroke="#cba97b" stroke-width="5"/>`,brownBag:`<path d="M282 265 Q311 246 340 265 L334 322 L288 322Z" fill="#785238"/><path d="M294 264 Q310 229 329 264" fill="none" stroke="#4b321f" stroke-width="5"/>`,pinkBag:`<rect x="282" y="262" width="58" height="54" rx="8" fill="#ff78b8"/><path d="M294 262 Q310 231 328 262" fill="none" stroke="#aa336e" stroke-width="5"/>`};
 if(bags[state.bag])bagLayer.innerHTML=bags[state.bag];
}
function apply(){body.querySelectorAll('*').forEach(()=>{});document.querySelector('#body').setAttribute('fill',state.skin);hair();face();makeup();clothes()}
randomize.onclick=()=>{for(const c of categories){const a=data[c];state[c]=a[Math.floor(Math.random()*a.length)][1]}apply();renderOptions()}
reset.onclick=()=>{Object.assign(state,{skin:'#d9a27d',hair:'longBrown',face:'smile',shadow:'none',lips:'#c74b78',top:'pinkCardigan',bottom:'denimMini',dress:'none',shoes:'pinkHeel',bag:'whiteBag'});apply();renderOptions()}
saveDoll.onclick=()=>{const svg=new XMLSerializer().serializeToString(dollSvg);const img=new Image();img.onload=()=>{const c=document.createElement('canvas');c.width=840;c.height=1380;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(img,0,0,c.width,c.height);const a=document.createElement('a');a.download='thesweetcherry-doll.png';a.href=c.toDataURL();a.click()};img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)}
renderTabs();renderOptions();apply();
