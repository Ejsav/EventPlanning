# 04 · Service economics & revenue scenarios

> **Everything here is an estimate.** No contractor agreements, vendor contracts or insurance quotes exist yet. Replace each input with real numbers as they arrive — the model lives in `scripts/economics.py` (run `python3 scripts/economics.py`), and prices live in `src/config/packages.ts`.

## Key modeling assumptions
- **Lead planner pay** is a flat fee per wedding set as a share of the planning fee (≈40% Management, 42% Partial, 45% Full-Service). Implied hourly rates ($38–47/hr) assume the company — not the planner — handles sales, scheduling, client communications, budget tracking and transportation logistics. If experienced planners require more, raise fees before cutting staffing.
- **Day-of assistants** at ~$30/hr for 12–14 hours.
- **Admin allocation** spreads CRM/contract software, insurance and bookkeeping per wedding.
- **Customer acquisition allowance** is a budget, not a measured CAC. Real CAC comes from tracked results (see "Setting acceptable CAC" below).
- **Owner time is not costed.** At scale, the owner's tasks become a paid operations coordinator (modeled from 10 bookings/month).

## Unit economics per package (starting fee, estimated)

| | Wedding Management | Partial Planning | Full-Service Planning |
|---|---:|---:|---:|
| Selling price | $3,200 | $6,800 | $12,500 |
| Lead planner (contractor) | $1,300 | $2,856 | $5,625 |
| Day-of assistants | $360 | $360 | $840 |
| Travel & supplies | $100 | $150 | $250 |
| Admin allocation (CRM, contracts, insurance, accounting) | $150 | $250 | $350 |
| Payment processing (3%) | $96 | $204 | $375 |
| Direct cost | $2,006 | $3,820 | $7,440 |
| Contribution before marketing | $1,194 | $2,980 | $5,060 |
| Contribution margin | 37% | 44% | 40% |
| Customer acquisition allowance | $450 | $900 | $1,500 |
| Contribution after acquisition | $744 | $2,080 | $3,560 |
| Margin after acquisition | 23% | 31% | 28% |
| Max break-even CAC | $1,194 | $2,980 | $5,060 |
| Est. lead planner hours | 34 | 70 | 120 |
| Implied lead planner rate | $38/hr | $41/hr | $47/hr |
| Est. owner/office hours | 6 | 12 | 25 |

**Add-on — Guest transportation coordination:** $750 fee, ~$280 coordinator/dispatch labor → ~$448 contribution (60%). Vehicles are quoted separately at carrier rates.

## Booking scenarios (per month of signed contracts)

Assumptions: *uplift* = average fee above the starting price (guest count, tents, extra events); *add-on rate* = share of weddings adding transportation coordination. Fixed overhead estimated at $650/month, plus one ~$5,000/month operations coordinator from 10 bookings/month and a second from 20. Owner time is not costed.

| Scenario | Bookings / month | Contracted value / month | Retainers collected at signing | Contribution after CAC / month | Less fixed overhead | Annualized contracted value | Annualized contribution after overhead |
|---|---:|---:|---:|---:|---:|---:|---:|
| Conservative | 2 | $10,645 | $4,552 | $2,987 | $2,337 | $127,740 | $28,045 |
| Conservative | 5 | $26,612 | $11,380 | $7,468 | $6,818 | $319,350 | $81,812 |
| Conservative | 10 | $53,225 | $22,760 | $14,935 | $9,285 | $638,700 | $111,423 |
| Conservative | 20 | $106,450 | $45,520 | $29,870 | $19,220 | $1,277,400 | $230,646 |
| Realistic | 2 | $14,354 | $5,878 | $4,502 | $3,852 | $172,248 | $46,227 |
| Realistic | 5 | $35,885 | $14,696 | $11,256 | $10,606 | $430,620 | $127,268 |
| Realistic | 10 | $71,770 | $29,392 | $22,511 | $16,861 | $861,240 | $202,336 |
| Realistic | 20 | $143,540 | $58,784 | $45,023 | $34,373 | $1,722,480 | $412,471 |
| Aggressive | 2 | $17,391 | $6,955 | $5,869 | $5,219 | $208,692 | $62,622 |
| Aggressive | 5 | $43,478 | $17,388 | $14,671 | $14,021 | $521,730 | $168,255 |
| Aggressive | 10 | $86,955 | $34,776 | $29,343 | $23,693 | $1,043,460 | $284,311 |
| Aggressive | 20 | $173,910 | $69,552 | $58,685 | $48,035 | $2,086,920 | $576,421 |

Contracted value is not revenue: retainers are collected at signing, the balance before the wedding, and revenue is earned when the wedding is delivered — typically 6–18 months later.

## Reading these numbers
- **Per-hour reality check.** Full-Service carries the most dollars but also the most risk and the most owner hours. Wedding Management has the thinnest margin after acquisition (~23%) but is the easiest to fulfill and to sell — the right *lead* offer, not the profit engine.
- **Pricing levers.** If contractor quotes come in higher than modeled, the first moves are: raise Full-Service to $14,500, raise Management to $3,600, and price large/tented weddings explicitly — not reduce the two-person day-of staffing promised on the site.
- **Seasonality.** Connecticut weddings concentrate in June, September and October, and many couples book 9–15 months ahead. Expect uneven monthly bookings and plan capacity around peak Saturdays: one lead planner can run one wedding per day.
- **Capacity at 20 bookings/month** (~240 weddings/year) would require roughly 15–25 active lead planners and several assistants across ~25 peak weekends. That is a different company (operations team, QA, scheduling software) — treat 20/month as a multi-year target, not a launch scenario.
- **Cash vs. revenue.** Retainers (40–50%) arrive at signing; balances arrive before the wedding; revenue is *earned* on delivery. Contractor payments should be scheduled after the related client payments are collected. Keep retainers available until weddings are delivered — your attorney and accountant should advise on refundability and revenue recognition.

## Setting acceptable CAC from real results
1. Track every lead's source (the site captures UTMs, gclid, referrer and "how did you hear") and outcome in the CRM.
2. Monthly, per channel: `CAC = channel spend ÷ bookings from that channel`.
3. `Max sustainable CAC = contribution before marketing per booking − the profit you require per booking`. Example: with the realistic mix (≈$3,000 average contribution before marketing per booking) and a required $2,000 profit per booking, you can afford up to ~$1,000 to acquire each booking.
4. Scale channels whose CAC is below that threshold; cut the rest after 60–90 days of data (allowing for the long booking cycle).

## Funnel math (adjustable; not industry benchmarks)
`bookings = visitors × inquiry rate × qualified rate × consultation rate × close rate`

Example with placeholder rates (replace with observed data): 3,000 visitors × 2% inquiry × 60% qualified × 70% consult × 35% close ≈ **9 bookings**. Every rate here is a hypothesis to measure, not a promise.
