(() => {
  const main = document.querySelector('.main-content');
  if (!main) return;

  const scene = document.createElement('div');
  scene.className = 'spatial-void';
  scene.innerHTML = '<div class="starfield"></div><div class="scanline"></div>';
  document.body.prepend(scene);

  const intro = document.createElement('section');
  intro.className = 'spatial-intro reveal';
  intro.id = 'signal-space';
  intro.innerHTML = `<div class="spatial-copy"><span class="spatial-kicker">SIGNAL ATLAS / SPATIAL INTELLIGENCE</span><h2>看見 AI 背後的<br>整個世界。</h2><p>沿著滾動深入一條看不見的資本鏈：從計算核心，到承載算力的電力、網路與材料。這不是一張表，而是一個可以探索的供應鏈宇宙。</p><span class="scroll-cue">SCROLL TO ENTER <i></i> ↓</span></div>`;
  main.insertBefore(intro, main.firstElementChild);

  const story = document.createElement('section');
  story.className = 'narrative-zone reveal';
  story.id = 'map';
  story.innerHTML = `<div class="narrative-copy"><span class="chapter-no">CHAPTER 01 / THE DEPENDENCY FIELD</span><h2>每一顆晶片，<br>都有一個星系。</h2><p>AI 的表面是模型與應用；它的深層，是 <strong>GPU、先進製程、記憶體、網路、電力、銅與稀土</strong> 互相牽動的基礎設施。</p><div class="depth-metrics"><div><b>24</b><span>TRACKED NODES</span></div><div><b>04</b><span>CAPITAL LAYERS</span></div><div><b>30M</b><span>DATA RHYTHM</span></div></div></div><div class="supply-orbit" aria-label="AI 供應鏈空間關係圖"><i class="orbit-ring"></i><i class="orbit-ring"></i><i class="orbit-ring"></i><div class="orbit-core">AI<br><small>CORE DEMAND</small></div><div class="orbit-node node-nvda"><b>NVDA</b><span>COMPUTE</span></div><div class="orbit-node node-tsm"><b>TSM</b><span>FABRICATION</span></div><div class="orbit-node node-mu"><b>MU</b><span>MEMORY</span></div><div class="orbit-node node-copx"><b>COPX</b><span>METALS</span></div><div class="orbit-node node-power"><b>VRT</b><span>POWER / COOLING</span></div></div>`;
  main.insertBefore(story, document.querySelector('.metric-grid'));

  const nav = document.createElement('nav');
  nav.className = 'story-nav';
  nav.setAttribute('aria-label', '敘事導覽');
  nav.innerHTML = '<a class="active" href="#signal-space">01 SPACE</a><a href="#map">02 FIELD</a><a href="#watchlist">03 SIGNALS</a><a href="#signals">04 NOTES</a>';
  document.body.append(nav);

  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  }), { threshold: 0.14 });
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

  const sections = [...document.querySelectorAll('#signal-space,#map,#watchlist,#signals')];
  const navLinks = [...nav.querySelectorAll('a')];
  const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const index = sections.indexOf(entry.target);
    navLinks.forEach((link, linkIndex) => link.classList.toggle('active', linkIndex === index));
  }), { rootMargin: '-35% 0px -45% 0px', threshold: 0 });
  sections.forEach(section => sectionObserver.observe(section));

  window.addEventListener('pointermove', event => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;
    const orbit = document.querySelector('.supply-orbit');
    if (orbit && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      orbit.style.transform = `rotateY(${x * 4}deg) rotateX(${y * -3}deg)`;
    }
  }, { passive: true });
})();
