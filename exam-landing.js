(() => {
  'use strict';

  function renderJeePreview() {
    return '<div class="preview-matrix"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>';
  }
  function renderNeetPreview() {
    return '<div class="preview-analytics" aria-hidden="true"><div><span>Recall trend</span><b>+12%</b></div><p><i></i><i></i><i></i><i></i><i></i><i></i><i></i></p></div>';
  }
  function renderIscPreview() {
    return '<div class="preview-chips"><span><i></i>English</span><span><i></i>Maths</span><span><i></i>Physics</span><span><i></i>Chemistry</span><span><i></i>Biology</span><span><i></i>History</span></div>';
  }
  function renderIcsePreview() {
    return '<div class="preview-chips"><span><i></i>English</span><span><i></i>Maths</span><span><i></i>Science</span><span><i></i>History</span><span><i></i>Geography</span><span><i></i>Computer</span></div>';
  }
  function renderCbsePreview() {
    return '<div class="preview-performance"><span></span><span></span><span></span><span></span><span></span></div>';
  }
  function renderKcetPreview() {
    return '<div class="preview-flow"><span>Boards</span><b>↓</b><span>KCET</span><b>↓</b><span>Ready</span></div>';
  }
  function renderMhtcetPreview() {
    return '<div class="preview-chart"><i></i><i></i><i></i><i></i><i></i><i></i></div>';
  }

  const configs = {
    'jee-study-tracker': {
      key: 'jee', label: 'JEE command center', progress: '68%',
      cards: [['⚛', 'Physics', '82% Complete', 'is-blue'], ['◈', 'Mock Test', 'Tomorrow', 'is-gold'], ['π', 'Mathematics', 'Review', 'is-violet']],
      workflowTitle: 'Turn a large PCM syllabus into a clear weekly target.',
      workflow: [['01', 'Map PCM', 'See Physics, Chemistry and Mathematics without mixing their priorities.'], ['02', 'Test the weak links', 'Use confidence after practice to choose the next revision block.'], ['03', 'Protect revision', 'Keep high-weightage chapters in view before every mock.']],
      detail: renderJeePreview()
    },
    'neet-study-planner': {
      key: 'neet', label: 'NEET biology desk', progress: '82%',
      cards: [['✚', 'Human physiology', '82% mapped', 'is-teal'], ['⌬', 'NCERT revision', 'Today', 'is-leaf'], ['✦', 'Genetics', 'Review', 'is-coral']],
      workflowTitle: 'Keep NCERT detail, practice and revision in one rhythm.',
      workflow: [['01', 'Read with intent', 'Turn NCERT coverage into a chapter-by-chapter plan.'], ['02', 'Mark recall', 'Tag concepts that need another pass after questions.'], ['03', 'Cycle back', 'Bring the right Biology, Physics and Chemistry chapters forward.']],
      detail: renderNeetPreview()
    },
    'isc-study-organizer': {
      key: 'isc', label: 'ISC study desk', progress: '74%',
      cards: [['▰', 'Accounts', '76%', 'is-violet'], ['◈', 'Economics', 'Review Today', 'is-lilac'], ['⚛', 'Physics', '68%', 'is-plum']],
      workflowTitle: 'Give every ISC subject a desk of its own.',
      workflow: [['01', 'Lay out subjects', 'Organize commerce, science and literature work around school pace.'], ['02', 'Make space for boards', 'Track chapter completion beside assignments and internal deadlines.'], ['03', 'Review calmly', 'Use revision status to keep the final run-up deliberate.']],
      detail: renderIscPreview()
    },
    'cbse-study-planner': {
      key: 'cbse', label: 'CBSE Class 12', progress: '71%',
      cards: [['⌁', 'Electrostatics', 'Complete', 'is-blue'], ['▣', 'NCERT chapter', 'Review', 'is-gold'], ['π', 'Mathematics', 'On track', 'is-teal']],
      workflowTitle: 'Move from NCERT coverage to board confidence.',
      workflow: [['01', 'Cover NCERT', 'Make every chapter visible before it becomes a revision problem.'], ['02', 'Add school tests', 'Keep regular assessments close to your study plan.'], ['03', 'Build board readiness', 'Return to low-confidence chapters before the exam window.']],
      detail: renderCbsePreview()
    },
    'kcet-study-planner': {
      key: 'kcet', label: 'KCET balance', progress: '76%',
      cards: [['⌂', 'Boards', 'Complete', 'is-teal'], ['◈', 'KCET practice', 'Next', 'is-cyan'], ['⌁', 'PCM / PCB', 'Balanced', 'is-blue']],
      workflowTitle: 'Connect board work to KCET readiness—without two competing plans.',
      workflow: [['01', 'Board preparation', 'Keep school chapters grounded in one shared syllabus view.'], ['02', 'KCET practice', 'Move from covered chapters into targeted entrance work.'], ['03', 'Exam readiness', 'Use revision status to decide what deserves the next session.']],
      detail: renderKcetPreview()
    },
    'mhtcet-study-planner': {
      key: 'mhtcet', label: 'MHT CET flow', progress: '72%',
      cards: [['✦', 'Physics', '72% complete', 'is-pink'], ['◈', 'Mock review', 'Tonight', 'is-gold'], ['↗', 'Study streak', '8 days', 'is-violet']],
      workflowTitle: 'Balance PCM or PCB work with a revision rhythm you can keep.',
      workflow: [['01', 'Choose your mix', 'Keep Physics and Chemistry paired with Mathematics or Biology.'], ['02', 'Review mocks', 'Translate each test into a clear set of chapters to revisit.'], ['03', 'Keep momentum', 'Let a realistic revision schedule protect your study streak.']],
      detail: renderMhtcetPreview()
    },
    'icse-study-planner': {
      key: 'icse', label: 'ICSE Study Desk', progress: '81%',
      cards: [['◇', 'English', 'Revision Today', 'is-leaf'], ['✦', 'Mathematics', 'Confidence High', 'is-gold'], ['⌂', 'History', 'Review', 'is-teal']],
      workflowTitle: 'Give every ICSE subject a clear path to board readiness.',
      workflow: [['01', 'Organise subjects', 'See English, Mathematics, Science and Social Studies without mixing their priorities.'], ['02', 'Mark chapter progress', 'Update completion and confidence to surface weak topics before preboards.'], ['03', 'Prepare for boards', 'Use revision status to keep the final run-up steady and deliberate.']],
      detail: renderIcsePreview()
    }
  };
  configs['jee-study-planner'] = configs['jee-study-tracker'];
  configs['isc-study-planner'] = configs['isc-study-organizer'];
  configs['icse-study-tracker'] = configs['icse-study-planner'];
  configs['icse-chapter-tracker'] = configs['icse-study-planner'];
  configs['icse-revision-planner'] = configs['icse-study-planner'];

  const segment = location.pathname.split('/').filter(Boolean)[0] || '';
  const config = configs[segment];
  if (!config) return;
  document.body.classList.add('exam-page', `exam-${config.key}`);

  const nav = document.querySelector('.nav-links');
  if (nav) {
    const items = [
      { href: '/', label: 'Home' },
      { href: '/jee-study-planner', label: 'JEE', key: 'jee' },
      { href: '/neet-study-planner', label: 'NEET', key: 'neet' },
      { href: '/isc-study-planner', label: 'ISC', key: 'isc' },
      { href: '/icse-study-planner', label: 'ICSE', key: 'icse' },
      { href: '/cbse-study-planner', label: 'CBSE', key: 'cbse' },
      { href: '/kcet-study-planner', label: 'KCET', key: 'kcet' },
      { href: '/mhtcet-study-planner', label: 'MHT CET', key: 'mhtcet' },
      { href: '/contact', label: 'Contact' },
      { href: '/app', label: 'Open App' },
    ];
    nav.innerHTML = items.map(item => `<a href="${item.href}"${item.key === config.key ? ' aria-current="page"' : ''}>${item.label}</a>`).join('');
  }

  const panel = document.querySelector('.hero .panel');
  if (panel) {
    const lines = config.cards.map((card, i) => `<button class="chapter-line preview-row" type="button" aria-pressed="${i === 0 ? 'true' : 'false'}"><span class="chapter-dot ${i === 1 ? 'pending' : i === 2 ? 'review' : ''}"></span><span>${card[1]}</span><small>${card[2]}</small></button>`).join('');
    const floats = config.cards.map((card, i) => `<span class="float-card ${['one', 'two', 'three'][i]} ${card[3]}"><span class="float-glyph" aria-hidden="true">${card[0]}</span><span class="float-copy"><b>${card[1]}</b><small>${card[2]}</small></span></span>`).join('');
    panel.insertAdjacentHTML('afterbegin', `<div class="app-preview preview-${config.key}" aria-label="${config.label} interactive study planner preview"><div class="phone-shell"><div class="phone-notch"></div><div class="phone-title"><b>${config.label}</b><span class="preview-week">This week</span></div><div class="preview-score"><strong>${config.progress}</strong><span>syllabus mapped</span></div><div class="progress-track"><span></span></div>${config.detail}<div class="preview-list">${lines}</div></div>${floats}</div>`);
    const preview = panel.querySelector('.app-preview');
    panel.querySelectorAll('.preview-row').forEach((row) => row.addEventListener('click', () => {
      const isPressed = row.getAttribute('aria-pressed') === 'true';
      row.setAttribute('aria-pressed', String(!isPressed));
      row.classList.toggle('is-complete', !isPressed);
    }));
    generateHalo(preview);
  }

  function generateHalo(container) {
    const frag = document.createDocumentFragment();
    const isExcluded = (xp, yp) => {
      if (xp > 20 && xp < 77 && yp > 5 && yp < 95) return true;
      if (xp < 22 && yp > 8 && yp < 30) return true;
      if (xp > 78 && yp > 32 && yp < 55) return true;
      if (xp < 23 && yp > 75 && yp < 98) return true;
      return false;
    };
    const zones = [
      { x:[0,22], y:[0,9], w:22, h:9 },       // top-left
      { x:[23,77], y:[0,5], w:54, h:5 },      // top-center
      { x:[78,100], y:[0,9], w:22, h:9 },     // top-right
      { x:[0,23], y:[32,76], w:23, h:44 },    // left gap
      { x:[77,100], y:[0,32], w:23, h:32 },   // right upper
      { x:[77,100], y:[56,100], w:23, h:44 }, // right lower
      { x:[0,23], y:[96,100], w:23, h:4 },    // bottom-left
      { x:[23,77], y:[96,100], w:54, h:4 },   // bottom-center
      { x:[77,100], y:[96,100], w:23, h:4 },  // bottom-right
    ];
    const weights = [3,2,3,5,5,5,2,2,3];
    const totalWeight = weights.reduce((a,b)=>a+b,0);
    const colors = ['var(--exam-accent)','var(--exam-primary)','rgba(255,255,255,.35)'];
    for (let i = 0; i < 55; i++) {
      let r = Math.random() * totalWeight, zi = 0;
      for (let j = 0; j < weights.length; j++) { r -= weights[j]; if (r <= 0) { zi = j; break; } }
      const zone = zones[zi];
      const pctX = zone.x[0] + Math.random() * zone.w;
      const pctY = zone.y[0] + Math.random() * zone.h;
      if (isExcluded(pctX, pctY)) continue;
      const color = colors[Math.floor(Math.random() * 3)];
      const s = 1.5 + Math.random() * 2.5;
      const o = 0.2 + Math.random() * 0.25;
      const dd = 3.5 + Math.random() * 4.5;
      const da = Math.random() * -8;
      const tx = (Math.random() - 0.5) * 10;
      const ty = (Math.random() - 0.5) * 10;
      const dot = document.createElement('i');
      dot.className = 'halo-particle';
      dot.style.cssText = 'left:'+pctX+'%;top:'+pctY+'%;width:'+s+'px;height:'+s+'px;opacity:'+o+';animation-duration:'+dd+'s;animation-delay:'+da+'s;--tx:'+tx+'px;--ty:'+ty+'px;background:'+color+';box-shadow:0 0 '+(2+s)+'px '+color;
      frag.appendChild(dot);
    }
    container.appendChild(frag);
  }

  const compactFaq = document.querySelector('#faq > .container > .grid');
  if (compactFaq && !compactFaq.matches('[data-faq-accordion]')) {
    const entries = Array.from(compactFaq.querySelectorAll(':scope > .card')).map((card, index) => ({
      question: card.querySelector('h3')?.textContent?.trim() || `Question ${index + 1}`,
      answer: card.querySelector('p')?.textContent?.trim() || ''
    }));
    if (entries.length) {
      compactFaq.className = 'faq-accordion';
      compactFaq.setAttribute('data-faq-accordion', '');
      compactFaq.innerHTML = entries.map((entry, index) => {
        const id = `faq-${config.key}-${index + 1}`;
        return `<article class="faq-item" id="${id}"><h3 class="faq-question"><button type="button" class="faq-trigger" id="${id}-trigger" aria-expanded="false" aria-controls="${id}-panel"><span class="faq-question-text">${entry.question}</span><span class="faq-icon" aria-hidden="true"></span></button></h3><div id="${id}-panel" class="faq-panel" role="region" aria-labelledby="${id}-trigger" hidden><div class="faq-panel-inner"><div class="faq-answer"><p>${entry.answer}</p></div></div></div></article>`;
      }).join('');
    }
  }

  const faq = document.querySelector('.faq-section, #faq');
  if (faq) {
    const stages = config.workflow.map(([number, title, copy]) => `<article class="journey-step"><span>${number}</span><h3>${title}</h3><p>${copy}</p></article>`).join('');
    faq.insertAdjacentHTML('beforebegin', `<section class="exam-journey"><div class="container"><div class="section-head center"><span class="eyebrow">Your study rhythm</span><h2>${config.workflowTitle}</h2></div><div class="journey-grid">${stages}</div></div></section>`);
  }

  const revealItems = document.querySelectorAll('main > section:not(.hero), footer');
  revealItems.forEach((item) => item.classList.add('reveal'));
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    revealItems.forEach((item) => observer.observe(item));
  } else revealItems.forEach((item) => item.classList.add('is-visible'));

  const hero = document.querySelector('.hero');
  if (hero && matchMedia('(pointer:fine) and (prefers-reduced-motion: no-preference)').matches) {
    hero.addEventListener('pointermove', (event) => {
      const box = hero.getBoundingClientRect();
      hero.style.setProperty('--px', String(event.clientX - box.left - box.width / 2));
      hero.style.setProperty('--py', String(event.clientY - box.top - box.height / 2));
    });
  }
  document.querySelectorAll('.card').forEach((card) => card.addEventListener('pointermove', (event) => {
    const box = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${((event.clientX - box.left) / box.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${((event.clientY - box.top) / box.height) * 100}%`);
  }));
})();
