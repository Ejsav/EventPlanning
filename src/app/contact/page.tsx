import type { Metadata } from "next";
import { site } from "@/config/site";
import { timingOptions } from "@/lib/inquiry/schema";
import { deliveryStatus } from "@/lib/inquiry/delivery";
import { InquiryForm } from "@/components/InquiryForm";
import { Breadcrumbs } from "@/components/Section";
import { Photo } from "@/components/Photo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

// Re-render daily so the season choices in the form stay current.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Inquire — Tell Us About Your Wedding",
  description: `Inquire about wedding planning or management in Connecticut. Share your date and the help you need; we reply ${site.responseTime}.`,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

const next = [
  { title: "A personal reply", body: `A planner — not an autoresponder — replies ${site.responseTime}.` },
  { title: "A 30-minute call", body: "Complimentary and unhurried. We listen, ask the right questions and tell you honestly which service fits." },
  { title: "A written proposal", body: "A clear scope and a flat fee, plus an introduction to the lead planner who would run your wedding." },
];

export default function ContactPage() {
  const status = deliveryStatus();
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Inquire", href: "/contact" }])} />
      <section className="container-page pb-24 pt-8 md:pt-12">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Inquire" }]} />
        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-0">
          <div className="lg:col-span-5 lg:row-start-1">
            <h1 className="display-xl max-w-[10ch]">Tell us about your wedding.</h1>
            <p className="lede mt-7 max-w-md text-ink/80">Two minutes now. A thoughtful, personal reply {site.responseTime}. No obligation, ever.</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <InquiryForm available={status.ready} devMode={status.devStore} timingChoices={timingOptions()} />
          </div>
          <div className="lg:col-span-5 lg:row-start-2 lg:pt-12">
            <p className="eyebrow text-granite">What happens next</p>
            <ol className="mt-4 border-t border-ink/70">
              {next.map((n, i) => (
                <li key={n.title} className="grid grid-cols-[2.5rem_1fr] border-b hairline py-5">
                  <span className="font-serif text-[1.25rem] italic text-cranberry">{i + 1}</span>
                  <div>
                    <p className="font-serif text-[1.25rem] leading-snug">{n.title}</p>
                    <p className="mt-1 text-[1rem] text-ink/75">{n.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            {(site.contact.email || site.contact.phone) && (
              <div className="mt-10">
                <p className="eyebrow text-granite">Prefer to write directly?</p>
                <ul className="mt-3 space-y-1 font-serif text-[1.125rem]">
                  {site.contact.email && (
                    <li>
                      <a href={`mailto:${site.contact.email}`} className="underline decoration-cranberry/50 underline-offset-4 hover:decoration-cranberry">
                        {site.contact.email}
                      </a>
                    </li>
                  )}
                  {site.contact.phone && <li>{site.contact.phone}</li>}
                </ul>
              </div>
            )}

            <div className="mt-12 hidden lg:block">
              <Photo src="/images/table-soft.jpg" alt="Round reception tables set with linen, glassware and soft peach roses" ratio="16/10" sizes="(min-width:1024px) 34vw, 0px" focus="50% 60%" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
