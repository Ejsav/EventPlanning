import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, articleBySlug } from "@/content/journal";
import { packageById, formatPrice } from "@/config/packages";
import { site } from "@/config/site";
import { Photo } from "@/components/Photo";
import { Breadcrumbs } from "@/components/Section";
import { Cta } from "@/components/Cta";
import { ClosingCta } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) return {};
  return {
    title: a.seoTitle,
    description: a.description,
    alternates: { canonical: `/journal/${a.slug}` },
    openGraph: { type: "article", url: `/journal/${a.slug}`, title: a.title, description: a.description, publishedTime: a.published, images: [{ url: a.image.src, alt: a.image.alt }] },
  };
}

const fmt = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) notFound();
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Journal", href: "/journal" },
    { name: a.title, href: `/journal/${a.slug}` },
  ];
  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 2);

  return (
    <>
      <JsonLd data={[articleSchema({ ...a, image: a.image.src }), breadcrumbSchema(crumbs)]} />
      <article>
        <header className="container-page pb-12 pt-8 md:pt-12">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Journal", href: "/journal" }, { name: a.category }]} />
          <div className="mx-auto mt-12 max-w-4xl text-center">
            <p className="eyebrow text-cranberry">
              {a.category} · {a.readMinutes} min read
            </p>
            <h1 className="display-lg mt-6">{a.title}</h1>
            <p className="lede mx-auto mt-6 max-w-2xl text-ink/75">{a.dek}</p>
            <p className="eyebrow mt-8 text-granite">
              By {site.name} · <time dateTime={a.published}>{fmt(a.published)}</time>
            </p>
          </div>
        </header>
        <div className="container-page">
          <Photo src={a.image.src} alt={a.image.alt} ratio="21/9" sizes="(min-width:1440px) 1320px, 100vw" priority focus={a.image.focus} className="[&>.plate]:aspect-[4/3] [&>.plate]:sm:!aspect-[21/9]" />
        </div>
        <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-12">
          <div className="prose-editorial text-[1.1875rem] leading-[1.75] text-ink/90 lg:col-span-7 lg:col-start-2 lg:text-[1.25rem]">{a.body()}</div>
          <aside className="lg:col-span-3 lg:col-start-10" aria-label="Related services">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow text-granite">Related services</p>
              <ul className="mt-4 border-t hairline">
                {a.related.map((id) => {
                  const p = packageById(id);
                  return (
                    <li key={id} className="border-b hairline">
                      <Link href={p.href} className="group block py-4">
                        <span className="block font-serif text-[1.25rem] leading-tight group-hover:text-cranberry">{p.name}</span>
                        <span className="eyebrow mt-1 block text-granite">From {formatPrice(p.startingPrice)}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-8">
                <Cta href="/contact" placement={`article_aside_${a.slug}`} className="w-full">
                  Inquire
                </Cta>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <section className="border-t hairline">
        <div className="container-page py-16 md:py-20">
          <p className="eyebrow text-granite">Keep reading</p>
          <ul className="mt-8 grid gap-10 md:grid-cols-2">
            {more.map((m) => (
              <li key={m.slug}>
                <Link href={`/journal/${m.slug}`} className="group grid grid-cols-[7rem_1fr] items-center gap-6 sm:grid-cols-[10rem_1fr]">
                  <Photo src={m.image.src} alt="" ratio="1/1" sizes="160px" focus={m.image.focus} />
                  <span>
                    <span className="eyebrow block text-cranberry">{m.category}</span>
                    <span className="mt-2 block font-serif text-[1.375rem] leading-snug group-hover:text-cranberry">{m.title}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ClosingCta placement={`article_closing_${a.slug}`} />
    </>
  );
}
