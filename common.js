
(() => {
  document.documentElement.classList.add('custom-cursor');
  const c=document.createElement('div');c.className='cursor-pink';document.body.appendChild(c);
  let last=0;
  window.addEventListener('mousemove',e=>{
    c.style.left=e.clientX+'px';c.style.top=e.clientY+'px';
    const now=Date.now();
    if(now-last>55 && !e.target.closest('canvas')){
      last=now;const s=document.createElement('span');s.className='spark-trail';s.textContent=Math.random()>.5?'✦':'·';
      s.style.left=(e.clientX-4+Math.random()*8)+'px';s.style.top=(e.clientY-4+Math.random()*8)+'px';document.body.appendChild(s);setTimeout(()=>s.remove(),600)
    }
  });
  let soundOn=localStorage.getItem('sweetSound')!=='off';
  const AudioCtx=window.AudioContext||window.webkitAudioContext;let ac;
  function ping(freq=720,dur=.06,type='sine',gain=.025){
    if(!soundOn)return; try{
      ac=ac||new AudioCtx();const o=ac.createOscillator(),g=ac.createGain();o.frequency.value=freq;o.type=type;g.gain.value=gain;o.connect(g);g.connect(ac.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+dur);o.stop(ac.currentTime+dur);
    }catch(e){}
  }
  window.sweetPing=ping;
  document.addEventListener('click',e=>{if(e.target.closest('button,a'))ping(720,.055,'sine',.018)});
  window.toggleSweetSound=()=>{soundOn=!soundOn;localStorage.setItem('sweetSound',soundOn?'on':'off');document.querySelectorAll('.sound-toggle').forEach(x=>x.textContent=soundOn?'🔊 sound on':'🔇 sound off');if(soundOn)ping(880,.08)};
  window.addEventListener('DOMContentLoaded',()=>document.querySelectorAll('.sound-toggle').forEach(x=>x.textContent=soundOn?'🔊 sound on':'🔇 sound off'));
})();
