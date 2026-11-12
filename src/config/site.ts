/**
 * Central business configuration.
 *
 * Anything that is a real-world fact about the business (contact details,
 * scheduling links, response-time promise) is read from environment variables
 * so nothing unverified is ever hard-coded into the public site. When a value
 * is not configured, the UI simply omits it.
 */
// NEXT_PUBLIC_* values must be read with literal `process.env.NAME` access so
// Next.js can inline them into client bundles.
const clean = (value: string | undefined) => (value && value.trim().length > 0 ? value.trim() : undefined);

export const site = {
  name: "Sound & Stone",
  descriptor: "Wedding Planning & Management",
  legalEntity: "New England Event Planners LLC",
  url: (clean(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://soundandstoneweddings.com").replace(/\/$/, ""),
  region: "Connecticut",
  serviceAreaSummary: "Planning and managing weddings throughout Connecticut, from Greenwich to Stonington.",
  tagline: "Every detail considered. Every hour accounted for.",
  description:
    "Sound & Stone plans and manages weddings across Connecticut — Fairfield County, the shoreline, New Haven, Hartford County and the Litchfield Hills. Full-service planning, partial planning and wedding management with published pricing.",
  /** Public business contact details. Leave unset until real accounts exist. */
  contact: {
    email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    phone: clean(process.env.NEXT_PUBLIC_CONTACT_PHONE),
    instagram: clean(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    pinterest: clean(process.env.NEXT_PUBLIC_PINTEREST_URL),
  },
  /** Optional booking link (Calendly, HoneyBook scheduler, etc.) offered after a successful inquiry. */
  schedulingUrl: clean(process.env.NEXT_PUBLIC_SCHEDULING_URL),
  /** Operating promise shown across the site. Change it here if the commitment changes. */
  responseTime: "within one business day",
  primaryCta: { label: "Inquire about your wedding", href: "/contact" },
} as const;

export type Site = typeof site;
