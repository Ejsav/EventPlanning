import { z } from "zod";

// Disable Zod's eval-based JIT so the strict Content Security Policy is never tripped.
z.config({ jitless: true });

/**
 * Inquiry schema — shared by the client (step validation) and the server
 * (authoritative validation). The first step asks only for what we need to
 * reply well; everything in step two is optional.
 */

export const serviceOptions = [
  { value: "full-service", label: "Full-Service Planning", hint: "Venue not yet booked, or you want us to lead" },
  { value: "partial", label: "Partial Planning", hint: "Venue booked, help needed with the rest" },
  { value: "management", label: "Wedding Management", hint: "Planned it yourselves; we run the day" },
  { value: "unsure", label: "Not sure yet", hint: "We'll help you decide" },
] as const;

export const venueStatusOptions = [
  { value: "booked", label: "Venue booked" },
  { value: "searching", label: "Still looking" },
  { value: "private", label: "Private property or tent" },
] as const;

export const guestCountOptions = ["Under 50", "50–100", "100–150", "150–200", "Over 200", "Not sure yet"] as const;

export const budgetOptions = [
  "Under $40,000",
  "$40,000 – $75,000",
  "$75,000 – $125,000",
  "$125,000 – $200,000",
  "Over $200,000",
  "Prefer to discuss",
] as const;

export const referralOptions = [
  "Google or another search engine",
  "Instagram",
  "Pinterest",
  "Our venue",
  "Another wedding vendor",
  "Friend or family",
  "Wedding directory or publication",
  "Other",
] as const;

/** Season options for the next ~2.5 years, computed from today's date. */
export function timingOptions(now = new Date()): string[] {
  // Seasons in calendar order within a "season year"; Winter is labeled by the
  // year its December falls in (e.g. "Winter 2026–27").
  const order = ["Spring", "Summer", "Fall", "Winter"] as const;
  const m = now.getMonth(); // 0-11
  let idx = m <= 1 ? 3 : m <= 4 ? 0 : m <= 7 ? 1 : m <= 10 ? 2 : 3;
  let year = m <= 1 ? now.getFullYear() - 1 : now.getFullYear();
  const out = ["I have a date"];
  // Start from the next season — a wedding this season is usually already dated.
  for (let i = 0; i < 10; i++) {
    idx += 1;
    if (idx > 3) {
      idx = 0;
      year += 1;
    }
    const s = order[idx]!;
    out.push(s === "Winter" ? `Winter ${year}–${String(year + 1).slice(2)}` : `${s} ${year}`);
  }
  out.push("Later, or not sure yet");
  return out;
}

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters.`)
    .optional()
    .transform((v) => (v ? v : undefined));

export const stepOneSchema = z
  .object({
    name: z.string().trim().min(2, "Please tell us your name.").max(120, "That name is a little long — could you shorten it?"),
    partnerName: optionalText(120),
    email: z.string().trim().toLowerCase().email("Please enter a valid email address, like name@example.com.").max(200),
    phone: z
      .string()
      .trim()
      .optional()
      .transform((v) => (v ? v : undefined))
      .refine((v) => !v || /^[+()\-.\s\d]{7,25}$/.test(v), "Please enter a valid phone number, or leave this blank."),
    timing: z.string().trim().min(1, "Please choose a date or a season — a rough idea is fine."),
    weddingDate: z
      .string()
      .trim()
      .optional()
      .transform((v) => (v ? v : undefined))
      .refine((v) => !v || /^\d{4}-\d{2}-\d{2}$/.test(v), "Please enter a valid date."),
    service: z.enum(["full-service", "partial", "management", "unsure"], { message: "Please choose the help you're considering — “Not sure yet” is a fine answer." }),
  })
;

/**
 * The exact-date rule is checked separately (not via superRefine) so it is
 * reported together with every other step-one error on the first attempt.
 */
export function weddingDateIssue(timing: string | undefined, weddingDate: string | undefined, now = new Date()): string | undefined {
  if (timing !== "I have a date") return undefined;
  if (!weddingDate) return "Please enter your wedding date.";
  const d = new Date(`${weddingDate}T12:00:00`);
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  if (Number.isNaN(d.getTime()) || d < today) return "Please choose a date in the future.";
  return undefined;
}

/** Client-side step-one validation: schema errors plus the date rule, all at once. */
export function validateStepOne(values: Record<string, unknown>): FieldErrors {
  const r = stepOneSchema.safeParse(values);
  const errors: FieldErrors = r.success ? {} : flattenErrors(r.error);
  const dateErr = weddingDateIssue(values.timing as string | undefined, (values.weddingDate as string | undefined) || undefined);
  if (dateErr) errors.weddingDate = dateErr;
  return errors;
}

export const stepTwoSchema = z.object({
  venueStatus: z.enum(["booked", "searching", "private"]).optional().or(z.literal("").transform(() => undefined)),
  venue: optionalText(200),
  guestCount: z.enum(guestCountOptions).optional().or(z.literal("").transform(() => undefined)),
  budget: z.enum(budgetOptions).optional().or(z.literal("").transform(() => undefined)),
  referral: z.enum(referralOptions).optional().or(z.literal("").transform(() => undefined)),
  message: optionalText(3000),
  marketingConsent: z.boolean().default(false),
});

export const attributionSchema = z
  .object({
    utm_source: z.string().max(200).optional(),
    utm_medium: z.string().max(200).optional(),
    utm_campaign: z.string().max(200).optional(),
    utm_term: z.string().max(200).optional(),
    utm_content: z.string().max(200).optional(),
    gclid: z.string().max(200).optional(),
    fbclid: z.string().max(200).optional(),
    referrer: z.string().max(300).optional(),
    landing_page: z.string().max(300).optional(),
    first_seen: z.string().max(40).optional(),
  })
  .partial();

export const inquirySchema = z.intersection(stepOneSchema, stepTwoSchema);

export type InquiryInput = z.infer<typeof inquirySchema>;
export type Attribution = z.infer<typeof attributionSchema>;

export type FieldErrors = Partial<Record<string, string>>;

export const stepOneFields = ["name", "partnerName", "email", "phone", "timing", "weddingDate", "service"] as const;

export function flattenErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

export interface InquiryState {
  status: "idle" | "success" | "error";
  /** Machine-readable reason, for analytics. */
  code?: "validation" | "rate_limited" | "spam" | "unavailable" | "delivery_failed";
  message?: string;
  fieldErrors?: FieldErrors;
  firstName?: string;
  /** True when the inquiry was only stored locally (development without integrations). */
  devStored?: boolean;
  service?: string;
}
