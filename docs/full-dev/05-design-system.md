# Design System: DARZ · Cut Light

_Status: **draft** (2026-11-20). Awaiting Phase 5 approval._ Tokens: [`styles/tokens.css`](../../styles/tokens.css) · Preview: [`design/design-system.html`](../../design/design-system.html)

## Typography
| Role | Family | Weight / width | Size (clamp) | Line height | Tracking |
|---|---|---|---|---|---|
| Display | Archivo | 900 / wdth 62 | 72 → 220 | 0.84 | −0.02em |
| H1 | Archivo | 800 / wdth 68 | 44 → 88 | 0.95 | −0.01em |
| H2 | Archivo | 750 / wdth 75 | 32 → 56 | 0.95 | 0 |
| H3 | Archivo | 700 / wdth 85 | 22 → 30 | 1.15 | 0 |
| Lede | Archivo | 450 / wdth 92 | 19 → 26 | 1.3 | 0 |
| Body | Archivo | 400 / wdth 100 | 16 (18 on product copy) | 1.6 | 0 |
| UI | Archivo | 550 | 14 | 1.3 | 0.01em |
| Price | Archivo | 650, tabular numerals | 20 | 1.2 | 0 |
| Notation | Martian Mono | 500, uppercase | 11 | 1.9 | 0.04em |

- **Measure:** 62ch.
- **Width axis as material:** structure 62 · heading 72 · sub 85 · text 100 · wide 112. Headlines ease from 62 toward 72 as they enter view, the only moving type.
- **Licensing:** both faces are on Google Fonts under the SIL Open Font License, free for commercial use, self-hosted via `next/font`.
- **Notation face only for:** material studies, Studio slot labels and menu piece labels. Never eyebrows or general labels.

## Colour
| Token | Light | Dark | Purpose | Contrast vs bg (light / dark) |
|---|---|---|---|---|
| `--color-bg` | #ECECE7 Marble | #16191E | Page ground | — |
| `--color-surface` | #F6F6F2 Paper | #1E2229 | Sheets, panels, menus | — |
| `--color-surface-sunk` | #E1E1DA Stone | #262B33 | Wells, hover fills, skeletons | — |
| `--color-text` | #1C2026 Graphite | #E6E6E0 | Primary ink, primary buttons | 13.8 / 14.1 |
| `--color-text-2` | #4A4F57 | #A9ADB4 | Secondary text | 7.0 / 7.8 |
| `--color-text-muted` | #5D625A | #9297A0 | Captions, meta | 5.3 / 6.0 |
| `--color-line` | #D3D3CC | #30353D | Decorative hairlines | — |
| `--color-line-strong` | #7A7C74 | #737A84 | Control borders | 3.6 / 3.6 |
| `--color-accent` | #2E49B8 Chalk blue | #8EA2F0 | Links, notches, focus, selection | 6.4 / 7.2 |
| `--color-accent-ink` | #1F3591 | #B3C1F6 | Accent hover/pressed | 9.0 / 10.0 |
| `--color-accent-wash` | #DCE2F7 | #26304F | Selected backgrounds | — |
| `--color-lattice` | #9A9C95 | #5C6068 | Lattice light layer only | decorative |
| `--color-sand` | #B4674B | #C98466 | Inside photography and room light only | never UI |
| `--color-success / warn / error` | #2F6B3E / #7F5300 / #A3322A | #7BC48D / #E0B25A / #F08A80 | In stock / low stock / errors | ≥ 5.4 / ≥ 7.3 |

- The focus ring is a 2 px accent outline with a 3 px offset. Text on accent is #FFF (7.6:1); text on graphite is Paper (15.1:1).
- Dark mode ("night courtyard") is designed, not inverted. Chalk lightens to stay visible; sandstone warms.
- **Brand override:** `--color-accent`, `--color-text` and `--color-bg` can be set from Atelier → Settings. The admin checks contrast before saving.

## Layout
- **Max width:** content 1280, full-bleed 1440.
- **Grid:** 12 columns ≥ 1200 px (gap 24, gutter 48) · 8 columns ≥ 768 px (gap 20, gutter 32) · 4 columns on mobile (gap 16, gutter 16 + safe areas).
- **Spacing scale (4-based):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160. Sections are spaced `clamp(64px, 6vw + 32px, 160px)` apart.
- **Breakpoints designed:** 390, 768, 1024, 1440.
- **Jali module:** exhibition walls place cells on the 12-column grid in spans of 3/4/6 with 4:5 and 1:1 ratios; one hero cell (6 × 2 rows) every ~7 products.

