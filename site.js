/* ═══════════════════════════════════════
   JESTY EXPLORE — Animations & Interactions
   ═══════════════════════════════════════ */

/* ─── 1. CONSTANTS ─── */
const SLOT_COLORS = {
  lime:   { body: '#EBF34F', limb: '#C8D132', shadow: '#8A9618', highlight: '#F8FBCE' },
  pink:   { body: '#FF8FA3', limb: '#E0637A', shadow: '#B84D60', highlight: '#FFD4DC' },
  sky:    { body: '#87CEEB', limb: '#5BAED4', shadow: '#3A8CB5', highlight: '#C8E8F5' },
  purple: { body: '#A78BFA', limb: '#7C5FD6', shadow: '#5B3FB5', highlight: '#D4C8FD' },
  mint:   { body: '#34D399', limb: '#1EB57F', shadow: '#15875F', highlight: '#A7F0D4' },
  peach:  { body: '#FDBA74', limb: '#E09550', shadow: '#B87638', highlight: '#FEE0C0' },
};
const SOURCE_COLOR = { body: '#EBF34F', limb: '#C8D132', shadow: '#8A9618', highlight: '#F8FBCE' };
const COLOR_KEYS = ['lime', 'pink', 'sky', 'purple', 'mint', 'peach'];
const ALL_EXPRESSIONS = [
  'smug','suspicious','yikes','eyeroll','disappointed','melting','dead',
  'thinking','happy','impressed','manic','petty','chaotic','dramatic','tender'
];

const CHARACTER_WIDTH = 280;
let currentColorKey = 'purple';
let heroMood = 'smug';
let equippedHat = 'crown';
let equippedGlasses = '3d-glasses';

const ACC_ANCHORS = {
  hat: {
    smug:{x:36,y:-2,rotate:0}, suspicious:{x:36,y:-6,rotate:6},
    yikes:{x:38,y:-10,rotate:0}, eyeroll:{x:34,y:0,rotate:-3},
    impressed:{x:36,y:-4,rotate:0}, manic:{x:36,y:-6,rotate:-4},
    melting:{x:36,y:-2,rotate:0}, dead:{x:36,y:0,rotate:8},
    thinking:{x:34,y:-4,rotate:-5}, happy:{x:36,y:-8,rotate:0},
    petty:{x:36,y:-2,rotate:0}, chaotic:{x:36,y:-6,rotate:-4},
    dramatic:{x:36,y:-4,rotate:0}, tender:{x:36,y:-4,rotate:0},
    disappointed:{x:36,y:-2,rotate:0},
  },
  glasses: {
    smug:{x:32,y:42,rotate:0}, suspicious:{x:32,y:40,rotate:3},
    yikes:{x:34,y:34,rotate:0}, eyeroll:{x:32,y:44,rotate:-2},
    impressed:{x:32,y:40,rotate:0}, manic:{x:32,y:38,rotate:-3},
    melting:{x:32,y:42,rotate:0}, dead:{x:32,y:44,rotate:5},
    thinking:{x:32,y:40,rotate:-3}, happy:{x:32,y:38,rotate:0},
    petty:{x:32,y:42,rotate:0}, chaotic:{x:32,y:38,rotate:-3},
    dramatic:{x:32,y:40,rotate:0}, tender:{x:32,y:40,rotate:0},
    disappointed:{x:32,y:42,rotate:0},
  }
};

const SHOWCASE_ROASTS = [
  { text: "You have 34 tabs open and none of them are helping.", mood: 'dead', color: 'purple', hat: 'crown', glasses: '3d-glasses', roasts: 21, tabs: 34 },
  { text: "LinkedIn and Reddit open together. Pick a personality.", mood: 'eyeroll', color: 'pink', hat: null, glasses: 'heart-shades', roasts: 48, tabs: 12 },
  { text: "Three shopping tabs at 2am. This isn't research.", mood: 'suspicious', color: 'lime', hat: 'beanie', glasses: 'sunglasses', roasts: 33, tabs: 8 },
  { text: "YouTube recommended page again. You never left.", mood: 'smug', color: 'sky', hat: 'cowboy-hat', glasses: null, roasts: 67, tabs: 23 },
  { text: "Gmail open for 6 hours. You read one email.", mood: 'disappointed', color: 'peach', hat: 'wizard-hat', glasses: null, roasts: 15, tabs: 19 },
  { text: "Stack Overflow and ChatGPT. Double-checking the robot.", mood: 'impressed', color: 'mint', hat: 'flame-crown', glasses: 'neon-shades', roasts: 89, tabs: 41 },
];

const ROAST_SCENES = [
  { text: "You've been on LinkedIn for 40 minutes.", mood: 'suspicious', hat: 'beanie', glasses: 'sunglasses' },
  { text: "4 tabs of the same shoe. Just buy it.", mood: 'eyeroll', hat: null, glasses: 'aviators' },
  { text: "Netflix, Hulu, and Disney+. Commitment issues.", mood: 'melting', hat: 'crown', glasses: '3d-glasses' },
  { text: "You closed one tab and opened three.", mood: 'dead', hat: 'cowboy-hat', glasses: null },
  { text: "That's your fifth Google search in 2 minutes.", mood: 'suspicious', hat: 'wizard-hat', glasses: 'pixel-shades' },
  { text: "Amazon at 2am. Your wallet is crying.", mood: 'eyeroll', hat: null, glasses: 'heart-shades' },
  { text: "12 tabs of Stack Overflow. Still stuck.", mood: 'dead', hat: 'beanie', glasses: null },
  { text: "Reddit and work email. Pick a side.", mood: 'suspicious', hat: 'crown', glasses: 'sunglasses' },
  { text: "Gmail open since Tuesday. It's Friday.", mood: 'melting', hat: null, glasses: 'neon-shades' },
  { text: "YouTube autoplay got you again.", mood: 'eyeroll', hat: 'cowboy-hat', glasses: 'pixel-shades' },
  { text: "3 Figma files. Zero progress.", mood: 'dead', hat: 'wizard-hat', glasses: '3d-glasses' },
  { text: "Twitter and LinkedIn open together. Identity crisis.", mood: 'suspicious', hat: 'flame-crown', glasses: 'aviators' },
];

const CHAT_SCRIPTS = [
  [{ from:'user', text:"That's not even true" }, { from:'jesty', text:"Your 47 tabs say otherwise" }],
  [{ from:'user', text:"I was being productive" }, { from:'jesty', text:"Reddit is not a productivity tool" }],
  [{ from:'user', text:"I only have 3 tabs" }, { from:'jesty', text:"...in this window" }],
];

const ACC_CYCLE_HATS = ['crown', 'party-hat', 'wizard-hat', 'cowboy-hat'];
const ACC_CYCLE_GLASSES = ['sunglasses', 'heart-shades', '3d-glasses', 'pixel-shades'];

/* ─── 2. RENDERING UTILITIES ─── */

function recolorSvg(content, from, to) {
  for (const key of ['body','limb','shadow','highlight']) {
    if (from[key] && to[key]) {
      content = content.replace(new RegExp(from[key].replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), 'gi'), to[key]);
    }
  }
  return content;
}

