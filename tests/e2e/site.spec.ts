import { test, expect } from "@playwright/test";

const pages = [
  "/",
  "/services",
  "/services/full-service-wedding-planning",
  "/services/partial-wedding-planning",
  "/services/wedding-management",
  "/packages-and-pricing",
  "/approach",
  "/about",
  "/journal",
  "/journal/how-much-wedding-planning-help-do-you-need",
  "/journal/wedding-planner-cost-connecticut",
  "/journal/when-to-hire-a-wedding-planner-connecticut",
  "/journal/connecticut-wedding-guest-transportation-guide",
  "/locations",
  "/locations/fairfield-county",
  "/locations/connecticut-shoreline",
  "/locations/new-haven",
  "/locations/hartford-county",
  "/locations/litchfield-hills",
  "/contact",
  "/privacy",
  "/terms",
];

test.describe("every page", () => {
  for (const path of pages) {
    test(`${path} renders with one h1, unique metadata and no overflow`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      const title = await page.title();
      expect(title.length).toBeGreaterThan(10);
      expect(title.length).toBeLessThanOrEqual(65);
      const desc = await page.locator('meta[name="description"]').getAttribute("content");
      expect(desc && desc.length).toBeGreaterThan(70);
      expect(desc!.length).toBeLessThanOrEqual(160);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical).toContain(path === "/" ? "" : path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      // Every image has alt text (decorative images use alt="").
      const missingAlt = await page.locator("img:not([alt])").count();
      expect(missingAlt).toBe(0);
    });
  }
});

test("all internal links resolve", async ({ page, request }) => {
  const seen = new Set<string>();
  for (const path of ["/", "/services", "/packages-and-pricing", "/locations", "/journal", "/about"]) {
    await page.goto(path);
    const hrefs = await page.$$eval("a[href^='/']", (as) => as.map((a) => (a as HTMLAnchorElement).getAttribute("href")!));
    for (const h of hrefs) seen.add(h.split("#")[0]!.split("?")[0]!);
  }
  for (const href of seen) {
    const res = await request.get(href, { maxRedirects: 0 });
    expect(res.status(), href).toBeLessThan(400);
  }
});

test("unknown pages return a branded 404", async ({ page }) => {
  const res = await page.goto("/this-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: /wandered off the map/i })).toBeVisible();
});

test("sitemap and robots are served", async ({ request }) => {
  const sm = await request.get("/sitemap.xml");
  expect(sm.ok()).toBeTruthy();
  const body = await sm.text();
  expect(body).toContain("/services/wedding-management");
  expect(body).toContain("/locations/litchfield-hills");
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Sitemap:");
});

test("structured data is valid JSON and never claims ratings", async ({ page }) => {
  await page.goto("/");
  const blocks = await page.$$eval('script[type="application/ld+json"]', (s) => s.map((x) => x.textContent ?? ""));
  expect(blocks.length).toBeGreaterThan(0);
  for (const b of blocks) {
    expect(() => JSON.parse(b)).not.toThrow();
    expect(b).not.toContain("aggregateRating");
    expect(b).not.toContain("\"review\"");
  }
});
