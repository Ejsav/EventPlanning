import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/content/journal";
import { Photo } from "@/components/Photo";
import { Breadcrumbs, Folio } from "@/components/Section";
import { ClosingCta } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Journal: Connecticut Wedding Planning Guides",
  description:
    "Honest guides for Connecticut couples: what a wedding planner costs, how much help you need, when to hire one and how to plan guest transportation.",
  alternates: { canonical: "/journal" },
  openGraph: { url: "/journal" },
};

const fmt = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export default function JournalPage() {
  const [lead, ...rest] = articles;
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Journal", href: "/journal" }])} />
      <section className="container-page pb-12 pt-8 md:pt-12">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Journal" }]} />
        <div className="mt-10 grid gap-8 border-b border-ink/70 pb-10 lg:grid-cols-12 lg:items-end">
          <h1 className="display-xl lg:col-span-7">The Journal</h1>
          <p className="lede text-ink/80 lg:col-span-5 lg:pb-2">
            Honest, practical guidance for planning a Connecticut wedding — the questions couples ask us, answered in full.
          </p>
        </div>
      </section>

      {lead && (
        <section className="container-page pb-20">
          <Link href={`/journal/${lead.slug}`} className="group grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-7">
              <Photo src={lead.image.src} alt={lead.image.alt} ratio="16/10" sizes="(min-width:1024px) 55vw, 100vw" priority focus={lead.image.focus} />
            </div>
            <div className="lg:col-span-5">
              <p className="eyebrow text-cranberry">{lead.category} · {lead.readMinutes} min read</p>
              <h2 className="display-md mt-4 transition-colors group-hover:text-cranberry">{lead.title}</h2>
              <p className="mt-5 text-ink/75">{lead.dek}</p>
              <p className="eyebrow mt-6 text-granite">{fmt(lead.published)}</p>
            </div>
          </Link>
        </section>
      )}

      <section className="border-t hairline">
        <div className="container-page py-20">
          <Folio>More guides</Folio>
          <ul className="mt-10 grid gap-x-10 gap-y-14 md:grid-cols-3">
            {rest.map((a) => (
              <li key={a.slug}>
                <Link href={`/journal/${a.slug}`} className="group block">
                  <Photo src={a.image.src} alt={a.image.alt} ratio="4/3" sizes="(min-width:768px) 30vw, 100vw" focus={a.image.focus} />
                  <p className="eyebrow mt-5 text-cranberry">{a.category} · {a.readMinutes} min</p>
                  <h3 className="mt-3 font-serif text-[1.625rem] leading-tight transition-colors group-hover:text-cranberry">{a.title}</h3>
                  <p className="mt-3 text-[1.0625rem] text-ink/75">{a.dek}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t hairline bg-linen">
        <div className="container-page grid gap-6 py-16 md:grid-cols-12 md:items-center">
          <p className="font-serif text-[1.375rem] leading-snug md:col-span-8">
            Real weddings will appear here as they happen — always with the couple&rsquo;s permission, and never borrowed from anyone else.
          </p>
          <p className="eyebrow text-granite md:col-span-4 md:text-right">Wedding features · coming as earned</p>
        </div>
      </section>

      <ClosingCta placement="journal_closing" />
    </>
  );
}