## Components
| Component | Variants | States | Notes |
|---|---|---|---|
| Button | primary (notched), secondary (outline), text link (dashed underline) | default / hover / pressed / focus / disabled (uncut) / loading (travelling cut-line) | Min height 48; 0 radius |
| Input | text, tel, select, textarea | default / focus (dashed accent border + wash ring) / error / disabled | 16 px text (no iOS zoom); 2 px radius |
| Size selector | toggle buttons | default / selected (graphite + chalk notch) / sold out (hatched, struck) | 52 × 48 min |
| Colour swatch | fabric swatch image or flat colour | default / selected (dashed ring) | 44 × 44 |
| Stock line | in stock / low / sold out | — | Dot + text, never colour alone |
| Nav bar | desktop / mobile | default / scrolled (hides down, returns up) | Bag count dot |
| Pattern-sheet menu | desktop grid / mobile stacked strips | open / closed | Accessible list underneath; focus-trapped |
| Product cell | standard / hero | default / hover (notch widens) | Price and in-stock sizes always visible |
| Aperture | front / sleeve / yoke / jali arch | — | Hero and featured images only |
| Material Study | 3 facts + full spec | collapsed / expanded | Notation inside a dashed cut-line |
| Toast | success / error | enter / exit | Notch at top-left |
| Sheet (filters, size guide, bag) | side (desktop) / bottom (mobile) | open / closed | Slides like a pattern piece |

## Radius, borders, shadows, texture
- **Radius:** 0 for apertures, sheets and buttons; 2 px for inputs and swatches; fully round only for the bag count and colour dots.
- **Borders:** hairline (decorative); control (3:1); **cut-line** (1 px dashed accent), used only for editable, droppable or compare edges.
- **Shadows:** none on cards. One cast shadow (raking light) for a Studio piece being dragged.
- **Texture:** paper grain at 3.5% opacity on the Marble ground; lattice light as the only ambient layer.

## Icons & imagery
- **Icon set:** custom, 24 grid, 1.5 stroke, square caps and miter joins ("tailor's pencil"): bag, search, menu, close, arrow, pin (shortlist), size guide, lock, share, check, shuffle, compare. No emoji, no mixed sets.
- **Image treatment:** product 4:5, macro 1:1, rooms 16:9; slightly cool grade; no drop shadows; focal point stored per image so apertures crop correctly; fabric texture placeholder when missing.
- **Studio flat-lays (demo):** illustrated garments in a consistent style (flat colour + fabric texture, graphite outline, notch marks), replaceable from the admin.

## Signature elements
| Element | Derived from | Where it appears | Where it never appears |
|---|---|---|---|
| **Aperture** (pattern-piece masks: front, sleeve, yoke, jali arch) | Pattern pieces + jali arches | Home hero, room teasers, material study, product hero, traditional collection | Product grid cells, admin, checkout |
| **Notch** | Pattern notches | Primary button, product cell bottom edge, selected size, section labels, toasts | Every corner, icons, body text, more than one per control |
| **Lattice light** | Light through the jali | Home entrance, exhibition titles, Studio table (max one per view) | Behind body text at readable contrast, checkout, admin |
| **Pattern notation** | Tailor's marks | Material Study, Studio slot labels, menu piece labels | General labels, eyebrows, prices |

## Motion tokens
- **Eases:** `--ease-cut` cubic-bezier(.2,.7,.2,1) (apertures, sheets) · `--ease-assemble` cubic-bezier(.32,0,.12,1) (pieces meeting at a notch) · `--ease-exit` cubic-bezier(.4,0,1,1).
- **Durations:** micro 120 · UI 240 · assemble 480 · reveal 700 · lattice drift 26 s. All collapse to 0 under `prefers-reduced-motion`. Nothing bounces.

## Anti-generic check
| Tell | Status |
|---|---|
| Cream + serif display + terracotta | **Avoided.** Marble is cool grey, display is a condensed grotesk, and the warm sandstone is banned from UI paint |
| Near-black + one acid accent | **Avoided.** Graphite (a chosen blue-grey, not #111) with a muted chalk blue |
| SaaS card kit / one radius everywhere | **Avoided.** Radius varies by role; no card shadows; cells are cut, not rounded |
| Monospace for small labels / eyebrow on every heading | **Revised.** Mono restricted to notation; section labels use the notch mark sparingly on boards, and on the live site only where content is a real sequence or a piece label |
| Fade-up on every section | **Avoided.** The motion grammar is "assemble" and "cut open", specified per section in Phase 7 |
| Inter/Montserrat by default | **Avoided.** Archivo chosen for its width axis (the concept), not for safety |
| Hearts for wishlist | **Replaced** with a tailor's pin |
