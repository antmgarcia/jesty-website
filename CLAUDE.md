# Jesty Website

Marketing site for Jesty, a Chrome extension that reads your open tabs and delivers AI roasts. Heavy animation, interactive elements, and mini-scenes showcasing extension features.

## UI Changes

- Make minimal, targeted edits. Do NOT change layout, animations, or surrounding elements unless explicitly asked.
- If reverting, revert completely — no partial rollbacks.
- For visual/design tasks: describe what you plan to change BEFORE editing. Wait for user confirmation on layout direction, sizing, colors, and composition before writing code.
- Do not add or remove sections beyond what was requested. A copy tweak doesn't need a layout refactor.
- The Personalized Roasts hero card paddings (14px sides/bottom, 6px top) are carefully tuned — do not change them without explicit approval.

## Architecture

```
┌─────────────────────────────────────────────────┐
│              Static Marketing Site               │
│         (No build system, vanilla JS)            │
├─────────────────────────────────────────────────┤
│                                                  │
│  index.html ─── Single page, all sections        │
│  site.css ─── All styles (~2100 lines)           │
│  site.js ─── Animations & interactions (~1950 l) │
│  characters.js ─── SVG symbol definitions        │
│  gsap.min.js ─── GSAP core only (vendor)         │
│  ScrollTrigger ─── Loaded from CDN               │
│  assets/icon.svg ─── Favicon / nav icon          │
│                                                  │
│  Other files:                                    │
│  character-loop.html ─── Standalone char anim    │
│  features-lab.html ─── Isolated bento grid lab   │
│                                                  │
└─────────────────────────────────────────────────┘
```

No frameworks, no bundler. GSAP core loaded locally, ScrollTrigger from CDN.

## File Reference

| File | Purpose |
|------|---------|
| `index.html` | Main page — nav, hero, roast cards, mood intro, features, tab manager, pricing, store, footer reveal |
| `site.css` | All styles — design tokens, nav, hero, roast cards, mood intro, features (chrome window, mini-scenes), tab manager, pricing, store, footer, responsive |
| `site.js` | All JS — character rendering, hero animations, roast card fly-in + drift + drag, feature scene animations (chat, focus, tasks, memory match, accessories carousel, dossier), tab manager, color picker, accessories dropdown, footer bg word. Has `__skipExploreInit` flag for lab pages |
| `characters.js` | SVG `<symbol>` definitions for 15 expressions + accessories. Shared with the extension. `JestyCharacters.init()` |
| `gsap.min.js` | GSAP core only (no plugins) — vendor, do not edit |
| `assets/icon.svg` | Jesty icon for nav and chrome window frame |
| `character-loop.html` | Standalone page: full-viewport character animation loop with bg word |
| `features-lab.html` | Isolated bento grid layout for feature cards. Uses `__skipExploreInit` to load site.js without running the full IIFE |

## Page Sections (in order)

1. **Nav Island** — Floating pill nav: icon, hat/glasses accessory slots, `+` button, "Add to Chrome" CTA. Accessories hidden on mobile (768px).
2. **Accessories Dropdown** — Single-row grid below nav: 5 hats + 5 glasses + X reset button. Toggle select/unselect. JS-positioned 2px below nav.
3. **Hero** — Animated character (280px, crown + 3D glasses, purple), background "JESTY" word cycling through 7 colors, heading, subtitle, 6-color face picker. Parallax on bg word via ScrollTrigger.
4. **Roast Cards** — 6 draggable cards at page edges, fly in on load. Scroll-triggered drift to scattered positions. Cards show face expressions with accessories (body stripped), eye close-up avatars, roast/tab count pills.
5. **Mood Intro** — "Every roast has a mood / Every mood has a face / Every face has a feeling / Every feeling is about yourself!" — lines slide up staggered, darken on scroll (scrubbed GSAP timeline).
6. **Features** — Hero card (Personalized Roasts as Chrome window replica, starts collapsed, manual toggle) + 3-column grid of 6 feature cards with animated mini-scenes.
7. **Tab Manager** — Standalone section: tab count, roast headline, 3-column grid of 27 tabs with real favicons, close-to-dismiss, fade mask at bottom.
8. **Pricing** — 3 tier cards with tier-specific character combos (free=lime/smug, guilty=pink/happy/crown, sentenced=mint/smug/flame-crown). Faces blink randomly.
9. **Store** — 3 merch items with expression-cycling faces.
10. **Footer** — Fixed at bottom (`position: fixed, z-index: 1`), revealed as `<main>` scrolls past. Purple accent background, animated "JESTY" bg word, CTA + footer nav links.

## Feature Mini-Scenes (inside feature cards)

