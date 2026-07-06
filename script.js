const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const header = $('.site-header');
const menu = $('.menu-toggle');
const links = $('.nav-links');
if(menu && links){ menu.addEventListener('click',()=>{ const open=links.classList.toggle('open'); menu.setAttribute('aria-expanded', open); }); $$('.nav-links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open'))); }
const observer = new IntersectionObserver(entries=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); observer.unobserve(e.target); } }); },{threshold:.15});
$$('.reveal').forEach(el=>observer.observe(el));
window.addEventListener('scroll',()=>{ if(header) header.classList.toggle('scrolled', window.scrollY>30); });
$$('[data-count]').forEach(el=>{ const target=Number(el.dataset.count); let current=0; const step=Math.max(1, Math.ceil(target/40)); const run=()=>{ current=Math.min(target,current+step); el.textContent=current + (el.dataset.suffix||''); if(current<target) requestAnimationFrame(run); }; const io=new IntersectionObserver(es=>{ if(es[0].isIntersecting){run(); io.disconnect();}}, {threshold:.5}); io.observe(el); });
const themeBtn = $('.theme-toggle');
if(themeBtn){ const key='portfolio-theme-'+document.body.dataset.person; const saved=localStorage.getItem(key); if(saved) document.documentElement.dataset.theme=saved; themeBtn.addEventListener('click',()=>{ const next=document.documentElement.dataset.theme==='light'?'dark':'light'; document.documentElement.dataset.theme=next; localStorage.setItem(key,next); }); }

const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
