"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { primaryNav } from "@/config/navigation";
import { site } from "@/config/site";
import { packages, formatPrice } from "@/config/packages";
import { track } from "@/lib/analytics";
import { Wordmark } from "./Logo";
import { ArrowRight } from "./Icons";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const lastY = useRef(0);
  const servicesRef = useRef<HTMLLIElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close any open navigation when the route changes (adjusting state during render).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
    setServicesOpen(false);
  }

  // Intelligent sticky header: hides while reading down, returns on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 220);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Services dropdown: close on outside click / Escape.
  useEffect(() => {
    if (!servicesOpen) return;
    const onDown = (e: PointerEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        servicesRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  // Mobile menu: scroll lock, Escape to close, focus trap.
  useEffect(() => {
    if (!menuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const panel = menuRef.current;
    const focusables = () => Array.from(panel?.querySelectorAll<HTMLElement>("a, button") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
      if (e.key === "Tab") {
        const items = focusables();
        const first = items[0];
        const last = items[items.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, closeMenu]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const openHover = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setServicesOpen(true);
  };
  const closeHover = () => {
    hoverTimer.current = setTimeout(() => setServicesOpen(false), 180);
  };

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper eyebrow">
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-[var(--ease-editorial)] ${
          hidden && !menuOpen && !servicesOpen ? "-translate-y-full" : "translate-y-0"
        } ${scrolled || menuOpen ? "border-b hairline bg-paper/95 backdrop-blur-[6px]" : "border-b border-transparent bg-paper"}`}
      >
        <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" className="relative z-10 flex items-center py-2" aria-label={`${site.name} — home`}>
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-3">
              {primaryNav.map((item) =>
                "children" in item ? (
                  <li key={item.href} ref={servicesRef} className="relative" onPointerEnter={(e) => e.pointerType === "mouse" && openHover()} onPointerLeave={(e) => e.pointerType === "mouse" && closeHover()}>
                    <button
                      type="button"
                      aria-expanded={servicesOpen}
                      aria-controls="services-menu"
                      onClick={() => setServicesOpen((v) => !v)}
                      className={`eyebrow flex items-center gap-2 px-3 py-3 transition-colors hover:text-cranberry ${isActive(item.href) ? "text-cranberry" : ""}`}
                    >
                      {item.label}
                      <svg viewBox="0 0 10 6" className={`h-1.5 w-2.5 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} aria-hidden="true">
                        <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.1" />
                      </svg>
                    </button>
                    <div
                      id="services-menu"
                      hidden={!servicesOpen}
                      className="absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-3"
                    >
                      <div className="border hairline bg-paper p-2 shadow-[0_24px_60px_-30px_rgba(26,34,41,0.35)]">
                        <ul>
                          {packages.map((p) => (
                            <li key={p.id}>
                              <Link href={p.href} className="group flex items-baseline justify-between gap-6 px-5 py-4 transition-colors hover:bg-linen">
                                <span>
                                  <span className="block font-serif text-[1.375rem] leading-tight">{p.name}</span>
                                  <span className="mt-1 block font-serif text-[0.95rem] italic text-granite">{p.promise}</span>
                                </span>
                                <span className="eyebrow shrink-0 text-granite group-hover:text-cranberry">From {formatPrice(p.startingPrice)}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-1 flex items-center justify-between border-t hairline px-5 pb-2 pt-4">
                          <Link href="/services" className="link-arrow">
                            All services <ArrowRight />
                          </Link>
                          <Link href="/packages-and-pricing" className="eyebrow text-granite hover:text-ink">
                            Compare packages
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`eyebrow block px-3 py-3 transition-colors hover:text-cranberry ${isActive(item.href) ? "text-cranberry" : ""}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={site.primaryCta.href}
              onClick={() => track("cta_inquiry_click", { placement: "header" })}
              className="btn btn-primary hidden min-h-11 px-5 py-3 sm:inline-flex"
            >
              Inquire
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              className="eyebrow -mr-2 flex min-h-11 items-center gap-3 px-2 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span>{menuOpen ? "Close" : "Menu"}</span>
              <span className="relative block h-3 w-6" aria-hidden="true">
                <span className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${menuOpen ? "top-1.5 rotate-45" : "top-0.5"}`} />
                <span className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${menuOpen ? "top-1.5 -rotate-45" : "top-2.5"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!menuOpen}
        className="fixed inset-0 top-[var(--header-h)] z-40 overflow-y-auto bg-paper lg:hidden"
      >
        <div className="container-page flex min-h-full flex-col pb-10 pt-6">
          <nav aria-label="Mobile">
            <ol className="border-t hairline">
              {[{ label: "Home", href: "/" }, ...primaryNav].map((item, i) => (
                <li key={item.href} className="border-b hairline">
                  <Link href={item.href} className="flex items-baseline gap-5 py-4" aria-current={pathname === item.href ? "page" : undefined}>
                    <span className="eyebrow w-6 text-cranberry">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-serif text-[2rem] font-light leading-none">{item.label}</span>
                  </Link>
                  {"children" in item && (
                    <ul className="-mt-1 pb-4 pl-11">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className="block py-2 font-serif text-[1.125rem] italic text-granite">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <div className="mt-auto pt-10">
            <Link href={site.primaryCta.href} className="btn btn-primary w-full" onClick={() => track("cta_inquiry_click", { placement: "mobile_menu" })}>
              {site.primaryCta.label}
            </Link>
            <p className="mt-4 text-center font-serif text-[0.95rem] italic text-granite">We reply to every inquiry {site.responseTime}.</p>
          </div>
        </div>
      </div>
    </>
  );
}
