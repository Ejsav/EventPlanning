import { test, expect } from "@playwright/test";

test("desktop services menu opens, is keyboard accessible and navigates", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop only");
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Services" });
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.locator("#services-menu").getByRole("link", { name: /Partial Planning/ }).click();
  await expect(page).toHaveURL(/partial-wedding-planning/);
  await expect(page.locator("h1")).toHaveText(/Partial wedding planning/i);
});

test("mobile menu traps focus, closes on Escape and navigates", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  const btn = page.getByRole("button", { name: /menu/i });
  await btn.click();
  const dialog = page.getByRole("dialog", { name: "Site menu" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(btn).toBeFocused();
  await btn.click();
  await dialog.getByRole("link", { name: "Pricing" }).click();
  await expect(page).toHaveURL(/packages-and-pricing/);
  await expect(dialog).toBeHidden();
});

test("primary CTA leads to the inquiry form", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Inquire about your wedding" }).first().click();
  await expect(page).toHaveURL(/\/contact/);
  await expect(page.getByRole("heading", { name: "About you", exact: true })).toBeVisible();
});

test("package guide recommends a service and links to a prefilled inquiry", async ({ page }) => {
  await page.goto("/packages-and-pricing#guide");
  await page.getByText("Yes, it's booked").click();
  await page.getByText("Nearly everyone").click();
  await page.getByText("Plenty — we enjoy it").click();
  await expect(page.getByText("Our suggestion")).toBeVisible();
  await expect(page.locator("#guide").getByText("Wedding Management", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Inquire about Wedding Management" }).click();
  await expect(page).toHaveURL(/service=management/);
  await expect(page.getByRole("radio", { name: /Wedding Management/ })).toBeChecked();
});
