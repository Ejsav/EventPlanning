# 08 · Marketing & growth plan

Principle: buy or earn **qualified** demand, measure it to the booking, and scale only what produces bookings at an acceptable CAC ([04](04-service-economics.md)). No spend happens without your authorization.

## Channel priorities

| Priority | Channel | Why | First actions | Landing page |
|---|---|---|---|---|
| 1 | **Venue & vendor referrals** | Highest-intent, lowest-cost leads; venues meet couples who already booked (perfect for Wedding Management/Partial) | Meet 10 venue coordinators + 10 photographers in 60 days; leave a one-page "how we work with venues"; follow up with a useful logistics checklist; give vendors a referral link with `?utm_source=venue-{name}` | Service pages, `/services/wedding-management` |
| 2 | **Google Business Profile + organic local** | Free, compounding; couples search "wedding planner near me / CT" | Create GBP (service-area), weekly photo/post cadence, collect reviews after every wedding | Home, regional pages |
| 3 | **SEO content** | Decision-stage articles rank and pre-sell | Publish 2 guides/month from [03](03-site-architecture-and-seo.md) | Journal → service pages |
| 4 | **Google Search Ads (small, tightly controlled)** | Captures intent now while SEO matures | Exact/phrase match on service + region terms; negative keywords (jobs, school, cheap, free, DIY); budget cap you approve; send to the matching service or region page; import offline bookings via gclid | Service + region pages |
| 5 | **Instagram** | Where couples vet planners visually | Real planning work (with permission): run-of-show close-ups, venue walkthroughs, vendor collaborations; avoid stock or AI imagery | Home, contact |
| 6 | **Pinterest** | Planning-stage discovery; drives evergreen traffic | Pins for each journal article and regional page | Journal |
| 7 | **Wedding directories** (The Knot, WeddingWire, Zola) | Mixed quality, often price-shopping leads; reviews matter | Free profiles first; consider paid tiers only after measuring lead quality | Contact (with UTM) |
| 8 | **TikTok** | Reach, weaker intent | Behind-the-scenes logistics content once real weddings exist | Home |
| 9 | **Retargeting** | Only after traffic exists and consent rules are configured | Use GA4 audiences with consent; keep frequency low | Pricing, contact |

## First 90 days
- **Weeks 1–2:** finalize domain, email, phone; deploy; connect Resend + CRM webhook; GBP; Search Console; real contact details in env.
- **Weeks 2–6:** recruit planners; venue/vendor outreach (20 meetings); publish 2 more guides; Instagram account with 9 genuine posts.
- **Weeks 6–12:** small Google Ads test on Wedding Management + Partial keywords in Fairfield County and the shoreline; weekly lead review (source, quality, outcome); first bookings documented.

## Weekly scorecard
Visitors by source · inquiries · qualified rate · calls booked · proposals sent · bookings · lost reasons · spend by channel · CAC by channel · average fee.

## Website hooks already in place
- Every channel can land on a specific, persuasive page (service, region, article).
- UTM, gclid, fbclid, referrer and landing page are captured with every inquiry.
- `generate_lead` fires only on server-confirmed inquiries; offline stages are designed for import.
