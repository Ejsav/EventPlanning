"use client";

import Link from "next/link";
import Script from "next/script";
import { useActionState, useEffect, useRef, useState, startTransition, type FormEvent } from "react";
import { submitInquiry } from "@/app/contact/actions";
import {
  budgetOptions,
  guestCountOptions,
  referralOptions,
  serviceOptions,
  stepOneFields,
  validateStepOne as validateStepOne_,
  venueStatusOptions,
  type FieldErrors,
  type InquiryState,
} from "@/lib/inquiry/schema";
import { readAttribution } from "@/lib/attribution";
import { track } from "@/lib/analytics";
import { site } from "@/config/site";
import { ArrowRight } from "./Icons";

const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Values = {
  name: string;
  partnerName: string;
  email: string;
  phone: string;
  timing: string;
  weddingDate: string;
  service: string;
  venueStatus: string;
  venue: string;
  guestCount: string;
  budget: string;
  referral: string;
  message: string;
  marketingConsent: boolean;
};

const empty: Values = {
  name: "",
  partnerName: "",
  email: "",
  phone: "",
  timing: "",
  weddingDate: "",
  service: "",
  venueStatus: "",
  venue: "",
  guestCount: "",
  budget: "",
  referral: "",
  message: "",
  marketingConsent: false,
};

const fieldLabels: Record<string, string> = {
  name: "Your name",
  email: "Email",
  phone: "Phone",
  timing: "Wedding date or season",
  weddingDate: "Wedding date",
  service: "Help you're considering",
  venue: "Venue or location",
  message: "Message",
};

