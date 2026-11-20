# Inspiration & Reference Analysis: DARZ · Cut Light

_Status: **approved** (2026-11-20)._

> **Method note.** This session's network policy blocks direct visits to outside sites (the browser got `ERR_TUNNEL_CONNECTION_FAILED`; fetches failed DNS). Research ran through web search. References are described from search results plus prior knowledge, **not from live screenshots**. Before Phase 6 (hero explorations), the top references should be checked live: either the environment allows these hosts, or you send screenshots or screen recordings.

## Research brief
- **Industry terms / clichés:** men's clothing store, kurta, unstitched, suiting. Avoid: model-on-wall hero, sale strips, 4-column white grid, gold-on-black "luxury", blueprint decoration.
- **Mood terms:** constructed, confident, contemporary, considered, grounded.
- **Concept terms:** cut-out, aperture, lattice, light through stone, shadow play, pattern notation, notch, assembly, material specification.
- **Needed pieces:** nav and menu, hero, collection "rooms", product page, material study, Style Studio, bag/checkout, admin.
- **Interaction ambitions:** light revealing content, shared-element transition into the product page, mix-and-match composer, width-axis type.
- **Light / dark:** light-leaning (marble), with dark "night rooms" for selected collections.

## Searches run
| Source | Queries | Useful finds |
|---|---|---|
| Awwwards | menswear/tailoring sites; fashion ecommerce SOTD; outfit builders; shared-element transitions; exhibition/museum sites | Lafaurie Paris, Permian, Bonds Mash Up, Art Here 2025 (Richard Mille), Outfit (++hellohello), Max Mara Untamed Heroine |
| Muzli / roundups | fashion ecommerce inspiration (Muzli itself didn't surface) | General roundups only (Net-a-Porter, Everlane), weak |
| Case studies | outfit builders, Lemaire digital flagship | Jamie Kay Outfit Builder, That Original (Beaucoup), AKQA × Lemaire |
| Material world | Kvadrat textile product pages | Specification and explained-terms model |
| Competitors | Pakistani menswear 2025–26 | J., Edenrobe, Charcoal, Cougar, Sapphire, Gul Ahmed, Bonanza Satrangi, Diners |
| Not reachable | Pinterest, MaxiBestOf, Supahero, Recent.design, Dark Mode Design | Network-blocked; pending live check |

## Selected references (6, one element each)

### 1. Art Here 2025: Richard Mille × Louvre Abu Dhabi ([Awwwards](https://www.awwwards.com/sites/art-here-2025-richard-mille)) · **Hero / light**
- **What we like:** a digital exhibition on the theme "Shadows", where light and darkness reveal the artworks (Awwwards SOTD, 7.26).
- **What we learn:** light can be the *reveal mechanism*, not decoration.
- **Why it suits Cut Light:** the jali is a machine for shadow. Our hero is literally "light through a cut".
- **Reinterpretation:** no 3D journey. One 2D aperture with soft lattice light drifting over the garment; the cut widens on scroll to reveal the full look. Cheap to render: SVG/CSS, no WebGL.
- **Watch-outs:** immersive 3D sites are heavy on mid-range Android. We stay 2D.

### 2. Lemaire digital flagship (AKQA, [case study](https://www.akqa.com/work/lemaire/digital-flagship/)) · **Collection listing / restraint**
- **What we like:** quiet, spacious product presentation built on an extensible design system. The agency reports higher conversion (self-reported).
- **What we learn:** calm, slow product rhythm can still sell.
- **Why it suits Cut Light:** "minimal but not empty"; negative space is the marble around the cut.
- **Reinterpretation:** collection pages as **exhibition walls**: jali-module cells of different sizes, one "hero piece" per wall, products in apertures. Not a uniform grid.
- **Watch-outs:** quiet sites can hide price and size. Ours shows price and available sizes on every cell.

### 3. Kvadrat textile product pages ([example](https://www.kvadrat.dk/en/products/curtains/600006-viking)) · **Product detail / material study**
- **What we like:** textiles are specified like building materials: technical specs, and plain explanations of terms (lightfastness, airflow resistance).
- **What we learn:** explaining a material builds trust and sounds premium without saying "premium".
- **Why it suits Cut Light:** "fabric is the material". The tailor's notation becomes a real spec sheet.
- **Reinterpretation:** a **Material Study** block on every product: weave, GSM, composition, grain, season, care. Each term has a one-line tooltip ("GSM: grams per square metre; higher is heavier"). Laid out as pattern notation, next to a macro crop.
- **Watch-outs:** too technical for the casual buyer. Keep three headline facts and put the rest behind "Full specification".

### 4. Bonds Mash Up ([Awwwards](https://www.awwwards.com/sites/bonds-mash-up)) · **Style Studio: play**
- **What we like:** mixing, matching and clashing hundreds of combinations is made fun (SOTD, 7.55).
- **What we learn:** a composer is used when changing one piece is instant and satisfying.
- **Why it suits Cut Light:** "style is constructed" becomes the user's own action.
- **Reinterpretation:** no Three.js. Flat-lay pieces swap per **slot** (top / layer / bottom / shoes / accessory) with a notch-snap motion. Swiping a slot cycles through pieces; a "lock" keeps a piece fixed while the others shuffle.
- **Watch-outs:** WebGL weight and battery drain, which is why we use 2D.

### 5. Jamie Kay Outfit Builder ([case study](https://www.moustacherepublic.com/our-work/jamie-kay-outfit-builder)) · **Style Studio: save & share**
- **What we like:** a three-step flat-lay canvas, with the outfit's state stored in the URL, so a shared link rebuilds the exact look.
- **What we learn:** saving without an account, and sharing as a link.
- **Why it suits DARZ:** the occasion buyer shares on WhatsApp before buying.
- **Reinterpretation:** every look has a short URL (`/studio?look=…`). "Send on WhatsApp" opens with that link, and the preview image is generated as a pattern-sheet card. Shortlist in local storage; synced if logged in.
- **Watch-outs:** long URLs get ugly, so use short encoded IDs.

### 6. That Original (Beaucoup Studio, [project](https://beaucoup.studio/en/projects/that-original)) · **Style Studio: fabric choice**
- **What we like:** a configurator in a fitting-room setting where you pick top, sleeves, pants **and fabric** (Awwwards HM).
- **What we learn:** fabric is a first-class choice, not a hidden variant.
- **Why it suits Cut Light:** material first, then structure.
- **Reinterpretation:** in the Studio, each piece shows its **colourways as fabric swatches** (macro crops), and "Compare" puts two colourways side by side in split apertures. Unstitched fabric gets a "suit it" preview: swatch plus a suggested kurta or shalwar silhouette.
- **Watch-outs:** a fake 3D garment would over-promise. We show real product photos only.

## Elements taken from no reference (ours from the concept)
- **Navigation:** the menu opens as a *pattern sheet*: categories laid out as labelled pattern pieces.
- **Page transition:** a shared-element "through the cut" (the product aperture expands into the product hero), using the View Transitions API with a fallback.

## Material & object references (to collect live in Phase 6)
| Reference | Where to find | Property we take |
|---|---|---|
| Jali, Jahangir's Tomb / Lahore Fort | Photography (Pinterest blocked; own shoot or licensed) | Star lattice geometry; raking light |
| Tailor's paper patterns, chalk marks | Studio photography | Notches, grainline, dashed cut-lines |
| Khaddar, twill, karandi, wash & wear macro | Product shoot | Texture crops for material studies |
| Marble and sandstone surfaces | Licensed stock | Matte ground, warmth inside photos only |

## Competitor baseline (local)
J., Edenrobe, Charcoal, Cougar, Sapphire, Gul Ahmed, Bonanza Satrangi, Diners. Search results confirm the pattern: wide ranges (suiting to ethnic), nationwide shipping, standing discount messaging ("up to 20% off"). None leads with material understanding or outfit construction. **Live visual audit pending (network-blocked).**

## Conventional baseline (what we're departing from)
The bundled design engine's default for "menswear fashion ecommerce":
- a "Feature-Rich Showcase" pattern (hero, 4–6 feature cards, social proof, CTA)
- a "Vibrant & Block-based" style with green primary + orange urgency accent
- **Cormorant + Montserrat**, scroll-snap, 200–300 ms colour-shift hovers

**DARZ departs on every axis:**
- apertures instead of cards
- marble/graphite/chalk instead of green/orange
- Archivo's width axis instead of the fashion-default serif pairing
- assembly motion instead of colour-shift hovers
- no urgency colour at all
