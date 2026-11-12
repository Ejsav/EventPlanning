import Link from "next/link";
import { packages, formatPrice, type ServiceId } from "@/config/packages";
import { site } from "@/config/site";
import { Folio } from "./Section";
import { ArrowRight } from "./Icons";

/** Price + engagement facts, shown near the top of each service page. */
export function ServiceFacts({ id, light = false }: { id: ServiceId; light?: boolean }) {
  const p = packages.find((x) => x.id === id)!;
  const muted = light ? "text-paper/65" : "text-granite";
  return (
    <dl className={`grid grid-cols-2 border-t ${light ? "hairline-light" : "hairline"}`}>
      <div className={`border-b py-5 pr-4 ${light ? "hairline-light" : "hairline"}`}>
        <dt className={`eyebrow ${muted}`}>Starting fee</dt>
        <dd className="mt-2 font-serif text-[1.75rem] leading-none">{formatPrice(p.startingPrice)}</dd>
      </div>
      <div className={`border-b border-l py-5 pl-5 ${light ? "hairline-light" : "hairline"}`}>
        <dt className={`eyebrow ${muted}`}>We begin</dt>
        <dd className="mt-2 font-serif text-[1.25rem] leading-tight">{p.begins}</dd>
      </div>
    </dl>
  );
}

/** Cross-links to the other two services so visitors can self-correct. */
export function OtherServices({ current }: { current: ServiceId }) {
  const others = packages.filter((p) => p.id !== current);
  return (
    <section className="border-t hairline" aria-labelledby="other-services">
      <div className="container-page py-20 md:py-24">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Folio>Not quite right?</Folio>
            <h2 id="other-services" className="display-sm mt-5 max-w-[16ch]">
              Compare it with our other services.
            </h2>
          </div>
          <ul className="grid gap-px bg-ink/15 sm:grid-cols-2 lg:col-span-8">
            {others.map((p) => (
              <li key={p.id} className="bg-paper">
                <Link href={p.href} className="group flex h-full flex-col justify-between gap-10 p-6 transition-colors hover:bg-linen md:p-8">
                  <div>
                    <p className="eyebrow text-granite">From {formatPrice(p.startingPrice)}</p>
                    <h3 className="mt-3 font-serif text-[1.875rem] font-light leading-tight group-hover:text-cranberry">{p.name}</h3>
                    <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink/75">{p.forWhom}</p>
                  </div>
                  <span className="link-arrow self-start">
                    Explore <ArrowRight />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-10 font-serif italic text-granite">
          Still deciding? <Link href="/packages-and-pricing#compare" className="text-ink underline decoration-cranberry/50 underline-offset-4 hover:decoration-cranberry">See every inclusion side by side</Link>, or ask us on an introductory call — we reply {site.responseTime}.
        </p>
      </div>
    </section>
  );
}
