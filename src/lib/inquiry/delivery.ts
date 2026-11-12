import "server-only";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { site } from "@/config/site";
import type { Attribution, InquiryInput } from "./schema";
import { serviceOptions, venueStatusOptions } from "./schema";

/**
 * Lead delivery. A lead counts as delivered only when at least one PRIMARY
 * channel succeeds: the team notification email (Resend) or the CRM webhook.
 * The acknowledgment email to the couple is secondary and never decides success.
 */

export interface Lead extends InquiryInput {
  id: string;
  receivedAt: string;
  stage: "New Inquiry";
  attribution: Attribution;
  triage: string[];
}

export function deliveryStatus() {
  const email = Boolean(process.env.RESEND_API_KEY && process.env.INQUIRY_TO_EMAIL && process.env.INQUIRY_FROM_EMAIL);
  const webhook = Boolean(process.env.LEAD_WEBHOOK_URL);
  const devStore = !email && !webhook && process.env.NODE_ENV !== "production";
  return { email, webhook, devStore, ready: email || webhook || devStore, live: email || webhook };
}

const labelFor = (value: string | undefined, options: readonly { value: string; label: string }[]) => options.find((o) => o.value === value)?.label ?? value;

/** Lightweight triage notes so the team can prioritize replies. Informational only. */
export function triageNotes(i: InquiryInput): string[] {
  const notes: string[] = [];
  if (i.weddingDate) {
    const d = new Date(`${i.weddingDate}T12:00:00`);
    const days = Math.round((d.getTime() - Date.now()) / 86_400_000);
    if (days < 70) notes.push(`Short runway: wedding in ${days} days — check availability first.`);
    const m = d.getMonth();
    if (m === 5 || m === 8 || m === 9) notes.push("Peak-season date (June, September or October).");
    if (d.getDay() === 6) notes.push("Saturday date.");
  }
  if (i.venueStatus === "private") notes.push("Private property / tent — production-heavy; likely Full-Service or Partial.");
  if (i.service === "management" && i.venueStatus === "searching") notes.push("Asked for Wedding Management but venue not booked — discuss fit.");
  if (i.service === "unsure") notes.push("Unsure of service level — use the call to recommend.");
  if (i.guestCount === "Over 200") notes.push("Large guest count — additional day-of staffing likely.");
  return notes;
}

