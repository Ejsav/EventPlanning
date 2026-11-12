import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { packages, formatPrice } from "@/config/packages";
import { homeFaqs } from "@/content/shared";
import { regions } from "@/content/locations";
import { Photo } from "@/components/Photo";
import { Folio } from "@/components/Section";
import { Cta } from "@/components/Cta";
import { ArrowRight } from "@/components/Icons";
import { ProcessTimeline, FaqList, Commitments } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Connecticut Wedding Planner & Coordinator | Sound & Stone" },
  description:
    "Wedding planning and management across Connecticut — Fairfield County, the shoreline, New Haven, Hartford and Litchfield. Published pricing from $3,200.",
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: "Sound & Stone — Connecticut Wedding Planning & Management" },
};

const changes = [
  {
    title: "One point of contact for every vendor",
    body: "Florist, caterer, band, rentals, transportation. We become the person they call, so your phone stays quiet and nothing falls between two contracts.",
  },
  {
    title: "A budget that tells the truth",
    body: "Every quote, deposit and due date in one live budget — including the costs couples forget, from service charges to overtime.",
  },
  {
    title: "A timeline built backwards from the last dance",
    body: "We work out when hair must start so photos happen in golden light, and when the shuttle must leave so no one misses the vows.",
  },
  {
    title: "A plan for the rain, and the wind, and the late band",
    body: "Contingencies are written down months before you need them, so a change in the forecast is a decision, not a crisis.",
  },
  {
    title: "Your guests, looked after",
    body: "Hotel blocks, shuttle schedules, welcome notes, the aunt who needs a seat near the door. The logistics guests notice only when they go wrong.",
  },
  {
    title: "Your day, given back",
    body: "On the wedding day you hold nothing — not the timeline, not the vendor tips, not your phone. That is the whole point.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />

      {/* ── I. Hero ─────────────────────────────────────────────── */}
      <section className="relative" aria-labelledby="hero-title">
        <div className="container-page grid gap-y-10 pb-16 pt-8 md:pt-12 lg:min-h-[calc(100svh-var(--header-h))] lg:grid-cols-12 lg:gap-x-10 lg:pb-14 lg:pt-10">
          <div className="flex flex-col justify-between lg:col-span-7 lg:pr-4">
            <div>
              <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-granite">
                <span>{site.descriptor}</span>
                <span className="hidden h-px w-6 bg-ink/30 sm:block" aria-hidden="true" />
                <span>Connecticut &amp; New England</span>
              </p>
              <h1 id="hero-title" className="display-xl mt-7 max-w-[11ch] md:mt-9">
                Every detail considered. <em className="font-light italic text-cranberry">Every hour</em> accounted for.
              </h1>
              <p className="lede mt-7 max-w-[34rem] text-ink/80 md:mt-9">
                We plan and run weddings across Connecticut — on the shoreline, in the hills and at the estates between — so you can
                spend the day with the people you invited.
              </p>
              <div className="mt-9 flex flex-col gap-4 xs:flex-row xs:flex-wrap xs:items-center xs:gap-x-8">
                <Cta href="/contact" placement="hero">
                  {site.primaryCta.label}
                </Cta>
                <Cta href="/packages-and-pricing" variant="arrow" placement="hero_secondary" className="self-start xs:self-auto">
                  See packages &amp; pricing
                </Cta>
              </div>
            </div>

            {/* Transparent pricing ledger — lets couples self-qualify in seconds */}
            <dl className="mt-14 grid grid-cols-1 border-t hairline sm:grid-cols-3 lg:mt-16">
              {packages.map((p, i) => (
                <div key={p.id} className={`flex items-baseline justify-between gap-4 border-b hairline py-4 sm:block sm:border-b-0 sm:py-5 ${i > 0 ? "sm:border-l sm:pl-6" : ""}`}>
                  <dt className="eyebrow text-granite">{p.name}</dt>
                  <dd className="font-serif text-[1.25rem] sm:mt-2 sm:text-[1.5rem]">
                    <span className="eyebrow mr-1.5 text-granite">from</span>
                    {formatPrice(p.startingPrice)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative lg:col-span-5">
            <Photo
              src="/images/hero-shoreline.jpg"
              alt="A couple embraces on a rocky shoreline under an overcast sky, her long veil spread across the stones"
              ratio="4/5"
              sizes="(min-width: 1024px) 40vw, 100vw"
              focus="50% 40%"
              priority
              className="lg:h-full [&>.plate]:lg:!aspect-auto [&>.plate]:lg:h-full"
            />
            <p className="eyebrow mt-3 flex justify-between text-granite lg:absolute lg:-bottom-8 lg:left-0 lg:right-0">
              <span>Plate I — On the Sound</span>
              <span>41.2° N</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── II. Positioning statement ─────────────────────────── */}
      <section className="border-t hairline" aria-label="Our point of view">
        <div className="container-page grid gap-10 py-24 md:py-36 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Folio number="01">Point of view</Folio>
          </div>
          <div className="lg:col-span-9">
            <p className="display-md max-w-[24ch] font-light" data-reveal>
              Romance is the easy part. The rest is a thousand small decisions, forty vendor emails and a timeline that has to
              hold when it rains. <em className="italic text-cranberry">That part is ours.</em>
            </p>
            <div className="mt-12 grid gap-8 text-ink/80 md:grid-cols-2 md:gap-12" data-reveal>
              <p>
                {site.name} is a Connecticut wedding planning company named for the two things this coast does best: the Sound,
                and the old stone walls that run through every town from Greenwich to the Litchfield Hills. One is romance. The
                other is structure. A good wedding needs both.
              </p>
              <p>
                We publish our prices, introduce you to your planner before you commit, and staff every wedding day with at least
                two people. Small, deliberate promises — because the big one, a day that simply works, is built out of them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── III. Services index ───────────────────────────────── */}
      <section className="border-t hairline" aria-labelledby="services-title">
        <div className="container-page py-24 md:py-32">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <Folio number="02">Services</Folio>
            </div>
            <div className="lg:col-span-9">
              <h2 id="services-title" className="display-lg max-w-[18ch]">
                Three ways to work together. One standard for all of them.
              </h2>
            </div>
          </div>

          <ol className="mt-16 border-t border-ink/80">
            {packages.map((p, i) => (
              <li key={p.id} className="border-b hairline">
                <Link href={p.href} className="group grid gap-6 py-10 md:grid-cols-12 md:items-baseline md:gap-8 md:py-12">
                  <span className="eyebrow text-cranberry md:col-span-1">{["I", "II", "III"][i]}</span>
                  <div className="md:col-span-5">
                    <h3 className="font-serif text-[2.125rem] font-light leading-none transition-colors duration-300 group-hover:text-cranberry md:text-[2.75rem]">
                      {p.name}
                    </h3>
                    <p className="mt-3 font-serif text-[1.125rem] italic text-granite">{p.promise}</p>
                  </div>
                  <p className="text-[1.0625rem] leading-relaxed text-ink/75 md:col-span-4">{p.forWhom}</p>
                  <div className="flex items-center justify-between gap-6 md:col-span-2 md:flex-col md:items-end md:gap-5 md:text-right">
                    <span className="font-serif text-[1.375rem]">
                      <span className="eyebrow mr-1.5 text-granite">from</span>
                      {formatPrice(p.startingPrice)}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border hairline transition-colors duration-300 group-hover:border-cranberry group-hover:bg-cranberry group-hover:text-paper" aria-hidden="true">
                      <ArrowRight />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl font-serif italic text-granite">
              Not sure which fits? Answer three questions on our{" "}
              <Link href="/packages-and-pricing#guide" className="text-ink underline decoration-cranberry/50 underline-offset-4 hover:decoration-cranberry">
                pricing page
              </Link>{" "}
              and we&rsquo;ll point you in the right direction.
            </p>
            <Cta href="/services" variant="arrow" placement="home_services">
              Compare the services
            </Cta>
          </div>
        </div>
      </section>

      {/* ── IV. Immersive plate ───────────────────────────────── */}
      <section aria-label="The wedding day" className="relative">
        <div className="relative h-[78svh] min-h-[30rem] w-full overflow-hidden bg-harbor md:h-[88vh]">
          <Photo
            src="/images/reception-candlelit.jpg"
            alt="A long candlelit reception table set with crystal glassware, receding into a softly lit dining room"
            sizes="100vw"
            fill
            focus="45% 55%"
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-harbor-deep/90 via-harbor-deep/40 to-harbor-deep/5" aria-hidden="true" />
          <div className="container-page absolute inset-x-0 bottom-0 pb-12 text-paper md:pb-20">
            <div className="grid gap-8 md:grid-cols-12 md:items-end">
              <p className="display-md max-w-[20ch] font-light md:col-span-8" data-reveal>
                On the day, two planners. One written run of show. Every vendor confirmed by name, by phone, the week before.
              </p>
              <p className="eyebrow text-paper/70 md:col-span-4 md:text-right">Plate II — The long table</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── V. What a planner changes ─────────────────────────── */}
      <section aria-labelledby="value-title">
        <div className="container-page grid gap-14 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Folio number="03">The difference</Folio>
              <h2 id="value-title" className="display-lg mt-6 max-w-[13ch]">
                What a planner actually changes.
              </h2>
              <p className="mt-6 max-w-md text-ink/80">
                Not the vision — that&rsquo;s yours. What changes is everything between the vision and the day: the work, the worry and
                the hundred quiet decisions that make a wedding feel effortless to everyone in it.
              </p>
              <div className="mt-10 hidden lg:block">
                <Photo src="/images/pen-letter.jpg" alt="A fountain pen mid-stroke on handwritten notes" ratio="4/3" sizes="(min-width:1024px) 34vw, 0px" />
              </div>
            </div>
          </div>
          <ol className="lg:col-span-7 lg:pl-6">
            {changes.map((c, i) => (
              <li key={c.title} className="grid grid-cols-[3rem_1fr] gap-x-4 border-t hairline py-9 md:grid-cols-[4.5rem_1fr]" data-reveal>
                <span className="font-serif text-[1.75rem] font-light italic leading-none text-cranberry md:text-[2.25rem]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-[1.5rem] font-normal leading-snug md:text-[1.75rem]">{c.title}</h3>
                  <p className="mt-3 text-ink/75">{c.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── VI. Process (dark) ────────────────────────────────── */}
      <section className="bg-harbor text-paper" aria-labelledby="process-title">
        <div className="container-page py-24 md:py-32">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <Folio number="04" light>
                How it works
              </Folio>
            </div>
            <div className="lg:col-span-9">
              <h2 id="process-title" className="display-lg max-w-[20ch]">
                From first message to last dance, nothing is left to chance.
              </h2>
            </div>
          </div>
          <div className="mt-16 md:mt-20">
            <ProcessTimeline dark />
          </div>
          <div className="mt-16 flex flex-col gap-6 border-t hairline-light pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl font-serif text-[1.125rem] italic text-paper/75">
              There is no obligation at any stage before you sign. Most couples know after one conversation.
            </p>
            <Cta href="/approach" variant="arrow" placement="home_process">
              Read our approach
            </Cta>
          </div>
        </div>
      </section>

      {/* ── VII. Where we plan ────────────────────────────────── */}
      <section aria-labelledby="where-title">
        <div className="container-page grid gap-14 py-24 md:py-32 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Folio number="05">Where we plan</Folio>
            <h2 id="where-title" className="display-lg mt-6 max-w-[15ch]">
              From Greenwich harbors to Litchfield hilltops.
            </h2>
            <p className="mt-6 max-w-lg text-ink/80">
              Connecticut packs coastal clubs, historic inns, farm estates and private family properties into a state you can cross
              in two hours. Each region asks different questions of a plan — ferries and tides, Metro-North and I-95, tents and
              generators. We plan for the one you&rsquo;ve chosen.
            </p>
            <ul className="mt-12 border-t hairline">
              {regions.map((r) => (
                <li key={r.slug} className="border-b hairline">
                  <Link href={`/locations/${r.slug}`} className="group flex items-baseline justify-between gap-6 py-5">
                    <span>
                      <span className="block font-serif text-[1.5rem] leading-tight transition-colors group-hover:text-cranberry md:text-[1.75rem]">{r.name}</span>
                      <span className="mt-1 block text-[0.9375rem] text-granite">{r.townsShort}</span>
                    </span>
                    <span className="text-granite transition-transform duration-300 group-hover:translate-x-1 group-hover:text-cranberry">
                      <ArrowRight />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4 self-start lg:sticky lg:top-28 lg:col-span-6 lg:mt-24 lg:gap-6">
            <Photo
              src="/images/estate-shingle.jpg"
              alt="A grey-shingled New England house with a wraparound white porch and a sweeping lawn"
              ratio="4/5"
              sizes="(min-width:1024px) 24vw, 50vw"
              focus="40% 50%"
              caption="Estates & private homes"
            />
            <Photo
              src="/images/ceremony-lakeside.jpg"
              alt="Rows of white chairs on a lawn facing a floral arch at the edge of a lake"
              ratio="4/5"
              sizes="(min-width:1024px) 24vw, 50vw"
              focus="55% 50%"
              caption="Lakes & hills"
              className="mt-16 lg:mt-24"
            />
          </div>
        </div>
      </section>

      {/* ── VIII. Commitments ─────────────────────────────────── */}
      <section className="border-t hairline bg-linen" aria-labelledby="commitments-title">
        <div className="container-page py-24 md:py-32">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <Folio number="06">Our word</Folio>
            </div>
            <div className="lg:col-span-9">
              <h2 id="commitments-title" className="display-lg max-w-[16ch]">
                Six things you can hold us to.
              </h2>
              <p className="mt-6 max-w-2xl text-ink/80">
                We&rsquo;re a new name in Connecticut weddings, so we won&rsquo;t ask you to trust a wall of reviews. We&rsquo;d rather
                give you commitments you can check — in our proposal, in our contract and on your wedding day.
              </p>
            </div>
          </div>
          <Commitments className="mt-14" />
          <div className="mt-6">
            <Cta href="/about" variant="arrow" placement="home_commitments">
              Who we are
            </Cta>
          </div>
        </div>
      </section>

      {/* ── IX. Questions ─────────────────────────────────────── */}
      <section aria-labelledby="faq-title">
        <div className="container-page grid gap-12 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Folio number="07">Questions</Folio>
            <h2 id="faq-title" className="display-md mt-6 max-w-[14ch]">
              The questions every couple asks first.
            </h2>
            <p className="mt-6 max-w-sm text-ink/75">
              More answers on our{" "}
              <Link href="/packages-and-pricing#questions" className="underline decoration-cranberry/50 underline-offset-4 hover:decoration-cranberry">
                pricing page
              </Link>{" "}
              and in the{" "}
              <Link href="/journal" className="underline decoration-cranberry/50 underline-offset-4 hover:decoration-cranberry">
                journal
              </Link>
              .
            </p>
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={homeFaqs} />
          </div>
        </div>
      </section>

      {/* ── X. Invitation ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-harbor-deep text-paper" aria-labelledby="invite-title">
        <div className="container-page grid gap-12 py-24 md:py-32 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Folio light>The first step</Folio>
            <h2 id="invite-title" className="display-xl mt-7 max-w-[12ch]">
              Tell us about <em className="font-light italic text-mist">your</em> wedding.
            </h2>
            <p className="lede mt-8 max-w-xl text-paper/80">
              Your date, your setting, the help you think you need. Two minutes now; a personal reply {site.responseTime}.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Cta href="/contact" variant="light" placement="home_final">
                {site.primaryCta.label}
              </Cta>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Photo
              src="/images/couple-veil.jpg"
              alt="Black-and-white photograph of a couple kissing on a windswept shore, the veil lifting around them"
              ratio="5/4"
              sizes="(min-width:1024px) 38vw, 100vw"
            />
          </div>
        </div>
      </section>
    </>
  );
}
