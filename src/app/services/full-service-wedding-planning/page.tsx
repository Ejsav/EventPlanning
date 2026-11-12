import type { Metadata } from "next";
import { packageById, formatPrice } from "@/config/packages";
import { fullServicePhases, fullServiceFaqs } from "@/content/services";
import { Photo } from "@/components/Photo";
import { Breadcrumbs, Folio } from "@/components/Section";
import { Cta } from "@/components/Cta";
import { FaqList, ClosingCta } from "@/components/Blocks";
import { ServiceFacts, OtherServices } from "@/components/ServiceParts";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { site } from "@/config/site";

const p = packageById("full-service");

export const metadata: Metadata = {
  title: "Full-Service Wedding Planner in Connecticut",
  description: `Full-service wedding planning in Connecticut: venue search, your full vendor team, design, guest logistics and the wedding weekend. From ${formatPrice(p.startingPrice)}.`,
  alternates: { canonical: p.href },
  openGraph: { url: p.href, images: [{ url: p.image.src, alt: p.image.alt }] },
};

const forYou = [
  "You haven't chosen a venue — or you're considering a private property or a tent.",
  "Your careers leave little room for a second, unpaid job planning a wedding.",
  "You want a cohesive, considered design without managing a dozen vendors to get it.",
  "Many of your guests are traveling, and you want them looked after.",
];

export default function FullServicePage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: p.name, href: p.href },
  ];
  return (
    <>
      <JsonLd data={[serviceSchema(p), breadcrumbSchema(crumbs), faqSchema(fullServiceFaqs)]} />

      {/* Hero: tall image right, editorial text left */}
      <section className="container-page grid gap-12 pb-20 pt-8 md:pt-12 lg:grid-cols-12 lg:gap-10 lg:pb-28">
        <div className="lg:col-span-6 lg:pt-6">
          <Breadcrumbs items={crumbs.map((c, i) => (i === crumbs.length - 1 ? { name: c.name } : c))} />
          <p className="eyebrow mt-10 text-cranberry">Service I</p>
          <h1 className="display-xl mt-4 max-w-[11ch]">Full-service wedding planning</h1>
          <p className="mt-6 font-serif text-[1.5rem] italic text-granite md:text-[1.75rem]">{p.promise}</p>
          <p className="lede mt-8 max-w-xl text-ink/80">
            For Connecticut couples who want the whole wedding designed, built and run for them. You make the decisions that matter;
            we carry every task behind them — from the first venue tour to the last guest&rsquo;s ride home.
          </p>
          <div className="mt-10 max-w-md">
            <ServiceFacts id="full-service" />
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Cta href="/contact" placement="full_service_hero" service="full-service">
              {site.primaryCta.label}
            </Cta>
            <Cta href="#included" variant="arrow" placement="full_service_hero_secondary">
              What&rsquo;s included
            </Cta>
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <Photo src={p.image.src} alt={p.image.alt} ratio="3/4" sizes="(min-width:1024px) 38vw, 100vw" priority focus="50% 40%" caption="A tented reception — the kind of wedding that is built from nothing." />
        </div>
      </section>

      {/* Is it for you */}
      <section className="border-t hairline bg-linen">
        <div className="container-page grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Folio number="01">Is it right for you?</Folio>
            <h2 className="display-md mt-6 max-w-[15ch]">The couples who get the most from full service.</h2>
          </div>
          <ul className="lg:col-span-7">
            {forYou.map((line) => (
              <li key={line} className="flex gap-5 border-t hairline py-6 font-serif text-[1.25rem] leading-snug md:text-[1.375rem]" data-reveal>
                <span className="mt-[0.6em] h-px w-6 shrink-0 bg-cranberry" aria-hidden="true" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Phases ledger */}
      <section id="included" className="scroll-mt-24">
        <div className="container-page py-24 md:py-32">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Folio number="02">What&rsquo;s included</Folio>
            </div>
            <div className="lg:col-span-8">
              <h2 className="display-lg max-w-[16ch]">Eighteen months, organized into six movements.</h2>
              <p className="mt-6 max-w-2xl text-ink/80">
                Every full-service engagement follows the same structure, so you always know what&rsquo;s happening now, what&rsquo;s next and
                what&rsquo;s already done.
              </p>
            </div>
          </div>
          <ol className="mt-16 grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
            {fullServicePhases.map((phase, i) => (
              <li key={phase.title} className="border-t border-ink/70 pb-12 pt-6" data-reveal style={{ ["--reveal-delay" as string]: `${(i % 3) * 90}ms` }}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-serif text-[2.5rem] font-light italic leading-none text-cranberry">{["I", "II", "III", "IV", "V", "VI"][i]}</span>
                  <span className="eyebrow text-granite">{phase.when}</span>
                </div>
                <h3 className="mt-6 font-serif text-[1.875rem] font-light">{phase.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {phase.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[1.0625rem] leading-snug text-ink/80">
                      <span className="mt-[0.7em] h-px w-3 shrink-0 bg-ink/40" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Image pair + investment */}
      <section className="bg-harbor text-paper">
        <div className="container-page grid gap-12 py-24 md:py-32 lg:grid-cols-12 lg:items-center">
          <div className="grid grid-cols-5 gap-4 lg:col-span-6">
            <Photo src="/images/table-candles.jpg" alt="Taper candles and blush garden roses on a reception table set with gold-rimmed glassware" ratio="3/4" sizes="(min-width:1024px) 22vw, 60vw" className="col-span-3" />
            <Photo src="/images/bouquet.jpg" alt="A bridal bouquet of peach and ivory roses with berries and eucalyptus" ratio="3/4" sizes="(min-width:1024px) 15vw, 40vw" className="col-span-2 mt-20" />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Folio number="03" light>
              Investment
            </Folio>
            <h2 className="display-md mt-6">One flat fee, written down before you sign.</h2>
            <p className="mt-6 text-paper/80">
              Full-Service Planning starts at {formatPrice(p.startingPrice)} for a wedding of up to about 150 guests at one venue. Larger
              guest counts, tented or private-estate productions and additional events are quoted clearly in your proposal. We never
              charge a percentage of your budget, and travel within Connecticut is included.
            </p>
            <p className="mt-4 text-paper/80">A 40% retainer reserves your date; the balance is scheduled across the planning months.</p>
            <div className="mt-10">
              <Cta href="/packages-and-pricing" variant="arrow" placement="full_service_investment">
                Compare all packages
              </Cta>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="container-page grid gap-12 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Folio number="04">Questions</Folio>
            <h2 className="display-md mt-6 max-w-[14ch]">Full-service, answered.</h2>
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={fullServiceFaqs} />
          </div>
        </div>
      </section>

      <OtherServices current="full-service" />
      <ClosingCta
        placement="full_service_closing"
        service="full-service"
        title={<>Begin with a conversation, not a commitment.</>}
        body={`Tell us your date or season, the setting you're imagining and roughly how many guests. We'll reply ${site.responseTime} to arrange a complimentary call.`}
      />
    </>
  );
}