export function InquiryForm({ available, timingChoices, devMode }: { available: boolean; timingChoices: string[]; devMode: boolean }) {
  const [state, formAction, pending] = useActionState<InquiryState, FormData>(submitInquiry, { status: "idle" });
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [step, setStep] = useState<1 | 2>(1);
  const [started, setStarted] = useState(false);
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  // The server renders the stepped layout (no layout shift on hydration). Without
  // JavaScript, the <noscript> styles below reveal both steps as one form.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    startedAt.current = Date.now();
    const pre = new URLSearchParams(window.location.search).get("service");
    if (pre && serviceOptions.some((o) => o.value === pre)) setValues((v) => ({ ...v, service: pre }));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // React to server results.
  const [handled, setHandled] = useState<InquiryState | null>(null);
  if (state !== handled && state.status !== "idle") {
    setHandled(state);
    if (state.status === "error") {
      setErrors(state.fieldErrors ?? {});
      if (state.fieldErrors && Object.keys(state.fieldErrors).some((k) => (stepOneFields as readonly string[]).includes(k))) setStep(1);
    }
  }

  useEffect(() => {
    if (state.status === "success") {
      track("generate_lead", { service: state.service ?? "unknown", form: "inquiry" });
      const el = successRef.current;
      if (el) {
        el.focus({ preventScroll: true });
        const top = el.getBoundingClientRect().top + window.scrollY - 140;
        window.scrollTo({ top: Math.max(top, 0), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      }
    } else if (state.status === "error") {
      track("inquiry_error", { code: state.code ?? "unknown" });
      summaryRef.current?.focus();
    }
  }, [state]);

  const markStarted = () => {
    if (!started) {
      setStarted(true);
      track("inquiry_start", { form: "inquiry" });
    }
  };

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    markStarted();
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key as string]) setErrors((e) => ({ ...e, [key as string]: undefined }));
  };

  const validateStepOne = () => {
    const fe = validateStepOne_(values);
    if (Object.keys(fe).length === 0) return true;
    setErrors(fe);
    requestAnimationFrame(() => summaryRef.current?.focus());
    return false;
  };

  const goToStep2 = () => {
    if (!validateStepOne()) return;
    setErrors({});
    setStep(2);
    track("inquiry_step_complete", { step: 1, service: values.service });
    requestAnimationFrame(() => {
      stepHeadingRef.current?.focus();
      formRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStepOne()) {
      setStep(1);
      return;
    }
    const fd = new FormData(e.currentTarget);
    fd.set("startedAt", String(startedAt.current));
    fd.set("attribution", JSON.stringify(readAttribution()));
    startTransition(() => formAction(fd));
  };

  if (state.status === "success") {
    return (
      <div className="border border-ink/70 bg-paper p-7 md:p-12" role="status">
        <p className="eyebrow text-cranberry">Inquiry received</p>
        <h2 ref={successRef} tabIndex={-1} className="display-md mt-5 outline-none">
          Thank you{state.firstName ? `, ${state.firstName}` : ""}. We&rsquo;ll be in touch {site.responseTime}.
        </h2>
        {state.devStored && (
          <p className="mt-6 border-l-2 border-cranberry bg-linen px-4 py-3 font-sans text-[0.875rem]">
            Development mode: this inquiry was saved to <code>.data/inquiries.ndjson</code> because no email or CRM integration is configured. Production
            requires RESEND_* or LEAD_WEBHOOK_URL — see docs/07-deployment.md.
          </p>
        )}
        <ol className="mt-10 border-t hairline">
          {[
            ["Now", "Your details are with our planning team. If email is configured, a confirmation is on its way to your inbox."],
            [site.responseTime.charAt(0).toUpperCase() + site.responseTime.slice(1), "A planner replies personally to arrange a complimentary 30-minute introductory call."],
            ["After the call", "If we're a good fit, you'll receive a written proposal with a flat fee, usually within two to three days."],
          ].map(([when, what]) => (
            <li key={when} className="grid gap-1 border-b hairline py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <span className="eyebrow pt-1 text-granite">{when}</span>
              <span>{what}</span>
            </li>
          ))}
        </ol>
        {site.schedulingUrl && (
          <div className="mt-10">
            <a href={site.schedulingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" onClick={() => track("scheduling_click", { placement: "inquiry_success" })}>
              Choose a time for your call
            </a>
          </div>
        )}
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/journal" className="link-arrow">
            Read the journal <ArrowRight />
          </Link>
          <Link href="/packages-and-pricing" className="link-arrow">
            Review packages <ArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  const errorEntries = Object.entries(errors).filter(([, v]) => Boolean(v)) as [string, string][];
  const showStep1 = step === 1;
  const showStep2 = step === 2;
  const err = (k: string) => errors[k];
  const describedBy = (k: string, hint?: boolean) => [hint ? `${k}-hint` : "", err(k) ? `${k}-error` : ""].filter(Boolean).join(" ") || undefined;

  return (
    <form ref={formRef} action={formAction} onSubmit={onSubmit} noValidate className="scroll-mt-28 border border-ink/70 bg-paper p-6 sm:p-8 md:p-12" aria-describedby="form-privacy">
      {!available && (
        <div role="alert" className="mb-8 border-l-2 border-cranberry bg-linen px-5 py-4">
          <p className="font-serif text-[1.125rem]">Online inquiries are temporarily unavailable.</p>
          <p className="mt-1 text-[1rem] text-ink/80">
            {site.contact.email ? (
              <>
                Please email us at{" "}
                <a className="underline" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>{" "}
                and we&rsquo;ll reply {site.responseTime}.
              </>
            ) : (
              "Please check back shortly."
            )}
          </p>
        </div>
      )}

      <noscript>
        <style>{`[data-step]{display:block!important}[data-js-only]{display:none!important}[data-nojs-show]{display:block!important}`}</style>
      </noscript>

      {/* Progress */}
      <div className="mb-10 flex items-center gap-4" aria-hidden="true" data-js-only>
        <span className={`h-px flex-1 ${step >= 1 ? "bg-ink" : "bg-ink/20"}`} />
        <span className="eyebrow text-granite">Step {step} of 2</span>
        <span className={`h-px flex-1 ${step === 2 ? "bg-ink" : "bg-ink/20"}`} />
      </div>

      {(errorEntries.length > 0 || (state.status === "error" && state.code !== "validation")) && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mb-10 border-l-2 border-cranberry bg-linen px-5 py-4 outline-none">
          {state.status === "error" && state.code !== "validation" && handled === state && errorEntries.length === 0 ? (
            <p className="font-serif text-[1.125rem]">{state.message}</p>
          ) : (
            <>
              <p className="font-serif text-[1.125rem]">
                {errorEntries.length === 1 ? "One detail needs another look:" : `${errorEntries.length} details need another look:`}
              </p>
              <ul className="mt-2 space-y-1 text-[1rem]">
                {errorEntries.map(([k, msg]) => (
                  <li key={k}>
                    <a href={`#field-${k}`} className="underline decoration-cranberry/60 underline-offset-4">
                      {fieldLabels[k] ?? k}
                    </a>
                    : {msg}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      <fieldset hidden={!showStep1} disabled={!available} className="min-w-0" data-step="1">
        <legend className="sr-only">About you</legend>
        <h2 className="display-sm">About you</h2>
        <p className="mt-2 text-[1rem] text-granite">
          Four quick details so we can reply properly. <span aria-hidden="true">Fields marked <span className="text-cranberry">*</span> are required.</span>
        </p>

        <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
          <div>
            <label htmlFor="field-name" className="field-label">
              Your name <Req />
            </label>
            <input id="field-name" name="name" autoComplete="name" required className="field-input" value={values.name} onChange={(e) => set("name", e.target.value)} aria-invalid={Boolean(err("name"))} aria-describedby={describedBy("name")} />
            <FieldError id="name" msg={err("name")} />
          </div>
          <div>
            <label htmlFor="field-partnerName" className="field-label">
              Partner&rsquo;s name <Opt />
            </label>
            <input id="field-partnerName" name="partnerName" autoComplete="off" className="field-input" value={values.partnerName} onChange={(e) => set("partnerName", e.target.value)} />
          </div>
          <div>
            <label htmlFor="field-email" className="field-label">
              Email <Req />
            </label>
            <input id="field-email" name="email" type="email" inputMode="email" autoComplete="email" required className="field-input" value={values.email} onChange={(e) => set("email", e.target.value)} aria-invalid={Boolean(err("email"))} aria-describedby={describedBy("email")} />
            <FieldError id="email" msg={err("email")} />
          </div>
          <div>
            <label htmlFor="field-phone" className="field-label">
              Phone <Opt />
            </label>
            <input id="field-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className="field-input" value={values.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={Boolean(err("phone"))} aria-describedby={describedBy("phone", true)} />
            <p id="phone-hint" className="mt-2 text-[0.875rem] text-granite">
              Only if you&rsquo;d prefer a call.
            </p>
            <FieldError id="phone" msg={err("phone")} />
          </div>
          <div className={values.timing === "I have a date" ? "" : "sm:col-span-2"}>
            <label htmlFor="field-timing" className="field-label">
              When is the wedding? <Req />
            </label>
            <select id="field-timing" name="timing" required className="field-input" value={values.timing} onChange={(e) => set("timing", e.target.value)} aria-invalid={Boolean(err("timing"))} aria-describedby={describedBy("timing")}>
              <option value="" disabled>
                Choose a date or season
              </option>
              {timingChoices.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <FieldError id="timing" msg={err("timing")} />
          </div>
            <div hidden={values.timing !== "I have a date"} data-nojs-show>
              <label htmlFor="field-weddingDate" className="field-label">
                Wedding date <Req />
              </label>
              <input id="field-weddingDate" name="weddingDate" type="date" className="field-input" value={values.weddingDate} onChange={(e) => set("weddingDate", e.target.value)} aria-invalid={Boolean(err("weddingDate"))} aria-describedby={describedBy("weddingDate")} />
              <FieldError id="weddingDate" msg={err("weddingDate")} />
            </div>
        </div>

        <fieldset className="mt-10 min-w-0" aria-describedby={describedBy("service")}>
          <legend id="field-service" tabIndex={-1} className="field-label outline-none">
            What help are you considering? <Req />
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {serviceOptions.map((o) => {
              const checked = values.service === o.value;
              return (
                <label
                  key={o.value}
                  className={`relative flex min-h-[4.75rem] cursor-pointer flex-col justify-center border px-5 py-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cranberry ${
                    checked ? "border-ink bg-ink text-paper" : "border-ink/25 hover:border-ink"
                  }`}
                >
                  <input type="radio" name="service" value={o.value} checked={checked} onChange={() => set("service", o.value)} className="sr-only" required />
                  <span className="font-serif text-[1.25rem] leading-tight">{o.label}</span>
                  <span className={`mt-1 text-[0.9375rem] leading-snug ${checked ? "text-paper/75" : "text-granite"}`}>{o.hint}</span>
                </label>
              );
            })}
          </div>
          <FieldError id="service" msg={err("service")} />
        </fieldset>

          <div data-js-only className="mt-10 flex flex-col-reverse gap-4 border-t hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.9375rem] text-granite">Next: a few optional details about the wedding.</p>
            <button type="button" onClick={goToStep2} className="btn btn-primary" disabled={!available}>
              Continue <ArrowRight />
            </button>
          </div>
      </fieldset>

      <fieldset hidden={!showStep2} disabled={!available} className="min-w-0" data-step="2">
        <legend className="sr-only">About the wedding</legend>
        <h2 ref={stepHeadingRef} tabIndex={-1} className="display-sm outline-none">
          About the wedding
        </h2>
        <p className="mt-2 text-[1rem] text-granite">All optional — but the more you share, the more useful our reply will be.</p>

        <fieldset className="mt-8 min-w-0">
          <legend className="field-label">Where are things with the venue?</legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {venueStatusOptions.map((o) => {
              const checked = values.venueStatus === o.value;
              return (
                <label
                  key={o.value}
                  className={`flex min-h-12 cursor-pointer items-center border px-5 py-2.5 font-sans text-[0.875rem] tracking-[0.03em] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cranberry ${
                    checked ? "border-ink bg-ink text-paper" : "border-ink/25 hover:border-ink"
                  }`}
                >
                  <input type="radio" name="venueStatus" value={o.value} checked={checked} onChange={() => set("venueStatus", o.value)} className="sr-only" />
                  {o.label}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="field-venue" className="field-label">
              {values.venueStatus === "booked" ? "Venue" : "Venue, town or area"} <Opt />
            </label>
            <input id="field-venue" name="venue" className="field-input" placeholder={values.venueStatus === "booked" ? "e.g. the venue's name and town" : "e.g. the shoreline, Litchfield County, our family's home in Darien"} value={values.venue} onChange={(e) => set("venue", e.target.value)} aria-invalid={Boolean(err("venue"))} aria-describedby={describedBy("venue")} />
            <FieldError id="venue" msg={err("venue")} />
          </div>
          <div>
            <label htmlFor="field-guestCount" className="field-label">
              Guests, roughly <Opt />
            </label>
            <select id="field-guestCount" name="guestCount" className="field-input" value={values.guestCount} onChange={(e) => set("guestCount", e.target.value)}>
              <option value="">Choose a range</option>
              {guestCountOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="field-budget" className="field-label">
              Overall wedding budget <Opt />
            </label>
            <select id="field-budget" name="budget" className="field-input" value={values.budget} onChange={(e) => set("budget", e.target.value)} aria-describedby="budget-hint">
              <option value="">Choose a range</option>
              {budgetOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <p id="budget-hint" className="mt-2 text-[0.875rem] text-granite">
              For the whole wedding, not our fee. It helps us suggest the right level of support.
            </p>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="field-message" className="field-label">
              Anything else we should know? <Opt />
            </label>
            <textarea id="field-message" name="message" rows={4} className="field-input" placeholder="What you're imagining, what's already booked, what feels most daunting…" value={values.message} onChange={(e) => set("message", e.target.value)} aria-invalid={Boolean(err("message"))} aria-describedby={describedBy("message")} />
            <FieldError id="message" msg={err("message")} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="field-referral" className="field-label">
              How did you hear about us? <Opt />
            </label>
            <select id="field-referral" name="referral" className="field-input" value={values.referral} onChange={(e) => set("referral", e.target.value)}>
              <option value="">Choose one</option>
              {referralOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className="mt-8 flex cursor-pointer items-start gap-3 text-[1rem] leading-snug">
          <input type="checkbox" name="marketingConsent" checked={values.marketingConsent} onChange={(e) => set("marketingConsent", e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-cranberry)]" />
          <span>
            Send me the occasional planning note from {site.name}. <span className="text-granite">Optional; unsubscribe any time.</span>
          </span>
        </label>

        {/* Honeypot — hidden from people and assistive tech */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="field-company">Company</label>
          <input id="field-company" name="company" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>
        <input type="hidden" name="startedAt" defaultValue="0" />
        <input type="hidden" name="attribution" defaultValue="{}" />

        {TURNSTILE_KEY && (
          <>
            <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
            <div className="cf-turnstile mt-8" data-sitekey={TURNSTILE_KEY} data-theme="light" />
          </>
        )}

        <div className="mt-10 flex flex-col-reverse gap-4 border-t hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" data-js-only onClick={() => setStep(1)} className="link-arrow self-start" disabled={pending}>
            <span aria-hidden="true">←</span> Back
          </button>
          <button type="submit" className="btn btn-primary" disabled={pending || !available} aria-disabled={pending || !available}>
            {pending ? (
              <>
                <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border border-paper/40 border-t-paper" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>Send inquiry</>
            )}
          </button>
        </div>
        <p aria-live="polite" className="sr-only">
          {pending ? "Sending your inquiry" : ""}
        </p>
      </fieldset>

      <p id="form-privacy" className="mt-8 text-[0.875rem] leading-relaxed text-granite">
        We use your details only to reply to your inquiry and plan your wedding with you. We never sell personal information. See our{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-ink">
          privacy policy
        </Link>
        .
        {devMode && <span className="mt-2 block text-cranberry">Development mode: inquiries are stored locally, not emailed.</span>}
      </p>
    </form>
  );
}

function Req() {
  return (
    <span className="text-cranberry" aria-hidden="true">
      *
    </span>
  );
}

function Opt() {
  return <span className="ml-1 font-normal normal-case tracking-normal text-granite">(optional)</span>;
}

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={`${id}-error`} className="mt-2 flex items-start gap-2 text-[0.9375rem] text-cranberry">
      <span aria-hidden="true">—</span>
      {msg}
    </p>
  );
}
