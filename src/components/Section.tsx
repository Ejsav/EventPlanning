import Link from "next/link";
import type { ReactNode } from "react";

/** Magazine-style folio label: "No. 03 — The approach". */
export function Folio({ number, children, className = "", light = false }: { number?: string; children: ReactNode; className?: string; light?: boolean }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${light ? "text-seaglass" : "text-granite"} ${className}`}>
      {number && <span className={light ? "text-paper" : "text-cranberry"}>No. {number}</span>}
      {number && <span className={`h-px w-8 ${light ? "bg-paper/40" : "bg-ink/25"}`} aria-hidden="true" />}
      <span>{children}</span>
    </p>
  );
}

export function Breadcrumbs({ items, light = false }: { items: { name: string; href?: string }[]; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={`eyebrow ${light ? "text-paper/60" : "text-granite"}`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className={`transition-colors ${light ? "hover:text-paper" : "hover:text-ink"}`}>
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className={light ? "text-paper" : "text-ink"}>
                {item.name}
              </span>
            )}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
