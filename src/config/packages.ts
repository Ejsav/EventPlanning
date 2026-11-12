/**
 * Packages & pricing — the single source of truth.
 *
 * Every price shown anywhere on the site is read from this file, so fees can
 * be changed without touching page layouts. Prices are "starting at" figures
 * for a typical Connecticut wedding of up to ~150 guests at a single venue;
 * final fees are confirmed in a written proposal.
 *
 * Unit economics behind these numbers live in docs/04-service-economics.md.
 */

export type ServiceId = "full-service" | "partial" | "management";

export interface ServicePackage {
  id: ServiceId;
  name: string;
  /** Short, plain-language version used in tight UI. */
  shortName: string;
  slug: string;
  href: string;
  startingPrice: number;
  /** One line that tells a couple whether this is for them. */
  forWhom: string;
  promise: string;
  /** When we typically start working together. */
  begins: string;
  summary: string;
  highlights: string[];
  image: { src: string; alt: string };
}

export const packages: ServicePackage[] = [
  {
    id: "full-service",
    name: "Full-Service Planning",
    shortName: "Full-Service",
    slug: "full-service-wedding-planning",
    href: "/services/full-service-wedding-planning",
    startingPrice: 12500,
    forWhom: "For couples who want the entire wedding designed, built and run for them.",
    promise: "From the first venue tour to the last car home.",
    begins: "12–18 months before the wedding",
    summary:
      "We lead everything: budget, venue, the full vendor team, design, guest logistics and the wedding weekend itself. You make the decisions that matter; we handle the work behind every one of them.",
    highlights: [
      "Venue search, tours and negotiation",
      "Complete vendor team, sourced and managed",
      "Design concept, styling and floor plans",
      "Budget built and tracked line by line",
      "Guest logistics, transport and hotel blocks",
      "Lead planner plus two assistants on the day",
    ],
    image: { src: "/images/reception-tent.jpg", alt: "A white tented reception with a crystal chandelier above tables set with glassware and greenery" },
  },
  {
    id: "partial",
    name: "Partial Planning",
    shortName: "Partial",
    slug: "partial-wedding-planning",
    href: "/services/partial-wedding-planning",
    startingPrice: 6800,
    forWhom: "For couples who have started — usually with a venue — and want an expert to finish it with them.",
    promise: "You've begun beautifully. We'll make it whole.",
    begins: "6–9 months before the wedding",
    summary:
      "You keep the creative lead and the vendors you love. We fill the gaps in your team, sharpen the design, take over vendor communication and build the plan that carries your wedding day.",
    highlights: [
      "Six planning meetings, plus email support",
      "Recommendations for remaining vendors",
      "Design review and refinement",
      "Contract and budget review",
      "Full production schedule and run of show",
      "Lead planner plus an assistant on the day",
    ],
    image: { src: "/images/table-greenery.jpg", alt: "A wooden reception table set with white plates, gold-rimmed glassware and a garland of eucalyptus" },
  },
  {
    id: "management",
    name: "Wedding Management",
    shortName: "Management",
    slug: "wedding-management",
    href: "/services/wedding-management",
    startingPrice: 3200,
    forWhom: "For couples who have planned it themselves and want professionals to take it from here.",
    promise: "You planned it. We'll run it.",
    begins: "10–12 weeks before the wedding",
    summary:
      "More than day-of coordination. We step in ten to twelve weeks out, audit your plan, confirm every vendor, build the timeline and run the rehearsal and wedding day so you can be a guest at your own celebration.",
    highlights: [
      "Begins 10–12 weeks before the wedding",
      "Full plan audit and vendor confirmations",
      "Written timeline and run of show",
      "Final venue walkthrough",
      "Rehearsal direction",
      "Lead planner plus an assistant on the day",
    ],
    image: { src: "/images/reception-ballroom.jpg", alt: "A bright reception room with tall windows and round tables set with linens and blush florals" },
  },
];

export const packageById = (id: ServiceId) => packages.find((p) => p.id === id)!;

