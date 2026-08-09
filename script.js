document.addEventListener('DOMContentLoaded',()=>{
  const year=document.getElementById('year');
  if(year) year.textContent=new Date().getFullYear();

  const header=document.querySelector('.header');
  const onScroll=()=>header?.classList.toggle('is-scrolled',window.scrollY>10);
  onScroll();
  window.addEventListener('scroll',onScroll,{passive:true});

  const nav=document.querySelector('.nav');
  const navlinks=document.querySelector('.navlinks');
  if(nav && navlinks){
    let btn=nav.querySelector('.mobile-menu-btn');
    if(!btn){
      btn=document.createElement('button');
      btn.className='mobile-menu-btn';
      btn.type='button';
      btn.setAttribute('aria-label','メニューを開く');
      btn.innerHTML='☰';
      nav.appendChild(btn);
    }
    btn.setAttribute('aria-expanded','false');
    btn.addEventListener('click',()=>{
      const open=navlinks.classList.toggle('is-open');
      btn.setAttribute('aria-expanded',String(open));
      btn.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');
      btn.innerHTML=open?'×':'☰';
    });
    navlinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      navlinks.classList.remove('is-open');
      btn.setAttribute('aria-expanded','false');
      btn.setAttribute('aria-label','メニューを開く');
      btn.innerHTML='☰';
    }));
  }

  // 既存ページの主要要素には自動でrevealを付与
  const autoTargets=[...document.querySelectorAll('.section-head,.card,.step,.table,.dl,.faq details,.form,.news a,.cta .wrap,.page-hero .wrap')];
  autoTargets.forEach((el,i)=>{
    el.classList.add('reveal');
    if(!el.dataset.delay && i%3) el.dataset.delay=String(i%3);
  });

  // HTML側でreveal指定した要素も含め、すべて監視する
  const revealTargets=[...document.querySelectorAll('.reveal')];

  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    }),{threshold:.08,rootMargin:'0px 0px -20px'});
    revealTargets.forEach(el=>io.observe(el));
  }else{
    revealTargets.forEach(el=>el.classList.add('is-visible'));
  }

  // JSエラー等があっても長時間真っ白にならないためのフォールバック
  window.setTimeout(()=>{
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(el=>el.classList.add('is-visible'));
  },900);

  const form=document.querySelector('.form');
  if(form) form.addEventListener('submit',e=>{
    e.preventDefault();
    alert('デモサイトのため、フォームは送信されません。');
  });
});
