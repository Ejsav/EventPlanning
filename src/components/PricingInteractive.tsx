"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { comparison, packages, formatPrice, type ServiceId } from "@/config/packages";
import { track } from "@/lib/analytics";
import { Check } from "./Icons";

function Value({ v }: { v: string | boolean }) {
  if (v === true)
    return (
      <span className="inline-flex items-center gap-2 text-ink">
        <Check className="h-3 w-3.5 text-cranberry" />
        <span className="sr-only">Included</span>
      </span>
    );
  if (v === false)
    return (
      <span className="text-granite">
        <span aria-hidden="true">—</span>
        <span className="sr-only">Not included</span>
      </span>
    );
  return <span>{v}</span>;
}

/** Desktop: a true comparison table. Phones: one package at a time via tabs. */
export function ComparisonTable() {
  const [active, setActive] = useState<ServiceId>("partial");
  const tabsId = useId();
  return (
    <div>
      {/* ≥ md */}
      <div className="hidden md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Comparison of Sound &amp; Stone planning packages</caption>
          <thead>
            <tr className="border-b border-ink/70 align-bottom">
              <th scope="col" className="w-[28%] pb-6">
                <span className="sr-only">Inclusion</span>
              </th>
              {packages.map((p) => (
                <th key={p.id} scope="col" className={`px-5 pb-6 font-normal ${p.id === "partial" ? "bg-linen pt-6" : ""}`}>
                  <span className="block font-serif text-[1.625rem] font-light leading-tight">{p.name}</span>
                  <span className="mt-2 block font-serif text-[1.25rem]">
                    <span className="eyebrow mr-1.5 text-granite">from</span>
                    {formatPrice(p.startingPrice)}
                  </span>
                  <Link
                    href={`/contact?service=${p.id}`}
                    onClick={() => track("package_select", { service: p.id, placement: "comparison_table" })}
                    className="link-arrow mt-4"
                  >
                    Inquire
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr key={row.label} className="border-b hairline align-baseline">
                <th scope="row" className="py-4 pr-6 font-sans text-[0.875rem] font-medium uppercase tracking-[0.08em] text-ink/80">
                  {row.label}
                </th>
                {packages.map((p) => (
                  <td key={p.id} className={`px-5 py-4 text-[1.0625rem] leading-snug ${p.id === "partial" ? "bg-linen" : ""}`}>
                    <Value v={row.values[p.id]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* < md */}
      <div className="md:hidden">
        <div role="tablist" aria-label="Choose a package to view" className="grid grid-cols-3 border border-ink/70">
          {packages.map((p) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              id={`${tabsId}-tab-${p.id}`}
              aria-selected={active === p.id}
              aria-controls={`${tabsId}-panel`}
              onClick={() => setActive(p.id)}
              className={`min-h-12 px-2 py-3 font-sans text-[0.75rem] font-medium uppercase tracking-[0.1em] transition-colors ${
                active === p.id ? "bg-ink text-paper" : "text-ink"
              }`}
            >
              {p.shortName}
            </button>
          ))}
        </div>
        {packages
          .filter((p) => p.id === active)
          .map((p) => (
            <div key={p.id} role="tabpanel" id={`${tabsId}-panel`} aria-labelledby={`${tabsId}-tab-${p.id}`} className="pt-6">
              <p className="font-serif text-[1.75rem] font-light leading-tight">{p.name}</p>
              <p className="mt-1 font-serif text-[1.25rem]">
                <span className="eyebrow mr-1.5 text-granite">from</span>
                {formatPrice(p.startingPrice)}
              </p>
              <dl className="mt-5 border-t border-ink/70">
                {comparison.map((row) => (
                  <div key={row.label} className="grid grid-cols-[1fr_1.1fr] gap-4 border-b hairline py-3.5">
                    <dt className="font-sans text-[0.75rem] font-medium uppercase leading-snug tracking-[0.08em] text-ink/75">{row.label}</dt>
                    <dd className="text-[1rem] leading-snug">
                      <Value v={row.values[p.id]} />
                    </dd>
                  </div>
                ))}
              </dl>
              <Link
                href={`/contact?service=${p.id}`}
                onClick={() => track("package_select", { service: p.id, placement: "comparison_tabs" })}
                className="btn btn-primary mt-6 w-full"
              >
                Inquire about {p.name}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

const questions = [
  {
    id: "venue",
    q: "Have you booked your venue?",
    options: [
      { label: "Not yet", scores: { "full-service": 3, partial: 1, management: 0 } },
      { label: "Yes, it's booked", scores: { "full-service": 0, partial: 2, management: 2 } },
    ],
  },
  {
    id: "vendors",
    q: "How much of your vendor team is in place?",
    options: [
      { label: "Little or none", scores: { "full-service": 2, partial: 2, management: 0 } },
      { label: "About half", scores: { "full-service": 0, partial: 3, management: 1 } },
      { label: "Nearly everyone", scores: { "full-service": 0, partial: 0, management: 3 } },
    ],
  },
  {
    id: "time",
    q: "How much time can you give planning each week?",
    options: [
      { label: "Very little", scores: { "full-service": 3, partial: 1, management: 0 } },
      { label: "A few hours", scores: { "full-service": 1, partial: 2, management: 1 } },
      { label: "Plenty — we enjoy it", scores: { "full-service": 0, partial: 1, management: 2 } },
    ],
  },
] as const;

const reasons: Record<ServiceId, string> = {
  "full-service": "With the big decisions still ahead and limited time to give, you'll get the most from a planner who leads from the start.",
  partial: "You've laid a foundation. A planner who fills the gaps and takes over vendor communication will carry it the rest of the way.",
  management: "Your plan is largely in place. Professionals to confirm every detail and run the day are exactly what you need.",
};

function recommend(answers: Record<string, number>): ServiceId | null {
  if (!questions.every((q) => answers[q.id] !== undefined)) return null;
  const totals: Record<ServiceId, number> = { "full-service": 0, partial: 0, management: 0 };
  for (const q of questions) {
    const opt = q.options[answers[q.id]!]!;
    for (const k of Object.keys(totals) as ServiceId[]) totals[k] += opt.scores[k];
  }
  // Ties resolve toward more support.
  return (["full-service", "partial", "management"] as ServiceId[]).reduce((best, k) => (totals[k] > totals[best] ? k : best), "full-service" as ServiceId);
}

/** Three-question self-selection guide. Recommendations are a starting point for the introductory call. */
export function PackageGuide() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const result = recommend(answers);
  const rec = result ? packages.find((p) => p.id === result)! : null;

  const choose = (qid: string, idx: number) => {
    const next = { ...answers, [qid]: idx };
    setAnswers(next);
    const r = recommend(next);
    if (r && r !== result) track("guide_complete", { service: r });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="space-y-8 lg:col-span-7">
        {questions.map((q, qi) => (
          <fieldset key={q.id} className="border-t hairline pt-6">
            <legend className="float-left w-full font-serif text-[1.375rem] leading-snug">
              <span className="eyebrow mr-3 align-middle text-cranberry">{qi + 1}/3</span>
              {q.q}
            </legend>
            <div className="clear-both flex flex-wrap gap-3 pt-5">
              {q.options.map((o, oi) => {
                const selected = answers[q.id] === oi;
                return (
                  <label
                    key={o.label}
                    className={`relative flex min-h-12 cursor-pointer items-center border px-5 py-3 font-sans text-[0.875rem] tracking-[0.04em] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cranberry ${
                      selected ? "border-ink bg-ink text-paper" : "border-ink/30 hover:border-ink"
                    }`}
                  >
                    <input type="radio" name={`guide-${q.id}`} className="sr-only" checked={selected} onChange={() => choose(q.id, oi)} />
                    {o.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
      <div className="lg:col-span-5">
        <div className="h-full border border-ink/70 bg-paper p-7 md:p-9" aria-live="polite">
          {rec ? (
            <>
              <p className="eyebrow text-cranberry">Our suggestion</p>
              <p className="mt-4 font-serif text-[2.25rem] font-light leading-tight">{rec.name}</p>
              <p className="mt-2 font-serif text-[1.25rem]">
                <span className="eyebrow mr-1.5 text-granite">from</span>
                {formatPrice(rec.startingPrice)}
              </p>
              <p className="mt-5 text-ink/80">{reasons[rec.id]}</p>
              <div className="mt-8 flex flex-col gap-4">
                <Link href={`/contact?service=${rec.id}`} className="btn btn-primary" onClick={() => track("package_select", { service: rec.id, placement: "guide_result" })}>
                  Inquire about {rec.name}
                </Link>
                <Link href={rec.href} className="link-arrow self-start">
                  Read about {rec.name}
                </Link>
              </div>
              <p className="mt-6 font-serif text-[0.95rem] italic text-granite">A starting point, not a verdict — we&rsquo;ll confirm the right fit together on your introductory call.</p>
            </>
          ) : (
            <>
              <p className="eyebrow text-granite">Your suggestion</p>
              <p className="mt-4 font-serif text-[1.75rem] font-light leading-snug">Answer three questions and we&rsquo;ll suggest a starting point.</p>
              <p className="mt-4 text-ink/70">
                {Object.keys(answers).length} of 3 answered.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
