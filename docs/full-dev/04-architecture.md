# Architecture: DARZ

_Status: **draft** (2026-11-20). Awaiting Phase 4 approval._ · Build type: **e-commerce + admin web app** (hybrid).

## Objectives
| Objective | Measure |
|---|---|
| A buyer understands the concept in one visit | Demo walkthrough: home → collection → product → Studio → checkout in under 3 minutes |
| It sells like a real store | Product → bag → COD order works end-to-end; the order appears in the admin with stock decremented |
| The Style Studio gets used | ≥ 2 swaps per Studio session (event tracked); looks saved or shared |
| Fast on a mid-range Android on 4G | LCP < 2.5 s, CLS < 0.05, INP < 200 ms on product and home pages |
| The owner runs it without a developer | Every catalogue, price, stock, image, homepage and brand change can be made in the admin |
| Accessible | WCAG 2.2 AA; full keyboard use; reduced-motion respected |

## Journeys
### Young professional (mobile, evening)
Instagram/WhatsApp link → **product page** (material study convinces) → size guide → bag → "Complete the look" pulls them into the **Studio** → adds a trouser → **COD checkout** → confirmation page with a WhatsApp order summary → order-status page by link.

### Occasion buyer (Eid, wedding)
Home → **seasonal exhibition** ("Eid: Courtyard") → curated look → opens the look in the **Studio** → swaps the waistcoat colour (split compare) → **shares the look on WhatsApp** with family → returns via the link → buys the whole look in one tap.

### Fabric buyer
Shop → **Unstitched** → fabric product with a macro study and metres per suit → **"Suit it" preview** (swatch beside a kurta/shalwar silhouette) → quantity in suits → checkout.

