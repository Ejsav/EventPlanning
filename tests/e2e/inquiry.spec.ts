import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import path from "node:path";

const store = path.join(process.cwd(), ".data", "inquiries.ndjson");
const readStore = async () => {
  try {
    return (await readFile(store, "utf8")).trim().split("\n").filter(Boolean);
  } catch {
    return [];
  }
};

test("shows helpful validation and keeps the visitor on step one", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Continue" }).click();
  const summary = page.locator("form [role=alert]");
  await expect(summary).toContainText("4 details need another look");
  await expect(summary).toBeFocused();
  await expect(page.locator("#name-error")).toHaveText(/tell us your name/);
  await expect(page.locator("#field-name")).toHaveAttribute("aria-invalid", "true");
  // Errors clear as fields are fixed
  await page.locator("#field-name").fill("Jordan Ellis");
  await expect(page.locator("#name-error")).toHaveCount(0);
  await page.locator("#field-email").fill("not-an-email");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.locator("#email-error")).toHaveText(/valid email/);
});

test("requires a date when the couple says they have one", async ({ page }) => {
  await page.goto("/contact");
  await page.locator("#field-timing").selectOption("I have a date");
  await expect(page.locator("#field-weddingDate")).toBeVisible();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.locator("#weddingDate-error")).toHaveText(/wedding date/);
});

test("completes a full inquiry end to end and confirms only after the server accepts it", async ({ page, browserName }, info) => {
  test.skip(!!process.env.BASE_URL && !process.env.E2E_SUBMIT, "Submission test runs against the local dev store only");
  const before = (await readStore()).length;
  const unique = `E2E ${info.project.name} ${Date.now()}`;
  await page.goto("/contact?service=partial&utm_source=e2e&utm_medium=test");
  await page.locator("#field-name").fill(unique);
  await page.locator("#field-email").fill("couple@example.com");
  await page.locator("#field-timing").selectOption({ index: 3 });
  await expect(page.getByRole("radio", { name: /Partial Planning/ })).toBeChecked();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByRole("heading", { name: "About the wedding" })).toBeFocused();
  await page.getByText("Venue booked", { exact: true }).click();
  await page.locator("#field-venue").fill("A waterfront inn in Madison");
  await page.locator("#field-guestCount").selectOption("100–150");
  await page.locator("#field-message").fill("We'd love help with the rest of the vendor team.");
  // Real people take more than a couple of seconds; the server ignores faster submissions.
  await page.waitForTimeout(2800);
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.getByRole("heading", { name: /Thank you, E2E/ })).toBeVisible({ timeout: 15_000 });
  await expect(page.getByRole("heading", { name: /Thank you/ })).toBeFocused();
  const after = await readStore();
  expect(after.length).toBe(before + 1);
  const lead = JSON.parse(after.at(-1)!);
  expect(lead.name).toBe(unique);
  expect(lead.service).toBe("partial");
  expect(lead.stage).toBe("New Inquiry");
  expect(lead.attribution.utm_source).toBe("e2e");
  expect(browserName).toBe("chromium");
});

test("silently discards honeypot submissions without storing them", async ({ page }) => {
  test.skip(!!process.env.BASE_URL, "local only");
  const before = (await readStore()).length;
  await page.goto("/contact");
  await page.locator("#field-name").fill("Bot McBotface");
  await page.locator("#field-email").fill("bot@example.com");
  await page.locator("#field-timing").selectOption({ index: 2 });
  await page.locator("label", { hasText: "We'll help you decide" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.locator("#field-company").evaluate((el: HTMLInputElement) => (el.value = "Spam Co"));
  await page.waitForTimeout(2800);
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.getByText("Inquiry received")).toBeVisible({ timeout: 15_000 });
  expect((await readStore()).length).toBe(before);
});
