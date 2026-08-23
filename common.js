
(() => {
 document.documentElement.classList.add('custom-cursor');
 const cur=document.createElement('div');cur.className='cursor-custom';document.body.appendChild(cur);
 let last=0;
 window.addEventListener('mousemove',e=>{
   cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px';
   const n=Date.now(); if(n-last>55 && !e.target.closest('canvas')){
    last=n; const s=document.createElement('span');s.className='spark-trail';s.textContent=Math.random()>.5?'✦':'·';
    s.style.left=(e.clientX-4+Math.random()*8)+'px';s.style.top=(e.clientY-4+Math.random()*8)+'px';document.body.appendChild(s);setTimeout(()=>s.remove(),600);
   }
 });
 let sound=localStorage.getItem('sweetSound')!=='off'; const AC=window.AudioContext||window.webkitAudioContext;let ac;
 function tone(freq=760,d=.07,type='sine',gain=.025){
   if(!sound)return;
   try{ac=ac||new AC();const o=ac.createOscillator(),g=ac.createGain();o.frequency.value=freq;o.type=type;g.gain.value=gain;o.connect(g);g.connect(ac.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+d);o.stop(ac.currentTime+d)}catch(e){}
 }
 window.sweetTone=tone;
 window.buzz=()=>{if(!sound)return;tone(180,.18,'sawtooth',.04);setTimeout(()=>tone(145,.22,'sawtooth',.035),120)}
 document.addEventListener('click',e=>{if(e.target.closest('button,a'))tone(760,.05,'sine',.018)});
 window.toggleSweetSound=()=>{sound=!sound;localStorage.setItem('sweetSound',sound?'on':'off');document.querySelectorAll('.sound-toggle').forEach(x=>x.textContent=sound?'🔊 sound on':'🔇 sound off');if(sound)tone(980,.08,'triangle',.025)}
 window.addEventListener('DOMContentLoaded',()=>document.querySelectorAll('.sound-toggle').forEach(x=>x.textContent=sound?'🔊 sound on':'🔇 sound off'));
})();
