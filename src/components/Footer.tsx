import Link from "next/link";
import { site } from "@/config/site";
import { packages } from "@/config/packages";
import { locationLinks } from "@/config/locations-index";
import { Mark } from "./Logo";
import { PrivacyChoices } from "./PrivacyChoices";

export function Footer() {
  const year = new Date().getFullYear();
  const { email, phone, instagram, pinterest } = site.contact;
  return (
    <footer className="bg-harbor-deep text-paper">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link href="/" className="inline-flex items-center gap-3" aria-label={`${site.name} — home`}>
            <Mark className="h-9 w-9" />
            <span className="font-serif text-[1.75rem] leading-none">
              Sound <em className="font-light italic text-mist">&amp;</em> Stone
            </span>
          </Link>
          <p className="mt-6 max-w-xs font-serif text-[1.0625rem] italic leading-relaxed text-paper/70">
            {site.descriptor} for Connecticut, from Greenwich to Stonington.
          </p>
          {(email || phone) && (
            <ul className="mt-6 space-y-1 text-[1.0625rem]">
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="underline decoration-paper/30 underline-offset-4 hover:decoration-paper">
                    {email}
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="hover:text-mist">
                    {phone}
                  </a>
                </li>
              )}
            </ul>
          )}
        </div>

        <FooterCol title="Services" className="lg:col-span-2">
          {packages.map((p) => (
            <FooterLink key={p.id} href={p.href}>
              {p.name}
            </FooterLink>
          ))}
          <FooterLink href="/packages-and-pricing">Packages &amp; Pricing</FooterLink>
        </FooterCol>

        <FooterCol title="Where we plan" className="lg:col-span-3">
          {locationLinks.map((l) => (
            <FooterLink key={l.href} href={l.href}>
              {l.name}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Company" className="lg:col-span-3">
          <FooterLink href="/approach">Our Approach</FooterLink>
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/journal">Journal</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
          {instagram && <FooterLink href={instagram} external>Instagram</FooterLink>}
          {pinterest && <FooterLink href={pinterest} external>Pinterest</FooterLink>}
        </FooterCol>
      </div>

      <div className="container-page">
        <div className="flex border-t hairline-light py-8 flex-col gap-5 text-[0.875rem] text-paper/60 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-2">
            <p>
              &copy; {year} {site.name} is a brand of {site.legalEntity}, a Connecticut company. We serve clients at their venues
              throughout Connecticut and New England and do not operate a public storefront.
            </p>
            <p>Photography shown is licensed editorial imagery used for inspiration; it does not depict weddings produced by {site.name}.</p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 eyebrow">
            <li><Link href="/privacy" className="hover:text-paper">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-paper">Terms</Link></li>
            <li><PrivacyChoices /></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 className="eyebrow font-sans text-seaglass">{title}</h2>
      <ul className="mt-5 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <li>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-[1.0625rem] text-paper/85 transition-colors hover:text-mist">
          {children}
        </a>
      ) : (
        <Link href={href} className="text-[1.0625rem] text-paper/85 transition-colors hover:text-mist">
          {children}
        </Link>
      )}
    </li>
  );
}