### Store owner (Atelier admin)
Login → **dashboard** (today's orders, low stock) → confirms an order → marks it shipped (courier + tracking no.) → adds a new product with variants and images → places it on the homepage exhibition → it's live (cache revalidated).

### Buyer of the template (pitch)
Demo link → walkthrough above → `/atelier` with a demo login (read-only demo mode) → changes the brand name and colours in Settings to preview their own brand.

## Sitemap
```
/                                 Home: the exhibition entrance
├── /collections                  All exhibitions (seasonal + permanent)
│   └── /collections/[slug]       One exhibition wall
├── /shop                         Everything, with filters
│   └── /shop/[category]          casual · formal · traditional · shirts · trousers · unstitched · accessories
├── /product/[slug]               Product: aperture hero, material study, variants, complete the look
├── /studio                       Style Studio (composer, curated looks, shortlist)
│   └── /l/[code]                 Short link to a saved look → opens in the Studio
├── /bag                          Bag
├── /checkout                     Single-page checkout (COD; gateway slot)
├── /order/[id]?t=token           Confirmation + status (no account needed)
├── /account                      Orders, saved looks, addresses (optional login)
│   └── /login                    Email magic link
├── /construction                 The brand story: how a DARZ piece is made
├── /help/[topic]                 size-guide · delivery · returns · contact · care
├── /legal/[doc]                  privacy · terms
└── /atelier                      Admin (role: admin / staff / demo)
    ├── /atelier/products(/new|/[id])
    ├── /atelier/collections(/[id])
    ├── /atelier/looks(/[id])     Curated Studio looks
    ├── /atelier/orders(/[id])
    ├── /atelier/storefront       Homepage curation, announcement line
    └── /atelier/settings         Brand (name, logo, colours), shipping, payments, contact
```

## Navigation model (concept-led)
- **Bar:** brand mark (left), Studio (centre-right), Search, Bag count. It's slim and stays out of the photography. It hides on scroll down and returns on scroll up.
- **Menu = Pattern Sheet.** Opening it lays out the categories as **labelled pattern pieces** on a marble sheet (CASUAL / CUT 2 …), with the current exhibition as the largest piece. On mobile the pieces stack as cut strips. Plain text links stay underneath for accessibility and speed.
- **Footer:** help topics, the construction story, an exhibition index and a notch-marked newsletter field ("Drop alerts").

## Section breakdown

### Page: Home: *the entrance*
| Section | Purpose | Information | Emotion | Composition | Concept link | Motion idea |
|---|---|---|---|---|---|---|
| Entrance (hero) | Brand thesis in 5 s | Brand, one line, current exhibition name, "Enter" | Calm awe | One garment in a pattern-piece aperture on marble, big condensed type | Cut + light | Lattice light drifts; the aperture widens on scroll |
| Current exhibition | Push the main collection | Name, short curator line, 3–5 pieces with prices | Curiosity | Asymmetric exhibition wall | Jali cells | Cells assemble at notches as they enter |
| Material study | Prove quality | One fabric macro + 3 notation facts + link | Trust | Full-bleed macro, notation callouts | Pattern notation | Raking light sweeps the texture once |
| Style Studio teaser | Introduce the USP | One look assembling piece by piece; "Build yours" | Play | Flat-lay assembling in sequence | Assembly at notches | Pieces slide in and snap |
| Other exhibitions | Breadth | Casual / Formal / Traditional / Unstitched as "rooms" | Discovery | Horizontal row of differently lit apertures | Each room has its own light | Hover or drag reveals each room's light |
| Construction note | Brand story | 2 sentences on how pieces are made + link | Respect | Text beside a pattern piece | The tailor's pattern | Pattern lines draw in |
| Service strip | Remove doubt | COD, delivery time, exchange window | Safety | One quiet line, not icons-in-cards | Notation style | None |
| Footer | Navigation, alerts | Help, legal, social, drop alerts | — | Pattern-sheet grid | Notches | None |

### Page: Collection (exhibition)
| Section | Purpose | Information | Emotion | Composition | Concept link | Motion idea |
|---|---|---|---|---|---|---|
| Exhibition title | Set the room | Name, curator line, piece count | Arrival | Title over the room's own light colour | Each room lit differently | Light fades in |
| The wall | Browse | Products in cells: image, name, price, sizes in stock | Considered choice | Jali-module cells; a hero piece every ~7 | Lattice | Cells assemble; hover widens the aperture |
| Filter strip | Practical narrowing | Size, colour, price, type | Control | Sticky thin bar, opens as a sheet | Notation | Sheet slides like a pattern piece |
| Curated looks | Cross-sell | 2–3 looks from this collection → Studio | Inspiration | Flat-lay cards | Assembly | Pieces assemble on hover |

### Page: Product
| Section | Purpose | Information | Emotion | Composition | Concept link | Motion idea |
|---|---|---|---|---|---|---|
| Aperture hero | Desire | Hero image(s) in the product's aperture, gallery | Desire | Large aperture left, buy panel right (stacked on mobile) | Through the cut | Shared-element transition from the wall |
| Buy panel | Convert | Name, price, colourway swatches, sizes (out-of-stock shown), qty, Add to bag, delivery estimate, COD note | Confidence | Sticky on desktop; bottom bar on mobile | Notch on the CTA | Size select snaps; bag count ticks |
| Material Study | Trust | 3 headline facts + full spec, each term explained | Respect | Macro crop + notation callouts | Pattern notation | Callout lines draw to the texture |
| Construction details | Craft | Collar, cuffs, stitching close-ups with captions | Appreciation | Cropped detail strip | Pattern pieces | Horizontal drag on mobile |
| Fit & size | Reduce returns | Size table, model's size, fit note | Certainty | Table in a sheet | Measurement notation | Sheet slide |
| Complete the look | Cross-sell + Studio | Curated pairings; "Open in Studio" | Play | Mini flat-lay | Assembly | Snap |
| Unstitched only | Fabric buyers | Metres per suit, "Suit it" preview, calculator | Practical | Swatch + silhouette | Pattern | Silhouette fills with fabric |

### Page: Style Studio
| Section | Purpose | Information | Emotion | Composition | Concept link | Motion idea |
|---|---|---|---|---|---|---|
| Composer | Build outfits | Slots: top · layer · bottom · footwear · accessory; total price | Agency, play | Vertical flat-lay on a marble "cutting table" | Pieces assemble at notches | Swipe or arrow per slot; snap; lock icon |
| Compare | Choose colours | Split aperture with two colourways of one slot | Decisiveness | Two halves split by a dashed seam | The cut-line | Seam slides |
| Suggestions | Help | Curated looks + "pairs well with" rules from the admin | Guidance | Row of mini looks | Exhibition | Assemble on tap |
| Shortlist | Save | Saved looks (local; synced if logged in) | Ownership | Pattern-sheet thumbnails | Pattern sheet | — |
| Actions | Convert/share | Add whole look to bag, Share (WhatsApp/short link), Save | Momentum | Fixed bottom bar | Notch | — |

**Honesty rule:** the Studio composes **flat-lay product cut-outs**. No virtual try-on or body visualisation, and the copy never implies it.

### Bag / Checkout / Order
Bag: line items with variant, qty, remove, subtotal, delivery, free-delivery progress. Checkout: one page (contact, address with Pakistani city list, COD selected, optional note) → server validation → order placed. Confirmation: order number, summary, "Send to WhatsApp" summary, status timeline.

### Atelier (admin)
Dashboard (orders today, revenue, low stock), Products (list, search, bulk stock edit), Product editor (details, material spec, variants grid size × colour with stock and price, images with drag-reorder and focal point, Studio cut-out image and slot), Collections (order of products, room light colour, hero), Looks, Orders (status flow, courier, tracking, print-friendly slip), Storefront (homepage blocks), Settings (brand, shipping, payment toggles, contact).

## Functional components
Variant picker · size guide sheet · bag (persistent) · single-page checkout · order status page · search (Postgres full-text) · filters · Studio composer + share links + OG share image · auth (magic link) · admin CRUD with image upload · role-based access · demo-mode admin · settings-driven theming (brand name/colours) · analytics events (Studio swaps, add-to-bag, checkout).

## Stack (each with a one-line reason)
- **Framework:** Next.js (App Router, React Server Components). Mixes static pages, server actions and an admin in one deployable unit; pinned to the current stable version at setup.
- **Language:** TypeScript (strict). The data model has many variants and states.
- **Styling:** CSS Modules + design tokens as CSS custom properties. The bespoke aperture and notch system fits plain CSS better than utility classes, and brand colours become runtime settings.
- **Motion:** CSS + the **View Transitions API** for "through the cut" (with a fallback), and **Motion** (motion.dev) only for the Studio snap/drag. No GSAP or WebGL: there's no concept need, and it keeps the weight down.
- **Backend / data:** **Supabase**: Postgres, Auth, Storage (product images) and Row Level Security. Free tier, so no separate API server.
- **Auth:** Supabase Auth with email magic links; roles in a `profiles` table (customer, staff, admin, demo).
- **CMS:** the Atelier admin *is* the CMS. No third-party CMS, so a buyer gets one system.
- **Payments:** COD built in. A gateway adapter interface (Safepay/PayFast) is stubbed and switched on in Settings.
- **Images:** Supabase Storage + `next/image` (AVIF/WebP, sizes per breakpoint, blur placeholders).
- **Hosting:** **Vercel** (Hobby), connected to the GitHub repo.
- **Testing:** Vitest (logic) + Playwright (journeys, screenshots, a11y with axe).

## Data model
| Entity | Key fields | Relations | Access rules (RLS) |
|---|---|---|---|
| `settings` (single row) | brand_name, logo_url, colors jsonb, contact, shipping (flat_rate, free_over), payments jsonb, announcement | — | read: public · write: admin |
| `profiles` | id (= auth user), role (customer/staff/admin/demo), name, phone | 1–1 auth.users | read/update own · admin reads all |
| `categories` | slug, name, sort | 1–n products | read public · write admin |
| `collections` | slug, title, curator_line, room_color, hero_image, season, is_published, sort | n–n products (`collection_products` with position, is_hero) | read published · write admin |
| `products` | slug, name, category_id, description, base_price, material jsonb (weave, gsm, composition, grain, season, care), fit_note, studio_slot, studio_image, is_published, search tsvector | n variants, n media | read published · write admin/staff |
| `product_media` | product_id, url, alt, focal_x/y, kind (hero/detail/macro), sort | — | same as product |
| `variants` | product_id, sku, size, color_name, color_swatch_url, price (nullable override), stock | n order_items | read public (stock as available yes/no + low flag) · write admin/staff |
| `looks` | code (short), title, items jsonb [variant_id per slot], is_curated, created_by (nullable), created_at | — | curated: read public · user looks: insert public via action, read by code |
| `orders` | number, status (pending/confirmed/shipped/delivered/cancelled), customer jsonb, address jsonb, totals, payment_method, courier, tracking, access_token, user_id (nullable) | n order_items | insert only via `place_order()` RPC · read own (user_id) or by token via server · admin/staff all |
| `order_items` | order_id, variant_id, name_snapshot, size, color, unit_price, qty | — | with order |
| `events` | name, payload, created_at | — | insert public (rate-limited) · read admin |

**`place_order()`** is a Postgres function (security definer). In one transaction it re-prices from the database, checks and decrements stock with row locks, creates the order and items, and returns the order id and token. The client cannot set prices.

## API surface (server actions unless noted)
| Route / action | Input | Output | Errors | Auth |
|---|---|---|---|---|
| `addToBag` / bag ops | variant_id, qty | bag (cookie) | out_of_stock, invalid_variant | public |
| `placeOrder` | contact, address, note, bag | {orderId, token} | validation (field map), stock_changed (lines), rate_limited | public |
| `saveLook` | items per slot | {code} | invalid_items | public (rate-limited) |
| `GET /l/[code]` | code | redirect → /studio?look= | 404 | public |
| `GET /api/og/look/[code]` | code | PNG share card (pattern sheet) | 404 | public |
| `search` (RSC) | q, filters | products | — | public |
| Admin `upsertProduct`, `upsertVariants`, `uploadMedia`, `upsertCollection`, `upsertLook`, `updateOrderStatus`, `updateSettings` | typed payloads (zod) | entity | validation, forbidden | admin/staff; demo → read-only |
| `trackEvent` | name, payload | 204 | — | public (sampled) |

**Caching:** storefront pages are statically rendered and revalidated by tag (`products`, `collection:[slug]`, `settings`) whenever the admin saves. Stock is read fresh on the product page and at checkout.

## Env var names
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server only), `NEXT_PUBLIC_SITE_URL`, `DEMO_MODE` (true/false), `PAYMENT_GATEWAY_KEY` (later), `RESEND_API_KEY` (optional email).

