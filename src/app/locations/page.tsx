import type { Metadata } from "next";
import Link from "next/link";
import { regions } from "@/content/locations";
import { Photo } from "@/components/Photo";
import { Breadcrumbs, Folio } from "@/components/Section";
import { ClosingCta } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Where We Plan — Connecticut Wedding Locations",
  description:
    "Wedding planning across Connecticut: Fairfield County, the shoreline, New Haven, Hartford County and the Litchfield Hills, plus New England by arrangement.",
  alternates: { canonical: "/locations" },
  openGraph: { url: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Locations", href: "/locations" }])} />
      <section className="container-page pb-16 pt-8 md:pt-12">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Locations" }]} />
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="display-xl max-w-[12ch] lg:col-span-8">Five regions. Five different weddings.</h1>
          <p className="lede text-ink/80 lg:col-span-4 lg:pb-2">
            Connecticut is small enough to cross in two hours and varied enough that every region plans differently. Here is what we know about each.
          </p>
        </div>
      </section>

      <section className="border-t border-ink/70">
        <ol className="container-page">
          {regions.map((r, i) => (
            <li key={r.slug} className="border-b hairline">
              <Link href={`/locations/${r.slug}`} className="group grid gap-6 py-10 md:grid-cols-12 md:items-center md:gap-10 md:py-12">
                <span className="eyebrow text-cranberry md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <div className="md:col-span-5">
                  <h2 className="font-serif text-[2.25rem] font-light leading-none transition-colors group-hover:text-cranberry md:text-[3rem]">{r.name}</h2>
                  <p className="mt-3 text-[1rem] text-granite">{r.townsShort}</p>
                </div>
                <p className="text-ink/75 md:col-span-4">{r.intro[0]!.split(". ")[0]}.</p>
                <div className="hidden md:col-span-2 md:block">
                  <Photo src={r.image.src} alt="" ratio="4/3" sizes="160px" focus={r.image.focus} />
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <div className="container-page grid gap-10 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Folio>Beyond Connecticut</Folio>
          </div>
          <div className="lg:col-span-7">
            <p className="display-sm font-light">Rhode Island, the Berkshires, Cape Cod and the islands are welcome by arrangement.</p>
            <p className="mt-6 text-ink/75">
              We quote New England weddings outside Connecticut with travel included, and we&rsquo;ll be candid about whether a local planner would
              serve you better. Mention your location in your inquiry.
            </p>
          </div>
        </div>
      </section>
      <ClosingCta placement="locations_closing" />
    </>
  );
}
