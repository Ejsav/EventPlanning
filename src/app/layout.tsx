import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCta } from "@/components/MobileCta";
import { SiteEffects } from "@/components/SiteEffects";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";

// Self-hosted, subset variable fonts (built by scripts/subset-fonts.py, SIL OFL).
// The roman is preloaded; the italic is only used for accents, so it stays off
// the critical path.
const newsreader = localFont({
  src: "../fonts/newsreader-roman.woff2",
  weight: "300 500",
  style: "normal",
  variable: "--font-newsreader",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const newsreaderItalic = localFont({
  src: "../fonts/newsreader-italic.woff2",
  weight: "300 500",
  style: "italic",
  variable: "--font-newsreader-italic",
  display: "swap",
  preload: false,
  adjustFontFallback: "Times New Roman",
});

const jost = localFont({
  src: "../fonts/jost.woff2",
  weight: "400 500",
  variable: "--font-jost",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Connecticut Wedding Planner & Wedding Management`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${site.name} — ${site.descriptor}, Connecticut` }],
  },
  twitter: { card: "summary_large_image" },
  robots: process.env.NEXT_PUBLIC_NOINDEX === "true" ? { index: false, follow: false } : { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#f5f2ec",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={`${newsreader.variable} ${newsreaderItalic.variable} ${jost.variable}`}>
      <body>
        <Header />
        <main id="main" tabIndex={-1} className="pt-[var(--header-h)] outline-none">
          {children}
        </main>
        <Footer />
        <MobileCta />
        <SiteEffects />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
