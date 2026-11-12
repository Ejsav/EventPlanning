import Link from "next/link";
import type { ReactNode } from "react";
import { packageById, formatPrice } from "@/config/packages";

export interface Article {
  slug: string;
  title: string;
  /** Short title for search results (template adds the brand). */
  seoTitle: string;
  description: string;
  category: "Planning guide" | "Costs & pricing" | "Logistics";
  readMinutes: number;
  published: string;
  updated?: string;
  image: { src: string; alt: string; focus?: string };
  dek: string;
  related: ("full-service" | "partial" | "management")[];
  body: () => ReactNode;
}

const full = packageById("full-service");
const partial = packageById("partial");
const management = packageById("management");

export const articles: Article[] = [
  {
    slug: "how-much-wedding-planning-help-do-you-need",
    title: "Full-service, partial or wedding management: how much help do you actually need?",
    seoTitle: "How Much Wedding Planning Help Do You Need?",
    description:
      "How to choose between full-service wedding planning, partial planning and wedding management (month-of coordination), with honest signs for each.",
    category: "Planning guide",
    readMinutes: 7,
    published: "2026-11-12",
    image: { src: "/images/notebook.jpg", alt: "An open spiral notebook with a fountain pen resting across the page", focus: "50% 50%" },
    dek: "The three levels of planning support differ less in what happens on the wedding day than in when a planner joins you — and how much of the work they carry before it.",
    related: ["full-service", "partial", "management"],
    body: () => (
      <>
        <p>
          Almost every couple who contacts a planner asks some version of the same question: <em>how much help do we need?</em> The
          industry doesn&rsquo;t make it easy. One planner&rsquo;s &ldquo;day-of&rdquo; package starts two months out; another&rsquo;s
          &ldquo;partial planning&rdquo; looks like someone else&rsquo;s full service. Here is how to think about it clearly.
        </p>
        <h2>The real difference is when a planner joins you</h2>
        <p>
          On the wedding day itself, all three levels of support look similar: a professional team arrives first, works from a written
          timeline, directs vendors, solves problems and keeps you out of the logistics. What differs is everything before that day —
          how early a planner joins, and how many decisions and tasks they carry with you.
        </p>
        <ul>
          <li>
            <strong>Full-service planning</strong> usually begins 12 to 18 months out, often before a venue is booked. The planner leads
            the budget, venue search, every vendor, the design and the guest experience.
          </li>
          <li>
            <strong>Partial planning</strong> usually begins 6 to 9 months out, once a venue and a few key vendors are in place. The
            planner fills the gaps, refines the design and takes over vendor communication.
          </li>
          <li>
            <strong>Wedding management</strong> — often called month-of or day-of coordination — begins roughly 10 to 12 weeks out. You
            have planned the wedding; a professional confirms everything, builds the timeline and runs the day.
          </li>
        </ul>
        <h2>Signs you need full-service planning</h2>
        <ul>
          <li>You haven&rsquo;t booked a venue, or you&rsquo;re considering a private property or tent.</li>
          <li>You both work demanding jobs and can&rsquo;t realistically give the wedding several hours a week for a year.</li>
          <li>You want a cohesive design but don&rsquo;t want to source and manage a dozen vendors to get it.</li>
          <li>Many guests are traveling, and you want hotel blocks, transport and welcome events handled.</li>
        </ul>
        <p>
          Our <Link href={full.href}>{full.name}</Link> starts at {formatPrice(full.startingPrice)} as a flat fee.
        </p>
        <h2>Signs partial planning is right</h2>
        <ul>
          <li>You&rsquo;ve booked the venue and a few vendors you love, but the rest of the list feels endless.</li>
          <li>You have a clear vision and want an expert eye on it, not someone to replace it.</li>
          <li>Vendor emails, contracts and payment schedules have started to pile up.</li>
        </ul>
        <p>
          Our <Link href={partial.href}>{partial.name}</Link> starts at {formatPrice(partial.startingPrice)}.
        </p>
        <h2>Signs wedding management is enough</h2>
        <ul>
          <li>Your vendors are booked and your design is decided.</li>
          <li>You enjoy planning and have stayed organized — you just don&rsquo;t want to run the day yourselves.</li>
          <li>Your venue has a strong in-house team, such as a hotel or country club.</li>
        </ul>
        <p>
          Our <Link href={management.href}>{management.name}</Link> starts at {formatPrice(management.startingPrice)}. One caution:
          a venue coordinator is not a wedding planner. Venue coordinators look after the venue&rsquo;s interests and services; they
          generally don&rsquo;t manage outside vendors, your timeline or your family. Ask your venue exactly what their role covers.
        </p>
        <h2>The questions that settle it</h2>
        <ol className="list-decimal space-y-2 pl-6">
          <li>Is the venue booked?</li>
          <li>How many vendors are still unbooked?</li>
          <li>How many hours a week can the two of you honestly give this?</li>
          <li>Is anything unusual about your wedding — a tent, multiple locations, many traveling guests?</li>
        </ol>
        <p>
          If you&rsquo;re still unsure, that&rsquo;s exactly what an introductory call is for. We will tell you if you need less help than
          you think. You can also try the three-question guide on our <Link href="/packages-and-pricing#guide">packages and pricing page</Link>.
        </p>
      </>
    ),
  },
  {
    slug: "wedding-planner-cost-connecticut",
    title: "What does a wedding planner cost in Connecticut?",
    seoTitle: "Wedding Planner Cost in Connecticut",
    description:
      "How Connecticut wedding planners price their services, what drives the cost, and the published starting prices we found across the market.",
    category: "Costs & pricing",
    readMinutes: 6,
    published: "2026-11-12",
    image: { src: "/images/pen-letter.jpg", alt: "A fountain pen writing in cursive on lined paper", focus: "40% 50%" },
    dek: "Most planners don't publish their prices, which makes comparing them harder than it should be. Here is how pricing works, and what we found when we looked.",
    related: ["full-service", "partial", "management"],
    body: () => (
      <>
        <p>
          Wedding planning fees in Connecticut vary widely, and many planners share them only after a consultation. That&rsquo;s not
          always evasive — fees genuinely depend on scope — but it makes early budgeting harder. This guide explains how planners price,
          what moves the number, and what the published prices we reviewed actually looked like.
        </p>
        <h2>Three common pricing models</h2>
        <ul>
          <li>
            <strong>Flat fee.</strong> A fixed price for a defined scope. Easy to budget and to compare. This is how we price.
          </li>
          <li>
            <strong>Percentage of the wedding budget.</strong> Some planners charge a percentage of total spend, sometimes combined with a
            base fee. It scales with complexity, but it can feel misaligned: the planner earns more when you spend more.
          </li>
          <li>
            <strong>Hourly.</strong> Useful for consulting or very small events; harder to predict for a full wedding.
          </li>
        </ul>
        <h2>What we found in published Connecticut prices</h2>
        <p>
          In November 2026 we reviewed Connecticut planners who publish &ldquo;starting at&rdquo; prices on their own sites and on major
          wedding marketplaces. Among those that published figures:
        </p>
        <ul>
          <li>Day-of and month-of coordination commonly started between roughly $1,500 and $4,000.</li>
          <li>Partial planning commonly started between roughly $6,000 and $8,000.</li>
          <li>Full-service planning commonly started between roughly $8,000 and $12,000, with some planners adding a percentage of the wedding budget.</li>
        </ul>
        <p>
          Two cautions. First, &ldquo;starting at&rdquo; means the smallest, simplest wedding; most couples pay more than the minimum.
          Second, many established luxury planners in Fairfield County don&rsquo;t publish prices at all, and their fees are often well
          above these ranges.
        </p>
        <h2>What drives the fee up (or down)</h2>
        <ul>
          <li><strong>When the planner starts.</strong> Twelve months of work costs more than twelve weeks.</li>
          <li><strong>Guest count.</strong> More guests means more vendors, more seating logistics and more staff on the day.</li>
          <li><strong>Venue type.</strong> A tent on a private lawn requires building a venue from scratch. A hotel provides most of it.</li>
          <li><strong>Number of events.</strong> Welcome parties, rehearsal dinners and brunches each add planning and on-site hours.</li>
          <li><strong>Staffing.</strong> Ask how many people will be on site. One coordinator for 150 guests is thin.</li>
        </ul>
        <h2>Our published fees</h2>
        <p>
          We publish starting fees because we think couples deserve to know before they call: {management.name} from{" "}
          {formatPrice(management.startingPrice)}, {partial.name} from {formatPrice(partial.startingPrice)} and {full.name} from{" "}
          {formatPrice(full.startingPrice)}. Each is a flat fee, every wedding day is staffed with at least two people, and your exact
          number is written into a proposal before you commit. The full comparison is on our{" "}
          <Link href="/packages-and-pricing">packages and pricing page</Link>.
        </p>
        <h2>Questions to ask any planner about price</h2>
        <ol className="list-decimal space-y-2 pl-6">
          <li>Is your fee flat, a percentage, or both?</li>
          <li>How many people are on site on the wedding day, and for how many hours?</li>
          <li>Is travel included?</li>
          <li>Do you accept commissions or referral fees from vendors, and will you disclose them?</li>
          <li>What does the payment schedule look like, and what is refundable?</li>
        </ol>
      </>
    ),
  },
  {
    slug: "when-to-hire-a-wedding-planner-connecticut",
    title: "When should you hire a wedding planner in Connecticut?",
    seoTitle: "When to Hire a Wedding Planner in Connecticut",
    description:
      "When to book a wedding planner depends on the service and season you want. A practical Connecticut timeline for each level of planning help.",
    category: "Planning guide",
    readMinutes: 5,
    published: "2026-11-12",
    image: { src: "/images/ceremony-arch.jpg", alt: "A draped wooden ceremony arch decorated with garden roses against a grey sky and trees", focus: "35% 50%" },
    dek: "Earlier than most couples expect for full service; later than most fear for wedding management. Connecticut's short peak season changes the math.",
    related: ["full-service", "partial", "management"],
    body: () => (
      <>
        <p>
          Connecticut&rsquo;s wedding calendar is concentrated. June, September and the fall foliage weeks of October carry a large share
          of the year&rsquo;s weddings, and the most popular venues, photographers and planners book those Saturdays first. That
          compression is the main reason timing matters.
        </p>
        <h2>Full-service planning: before the venue</h2>
        <p>
          The most valuable moment to hire a full-service planner is before you sign a venue contract — ideally 12 to 18 months out. A
          planner can tell you what a venue&rsquo;s minimums, rules and hidden costs will mean for your budget, and help you avoid a
          property that looks perfect but works against your plans. For peak-season dates, earlier is better.
        </p>
        <h2>Partial planning: once the foundation is set</h2>
        <p>
          Partial planning works best around 6 to 9 months out, after the venue and one or two key vendors are booked but before the
          rest of the team is chosen. Hire too late and the best remaining vendors may already be committed for your date.
        </p>
        <h2>Wedding management: book early, start late</h2>
        <p>
          Wedding management begins about 10 to 12 weeks before the wedding — but the planner&rsquo;s calendar fills months earlier.
          Reserve your date as soon as your venue is booked, even though the work itself starts later. For a peak-season Saturday, waiting
          until the spring before can mean your first choice is unavailable.
        </p>
        <h2>What to have ready for the first call</h2>
        <ul>
          <li>A date, or two or three you&rsquo;re considering — even just a season and year.</li>
          <li>A sense of guest count, give or take twenty.</li>
          <li>The setting you&rsquo;re drawn to: shoreline, countryside, city, a family property.</li>
          <li>A working budget range, even a rough one. It helps a planner recommend the right level of help.</li>
          <li>What&rsquo;s already booked, and what feels hardest.</li>
        </ul>
        <p>
          You don&rsquo;t need a Pinterest board or a finished guest list. The first conversation is about understanding what you want and
          what you&rsquo;re worried about. When you&rsquo;re ready, <Link href="/contact">tell us about your wedding</Link>.
        </p>
      </>
    ),
  },
  {
    slug: "connecticut-wedding-guest-transportation-guide",
    title: "Guest transportation for a Connecticut wedding: a planner's guide",
    seoTitle: "Connecticut Wedding Guest Transportation Guide",
    description:
      "When a Connecticut wedding needs guest shuttles, how to size and route them, the Merritt Parkway rule, and how to choose a licensed, insured carrier.",
    category: "Logistics",
    readMinutes: 6,
    published: "2026-11-12",
    image: { src: "/images/couple-horizon.jpg", alt: "A couple walks hand in hand across a hilltop meadow under a hazy sky", focus: "55% 60%" },
    dek: "Transportation is the logistics guests notice most when it fails, and least when it works. It's also where our company's roots are.",
    related: ["full-service", "partial"],
    body: () => (
      <>
        <p>
          Before we planned weddings, our company coordinated event transportation in Connecticut. It taught us that a wedding can be
          beautifully designed and still feel stressful if guests can&rsquo;t find parking, wait forty minutes for a shuttle, or face an
          unlit country road at midnight. Here is how we think about getting guests where they need to be.
        </p>
        <h2>When you need guest shuttles</h2>
        <ul>
          <li>The ceremony and reception are at different locations.</li>
          <li>Guests are staying at hotels more than a few minutes from the venue.</li>
          <li>The venue has limited parking — common at harbors, inns and historic properties.</li>
          <li>The venue is rural, and the drive home will be dark and unfamiliar.</li>
          <li>You&rsquo;d simply rather nobody drove after the reception.</li>
        </ul>
        <h2>Sizing the fleet</h2>
        <p>
          Start with who will actually ride: guests at the room-block hotels, plus anyone without a car. Then decide between a single
          trip with enough seats for everyone or continuous loops with smaller vehicles. Single trips are simpler for ceremonies, where
          everyone must arrive together. Loops work well for the end of the night, when guests leave over an hour or two. Always plan a
          late-night final run and make sure guests know when it is.
        </p>
        <h2>Routing: the Merritt Parkway rule</h2>
        <p>
          The Merritt Parkway is the scenic way through Fairfield County — and it is closed to buses and commercial vehicles, along with
          any vehicle eight feet or taller. Guest shuttles must use I-95 or local roads. It sounds minor until a timeline assumes the faster
          parkway route on a Saturday afternoon. We route and time every run for the roads the vehicle can legally use.
        </p>
        <h2>Choosing a carrier</h2>
        <ul>
          <li>Ask for proof of operating authority and commercial insurance, and keep copies.</li>
          <li>Confirm the exact vehicles, capacities and whether they meet the venue&rsquo;s access and turning constraints.</li>
          <li>Get the schedule, pickup points, overtime rates and cancellation terms in writing.</li>
          <li>Ask who to call on the night — and make sure it&rsquo;s a person, not a voicemail.</li>
        </ul>
        <h2>Telling guests</h2>
        <p>
          Put shuttle times on the wedding website, in the hotel welcome note and on a small card in the room-block bags. Include the
          last return time in bold. Guests should never have to ask.
        </p>
        <p>
          Guest transportation planning is included in our <Link href={full.href}>{full.name}</Link>, supported in{" "}
          <Link href={partial.href}>{partial.name}</Link>, and available as an add-on to{" "}
          <Link href={management.href}>{management.name}</Link>. See the add-ons on our{" "}
          <Link href="/packages-and-pricing#add-ons">packages and pricing page</Link>.
        </p>
      </>
    ),
  },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
