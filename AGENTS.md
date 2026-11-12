<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project notes (Sound & Stone)
- Read `README.md` and `docs/10-qa-report.md` first. Business context and decisions live in `docs/`.
- Never add fabricated testimonials, reviews, ratings, portfolios, statistics or partnerships. Imagery is licensed inspiration only.
- Prices only in `src/config/packages.ts`; brand facts/contact in `src/config/site.ts` (read `NEXT_PUBLIC_*` with literal `process.env.X`).
- The inquiry form must never show success unless `deliverLead` reports a primary channel succeeded.
- Keep titles ≤65 chars and descriptions ≤160 chars (enforced in `tests/e2e/site.spec.ts`).
- In this cloud environment run e2e with `PW_CHROMIUM=/opt/pw-browsers/chromium npm run test:e2e`.
