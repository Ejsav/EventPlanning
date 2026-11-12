# 06 · Lead management, follow-up & measurement

## How a lead flows
```
Website inquiry ──► server validation, spam checks, rate limit
                 ├─► Team notification email (Resend) — reply-to is the couple
                 ├─► CRM webhook (Zapier/Make → HoneyBook, HubSpot, Airtable or Google Sheets)
                 └─► Acknowledgment email to the couple (only after a primary channel succeeds)
```
The inquiry counts as received only when the team email **or** the webhook succeeds. If both fail, the visitor sees an error with a fallback email — never a false confirmation. In production with neither configured, the form is disabled with a notice.

Each lead carries: names, contact details, timing/date, service, venue status and location, guest range, budget range, referral source, message, marketing consent, first-touch attribution (UTM source/medium/campaign/term/content, gclid/fbclid, referrer, landing page), lead ID, timestamp, stage and **triage notes** (short runway, peak-season Saturday, private property/tent, mismatch between service and venue status, large guest count).

## Recommended system
**HoneyBook or Dubsado** (industry-standard for planners: proposals, e-signed contracts, invoices/payment schedules, scheduling, client portal). Connect the site's webhook through Zapier/Make to create a project/lead, and mirror to a Google Sheet as a backup log. If you prefer a general CRM, HubSpot's free tier works with the same webhook. Don't build a custom CRM.

## Pipeline stages
`New Inquiry → Contacted → Qualified → Consultation Scheduled → Proposal Sent → Booked / Lost`

| Stage | Entry criteria | Target time in stage | Next action |
|---|---|---|---|
| New Inquiry | Webhook/email received | < 1 business day | Personal reply + call link |
| Contacted | Reply sent | 3 days | Follow-up #1 at day 2, #2 at day 5 |
| Qualified | Date, region, budget fit, service fit plausible | — | Book call |
| Consultation Scheduled | Call booked | — | Pre-call notes from inquiry |
| Proposal Sent | Proposal delivered within 2–3 days of call | 7 days | Follow-up day 3 and day 7; date hold expires day 5 |
| Booked | Signed agreement + retainer | — | Onboarding |
| Lost | Declined, no response after 3 follow-ups, or not a fit | — | Record reason (price, date, chose another planner, DIY, no response) |

Track **lost reasons** religiously — they tell you whether pricing, positioning or speed is the problem.

## Templates (edit to your voice; keep them personal)

**1. Personal reply (within one business day)**
> Subject: Your wedding on {date or season} — Sound & Stone
>
> Hi {first name},
> Thank you for telling us about your wedding{ at venue}. {One specific sentence responding to their message.}
> The best next step is a relaxed 30-minute call so we can understand what you're imagining and tell you honestly which level of help makes sense. Would {two specific time options} work, or you can choose a time here: {scheduling link}.
> Warmly, {name} · Sound & Stone

**2. Follow-up (day 2, no reply)**
> Hi {first name} — just making sure my note reached you. If it's easier, reply with a couple of times that suit you and I'll send an invitation. No pressure at all; we're glad to help even if you're early in planning.

**3. Follow-up (day 5, last nudge)**
> Hi {first name}, I'll close the loop for now so we're not crowding your inbox. If and when you'd like to talk, simply reply here — we'll pick up where we left off. Wishing you a wonderful planning season.

**4. Call confirmation**
> Looking forward to speaking on {day, time}. I'll call you at {phone} (or join via {link}). Nothing to prepare — if you have a venue contract or vendor list handy, it's helpful but not necessary.

**5. Proposal email**
> Thank you for the conversation. Your proposal for {service} is attached: scope, a flat fee of {fee}, and the payment schedule. I've also introduced {planner name}, who would lead your wedding. We're holding {date} for you until {date + 5 business days}. Happy to walk through any of it.

**6. Proposal follow-up (day 3 / day 7)**
> Hi {first name} — any questions about the proposal? If the scope isn't quite right, tell me what you'd change and I'll revise it. Your date hold runs through {date}.

**7. Booked — welcome**
> Welcome! Your date is officially reserved. This week you'll receive access to your planning workspace and calendar, and {planner} will be in touch to schedule your first meeting.

**8. Marketing notes (only with opt-in consent)** — occasional, useful planning notes; every message includes an unsubscribe link and the business's physical mailing address (CAN-SPAM). Never add leads to newsletters without the opt-in box.

## Measurement architecture (GA4-compatible)
Events pushed to `dataLayer` and gtag (`src/lib/analytics.ts`) — **no personal data is ever sent**:

| Event | Type | Fired when |
|---|---|---|
| `cta_click`, `cta_inquiry_click` | Engagement | Any tracked CTA, with `placement` |
| `package_select` | Engagement (high intent) | Inquire from comparison table/guide, with `service` |
| `guide_complete` | Engagement | Fit guide produces a recommendation |
| `inquiry_start` | Funnel | First interaction with the form |
| `inquiry_step_complete` | Funnel | Step 1 passes validation |
| `inquiry_error` | Funnel | Server rejects (validation, rate limit, delivery) |
| **`generate_lead`** | **Conversion** | **Server-confirmed inquiry** |
| `scheduling_click` | Funnel | "Choose a time" after inquiry |
| `consultation_scheduled`, `proposal_sent`, `booking_confirmed` | **Offline conversions** | Recorded in the CRM; import to GA4 (Measurement Protocol) / Google Ads offline conversions using the stored `gclid` |

GA4 setup: set `NEXT_PUBLIC_GA_ID`; mark `generate_lead` as a key event; import `booking_confirmed` as the true conversion for ad bidding once volume allows. Consent Mode defaults deny ad storage; analytics honors the footer opt-out and Global Privacy Control.

## Experimentation (when traffic justifies it)
Do not A/B test before there are enough conversions to read results (rule of thumb: hundreds of inquiries per variant). Until then, make one deliberate change at a time and compare month over month. Candidates in priority order: hero headline, CTA wording ("Inquire about your wedding" vs. "Request a consultation" — avoid wording that implies live date availability), showing prices in the hero, form length (one step vs. two), consultation offer. Copy and prices are centralized (`src/config/*`, page files) to make variants cheap; use Vercel feature flags or Edge Config when testing begins.
