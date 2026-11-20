# Brand Identity & Creative Requirements: Contemporary Men's Clothing Store

_Status: **approved** (2026-11-20)._ · Items marked **[proposal]** are my inferences, not your decisions.

## What it is
A men's clothing label sold online, with a curated range: casual, formal, traditional (kurta, shalwar kameez, waistcoat), shirts and trousers, unstitched fabric, seasonal drops, plus accessories as an optional extra. It is two products in one:
1. **The storefront.** Customers explore collections like exhibitions, study the fabric and construction, choose a size and colour, and order.
2. **The atelier (admin).** The owner manages products, collections, prices, stock, images, orders and the homepage.

**Decision (you, 2026-11-20): a concept build for now, made to the standard of a real launch, so it can be sold to a buyer** (a menswear brand owner, or an investor/partner).

What that means for the build:
- **It must demo like a real store.** A realistic seeded catalogue, working checkout (COD), and a working admin with a demo login, so a buyer can click through everything in a pitch.
- **It must be rebrandable.** The brand name, logo, colours and contact details are settings, not hard-coded, so a buyer can make it theirs without a rebuild.
- **The concept is the product being sold.** The architecture-of-clothing idea and the Style Studio are the parts a buyer can't get from a Shopify theme. They get the most attention.

Business model of the demo brand **[proposal]**: direct-to-consumer, made-to-stock, Cash on Delivery by default, with online payment shown as ready to connect.

## Core creative statement
> "Style isn't something you put on. It's something you construct."

Clothing as architecture: **fabric is the material, tailoring is the structure, personal style is the final expression.**

## Audience **[proposal]**
| Segment | Who exactly | Context & device | What they need from the site |
|---|---|---|---|
| The young professional | Ages 22–35 in Lahore, Karachi and Islamabad. First or second job, dresses for the office and for events | Mostly mobile, browsing in the evening, buys at month start | Confidence the fit and fabric are right without touching them. Clear pricing. Easy COD |
| The occasion buyer | Ages 25–45, buying for Eid, weddings and family events | Mobile; often shares links on WhatsApp before buying | Complete looks (kurta + waistcoat + shoes), delivery-date certainty |
| The fabric buyer | Ages 30–55, has their own tailor | Mobile and desktop | Real fabric detail: weave, weight, composition, metres per suit |
| The style-curious student | Ages 18–24, aspirational, on a budget | Mobile only | The feeling of premium at a price they can reach. The Style Studio to plan outfits |

## Differentiation
Local men's brands mostly share one look: a full-bleed model banner, a "SALE UP TO 50%" strip, then an endless product grid. None of them **explains the construction**: why this collar, why this weave, how these pieces work together. Our brand sells *understanding* along with the clothing:
- Material studies: macro fabric detail, weave, weight (GSM), composition, and how it drapes.
- Collections presented as exhibitions, each with its own environment.
- **The Style Studio**: build an outfit piece by piece, compare colourways, save combinations. It's honest about what it is: a flat-lay or layered composer, not a fake virtual try-on.

## Personality
| Is | Is not |
|---|---|
| Constructed: precise, deliberate | Rigid, cold, corporate |
| Confident | Loud, arrogant, "alpha" |
| Contemporary | Trend-chasing, disposable |
| Considered: premium in thought | Pretending to be luxury (no fake "maison" language) |
| Warm and grounded in its place | Generic "global minimal" with no roots |

## Emotions & impression
- **Visitors should feel:** like they've walked into a quiet, well-lit gallery where every object was placed on purpose, and that they're smart for being there.
- **In 5 seconds they should understand:** this is a menswear label, it treats clothing as craft, and it's within reach.

## Actions
- **Primary:** add a product to the bag, then place the order.
- **Secondary:** build and save an outfit in the Style Studio; explore a collection; share a look on WhatsApp; join drop alerts.

## Ambitions **[proposal]** (from your stated vision)
- **Short term:** launch the first collection in Pakistan with a site that looks like nothing else in local menswear.
- **Long term:** the first chapter of a multi-category lifestyle brand (womenswear, cosmetics, accessories). The architecture and admin must allow new categories without a redesign.

