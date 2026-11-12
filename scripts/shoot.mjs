// Visual QA: full-page screenshots at representative widths.
// Usage: node scripts/shoot.mjs <outDir> <path>[,<path>...] [widths]
import { chromium } from "playwright";
const [outDir = "shots", pathsArg = "/", widthsArg = "390,1440"] = process.argv.slice(2);
const base = process.env.BASE_URL || "http://localhost:3000";
const widths = widthsArg.split(",").map(Number);
const paths = pathsArg.split(",");
let browser;
try { browser = await chromium.launch(); } catch { browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" }); }
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 800 ? 844 : 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  for (const p of paths) {
    await page.goto(base + p, { waitUntil: "networkidle" });
    // Trigger lazy images
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(500);
    const name = (p === "/" ? "home" : p.replace(/^\//, "").replace(/\//g, "_")) + `_${w}`;
    await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: true });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    console.log(`${name}${overflow > 0 ? `  ⚠ horizontal overflow ${overflow}px` : ""}`);
  }
  await ctx.close();
}
await browser.close();
