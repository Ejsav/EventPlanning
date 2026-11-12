import type { Metadata } from "next";
import { packageById, formatPrice } from "@/config/packages";
import { partialScenarios, partialIncludes, partialSplit, partialFaqs } from "@/content/services";
import { Photo } from "@/components/Photo";
import { Breadcrumbs, Folio } from "@/components/Section";
import { Cta } from "@/components/Cta";
import { FaqList, ClosingCta } from "@/components/Blocks";
import { ServiceFacts, OtherServices } from "@/components/ServiceParts";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { site } from "@/config/site";

const p = packageById("partial");

export const metadata: Metadata = {
  title: "Partial Wedding Planning in Connecticut",
  description: `Partial wedding planning for Connecticut couples with a venue booked: vendor sourcing, design refinement, contracts and a wedding-day team. From ${formatPrice(p.startingPrice)}.`,
  alternates: { canonical: p.href },
  openGraph: { url: p.href, images: [{ url: p.image.src, alt: p.image.alt }] },
};

export default function PartialPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: p.name, href: p.href },
  ];
  return (
    <>
      <JsonLd data={[serviceSchema(p), breadcrumbSchema(crumbs), faqSchema(partialFaqs)]} />

      {/* Hero: wide image first, then a two-column statement */}
      <section className="pb-20 pt-8 md:pt-12 lg:pb-28">
        <div className="container-page">
          <Breadcrumbs items={crumbs.map((c, i) => (i === crumbs.length - 1 ? { name: c.name } : c))} />
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-cranberry">Service II</p>
              <h1 className="display-xl mt-4 max-w-[12ch]">Partial wedding planning</h1>
            </div>
            <p className="font-serif text-[1.5rem] italic leading-snug text-granite lg:col-span-5 lg:pb-3 lg:text-[1.75rem]">{p.promise}</p>
          </div>
        </div>
        <div className="container-page mt-12">
          <Photo src={p.image.src} alt={p.image.alt} ratio="21/9" sizes="(min-width:1440px) 1320px, 100vw" priority focus="50% 45%" className="[&>.plate]:aspect-[4/3] [&>.plate]:sm:!aspect-[21/9]" />
        </div>
        <div className="container-page mt-12 grid gap-10 lg:grid-cols-12">
          <p className="lede text-ink/80 lg:col-span-6">
            You&rsquo;ve booked the venue and found a few vendors you love. Now the list is long, the inbox is full and the wedding is
            starting to feel like work. We step in, fill the gaps and carry the plan to the finish — without taking the pen out of your hand.
          </p>
          <div className="lg:col-span-5 lg:col-start-8">
            <ServiceFacts id="partial" />
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Cta href="/contact" placement="partial_hero" service="partial">
                {site.primaryCta.label}
              </Cta>
            </div>
          </div>
        </div>
      </section>

      {/* Scenarios */}
      <section className="border-t hairline bg-linen">
        <div className="container-page py-20 md:py-28">
          <Folio number="01">Where couples are when they call</Folio>
          <ul className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-3">
            {partialScenarios.map((s, i) => (
              <li key={s.title} data-reveal style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}>
                <p className="font-serif text-[1.625rem] font-light italic leading-snug">{s.title}</p>
                <p className="mt-4 text-ink/75">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Yours / ours split */}
      <section>
        <div className="container-page py-24 md:py-32">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Folio number="02">A clear division</Folio>
            </div>
            <h2 className="display-lg max-w-[18ch] lg:col-span-8">You keep the vision. We take the weight.</h2>
          </div>
          <div className="mt-14 grid border-y border-ink/70 md:grid-cols-2">
            <div className="py-10 md:pr-12">
              <h3 className="eyebrow text-granite">Stays with you</h3>
              <ul className="mt-6 space-y-5">
                {partialSplit.yours.map((x) => (
                  <li key={x} className="font-serif text-[1.375rem] leading-snug">{x}</li>
                ))}
              </ul>
            </div>
            <div className="border-t hairline py-10 md:border-l md:border-t-0 md:pl-12">
              <h3 className="eyebrow text-cranberry">Becomes ours</h3>
              <ul className="mt-6 space-y-5">
                {partialSplit.ours.map((x) => (
                  <li key={x} className="font-serif text-[1.375rem] leading-snug">{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Includes */}
      <section className="border-t hairline">
        <div className="container-page grid gap-14 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Folio number="03">What&rsquo;s included</Folio>
              <h2 className="display-md mt-6 max-w-[14ch]">Everything it takes to finish well.</h2>
              <p className="mt-6 text-ink/75">
                Partial Planning starts at {formatPrice(p.startingPrice)} as a flat fee, with a 40% retainer to reserve your date. Travel
                within Connecticut is included.
              </p>
              <div className="mt-8 hidden lg:block">
                <Photo src="/images/hands-rings.jpg" alt="A couple's hands, wedding rings visible, resting on a bouquet of peach roses" ratio="4/5" sizes="(min-width:1024px) 28vw, 0px" focus="40% 50%" />
              </div>
            </div>
          </div>
          <div className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
            {partialIncludes.map((group, i) => (
              <div key={group.title} className="border-t border-ink/70 pb-12 pt-6" data-reveal>
                <p className="eyebrow text-cranberry">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-serif text-[1.75rem] font-light">{group.title}</h3>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[1.0625rem] leading-snug text-ink/80">
                      <span className="mt-[0.7em] h-px w-3 shrink-0 bg-ink/40" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t hairline bg-linen">
        <div className="container-page grid gap-12 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Folio number="04">Questions</Folio>
            <h2 className="display-md mt-6 max-w-[14ch]">Partial planning, answered.</h2>
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={partialFaqs} />
          </div>
        </div>
      </section>

      <OtherServices current="partial" />
      <ClosingCta
        placement="partial_closing"
        service="partial"
        title="Tell us what's booked — and what's keeping you up at night."
        body={`Share your date, venue and the vendors you already have. We'll reply ${site.responseTime} and tell you honestly whether Partial Planning or Wedding Management is the better fit.`}
      />
    </>
  );
}
