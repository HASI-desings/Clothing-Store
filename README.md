# Clothing Store

A contemporary men's clothing label. *"Style isn't something you put on. It's something you construct."*

Built with the `full-dev` workflow. Project memory lives in [`docs/full-dev/`](docs/full-dev/).

| Phase | Status |
|---|---|
| 1. Discovery | Approved: [`01-identity.md`](docs/full-dev/01-identity.md) |
| 2. Concept | Approved (Cut Light, DARZ): [`02-concept.md`](docs/full-dev/02-concept.md) |
| 3. Inspiration | Approved: [`03-inspiration.md`](docs/full-dev/03-inspiration.md) |
| 4. Architecture | Approved: [`04-architecture.md`](docs/full-dev/04-architecture.md) + [`plan.md`](docs/full-dev/plan.md) |
| 5. Design system | Approved: [`05-design-system.md`](docs/full-dev/05-design-system.md), [`tokens.css`](styles/tokens.css), [`preview`](design/design-system.html) |
| 6. Visual design | Skipped at your request (homepage built directly) |
| 7. Motion | Implemented: [`07-motion-spec.md`](docs/full-dev/07-motion-spec.md) |
| QA | Homepage tested: [`qa-report.md`](docs/full-dev/qa-report.md) (40/40 tests, Lighthouse 96/100/100/100) |
| Next | Product page, Studio page, Supabase backend, Atelier admin, deploy |

## Run it

```bash
npm install
npm run build && npm start      # http://localhost:3000
npm run test:e2e                # Playwright + axe (starts its own server on :3100)
```

## Code map
- `app/`: layout (fonts, providers), homepage, placeholder route, robots/sitemap/icon
- `components/`: Hero, Exhibition + QuickView, MaterialStudy, StudioTeaser, Rooms, ConstructionNote, Bar + PatternSheet, Footer, and shared pieces (Garment illustrations, LatticeLight, SizeSelector "pull", BiasImage "bias cut", TransitionLink)
- `lib/catalogue.ts`: demo catalogue (moves to Supabase later)
- `styles/tokens.css`: design tokens (single source of truth)
- `tests/`: end-to-end and accessibility tests