function rows(lead: Lead): [string, string][] {
  const r: [string, string | undefined][] = [
    ["Name", lead.name],
    ["Partner", lead.partnerName],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Timing", lead.timing === "I have a date" ? lead.weddingDate : lead.timing],
    ["Service", labelFor(lead.service, serviceOptions)],
    ["Venue status", labelFor(lead.venueStatus, venueStatusOptions)],
    ["Venue / location", lead.venue],
    ["Guests", lead.guestCount],
    ["Overall budget", lead.budget],
    ["Heard about us", lead.referral],
    ["Marketing consent", lead.marketingConsent ? "Yes" : "No"],
    ["Message", lead.message],
    ["Source", [lead.attribution.utm_source, lead.attribution.utm_medium, lead.attribution.utm_campaign].filter(Boolean).join(" / ") || lead.attribution.referrer || "Direct / unknown"],
    ["Landing page", lead.attribution.landing_page],
    ["Click ID", lead.attribution.gclid ? `gclid ${lead.attribution.gclid}` : lead.attribution.fbclid ? `fbclid ${lead.attribution.fbclid}` : undefined],
    ["Lead ID", lead.id],
    ["Received", lead.receivedAt],
  ];
  return r.filter((x): x is [string, string] => Boolean(x[1]));
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function notificationEmail(lead: Lead) {
  const subjectService = labelFor(lead.service, serviceOptions);
  const when = lead.weddingDate ?? lead.timing;
  const subject = `New inquiry — ${lead.name} · ${when} · ${subjectService}`;
  const table = rows(lead)
    .map(([k, v]) => `<tr><td style="padding:8px 16px 8px 0;color:#66625a;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:8px 0;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join("");
  const triage = lead.triage.length ? `<p style="margin:0 0 16px"><strong>Triage notes</strong><br>${lead.triage.map(esc).join("<br>")}</p>` : "";
  const html = `<div style="font-family:Georgia,serif;color:#1a2229;font-size:15px;line-height:1.5"><p style="margin:0 0 16px">A new inquiry arrived through the website. Reply ${esc(site.responseTime)} — hitting reply goes straight to the couple.</p>${triage}<table style="border-collapse:collapse">${table}</table><p style="margin-top:24px;color:#66625a">Stage: New Inquiry → Contacted → Qualified → Consultation Scheduled → Proposal Sent → Booked / Lost</p></div>`;
  const text = `${rows(lead).map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${lead.triage.join("\n")}`;
  return { subject, html, text };
}

function acknowledgmentEmail(lead: Lead) {
  const first = lead.name.split(/\s+/)[0] ?? lead.name;
  const subject = `We've received your inquiry — ${site.name}`;
  const scheduling = site.schedulingUrl
    ? `<p>If you'd like to choose a time for your introductory call now, you can do that here: <a href="${esc(site.schedulingUrl)}">${esc(site.schedulingUrl)}</a></p>`
    : "";
  const html = `<div style="font-family:Georgia,serif;color:#1a2229;font-size:16px;line-height:1.6;max-width:560px"><p>Dear ${esc(first)},</p><p>Thank you for telling us about your wedding. Your inquiry has reached our planning team, and a member of the team will reply personally ${esc(site.responseTime)} to arrange a complimentary introductory call.</p><p>On that call we'll ask about your date, your setting and what feels most daunting, and we'll tell you honestly which level of support would serve you best — even if that isn't us.</p>${scheduling}<p>If anything changes in the meantime, simply reply to this email.</p><p>Warmly,<br>${esc(site.name)}<br><span style="color:#66625a">${esc(site.descriptor)} · Connecticut</span></p><p style="color:#66625a;font-size:13px">You're receiving this because you submitted an inquiry at ${esc(site.url)}. We'll only use your details to respond to your inquiry${lead.marketingConsent ? " and to send the occasional planning note you opted into (unsubscribe any time)" : ""}.</p></div>`;
  const text = `Dear ${first},\n\nThank you for telling us about your wedding. A member of our planning team will reply personally ${site.responseTime} to arrange a complimentary introductory call.\n\n${site.schedulingUrl ? `Choose a time now: ${site.schedulingUrl}\n\n` : ""}Warmly,\n${site.name}`;
  return { subject, html, text };
}

async function sendEmail(payload: { to: string; subject: string; html: string; text: string; replyTo?: string }) {
  const res = await fetch(`${process.env.RESEND_API_BASE ?? "https://api.resend.com"}/emails`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.INQUIRY_FROM_EMAIL,
      to: payload.to.split(",").map((s) => s.trim()),
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
}

async function postWebhook(lead: Lead) {
  const res = await fetch(process.env.LEAD_WEBHOOK_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.LEAD_WEBHOOK_SECRET ? { "X-Webhook-Secret": process.env.LEAD_WEBHOOK_SECRET } : {}),
    },
    body: JSON.stringify({ type: "inquiry.created", lead }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

export async function deliverLead(lead: Lead): Promise<{ delivered: boolean; devStored: boolean; failures: string[] }> {
  const status = deliveryStatus();
  const failures: string[] = [];
  let delivered = false;

  const primary: Promise<void>[] = [];
  if (status.email) {
    const n = notificationEmail(lead);
    primary.push(sendEmail({ to: process.env.INQUIRY_TO_EMAIL!, replyTo: lead.email, ...n }));
  }
  if (status.webhook) primary.push(postWebhook(lead));

  const results = await Promise.allSettled(primary);
  for (const r of results) {
    if (r.status === "fulfilled") delivered = true;
    else failures.push(String(r.reason instanceof Error ? r.reason.message : r.reason));
  }

  if (delivered && status.email && process.env.INQUIRY_SEND_ACK !== "false") {
    const a = acknowledgmentEmail(lead);
    try {
      await sendEmail({ to: lead.email, replyTo: process.env.INQUIRY_TO_EMAIL, ...a });
    } catch (e) {
      failures.push(`ack: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  if (!status.live && status.devStore) {
    // Development only: keep leads in a local file so the full flow can be exercised end to end.
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "inquiries.ndjson"), JSON.stringify(lead) + "\n", "utf8");
    return { delivered: true, devStored: true, failures };
  }

  return { delivered, devStored: false, failures };
}
