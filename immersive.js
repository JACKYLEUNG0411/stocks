(() => {
  const main = document.querySelector('.main-content');
  if (!main) return;

  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = 'immersive-v2.css';
  document.head.append(style);

  const scene = document.createElement('div');
  scene.className = 'spatial-void';
  scene.innerHTML = '<div class="starfield"></div><div class="scanline"></div>';
  document.body.prepend(scene);

  const intro = document.createElement('section');
  intro.className = 'spatial-intro reveal';
  intro.id = 'signal-space';
  intro.innerHTML = '<div class="spatial-copy"><span class="spatial-kicker">SIGNAL ATLAS / SPATIAL INTELLIGENCE</span><h2>看見 AI 背後的<br>整個世界。</h2><p>沿著滾動深入一條看不見的資本鏈：從計算核心，到承載算力的電力、網路與材料。這不是一張表，而是一個可以探索的供應鏈宇宙。</p><span class="scroll-cue">SCROLL TO ENTER <i></i> ↓</span></div>';
  main.insertBefore(intro, main.firstElementChild);

  const nodes = [
    {title:'GPU 計算核心', kicker:'01 / COMPUTE', copy:'模型的第一個物理入口：加速器、伺服器與算力需求。', assets:['NVDA','AMD','QQQ']},
    {title:'晶圓與先進製程', kicker:'02 / FABRICATION', copy:'每一次運算升級，都先經過製程、設備與良率的限制。', assets:['TSM','ASML','AMAT']},
    {title:'記憶體頻寬', kicker:'03 / MEMORY', copy:'AI 不只需要更多 FLOPS，也需要更快、更近的資料流。', assets:['MU','SMH','LRCX']},
    {title:'電力與散熱', kicker:'04 / POWER', copy:'資料中心把模型需求轉成電網、冷卻與能源資本支出。', assets:['VRT','CEG','ANET']},
    {title:'銅與導電材料', kicker:'05 / COPPER', copy:'網路、變壓器與機房擴張，讓金屬成為第二層需求訊號。', assets:['COPX','FCX','HG=F']},
    {title:'稀土與戰略材料', kicker:'06 / MATERIALS', copy:'最後一層是供應安全：磁材、電池與關鍵礦產的長期約束。', assets:['REMX','PICK','LIT']}
  ];

  const story = document.createElement('section');
  story.className = 'spatial-timeline';
  story.id = 'map';
  story.innerHTML = '<div class="timeline-rail"></div><div class="timeline-camera"><div class="camera-world"><div class="camera-hud">CAMERA POSITION<b id="cameraPosition">01 / COMPUTE</b></div><svg class="timeline-svg" viewBox="0 0 1000 1000" aria-hidden="true"><path d="M500 120 C250 220 760 300 500 390 S250 560 500 650 S760 820 500 950"></path><path d="M500 120 C760 220 250 300 500 390 S760 560 500 650 S250 820 500 950"></path><circle cx="500" cy="120" r="6"></circle><circle cx="500" cy="286" r="6"></circle><circle cx="500" cy="452" r="6"></circle><circle cx="500" cy="618" r="6"></circle><circle cx="500" cy="784" r="6"></circle><circle cx="500" cy="950" r="6"></circle></svg><div class="timeline-intro">AI SUPPLY CHAIN / LIVE EXPLORATION<strong>從 GPU 走到稀土。</strong><span>SCROLL TO MOVE CAMERA ↓</span></div><div class="realtime-readout">CURRENT LAYER<b id="layerReadout">COMPUTE</b></div></div><div class="timeline-progress" aria-label="供應鏈時間軸"></div></div><div class="timeline-end"></div>';
  main.insertBefore(story, document.querySelector('.metric-grid'));

  const world = story.querySelector('.camera-world');
  const nodesLayer = story.querySelector('.camera-world');
  nodes.forEach((node, index) => {
    const card = document.createElement('article');
    card.className = 'timeline-node';
    card.dataset.index = String(index);
    card.innerHTML = `<span class="node-index">${node.kicker}</span><h3>${node.title}</h3><p>${node.copy}</p><div class="node-assets">${node.assets.map(asset => `<span>${asset}</span>`).join('')}</div>`;
    nodesLayer.append(card);
    const dot = story.querySelectorAll('.timeline-svg circle')[index];
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `前往 ${node.title}`);
    button.addEventListener('click', () => window.scrollTo({top: story.offsetTop + story.offsetHeight * (index / nodes.length), behavior: 'smooth'}));
    story.querySelector('.timeline-progress').append(button);
    card.addEventListener('click', () => card.classList.toggle('focused'));
    if (dot) dot.dataset.index = String(index);
  });

  const nav = document.createElement('nav');
  nav.className = 'story-nav';
  nav.setAttribute('aria-label', '敘事導覽');
  nav.innerHTML = '<a class="active" href="#signal-space">01 SPACE</a><a href="#map">02 FIELD</a><a href="#watchlist">03 SIGNALS</a><a href="#signals">04 NOTES</a>';
  document.body.append(nav);

  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  }), {threshold:.12});
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

  const sections = [...document.querySelectorAll('#signal-space,#map,#watchlist,#signals')];
  const navLinks = [...nav.querySelectorAll('a')];
  const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const index = sections.indexOf(entry.target);
    navLinks.forEach((link, linkIndex) => link.classList.toggle('active', linkIndex === index));
  }), {rootMargin:'-35% 0px -45% 0px', threshold:0});
  sections.forEach(section => sectionObserver.observe(section));

  const cards = [...story.querySelectorAll('.timeline-node')];
  const progressButtons = [...story.querySelectorAll('.timeline-progress button')];
  const paths = [...story.querySelectorAll('.timeline-svg path')];
  const dots = [...story.querySelectorAll('.timeline-svg circle')];
  let ticking = false;
  function updateCamera() {
    ticking = false;
    const rect = story.getBoundingClientRect();
    const max = Math.max(1, story.offsetHeight - window.innerHeight);
    const progress = Math.max(0, Math.min(1, -rect.top / max));
    const raw = progress * nodes.length;
    const activeIndex = Math.min(nodes.length - 1, Math.floor(raw));
    const local = raw - activeIndex;
    const cameraX = Math.sin(progress * Math.PI * 2) * 5;
    const cameraY = (0.5 - local) * 4;
    const cameraZ = 20 + Math.sin(local * Math.PI) * 18;
    world.style.transform = `translate3d(${cameraX}vw,${cameraY}vh,${cameraZ}px) rotateY(${cameraX * -.18}deg) rotateX(${cameraY * .12}deg)`;
    cards.forEach((card, index) => {
      const distance = index - raw;
      const x = index % 2 ? 22 : -22;
      const z = Math.max(-620, -Math.abs(distance) * 390 + (index === activeIndex ? 80 : 0));
      const y = distance * 4;
      card.style.transform = `translate(calc(-50% + ${x}vw),calc(-50% + ${y}vh)) translateZ(${z}px) scale(${Math.max(.55, 1 - Math.abs(distance) * .12)})`;
      card.classList.toggle('active', Math.abs(distance) < .58);
      if (index === activeIndex) card.style.filter = 'none'; else card.style.filter = 'blur(1px)';
    });
    progressButtons.forEach((button, index) => button.classList.toggle('active', index === activeIndex));
    dots.forEach((dot, index) => dot.classList.toggle('active', index === activeIndex));
    paths.forEach(path => path.classList.toggle('active', activeIndex > 0));
    story.querySelector('#cameraPosition').textContent = `${String(activeIndex + 1).padStart(2,'0')} / ${nodes[activeIndex].kicker.split(' / ')[1]}`;
    story.querySelector('#layerReadout').textContent = nodes[activeIndex].kicker.split(' / ')[1];
  }
  function requestCameraUpdate() { if (!ticking) { ticking = true; requestAnimationFrame(updateCamera); } }
  window.addEventListener('scroll', requestCameraUpdate, {passive:true});
  window.addEventListener('resize', requestCameraUpdate, {passive:true});
  window.addEventListener('pointermove', event => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const x = (event.clientX / window.innerWidth - .5) * 2;
    const y = (event.clientY / window.innerHeight - .5) * 2;
    world.style.setProperty('--pointer-x', `${x * 3}deg`);
    world.style.setProperty('--pointer-y', `${y * -2}deg`);
  }, {passive:true});
  updateCamera();
})();
