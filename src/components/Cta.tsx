"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@/lib/analytics";
import { ArrowRight } from "./Icons";

type Variant = "primary" | "light" | "outline" | "arrow";

interface Props {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Where on the page this CTA lives — sent with the analytics event. */
  placement: string;
  className?: string;
  service?: string;
}

/**
 * Tracked call-to-action link. Every primary conversion path on the site goes
 * through this component so CTA performance can be compared by placement.
 */
export function Cta({ href, children, variant = "primary", placement, className = "", service }: Props) {
  const isInquiry = href.startsWith("/contact");
  const cls =
    variant === "arrow"
      ? `link-arrow ${className}`
      : `btn ${variant === "primary" ? "btn-primary" : variant === "light" ? "btn-light" : "btn-outline"} ${className}`;
  const target = service && isInquiry ? `${href}${href.includes("?") ? "&" : "?"}service=${service}` : href;
  return (
    <Link
      href={target}
      className={cls}
      onClick={() =>
        track(isInquiry ? "cta_inquiry_click" : "cta_click", {
          placement,
          label: typeof children === "string" ? children : undefined,
          destination: href,
          service,
        })
      }
    >
      <span>{children}</span>
      {variant === "arrow" && <ArrowRight />}
    </Link>
  );
}
