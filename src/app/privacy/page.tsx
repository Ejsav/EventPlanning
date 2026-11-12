// LEGAL REVIEW REQUIRED before public launch — see docs/09-launch-checklist.md.
import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects the information you share with us.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const contactLine = site.contact.email ? (
    <>
      by emailing <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
    </>
  ) : (
    <>
      through our <Link href="/contact">inquiry form</Link>
    </>
  );
  return (
    <LegalPage title="Privacy Policy" updated="November 12, 2026">
      <p>
        {site.name} is a brand of {site.legalEntity} (&ldquo;we&rdquo;, &ldquo;us&rdquo;). This policy explains what information we collect through{" "}
        {site.url.replace(/^https?:\/\//, "")}, how we use it, and the choices you have.
      </p>
      <h2>Information you give us</h2>
      <p>When you send an inquiry, we collect the details you choose to provide: your name and your partner&rsquo;s name, email address, phone number, wedding date or season, the service you&rsquo;re considering, venue or location, approximate guest count, budget range, how you heard about us, your message, and whether you&rsquo;d like to receive occasional planning notes.</p>
      <h2>Information collected automatically</h2>
      <ul>
        <li><strong>Referral information.</strong> We note how you arrived at the site (for example, a search engine or a campaign link) and attach it to your inquiry so we understand which channels are useful.</li>
        <li><strong>Analytics.</strong> If enabled, we use Google Analytics to understand how the site is used, with advertising features disabled. We do not send your name, email, phone number or message to analytics. You can opt out using &ldquo;Privacy choices&rdquo; in the footer, and we honor Global Privacy Control signals automatically.</li>
        <li><strong>Security.</strong> To prevent spam and abuse, we may process your IP address transiently. We store only a one-way hash for rate-limiting, not the address itself.</li>
      </ul>
      <h2>How we use information</h2>
      <ul>
        <li>To respond to your inquiry, arrange a consultation and prepare a proposal.</li>
        <li>To plan and deliver your wedding if you become a client.</li>
        <li>To send occasional planning notes, only if you opted in. You can unsubscribe at any time.</li>
        <li>To maintain the security of the site and improve it.</li>
      </ul>
      <h2>How we share information</h2>
      <p>We do not sell your personal information or share it for targeted advertising. We share it only with service providers who help us operate — such as our website host, email delivery provider and client-management software — under terms that limit their use of it, and with the planners and vendors working on your wedding once you engage us. We may disclose information when required by law.</p>
      <h2>Retention</h2>
      <p>We keep inquiry information for as long as needed to respond and, if you do not become a client, for no more than 24 months, after which it is deleted. Client records are kept as long as needed for the engagement and our legal and accounting obligations.</p>
      <h2>Your choices and rights</h2>
      <p>Depending on where you live — including under the Connecticut Data Privacy Act where it applies — you may have the right to access, correct, delete or obtain a copy of your personal information, and to opt out of its sale or use for targeted advertising (we do neither). To make a request, contact us {contactLine}. We will respond within the time required by applicable law and will not discriminate against you for exercising your rights.</p>
      <h2>Children</h2>
      <p>This site is intended for adults planning weddings. We do not knowingly collect information from children under 13.</p>
      <h2>Changes</h2>
      <p>If we change this policy, we will update the date above. Material changes will be highlighted on this page.</p>
      <h2>Contact</h2>
      <p>Questions about this policy can be sent {contactLine}.</p>
    </LegalPage>
  );
}
