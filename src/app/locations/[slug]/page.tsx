import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { regions, regionBySlug } from "@/content/locations";
import { packages, formatPrice } from "@/config/packages";
import { site } from "@/config/site";
import { Photo } from "@/components/Photo";
import { Breadcrumbs, Folio } from "@/components/Section";
import { Cta } from "@/components/Cta";
import { FaqList, ClosingCta } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return regions.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = regionBySlug(slug);
  if (!r) return {};
  return {
    title: r.metaTitle,
    description: r.metaDescription,
    alternates: { canonical: `/locations/${r.slug}` },
    openGraph: { url: `/locations/${r.slug}`, title: r.metaTitle, description: r.metaDescription, images: [{ url: r.image.src, alt: r.image.alt }] },
  };
}

export default async function RegionPage({ params }: Props) {
  const { slug } = await params;
  const r = regionBySlug(slug);
  if (!r) notFound();
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Locations", href: "/locations" },
    { name: r.name, href: `/locations/${r.slug}` },
  ];
  const others = regions.filter((x) => x.slug !== r.slug);

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(r.faqs)]} />

      <section className="container-page pb-16 pt-8 md:pt-12">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Locations", href: "/locations" }, { name: r.name }]} />
        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-cranberry">{r.townsShort}</p>
            <h1 className="display-xl mt-5 max-w-[12ch]">{r.headline}</h1>
            <div className="mt-8 max-w-xl space-y-5 text-ink/80">
              {r.intro.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Cta href="/contact" placement={`location_hero_${r.slug}`}>
                {site.primaryCta.label}
              </Cta>
              <Cta href="/packages-and-pricing" variant="arrow" placement={`location_hero_pricing_${r.slug}`}>
                Packages &amp; pricing
              </Cta>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Photo src={r.image.src} alt={r.image.alt} ratio="4/5" sizes="(min-width:1024px) 38vw, 100vw" priority focus={r.image.focus} />
          </div>
        </div>
      </section>

      {/* Settings */}
      <section className="border-t hairline">
        <div className="container-page py-20 md:py-28">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Folio number="01">The settings</Folio>
            </div>
            <h2 className="display-md max-w-[20ch] lg:col-span-8">Where {r.name.replace(/^The /, "the ")} weddings happen.</h2>
          </div>
          <ul className="mt-12 grid gap-x-10 md:grid-cols-3">
            {r.settings.map((s, i) => (
              <li key={s.name} className="border-t border-ink/70 pb-10 pt-6" data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
                <h3 className="font-serif text-[1.625rem] font-light leading-tight">{s.name}</h3>
                <p className="mt-4 text-[1.0625rem] text-ink/75">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Logistics */}
      <section className="bg-harbor text-paper">
        <div className="container-page grid gap-12 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Folio number="02" light>
              Local knowledge
            </Folio>
            <h2 className="display-md mt-6 max-w-[14ch]">What we plan for here.</h2>
            <p className="mt-6 text-paper/75">{r.season}</p>
          </div>
          <dl className="lg:col-span-8">
            {r.logistics.map((l) => (
              <div key={l.title} className="grid gap-2 border-t hairline-light py-7 md:grid-cols-12 md:gap-8">
                <dt className="font-serif text-[1.375rem] leading-snug md:col-span-5">{l.title}</dt>
                <dd className="text-paper/75 md:col-span-7">{l.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Services here */}
      <section>
        <div className="container-page grid gap-12 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Folio number="03">Our services in {r.name.replace(/^The /, "the ")}</Folio>
            <p className="mt-6 text-ink/80">{r.servicesNote}</p>
            <p className="mt-6 font-serif italic text-granite">Towns we serve include {r.towns.join(", ")} and the surrounding area.</p>
          </div>
          <ul className="lg:col-span-6 lg:col-start-7">
            {packages.map((p) => (
              <li key={p.id} className="border-t hairline last:border-b">
                <Link href={p.href} className="group flex items-baseline justify-between gap-6 py-6">
                  <span>
                    <span className="block font-serif text-[1.625rem] leading-tight group-hover:text-cranberry">{p.name}</span>
                    <span className="mt-1 block font-serif italic text-granite">{p.promise}</span>
                  </span>
                  <span className="eyebrow shrink-0 text-granite">From {formatPrice(p.startingPrice)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t hairline bg-linen">
        <div className="container-page grid gap-12 py-24 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Folio number="04">Questions</Folio>
            <h2 className="display-md mt-6 max-w-[14ch]">Planning in {r.name.replace(/^The /, "the ")}.</h2>
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={r.faqs} />
          </div>
        </div>
      </section>

      {/* Other regions */}
      <section className="border-t hairline">
        <div className="container-page py-14">
          <p className="eyebrow text-granite">Other regions</p>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/locations/${o.slug}`} className="font-serif text-[1.25rem] underline decoration-ink/20 underline-offset-[6px] hover:text-cranberry hover:decoration-cranberry">
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCta placement={`location_closing_${r.slug}`} body={`Planning a wedding in ${r.name.replace(/^The /, "the ")}? Share your date and venue — or the kind of setting you're looking for — and we'll reply ${site.responseTime}.`} />
    </>
  );
}
