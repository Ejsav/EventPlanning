import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { packages } from "@/config/packages";
import { regions } from "@/content/locations";
import { articles } from "@/content/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-11-12");
  const page = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page("/", 1, "weekly"),
    page("/services", 0.8),
    ...packages.map((p) => page(p.href, 0.9)),
    page("/packages-and-pricing", 0.9),
    page("/approach", 0.6),
    page("/about", 0.6),
    page("/locations", 0.7),
    ...regions.map((r) => page(`/locations/${r.slug}`, 0.8)),
    page("/journal", 0.6, "weekly"),
    ...articles.map((a) => ({ ...page(`/journal/${a.slug}`, 0.6), lastModified: new Date(a.updated ?? a.published) })),
    page("/contact", 0.8),
    page("/privacy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ];
}
