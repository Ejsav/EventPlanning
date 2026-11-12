"use server";

import { createHash, randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { site } from "@/config/site";
import { attributionSchema, flattenErrors, inquirySchema, weddingDateIssue, type InquiryState } from "@/lib/inquiry/schema";
import { deliverLead, deliveryStatus, triageNotes, type Lead } from "@/lib/inquiry/delivery";
import { rateLimit } from "@/lib/inquiry/rate-limit";

const MIN_FILL_MS = 2500;

async function verifyTurnstile(token: string | null, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Turnstile is optional; honeypot + timing + rate limit still apply.
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(8000),
    });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

const str = (fd: FormData, key: string) => {
  const v = fd.get(key);
  return typeof v === "string" ? v : undefined;
};

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const fallback = site.contact.email ? ` You can also email us at ${site.contact.email}.` : "";

  // 1. Infrastructure check — never pretend to accept an inquiry we can't deliver.
  const status = deliveryStatus();
  if (!status.ready) {
    console.error("[inquiry] Rejected: no delivery channel configured (set RESEND_* or LEAD_WEBHOOK_URL).");
    return { status: "error", code: "unavailable", message: `Our inquiry form is temporarily unavailable.${fallback || " Please try again shortly."}` };
  }

  // 2. Spam signals: honeypot field and implausibly fast completion.
  const honeypot = str(formData, "company");
  const startedAt = Number(str(formData, "startedAt") ?? 0);
  if (honeypot || (startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS)) {
    // Respond as if successful so bots learn nothing, but do not store or send anything.
    return { status: "success", firstName: "", service: undefined };
  }

  // 3. Rate limit by hashed client address (the raw IP is never stored).
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const key = createHash("sha256").update(`${ip}:${process.env.INQUIRY_HASH_SALT ?? "sound-and-stone"}`).digest("hex").slice(0, 32);
  if (!(await rateLimit(key)).ok) {
    return { status: "error", code: "rate_limited", message: `We've received several inquiries from this connection in a short time. Please wait a few minutes and try again.${fallback}` };
  }

  // 4. Optional bot challenge.
  if (!(await verifyTurnstile(str(formData, "cf-turnstile-response") ?? null, ip))) {
    return { status: "error", code: "spam", message: "We couldn't verify the security check. Please refresh the page and try again." };
  }

  // 5. Authoritative validation.
  const parsed = inquirySchema.safeParse({
    name: str(formData, "name") ?? "",
    partnerName: str(formData, "partnerName"),
    email: str(formData, "email") ?? "",
    phone: str(formData, "phone"),
    timing: str(formData, "timing") ?? "",
    weddingDate: str(formData, "weddingDate"),
    service: str(formData, "service") ?? "",
    venueStatus: str(formData, "venueStatus") ?? "",
    venue: str(formData, "venue"),
    guestCount: str(formData, "guestCount") ?? "",
    budget: str(formData, "budget") ?? "",
    referral: str(formData, "referral") ?? "",
    message: str(formData, "message"),
    marketingConsent: formData.get("marketingConsent") === "on",
  });
  const dateError = weddingDateIssue(str(formData, "timing"), str(formData, "weddingDate") || undefined);
  if (!parsed.success || dateError) {
    const fieldErrors = parsed.success ? {} : flattenErrors(parsed.error);
    if (dateError) fieldErrors.weddingDate = dateError;
    return { status: "error", code: "validation", message: "Please check the highlighted fields.", fieldErrors };
  }

  let attribution = {};
  try {
    const a = attributionSchema.safeParse(JSON.parse(str(formData, "attribution") || "{}"));
    if (a.success) attribution = a.data;
  } catch {
    /* ignore malformed attribution */
  }

  const lead: Lead = {
    ...parsed.data,
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
    stage: "New Inquiry",
    attribution,
    triage: triageNotes(parsed.data),
  };

  // 6. Deliver.
  try {
    const result = await deliverLead(lead);
    if (result.failures.length) console.error("[inquiry] Partial delivery failures", { id: lead.id, failures: result.failures });
    if (!result.delivered) {
      return { status: "error", code: "delivery_failed", message: `Something went wrong sending your inquiry, and it was not received. Please try again in a moment.${fallback}` };
    }
    return {
      status: "success",
      firstName: lead.name.split(/\s+/)[0],
      devStored: result.devStored,
      service: lead.service,
    };
  } catch (e) {
    console.error("[inquiry] Delivery error", { id: lead.id, error: e instanceof Error ? e.message : String(e) });
    return { status: "error", code: "delivery_failed", message: `Something went wrong sending your inquiry, and it was not received. Please try again in a moment.${fallback}` };
  }
}
