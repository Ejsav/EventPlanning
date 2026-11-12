# 09 · Launch checklist — what remains before going public

## Blockers (must be done)
- [ ] **Authorize and buy the domain** (soundandstoneweddings.com showed available on 2026-11-12) and set `NEXT_PUBLIC_SITE_URL`.
- [ ] **Configure at least one lead-delivery channel** (Resend and/or CRM webhook) and send a real test inquiry end to end. Until then the production form is intentionally disabled.
- [ ] **Real contact details**: business email and phone in `NEXT_PUBLIC_CONTACT_EMAIL` / `NEXT_PUBLIC_CONTACT_PHONE` (used for fallback messages, footer, privacy requests).
- [ ] **Attorney review**: privacy policy, terms of use, client agreement, contractor agreement, referral disclosure language.
- [ ] **Trademark clearance** for "Sound & Stone" and a Connecticut trade-name certificate for New England Event Planners LLC.
- [ ] **Insurance**: general + professional liability in place (venues will ask for certificates).
- [ ] **At least two vetted lead planners** under signed agreements before selling dates — every service page promises a lead planner introduced before signing and two people on the day.
- [ ] **Confirm operating promises** you're comfortable keeping: reply within one business day (`site.responseTime` in `src/config/site.ts`), two-person minimum, disclosed referrals, flat fees.
- [ ] **Confirm prices** in `src/config/packages.ts` against real contractor quotes.

## Strongly recommended
- [ ] Cloudflare Turnstile + Upstash Redis rate limiting.
- [ ] GA4 property; mark `generate_lead` as a key event.
- [ ] Google Search Console + sitemap submission; Google Business Profile (service-area, address hidden).
- [ ] Scheduling link (`NEXT_PUBLIC_SCHEDULING_URL`) for the post-inquiry "Choose a time" button.
- [ ] Replace people-forward stock photos (hero and couple images) with commissioned or released photography before paid ads.
- [ ] Professional refinement of the logo mark into final vector files for print.
- [ ] Reserve social handles; add URLs to env to show them in the footer.

## Later
- [ ] Real wedding features (with written permission) and genuine reviews; only then add review schema.
- [ ] Additional regions (Rhode Island, the Berkshires) with genuinely local content.
- [ ] A/B testing once traffic supports it ([06](06-lead-management.md)).
