## Goal

Layer three "wow" effects onto the existing portfolio without changing the layout or content. Everything must respect `prefers-reduced-motion`, stay smooth on mid-range laptops, and never block interaction.

## 1. Entry loader / curtain reveal

First-paint experience that sets the tone, then gets out of the way.

- **Look**: full-screen panel in foreground color (near-black ink), centered with a small mono counter `00 → 100` ticking quickly (~1.6s total) and the label "YOUR NAME · PORTFOLIO · 2026" in the corners (matches nav style).
- **Exit**: when counter hits 100, panel splits — top half slides up, bottom half slides down (or single panel slides up with `clip-path`). Easing `[0.85, 0, 0.15, 1]`, ~0.9s.
- **Hero entry**: existing hero stagger starts the moment the curtain begins to exit (not after), so the reveal feels continuous.
- **Once per session**: store a flag in `sessionStorage` so reloading the same tab doesn't replay; first visit and new tabs do play.
- **Reduced motion**: skip entirely.
- **Implementation**: new `src/components/site/Loader.tsx` using Motion (`AnimatePresence`, exit variants). Mounted at top of `routes/index.tsx`. Locks body scroll while visible.

## 2. Animated text reveals

Replaces the current "fade + 20px translate" reveal on display headlines with a richer split-word/line reveal. Body copy keeps the current subtle fade.

- **Mechanic**: Split each headline into words, wrap each in a `overflow-hidden` mask, translate each word from `y: 110%` to `0` with stagger ~40ms. Words within a line animate together; lines stagger ~80ms.
- **Trigger**: `whileInView` with `once: true`, `margin: "-15%"` so it fires when ~15% past the viewport edge.
- **Where applied**:
  - Hero: "Freelance / developer, / shipping ideas."
  - About: big paragraph headline.
  - Projects: "Projects" wordmark.
  - FAQ: "FAQ" wordmark + each question on open.
  - Contact: "Let's *collab*" wordmark.
  - Footer: "Your Name".
- **Implementation**: new `src/components/site/SplitReveal.tsx` — takes `children: string`, splits on whitespace, renders the masked-word stagger. Replace inline hero stagger with this component so it's consistent.
- **Reduced motion**: render plain text, no animation.

## 3. Fluid distortion overlay

Ambient mouse-driven liquid layer behind content.

- **Library**: `@whatisjery/react-fluid-distortion` (already installed) + `@react-three/fiber` + `@react-three/postprocessing` (already installed).
- **Placement**: fixed full-viewport `<Canvas>` between the page gradient and the content. `pointer-events: none` so clicks pass through. Sits below the nav and loader.
- **Tuning for the pastel palette** (subtle, not flashy):
  - `fluidColor`: a deep ink tone (`#0a1d2a` or accent mint `#7fc8a9`) so it pushes the gradient subtly rather than overpowering it.
  - `backgroundColor`: transparent (`showBackground: false`).
  - `distortion`: 0.9 (lower than v1's 1.4).
  - `radius`: 0.05, `curl`: 4, `swirl`: 3, `force`: 1.5, `intensity`: 0.6.
  - `densityDissipation`: 0.97 (slow fade), `velocityDissipation`: 0.98.
- **Gating**:
  - SSR-guarded via existing `ClientOnly`.
  - Skip entirely if `prefers-reduced-motion`.
  - Skip on touch devices (`window.matchMedia('(pointer: coarse)')`) — fluid effect needs a mouse to feel right.
  - Pause when tab is hidden (visibilitychange) to save GPU.
- **Z-index map**: gradient `html` background (0) → fluid canvas (1) → page content (10) → nav (40) → loader (60) → sonner toaster (70).
- **Implementation**: rebuild `src/components/site/FluidLayer.tsx` (clean version of the old FluidCanvas, with the above tuning + gating). Mount in `routes/index.tsx` after `SmoothScroll`.

## Files to add / change

- `src/components/site/Loader.tsx` — new, entry curtain + counter.
- `src/components/site/SplitReveal.tsx` — new, word-mask stagger reveal.
- `src/components/site/FluidLayer.tsx` — new, gated fluid overlay.
- `src/components/site/Hero.tsx` — swap inline headline stagger for `SplitReveal`.
- `src/components/site/About.tsx` — use `SplitReveal` on the big paragraph.
- `src/components/site/Projects.tsx` — use `SplitReveal` on "Projects" wordmark.
- `src/components/site/FAQ.tsx` — use `SplitReveal` on "FAQ" wordmark.
- `src/components/site/Contact.tsx` — use `SplitReveal` on "Let's *collab*".
- `src/components/site/Footer.tsx` — use `SplitReveal` on "Your Name".
- `src/routes/index.tsx` — mount `<Loader />` and `<FluidLayer />`.
- `src/styles.css` — add z-index utility tokens if needed, ensure loader sits above everything.

## Out of scope (for this pass)

- Custom magnetic cursor (you opted out).
- 3D R3F shape in hero (kept flat).
- Project image displacement or floating preview (kept subtle tilt only — already done).
- Page-to-page transitions (single page app, not needed).

## Perf check

After build, I'll verify on the preview: curtain plays once, fluid layer doesn't drop frames on the hero, text reveals fire on scroll, and turning on reduced-motion in DevTools disables all three cleanly.
