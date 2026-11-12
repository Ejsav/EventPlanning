import type { ReactNode } from "react";
import { process, commitments, type Faq } from "@/content/shared";
import { site } from "@/config/site";
import { Folio } from "./Section";
import { Cta } from "./Cta";
import { Plus } from "./Icons";

/** Horizon-line timeline: each step is a stone resting on the line of the Sound. */
export function ProcessTimeline({ steps = process, dark = false }: { steps?: typeof process; dark?: boolean }) {
  return (
    <ol className="relative grid gap-0 overflow-x-clip md:grid-cols-3 md:gap-x-10 md:gap-y-14 xl:grid-cols-6 xl:gap-x-8">
      {steps.map((s, i) => (
        <li key={s.title} className="relative grid grid-cols-[2.25rem_1fr] gap-x-5 pb-10 md:block md:pb-0" data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
          {/* rail */}
          <div className="relative md:mb-7 md:h-4">
            <span className={`absolute left-[0.6rem] top-4 h-full w-px md:left-0 md:top-[7px] md:h-px md:w-[calc(100%+2.5rem)] xl:w-[calc(100%+2rem)] ${dark ? "bg-paper/25" : "bg-ink/20"} ${i === steps.length - 1 ? "hidden md:block md:w-full xl:w-full" : ""}`} aria-hidden="true" />
            <span className={`relative block h-4 w-4 rounded-full md:h-3.5 md:w-3.5 ${i === steps.length - 1 ? "bg-cranberry" : dark ? "bg-paper" : "bg-ink"}`} aria-hidden="true" />
          </div>
          <div>
            <p className={`eyebrow xl:min-h-[2.8em] ${dark ? "text-seaglass" : "text-granite"}`}>
              {String(i + 1).padStart(2, "0")} · {s.when}
            </p>
            <h3 className="mt-3 font-serif text-[1.625rem] font-normal leading-tight">{s.title}</h3>
            <p className={`mt-3 text-[1.0625rem] leading-relaxed ${dark ? "text-paper/75" : "text-ink/75"}`}>{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function FaqList({ faqs, className = "" }: { faqs: Faq[]; className?: string }) {
  return (
    <div className={`border-t hairline ${className}`}>
      {faqs.map((f) => (
        <details key={f.q} className="group border-b hairline">
          <summary className="flex min-h-16 items-center justify-between gap-6 py-6 text-left">
            <h3 className="font-serif text-[1.3125rem] font-normal leading-snug md:text-[1.5rem]">{f.q}</h3>
            <span className="shrink-0 text-cranberry transition-transform duration-300 group-open:rotate-45">
              <Plus />
            </span>
          </summary>
          <p className="max-w-3xl pb-8 pr-10 text-ink/80">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Commitments({ className = "" }: { className?: string }) {
  return (
    <dl className={`grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {commitments.map((c, i) => (
        <div key={c.title} className="border-t hairline py-7" data-reveal style={{ ["--reveal-delay" as string]: `${(i % 3) * 90}ms` }}>
          <dt className="flex items-baseline gap-3 font-serif text-[1.375rem] leading-snug">
            <span className="eyebrow text-cranberry">{String(i + 1).padStart(2, "0")}</span>
            {c.title}
          </dt>
          <dd className="mt-3 text-[1.0625rem] leading-relaxed text-ink/75">{c.body}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Closing conversion band used at the end of interior pages. */
export function ClosingCta({
  title = "Tell us about your wedding.",
  body,
  service,
  placement,
  secondary,
}: {
  title?: ReactNode;
  body?: string;
  service?: string;
  placement: string;
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="border-t hairline bg-linen" aria-labelledby={`cta-${placement}`}>
      <div className="container-page grid gap-10 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-7">
          <Folio>Next step</Folio>
          <h2 id={`cta-${placement}`} className="display-lg mt-6 max-w-[16ch]">
            {title}
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-7 md:col-span-5">
          <p className="text-ink/80">
            {body ??
              `Share your date, your setting and a little about what you're imagining. We'll reply ${site.responseTime} to arrange a complimentary introductory call.`}
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Cta href="/contact" placement={placement} service={service}>
              {site.primaryCta.label}
            </Cta>
            {secondary && (
              <Cta href={secondary.href} variant="arrow" placement={`${placement}_secondary`}>
                {secondary.label}
              </Cta>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
