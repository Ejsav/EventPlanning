import type { Metadata } from "next";
import Link from "next/link";
import { packages, addOns, formatPrice } from "@/config/packages";
import { site } from "@/config/site";
import { Photo } from "@/components/Photo";
import { Breadcrumbs, Folio } from "@/components/Section";
import { Cta } from "@/components/Cta";
import { ClosingCta } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Wedding Planning Services in Connecticut",
  description:
    "Full-service planning, partial planning and wedding management (month-of coordination) across Connecticut, plus guest transportation. Published fees.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }])} />
      <section className="container-page pb-16 pt-8 md:pt-12">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Services" }]} />
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="display-xl max-w-[12ch] lg:col-span-8">The right amount of help, at the right moment.</h1>
          <p className="lede text-ink/80 lg:col-span-4 lg:pb-2">
            Three services that differ in when we join you and how much we carry — and share the same standard on the day itself.
          </p>
        </div>
      </section>

      {/* Alternating editorial spreads, one per service */}
      {packages.map((p, i) => (
        <section key={p.id} className="border-t hairline" aria-labelledby={`svc-${p.id}`}>
          <div className={`container-page grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:items-center lg:gap-16`}>
            <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <Photo src={p.image.src} alt={p.image.alt} ratio={i === 0 ? "4/5" : "5/4"} sizes="(min-width:1024px) 45vw, 100vw" priority={i === 0} focus="50% 45%" />
            </div>
            <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <p className="eyebrow text-cranberry">Service {["I", "II", "III"][i]} · {p.begins}</p>
              <h2 id={`svc-${p.id}`} className="display-lg mt-5">{p.name}</h2>
              <p className="mt-4 font-serif text-[1.375rem] italic text-granite">{p.promise}</p>
              <p className="mt-6 text-ink/80">{p.summary}</p>
              <ul className="mt-8 grid gap-x-8 gap-y-3 border-t hairline pt-6 sm:grid-cols-2">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-[1.0625rem] leading-snug text-ink/80">
                    <span className="mt-[0.7em] h-px w-3 shrink-0 bg-cranberry" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link href={p.href} className="btn btn-primary">
                  Explore {p.name}
                </Link>
                <span className="font-serif text-[1.25rem]">
                  <span className="eyebrow mr-1.5 text-granite">from</span>
                  {formatPrice(p.startingPrice)}
                </span>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Add-ons */}
      <section className="bg-harbor text-paper" aria-labelledby="addons-title">
        <div className="container-page grid gap-12 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Folio light>Beyond the wedding day</Folio>
            <h2 id="addons-title" className="display-md mt-6 max-w-[14ch]">The rest of the weekend, handled too.</h2>
            <p className="mt-6 text-paper/75">
              Our company began in event transportation, so guest logistics are something we take personally. Every add-on is priced
              clearly and can be paired with any service.
            </p>
          </div>
          <ul className="lg:col-span-8">
            {addOns.map((a) => (
              <li key={a.name} className="grid gap-2 border-t hairline-light py-6 md:grid-cols-12 md:gap-8">
                <h3 className="font-serif text-[1.375rem] leading-snug md:col-span-5">{a.name}</h3>
                <p className="text-[1.0625rem] text-paper/75 md:col-span-5">{a.description}</p>
                <p className="eyebrow text-seaglass md:col-span-2 md:text-right">{a.price}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page flex flex-col gap-6 py-16 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl font-serif text-[1.25rem] italic text-granite">
          Want to see every inclusion side by side — or answer three quick questions to find your fit?
        </p>
        <Cta href="/packages-and-pricing" variant="arrow" placement="services_compare">
          Packages &amp; pricing
        </Cta>
      </section>

      <ClosingCta placement="services_closing" secondary={{ href: "/approach", label: "How we work" }} body={`Not sure which service fits? That's what the first call is for. Tell us a little about your wedding and we'll reply ${site.responseTime}.`} />
    </>
  );
}