| Feature | Animation |
|---------|-----------|
| **Personalized Roasts** | Chrome window replica: tab bar + URL bar + newtab page with character, roast text cycling, action buttons. Widgets with hover tooltips. Collapse/expand toggle. |
| **Talk Back** | Auto-playing chat: typing dots → user bubble → typing dots → Jesty bubble with avatar. 3 conversation scripts looping. |
| **Focus Time** | Timer counts up 0:00→0:04, then timer chars explode (CSS `timerDrop` keyframes — bounce up, accelerate down with rotation). Resume message fades in. |
| **Tasks** | Task list: 3 rows with checkboxes, truncated titles, note count badges. Auto-loop: check task → "Done" badge → slide out → new task slides in. |
| **Mini-Games** | 4×3 memory match grid: auto-flips pairs, green match highlight, "Perfect!" + 3 golden stars pop animation on completion. |
| **Accessories** | 5-slot carousel: left/center/right items, center highlighted (gold border). Items slide between positions every 2.5s. Each accessory is a permanent DOM element. |
| **Dossier** | Big stat numbers (count-up animation) + 4 category bars (animated width). 3 datasets cycle every 5s with fade transition. |

## Design System

- **Background**: `#FAF8F5` (--bg), `#F0EDEA` (--bg-secondary), `#F5F3F0` (--bg-tertiary)
- **Text**: `#1C1917`, `#6B6560`, `#9C968F`, `#CCC7C2`
- **Buttons**: Dark pill `#1C1917`, secondary outline
- **Accent**: `#A78BFA` (purple, used for footer bg)
- **Fonts**: DM Sans (400–800), Danfo (bg word only)
- **Card system**: outer `bg-secondary` with `14px` padding + `14px` radius, inner `bg` with `6px` radius
- **Max widths**: 1200px (features), 1080px (other sections)
- **Character colors**: Lime, Pink, Sky, Purple (default), Mint, Peach — each with body/limb/shadow/highlight
- **SVG source color**: Lime — recolored via `recolorSvg()` hex replacement

## Character System

- `characters.js` injects SVG `<symbol>` elements into `<defs>`
- `buildFaceSvg(mood, colorKey, width)` — returns SVG string with unique clip-path UIDs
- `renderFaceInto(el, mood, colorKey, width)` — renders into a container
- `renderHeroFace(mood)` — renders hero with accessories via `renderHeroAccessories()`
- `renderAccOnSvg(svgEl, mood, hatId, glassesId, colorKey)` — renders accessories on any SVG
- Hero expression cycle: smug → suspicious → eyeroll → melting → dead → thinking → impressed → chaotic → tender
- Tender mood triggers floating hearts animation
- Roast card faces: body/arms/legs stripped (DOM filtering by fill/stroke color), only facial features + accessories shown

## Animation System

- **GSAP core** loaded locally, **ScrollTrigger** from CDN
- `__skipExploreInit` flag: set `window.__skipExploreInit = true` before loading `site.js` to skip the IIFE (used by lab pages)
- **Hero bg word**: color cycling (bg-secondary → lime → pink → sky → purple → mint → peach), first cycle has shorter hold (2.5s vs 6s)
- **Hero parallax**: bg word moves at `y: -150` scrubbed to scroll
- **Roast cards**: two-phase animation — fly-in on load (edge positions), scroll-triggered drift (10% scroll threshold, different durations per card). Mobile: 4 cards, single movement, no drift
- **Mood intro**: slide-up stagger on enter, scrubbed color darkening
- **Feature card entrances**: scroll-triggered slide-up with stagger
- **Footer bg word**: same color-cycling animation as hero, independent instance
- **Timer explosion**: CSS `@keyframes x-timerDrop` with per-character spread, rotation, and bounce — matches extension's `explodeTimer()`

## Responsive (768px / 480px)

- **Nav**: accessories hidden, icon close to CTA
- **Hero**: smaller character (200px), `min-height: auto`, bg word at 25% + 28vw font
- **Roast cards**: 4 cards shown, single fly-in, no drift, same 280px width
- **Mood intro**: 420px top padding, 40px font, weight 900
- **Features**: 16px padding, single column, hero card stacks vertically (text hidden on mobile, widgets/actions hidden, 260px preview height, no toggle)
- **Tab manager**: single column grid
- **Pricing/Store**: single column
- **Footer**: stacked layout

## Common Pitfalls

- `characters.js` is shared with the extension — do not modify SVG symbols for website-only needs
- `gsap.min.js` is GSAP core only — does NOT include ScrollTrigger (loaded from CDN separately)
- SVG clip-path IDs must be unique per render instance (use uid suffixes) or faces visually break
- Hero card paddings are intentionally asymmetric (6px top for chrome tab bar, 14px sides/bottom) — do not "fix" to uniform
- Roast card positions use `window.innerWidth` — recalculated on load, not on resize
- The `<main class="x-main">` wrapper with `z-index: 2` + `background: var(--bg)` is critical for the footer reveal — all content must be inside it
- Footer is `position: fixed; bottom: 0; z-index: 1` — `margin-bottom: var(--footer-h)` on `.x-main` creates space for it
- Accessory anchors (`ACC_ANCHORS`) are per-mood; not all moods have entries — falls back to `smug`
- The accessories carousel creates one DOM element per accessory (not 3 slots with swapped content) — this enables the real sliding transition
- `overflow-x: hidden` on `html` and `body` is required to prevent horizontal scroll from roast cards and marquee elements
