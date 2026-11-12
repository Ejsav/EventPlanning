/**
 * First-touch attribution, stored in sessionStorage + localStorage so a lead
 * can be traced back to the channel that produced it (search, ads, Instagram,
 * venue referral link, etc.). Attached to inquiries as hidden fields.
 */
export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  landing_page?: string;
  first_seen?: string;
}

const KEY = "ss-attribution";
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;

export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    const existing = window.localStorage.getItem(KEY);
    const url = new URL(window.location.href);
    const hasCampaign = PARAMS.some((p) => url.searchParams.get(p));
    // Keep the first touch unless a new campaign click arrives.
    if (existing && !hasCampaign) return;
    const data: Attribution = { first_seen: new Date().toISOString(), landing_page: url.pathname };
    for (const p of PARAMS) {
      const v = url.searchParams.get(p);
      if (v) data[p] = v.slice(0, 200);
    }
    if (document.referrer && !document.referrer.startsWith(window.location.origin)) {
      data.referrer = document.referrer.slice(0, 300);
    }
    window.localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable — attribution is best-effort */
  }
}

export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || "{}") as Attribution;
  } catch {
    return {};
  }
}
