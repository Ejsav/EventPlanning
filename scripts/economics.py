"""Sound & Stone unit economics and booking scenarios.

Every input below is an ESTIMATE to be replaced with real quotes and results.
Run: python3 scripts/economics.py > docs/generated-economics.md
"""

PROCESSING = 0.03  # card/ACH blended estimate

packages = {
    # name: price, lead planner pay, assistant pay, travel, admin allocation, CAC allowance, est. company hours, est. lead hours
    "Wedding Management": dict(price=3200, lead=1300, assistants=360, travel=100, admin=150, cac=450, lead_hours=34, owner_hours=6, retainer=0.50),
    "Partial Planning": dict(price=6800, lead=2856, assistants=360, travel=150, admin=250, cac=900, lead_hours=70, owner_hours=12, retainer=0.40),
    "Full-Service Planning": dict(price=12500, lead=5625, assistants=840, travel=250, admin=350, cac=1500, lead_hours=120, owner_hours=25, retainer=0.40),
}
addon = dict(name="Guest transportation coordination", price=750, labor=280)

def unit(p):
    processing = p["price"] * PROCESSING
    direct = p["lead"] + p["assistants"] + p["travel"] + p["admin"] + processing
    contrib = p["price"] - direct
    after = contrib - p["cac"]
    return processing, direct, contrib, after

money = lambda v: f"${v:,.0f}"
pct = lambda v: f"{v*100:.0f}%"

print("## Unit economics per package (starting fee, estimated)\n")
print("| | " + " | ".join(packages) + " |")
print("|---|" + "---:|" * len(packages))
rows = {k: [] for k in ["Selling price", "Lead planner (contractor)", "Day-of assistants", "Travel & supplies", "Admin allocation (CRM, contracts, insurance, accounting)", "Payment processing (3%)", "Direct cost", "Contribution before marketing", "Contribution margin", "Customer acquisition allowance", "Contribution after acquisition", "Margin after acquisition", "Max break-even CAC", "Est. lead planner hours", "Implied lead planner rate", "Est. owner/office hours"]}
for name, p in packages.items():
    processing, direct, contrib, after = unit(p)
    vals = [p["price"], p["lead"], p["assistants"], p["travel"], p["admin"], processing, direct, contrib, contrib / p["price"], p["cac"], after, after / p["price"], contrib, p["lead_hours"], p["lead"] / p["lead_hours"], p["owner_hours"]]
    for (k, _), v in zip(rows.items(), vals):
        rows[k].append(v)
for k, vals in rows.items():
    fmt = pct if "margin" in k.lower() else (lambda v: f"{v:.0f}") if "hours" in k.lower() else (lambda v: f"${v:,.0f}/hr") if "rate" in k.lower() else money
    print(f"| {k} | " + " | ".join(fmt(v) for v in vals) + " |")

pa = addon["price"] * (1 - PROCESSING) - addon["labor"]
print(f"\n**Add-on — {addon['name']}:** {money(addon['price'])} fee, ~{money(addon['labor'])} coordinator/dispatch labor → ~{money(pa)} contribution ({pct(pa/addon['price'])}). Vehicles are quoted separately at carrier rates.\n")

scenarios = {
    "Conservative": dict(mix={"Wedding Management": 0.60, "Partial Planning": 0.30, "Full-Service Planning": 0.10}, uplift=0.00, addon_rate=0.15),
    "Realistic": dict(mix={"Wedding Management": 0.45, "Partial Planning": 0.35, "Full-Service Planning": 0.20}, uplift=0.10, addon_rate=0.30),
    "Aggressive": dict(mix={"Wedding Management": 0.35, "Partial Planning": 0.40, "Full-Service Planning": 0.25}, uplift=0.20, addon_rate=0.45),
}
FIXED_MONTHLY = 650  # insurance, software, domain/email, accounting — estimate
def overhead(n):
    """Fixed overhead steps up with volume: an operations coordinator (~$5,000/mo loaded)
    is assumed from 10 bookings/month and a second from 20."""
    return FIXED_MONTHLY + (5000 if n >= 10 else 0) + (5000 if n >= 20 else 0)

print("## Booking scenarios (per month of signed contracts)\n")
print("Assumptions: *uplift* = average fee above the starting price (guest count, tents, extra events); *add-on rate* = share of weddings adding transportation coordination. Fixed overhead estimated at "
      f"{money(FIXED_MONTHLY)}/month, plus one ~$5,000/month operations coordinator from 10 bookings/month and a second from 20. Owner time is not costed.\n")
print("| Scenario | Bookings / month | Contracted value / month | Retainers collected at signing | Contribution after CAC / month | Less fixed overhead | Annualized contracted value | Annualized contribution after overhead |")
print("|---|---:|---:|---:|---:|---:|---:|---:|")
for sname, s in scenarios.items():
    for n in (2, 5, 10, 20):
        value = retainers = contrib = 0.0
        for pname, share in s["mix"].items():
            p = packages[pname]
            price = p["price"] * (1 + s["uplift"])
            # direct costs scale partly with price (lead pay is a share of fee); keep others fixed
            lead = p["lead"] * (1 + s["uplift"])
            direct = lead + p["assistants"] + p["travel"] + p["admin"] + price * PROCESSING
            c = price - direct - p["cac"]
            count = n * share
            value += count * price
            retainers += count * price * p["retainer"]
            contrib += count * c
        value += n * s["addon_rate"] * addon["price"]
        contrib += n * s["addon_rate"] * pa
        net = contrib - overhead(n)
        print(f"| {sname} | {n} | {money(value)} | {money(retainers)} | {money(contrib)} | {money(net)} | {money(value*12)} | {money(net*12)} |")
print("\nContracted value is not revenue: retainers are collected at signing, the balance before the wedding, and revenue is earned when the wedding is delivered — typically 6–18 months later.")
