import { site } from "@/config/site";
import { packages, type ServicePackage } from "@/config/packages";

/**
 * Structured data helpers. Deliberately conservative: no ratings, reviews,
 * street address or opening hours are published because none are verified.
 */

const areaServed = [
  { "@type": "State", name: "Connecticut" },
  { "@type": "AdministrativeArea", name: "Fairfield County, Connecticut" },
  { "@type": "AdministrativeArea", name: "New Haven County, Connecticut" },
  { "@type": "AdministrativeArea", name: "Hartford County, Connecticut" },
  { "@type": "AdministrativeArea", name: "Litchfield County, Connecticut" },
  { "@type": "AdministrativeArea", name: "Middlesex County, Connecticut" },
  { "@type": "AdministrativeArea", name: "New London County, Connecticut" },
];

export function organizationSchema() {
  const sameAs = [site.contact.instagram, site.contact.pinterest].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    image: `${site.url}/og.jpg`,
    slogan: site.tagline,
    parentOrganization: { "@type": "Organization", name: site.legalEntity },
    areaServed,
    priceRange: "$$$",
    knowsAbout: ["Wedding planning", "Wedding coordination", "Wedding management", "Event logistics", "Guest transportation"],
    ...(site.contact.email ? { email: site.contact.email } : {}),
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Wedding planning services",
      itemListElement: packages.map((p) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: p.name, url: `${site.url}${p.href}` },
        priceSpecification: { "@type": "PriceSpecification", minPrice: p.startingPrice, priceCurrency: "USD" },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    publisher: { "@id": `${site.url}/#business` },
    inLanguage: "en-US",
  };
}

export function serviceSchema(p: ServicePackage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: p.name,
    serviceType: p.name,
    description: p.summary,
    url: `${site.url}${p.href}`,
    provider: { "@id": `${site.url}/#business` },
    areaServed,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      priceSpecification: { "@type": "PriceSpecification", minPrice: p.startingPrice, priceCurrency: "USD" },
      url: `${site.url}${p.href}`,
    },
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.href}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function articleSchema(a: { title: string; description: string; slug: string; published: string; updated?: string; image: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    image: `${site.url}${a.image}`,
    datePublished: a.published,
    dateModified: a.updated ?? a.published,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@id": `${site.url}/#business` },
    mainEntityOfPage: `${site.url}/journal/${a.slug}`,
  };
}
