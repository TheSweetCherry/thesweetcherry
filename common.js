
(() => {
  document.documentElement.classList.add('use-cursor');
  const c=document.createElement('div');c.className='custom-cursor';document.body.appendChild(c);
  let last=0;
  addEventListener('mousemove',e=>{
    c.style.left=e.clientX+'px';c.style.top=e.clientY+'px';
    const n=Date.now();
    if(n-last>55){
      last=n;
      const s=document.createElement('span');s.className='spark';s.textContent=Math.random()>.5?'✦':'·';
      s.style.left=(e.clientX-3+Math.random()*8)+'px';s.style.top=(e.clientY-3+Math.random()*8)+'px';
      document.body.appendChild(s);setTimeout(()=>s.remove(),620);
    }
  });
  const AC=window.AudioContext||window.webkitAudioContext;let ac;
  window.tone=(f=820,d=.06)=>{
    try{ac=ac||new AC();const o=ac.createOscillator(),g=ac.createGain();o.frequency.value=f;g.gain.value=.02;o.connect(g);g.connect(ac.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+d);o.stop(ac.currentTime+d)}catch(_){}
  };
  document.addEventListener('click',e=>{if(e.target.closest('button,a'))tone()});
})();
