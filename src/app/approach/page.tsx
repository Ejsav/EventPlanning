import type { Metadata } from "next";
import { site } from "@/config/site";
import { Photo } from "@/components/Photo";
import { Breadcrumbs, Folio } from "@/components/Section";
import { ProcessTimeline, ClosingCta } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Our Approach to Wedding Planning",
  description:
    "How Sound & Stone plans Connecticut weddings: a clear process, written documents at every stage, vetted lead planners, open budgets and early weather plans.",
  alternates: { canonical: "/approach" },
  openGraph: { url: "/approach" },
};

const principles = [
  { title: "Decisions are yours. Work is ours.", body: "We bring options, recommendations and the reasoning behind them. You choose. Nothing is booked, signed or spent without your approval." },
  { title: "If it isn't written down, it isn't planned.", body: "Every plan lives in documents you can see: a calendar, a budget, a vendor directory, a floor plan and a run of show. Memory is not a system." },
  { title: "Plan for the weather you don't want.", body: "Every outdoor element has a written alternative and a decision deadline, so a forecast becomes a choice rather than a crisis." },
  { title: "Your guests are our guests.", body: "Directions that make sense, shuttles that run on time, a seat for everyone who needs one. Hospitality is logistics done with care." },
];

const documents = [
  { name: "Planning calendar", body: "Every decision and deadline from today to the wedding, in order." },
  { name: "Live budget", body: "Quotes, contracts, deposits, due dates and the costs couples forget." },
  { name: "Vendor directory", body: "Every contact, contract term, arrival time and requirement in one place." },
  { name: "Floor plan", body: "Ceremony, cocktail hour, reception and the rain plan, drawn to scale." },
  { name: "Production schedule", body: "Who arrives when, what they bring and what they need from the venue." },
  { name: "Run of show", body: "The minute-by-minute wedding day, confirmed by every vendor the week before." },
];

const vetting = [
  "Has independently led weddings as the lead planner or coordinator — not only assisted",
  "Provides professional references, which we contact",
  "Carries appropriate professional liability insurance",
  "Works from our documents, timelines and communication standards",
  "Meets you before you sign, and leads your wedding day",
];

export default function ApproachPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Our Approach", href: "/approach" }])} />

      <section className="container-page pb-20 pt-8 md:pt-12 lg:pb-28">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Our Approach" }]} />
        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="display-xl max-w-[11ch]">A calm wedding is a planned one.</h1>
            <p className="lede mt-8 max-w-xl text-ink/80">
              There&rsquo;s no secret to a wedding that feels effortless. There is a method: decide early, write everything down, confirm it
              twice and put experienced people where the pressure is. This is ours.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-5">
            <Photo src="/images/dress-window.jpg" alt="A wedding dress hanging in a bay window between grey-green curtains" ratio="3/4" sizes="(min-width:1024px) 20vw, 50vw" priority focus="50% 50%" />
            <Photo src="/images/notebook.jpg" alt="A fountain pen resting on an open notebook" ratio="3/4" sizes="(min-width:1024px) 20vw, 50vw" className="mt-12" focus="60% 50%" />
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t hairline">
        <div className="container-page py-24 md:py-32">
          <Folio number="01">Principles</Folio>
          <ol className="mt-12">
            {principles.map((p, i) => (
              <li key={p.title} className="grid gap-4 border-t hairline py-10 md:grid-cols-12 md:gap-8" data-reveal>
                <span className="font-serif text-[2.5rem] font-light italic leading-none text-cranberry md:col-span-1">{i + 1}</span>
                <h2 className="display-sm md:col-span-6">{p.title}</h2>
                <p className="text-ink/75 md:col-span-5">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Process */}
      <section className="bg-harbor text-paper">
        <div className="container-page py-24 md:py-32">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <Folio number="02" light>
                The process
              </Folio>
            </div>
            <h2 className="display-lg max-w-[18ch] lg:col-span-9">Six steps from first message to the morning after.</h2>
          </div>
          <div className="mt-16">
            <ProcessTimeline dark />
          </div>
        </div>
      </section>

      {/* Documents */}
      <section>
        <div className="container-page grid gap-14 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Folio number="03">What you&rsquo;ll hold</Folio>
            <h2 className="display-md mt-6 max-w-[13ch]">Six documents that carry a wedding.</h2>
            <p className="mt-6 text-ink/75">Shared with you in a single planning workspace, updated as decisions are made, and handed to every vendor who needs them.</p>
          </div>
          <dl className="grid gap-px bg-ink/15 sm:grid-cols-2 lg:col-span-8">
            {documents.map((d, i) => (
              <div key={d.name} className="bg-paper p-6 md:p-8" data-reveal style={{ ["--reveal-delay" as string]: `${(i % 2) * 90}ms` }}>
                <dt className="flex items-baseline gap-3">
                  <span className="eyebrow text-cranberry">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-[1.5rem]">{d.name}</span>
                </dt>
                <dd className="mt-3 text-[1.0625rem] text-ink/75">{d.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Who plans */}
      <section id="who" className="scroll-mt-24 border-t hairline bg-linen">
        <div className="container-page grid gap-14 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Photo src="/images/hands-shadow.jpg" alt="Two hands meeting in a gentle hold, their shadows falling across the grass" ratio="4/5" sizes="(min-width:1024px) 40vw, 100vw" focus="55% 45%" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Folio number="04">Who will plan your wedding</Folio>
            <h2 className="display-md mt-6">An experienced lead planner — and you&rsquo;ll meet them first.</h2>
            <p className="mt-6 text-ink/80">
              {site.name} works with a team of experienced, independent wedding professionals. Each wedding has one lead planner from
              proposal to load-out, supported by assistants on the day. We hold every planner to the same standards:
            </p>
            <ul className="mt-8 border-t border-ink/70">
              {vetting.map((v) => (
                <li key={v} className="flex gap-4 border-b hairline py-4 text-[1.0625rem]">
                  <span className="mt-[0.7em] h-px w-4 shrink-0 bg-cranberry" aria-hidden="true" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Budget + weather */}
      <section>
        <div className="container-page grid gap-16 py-24 md:py-32 md:grid-cols-2">
          <div>
            <Folio number="05">Your budget</Folio>
            <h2 className="display-sm mt-6">Money handled in the open.</h2>
            <div className="prose-editorial mt-6 text-ink/80">
              <p>You pay vendors directly; we never hold your vendor funds. We build a live budget that shows every quote, contract, deposit and due date, including service charges, taxes, gratuities and overtime that catch couples out.</p>
              <p>We recommend vendors on merit. If a referral arrangement ever exists, it is disclosed to you in writing.</p>
            </div>
          </div>
          <div>
            <Folio number="06">The weather</Folio>
            <h2 className="display-sm mt-6">A rain plan made in March, not on the morning.</h2>
            <div className="prose-editorial mt-6 text-ink/80">
              <p>Every outdoor element of your wedding has a written alternative — a tent hold, an indoor room, a revised timeline — and a decision deadline agreed with your vendors.</p>
              <p>When the forecast turns, you make one calm decision. We handle every call that follows.</p>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta placement="approach_closing" secondary={{ href: "/packages-and-pricing", label: "See packages & pricing" }} />
    </>
  );
}
