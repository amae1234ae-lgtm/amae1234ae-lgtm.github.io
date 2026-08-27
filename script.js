const menu=document.querySelector('.menu-button');
const nav=document.querySelector('.nav');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const year=document.getElementById('year');
if(year) year.textContent=new Date().getFullYear();

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

async function loadApprovedArtwork(selector,parts){
  try{
    const chunks=await Promise.all(parts.map(async path=>{
      const response=await fetch(path,{cache:'force-cache'});
      if(!response.ok) throw new Error(`Failed to load ${path}`);
      return (await response.text()).trim();
    }));
    const source=`data:image/jpeg;base64,${chunks.join('')}`;
    document.querySelectorAll(selector).forEach(img=>{img.src=source;img.decoding='async';});
  }catch(error){
    console.error('HAND artwork load error:',error);
  }
}

loadApprovedArtwork('.approved-land',['assets/land-tiny-0.txt','assets/land-tiny-1.txt']);
loadApprovedArtwork('.approved-struxa',['assets/struxa-tiny-0.txt','assets/struxa-tiny-1.txt','assets/struxa-tiny-2.txt']);
