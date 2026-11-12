// LEGAL REVIEW REQUIRED before public launch — see docs/09-launch-checklist.md.
import type { Metadata } from "next";
import { site } from "@/config/site";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms governing use of the ${site.name} website, including how published pricing, availability and licensed photography should be understood.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="November 12, 2026">
      <p>
        These terms govern your use of this website, operated by {site.legalEntity} under the brand {site.name}. By using the site you agree to them.
        They do not govern planning services, which are provided only under a separate written client agreement.
      </p>
      <h2>Information on this site</h2>
      <p>We work to keep information accurate and current, but it is provided for general information only. Prices shown are starting fees for typical weddings; your fee, scope and terms are set only in a written proposal and signed agreement. Submitting an inquiry does not reserve a date or create a client relationship.</p>
      <h2>Availability</h2>
      <p>Dates are reserved only by a signed agreement and retainer. Nothing on this site guarantees availability for a particular date.</p>
      <h2>Photography and content</h2>
      <p>Photography on this site is licensed editorial imagery used for inspiration and does not depict weddings produced by {site.name}. Text, design, logos and other content are owned by or licensed to {site.legalEntity} and may not be copied or reused without permission.</p>
      <h2>Acceptable use</h2>
      <p>Please don&rsquo;t misuse the site — for example by submitting false inquiries, attempting to disrupt it, or scraping it in bulk.</p>
      <h2>Links</h2>
      <p>Links to third-party sites are provided for convenience. We are not responsible for their content or practices.</p>
      <h2>Disclaimer and limitation of liability</h2>
      <p>The site is provided &ldquo;as is&rdquo;. To the fullest extent permitted by law, {site.legalEntity} is not liable for indirect or consequential damages arising from your use of the site.</p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the State of Connecticut.</p>
      <h2>Changes</h2>
      <p>We may update these terms from time to time. The date above shows the latest revision.</p>
    </LegalPage>
  );
}
