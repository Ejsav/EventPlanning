import { packages } from "./packages";

export const primaryNav = [
  { label: "Services", href: "/services", children: packages.map((p) => ({ label: p.name, href: p.href, note: p.promise })) },
  { label: "Pricing", href: "/packages-and-pricing" },
  { label: "Approach", href: "/approach" },
  { label: "Locations", href: "/locations" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
] as const;
