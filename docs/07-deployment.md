# 07 · Deployment & integrations

Nothing has been deployed or connected to a live account. These are the exact steps to do it.

## 1. Deploy (Vercel recommended)
1. Import the GitHub repository in Vercel (framework auto-detected: Next.js; Node ≥ 20.9).
2. Add environment variables from `.env.example` (Production and Preview).
   - Preview deployments: set `NEXT_PUBLIC_NOINDEX=true`.
3. Deploy. Every page is statically generated; the inquiry server action runs as a serverless function.
4. Add the domain (e.g. `soundandstoneweddings.com` once purchased) and set `NEXT_PUBLIC_SITE_URL` to it, then redeploy.

> `NEXT_PUBLIC_*` values and the contact page's "inquiries available" check are evaluated at build time. **Redeploy after changing environment variables.**

## 2. Lead delivery — at least one is required for production
**Resend (team notification + couple acknowledgment)**
1. Create a Resend account; add and verify the sending domain (SPF/DKIM DNS records).
2. Set `RESEND_API_KEY`, `INQUIRY_TO_EMAIL` (team inbox), `INQUIRY_FROM_EMAIL` (e.g. `Sound & Stone <inquiries@yourdomain>`).

**CRM webhook (recommended in addition to email)**
1. In Zapier or Make, create a "Catch Hook" trigger; copy its URL into `LEAD_WEBHOOK_URL`.
2. Set `LEAD_WEBHOOK_SECRET` and add a filter step that checks the `X-Webhook-Secret` header.
3. Map `lead.*` fields to your CRM (HoneyBook/Dubsado/HubSpot) and append a row to a Google Sheet as a backup.
4. Payload shape: `{ "type": "inquiry.created", "lead": { id, receivedAt, stage, name, partnerName, email, phone, timing, weddingDate, service, venueStatus, venue, guestCount, budget, referral, message, marketingConsent, attribution{…}, triage[] } }`.

**Verify before launch (no real credentials needed):**
```bash
node scripts/mock-integrations.mjs
```
```bash
RESEND_API_BASE=http://localhost:4010 RESEND_API_KEY=test INQUIRY_TO_EMAIL=team@example.com INQUIRY_FROM_EMAIL="Sound & Stone <hello@example.com>" LEAD_WEBHOOK_URL=http://localhost:4010/hook npm run build
```
```bash
npm start
```
Submit the form; requests are written to `.data/mock-requests.ndjson`. Set `MOCK_FAIL_EMAIL=1 MOCK_FAIL_WEBHOOK=1` on the mock to see the error path.

Then, with real credentials on a preview deployment, submit one real test inquiry and confirm the team email, the acknowledgment and the CRM record all arrive.

## 3. Spam protection & rate limiting
- Built in: honeypot field, minimum fill time, server-side validation, per-client rate limit (5 per 10 minutes).
- **Recommended:** Cloudflare Turnstile (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`) and Upstash Redis (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`) so the rate limit is shared across serverless instances.

## 4. Analytics
Create a GA4 property, set `NEXT_PUBLIC_GA_ID`, mark `generate_lead` as a key event, and (later) import offline `booking_confirmed` conversions. See [06](06-lead-management.md).

## 5. Search & local
- Submit `https://yourdomain/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
- Create the Google Business Profile as a service-area business (address hidden). See [03](03-site-architecture-and-seo.md).

## Local development
```bash
npm install
```
```bash
npm run dev
```
Without integrations, development inquiries are saved to `.data/inquiries.ndjson` and the UI says so.

## Quality checks
```bash
npm run typecheck && npm run lint && npm test
```
```bash
PW_CHROMIUM=/path/to/chrome npm run test:e2e
```
(`PW_CHROMIUM` is only needed when the installed Playwright browser doesn't match; omit it on a normal machine after `npx playwright install chromium`.)

## Regenerating assets
- Photography grade/crops: `npm run images` (sources and IDs in `scripts/process-images.mjs`).
- Fonts: `python3 scripts/subset-fonts.py` (requires `pip install fonttools brotli`).
- Economics model: `python3 scripts/economics.py`.
- OG image: render `scripts/og/og.html` at 1200×630 (see git history for the Playwright one-liner) or replace `public/og.jpg`.
