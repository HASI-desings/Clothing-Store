# QA Report: DARZ homepage

_Run: 2026-11-20 · Build: Next.js 16.4.6 production (`next build` + `next start`) · Browser: Chromium (Playwright 1.65)_

## Summary
**Zero open issues.** 40 automated tests pass on desktop (1440 × 900) and mobile (Pixel 7). Lint and type checks are clean. Lighthouse (mobile): Performance 96, Accessibility 100, Best Practices 100, SEO 100.

## Automated tests (`npm run test:e2e`, `tests/home.spec.ts`)
| Area | What's checked | Result |
|---|---|---|
| Rendering | All sections render; no console errors or page errors while scrolling the full page | Pass ×2 |
| Structure | One h1, header/main/footer landmarks, skip link is the first tab stop, ClothingStore JSON-LD | Pass ×2 |
| Layout | No horizontal scroll at 390, 768 and 1440 px | Pass ×2 |
| Assemble motion | Every `[data-assemble]` element ends visible after scrolling | Pass ×2 |
| Menu | Opens as a modal dialog, closes with Escape, focus returns to the Menu button | Pass ×2 |
| Navigation | Menu link → page renders → back to home; scroll lock released after navigating | Pass ×2 |
| Quick look | Size required (hint shown), colour bias-cut switch, sold-out size disabled, arrow-key size pull, add to bag, toast, bag count, focus returns | Pass ×2 |
| Stock | Low-stock message when ≤ 2 left | Pass ×2 |
| Bag | Survives a reload (localStorage) | Pass ×2 |
| Style Studio | Swap, lock (arrows disabled), shuffle keeps locked piece, pin to shortlist, WhatsApp link carries the look code, add whole look to bag | Pass ×2 |
| Shared looks | `?look=2-0-1-2` rebuilds the exact outfit; malformed codes fall back safely with no errors | Pass ×4 |
| Rooms | Arrow buttons scroll the row; card links work | Pass ×2 |
| Footer form | Invalid email → alert + `aria-invalid`; valid → confirmation | Pass ×2 |
| Accessibility | axe (WCAG 2.0/2.1/2.2 A + AA) on the full page in light and dark, plus the open quick look and menu | Pass ×6 |
| Reduced motion | All content visible immediately | Pass ×2 |
| No JavaScript | Page complete and readable | Pass ×2 |
| SEO files | robots.txt, sitemap.xml and icon are served as real files | Pass ×2 |

## Issues found and fixed during testing
| # | Issue | Fix |
|---|---|---|
| 1 | Hero jali light read as blurred polka dots and hid the garment | Redrew the lattice as crisp, skewed eight-point stars on a shaded courtyard wall, behind the kurta |
| 2 | Empty corner in the exhibition wall at 1440 px | Added a "curated look" note cell linking to the Studio |
| 3 | Construction drawing labels overlapped | Shortened the labels |
| 4 | Rooms arrows showed on phones (a broader selector overrode the hide rule) | Scoped the rule to the title block |
| 5 | Room cards off-screen to the right never assembled on mobile | The whole row now assembles when the track enters view |
| 6 | "Select a size" button exposed as disabled to assistive tech while meant to be clickable | Removed `aria-disabled`; the state is styled via `data-ready` |
| 7 | axe: accessible name of the centrepiece cell didn't include its visible "Centrepiece" label | Name now starts with "Centrepiece:" |
| 8 | Smooth scrolling also applied to scripted scrolls | Added `data-scroll-behavior="smooth"` so Next.js manages it during navigation |
| 9 | `/robots.txt` fell through to the placeholder page (SEO 91) | Added `robots.ts`, `sitemap.ts` and `icon.svg` (SEO 100) |
| 10 | Hero headline and lede started hidden, delaying the largest paint | They now animate from a visible state; the font was subset (90 → 71 KB) |
| 11 | Lint: `<a>` used for an internal link in the quick look | Switched to the transition link |

## Lighthouse (mobile, simulated slow 4G)
| Metric | Value |
|---|---|
| Performance / Accessibility / Best Practices / SEO | 96 / 100 / 100 / 100 |
| First Contentful Paint | 1.1 s (observed 0.23 s) |
| Largest Contentful Paint | 2.6 s simulated · **0.23 s observed** |
| Total Blocking Time | 70 ms |
| Cumulative Layout Shift | 0 |

Note: the simulated LCP is dominated by Lighthouse's modelling of the font and JS dependency chain on a throttled CPU. The observed LCP equals the first paint. On Vercel's CDN, time to first byte drops further.

## Visual checks (screenshots reviewed)
Desktop 1440 light, tablet 768 dark, mobile 390 light and dark: hero, exhibition wall, quick look (bias-cut colour + pulled size), pattern-sheet menu, material study, Studio, rooms, construction note, footer.

## Known limits (by design, not defects)
- Only the homepage is built. Other links open a clearly labelled "still on the cutting table" page.
- Products, prices and policies are demo content (stated in the footer). Garments are illustrated flat-lays, not photos.
- The bag and shortlist are stored in the browser until the Supabase backend is built (Phase 9 plan).
