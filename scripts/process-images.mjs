// Downloads the licensed source photography (Unsplash License) and applies the
// Sound & Stone house grade so every image reads as one art-directed set.
// Usage: npm run images            (re-processes everything)
// Replace entries here when commissioned photography arrives.
import sharp from "sharp";
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("public/images");
const CACHE = path.resolve(".cache/source-images");

export const manifest = [
  ["hero-shoreline", "1537633552985-df8429e8048b"],
  ["estate-shingle", "1570129477492-45c003edd2be"],
  ["ceremony-lakeside", "1505944357431-27579db47558"],
  ["ceremony-arch", "1529636798458-92182e662485"],
  ["reception-candlelit", "1484156818044-c040038b0719"],
  ["reception-tent", "1502635385003-ee1e6a1a742d"],
  ["reception-ballroom", "1524824267900-2fa9cbf7a506"],
  ["table-greenery", "1522413452208-996ff3f3e740"],
  ["table-candles", "1525772764200-be829a350797"],
  ["table-soft", "1561912774-79769a0a0a7a"],
  ["couple-veil", "1460978812857-470ed1c77af0"],
  ["couple-horizon", "1532712938310-34cb3982ef74"],
  ["hands-shadow", "1520854221256-17451cc331bf"],
  ["dress-window", "1519657337289-077653f724ed"],
  ["bouquet", "1487530811176-3780de880c2d"],
  ["pen-letter", "1455390582262-044cdead277a"],
  ["notebook", "1471107340929-a87cd0f5b5f3"],
  ["hands-rings", "1465495976277-4387d4b0b4c6"],
  ["loft-light", "1513278974582-3e1b4a4fa21e"],
  ["couple-backlit", "1519741497674-611481863552"],
];

async function exists(p) { try { await access(p); return true; } catch { return false; } }

await mkdir(OUT, { recursive: true });
await mkdir(CACHE, { recursive: true });

for (const [name, id] of manifest) {
  const src = path.join(CACHE, `${id}.jpg`);
  if (!(await exists(src))) {
    const res = await fetch(`https://images.unsplash.com/photo-${id}?w=2600&q=90&fm=jpg`);
    if (!res.ok) throw new Error(`Download failed for ${name}: ${res.status}`);
    await writeFile(src, Buffer.from(await res.arrayBuffer()));
  }
  // House grade: gentle desaturation, warm recombination, lifted (matte) blacks,
  // and a touch of softened highlights. Kept subtle on purpose.
  await sharp(src)
    .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
    .modulate({ saturation: 0.82, brightness: 1.0 })
    .recomb([
      [1.03, 0.02, 0.0],
      [0.01, 1.0, 0.0],
      [0.0, 0.03, 0.93],
    ])
    .linear(0.92, 12)
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(path.join(OUT, `${name}.jpg`));
  const meta = await sharp(path.join(OUT, `${name}.jpg`)).metadata();
  console.log(`${name}.jpg  ${meta.width}x${meta.height}`);
}
