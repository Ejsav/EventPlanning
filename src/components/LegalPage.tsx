import type { ReactNode } from "react";
import { Breadcrumbs } from "./Section";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <section className="container-page pb-24 pt-8 md:pt-12">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: title }]} />
      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h1 className="display-lg max-w-[10ch]">{title}</h1>
          <p className="eyebrow mt-6 text-granite">Last updated {updated}</p>
        </div>
        <div className="prose-editorial max-w-[44rem] text-ink/85 lg:col-span-8 [&_h2]:!text-[1.75rem]">{children}</div>
      </div>
    </section>
  );
}
