"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { analyticsAllowed } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Client-side site behaviors:
 * - captures first-touch attribution
 * - enables scroll reveals only when motion is allowed (content is visible without JS)
 * - loads GA4 only when configured and permitted
 */
export function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const root = document.documentElement;
    root.classList.add("js-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    const els = document.querySelectorAll("[data-reveal]:not(.is-visible)");
    els.forEach((el) => {
      // Anything already in view on load is shown immediately (no flash, no LCP delay).
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) el.classList.add("is-visible");
      else io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (GA_ID && typeof window.gtag === "function" && analyticsAllowed()) {
      window.gtag("event", "page_view", { page_path: pathname });
    }
  }, [pathname]);

  if (!GA_ID) return null;
  return (
    <>
      <Script id="ga-consent" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        var optedOut = false;
        try { optedOut = localStorage.getItem('ss-analytics-opt-out') === '1'; } catch (e) {}
        if (navigator.globalPrivacyControl) optedOut = true;
        gtag('consent', 'default', {
          ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
          analytics_storage: optedOut ? 'denied' : 'granted'
        });
        gtag('js', new Date());
        gtag('config', '${GA_ID}', { send_page_view: false, anonymize_ip: true });
      `}</Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    </>
  );
}
