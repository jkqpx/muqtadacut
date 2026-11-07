(()=>{const start=document.querySelector('.home-work'),end=document.querySelector('.partner-strip');if(!start||!end)return;let pending=false;function update(){pending=false;const line=innerHeight*.55;document.body.classList.toggle('film-mode',start.getBoundingClientRect().top<=line&&end.getBoundingClientRect().bottom>=line)}function queue(){if(!pending){pending=true;requestAnimationFrame(update)}}addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);addEventListener('pageshow',queue);update()})();

// Scrub the running loop itself, so releasing the strip never resets its position.
(()=>{
 const rail=document.querySelector('.partner-window'),track=rail?.querySelector('.partner-track');
 if(!track)return;
 let drag=null;
 rail.addEventListener('contextmenu',e=>e.preventDefault());
 rail.addEventListener('pointerdown',e=>{
   if(drag||!e.isPrimary||![0,2].includes(e.button))return;
   const width=track.firstElementChild.getBoundingClientRect().width;
   if(!width)return;
   const animation=track.getAnimations().find(a=>a.animationName==='partner-left');
   drag={id:e.pointerId,x:e.clientX,width,animation,time:Number(animation?.currentTime)||0,scroll:rail.scrollLeft};
   rail.classList.add('is-dragging');
   rail.setPointerCapture(e.pointerId);
   if(e.pointerType==='mouse')e.preventDefault();
 });
 rail.addEventListener('pointermove',e=>{
   if(!drag||e.pointerId!==drag.id)return;
   const dx=e.clientX-drag.x;
   if(drag.animation){
     const period=Number(drag.animation.effect.getTiming().duration);
     drag.animation.currentTime=((drag.time-dx*period/drag.width)%period+period)%period;
   }else rail.scrollLeft=drag.scroll-dx;
 });
 function release(e){
   if(!drag||e.pointerId!==drag.id)return;
   drag=null;rail.classList.remove('is-dragging');
   if(rail.hasPointerCapture(e.pointerId))rail.releasePointerCapture(e.pointerId);
 }
 for(const type of ['pointerup','pointercancel','lostpointercapture'])rail.addEventListener(type,release);
})();