function buildFaceSvg(mood, colorKey, width) {
  const symbol = document.getElementById(`face-${mood}`);
  if (!symbol) return '';
  const vb = symbol.getAttribute('viewBox') || '-15 -10 150 140';
  const uid = 'xf' + Math.random().toString(36).slice(2,6);
  let content = symbol.innerHTML;
  content = content.replace(/id="clip-([^"]+)"/g, `id="clip-$1-${uid}"`);
  content = content.replace(/url\(#clip-([^)]+)\)/g, `url(#clip-$1-${uid})`);
  content = recolorSvg(content, SOURCE_COLOR, SLOT_COLORS[colorKey]);
  const w = width || 80;
  const h = Math.round(w * 0.93);
  return `<svg viewBox="${vb}" width="${w}" height="${h}">${content}</svg>`;
}

function renderFaceInto(el, mood, colorKey, width) {
  if (!el) return;
  el.innerHTML = buildFaceSvg(mood, colorKey, width);
}

function renderHeroFace(mood) {
  const svg = document.getElementById('x-hero-face');
  const symbol = document.getElementById(`face-${mood}`);
  if (!svg || !symbol) return;
  const uid = 'xh';
  let content = symbol.innerHTML;
  content = content.replace(/id="clip-([^"]+)"/g, `id="clip-$1-${uid}"`);
  content = content.replace(/url\(#clip-([^)]+)\)/g, `url(#clip-$1-${uid})`);
  content = recolorSvg(content, SOURCE_COLOR, SLOT_COLORS[currentColorKey]);
  svg.innerHTML = content;
  renderHeroAccessories();
}

function renderHeroAccessories() {
  const svg = document.getElementById('x-hero-face');
  if (!svg) return;
  svg.querySelectorAll('.x-hero-acc').forEach(el => el.remove());

  [{ slot:'hat', id: equippedHat }, { slot:'glasses', id: equippedGlasses }].forEach(({ slot, id }) => {
    if (!id) return;
    const symbol = document.getElementById(`acc-${id}`);
    if (!symbol) return;
    const anchors = ACC_ANCHORS[slot];
    const anchor = (anchors && anchors[heroMood]) || (anchors && anchors['smug']) || { x:0,y:0,rotate:0 };
    let content = symbol.innerHTML;
    content = recolorSvg(content, SOURCE_COLOR, SLOT_COLORS[currentColorKey]);
    let transform = `translate(${anchor.x}, ${anchor.y})`;
    if (anchor.rotate) {
      const vb = symbol.getAttribute('viewBox');
      const parts = vb ? vb.split(/\s+/).map(Number) : [0,0,44,30];
      transform += ` rotate(${anchor.rotate}, ${parts[2]/2}, ${parts[3]/2})`;
    }
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.classList.add('x-hero-acc');
    g.setAttribute('transform', transform);
    g.innerHTML = content;
    svg.appendChild(g);
  });
}

function renderAccOnSvg(svgEl, mood, hatId, glassesId, colorKey) {
  if (!svgEl) return;
  svgEl.querySelectorAll('.x-acc-layer').forEach(el => el.remove());
  [{ slot:'hat', id: hatId }, { slot:'glasses', id: glassesId }].forEach(({ slot, id }) => {
    if (!id) return;
    const symbol = document.getElementById(`acc-${id}`);
    if (!symbol) return;
    const anchors = ACC_ANCHORS[slot];
    const anchor = (anchors && anchors[mood]) || (anchors && anchors['smug']) || { x:0,y:0,rotate:0 };
    let content = symbol.innerHTML;
    content = recolorSvg(content, SOURCE_COLOR, SLOT_COLORS[colorKey]);
    let transform = `translate(${anchor.x}, ${anchor.y})`;
    if (anchor.rotate) {
      const vb = symbol.getAttribute('viewBox');
      const parts = vb ? vb.split(/\s+/).map(Number) : [0,0,44,30];
      transform += ` rotate(${anchor.rotate}, ${parts[2]/2}, ${parts[3]/2})`;
    }
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.classList.add('x-acc-layer');
    g.setAttribute('transform', transform);
    g.innerHTML = content;
    svgEl.appendChild(g);
  });
}

/* ─── 3. HERO ANIMATIONS ─── */

function initBgWord() {
  const container = document.getElementById('x-hero-bg-word');
  if (!container) return;
  container.innerHTML = 'JESTY'.split('').map(ch => `<span class="x-hero-bg-char">${ch}</span>`).join('');
  const chars = container.querySelectorAll('.x-hero-bg-char');

  const bgWordColors = [
    '#F0EDEA',
    SLOT_COLORS.lime.body,
    SLOT_COLORS.pink.body,
    SLOT_COLORS.sky.body,
    SLOT_COLORS.purple.body,
    SLOT_COLORS.mint.body,
    SLOT_COLORS.peach.body,
  ];
  let colorIdx = 0;

  // Hide chars immediately so first cycle entrance doesn't double up
  gsap.set(chars, { y: 120, opacity: 0 });

  let isFirst = true;

  function cycle() {
    container.style.setProperty('--bg-word-color', bgWordColors[colorIdx]);
    colorIdx = (colorIdx + 1) % bgWordColors.length;

    // First cycle (bg-secondary): short hold so color arrives sooner
    const holdTime = isFirst ? 2.5 : 6;
    const gapTime = isFirst ? 0.8 : 2;
    isFirst = false;

    gsap.set(chars, { y: 120, opacity: 0 });
    const enterTl = gsap.timeline({
      onComplete: () => {
        gsap.delayedCall(holdTime, () => {
          const exitTl = gsap.timeline({ onComplete: () => gsap.delayedCall(gapTime, cycle) });
          chars.forEach((ch, i) => {
            exitTl.to(ch, { y: -120, opacity: 0, duration: 0.4, ease: 'power2.in' }, i * 0.06);
          });
        });
      }
    });
    chars.forEach((ch, i) => {
      enterTl.to(ch, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.6)' }, i * 0.08);
    });
  }
  gsap.delayedCall(0.8, cycle);
}

function heroBounceIn() {
  const stage = document.getElementById('x-hero-stage');
  const wrapper = document.getElementById('x-hero-character');
  const face = document.getElementById('x-hero-face');
  if (!stage || !wrapper || !face) return;

  const cw = face.getBoundingClientRect().width || CHARACTER_WIDTH;
  const center = (stage.clientWidth - cw) / 2;
  wrapper.style.transform = `translateX(${-cw}px)`;

  gsap.fromTo(face,
    { scaleX: 1.12, scaleY: 0.9, rotation: -8, transformOrigin: '50% 100%' },
    { scaleX: 1, scaleY: 1, rotation: 0, duration: 0.6, delay: 0.25, ease: 'elastic.out(1, 0.6)' }
  );

  const pos = { val: -cw };
  gsap.to(pos, {
    val: center, duration: 0.6, ease: 'back.out(1.8)',
    onUpdate: () => { wrapper.style.transform = `translateX(${pos.val}px)`; },
    onComplete: startBreathing
  });
}

let breathTl = null;
function startBreathing() {
  const face = document.getElementById('x-hero-face');
  if (!face) return;
  breathTl = gsap.timeline({ repeat: -1, yoyo: true });
  breathTl.to(face, { scaleY: 1.015, transformOrigin: '50% 100%', duration: 2, ease: 'sine.inOut' });
}

function squashSettle(faceEl, onSwap) {
  if (!faceEl) return;
  if (breathTl) breathTl.pause();
  const tl = gsap.timeline({
    onComplete: () => {
      if (breathTl) { gsap.set(faceEl, { scaleY:1,scaleX:1,transformOrigin:'50% 100%' }); breathTl.restart(); }
    }
  });
  tl.to(faceEl, { scaleY:0.92, scaleX:1.04, transformOrigin:'50% 100%', duration:0.12, ease:'power2.in', onComplete:onSwap });
  tl.to(faceEl, { scaleY:1.08, scaleX:0.97, transformOrigin:'50% 100%', duration:0.14, ease:'power2.out' });
  tl.to(faceEl, { scaleY:0.97, scaleX:1.01, transformOrigin:'50% 100%', duration:0.115, ease:'sine.inOut' });
  tl.to(faceEl, { scaleY:1, scaleX:1, transformOrigin:'50% 100%', duration:0.145, ease:'sine.out' });
}

function heroFadeAndReenter() {
  const wrapper = document.getElementById('x-hero-character');
  const stage = document.getElementById('x-hero-stage');
  const face = document.getElementById('x-hero-face');
  if (!wrapper || !stage || !face) return;
  if (breathTl) breathTl.pause();

  const cw = face.getBoundingClientRect().width || CHARACTER_WIDTH;
  const center = (stage.clientWidth - cw) / 2;

  gsap.to(wrapper, {
    opacity: 0, duration: 0.4, ease: 'power2.in',
    onComplete: () => {
      renderHeroFace(heroMood);
      wrapper.style.transform = `translateX(${-cw}px)`;
      gsap.set(wrapper, { opacity: 1, y: 0 });
      gsap.set(face, { scaleX:1, scaleY:1, rotation:0 });
      gsap.fromTo(face,
        { scaleX:1.12, scaleY:0.9, rotation:-8, transformOrigin:'50% 100%' },
        { scaleX:1, scaleY:1, rotation:0, duration:0.6, delay:0.15, ease:'elastic.out(1, 0.6)' }
      );
      const pos = { val: -cw };
      gsap.to(pos, {
        val: center, duration: 0.6, ease: 'back.out(1.8)',
        onUpdate: () => { wrapper.style.transform = `translateX(${pos.val}px)`; },
        onComplete: () => {
          if (breathTl) { gsap.set(face, { scaleY:1,scaleX:1,transformOrigin:'50% 100%' }); breathTl.restart(); }
        }
      });
    }
  });
}

function startBlink() {
  function blink() {
    const svg = document.getElementById('x-hero-face');
    if (!svg) return;
    const eyes = [...svg.querySelectorAll('ellipse[fill="#FFFFFF"], circle[fill="#FFFFFF"]')].filter(el => {
      const cy = parseFloat(el.getAttribute('cy'));
      return cy >= 30 && cy <= 65;
    });
    eyes.forEach(el => {
      gsap.to(el, { scaleY:0.1, duration:0.08, transformOrigin:'center center', yoyo:true, repeat:1 });
    });
  }
  function schedule() {
    setTimeout(() => { blink(); schedule(); }, 2000 + Math.random() * 1500);
  }
  setTimeout(() => { blink(); schedule(); }, 2000);
}


function animateTenderHearts() {
  const svg = document.getElementById('x-hero-face');
  if (!svg) return;
  // Find only the heart paths (paths with #FF8FA3 and opacity 0.4, not the blush ellipses)
  const hearts = [...svg.querySelectorAll('path[fill="#FF8FA3"][opacity="0.4"]')];
  hearts.forEach((heart, i) => {
    gsap.fromTo(heart,
      { y: 0, opacity: 0.4, scale: 1, transformOrigin: '50% 50%' },
      { y: -30, opacity: 0, scale: 0.6, duration: 2.5, delay: 0.3 + i * 0.4, ease: 'power1.out' }
    );
    gsap.to(heart, {
      x: i === 0 ? -6 : 6, duration: 1.2, ease: 'sine.inOut',
      yoyo: true, repeat: 1
    });
  });
}

function animateThinkingBubbles() {
  const svg = document.getElementById('x-hero-face');
  if (!svg) return;
  // Thinking bubbles are grey circles with stroke="#BDBDBD"
  const bubbles = [...svg.querySelectorAll('circle[stroke="#BDBDBD"]')];
  if (!bubbles.length) return;
  // Order: smallest to largest (reverse DOM order)
  const ordered = [...bubbles].reverse();
  ordered.forEach((bubble, i) => {
    gsap.fromTo(bubble,
      { scale: 0, opacity: 0, transformOrigin: '50% 50%' },
      { scale: 1, opacity: 1, duration: 0.3, delay: 0.2 + i * 0.25, ease: 'back.out(2)' }
    );
    gsap.to(bubble, {
      y: -12, opacity: 0, duration: 1.8, delay: 1.2 + i * 0.15,
      ease: 'power1.out'
    });
  });
}

function startExpressionCycle() {
  const moods = ['smug','suspicious','eyeroll','melting','dead','thinking','impressed','chaotic','tender'];
  let idx = 0, cycle = 0;
  setInterval(() => {
    idx = (idx + 1) % moods.length;
    heroMood = moods[idx];
    cycle++;
    const face = document.getElementById('x-hero-face');
    if (cycle % 4 === 0) {
      heroFadeAndReenter();
      gsap.delayedCall(1.2, () => {

        if (heroMood === 'tender') animateTenderHearts();
        if (heroMood === 'thinking') animateThinkingBubbles();
      });
    } else {
      squashSettle(face, () => {
        renderHeroFace(heroMood);

        if (heroMood === 'tender') animateTenderHearts();
        if (heroMood === 'thinking') animateThinkingBubbles();
      });
    }
  }, 5000);
}

/* ─── 4. ROAST CARDS ─── */

function renderRoastCards() {
  const container = document.getElementById('x-roast-container');
  if (!container) return;

  SHOWCASE_ROASTS.forEach((roast, i) => {
    const colorObj = SLOT_COLORS[roast.color];

    // Ghost face with accessories
    const symbol = document.getElementById(`face-${roast.mood}`);
    let ghostSvg = '';
    if (symbol) {
      const vb = symbol.getAttribute('viewBox') || '-15 -10 150 140';
      const uid = 'rc' + i + 'g';
      let content = symbol.innerHTML;
      content = content.replace(/id="clip-([^"]+)"/g, `id="clip-$1-${uid}"`);
      content = content.replace(/url\(#clip-([^)]+)\)/g, `url(#clip-$1-${uid})`);
      content = recolorSvg(content, SOURCE_COLOR, colorObj);

      // Add accessories
      let accSvg = '';
      [{ slot: 'hat', id: roast.hat }, { slot: 'glasses', id: roast.glasses }].forEach(({ slot, id }) => {
        if (!id) return;
        const accSym = document.getElementById(`acc-${id}`);
        if (!accSym) return;
        const anchors = ACC_ANCHORS[slot];
        const anchor = (anchors && anchors[roast.mood]) || (anchors && anchors['smug']) || { x:0,y:0,rotate:0 };
        let ac = accSym.innerHTML;
        ac = recolorSvg(ac, SOURCE_COLOR, colorObj);
        let tr = `translate(${anchor.x}, ${anchor.y})`;
        if (anchor.rotate) {
          const avb = accSym.getAttribute('viewBox');
          const parts = avb ? avb.split(/\s+/).map(Number) : [0,0,44,30];
          tr += ` rotate(${anchor.rotate}, ${parts[2]/2}, ${parts[3]/2})`;
        }
        accSvg += `<g transform="${tr}">${ac}</g>`;
      });

      // Strip body, arms, legs — keep only face features (eyes, brows, mouth, blush)
      const temp = document.createElement('div');
      temp.innerHTML = `<svg>${content}</svg>`;
      const svg = temp.querySelector('svg');
      const bodyColor = colorObj.body;
      const limbColor = colorObj.limb;
      const shadowColor = colorObj.shadow;
      const highlightColor = colorObj.highlight;
      // Remove elements that are body/limb colored (blob shape, arms, hands, legs, feet, shadows, highlights)
      svg.querySelectorAll('path, ellipse, circle').forEach(el => {
        const fill = el.getAttribute('fill');
        const stroke = el.getAttribute('stroke');
        if (fill === bodyColor || fill === limbColor || fill === shadowColor || fill === highlightColor ||
            stroke === limbColor || stroke === bodyColor) {
          el.remove();
        }
      });
      // Also remove clip-path defs and clipped groups (body shadow/highlight overlays)
      svg.querySelectorAll('defs, [clip-path]').forEach(el => el.remove());
      const faceOnly = svg.innerHTML;

      ghostSvg = `<svg viewBox="20 -10 80 90" width="40" height="46">${faceOnly}${accSvg}</svg>`;
    }

    // Avatar: zoomed eye close-up
    let avatarSvg = '';
    if (symbol) {
      const uid = 'rc' + i + 'a';
      let content = symbol.innerHTML;
      content = content.replace(/id="clip-([^"]+)"/g, `id="clip-$1-${uid}"`);
      content = content.replace(/url\(#clip-([^)]+)\)/g, `url(#clip-$1-${uid})`);
      content = recolorSvg(content, SOURCE_COLOR, colorObj);
      // Zoomed viewBox tight on eyes area
      avatarSvg = `<svg viewBox="32 32 56 30" width="48" height="26">${content}</svg>`;
    }

    const card = document.createElement('div');
    card.className = 'x-roast-card';
    card.innerHTML = `
      <div class="x-roast-card-color" style="background:${colorObj.body}">
        <span class="x-roast-card-text">${roast.text}</span>
        <div class="x-roast-card-face">${ghostSvg}</div>
      </div>
      <div class="x-roast-card-bottom">
        <div class="x-roast-card-avatar">${avatarSvg}</div>
        <span class="x-roast-card-name">Jesty</span>
        <div class="x-roast-card-pills">
          <span class="x-roast-card-pill">${roast.roasts} Roasts</span>
          <span class="x-roast-card-pill">${roast.tabs} Tabs Open</span>
        </div>
      </div>`;
    container.appendChild(card);
  });

  animateCardsIn(container);
}

function animateCardsIn(container) {
  const cards = [...container.querySelectorAll('.x-roast-card')];
  const vw = window.innerWidth;
  const cx = vw / 2;
  const isMobile = vw <= 768;

  if (isMobile) {
    // Mobile: show only 4 cards, single movement, no drift
    const cardW = 280;
    const mobileSpots = [
      { x: -40,            y: 160,  r: -8,  from: 'left' },
      { x: vw - cardW + 20, y: 220,  r: 6,   from: 'right' },
      { x: 10,             y: 340,  r: 5,   from: 'left' },
      { x: vw - cardW - 10, y: 400,  r: -5,  from: 'right' },
    ];

    cards.forEach((card, i) => {
      if (i >= 4) { card.style.display = 'none'; return; }
      const spot = mobileSpots[i];
      const startX = spot.from === 'left' ? -300 : vw + 100;
      gsap.set(card, { x: startX, y: spot.y, rotation: 0, opacity: 1 });
    });

    const flyTl = gsap.timeline({ onComplete: () => setupDrag(cards.slice(0, 4), new Set(), []) });
    [0, 1, 2, 3].forEach((idx, seq) => {
      if (idx >= cards.length) return;
      flyTl.to(cards[idx], {
        x: mobileSpots[idx].x, y: mobileSpots[idx].y, rotation: mobileSpots[idx].r,
        duration: 0.7, ease: 'back.out(1.2)',
      }, 0.12 * seq);
    });
    return;
  }

  // Desktop: full animation
  const spots = [
    { x: -60,       y: 10,  r: -10, from: 'left' },
    { x: 80,        y: 50,  r: 5,   from: 'left' },
    { x: vw - 200,  y: 0,   r: 6,   from: 'right' },
    { x: vw - 340,  y: 60,  r: -4,  from: 'right' },
    { x: -20,       y: 130, r: 8,   from: 'left' },
    { x: vw - 120,  y: 140, r: -7,  from: 'right' },
  ];

  const driftTargets = [
    { x: 120,         y: 80,   r: -8,  dur: 2.0 },
    { x: cx - 80,     y: 180,  r: 5,   dur: 2.5 },
    { x: vw - 380,    y: 120,  r: 6,   dur: 1.8 },
    { x: 40,          y: 420,  r: -4,  dur: 2.2 },
    { x: vw - 360,    y: 480,  r: 5,   dur: 2.8 },
    { x: cx - 40,     y: 900,  r: -3,  dur: 3.0 },
  ];

  const dragged = new Set();
  const driftTweens = [];

  cards.forEach((card, i) => {
    const spot = spots[i];
    const startX = spot.from === 'left' ? -400 : vw + 120;
    gsap.set(card, { x: startX, y: spot.y, rotation: 0, opacity: 1 });
  });

  const flyTl = gsap.timeline({
    onComplete: () => {
      setupDrag(cards, dragged, driftTweens);
      setupDrift(cards, driftTargets, dragged, driftTweens);
    }
  });

  const order = [0, 2, 1, 3, 4, 5];
  order.forEach((idx, seq) => {
    if (idx >= cards.length) return;
    flyTl.to(cards[idx], {
      x: spots[idx].x, y: spots[idx].y, rotation: spots[idx].r,
      duration: 0.8, ease: 'back.out(1.2)',
    }, 0.15 * seq);
  });
}

function setupDrift(cards, driftTargets, dragged, driftTweens) {
  let driftStarted = false;

  // Start drift as soon as the user starts scrolling
  function onScroll() {
    if (driftStarted) return;
    if (window.scrollY < window.innerHeight * 0.1) return;

    driftStarted = true;
    window.removeEventListener('scroll', onScroll);

    cards.forEach((card, i) => {
      if (dragged.has(i)) return;
      const drift = driftTargets[i];
      const tw = gsap.to(card, {
        x: drift.x, y: drift.y, rotation: drift.r,
        duration: drift.dur,
        ease: 'power2.inOut',
      });
      driftTweens[i] = tw;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}


function setupDrag(cards, dragged, driftTweens) {
  let topZ = 50;
  cards.forEach((card, i) => {
    let isDragging = false, startPX, startPY, startX, startY;

    card.addEventListener('pointerdown', e => {
      isDragging = true;
      // Kill any active drift tween for this card
      if (driftTweens[i]) { driftTweens[i].kill(); driftTweens[i] = null; }
      dragged.add(i);

      card.setPointerCapture(e.pointerId);
      card.classList.add('grabbing');
      topZ++;
      card.style.zIndex = topZ;
      startX = gsap.getProperty(card, 'x');
      startY = gsap.getProperty(card, 'y');
      startPX = e.clientX;
      startPY = e.clientY;
    });

    card.addEventListener('pointermove', e => {
      if (!isDragging) return;
      gsap.set(card, { x: startX + e.clientX - startPX, y: startY + e.clientY - startPY });
    });

    const up = () => { isDragging = false; card.classList.remove('grabbing'); };
    card.addEventListener('pointerup', up);
    card.addEventListener('pointercancel', up);

    // Hover: subtle scale up + shadow grows with it
    card.addEventListener('mouseenter', () => {
      if (isDragging) return;
      gsap.to(card, { scale: 1.015, boxShadow: '0 10px 32px rgba(0,0,0,0.12)', duration: 0.25, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { scale: 1, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', duration: 0.2, ease: 'power2.out' });
    });
  });
}

/* ─── 5. FEATURE SCENES ─── */

/* 5.1 Personalized Roasts (newtab replica) */
function initFeatureRoast() {
  const container = document.getElementById('x-fp-roast');
  if (!container) return;

  // Build newtab replica
  const levelSvg = `<div class="x-newtab-level">7<span class="x-newtab-widget-tip">Level</span></div>`;
  const hatSlot = `<div class="x-newtab-widget" id="x-nt-hat"><span class="x-newtab-widget-tip">Hat</span></div>`;
  const glassSlot = `<div class="x-newtab-widget" id="x-nt-glasses"><span class="x-newtab-widget-tip">Glasses</span></div>`;

  container.innerHTML = `<div class="x-window-frame">
    <div class="x-window-chrome">
      <div class="x-window-tabbar">
        <div class="x-window-dots">
          <span class="x-window-dot x-window-dot--close"></span>
          <span class="x-window-dot x-window-dot--min"></span>
          <span class="x-window-dot x-window-dot--max"></span>
        </div>
        <div class="x-window-tab active">
          <div class="x-window-tab-icon" style="background:var(--accent)"></div>
          New Tab
          <span class="x-window-tab-close">&times;</span>
        </div>
        <div class="x-window-tab">
          <div class="x-window-tab-icon" style="background:#4285F4"></div>
          Gmail
        </div>
        <div class="x-window-tab">
          <div class="x-window-tab-icon" style="background:#EA4335"></div>
          YouTube
        </div>
      </div>
    </div>
    <div class="x-window-content">
      <div class="x-window-urlbar">
        <div class="x-window-nav-btns">
          <span class="x-window-nav-btn"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></span>
          <span class="x-window-nav-btn"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></span>
        </div>
        <div class="x-window-url">
          <svg class="x-window-url-lock" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          chrome://newtab
        </div>
        <div class="x-window-extensions">
          <div class="x-window-ext-icon"><img src="assets/icon.svg" alt="Jesty"></div>
          <span class="x-window-ext-puzzle"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5a2.5 2.5 0 0 0-5 0V5H4c-1.1 0-2 .9-2 2v3.8h1.5c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5H2V19c0 1.1.9 2 2 2h3.8v-1.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5V21H17c1.1 0 2-.9 2-2v-4h1.5a2.5 2.5 0 0 0 0-5z"/></svg></span>
        </div>
      </div>
      <div class="x-scene-newtab">
        <div class="x-newtab-face" id="x-nt-face"></div>
        <div class="x-newtab-quote" id="x-nt-quote"></div>
      </div>
    </div>
  </div>`;

  const faceEl = document.getElementById('x-nt-face');
  const quoteEl = document.getElementById('x-nt-quote');
  let idx = 0;

  function renderSceneFace(el, roast) {
    const symbol = document.getElementById(`face-${roast.mood}`);
    if (!symbol || !el) return;
    const vb = symbol.getAttribute('viewBox') || '-15 -10 150 140';
    const uid = 'xnt' + Math.random().toString(36).slice(2,5);
    let content = symbol.innerHTML;
    content = content.replace(/id="clip-([^"]+)"/g, `id="clip-$1-${uid}"`);
    content = content.replace(/url\(#clip-([^)]+)\)/g, `url(#clip-$1-${uid})`);
    content = recolorSvg(content, SOURCE_COLOR, SLOT_COLORS[currentColorKey]);
    let accSvg = '';
    [{ slot:'hat', id: roast.hat }, { slot:'glasses', id: roast.glasses }].forEach(({ slot, id }) => {
      if (!id) return;
      const accSym = document.getElementById(`acc-${id}`);
      if (!accSym) return;
      const anchor = (ACC_ANCHORS[slot][roast.mood]) || ACC_ANCHORS[slot]['smug'] || {x:0,y:0,rotate:0};
      let ac = accSym.innerHTML;
      ac = recolorSvg(ac, SOURCE_COLOR, SLOT_COLORS[currentColorKey]);
      let tr = `translate(${anchor.x}, ${anchor.y})`;
      if (anchor.rotate) {
        const avb = accSym.getAttribute('viewBox');
        const parts = avb ? avb.split(/\s+/).map(Number) : [0,0,44,30];
        tr += ` rotate(${anchor.rotate}, ${parts[2]/2}, ${parts[3]/2})`;
      }
      accSvg += `<g transform="${tr}">${ac}</g>`;
    });
    el.innerHTML = `<svg viewBox="${vb}" width="100" height="93">${content}${accSvg}</svg>`;
  }

  function show() {
    const roast = ROAST_SCENES[idx];
    renderSceneFace(faceEl, roast);
    quoteEl.textContent = roast.text;
    gsap.fromTo(faceEl, { scale: 0.85 }, { scale: 1, duration: 0.4, ease: 'back.out(1.6)' });
    gsap.fromTo(quoteEl, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 });
    maybeShowXpToast(faceEl);
  }

  function cycle() {
    gsap.to(quoteEl, {
      opacity: 0, y: -8, duration: 0.3,
      onComplete: () => {
        idx = (idx + 1) % ROAST_SCENES.length;
        show();
        gsap.delayedCall(3, cycle);
      }
    });
  }

  show();
  gsap.delayedCall(3, cycle);


  // Mini sidepanel preview
  initMiniPanel();
}

function initMiniPanel() {
  const charEl = document.getElementById('x-mp-char');
  const commentEl = document.getElementById('x-mp-comment');
  const avatarEl = document.getElementById('x-mp-avatar');
  const hatSlot = document.getElementById('x-mp-hat');
  const glassSlot = document.getElementById('x-mp-glasses');
  if (!charEl || !commentEl) return;

  const PANEL_QUIPS = [
    { text: "I see everything.", mood: 'suspicious' },
    { text: "47 tabs. Impressive.", mood: 'eyeroll' },
    { text: "You call this productive?", mood: 'dead' },
    { text: "Netflix again? Bold.", mood: 'melting' },
    { text: "I'm watching.", mood: 'suspicious' },
  ];
  let qIdx = 0;

  // Render avatar
  if (avatarEl) {
    avatarEl.innerHTML = buildFaceSvg('smug', currentColorKey, 22);
  }

  // Render topbar acc slots
  const mpHat = document.getElementById('x-mp-hat');
  const mpGlasses = document.getElementById('x-mp-glasses');
  function fillMpSlot(el, accId) {
    if (!el || !accId) return;
    const sym = document.getElementById(`acc-${accId}`);
    if (!sym) return;
    const vb = sym.getAttribute('viewBox') || '0 0 44 30';
    let c = sym.innerHTML;
    c = recolorSvg(c, SOURCE_COLOR, SLOT_COLORS[currentColorKey]);
    el.innerHTML = `<svg viewBox="${vb}">${c}</svg>`;
  }
  fillMpSlot(mpHat, equippedHat);
  fillMpSlot(mpGlasses, equippedGlasses);

  // Render crowd (5 colored faces)
  const crowdEl = document.getElementById('x-mp-crowd');
  if (crowdEl) {
    const crowdMoods = ['smug', 'happy', 'impressed', 'suspicious', 'manic'];
    const crowdColors = ['lime', 'pink', 'purple', 'sky', 'mint'];
    crowdEl.innerHTML = crowdMoods.map((mood, i) =>
      `<div style="width:28px;height:26px">${buildFaceSvg(mood, crowdColors[i], 28)}</div>`
    ).join('');
  }

  // Render game icon
  const gameIcon = document.getElementById('x-mp-game-icon');
  if (gameIcon) {
    gameIcon.innerHTML = buildFaceSvg('manic', 'purple', 28);
  }

  // Render acc slots
  function fillSlot(el, accId) {
    if (!el || !accId) return;
    const symbol = document.getElementById(`acc-${accId}`);
    if (!symbol) return;
    const vb = symbol.getAttribute('viewBox') || '0 0 44 30';
    let content = symbol.innerHTML;
    content = recolorSvg(content, SOURCE_COLOR, SLOT_COLORS[currentColorKey]);
    el.innerHTML = `<svg viewBox="${vb}">${content}</svg>`;
  }
  fillSlot(hatSlot, equippedHat);
  fillSlot(glassSlot, equippedGlasses);

  function renderPanelChar(mood) {
    const symbol = document.getElementById(`face-${mood}`);
    if (!symbol) return;
    const vb = symbol.getAttribute('viewBox') || '-15 -10 150 140';
    const uid = 'xmp' + Math.random().toString(36).slice(2,5);
    let content = symbol.innerHTML;
    content = content.replace(/id="clip-([^"]+)"/g, `id="clip-$1-${uid}"`);
    content = content.replace(/url\(#clip-([^)]+)\)/g, `url(#clip-$1-${uid})`);
    content = recolorSvg(content, SOURCE_COLOR, SLOT_COLORS[currentColorKey]);
    charEl.innerHTML = `<svg viewBox="${vb}" width="110" height="102">${content}</svg>`;
  }

  // Bounce-in entrance
  gsap.set(charEl, { x: -60, scaleX: 1.1, scaleY: 0.9, rotation: -6, transformOrigin: '50% 100%' });
  gsap.to(charEl, { x: 0, scaleX: 1, scaleY: 1, rotation: 0, duration: 0.6, delay: 0.5, ease: 'elastic.out(1, 0.6)' });

  let mpBreathTl = null;
  function startMpBreathing() {
    mpBreathTl = gsap.timeline({ repeat: -1, yoyo: true });
    mpBreathTl.to(charEl, { scaleY: 1.015, transformOrigin: '50% 100%', duration: 2, ease: 'sine.inOut' });
  }

  function mpSquashSettle(onSwap) {
    if (mpBreathTl) mpBreathTl.pause();
    const tl = gsap.timeline({
      onComplete: () => {
        if (mpBreathTl) { gsap.set(charEl, { scaleY:1, scaleX:1, transformOrigin:'50% 100%' }); mpBreathTl.restart(); }
      }
    });
    tl.to(charEl, { scaleY:0.92, scaleX:1.04, transformOrigin:'50% 100%', duration:0.12, ease:'power2.in', onComplete: onSwap });
    tl.to(charEl, { scaleY:1.06, scaleX:0.97, transformOrigin:'50% 100%', duration:0.14, ease:'power2.out' });
    tl.to(charEl, { scaleY:1, scaleX:1, transformOrigin:'50% 100%', duration:0.15, ease:'sine.out' });
  }

  function showQuip() {
    const quip = PANEL_QUIPS[qIdx];
    renderPanelChar(quip.mood);
    commentEl.textContent = quip.text;
    gsap.fromTo(commentEl, { opacity: 0 }, { opacity: 1, duration: 0.3 });
  }

  function cycleQuip() {
    gsap.to(commentEl, {
      opacity: 0, duration: 0.3,
      onComplete: () => {
        qIdx = (qIdx + 1) % PANEL_QUIPS.length;
        mpSquashSettle(() => {
          showQuip();
        });
        gsap.delayedCall(4, cycleQuip);
      }
    });
  }

  showQuip();
  gsap.delayedCall(0.8, startMpBreathing);
  gsap.delayedCall(4, cycleQuip);

  // Level-up celebration — triggers once after ~20s, loops every 25s
  function triggerLevelUp() {
    const overlay = document.getElementById('x-mp-levelup');
    const sparksEl = document.getElementById('x-mp-sparks');
    const flipper = document.getElementById('x-mp-flipper');
    const flipBack = document.getElementById('x-mp-flip-acc');
    const unlockEl = document.getElementById('x-mp-unlock');
    if (!overlay) return;

    // Reset
    overlay.classList.add('visible');
    if (flipper) flipper.classList.remove('flipped');
    if (unlockEl) gsap.set(unlockEl, { opacity: 0 });
    if (sparksEl) sparksEl.innerHTML = '';

    // Render accessory in flip back
    if (flipBack) {
      const accSym = document.getElementById('acc-crown');
      if (accSym) {
        const vb = accSym.getAttribute('viewBox') || '0 0 44 30';
        let c = accSym.innerHTML;
        c = recolorSvg(c, SOURCE_COLOR, SLOT_COLORS[currentColorKey]);
        flipBack.innerHTML = `<svg viewBox="${vb}" width="52" height="36">${c}</svg>`;
      }
    }

    // Fade in
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.4 });

    // Number entry
    gsap.from('.x-mp-levelup-number', { scale: 0, duration: 0.6, delay: 0.2, ease: 'back.out(2)' });
    // Float
    gsap.to('.x-mp-levelup-number', { y: -4, duration: 1.5, delay: 0.8, ease: 'sine.inOut', yoyo: true, repeat: 2 });

    // Spark bursts at 3 waves
    const colors = ['#EAB308', '#FDE047', '#FFFFFF', '#CA8A04', '#A78BFA', '#F59E0B'];
    function burstSparks(delay) {
      gsap.delayedCall(delay, () => {
        if (!sparksEl) return;
        for (let i = 0; i < 12; i++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = 30 + Math.random() * 70;
          const isSpark = Math.random() > 0.3;
          const el = document.createElement('div');
          el.className = isSpark ? 'x-mp-spark' : 'x-mp-streak';
          el.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
          el.style.setProperty('--sy', Math.sin(angle) * dist + 'px');
          if (!isSpark) {
            el.style.setProperty('--sr', (angle * 180 / Math.PI) + 'deg');
            el.style.height = (8 + Math.random() * 14) + 'px';
          } else {
            el.style.width = el.style.height = (2 + Math.random() * 5) + 'px';
          }
          el.style.background = colors[Math.floor(Math.random() * colors.length)];
          el.style.left = '50%';
          el.style.top = '40%';
          el.style.animationDelay = (Math.random() * 0.15) + 's';
          sparksEl.appendChild(el);
        }
      });
    }
    burstSparks(0.3);
    burstSparks(0.8);
    burstSparks(1.4);

    // 3D flip to reveal accessory at 2.5s
    gsap.delayedCall(2.5, () => {
      if (flipper) flipper.classList.add('flipped');
      burstSparks(0); // extra burst on flip
    });

    // Show unlock text after flip
    gsap.delayedCall(3.0, () => {
      if (unlockEl) gsap.to(unlockEl, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
    });

    // Fade out and reset
    gsap.to(overlay, { opacity: 0, duration: 0.5, delay: 5, onComplete: () => {
      overlay.classList.remove('visible');
      if (sparksEl) sparksEl.innerHTML = '';
      // Loop
      gsap.delayedCall(25, triggerLevelUp);
    }});
  }

  gsap.delayedCall(18, triggerLevelUp);
}

// XP toast on newtab roasts — shows on every 3rd roast
let xpRoastCount = 0;
function maybeShowXpToast(quoteEl) {
  xpRoastCount++;
  if (xpRoastCount % 3 !== 0) return;
  const existing = quoteEl.querySelector('.x-xp-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'x-xp-toast';
  const xp = [10, 15, 20, 25][Math.floor(Math.random() * 4)];
  toast.textContent = `+${xp} XP`;
  quoteEl.appendChild(toast);

  gsap.fromTo(toast,
    { opacity: 0, y: 8, scale: 0.8 },
    { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.6)' }
  );
  gsap.to(toast, { opacity: 0, y: -12, duration: 0.3, delay: 1.8, onComplete: () => toast.remove() });
}

/* 5.1b Tasks */
function initFeatureTasks() {
  const container = document.getElementById('x-fp-tasks');
  if (!container) return;

  const TASKS = [
    { title: 'Organize bookmarks', notes: 2, done: false },
    { title: 'Try marketing plan', notes: 3, done: false },
    { title: 'Review PR feedback', notes: 1, done: false },
  ];

  container.innerHTML = `<div class="x-scene-tasks"><div class="x-tasks-list" id="x-tasks-list"></div></div>`;
  const list = document.getElementById('x-tasks-list');

  function renderTasks(tasks) {
    list.innerHTML = '';
    tasks.forEach((task, i) => {
      const row = document.createElement('div');
      row.className = 'x-task-row' + (task.done ? ' checked' : '');
      row.dataset.idx = i;

      const badge = task.done
        ? '<span class="x-task-badge done">Done</span>'
        : (task.notes > 0 ? `<span class="x-task-badge">${task.notes} note${task.notes > 1 ? 's' : ''}</span>` : '');

      row.innerHTML = `<div class="x-task-check"></div>
        <span class="x-task-title">${task.title}</span>
        ${badge}`;
      list.appendChild(row);
    });
  }

  // Animation loop: show tasks → check one → slide out done → slide in new → repeat
  let state = JSON.parse(JSON.stringify(TASKS));

  function runLoop() {
    state = JSON.parse(JSON.stringify(TASKS));
    renderTasks(state);
    gsap.fromTo(list.children, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.1 });

    // Step 1: After 2s, check first task
    gsap.delayedCall(2, () => {
      const row = list.children[0];
      if (!row) return;
      row.classList.add('checked');
      const badge = row.querySelector('.x-task-badge');
      if (badge) { badge.textContent = 'Done'; badge.classList.add('done'); }
      const title = row.querySelector('.x-task-title');
      if (title) { title.style.textDecoration = 'line-through'; title.style.color = 'var(--text-muted)'; }

      // Step 2: After 1.5s, slide out done task
      gsap.delayedCall(1.5, () => {
        gsap.to(row, {
          x: -30, opacity: 0, height: 0, padding: 0, duration: 0.4, ease: 'power2.in',
          onComplete: () => {
            row.remove();

            // Step 3: Slide in new task
            const newRow = document.createElement('div');
            newRow.className = 'x-task-row';
            newRow.innerHTML = `<div class="x-task-check"></div>
              <span class="x-task-title">Write changelog</span>
              <span class="x-task-badge">1 note</span>`;
            list.appendChild(newRow);
            gsap.fromTo(newRow, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.3 });

            // Step 4: After 2s, check second task
            gsap.delayedCall(2, () => {
              const secondRow = list.children[0];
              if (!secondRow) return;
              secondRow.classList.add('checked');
              const b2 = secondRow.querySelector('.x-task-badge');
              if (b2) { b2.textContent = 'Done'; b2.classList.add('done'); }

              // Step 5: Hold then reset
              gsap.delayedCall(2, () => {
                gsap.to(list, {
                  opacity: 0, duration: 0.3,
                  onComplete: () => {
                    gsap.set(list, { opacity: 1 });
                    gsap.delayedCall(0.5, runLoop);
                  }
                });
              });
            });
          }
        });
      });
    });
  }

  runLoop();
}

/* 5.2 Talk Back */
function initFeatureChat() {
  const container = document.getElementById('x-fp-chat');
  if (!container) return;
  container.innerHTML = '<div class="x-scene-chat" id="x-chat-scene"></div>';
  const scene = document.getElementById('x-chat-scene');
  let scriptIdx = 0;

  function buildAvatar() {
    const svg = buildFaceSvg('smug', currentColorKey, 36);
    return `<div class="x-chat-avatar">${svg}</div>`;
  }

  function showDots() {
    const dots = document.createElement('div');
    dots.className = 'x-chat-dots';
    dots.innerHTML = '<span class="x-chat-dot-1"></span><span class="x-chat-dot-2"></span><span class="x-chat-dot-3"></span>';
    scene.appendChild(dots);
    gsap.fromTo(dots, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.2 });
    return dots;
  }

  function addBubble(msg) {
    const el = document.createElement('div');
    if (msg.from === 'user') {
      el.className = 'x-chat-bubble x-chat-bubble--user';
      el.textContent = msg.text;
    } else {
      el.className = 'x-chat-bubble x-chat-bubble--jesty';
      el.innerHTML = buildAvatar() + `<span>${msg.text}</span>`;
    }
    scene.appendChild(el);
    gsap.fromTo(el, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 });
    return el;
  }

  function playScript() {
    const script = CHAT_SCRIPTS[scriptIdx];
    scene.innerHTML = '';

    const tl = gsap.timeline();

    // Typing dots → user message
    tl.call(() => { showDots(); });
    tl.to({}, { duration: 0.8 });
    tl.call(() => {
      const dots = scene.querySelector('.x-chat-dots');
      if (dots) dots.remove();
      addBubble(script[0]);
    });
    tl.to({}, { duration: 0.6 });

    // Typing dots → jesty response
    tl.call(() => { showDots(); });
    tl.to({}, { duration: 0.8 });
    tl.call(() => {
      const dots = scene.querySelector('.x-chat-dots');
      if (dots) dots.remove();
      addBubble(script[1]);
    });

    // Hold then fade
    tl.to({}, { duration: 2 });
    tl.to(scene.children, { opacity: 0, duration: 0.3, stagger: 0.05 });
    tl.to({}, { duration: 0.5 });
    tl.call(() => {
      scriptIdx = (scriptIdx + 1) % CHAT_SCRIPTS.length;
      playScript();
    });
  }

  playScript();
}

/* 5.3 Stay Focused */
function initFeatureFocus() {
  const container = document.getElementById('x-fp-focus');
  if (!container) return;
  container.innerHTML = `<div class="x-scene-focus">
    <div class="x-focus-timer" id="x-fc-timer"></div>
    <div class="x-focus-resume" id="x-fc-resume"></div>
  </div>`;

  const timerEl = document.getElementById('x-fc-timer');
  const resumeEl = document.getElementById('x-fc-resume');

  const RESUMES = [
    "Wow, a focus session so short it could fit in a TikTok clip.",
    "Zero minutes and you still managed to be unproductive. Impressive in a sad way.",
    "Zero distractions. Actually suspicious.",
    "4 minutes and 3 tab switches. Classic.",
    "You focused so hard you forgot to procrastinate.",
    "Netflix survived without you. Barely.",
    "Reddit is still there. It always is.",
    "That was less focusing and more staring at a timer.",
    "You opened YouTube twice during that. I counted.",
    "Your procrastination streak ends here.",
    "The market will survive without you.",
    "Put the credit card away mentally.",
  ];
  let resumeIdx = 0;

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function setTimerText(text) {
    timerEl.innerHTML = text.split('').map(ch =>
      `<span class="x-focus-char">${ch}</span>`
    ).join('');
  }

  function explodeTimer() {
    const chars = timerEl.querySelectorAll('.x-focus-char');
    const count = chars.length;
    const center = (count - 1) / 2;

    chars.forEach((ch, i) => {
      const spread = (i - center) * 18;
      const rot = 60 + Math.random() * 200;
      const dir = i < center ? -1 : i > center ? 1 : (Math.random() > 0.5 ? 1 : -1);
      const delay = Math.random() * 0.1;

      ch.style.setProperty('--dx', `${spread}px`);
      ch.style.setProperty('--dr', `${rot * dir}deg`);
      ch.style.animationDelay = `${delay}s`;
      ch.classList.add('x-focus-drop');
    });
  }

  function runTimer() {
    let sec = 0;
    gsap.set(resumeEl, { opacity: 0, scale: 0.8, y: 0 });
    setTimerText(formatTime(sec));
    gsap.set(timerEl.querySelectorAll('.x-focus-char'), { clearProps: 'all' });

    const iv = setInterval(() => {
      sec++;
      setTimerText(formatTime(sec));

      if (sec >= 4) {
        clearInterval(iv);
        // Explode the timer chars
        explodeTimer();

        // Show funny resume message
        gsap.delayedCall(0.6, () => {
          resumeEl.textContent = RESUMES[resumeIdx];
          resumeIdx = (resumeIdx + 1) % RESUMES.length;
          gsap.fromTo(resumeEl,
            { opacity: 0, scale: 0.85, y: 10 },
            { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)' }
          );
        });

        // Hold then reset
        gsap.delayedCall(3.5, () => {
          gsap.to(resumeEl, {
            opacity: 0, duration: 0.3,
            onComplete: () => gsap.delayedCall(0.8, runTimer)
          });
        });
      }
    }, 1000);
  }

  runTimer();
}

/* 5.4 Mini-Games (Memory Match) */
function initFeatureGames() {
  const container = document.getElementById('x-fp-games');
  if (!container) return;
  container.innerHTML = `<div class="x-scene-memory">
    <div class="x-memory-grid" id="x-mm-grid"></div>
    <div class="x-memory-complete" id="x-mm-complete">
      <div class="x-memory-complete-face" id="x-mm-face"></div>
      <div class="x-memory-complete-title" id="x-mm-title"></div>
      <div class="x-memory-stars" id="x-mm-stars"></div>
    </div>
  </div>`;
  const grid = document.getElementById('x-mm-grid');
  const completeEl = document.getElementById('x-mm-complete');
  const starsEl = document.getElementById('x-mm-stars');
  const completeFace = document.getElementById('x-mm-face');
  const completeTitle = document.getElementById('x-mm-title');

  const gameMoods = ['smug','suspicious','happy','dead','manic','eyeroll'];
  const gameColors = ['purple','pink','sky','lime','mint','peach'];

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function buildGrid() {
    // Each pair: same mood + same color
    const pairDefs = gameMoods.map((mood, i) => ({ mood, color: gameColors[i] }));
    const cards = [];
    pairDefs.forEach(def => { cards.push(def); cards.push(def); });
    const shuffled = shuffle(cards);

    grid.innerHTML = '';
    grid.style.display = '';
    gsap.set(grid, { opacity: 1 });
    completeEl.classList.remove('visible');
    starsEl.innerHTML = '';

    shuffled.forEach((def) => {
      const faceSvg = buildFaceSvg(def.mood, def.color, 40);
      const cell = document.createElement('div');
      cell.className = 'x-memory-cell';
      cell.dataset.mood = def.mood;
      cell.dataset.color = def.color;
      cell.innerHTML = `<div class="x-memory-card-inner">
        <div class="x-memory-card-front">?</div>
        <div class="x-memory-card-back">${faceSvg}</div>
      </div>`;
      grid.appendChild(cell);
    });
    return shuffled;
  }

  function showComplete(onDone) {
    // Fade out grid
    gsap.to(grid, {
      opacity: 0, duration: 0.3,
      onComplete: () => {
        grid.style.display = 'none';

        // Show complete screen
        completeFace.style.display = 'none';
        completeTitle.textContent = 'Perfect!';
        starsEl.innerHTML = '';
        completeEl.classList.add('visible');

        // Title bounces in
        gsap.fromTo(completeTitle, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.6)' });

        // Stars pop in staggered
        gsap.delayedCall(0.3, () => {
          for (let i = 0; i < 3; i++) {
            const star = document.createElement('span');
            star.className = 'x-memory-star earned';
            star.textContent = '★';
            star.style.animationDelay = `${i * 0.15}s`;
            starsEl.appendChild(star);
          }
        });

        gsap.delayedCall(2.5, onDone);
      }
    });
  }

  function autoPlay() {
    const shuffled = buildGrid();
    const cells = [...grid.querySelectorAll('.x-memory-cell')];

    // Group indices by mood+color to find actual matching pairs
    const pairMap = {};
    shuffled.forEach((def, i) => {
      const key = def.mood + '-' + def.color;
      if (!pairMap[key]) pairMap[key] = [];
      pairMap[key].push(i);
    });
    const pairList = Object.values(pairMap);

    let pairIdx = 0;

    function revealPair() {
      if (pairIdx >= pairList.length) {
        // All matched — fade grid, show complete screen, then reset
        showComplete(() => {
          gsap.to(completeEl, {
            opacity: 0, duration: 0.3,
            onComplete: () => {
              gsap.set(completeEl, { opacity: 1 });
              autoPlay();
            }
          });
        });
        return;
      }

      const [a, b] = pairList[pairIdx];
      const cellA = cells[a], cellB = cells[b];
      const innerA = cellA.querySelector('.x-memory-card-inner');
      const innerB = cellB.querySelector('.x-memory-card-inner');

      // Flip first
      innerA.classList.add('flipped');
      gsap.delayedCall(0.5, () => {
        // Flip second
        innerB.classList.add('flipped');
        gsap.delayedCall(0.4, () => {
          // Match highlight
          cellA.querySelector('.x-memory-card-back').classList.add('matched');
          cellB.querySelector('.x-memory-card-back').classList.add('matched');
          pairIdx++;
          gsap.delayedCall(0.8, revealPair);
        });
      });
    }

    gsap.delayedCall(0.5, revealPair);
  }

  autoPlay();
}

/* 5.5 Accessories */
function initFeatureAcc() {
  const container = document.getElementById('x-fp-acc');
  if (!container) return;

  const allAcc = [
    ...ALL_HATS.filter(a => a.id),
    ...ALL_GLASSES.filter(a => a.id),
  ];

  container.innerHTML = '<div class="x-scene-acc"><div class="x-acc-stage" id="x-acc-stage"></div></div>';
  const stage = document.getElementById('x-acc-stage');

  // Create 3 item elements (left, center, right)
  const slots = [];
  for (let i = 0; i < 3; i++) {
    const el = document.createElement('div');
    el.className = 'x-acc-item';
    el.innerHTML = '<div class="x-acc-item-preview"></div><span class="x-acc-item-name"></span>';
    stage.appendChild(el);
    slots.push(el);
  }

  function renderAccInSlot(el, acc) {
    const preview = el.querySelector('.x-acc-item-preview');
    const name = el.querySelector('.x-acc-item-name');
    if (!preview || !name) return;
    const symbol = document.getElementById(`acc-${acc.id}`);
    if (symbol) {
      const vb = symbol.getAttribute('viewBox') || '0 0 44 30';
      let content = symbol.innerHTML;
      content = recolorSvg(content, SOURCE_COLOR, SLOT_COLORS[currentColorKey]);
      preview.innerHTML = `<svg viewBox="${vb}">${content}</svg>`;
    }
    name.textContent = acc.label;
  }

  let idx = 0;

  // Positions: left (-80px), center (0), right (+80px)
  const positions = [
    { x: -80, scale: 0.85, opacity: 0.5 },
    { x: 0,   scale: 1,    opacity: 1 },
    { x: 80,  scale: 0.85, opacity: 0.5 },
  ];

  function layoutSlots(animate) {
    const left = (idx - 1 + allAcc.length) % allAcc.length;
    const center = idx;
    const right = (idx + 1) % allAcc.length;
    const accIndices = [left, center, right];

    slots.forEach((el, i) => {
      renderAccInSlot(el, allAcc[accIndices[i]]);
      el.classList.toggle('center', i === 1);
      const pos = positions[i];
      if (animate) {
        gsap.to(el, { x: pos.x, scale: pos.scale, opacity: pos.opacity, duration: 0.5, ease: 'back.out(1.2)' });
      } else {
        gsap.set(el, { x: pos.x, scale: pos.scale, opacity: pos.opacity });
      }
    });
  }

  // Positions: off-left, left, center, right, off-right
  const posArr = [
    { x: -160, scale: 0.7, opacity: 0 },
    { x: -80,  scale: 0.85, opacity: 0.5 },
    { x: 0,    scale: 1,    opacity: 1 },
    { x: 80,   scale: 0.85, opacity: 0.5 },
    { x: 160,  scale: 0.7, opacity: 0 },
  ];

  // Create one DOM element per accessory, each with fixed content
  stage.innerHTML = '';
  const accEls = allAcc.map((acc, i) => {
    const el = document.createElement('div');
    el.className = 'x-acc-item';
    el.innerHTML = '<div class="x-acc-item-preview"></div><span class="x-acc-item-name"></span>';
    renderAccInSlot(el, acc);
    stage.appendChild(el);
    // Start all off-screen right
    gsap.set(el, { x: 160, scale: 0.7, opacity: 0 });
    return el;
  });

  function getVisibleIndices() {
    // 5 indices centered on idx: idx-2, idx-1, idx, idx+1, idx+2
    const indices = [];
    for (let offset = -2; offset <= 2; offset++) {
      indices.push(((idx + offset) % allAcc.length + allAcc.length) % allAcc.length);
    }
    return indices;
  }

  function layout(animate) {
    const visible = getVisibleIndices();
    accEls.forEach((el, accIdx) => {
      const posIndex = visible.indexOf(accIdx);
      if (posIndex === -1) {
        // Not visible — park off-screen instantly
        gsap.set(el, { x: 160, scale: 0.7, opacity: 0 });
        el.classList.remove('center');
      } else {
        const pos = posArr[posIndex];
        el.classList.toggle('center', posIndex === 2);
        if (animate) {
          gsap.to(el, { x: pos.x, scale: pos.scale, opacity: pos.opacity, duration: 0.5, ease: 'power2.out' });
        } else {
          gsap.set(el, pos);
        }
      }
    });
  }

  layout(false);

  setInterval(() => {
    idx = (idx + 1) % allAcc.length;
    layout(true);
  }, 2500);
}

/* 5.6 Trading Card (3D) */
function initFeatureDossier() {
  const container = document.getElementById('x-fp-dossier');
  if (!container) return;

  const categories = [
    { label: 'Social Media', count: 47, max: 47 },
    { label: 'Streaming', count: 34, max: 47 },
    { label: 'Shopping', count: 28, max: 47 },
    { label: 'Work', count: 21, max: 47 },
  ];

  const datasets = [
    { roasts: 89, tabs: 1247, cats: [
      { label: 'Social Media', count: 47 },
      { label: 'Streaming', count: 34 },
      { label: 'Shopping', count: 28 },
      { label: 'Work', count: 21 },
    ]},
    { roasts: 156, tabs: 2031, cats: [
      { label: 'Work', count: 52 },
      { label: 'AI Tools', count: 41 },
      { label: 'Social Media', count: 33 },
      { label: 'News', count: 18 },
    ]},
    { roasts: 42, tabs: 580, cats: [
      { label: 'Shopping', count: 38 },
      { label: 'Streaming', count: 29 },
      { label: 'Social Media', count: 24 },
      { label: 'Food', count: 15 },
    ]},
  ];

  let dataIdx = 0;
  const color = () => SLOT_COLORS[currentColorKey].body;

  container.innerHTML = `<div class="x-scene-dossier">
    <div class="x-dossier-stats">
      <div>
        <span class="x-dossier-stat-number" id="x-dos-roasts">0</span>
        <span class="x-dossier-stat-label">Roasts</span>
      </div>
      <div>
        <span class="x-dossier-stat-number" id="x-dos-tabs">0</span>
        <span class="x-dossier-stat-label">Tabs seen</span>
      </div>
    </div>
    <div class="x-dossier-bars" id="x-dos-bars"></div>
  </div>`;

  const roastsEl = document.getElementById('x-dos-roasts');
  const tabsEl = document.getElementById('x-dos-tabs');
  const barsEl = document.getElementById('x-dos-bars');

  function animateCount(el, target) {
    gsap.to({ val: 0 }, {
      val: target, duration: 1.2, ease: 'power2.out',
      onUpdate: function() {
        el.textContent = Math.round(this.targets()[0].val).toLocaleString();
      }
    });
  }

  function renderDataset(ds, animate) {
    const maxCount = Math.max(...ds.cats.map(c => c.count));

    barsEl.innerHTML = ds.cats.map(cat => `
      <div class="x-dossier-bar-row">
        <span class="x-dossier-bar-label">${cat.label}</span>
        <div class="x-dossier-bar-track">
          <div class="x-dossier-bar-fill" style="width:0%;background:${color()}"></div>
        </div>
        <span class="x-dossier-bar-count">${cat.count}</span>
      </div>
    `).join('');

    if (animate) {
      animateCount(roastsEl, ds.roasts);
      animateCount(tabsEl, ds.tabs);

      // Animate bars with stagger
      barsEl.querySelectorAll('.x-dossier-bar-fill').forEach((fill, i) => {
        const pct = (ds.cats[i].count / maxCount) * 100;
        gsap.to(fill, { width: pct + '%', duration: 0.8, delay: 0.3 + i * 0.1, ease: 'power2.out' });
      });
    }
  }

  renderDataset(datasets[0], true);

  // Cycle through datasets
  setInterval(() => {
    // Fade out
    gsap.to([roastsEl, tabsEl, barsEl], {
      opacity: 0, duration: 0.3,
      onComplete: () => {
        dataIdx = (dataIdx + 1) % datasets.length;
        gsap.set([roastsEl, tabsEl, barsEl], { opacity: 1 });
        renderDataset(datasets[dataIdx], true);
      }
    });
  }, 5000);
}

/* ─── 6. HOW IT WORKS ─── */

function initHowItWorks() {
  // Render step faces
  document.querySelectorAll('.x-step-face').forEach(el => {
    const mood = el.dataset.mood;
    renderFaceInto(el, mood, currentColorKey, 100);
  });

  // Scroll-triggered: count up numbers, draw connectors, bounce faces
  if (typeof ScrollTrigger !== 'undefined') {
    const steps = gsap.utils.toArray('.x-step');
    const connectors = gsap.utils.toArray('.x-step-connector');

    ScrollTrigger.create({
      trigger: '.x-steps-grid',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        steps.forEach((step, i) => {
          const numEl = step.querySelector('.x-step-number');
          const faceEl = step.querySelector('.x-step-face');
          const target = parseInt(numEl.dataset.count);
          const delay = i * 0.3;

          // Count up
          gsap.to({ val: 0 }, {
            val: target, duration: 0.4, delay,
            ease: 'power2.out',
            onUpdate: function() { numEl.textContent = Math.round(this.targets()[0].val); }
          });

          // Face bounce in
          gsap.from(faceEl, {
            scale: 0, rotation: -15, duration: 0.5, delay: delay + 0.2,
            ease: 'back.out(2)',
          });

          // Text slide up
          gsap.from(step, {
            y: 30, opacity: 0, duration: 0.5, delay,
            ease: 'power2.out'
          });
        });

        // Draw connectors
        connectors.forEach((line, i) => {
          setTimeout(() => line.classList.add('drawn'), (i + 1) * 400);
        });
      }
    });
  } else {
    // No ScrollTrigger — just set numbers immediately
    document.querySelectorAll('.x-step-number').forEach(el => {
      el.textContent = el.dataset.count;
    });
    document.querySelectorAll('.x-step-connector').forEach(el => el.classList.add('drawn'));
  }
}

/* ─── 7. EXPRESSIONS MARQUEE ─── */

function initExpressionsMarquee() {
  const track = document.getElementById('x-expressions-track');
  if (!track) return;

  // Double for seamless loop
  const doubled = [...ALL_EXPRESSIONS, ...ALL_EXPRESSIONS];
  let html = '';

  doubled.forEach((expr, i) => {
    const svg = buildFaceSvg(expr, currentColorKey, 72);
    html += `<div class="x-expression-item">
      ${svg}
      <span class="x-expression-label">${expr}</span>
    </div>`;
  });

  track.innerHTML = html;

  // Continuous marquee
  const totalWidth = track.scrollWidth / 2;
  const marqueeTl = gsap.to(track, {
    x: -totalWidth,
    duration: 30,
    ease: 'none',
    repeat: -1
  });

  // Hover: pause marquee
  track.addEventListener('mouseenter', () => marqueeTl.pause());
  track.addEventListener('mouseleave', () => marqueeTl.resume());
}

/* ─── 8. PRICING ─── */

function initPricing() {
  document.querySelectorAll('.x-pricing-face').forEach(el => {
    const mood = el.dataset.mood;
    const color = el.dataset.color || currentColorKey;
    const hat = el.dataset.hat || null;
    const symbol = document.getElementById(`face-${mood}`);
    if (!symbol) return;
    const vb = symbol.getAttribute('viewBox') || '-15 -10 150 140';
    const uid = 'xp' + Math.random().toString(36).slice(2, 5);
    let content = symbol.innerHTML;
    content = content.replace(/id="clip-([^"]+)"/g, `id="clip-$1-${uid}"`);
    content = content.replace(/url\(#clip-([^)]+)\)/g, `url(#clip-$1-${uid})`);
    content = recolorSvg(content, SOURCE_COLOR, SLOT_COLORS[color]);
    let accSvg = '';
    if (hat) {
      const accSymbol = document.getElementById(`acc-${hat}`);
      if (accSymbol) {
        const anchor = (ACC_ANCHORS.hat[mood]) || ACC_ANCHORS.hat['smug'] || {x:0,y:0,rotate:0};
        let ac = accSymbol.innerHTML;
        ac = recolorSvg(ac, SOURCE_COLOR, SLOT_COLORS[color]);
        let tr = `translate(${anchor.x}, ${anchor.y})`;
        if (anchor.rotate) {
          const avb = accSymbol.getAttribute('viewBox');
          const parts = avb ? avb.split(/\s+/).map(Number) : [0,0,44,30];
          tr += ` rotate(${anchor.rotate}, ${parts[2]/2}, ${parts[3]/2})`;
        }
        accSvg = `<g transform="${tr}">${ac}</g>`;
      }
    }
    el.innerHTML = `<svg viewBox="${vb}" width="56" height="52">${content}${accSvg}</svg>`;
  });

  // Sparkles around the Guilty card
  const sparksEl = document.getElementById('x-pricing-sparks');
  if (sparksEl && typeof ScrollTrigger !== 'undefined') {
    const colors = ['#EAB308', '#FDE047', '#FFFFFF', '#CA8A04', '#A78BFA'];

    function burstPricingSparks() {
      for (let i = 0; i < 14; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 60 + Math.random() * 120;
        const isSpark = Math.random() > 0.3;
        const el = document.createElement('div');
        el.className = isSpark ? 'x-pricing-spark' : 'x-pricing-streak';
        el.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
        el.style.setProperty('--sy', Math.sin(angle) * dist + 'px');
        if (!isSpark) {
          el.style.setProperty('--sr', (angle * 180 / Math.PI) + 'deg');
          el.style.height = (8 + Math.random() * 14) + 'px';
        } else {
          el.style.width = el.style.height = (3 + Math.random() * 5) + 'px';
        }
        el.style.background = colors[Math.floor(Math.random() * colors.length)];
        el.style.left = '50%';
        el.style.top = '50%';
        el.style.animationDelay = (Math.random() * 0.2) + 's';
        sparksEl.appendChild(el);
      }
      setTimeout(() => { sparksEl.innerHTML = ''; }, 1500);
    }

    // Cards reveal + sparkles on scroll enter
    ScrollTrigger.create({
      trigger: '.x-pricing',
      start: 'top 70%',
      once: true,
      onEnter: () => {
        if (window.innerWidth <= 768) { burstPricingSparks(); return; }
        const freeCard = document.querySelector('.x-pricing-card[data-tier="free"]');
        const proCard = document.querySelector('.x-pricing-card[data-tier="pro"]');

        // Suspect slides left from behind
        if (freeCard) {
          gsap.to(freeCard, {
            x: -240, y: 32, rotation: -4,
            duration: 0.6, delay: 0.15, ease: 'power2.out',
          });
        }

        // Sentenced slides right from behind
        if (proCard) {
          gsap.to(proCard, {
            x: 240, y: 32, rotation: 4,
            duration: 0.6, delay: 0.15, ease: 'power2.out',
          });
        }

        // Sparkle burst after cards reveal
        gsap.delayedCall(0.8, burstPricingSparks);
        setInterval(burstPricingSparks, 6000);
      }
    });
  }
}

/* ─── 9. STORE ─── */

function initStore() {
  // Render store faces and cycle expressions
  const storeFaceConfigs = [
    { id: 'x-store-face-0', moods: ['yikes','smug','dead','impressed'], interval: 3000 },
    { id: 'x-store-face-1', moods: ['dead','manic','suspicious','happy'], interval: 3500 },
    { id: 'x-store-face-2', moods: ['melting','eyeroll','petty','dramatic'], interval: 4000 },
  ];

  storeFaceConfigs.forEach(config => {
    const el = document.getElementById(config.id);
    if (!el) return;
    let idx = 0;
    renderFaceInto(el, config.moods[0], currentColorKey, 100);

    setInterval(() => {
      idx = (idx + 1) % config.moods.length;
      gsap.to(el, {
        opacity: 0, duration: 0.2,
        onComplete: () => {
          renderFaceInto(el, config.moods[idx], currentColorKey, 100);
          gsap.to(el, { opacity: 1, duration: 0.2 });
        }
      });
    }, config.interval);
  });

  // Scroll-triggered stagger
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.utils.toArray('.x-store-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 85%' },
        y: 30, opacity: 0, duration: 0.5, delay: i * 0.1,
        ease: 'power2.out'
      });
    });
  }
}

/* ─── 10. CTA BANNER ─── */

function initFooter() {
  // Set store margin-bottom to match footer height so it reveals behind
  const footer = document.querySelector('.x-footer-reveal');
  if (footer) {
    const setHeight = () => document.documentElement.style.setProperty('--footer-h', footer.offsetHeight + 'px');
    setHeight();
    window.addEventListener('resize', setHeight);
  }

  const container = document.getElementById('x-footer-bg-word');
  if (!container) return;

  container.innerHTML = 'JESTY'.split('').map(ch => `<span class="x-footer-bg-char">${ch}</span>`).join('');
  const chars = container.querySelectorAll('.x-footer-bg-char');

  const bgWordColors = [
    '#F0EDEA',
    SLOT_COLORS.lime.body,
    SLOT_COLORS.pink.body,
    SLOT_COLORS.sky.body,
    SLOT_COLORS.purple.body,
    SLOT_COLORS.mint.body,
    SLOT_COLORS.peach.body,
  ];
  let colorIdx = 0;

  gsap.set(chars, { y: 120, opacity: 0 });

  function cycle() {
    container.style.setProperty('--bg-word-color', bgWordColors[colorIdx]);
    colorIdx = (colorIdx + 1) % bgWordColors.length;

    gsap.set(chars, { y: 120, opacity: 0 });
    const enterTl = gsap.timeline({
      onComplete: () => {
        gsap.delayedCall(6, () => {
          const exitTl = gsap.timeline({ onComplete: () => gsap.delayedCall(2, cycle) });
          chars.forEach((ch, i) => {
            exitTl.to(ch, { y: -120, opacity: 0, duration: 0.4, ease: 'power2.in' }, i * 0.06);
          });
        });
      }
    });
    chars.forEach((ch, i) => {
      enterTl.to(ch, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.6)' }, i * 0.08);
    });
  }

  gsap.delayedCall(1, cycle);
}

/* ─── 11. NAV ACCESSORIES + COLOR PICKER ─── */

const ALL_HATS = [
  { id: 'crown', label: 'Crown' }, { id: 'flame-crown', label: 'Flame' },
  { id: 'cowboy-hat', label: 'Cowboy' }, { id: 'wizard-hat', label: 'Wizard' },
  { id: 'beanie', label: 'Beanie' },
];

const ALL_GLASSES = [
  { id: 'sunglasses', label: 'Sunglasses' }, { id: '3d-glasses', label: '3D' },
  { id: 'heart-shades', label: 'Hearts' }, { id: 'pixel-shades', label: 'Pixel' },
  { id: 'neon-shades', label: 'Neon' },
];

function updateNavAccSlots() {
  const hatSlot = document.getElementById('x-nav-acc-hat');
  const glassSlot = document.getElementById('x-nav-acc-glasses');
  if (!hatSlot || !glassSlot) return;

  function fillSlot(el, accId) {
    el.innerHTML = '';
    el.classList.remove('equipped');
    if (!accId) return;
    const symbol = document.getElementById(`acc-${accId}`);
    if (!symbol) return;
    const vb = symbol.getAttribute('viewBox') || '0 0 44 30';
    let content = symbol.innerHTML;
    content = recolorSvg(content, SOURCE_COLOR, SLOT_COLORS[currentColorKey]);
    el.innerHTML = `<svg viewBox="${vb}">${content}</svg>`;
    el.classList.add('equipped');
  }

  fillSlot(hatSlot, equippedHat);
  fillSlot(glassSlot, equippedGlasses);
}

function initAccDropdown() {
  const addBtn = document.getElementById('x-nav-acc-add');
  const hatSlot = document.getElementById('x-nav-acc-hat');
  const glassSlot = document.getElementById('x-nav-acc-glasses');
  const dropdown = document.getElementById('x-acc-dropdown');
  let isOpen = false;

  function toggle(e) {
    e.stopPropagation();
    if (isOpen) close(); else open();
  }
  function open() {
    if (isOpen) return;
    isOpen = true;
    // Position 2px below nav
    const nav = document.getElementById('x-nav-island');
    if (nav) {
      const navRect = nav.getBoundingClientRect();
      dropdown.style.top = (navRect.bottom + 2) + 'px';
    }
    dropdown.classList.remove('hidden', 'closing');
    renderAccGrids();
  }
  function close() {
    if (!isOpen) return;
    isOpen = false;
    dropdown.classList.add('closing');
    dropdown.addEventListener('animationend', () => {
      dropdown.classList.add('hidden');
      dropdown.classList.remove('closing');
    }, { once: true });
  }

  addBtn.addEventListener('click', toggle);
  hatSlot.addEventListener('click', toggle);
  glassSlot.addEventListener('click', toggle);
  document.addEventListener('click', (e) => { if (isOpen && !dropdown.contains(e.target)) close(); });
  dropdown.addEventListener('click', (e) => e.stopPropagation());
}

function renderAccGrids() {
  const grid = document.getElementById('x-acc-grid-all');
  const removeBtn = document.getElementById('x-acc-remove-all');
  if (!grid) return;
  grid.innerHTML = '';

  function makeBtn(item, slot, currentId) {
    const btn = document.createElement('button');
    const isActive = currentId === item.id;
    btn.className = `x-acc-grid-btn${isActive ? ' active' : ''}`;
    btn.title = item.label;
    const symbol = document.getElementById(`acc-${item.id}`);
    if (symbol) {
      const vb = symbol.getAttribute('viewBox') || '0 0 44 30';
      let content = symbol.innerHTML;
      content = recolorSvg(content, SOURCE_COLOR, SLOT_COLORS[currentColorKey]);
      btn.innerHTML = `<svg viewBox="${vb}">${content}</svg>`;
    }
    btn.addEventListener('click', () => {
      // Toggle: click active to unselect, click inactive to select
      if (slot === 'hat') equippedHat = isActive ? null : item.id;
      else equippedGlasses = isActive ? null : item.id;
      renderHeroFace(heroMood);
      updateNavAccSlots();
      renderAccGrids();
    });
    grid.appendChild(btn);
  }

  ALL_HATS.forEach(item => makeBtn(item, 'hat', equippedHat));
  ALL_GLASSES.forEach(item => makeBtn(item, 'glasses', equippedGlasses));

  // Remove all — last slot with X icon
  const resetBtn = document.createElement('button');
  resetBtn.className = 'x-acc-grid-btn x-acc-reset';
  resetBtn.title = 'Remove all';
  resetBtn.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
  resetBtn.addEventListener('click', () => {
    equippedHat = null;
    equippedGlasses = null;
    renderHeroFace(heroMood);
    updateNavAccSlots();
    renderAccGrids();
  });
  grid.appendChild(resetBtn);
}

function initColorPicker() {
  const container = document.getElementById('x-color-picker');
  if (!container) return;

  // Random expression per swatch for playfulness
  const swatchMoods = COLOR_KEYS.map(() =>
    ALL_EXPRESSIONS[Math.floor(Math.random() * ALL_EXPRESSIONS.length)]
  );

  function render() {
    container.innerHTML = '';
    COLOR_KEYS.forEach((key, i) => {
      const btn = document.createElement('button');
      btn.className = 'x-color-swatch' + (key === currentColorKey ? ' active' : '');
      btn.title = key.charAt(0).toUpperCase() + key.slice(1);
      btn.innerHTML = buildFaceSvg(swatchMoods[i], key, 46);
      btn.addEventListener('click', () => {
        if (key === currentColorKey) return;
        currentColorKey = key;
        recolorEverything();
      });
      container.appendChild(btn);
    });
  }

  render();

  function recolorEverything() {
    // Re-render hero
    renderHeroFace(heroMood);
    // Re-render color picker active state
    render();
    // Re-render nav acc slots
    updateNavAccSlots();
    // Re-render all [data-mood] faces on the page
    // Don't recolor pricing faces — they have fixed tier colors
    document.querySelectorAll('.x-step-face').forEach(el => {
      const mood = el.dataset.mood;
      if (mood) renderFaceInto(el, mood, currentColorKey, 100);
    });
  }
}

/* ─── 12. TAB MANAGER SHOWCASE ─── */

function initTabsShowcase() {
  const grid = document.getElementById('x-tabs-grid');
  if (!grid) return;

  const tabs = [
    { title: 'Gmail – Inbox (3)', domain: 'mail.google.com' },
    { title: 'Conversion Funnel Analysis...', domain: 'mixpanel.com' },
    { title: 'Build | Compute | Workers...', domain: 'cloudflare.com' },
    { title: 'Stripe Dashboard – Payments', domain: 'stripe.com' },
    { title: '(1) WhatsApp', domain: 'whatsapp.com' },
    { title: 'Facebook', domain: 'facebook.com' },
    { title: 'Porque gostamos de Arte?...', domain: 'substack.com' },
    { title: 'Editing "Now what?" – Substack', domain: 'substack.com' },
    { title: 'App Store Screenshot Design...', domain: 'dribbble.com' },
    { title: 'Home / X', domain: 'x.com' },
    { title: '(144) Thievery Corporation...', domain: 'youtube.com' },
    { title: 'Design tools and entrepren...', domain: 'claude.ai' },
    { title: 'Leading AI agent teams...', domain: 'claude.ai' },
    { title: 'Job offers – New Chat Auto...', domain: 'chatgpt.com' },
    { title: 'Instagram', domain: 'instagram.com' },
    { title: 'Feed | LinkedIn', domain: 'linkedin.com' },
    { title: 'Product Hunt – The best new...', domain: 'producthunt.com' },
    { title: 'Jesty – Your browser\'s brutal...', domain: 'jesty.fun' },
    { title: 'Reddit – Dive into anything', domain: 'reddit.com' },
    { title: 'Amazon.com: Deals', domain: 'amazon.com' },
    { title: 'Netflix', domain: 'netflix.com' },
    { title: 'Google Calendar', domain: 'calendar.google.com' },
    { title: 'Figma – Design File', domain: 'figma.com' },
    { title: 'Notion – Project Board', domain: 'notion.so' },
    { title: 'Spotify – Web Player', domain: 'spotify.com' },
    { title: 'GitHub – Pull Requests', domain: 'github.com' },
    { title: 'Stack Overflow – How to...', domain: 'stackoverflow.com' },
  ];

  const countEl = document.getElementById('x-tabs-count');
  const roastEl = document.getElementById('x-tabs-roast');

  const TAB_ROASTS = [
    'At this point, just marry your browser.',
    'Your RAM is filing a restraining order.',
    'This many tabs is a lifestyle choice.',
    'You don\'t close tabs. Tabs close you.',
    'Impressive. In a chaotic kind of way.',
  ];

  let tabCount = tabs.length;

  function updateCount() {
    if (countEl) countEl.textContent = `${tabCount} tab${tabCount !== 1 ? 's' : ''} open`;
  }

  function faviconUrl(domain) {
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  }

  grid.innerHTML = tabs.map((tab, i) => `
    <div class="x-tab-card" data-idx="${i}">
      <img class="x-tab-favicon" src="${faviconUrl(tab.domain)}" alt="" width="20" height="20">
      <div class="x-tab-info">
        <div class="x-tab-title">${tab.title}</div>
        <div class="x-tab-domain">${tab.domain}</div>
      </div>
      <button class="x-tab-close" title="Close tab">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  `).join('');

  updateCount();

  // Close tab on click
  grid.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('.x-tab-close');
    if (!closeBtn) return;
    const card = closeBtn.closest('.x-tab-card');
    if (!card) return;

    gsap.to(card, {
      opacity: 0, x: -20, height: 0, padding: 0, margin: 0, borderWidth: 0,
      duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        card.remove();
        tabCount--;
        updateCount();
        // Update roast on threshold crossings
        if (tabCount === 20 || tabCount === 15 || tabCount === 10 || tabCount === 5) {
          const roast = TAB_ROASTS[Math.floor(Math.random() * TAB_ROASTS.length)];
          gsap.to(roastEl, {
            opacity: 0, y: -10, duration: 0.2,
            onComplete: () => {
              roastEl.textContent = roast;
              gsap.to(roastEl, { opacity: 1, y: 0, duration: 0.3 });
            }
          });
        }
      }
    });
  });

  // Scroll-triggered staggered entrance — row by row
  if (typeof ScrollTrigger !== 'undefined') {
    const cards = gsap.utils.toArray('.x-tab-card');
    cards.forEach((card, i) => {
      gsap.set(card, { opacity: 0, y: 20 });
    });

    ScrollTrigger.create({
      trigger: grid,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        cards.forEach((card, i) => {
          gsap.to(card, {
            opacity: 1, y: 0,
            duration: 0.4,
            delay: i * 0.04,
            ease: 'power2.out'
          });
        });
      }
    });

    // Also animate the header
    gsap.from('.x-tabs-count', {
      scrollTrigger: { trigger: '.x-tabs-showcase', start: 'top 85%', once: true },
      y: 20, opacity: 0, duration: 0.4, ease: 'power2.out'
    });
    gsap.from('.x-tabs-roast', {
      scrollTrigger: { trigger: '.x-tabs-showcase', start: 'top 85%', once: true },
      y: 20, opacity: 0, duration: 0.5, delay: 0.1, ease: 'power2.out'
    });
  }
}

