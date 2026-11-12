import { describe, expect, it } from "vitest";
import { inquirySchema, stepOneSchema, timingOptions, flattenErrors, validateStepOne } from "@/lib/inquiry/schema";
import { triageNotes, deliveryStatus } from "@/lib/inquiry/delivery";
import { packages, comparison } from "@/config/packages";

const future = (days: number) => {
  const d = new Date(Date.now() + days * 86_400_000);
  return d.toISOString().slice(0, 10);
};

const base = { name: "Avery Lane", email: "Avery@Example.com ", timing: "Fall 2027", service: "partial" };

describe("inquiry schema", () => {
  it("accepts a minimal step-one inquiry and normalizes email", () => {
    const r = inquirySchema.safeParse({ ...base, marketingConsent: false });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.email).toBe("avery@example.com");
  });

  it("requires name, valid email, timing and service with friendly messages", () => {
    const r = stepOneSchema.safeParse({ name: "", email: "nope", timing: "", service: "" });
    expect(r.success).toBe(false);
    if (!r.success) {
      const e = flattenErrors(r.error);
      expect(Object.keys(e).sort()).toEqual(["email", "name", "service", "timing"]);
      expect(e.email).toMatch(/valid email/);
    }
  });

  it("requires a future date when the couple says they have one — reported alongside other errors", () => {
    expect(validateStepOne({ ...base, timing: "I have a date" }).weddingDate).toMatch(/wedding date/);
    expect(validateStepOne({ ...base, timing: "I have a date", weddingDate: "2020-06-01" }).weddingDate).toMatch(/future/);
    expect(validateStepOne({ ...base, timing: "I have a date", weddingDate: future(200) })).toEqual({});
    const all = validateStepOne({ name: "", email: "", timing: "I have a date", service: "" });
    expect(Object.keys(all).sort()).toEqual(["email", "name", "service", "weddingDate"]);
  });

  it("rejects malformed phone numbers but allows blank", () => {
    expect(stepOneSchema.safeParse({ ...base, phone: "call me maybe" }).success).toBe(false);
    expect(stepOneSchema.safeParse({ ...base, phone: "" }).success).toBe(true);
    expect(stepOneSchema.safeParse({ ...base, phone: "(203) 555-0142" }).success).toBe(true);
  });

  it("treats empty optional selects as undefined and rejects unknown values", () => {
    const ok = inquirySchema.safeParse({ ...base, guestCount: "", budget: "", referral: "", venueStatus: "", marketingConsent: false });
    expect(ok.success).toBe(true);
    const bad = inquirySchema.safeParse({ ...base, budget: "A million dollars", marketingConsent: false });
    expect(bad.success).toBe(false);
  });

  it("caps long free text", () => {
    expect(inquirySchema.safeParse({ ...base, message: "x".repeat(3001), marketingConsent: false }).success).toBe(false);
  });
});

describe("timing options", () => {
  it("starts with an exact-date option, lists ten upcoming seasons and ends with an open option", () => {
    const opts = timingOptions(new Date("2026-11-12T12:00:00"));
    expect(opts[0]).toBe("I have a date");
    expect(opts[1]).toBe("Winter 2026–27");
    expect(opts[2]).toBe("Spring 2027");
    expect(opts).toHaveLength(12);
    expect(opts.at(-1)).toMatch(/not sure/);
  });
});

describe("triage notes", () => {
  it("flags short runways, private properties and unsure couples", () => {
    const notes = triageNotes({ ...base, service: "unsure", timing: "I have a date", weddingDate: future(30), venueStatus: "private", marketingConsent: false } as never);
    expect(notes.join(" ")).toMatch(/Short runway/);
    expect(notes.join(" ")).toMatch(/Private property/);
    expect(notes.join(" ")).toMatch(/Unsure/);
  });
});

describe("delivery status", () => {
  it("is never 'live' without an email or webhook integration", () => {
    const s = deliveryStatus();
    expect(s.live).toBe(Boolean(process.env.LEAD_WEBHOOK_URL || process.env.RESEND_API_KEY));
  });
});

describe("pricing config", () => {
  it("has a complete comparison matrix for every package", () => {
    for (const row of comparison) for (const p of packages) expect(row.values[p.id]).toBeDefined();
  });
  it("orders packages from most to least support with descending prices", () => {
    expect(packages.map((p) => p.id)).toEqual(["full-service", "partial", "management"]);
    expect(packages[0]!.startingPrice).toBeGreaterThan(packages[1]!.startingPrice);
    expect(packages[1]!.startingPrice).toBeGreaterThan(packages[2]!.startingPrice);
  });
});

describe("timing options across the year", () => {
  it("handles January (mid-winter) and summer correctly", () => {
    expect(timingOptions(new Date("2027-01-15T12:00:00")).slice(1, 3)).toEqual(["Spring 2027", "Summer 2027"]);
    expect(timingOptions(new Date("2027-07-01T12:00:00")).slice(1, 3)).toEqual(["Fall 2027", "Winter 2027–28"]);
    expect(timingOptions(new Date("2027-12-05T12:00:00")).slice(1, 3)).toEqual(["Spring 2028", "Summer 2028"]);
  });
});
