(()=>{
const body=document.body;
const loader=document.querySelector('.site-loader');
window.addEventListener('load',()=>setTimeout(()=>loader?.classList.add('is-hidden'),350));
setTimeout(()=>loader?.classList.add('is-hidden'),2200);
const header=document.querySelector('[data-header]'),toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.global-nav');
const closeMenu=()=>{body.classList.remove('menu-open');toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label','メニューを開く')};
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=body.classList.toggle('menu-open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('click',e=>{if(body.classList.contains('menu-open')&&!nav.contains(e.target)&&!toggle.contains(e.target))closeMenu()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});window.addEventListener('resize',()=>{if(innerWidth>860)closeMenu()})}
const toTop=document.querySelector('.to-top');const onScroll=()=>{header?.classList.toggle('is-scrolled',scrollY>12);toTop?.classList.toggle('is-visible',scrollY>500);document.querySelectorAll('[data-parallax] .brand-orbit').forEach((el,i)=>{el.style.transform=`translate3d(0,${scrollY*(i?-.035:.025)}px,0)`})};addEventListener('scroll',onScroll,{passive:true});onScroll();
document.querySelectorAll('[data-stagger]').forEach((el,i)=>el.style.transitionDelay=`${Math.min(i*90,360)}ms`);
const els=document.querySelectorAll('.reveal');if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -40px'});els.forEach(el=>io.observe(el))}else els.forEach(el=>el.classList.add('is-visible'));
document.querySelectorAll('.faq-item').forEach(item=>item.addEventListener('toggle',()=>{if(item.open)document.querySelectorAll('.faq-item[open]').forEach(other=>{if(other!==item)other.removeAttribute('open')})}));
})();