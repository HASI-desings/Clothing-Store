# Build Plan: DARZ

_Starts after Phases 5–8 are approved (design system, visual design, motion, copy). Each task is small and checked before the next one starts._

Legend: **Files** · **Done when** · **Verify**

## 0. Setup
- **T0.1 Scaffold.** Next.js 16 (App Router, TS strict), ESLint, Prettier, Vitest, Playwright. **Files:** root config, `app/`. **Done when:** `npm run build` passes. **Verify:** build log.
- **T0.2 Tokens.** `styles/tokens.css` from the Phase 5 design system; fonts via `next/font` (Archivo variable, Martian Mono). **Done when:** the token preview page renders both themes. **Verify:** screenshot vs the design-system board.
- **T0.3 Supabase project + env.** Create the project, set env vars locally and on Vercel (names in `04-architecture.md`). **Verify:** a health check route reads `settings`.

## 1. Data layer
- **T1.1 Schema migration.** Tables, enums, indexes, full-text search. **Files:** `supabase/migrations/001_schema.sql`. **Verify:** `list_tables` matches the data model.
- **T1.2 RLS policies.** **Files:** `002_rls.sql`. **Verify:** SQL tests as anon/customer/admin/demo (can't read unpublished; can't write; demo is read-only); Supabase security advisors are clean.
- **T1.3 `place_order()` RPC.** Re-pricing, stock lock and decrement, token. **Files:** `003_place_order.sql`. **Verify:** SQL tests including a concurrent last-unit race.
- **T1.4 Seed catalogue.** Around 36 products across 7 categories, variants, 5 collections, 6 curated looks, settings. **Files:** `supabase/seed.sql`, `scripts/seed-media.ts`. **Verify:** counts plus a spot-check in the admin.
- **T1.5 Typed client.** Generated types plus `lib/db/*` query functions. **Verify:** `tsc` passes.

## 2. Shell
- **T2.1 Layout + bar** (hide on scroll, bag count). **Verify:** screenshots at 390 and 1440 px; keyboard nav.
- **T2.2 Pattern-sheet menu** (with an accessible list fallback). **Verify:** focus trap, Escape closes, reduced motion.
- **T2.3 Footer + drop-alerts field.** **Verify:** form validation states.

## 3. Storefront sections (each compared with its Phase 6 design and Phase 7 motion spec)
- **T3.1 Aperture component** (SVG clipPath masks, lattice light layer, focal point). **Verify:** a visual test on 3 images; motion off when reduced.
- **T3.2 Home**, section by section: entrance → exhibition → material study → Studio teaser → rooms → construction note → service strip.
- **T3.3 Collection wall** + filter sheet + curated looks.
- **T3.4 Shop/category** with search and filters.
- **T3.5 Product page**: aperture hero, buy panel, Material Study, details, fit sheet, complete the look, unstitched calculator.
- **T3.6 "Through the cut" view transition**, wall → product (with fallback).
- **T3.7 Bag + checkout + order status** (works without JS). **Verify:** a Playwright journey to an order, which appears in the database with stock decremented.

## 4. Style Studio
- **T4.1 Composer state** (slots, lock, shuffle; URL encoding). **Verify:** unit tests.
- **T4.2 Composer UI** (swipe/arrow per slot, notch snap, total price). **Verify:** a touch test on mobile emulation; keyboard support.
- **T4.3 Compare split view.**
- **T4.4 Save / short link / shortlist** (`saveLook`, `/l/[code]`). **Verify:** the link rebuilds the look exactly.
- **T4.5 Share card** (`/api/og/look/[code]`) + WhatsApp share. **Verify:** PNG renders.
- **T4.6 Add whole look to bag.**

## 5. Atelier admin
- **T5.1 Auth + roles + layout** (magic link; demo read-only banner).
- **T5.2 Products list + editor** (material spec, variants grid, media upload with reorder and focal point, Studio cut-out).
- **T5.3 Collections + looks editors.**
- **T5.4 Orders** (status flow, courier/tracking, packing slip view).
- **T5.5 Storefront curation + Settings** (brand name, logo, colours → live theme). **Verify:** changing the brand in Settings rebrands the storefront after revalidation.
- **T5.6 Dashboard** (orders today, revenue, low stock).

## 6. Integrations
- **T6.1 Analytics events** (Studio swaps, add to bag, checkout steps), with a simple chart in the dashboard.
- **T6.2 Payment gateway adapter** (interface + Safepay stub, off by default).
- **T6.3 SEO:** metadata, Product/Offer JSON-LD, sitemap, robots, OG images.

## 7. Refinement, QA, deploy
- **T7.1 Mobile refinement pass** (Phase 10). **T7.2 QA** (Phase 11): axe, Lighthouse, journeys, security (RLS, rate limits). **T7.3 Vercel deploy** + production verification (Phase 12). **T7.4 Handover** (Phase 13).

## Branching
Docs live on `main`. Code is built on a feature branch and merged by pull request once each block passes.
