# Motion Specification: DARZ homepage

_Status: **implemented** (2026-11-20). Phase 6 was skipped at your request; the homepage was designed and built directly from the approved design system plus the component research below._

## Component sources (one element from each, reshaped for Cut Light)
| Homepage part | Source of the idea | What we took | How it became ours |
|---|---|---|---|
| Hero light | Richard Mille "Art Here 2025" (Awwwards SOTD, shadows reveal art) | Light as the reveal | Jali star light on a courtyard wall, behind a garment seen through a pattern-piece cut |
| Hero headline | Variable-font hero animations (Awwwards element library, Google Fonts variable-font guide) | Animating a font axis | Archivo's width axis widens with scroll: condensed "structure" becomes wider "expression" |
| Menu | Typography-led fashion overlay menus (Canvas Agency, Dolce&Gabbana Alta Moda menu elements on Awwwards) | Full-screen, type-first menu | A pattern sheet on a cutting mat: categories are labelled pattern pieces |
| Exhibition wall | Lemaire digital flagship (AKQA) | Calm, spacious product rhythm | Jali-module grid with a centrepiece cell, notch-cut cells, a curated-look note |
| Quick look | Kvadrat textile pages | Material facts explained | Material notation inside the quick look; colours switch by bias cut, sizes by pull |
| Material study | Kvadrat textile pages | Fabric as a specified material | A yoke-shaped macro with callout pins tied to plain-language facts |
| Style Studio | Bonds Mash Up (SOTD), Jamie Kay outfit builder, That Original | Mix and match, URL-saved looks, fabric choice | Flat-lay cutting table with slot swaps, locks, shuffle, shortlist, link and WhatsApp share |
| Rooms row | Awwwards horizontal-scroll pattern (fashion SOTDs such as Max Mara and Nudie Jeans) | Horizontal browsing | Sleeve-shaped windows, each with its own light; scroll, swipe, drag or arrows |
| Construction note | Pattern drafting | Pencil lines drawing in | Kurta pattern pieces drawn with stroke animation, then seam allowance and notches |

## Global
- **Libraries:** none. CSS transitions/keyframes, the Web Animations API (pull and bias cut) and the View Transitions API (page to page). There's no GSAP, Lenis or WebGL, because the concept needs none of them and the budget is a mid-range Android.
- **Smooth scroll:** native only (`scroll-behavior: smooth` for anchor links, off under reduced motion). Scroll hijacking would fight the "calm gallery" feeling.
- **Easing tokens:** `--ease-cut` (.2,.7,.2,1) for openings and sheets; `--ease-assemble` (.32,0,.12,1) for pieces meeting; nothing bounces.
- **Reduced motion:** every duration token becomes 0; drift, assemble, line-in, stroke draw and view transitions are switched off; content is fully visible.
- **No-JS:** the `.js` class is set before paint; assemble-on-enter only hides content when JS is present, so the page is complete without JS.
- **Mobile:** same choreography, shorter distances; the hero scroll effect is driven by one rAF-throttled listener; no hover-dependent content.

## Section: Bar and menu
Purpose: get out of the way of the photography; make the menu feel like unfolding a pattern sheet.

| Element | Role | Trigger | From | To | Duration | Delay / stagger | Easing | Reduced motion |
|---|---|---|---|---|---|---|---|---|
| Bar | support | scroll down > 160 px / scroll up | visible | translateY(-100%) / back | 480 ms | — | cut | instant |
| Bar background | support | scroll > 8 px | transparent | marble 92% + hairline | 240 ms | — | cut | instant |
| Nav link underline | support | hover | width 0 | 100% chalk line | 240 ms | — | cut | instant |
| Bag count | lead | item added | translateY(-6px) scale(1.25) | rest | 420 ms | — | assemble | none |
| Pattern sheet | lead | menu open | clip inset(0 0 100% 0) | full | 700 ms | — | cut | instant |
| Pattern pieces | support | menu open | translateY(-14px) rotate(-1.2deg), 0 opacity | rest | 480 ms | 120 ms + 45 ms each | assemble | instant |

## Section: Hero (entrance)
Purpose: state the thesis. A garment appears through a cut; the light moves; the type is "built".

| Element | Role | Trigger | From | To | Duration | Delay | Easing | Scroll relation | Reduced motion |
|---|---|---|---|---|---|---|---|---|---|
| "Now showing" line | support | load | 0 opacity, +10px | rest | 700 ms | 80 ms | cut | — | static |
| Headline lines | lead | load | translateY(105%) inside a mask | rest | 900 ms | 140 / 230 / 320 ms | assemble | wdth 62 → 80 as the hero scrolls out | static, wdth 62 |
| Lede, actions | support | load | 0 opacity, +10px | rest | 700 ms | 520 / 620 ms | cut | — | static |
| Aperture cloth | lead | load | clip inset(48% 0 52% 0): a thin seam | full cut | 1100 ms | 200 ms | cut | aperture scales 0.9 → 1 (the cut opens) | static |
| Garment | support | scroll | scale 1.08 | 1.0 | — | — | linear to scroll | counter-scales inside the opening cut | static |
| Dashed seam outline | support | load / scroll | 0 opacity | 1, fades out as you scroll | 700 ms | 900 ms | cut | opacity 1 → 0 | static |
| Jali light | ambient | always | — | drifts 30 × 18 px | 26 s alternate | — | linear | — | off |

