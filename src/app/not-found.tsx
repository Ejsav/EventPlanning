import Link from "next/link";
import { Mark } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70vh] flex-col items-start justify-center py-24">
      <Mark className="h-12 w-12 text-cranberry" />
      <p className="eyebrow mt-8 text-granite">Page not found</p>
      <h1 className="display-lg mt-4 max-w-[16ch]">This path wandered off the map.</h1>
      <p className="mt-6 max-w-lg text-ink/75">The page you were looking for may have moved. Here are a few places to pick the thread back up.</p>
      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
        <Link href="/" className="btn btn-primary">Return home</Link>
        <Link href="/services" className="link-arrow">Services</Link>
        <Link href="/packages-and-pricing" className="link-arrow">Pricing</Link>
        <Link href="/contact" className="link-arrow">Inquire</Link>
      </div>
    </section>
  );
}
