import type { Metadata } from "next";
import { packageById, formatPrice } from "@/config/packages";
import { managementWeeks, sampleRunOfShow, managementFaqs } from "@/content/services";
import { Photo } from "@/components/Photo";
import { Breadcrumbs, Folio } from "@/components/Section";
import { Cta } from "@/components/Cta";
import { FaqList, ClosingCta } from "@/components/Blocks";
import { ServiceFacts, OtherServices } from "@/components/ServiceParts";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { site } from "@/config/site";

const p = packageById("management");

export const metadata: Metadata = {
  title: "Wedding Management & Month-of Coordination, CT",
  description: `Month-of wedding coordination in Connecticut, done properly: we start 10–12 weeks out, confirm every vendor and run your day with two planners. From ${formatPrice(p.startingPrice)}.`,
  alternates: { canonical: p.href },
  openGraph: { url: p.href, images: [{ url: p.image.src, alt: p.image.alt }] },
};

export default function ManagementPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: p.name, href: p.href },
  ];
  return (
    <>
      <JsonLd data={[serviceSchema(p), breadcrumbSchema(crumbs), faqSchema(managementFaqs)]} />

      {/* Hero: dark, typographic, with the run of show as the visual */}
      <section className="bg-harbor text-paper">
        <div className="container-page grid gap-14 pb-20 pt-8 md:pt-12 lg:grid-cols-12 lg:pb-28">
          <div className="lg:col-span-7">
            <Breadcrumbs light items={crumbs.map((c, i) => (i === crumbs.length - 1 ? { name: c.name } : c))} />
            <p className="eyebrow mt-10 text-seaglass">Service III · Also known as month-of coordination</p>
            <h1 className="display-xl mt-4 max-w-[10ch]">
              You planned it. <em className="font-light italic text-mist">We&rsquo;ll run it.</em>
            </h1>
            <p className="lede mt-8 max-w-xl text-paper/80">
              Wedding management for Connecticut couples who have done the planning and want professionals to finalize it, confirm it and
              run the day — so you can be a guest at your own wedding.
            </p>
            <div className="mt-10 max-w-md">
              <ServiceFacts id="management" light />
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Cta href="/contact" variant="light" placement="management_hero" service="management">
                {site.primaryCta.label}
              </Cta>
              <Cta href="#run-of-show" variant="arrow" placement="management_hero_secondary">
                See a sample day
              </Cta>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Photo src={p.image.src} alt={p.image.alt} ratio="4/5" sizes="(min-width:1024px) 38vw, 100vw" priority focus="45% 55%" />
          </div>
        </div>
      </section>

      {/* Why not day-of */}
      <section>
        <div className="container-page grid gap-12 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Folio number="01">Why twelve weeks</Folio>
          </div>
          <div className="lg:col-span-8">
            <p className="display-md max-w-[24ch] font-light">
              A coordinator who arrives on the morning of the wedding can follow a plan. They can&rsquo;t fix one.
            </p>
            <div className="mt-10 grid gap-8 text-ink/80 md:grid-cols-2">
              <p>
                Most wedding-day problems are visible weeks ahead: a timeline with no room for photos, a rental order that doesn&rsquo;t match
                the floor plan, a vendor who assumed someone else was handling the rain plan.
              </p>
              <p>
                That&rsquo;s why Wedding Management begins ten to twelve weeks before your wedding. It gives us time to audit the plan, talk to
                every vendor and build a run of show everyone has agreed to — before anyone unloads a van.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="border-t hairline bg-linen">
        <div className="container-page py-24 md:py-32">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Folio number="02">The countdown</Folio>
            </div>
            <h2 className="display-lg max-w-[16ch] lg:col-span-8">Twelve weeks, step by step.</h2>
          </div>
          <ol className="mt-14 border-t border-ink/70">
            {managementWeeks.map((w) => (
              <li key={w.title} className="grid gap-3 border-b hairline py-7 md:grid-cols-12 md:items-baseline md:gap-8" data-reveal>
                <span className="font-serif text-[1.375rem] italic text-cranberry md:col-span-2">{w.when}</span>
                <h3 className="font-serif text-[1.5rem] md:col-span-4">{w.title}</h3>
                <p className="text-ink/75 md:col-span-6">{w.body}</p>
              </li>
            ))}
            <li className="grid gap-3 py-7 md:grid-cols-12 md:items-baseline md:gap-8">
              <span className="font-serif text-[1.375rem] italic text-cranberry md:col-span-2">The day</span>
              <h3 className="font-serif text-[1.5rem] md:col-span-4">Your wedding</h3>
              <p className="text-ink/75 md:col-span-6">Lead planner and assistant on site for up to twelve hours, from vendor load-in to the last guest out.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* Sample run of show */}
      <section id="run-of-show" className="scroll-mt-24">
        <div className="container-page grid gap-14 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Folio number="03">A sample run of show</Folio>
              <h2 className="display-md mt-6 max-w-[14ch]">What a wedding day looks like on paper.</h2>
              <p className="mt-6 text-ink/75">
                Every wedding we manage runs from a document like this — expanded to include every vendor&rsquo;s arrival, contact and
                requirement, and shared with all of them the week before.
              </p>
              <p className="mt-4 font-serif text-[0.95rem] italic text-granite">An illustrative example for a 5:00 p.m. ceremony. Yours is built around your venue, your vendors and your sunset.</p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="border border-ink/70 bg-paper p-6 shadow-[12px_12px_0_0_var(--color-linen)] md:p-10">
              <div className="flex items-baseline justify-between border-b border-ink/70 pb-4">
                <p className="eyebrow">Run of show — Saturday</p>
                <p className="eyebrow text-granite">Sample</p>
              </div>
              <table className="mt-2 w-full border-collapse">
                <caption className="sr-only">Sample wedding-day run of show</caption>
                <thead className="sr-only">
                  <tr>
                    <th scope="col">Time</th>
                    <th scope="col">What happens</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleRunOfShow.map(([time, what]) => (
                    <tr key={time} className="border-b hairline last:border-0">
                      <th scope="row" className="w-20 py-3.5 pr-4 text-left align-baseline font-sans text-[0.875rem] font-medium tabular-nums tracking-wider text-cranberry md:w-24">
                        {time}
                      </th>
                      <td className="py-3.5 align-baseline text-[1.0625rem] leading-snug">{what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t hairline">
        <div className="container-page grid gap-12 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Folio number="04">Questions</Folio>
            <h2 className="display-md mt-6 max-w-[14ch]">Wedding management, answered.</h2>
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={managementFaqs} />
          </div>
        </div>
      </section>

      <OtherServices current="management" />
      <ClosingCta
        placement="management_closing"
        service="management"
        title="Reserve your date now. We'll start when it's time."
        body={`Wedding Management begins ten to twelve weeks out, but peak-season Saturdays fill months earlier. Tell us your date and venue and we'll reply ${site.responseTime}.`}
      />
    </>
  );
}