## Section: Exhibition wall
Purpose: arrive at the wall like walking into a room; each piece is placed, not faded in.

| Element | Role | Trigger | From | To | Duration | Delay / stagger | Easing | Reduced motion |
|---|---|---|---|---|---|---|---|---|
| Title block (+ shadow lattice) | lead | enters view | +22px, 0 opacity | rest | 700 ms | — | assemble | static |
| Curator line | support | enters view | +22px | rest | 700 ms | 120 ms | assemble | static |
| Cells | lead | each enters view | +32px, 0 opacity | rest | 700 ms | 0 / 90 / 180 ms by column | assemble | static |
| Cell notch | support | hover / focus | 16 px notch | 32 px notch | 480 ms | — | cut | instant |
| Cell garment | support | hover | rotate(-2deg) | rotate(0) scale(1.04) | 700 ms | — | cut | none |

### Quick look (dialog)
| Element | Role | Trigger | From | To | Duration | Delay / stagger | Easing | Reduced motion |
|---|---|---|---|---|---|---|---|---|
| Sheet | lead | open | clip from the right edge + 40px | full | 700 ms | — | cut | instant |
| Panel items | support | open | +18px x, 0 opacity | rest | 480 ms | 80 → 280 ms | assemble | instant |
| **Colour switch (bias cut)** | lead | swatch | new layer clipped to a 38° edge | full | 560 ms | — | cut | instant swap |
| Seam line | support | swatch | left −20% | left 112% | 560 ms | — | cut | none |
| **Size switch (pull)** | lead | size | covers old size | stretches over old + new, settles on new | 480 ms | label colour +60 ms | assemble | instant |
| First size pick | support | first select | clip inset(0 50%) | full | 300 ms | — | cut | instant |

## Section: Material study
| Element | Role | Trigger | From | To | Duration | Delay | Easing | Reduced motion |
|---|---|---|---|---|---|---|---|---|
| Macro | lead | enters view | 0 opacity | rest | 700 ms | — | assemble | static |
| Raking light | lead | enters view (once) | translateX(-70%) | 70% | 2.4 s | 300 ms | cut | none |
| Fact rows → pins | support | hover / focus a fact | pin scale 1 | 1.8 + chalk wash; macro zooms 1.08 → 1.16 | 240 ms / 1.2 s | — | cut | instant |
| Full specification | support | open | clip inset(0 0 100% 0) | full | 480 ms | — | cut | instant |

## Section: Style Studio
| Element | Role | Trigger | From | To | Duration | Easing | Reduced motion |
|---|---|---|---|---|---|---|---|
| Piece swap (next) | lead | arrow / shuffle | +36px, rotate(4deg), clipped from the left 40% | rest | 480 ms | assemble | instant |
| Piece swap (previous) | lead | arrow | −36px, rotate(−4deg), clipped from the right | rest | 480 ms | assemble | instant |
| Lock | support | toggle | outline dashed | solid chalk border, filled lock | 240 ms | cut | instant |
| Size / shoe size | lead | select | pull (as above) | | 480 ms | assemble | instant |
| Total price | support | any change | — | updates; announced to screen readers | — | — | — |

## Section: Rooms
| Element | Role | Trigger | From | To | Duration | Delay / stagger | Easing | Reduced motion |
|---|---|---|---|---|---|---|---|---|
| Room cards | lead | enters view | +40px x | rest | 700 ms | 80 ms each | assemble | static |
| Light beam | support | hover / focus | translateX(-40%) | 40% | 1.1 s | — | cut | none |
| Garment | support | hover | rotate(-3deg) | rotate(0) scale(1.04) | 700 ms | — | cut | none |
| Track | — | arrows / drag / swipe | — | scroll-snap to the next room | native smooth | — | — | auto |

## Section: Construction note
| Element | Role | Trigger | From | To | Duration | Delay / stagger | Easing | Reduced motion |
|---|---|---|---|---|---|---|---|---|
| Pattern outlines | lead | enters view | stroke-dashoffset 1 | 0 (pencil draws) | 1.4 s | 200 ms + 180 ms each | cut | drawn |
| Seam allowance, grainlines, notches, labels | support | after the outlines | 0 opacity | 1 | 600 ms | 1.2 s | cut | visible |

## Footer
| Element | Role | Trigger | From | To | Duration | Reduced motion |
|---|---|---|---|---|---|---|
| Drop-alerts confirmation | support | valid submit | +8px, 0 opacity | rest | 480 ms | instant |
| Toast (all actions) | support | add to bag, pin, copy | clipped to the top edge, +18px | rest | 480 ms | instant |

## Page transitions
| From → To | Shared element | Behaviour | Duration | Fallback |
|---|---|---|---|---|
| Any → any (client navigation) | root | New page is cut in from the right (`clip-path` inset) while the old page drifts 6% left | 620 ms | Normal navigation (no View Transitions support, or reduced motion) |
| Exhibition cell → product page | product aperture | Planned for the product page build (shared element via `view-transition-name`) | 620 ms | Root transition |