## Edge cases
- **Stock:** sold-out variants are visible but disabled; stock changes between bag and checkout → per-line message and update; last-unit race → handled by the RPC lock.
- **Empty states:** an empty collection, no search results (suggest exhibitions), an empty bag, an empty shortlist, a Studio slot with no products.
- **Slow network / no JS:** product, collection and checkout pages render server-side and work without JS (forms post). The Studio needs JS and shows a static curated look otherwise.
- **Reduced motion:** no drifting light, no assembly; instant state changes.
- **Long content:** long product names and Urdu names wrap; prices formatted `Rs 4,500`; addresses with long Pakistani formats.
- **Deep links:** `/order/[id]` without a valid token → "check your link" (no data leak); `/atelier` when logged out → login; a demo user tries to write → friendly read-only notice.
- **Images missing:** aperture falls back to a fabric texture placeholder; admin warns about products without a Studio cut-out.
- **Abuse:** rate-limit `placeOrder` and `saveLook`; COD orders over a threshold flagged for phone confirmation.
- **i18n:** English now; strings centralised so Urdu (RTL) can be added later.

## Feasibility flags
1. **Photography is the make-or-break.** Demo plan: licensed editorial menswear photography for heroes, my own generated fabric textures for material studies, and **flat-lay cut-out images** for the Studio, which are the hardest to source free. Proposal: draw a consistent set of stylised flat-lay garment illustrations (SVG) for the demo Studio, replaceable with real cut-outs from the admin.
2. **Tooling reach (checked):** npm works from this session. Supabase and Vercel are connected as tools, so the schema and deploy can be done from here. Outside websites are blocked, so live visual checks of references need your screenshots or an allowed-hosts change.
3. **Free tiers:** Supabase Free pauses after a week of inactivity; fine for a demo, noted for the buyer.

## Build order (detail in `plan.md`)
1. Setup & tokens
2. Layout shell & navigation (bar, pattern-sheet menu, footer)
3. Data layer: Supabase schema, RLS, `place_order()`, seed catalogue
4. Sections: home → collection → product → bag/checkout → order status
5. Style Studio
6. Atelier admin
7. Integrations: OG share images, analytics events, gateway stub
8. Refinement & mobile → QA → deploy
