"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

/** A slim inquiry bar for phones, shown once the visitor has scrolled past the opening screen. */
export function MobileCta() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const suppressed = pathname.startsWith("/contact");

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY > document.body.scrollHeight - 900;
      setShow(window.scrollY > window.innerHeight * 0.9 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (suppressed) return null;
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t hairline bg-paper/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-[6px] transition-transform duration-500 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
      inert={!show}
    >
      <Link href="/contact" className="btn btn-primary w-full" onClick={() => track("cta_inquiry_click", { placement: "mobile_sticky" })}>
        Inquire about your wedding
      </Link>
    </div>
  );
}