/** Comparison matrix used on the Packages & Pricing page. `true` = included, `false` = not included, string = detail. */
export const comparison: { label: string; values: Record<ServiceId, string | boolean> }[] = [
  { label: "Lead planner, introduced before you sign", values: { "full-service": true, partial: true, management: true } },
  { label: "We typically begin", values: { "full-service": "12–18 months out", partial: "6–9 months out", management: "10–12 weeks out" } },
  { label: "Planning meetings", values: { "full-service": "Monthly, plus as needed", partial: "Six meetings", management: "Three meetings" } },
  { label: "Budget", values: { "full-service": "Built and managed", partial: "Reviewed and tracked", management: "Final payment schedule" } },
  { label: "Venue search and tours", values: { "full-service": true, partial: "Guidance if not yet booked", management: false } },
  { label: "Vendor sourcing", values: { "full-service": "Full team, sourced and negotiated", partial: "Remaining vendors", management: "We work with your team" } },
  { label: "Vendor contract review", values: { "full-service": true, partial: true, management: "Logistics review" } },
  { label: "Design concept and styling", values: { "full-service": "Complete design direction", partial: "Review and refinement", management: false } },
  { label: "Guest logistics and transportation plan", values: { "full-service": true, partial: "Planning support", management: "Available as an add-on" } },
  { label: "Production schedule and run of show", values: { "full-service": true, partial: true, management: true } },
  { label: "Final venue walkthrough", values: { "full-service": true, partial: true, management: true } },
  { label: "Rehearsal direction", values: { "full-service": true, partial: true, management: true } },
  { label: "Wedding-day team", values: { "full-service": "Lead planner + two assistants", partial: "Lead planner + one assistant", management: "Lead planner + one assistant" } },
  { label: "Wedding-day coverage", values: { "full-service": "Up to 14 hours", partial: "Up to 12 hours", management: "Up to 12 hours" } },
];

export interface AddOn {
  name: string;
  price: string;
  description: string;
}

export const addOns: AddOn[] = [
  {
    name: "Guest transportation & shuttle coordination",
    price: "From $750",
    description:
      "Route and timing plan, vehicle sourcing from licensed, insured carriers, guest-facing schedules and a dedicated dispatch contact on the day. Vehicles are quoted separately at the carrier's rate.",
  },
  {
    name: "Rehearsal dinner or welcome party",
    price: "From $1,200",
    description: "Venue or restaurant coordination, timeline, vendor confirmations and on-site management for the evening.",
  },
  {
    name: "Farewell brunch",
    price: "From $650",
    description: "A relaxed send-off, coordinated end to end so the morning after needs nothing from you.",
  },
  {
    name: "Additional wedding-day assistant",
    price: "$450",
    description: "Recommended for weddings over 175 guests, multiple ceremony and reception sites, or tented properties.",
  },
  {
    name: "Additional coverage hour",
    price: "$175 per hour",
    description: "For after-parties, late load-outs and long celebrations.",
  },
];

export const paymentTerms = [
  "A signed agreement and retainer reserve your date — 40% of the planning fee for Full-Service and Partial Planning, 50% for Wedding Management.",
  "The balance is split into scheduled payments, with the final payment due 30 days before the wedding.",
  "Our fees are flat, not a percentage of your wedding budget, and every fee is confirmed in writing before you commit.",
  "You pay your vendors directly. We never hold your vendor funds.",
];

export const feeDrivers = [
  { title: "Guest count", body: "Our starting fees assume up to roughly 150 guests. Larger weddings need more planning hours and more hands on the day." },
  { title: "Venue type", body: "Tented weddings and private estates require building a venue from nothing — power, restrooms, rentals, rain plans. That is more production than a full-service venue." },
  { title: "Number of events", body: "Welcome parties, rehearsal dinners and brunches each add planning and on-site time. We price them clearly as add-ons." },
  { title: "Travel", body: "Our fees include travel within Connecticut. Weddings elsewhere in New England are welcome and quoted with travel included." },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
