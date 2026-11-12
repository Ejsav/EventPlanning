import type { Metadata } from "next";
import { packages, addOns, paymentTerms, feeDrivers, formatPrice } from "@/config/packages";
import { site } from "@/config/site";
import type { Faq } from "@/content/shared";
import { Breadcrumbs, Folio } from "@/components/Section";
import { FaqList, ClosingCta } from "@/components/Blocks";
import { ComparisonTable, PackageGuide } from "@/components/PricingInteractive";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Wedding Planner Packages & Pricing — Connecticut",
  description: `Published Connecticut wedding planner pricing, flat fees: Wedding Management from ${formatPrice(packages[2]!.startingPrice)}, Partial Planning from ${formatPrice(packages[1]!.startingPrice)}, Full-Service from ${formatPrice(packages[0]!.startingPrice)}.`,
  alternates: { canonical: "/packages-and-pricing" },
  openGraph: { url: "/packages-and-pricing" },
};

const pricingFaqs: Faq[] = [
  { q: "Why do you publish your prices?", a: "Because you deserve to know whether we fit your budget before you spend time on a call. Starting fees are honest starting points; your exact fee is confirmed in a written proposal." },
  { q: "Do your fees include the cost of vendors?", a: "No. Our fee covers planning and management only. You contract and pay your vendors directly, and we track every payment in your shared budget." },
  { q: "Are your fees negotiable?", a: "Our fees reflect the hours and staffing your wedding needs, and we'd rather adjust scope than quality. If budget is tight, we'll tell you honestly whether a lighter service would serve you well." },
  { q: "Is the introductory call free?", a: "Yes. The introductory call is complimentary and carries no obligation." },
  { q: "What if we need to postpone or cancel?", a: "Your agreement sets out postponement and cancellation terms clearly before you sign. Because the retainer reserves a date for which we decline other weddings, it is generally non-refundable; we always try to accommodate postponements where our calendar allows." },
  { q: "Do you charge for travel?", a: "Travel within Connecticut is included in every fee. Weddings elsewhere in New England are quoted with travel included, so there are no surprises later." },
];

export default function PricingPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Packages & Pricing", href: "/packages-and-pricing" },
  ];
  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(pricingFaqs)]} />

      <section className="container-page pb-16 pt-8 md:pt-12">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Packages & Pricing" }]} />
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h1 className="display-xl max-w-[12ch]">Packages &amp; pricing, in the open.</h1>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="lede text-ink/80">
              Flat fees, not a percentage of your budget. Every wedding day staffed with at least two planners. And a number in writing before
              you sign.
            </p>
          </div>
        </div>

        {/* Price ledger */}
        <ul className="mt-16 grid border-t border-ink/70 md:grid-cols-3">
          {packages.map((p, i) => (
            <li key={p.id} className={`flex flex-col border-b hairline py-8 md:border-b-0 md:py-10 ${i > 0 ? "md:border-l md:pl-8" : ""} ${i < 2 ? "md:pr-8" : ""}`}>
              <p className="eyebrow text-granite">{p.begins}</p>
              <h2 className="mt-4 font-serif text-[2rem] font-light leading-tight">{p.name}</h2>
              <p className="mt-3 font-serif text-[3rem] font-light leading-none">
                <span className="eyebrow mr-2 align-middle text-granite">from</span>
                {formatPrice(p.startingPrice)}
              </p>
              <p className="mt-5 flex-1 text-[1.0625rem] leading-relaxed text-ink/75">{p.forWhom}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Cta href="/contact" placement={`pricing_ledger_${p.id}`} service={p.id} variant={p.id === "partial" ? "primary" : "outline"}>
                  Inquire
                </Cta>
                <Cta href={p.href} variant="arrow" placement={`pricing_ledger_details_${p.id}`}>
                  Details
                </Cta>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Guide */}
      <section id="guide" className="scroll-mt-24 border-t hairline bg-linen">
        <div className="container-page py-20 md:py-28">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Folio number="01">Find your fit</Folio>
            </div>
            <h2 className="display-md max-w-[20ch] lg:col-span-8">Three questions. One honest suggestion.</h2>
          </div>
          <div className="mt-12">
            <PackageGuide />
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="compare" className="scroll-mt-24">
        <div className="container-page py-24 md:py-32">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Folio number="02">Side by side</Folio>
            </div>
            <h2 className="display-md max-w-[20ch] lg:col-span-8">Everything included, compared.</h2>
          </div>
          <div className="mt-14">
            <ComparisonTable />
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section id="add-ons" className="scroll-mt-24 bg-harbor text-paper">
        <div className="container-page grid gap-12 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Folio number="03" light>
              Add-ons
            </Folio>
            <h2 className="display-md mt-6 max-w-[14ch]">For the rest of the weekend.</h2>
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

      {/* Fee drivers + terms */}
      <section>
        <div className="container-page grid gap-16 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Folio number="04">What shapes your fee</Folio>
            <dl className="mt-10">
              {feeDrivers.map((d) => (
                <div key={d.title} className="border-t hairline py-6">
                  <dt className="font-serif text-[1.5rem]">{d.title}</dt>
                  <dd className="mt-2 text-ink/75">{d.body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Folio number="05">Terms, plainly</Folio>
            <ol className="mt-10 border-t border-ink/70">
              {paymentTerms.map((t, i) => (
                <li key={t} className="grid grid-cols-[2.5rem_1fr] border-b hairline py-5">
                  <span className="font-serif italic text-cranberry">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-ink/85">{t}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="questions" className="scroll-mt-24 border-t hairline">
        <div className="container-page grid gap-12 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Folio number="06">Questions</Folio>
            <h2 className="display-md mt-6 max-w-[14ch]">About fees and terms.</h2>
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={pricingFaqs} />
          </div>
        </div>
      </section>

      <ClosingCta placement="pricing_closing" body={`Tell us your date and the help you think you need. We'll reply ${site.responseTime} with honest guidance and, if we're a fit, a written proposal.`} />
    </>
  );
}
