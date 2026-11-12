# 03 · Site architecture, SEO & content strategy

## Information architecture & page purpose

| URL | Purpose in the funnel | Primary search intent (unverified volumes) |
|---|---|---|
| `/` | Brand + self-qualification (price ledger) + routes to services | connecticut wedding planner; ct wedding planner |
| `/services` | Compare the three services, add-ons | wedding planning services connecticut |
| `/services/full-service-wedding-planning` | High-intent landing page | full service wedding planner ct; luxury wedding planner connecticut |
| `/services/partial-wedding-planning` | High-intent landing page | partial wedding planning ct |
| `/services/wedding-management` | High-intent landing page | month of wedding coordinator ct; day of coordinator connecticut; wedding coordinator ct |
| `/packages-and-pricing` | Comparison, fit guide, terms, objections | wedding planner cost ct; wedding planner packages |
| `/approach` | Trust: process, documents, vetting, budget, weather | — (supports conversion) |
| `/about` | Trust: who we are, honest newness, company details | — |
| `/locations` + 5 regions | Local relevance and ranking | fairfield county / greenwich / westport wedding planner; connecticut shoreline wedding planner; new haven wedding planner; hartford wedding coordinator; litchfield county wedding planner |
| `/journal` + 4 guides | Decision-stage content that links to services | how much does a wedding planner cost in ct; when to hire a wedding planner; full service vs partial vs day of; wedding guest shuttle |
| `/contact` | Conversion | — |
| `/privacy`, `/terms` | Compliance | — |

Redirects (next.config.ts): `/pricing`, `/inquire`, `/services/month-of-coordination`, `/services/day-of-coordination`, `/blog/*`.

**Keyword volumes were not measured** (no keyword tool access in this environment). Before buying ads, pull volumes/CPCs from Google Keyword Planner for the terms above and adjust page titles if a variant clearly dominates.

## Technical SEO implemented
- Unique `<title>` (≤65 chars) and meta description (≤160 chars) per page — enforced by an automated test.
- Canonical URLs, Open Graph + Twitter cards, branded OG image (`public/og.jpg`).
- One `h1` per page (tested), semantic sections and heading hierarchy, descriptive alt text (tested).
- JSON-LD: `ProfessionalService` (areaServed counties, offer catalog with starting prices), `WebSite`, `Service` per service page, `BreadcrumbList`, `FAQPage`, `Article`. **No ratings, reviews, street address or hours** — none exist yet.
- `sitemap.xml` and `robots.txt` generated from content config; `NEXT_PUBLIC_NOINDEX=true` blocks indexing for staging.
- Static generation for every page; AVIF/WebP responsive images; self-hosted subset fonts; strict security headers.

## Local SEO plan (service-area business)
- **Google Business Profile:** create as a *service-area business* with the address hidden — Sound & Stone has no storefront. Google only allows a visible address where you serve customers in person with staffed hours; a home or virtual office must be hidden. Service areas: the five regions/counties. Primary category: *Wedding planner*. Use the real business phone. Never create listings for "offices" that don't exist.
- **NAP consistency:** once a phone number exists, use the identical name/phone/URL on GBP, The Knot, WeddingWire, Zola, Instagram, Pinterest.
- **Reviews:** ask every completed couple for a Google review (and The Knot/WeddingWire). Add `aggregateRating` schema only when real, on-site reviews exist.
- **Location pages:** add new regions (Rhode Island, the Berkshires, Cape Cod) only with genuinely local planning content — copy the structure in `src/content/locations.ts`, not the words.

## Editorial strategy (next 12 articles, in priority order)
Write from real experience as it accumulates; every article ends with a relevant service link and the inquiry CTA.
1. Tented wedding at home in Connecticut: permits, power, restrooms and the real cost drivers
2. Venue coordinator vs. wedding planner: what each one actually does
3. A Connecticut wedding rain plan: decision deadlines and tent holds
4. Fall foliage weddings in the Litchfield Hills: dates, light and logistics
5. Shoreline wedding timing: sunset, tides and wind
6. Wedding-day timeline templates (5 p.m. ceremony; church + reception; first look vs. not)
7. How to build a wedding budget that doesn't surprise you (service charges, tax, gratuities, overtime)
8. Hotel room blocks for Connecticut weddings: when to book and how attrition works
9. Questions to ask a wedding planner before you sign
10. Winter weddings in New Haven and Hartford
11. Real wedding features (only with couple permission)
12. Vendor spotlights (only for vendors you have actually worked with)
