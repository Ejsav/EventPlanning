import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { Photo } from "@/components/Photo";
import { Breadcrumbs, Folio } from "@/components/Section";
import { Commitments, ClosingCta } from "@/components/Blocks";
import { Mark } from "@/components/Logo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Sound & Stone",
  description:
    "Sound & Stone is a Connecticut wedding planning company, a brand of New England Event Planners LLC built on event logistics experience.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "About", href: "/about" }])} />

      <section className="container-page pb-20 pt-8 md:pt-12">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />
        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end">
          <h1 className="display-xl max-w-[12ch] lg:col-span-8">Named for the water and the walls.</h1>
          <div className="flex items-end gap-6 lg:col-span-4">
            <Mark className="h-16 w-16 shrink-0 text-cranberry" />
            <p className="font-serif text-[1.125rem] italic leading-snug text-granite">A stone resting on the horizon of the Sound — structure and romance, in one mark.</p>
          </div>
        </div>
      </section>

      <section className="container-page">
        <Photo src="/images/couple-horizon.jpg" alt="A couple walking hand in hand across a hilltop meadow under a hazy sky" ratio="21/9" sizes="(min-width:1440px) 1320px, 100vw" priority focus="55% 60%" className="[&>.plate]:aspect-[4/3] [&>.plate]:sm:!aspect-[21/9]" />
      </section>

      <section>
        <div className="container-page grid gap-12 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Folio number="01">The name</Folio>
          </div>
          <div className="prose-editorial text-ink/85 lg:col-span-7">
            <p className="display-sm !mt-0 font-light text-ink">
              Connecticut is a state of two textures: the long, bright line of Long Island Sound, and the old fieldstone walls that run through
              its woods and fields from Greenwich to the Litchfield Hills.
            </p>
            <p>
              We named the company for both. The Sound is the romance of a New England wedding — the light, the water, the feeling of a weekend
              away. The stone is everything underneath it: the structure, the planning and the steadiness that let a celebration feel easy.
              Our job is to provide the second so you can enjoy the first.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t hairline bg-linen">
        <div className="container-page grid gap-12 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Folio number="02">Where we come from</Folio>
          </div>
          <div className="prose-editorial text-ink/85 lg:col-span-7">
            <h2 className="!mt-0">Built on logistics.</h2>
            <p>
              {site.name} is a brand of {site.legalEntity}, a Connecticut company whose work began in event logistics: coordinating
              transportation, schedules and vendors for celebrations across the state. That work teaches a particular kind of discipline —
              counting heads, confirming times, planning the route and always having a second plan.
            </p>
            <p>
              We started {site.name} to bring that discipline to the most important event most people will ever host, and to pair it with
              experienced wedding planners and a design sensibility worthy of Connecticut&rsquo;s most beautiful settings.
            </p>
            <h2>Honest about being new.</h2>
            <p>
              {site.name} is a new name. We won&rsquo;t show you reviews we haven&rsquo;t earned or weddings we didn&rsquo;t plan — the photography on
              this site is licensed inspiration, not a portfolio. Instead, we offer published pricing, written proposals, a lead planner you
              meet before you sign and commitments you can hold us to. As our own weddings happen, you&rsquo;ll see them here, with the
              couples&rsquo; permission.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container-page py-24 md:py-32">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Folio number="03">Our word</Folio>
            </div>
            <h2 className="display-lg max-w-[16ch] lg:col-span-8">What every couple can expect from us.</h2>
          </div>
          <Commitments className="mt-14" />
        </div>
      </section>

      <section className="border-t hairline">
        <div className="container-page grid gap-12 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Folio number="04">Company details</Folio>
          </div>
          <dl className="grid gap-x-12 sm:grid-cols-2 lg:col-span-8">
            {[
              ["Brand", site.name],
              ["Operating company", site.legalEntity],
              ["Based in", "Connecticut"],
              ["Service area", "Connecticut, with weddings across New England by arrangement"],
              ["Services", "Full-service planning, partial planning, wedding management, guest logistics"],
              ["Response time", `Every inquiry answered ${site.responseTime}`],
            ].map(([k, v]) => (
              <div key={k} className="border-t hairline py-5">
                <dt className="eyebrow text-granite">{k}</dt>
                <dd className="mt-2 font-serif text-[1.25rem] leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="container-page pb-20">
          <p className="font-serif italic text-granite">
            Read more about <Link href="/approach" className="text-ink underline decoration-cranberry/50 underline-offset-4 hover:decoration-cranberry">how we plan</Link> and{" "}
            <Link href="/approach#who" className="text-ink underline decoration-cranberry/50 underline-offset-4 hover:decoration-cranberry">who will plan your wedding</Link>.
          </p>
        </div>
      </section>

      <ClosingCta placement="about_closing" />
    </>
  );
}