/* ─── 13. HERO CARD TOGGLE ─── */

function initHeroCardToggle() {
  const btn = document.getElementById('x-hero-card-toggle');
  const card = document.getElementById('x-hero-card-wrap');
  if (!btn || !card) return;

  // Start visible
  btn.title = 'Collapse';

  // Manual toggle only
  btn.addEventListener('click', () => {
    card.classList.toggle('collapsed');
    btn.title = card.classList.contains('collapsed') ? 'Expand' : 'Collapse';
  });
}

/* ─── 13. INIT ─── */

(function init() {
  // Allow external pages to skip the full init
  if (window.__skipExploreInit) return;

  // Force scroll to top on load (prevent browser scroll restoration)
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  JestyCharacters.init();

  // Register ScrollTrigger early
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Nav + accessories
  updateNavAccSlots();
  initAccDropdown();
  initColorPicker();
  initHeroCardToggle();

  // Hero
  renderHeroFace('smug');
  heroBounceIn();
  initBgWord();
  startBlink();
  startExpressionCycle();

  // Roast notification stack (top-right)
  const NOTIF_ROASTS = [
    "I have 147 tabs open and zero answers.",
    "Not procrastinating. Researching.",
    "Everything is a rabbit hole.",
    "I've seen your tabs. Get help.",
    "My browser history is a cry for help.",
    "I'll close it when I'm done.",
    "404: Focus Not Found.",
    "This was supposed to be a quick Google.",
    "Tab 1 of \u221E.",
    "Judging you. Quietly. Always.",
    "Currently loading... for 6 years.",
    "You opened me. I didn't ask for this.",
  ];
  const notifContainer = document.getElementById('x-roast-notifs');
  if (notifContainer) {
    let nIdx = 0;
    const MAX_VISIBLE = 3;

    function pushNotif() {
      if (paused) return;
      const notif = document.createElement('div');
      notif.className = 'x-roast-notif';
      notif.textContent = NOTIF_ROASTS[nIdx];
      nIdx = (nIdx + 1) % NOTIF_ROASTS.length;

      notifContainer.appendChild(notif);

      // Slide in from right
      gsap.fromTo(notif, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: 'power2.out' });

      // If too many, remove the oldest
      const children = notifContainer.children;
      if (children.length > MAX_VISIBLE) {
        const oldest = children[0];
        gsap.to(oldest, {
          y: -20, opacity: 0, height: 0, padding: 0, duration: 0.3, ease: 'power2.in',
          onComplete: () => oldest.remove()
        });
      }

      gsap.delayedCall(3 + Math.random() * 2, pushNotif);
    }

    let paused = false;
    notifContainer.addEventListener('click', () => {
      if (paused) return;
      paused = true;
      gsap.to(notifContainer, {
        x: -60, opacity: 0, duration: 0.3, ease: 'power2.in',
        onComplete: () => {
          notifContainer.innerHTML = '';
          // Bring it back after 10s
          gsap.delayedCall(10, () => {
            paused = false;
            gsap.set(notifContainer, { x: 0, opacity: 1 });
            pushNotif();
          });
        }
      });
    });

    gsap.delayedCall(4, pushNotif);
  }

  // Hero text entrance
  gsap.from('.x-hero-title', { y: 30, opacity: 0, duration: 0.6, delay: 0.4, ease: 'power2.out' });
  gsap.from('.x-hero-subtitle', { y: 20, opacity: 0, duration: 0.6, delay: 0.55, ease: 'power2.out' });
  gsap.from('.x-color-picker', { y: 20, opacity: 0, duration: 0.6, delay: 0.7, ease: 'power2.out' });

  // Parallax: bg word scrolls slower than content
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.to('.x-hero-bg-word', {
      y: -150,
      ease: 'none',
      scrollTrigger: {
        trigger: '.x-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      }
    });
  }

  // Roast cards
  renderRoastCards();

  // Individual parallax on each roast card via CSS transform
  const roastCards = document.querySelectorAll('.x-roast-card');
  const parallaxSpeeds = [0.04, 0.07, 0.03, 0.06, 0.05, 0.08];
  if (roastCards.length) {
    let pxTicking = false;
    window.addEventListener('scroll', () => {
      if (pxTicking) return;
      pxTicking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        roastCards.forEach((card, i) => {
          if (i >= parallaxSpeeds.length) return;
          const offset = scrollY * parallaxSpeeds[i];
          card.style.marginTop = -offset + 'px';
        });
        pxTicking = false;
      });
    }, { passive: true });
  }

  // Feature scenes
  initFeatureRoast();
  initFeatureChat();
  initFeatureFocus();
  initFeatureTasks();
  initFeatureGames();
  initFeatureAcc();
  initFeatureDossier();

  // Scroll-triggered slide-up entrances
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.from('#x-hero-card-wrap', {
      scrollTrigger: { trigger: '#x-hero-card-wrap', start: 'top 90%', once: true },
      y: 60, opacity: 0, duration: 0.6, ease: 'power2.out'
    });

    gsap.from('.x-features-intro', {
      scrollTrigger: { trigger: '.x-features-intro', start: 'top 85%', once: true },
      y: 40, opacity: 0, duration: 0.5, ease: 'power2.out'
    });

    gsap.utils.toArray('.x-feature-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 90%', once: true },
        y: 50, opacity: 0, duration: 0.5, delay: i % 3 * 0.1,
        ease: 'power2.out'
      });
    });
  }

  // Mood intro lines — slide in, then darken one by one scrubbed to scroll
  if (typeof ScrollTrigger !== 'undefined') {
    const moodLines = gsap.utils.toArray('.x-mood-line');
    const moodSection = document.getElementById('x-mood-intro');

    // Phase 1: Slide up into view when section enters
    moodLines.forEach((line, i) => {
      gsap.from(line, {
        scrollTrigger: { trigger: moodSection, start: 'top 85%', once: true },
        y: 40, opacity: 0, duration: 0.6, delay: i * 0.18,
        ease: 'power2.out'
      });
    });

    // Phase 2: Scrubbed timeline — lines darken one by one as user scrolls through section
    const moodTl = gsap.timeline({
      scrollTrigger: {
        trigger: moodSection,
        start: 'top 40%',
        end: 'bottom 60%',
        scrub: 0.3,
      }
    });

    moodLines.forEach((line, i) => {
      moodTl.to(line, {
        color: '#1C1917',
        duration: 1,
        ease: 'power1.out',
      }, i * 1.2);
    });
  }

  // New sections
  initTabsShowcase();
  initPricing();
  initFooter();
})();
