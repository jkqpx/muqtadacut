// Reveal the supplied artwork with pen strokes, preserving its exact outlines.
async function mountSignature(){
 const hero=document.querySelector('.hero');if(!hero||hero.dataset.signatureMounted)return;
 hero.dataset.signatureMounted='true';
 try{
  const response=await fetch('/assets/muqtada-title.svg');if(!response.ok)throw new Error('Title unavailable');
  const doc=new DOMParser().parseFromString(await response.text(),'image/svg+xml');
  const svg=doc.documentElement;svg.removeAttribute('width');svg.removeAttribute('height');
  svg.classList.add('handwritten-title');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');
  const ns='http://www.w3.org/2000/svg',mask=document.createElementNS(ns,'mask');
  mask.id='muqtada-pen-mask';mask.setAttribute('maskUnits','userSpaceOnUse');mask.setAttribute('x','-30');mask.setAttribute('y','-30');mask.setAttribute('width','866');mask.setAttribute('height','206');mask.style.maskType='alpha';
  const strokes=[
   ['M800 119 C801 98 793 65 778 64 C765 63 753 79 741 96 C761 108 789 118 799 119 C776 128 739 117 716 116',38,680],
   ['M716 116 C684 116 653 113 642 87 C638 68 657 56 676 56 C696 56 708 78 690 100 C675 115 649 117 623 117 C595 117 594 108 600 82',38,750],
   ['M595 112 C542 133 431 130 339 130 C280 130 237 122 221 114 C205 107 200 79 189 47',34,1000],
   ['M207 107 C194 115 174 118 160 118 C146 118 145 110 145 92',29,420],
   ['M131 38 C134 18 112 19 99 29 C80 42 65 67 81 76 L114 85 C129 88 136 94 123 108 C103 128 58 137 38 133 C7 129 0 102 9 66',35,950],
   ['M685 14 L673 14 L660 14',29,180],
   ['M594 13 L594 38',29,180]
  ];
  const paths=strokes.map(([d,width,duration])=>{const path=document.createElementNS(ns,'path');path.setAttribute('d',d);path.setAttribute('fill','none');path.setAttribute('stroke','white');path.setAttribute('stroke-width',width);path.setAttribute('stroke-linecap','round');path.setAttribute('stroke-linejoin','round');path.dataset.duration=duration;mask.append(path);return path});
  svg.querySelector('defs').append(mask);
  const art=document.createElementNS(ns,'g');svg.querySelectorAll(':scope > path').forEach(path=>art.append(path));art.setAttribute('mask','url(#muqtada-pen-mask)');svg.append(art);
  const wrap=document.createElement('div');wrap.className='signature-art';wrap.append(svg);hero.prepend(wrap);
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  let delay=60;const animations=[];
  paths.forEach(path=>{const length=path.getTotalLength();path.style.strokeDasharray=String(length);path.style.strokeDashoffset=String(length);const duration=Number(path.dataset.duration)*.46;animations.push(path.animate([{strokeDashoffset:length},{strokeDashoffset:0}],{duration,delay,easing:'cubic-bezier(.3,.08,.24,1)',fill:'forwards'}));delay+=duration-Math.min(65,duration*.4)});
  await Promise.all(animations.map(animation=>animation.finished));
 }catch(error){console.warn('Title animation unavailable',error.message)}
}
new MutationObserver(()=>mountSignature()).observe(document.body,{childList:true});
mountSignature();