## Requirements (MoSCoW)
- **Must:**
  - exhibition-style homepage and collection pages
  - product pages with a material study, size and colour selection, and a size guide
  - bag and checkout with COD
  - order confirmation by email or WhatsApp
  - admin: products, variants (size × colour), stock, images, collections, prices, orders, homepage curation
  - mobile-first, fast, accessible, SEO and product schema
- **Should:**
  - the Style Studio (compose outfits, compare colours, curated suggestions, save and shortlist)
  - online payment
  - customer accounts and order history
  - wishlist
  - unstitched-fabric calculator (metres per garment)
- **Could:**
  - Urdu language toggle
  - lookbook/journal stories
  - drop countdowns
  - share a look as an image
  - low-stock alerts in the admin
- **Won't (now):**
  - realistic virtual try-on
  - AI body visualisation
  - a marketplace for other sellers
  - native apps

## Constraints **[proposal]**
- Budget: student budget, so use free tiers (Vercel Hobby, Supabase Free).
- Stack direction: Next.js + Supabase (database, auth, storage for images) + Vercel.
- Maintainer: you, plus whoever runs the admin.
- Photography: there is no real shoot (concept build). **[proposal]** Use free-licence editorial menswear photography (Unsplash/Pexels, credited, swappable from the admin) for the demo, plus close-up fabric textures I generate myself for the material studies. Still the biggest visual risk, and Phase 3 will judge it.
- Legal: privacy policy, returns/exchange policy, payment-gateway terms.

## Competitors to review (Phase 3 verifies these live)
| Competitor | What they communicate | Visual cliché |
|---|---|---|
| J. (Junaid Jamshed) | Heritage, traditional/Eid | Model banner, festive gold, dense grid |
| Edenrobe / Charcoal / Cougar | Smart-casual, office-ready | Lifestyle banner, sale strips, template Shopify layout |
| Outfitters / Breakout | Youth, trend, value | Loud sale typography, campaign carousels |
| Gul Ahmed / Bonanza Satrangi (menswear, unstitched) | Fabric value, seasonal lawn/wash-and-wear | Fabric swatches on white, price-first grid |
| Global reference: COS, Arket, Uniqlo U | Material honesty, architectural calm | (Positive reference: the bar to beat locally) |

## Industry clichés to avoid
- A hero with a model in front of a wall, plus "NEW ARRIVALS" and a "SHOP NOW" pill button
- Rotating sale banners and red "–50%" badges everywhere
- An endless uniform 4-column product grid on white
- Literal architecture: blueprint backgrounds, building photos, CAD-style fonts used as decoration
- Gold-and-black "luxury" styling and script fonts
- Generic AI-site tells (see `anti-generic.md`)

## Anti-goals
- It looks beautiful but people can't find a size, the price or delivery info quickly. **Failure.**
- It's heavy and slow on a mid-range Android phone on 4G. **Failure.**
- The Style Studio feels like a gimmick that nobody uses twice. **Failure.**
- The owner needs a developer to change a price or the homepage. **Failure.**

## Defaults I'm proposing (the concept build answers the remaining questions)
| Question | Default **[proposal]** |
|---|---|
| Brand name | I propose a shortlist in Phase 2, derived from the concept. It is a setting, so a buyer can rename it |
| Prices | Demo prices in PKR, mid-premium: shirts 3,500–6,500 · trousers 4,000–7,000 · kurta sets 6,000–14,000 · formal 18,000–45,000 · unstitched 3,000–9,000 per suit |
| Payments | COD working end-to-end. Online gateway shown as an integration slot (Safepay/PayFast), not live |
| Delivery | Nationwide flat rate plus a free-delivery threshold, set from the admin |
| Language | English at launch; the structure is ready for Urdu |
| Deadline | None given. Quality over speed |

## Open questions
- None blocking. Anything above can be changed at the Phase 1 gate.
