# Sound & Stone — Wedding Planning & Management

Website and operating foundation for **Sound & Stone**, a Connecticut wedding planning brand operated by New England Event Planners LLC.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4 · Zod · Vitest · Playwright. No UI kit; one token-driven design system.

## Quick start
```bash
npm install
```
```bash
npm run dev
```
Open http://localhost:3000. Without integrations, development inquiries are saved to `.data/inquiries.ndjson` and the form says so. In production the form refuses submissions until Resend or a CRM webhook is configured — see [docs/07-deployment.md](docs/07-deployment.md).

## Scripts
| Command | What it does |
|---|---|
| `npm run dev` / `build` / `start` | Develop, build, serve |
| `npm run typecheck` · `npm run lint` | TypeScript and ESLint |
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | End-to-end tests (Playwright; starts the dev server) |
| `npm run images` | Re-download and re-grade photography |
| `python3 scripts/subset-fonts.py` | Rebuild self-hosted fonts |
| `python3 scripts/economics.py` | Recompute unit economics and scenarios |
| `node scripts/mock-integrations.mjs` | Local Resend/webhook stand-in for verifying lead delivery |

## Where things live
```
src/config/site.ts          Brand facts, contact (env-driven), response-time promise, primary CTA
src/config/packages.ts      ALL prices, inclusions, comparison matrix, add-ons, terms
src/content/                Copy: shared FAQs/process/commitments, services, locations, journal
src/app/                    Routes (home, services/*, packages-and-pricing, approach, about,
                            journal/*, locations/*, contact + server action, privacy, terms)
src/components/             Header, Footer, InquiryForm, PricingInteractive, Blocks, Photo, …
src/lib/inquiry/            Zod schema, delivery (Resend + webhook), rate limiting
src/lib/analytics.ts        Event taxonomy (GA4/dataLayer, no PII, GPC honored)
src/lib/schema.ts           JSON-LD builders (no fabricated ratings)
docs/                       Strategy, brand, SEO, economics, operations, leads, deployment,
                            marketing, launch checklist, QA report
```

## Documentation
1. [Market research, positioning & entry strategy](docs/01-strategy-and-positioning.md)
2. [Brand identity & photography spec](docs/02-brand.md)
3. [Site architecture, SEO & content strategy](docs/03-site-architecture-and-seo.md)
4. [Service economics & revenue scenarios](docs/04-service-economics.md)
5. [Operations & fulfillment plan](docs/05-operations-and-fulfillment.md)
6. [Lead management, templates & measurement](docs/06-lead-management.md)
7. [Deployment & integrations](docs/07-deployment.md)
8. [Marketing & growth plan](docs/08-marketing-plan.md)
9. [Launch checklist](docs/09-launch-checklist.md)
10. [Quality verification report](docs/10-qa-report.md)

## Ground rules baked into the code
- No testimonials, reviews, portfolios, awards, statistics or partnerships are invented. Photography is labeled as licensed inspiration.
- Every price comes from `src/config/packages.ts`.
- A success message is shown only after a delivery channel confirms the inquiry.
