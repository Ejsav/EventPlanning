# 10 · Quality verification report

*All results below were actually measured in this environment on 2026-11-12.*

## Automated tests
| Suite | Result |
|---|---|
| TypeScript (`tsc --noEmit`, strict + `noUncheckedIndexedAccess`) | Pass |
| ESLint (`eslint-config-next` core-web-vitals + TypeScript) | Pass, 0 warnings |
| Unit tests (Vitest) — schema, date/season logic, triage, pricing config | **12 / 12 pass** |
| End-to-end (Playwright, desktop 1440 + Pixel 7) | **66 / 66 pass** |
| Production build (`next build`) | Pass — 27 routes, all static/SSG |

E2E coverage: every page returns 200 with exactly one `h1`, a title ≤65 chars, a description of 70–160 chars, a canonical URL, alt text on every image and no horizontal overflow; all internal links resolve; branded 404; sitemap/robots; JSON-LD parses and contains no ratings/reviews; desktop Services menu (open, Escape, focus return, navigate); mobile menu (focus trap, Escape, navigate, closes on route change); primary CTA → form; fit guide → prefilled inquiry; form validation (summary focus, inline errors, errors clearing); exact-date requirement; a full two-step submission verified in the stored lead (service + UTM attribution); honeypot submissions discarded without storage.

## Production delivery verification (manual scripts against a production build)
| Scenario | Result |
|---|---|
| Production, no integrations configured | Form disabled with "temporarily unavailable" notice; server refuses submissions |
| Resend + webhook configured (local mock endpoints) | Team email sent with reply-to = couple; webhook sent with secret header, attribution (UTM + gclid) and triage notes; acknowledgment sent to couple; success state shows scheduling button |
| All delivery channels failing | Visitor sees an error with fallback email; values preserved; **no success state**; failure logged |

## Lighthouse (production build, local server; Lighthouse 12)
Columns: Performance · Accessibility · Best Practices · SEO · LCP · CLS · TBT. Mobile = Lighthouse's default simulated slow 4G + 4× CPU throttling.

| Page | Profile | Perf | A11y | BP | SEO | LCP | CLS | TBT |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| / | mobile | 92 | 100 | 100 | 100 | 3.3 s | 0 | 60 ms |
| / | desktop | 100 | 100 | 100 | 100 | 0.7 s | 0 | 0 ms |
| /services/full-service-wedding-planning | mobile | 94 | 100 | 100 | 100 | 2.7 s | 0 | 160 ms |
| /services/full-service-wedding-planning | desktop | 100 | 100 | 100 | 100 | 0.7 s | 0 | 0 ms |
| /services/wedding-management | mobile | 88 | 100 | 100 | 100 | 3.3 s | 0 | 230 ms |
| /services/wedding-management | desktop | 100 | 100 | 100 | 100 | 0.7 s | 0 | 0 ms |
| /packages-and-pricing | mobile | 93 | 100 | 100 | 100 | 3.2 s | 0 | 90 ms |
| /packages-and-pricing | desktop | 100 | 100 | 100 | 100 | 0.7 s | 0 | 0 ms |
| /contact | mobile | 93 | 100 | 100 | 100 | 2.9 s | 0 | 160 ms |
| /contact | desktop | 100 | 100 | 100 | 100 | 0.6 s | 0 | 0 ms |
| /locations/connecticut-shoreline | mobile | 94 | 100 | 100 | 100 | 3.0 s | 0 | 100 ms |
| /locations/connecticut-shoreline | desktop | 100 | 100 | 100 | 100 | 0.7 s | 0 | 0 ms |
| /journal/wedding-planner-cost-connecticut | mobile | 93 | 100 | 100 | 100 | 3.2 s | 0 | 90 ms |
| /journal/wedding-planner-cost-connecticut | desktop | 99 | 100 | 100 | 100 | 0.9 s | 0 | 0 ms |

**Against targets:** Accessibility, Best Practices and SEO meet the ≥90 target on every tested page (all 100). Desktop performance is 99–100 with LCP ≤0.9s. Mobile performance is 88–94; **mobile lab LCP (2.7–3.3s) does not meet the 2.5s target** under Lighthouse's simulated slow-4G profile. The LCP element is headline text waiting on the web fonts (~129KB critical: Newsreader roman 112KB + Jost 17KB). CLS is 0 everywhere. Field data (real users, Chrome UX Report) will be the true measure after launch.

Remaining levers if mobile lab LCP must reach ≤2.5s: (a) `display: "optional"` for Newsreader (no swap; first-time slow visitors see the fallback serif), or (b) drop Newsreader's optical-size axis (smaller file, less refined headlines). Both trade brand typography for lab score; neither was applied.

## Visual audits & issues fixed
Screenshots reviewed at 360, 390, 768, 1024 and 1440 px, plus open-menu states and form success/error states.

| # | Issue found | Fix |
|---|---|---|
| 1 | Header logo sat higher than the navigation | Flex-centered the logo link |
| 2 | Services index numerals misaligned with service names | Baseline-aligned the row grid |
| 3 | Process timeline headings uneven when labels wrapped | Reserved two lines for stage labels; shortened a step title |
| 4 | Empty space beside the region list on desktop | Made the image pair sticky |
| 5 | Dangling separator line in the hero eyebrow on phones | Hidden below `sm` |
| 6 | Footer rule bled into the page gutter | Moved border inside the container |
| 7 | Contact form started ~900px down on phones | Reordered: headline → form → next steps on mobile |
| 8 | **Bug:** season options were a year off in Nov–Dec ("Winter 2027–28") | Rewrote season logic; unit tests for Jan/Jul/Nov/Dec |
| 9 | **Bug:** missing-date error only appeared on the second attempt (Zod `superRefine` skipped) | Separate date rule reported with all other errors, client and server |
| 10 | **SEO:** 7 titles 88–118 chars, descriptions up to 187 chars | Short titles/`seoTitle`; descriptions ≤160; enforced by tests |
| 11 | **Bug:** `NEXT_PUBLIC_*` config read dynamically → scheduling button and contact details missing in client bundle | Literal `process.env.X` access |
| 12 | Contact page CLS 0.164 (form collapsed after hydration) | Server renders the stepped layout; `<noscript>` styles keep a no-JS fallback |
| 13 | CSP violation from Zod's eval probe | `z.config({ jitless: true })` |
| 14 | Mobile LCP 3.8–4.5s (306KB of preloaded fonts) | Self-hosted subset fonts, clamped weight axes, italic split off the critical path (−40% bytes) |
| 15 | Success heading scrolled out of view after submit | Explicit scroll to the confirmation |
| 16 | **Bug:** mouse hover opened the Services menu, then clicking the button closed it | Click after hover keeps it open |
| 17 | 9px horizontal overflow at 768px (timeline rail) | Clipped the rail to the list |
| 18 | Tablet hero crop ~800px tall and cutting off heads | 3:2 tablet crop with a raised focal point |

## Known limitations
- No live integrations, domain, analytics property or deployment exist yet (credentials and authorization required) — see [09](09-launch-checklist.md).
- Keyword volumes and trademark availability were not verified (no tool access).
- Photography is licensed stock graded to one look; people-forward images should be replaced with commissioned/released work.
- Screen-reader testing was automated (Lighthouse/axe rules, semantic tests); no manual VoiceOver/NVDA session was possible here.
- Lighthouse was run against a local server; numbers on Vercel's edge will differ (typically better TTFB).
