/**
 * Privacy-conscious analytics layer.
 *
 * - Events are pushed to `window.dataLayer` (GA4 / GTM compatible) and to gtag
 *   when GA4 is configured via NEXT_PUBLIC_GA_ID.
 * - No personal information (names, emails, phone numbers, free text) is ever
 *   sent — only categorical values such as service type or CTA placement.
 * - Visitors who send a Global Privacy Control signal, or who opt out via the
 *   footer "Privacy choices" control, are never tracked.
 *
 * Conversion taxonomy (see docs/06-lead-management.md):
 *   Engagement:  cta_click, cta_inquiry_click, package_select, guide_complete
 *   Funnel:      inquiry_start, inquiry_step_complete, inquiry_error
 *   Conversion:  generate_lead  (successful, server-confirmed inquiry)
 *   Offline:     consultation_scheduled, proposal_sent, booking_confirmed
 *                (recorded in the CRM, imported to GA4 / Ads — never fired here)
 */

export type AnalyticsEvent =
  | "cta_click"
  | "cta_inquiry_click"
  | "package_select"
  | "guide_complete"
  | "inquiry_start"
  | "inquiry_step_complete"
  | "inquiry_error"
  | "generate_lead"
  | "scheduling_click";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
  interface Navigator {
    globalPrivacyControl?: boolean;
  }
}

export const OPT_OUT_KEY = "ss-analytics-opt-out";

export function analyticsAllowed(): boolean {
  if (typeof window === "undefined") return false;
  if (navigator.globalPrivacyControl) return false;
  try {
    return window.localStorage.getItem(OPT_OUT_KEY) !== "1";
  } catch {
    return true;
  }
}

export function track(event: AnalyticsEvent, params: Params = {}) {
  if (!analyticsAllowed()) return;
  const clean: Params = {};
  for (const [k, v] of Object.entries(params)) if (v !== undefined) clean[k] = v;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...clean });
  if (typeof window.gtag === "function") window.gtag("event", event, clean);
  if (process.env.NODE_ENV !== "production") console.debug("[analytics]", event, clean);
}
