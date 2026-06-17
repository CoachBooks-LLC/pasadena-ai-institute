# Design

## Theme

A museum gallery. Near-white "gallery wall" surfaces for reading, interrupted by full-bleed immersive panels of real impressionist masterworks (hero, section dividers, CTA). The paintings are the only source of saturated color; the chrome is monochrome and quiet so the work sings. Light by default; immersive art panels supply the drama and depth the user loved on the cover.

## Color

OKLCH. The palette is deliberately near-monochrome — color comes from the art, not the UI.

- `--bg` gallery wall: `oklch(98.2% 0.003 95)` — a true near-white, faintly cool-neutral. NOT warm cream.
- `--surface` raised paper: `oklch(99.5% 0.002 95)`.
- `--ink` near-black: `oklch(22% 0.006 270)` — cool-neutral charcoal, never warm-navy.
- `--ink-soft` body: `oklch(38% 0.008 270)`; `--ink-mute` captions: `oklch(52% 0.008 270)` (verified ≥4.5:1 on bg).
- `--line` hairline: `oklch(22% 0.006 270 / 0.12)`.
- `--accent` (sparing, links/active): a deep Monet pond blue-green `oklch(48% 0.07 215)`. Used for interactive accent only; never decoration.
- On dark art panels: text is `oklch(98% 0 0)` with letter-spacing + line-height compensation; scrim is a vertical/painterly black gradient tuned per image for ≥4.5:1.

Strategy: **Restrained** chrome wrapping **Drenched** art panels. The contrast (quiet wall ↔ saturated painting) is the voice.

## Typography

Two families, genuine serif/sans contrast. Loaded via `next/font` (swap, metric fallbacks).

- **Display — Bodoni Moda** (variable, optical sizing). High-contrast didone = exhibition/title lettering. Hero + major section headings. Fluid `clamp()`, ratio ≥1.25, letter-spacing ≥ -0.02em, `text-wrap: balance`.
- **Body / UI — Hanken Grotesk.** Clean modern grotesque. Body, labels, nav, buttons. Fixed rem body (≥1.0625rem), measure 60–72ch, line-height 1.6.
- Weights: Bodoni 400/500 (display only); Hanken 400/500/600. No mono (would read as costume for an art brand).
- No Inter, Fraunces, Cormorant, Playfair, DM, Space — all reflex-reject.

## Components

- **Art panel** — full-bleed `<img>` of a real painting, painterly scrim, display headline + minimal copy + one CTA. The signature surface. Subtle Ken Burns / parallax (reduced-motion: static).
- **Buttons** — primary: solid `--ink` fill, white text, no shadow, no gradient; tight radius. On art panels: the existing liquid-glass button (purposeful, rare — kept only here). Secondary: underlined ink text link with the accent on hover.
- **Plates** — quiet content blocks separated by whitespace + hairlines, NOT boxed cards. Where a grid is truly needed, hairline-divided, never identical drop-shadow card grids.
- **Captions** — gallery wall-label style: small Hanken, artist · title · medium, used to credit the real artworks (doubles as tasteful proof of authenticity).
- No glass-as-default, no glow, no gradient text, no eyebrow-on-every-section, no numbered markers, no big decorative icons.

## Layout

Editorial-gallery: generous `clamp()` spacing that breathes on large viewports, asymmetric compositions, one dominant idea per fold, deliberate pacing. Max content width ~72ch for prose; art panels go full-bleed. Breakpoint-free grids via `repeat(auto-fit, minmax(...))` only where cards are genuinely right.

## Motion

Slow and intentional — the pace of looking at a painting. Ease-out (quart/expo), no bounce. First-load: one orchestrated reveal (headline rise + image settle). Scroll: gentle parallax on art panels, single staggered reveal per section (not a uniform fade on every block). Every effect has a `prefers-reduced-motion: reduce` crossfade/static fallback. Durations 0.6–1.2s.

## Imagery

Real, public-domain masterworks (CC0, Art Institute of Chicago) downloaded to `/public/art`: Monet *Water Lilies*, *Water Lily Pond*, *Cliff Walk at Pourville*, *Stacks of Wheat*; Caillebotte *Paris Street; Rainy Day*; Seurat *La Grande Jatte*; Van Gogh *The Bedroom*. Each credited in a wall-label caption. Picasso/Matisse excluded (still in copyright). Alt text is curatorial, part of the voice.
