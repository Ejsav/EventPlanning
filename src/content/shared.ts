import { site } from "@/config/site";

export interface Faq {
  q: string;
  a: string;
}

/** The planning process, used on Home, Approach and service pages. */
export const process = [
  {
    title: "Inquiry",
    when: "Day one",
    body: `Tell us your date, your setting and how much help you think you need. We reply ${site.responseTime}.`,
  },
  {
    title: "Introductory call",
    when: "Within the week",
    body: "Thirty unhurried minutes, complimentary. We listen, ask the questions planners ask, and tell you honestly which level of support fits.",
  },
  {
    title: "Written proposal",
    when: "Two to three days later",
    body: "A clear scope, a flat fee and a payment schedule — plus an introduction to the lead planner who would run your wedding.",
  },
  {
    title: "Agreement",
    when: "When you're ready",
    body: "A signed agreement and retainer reserve your date. Your shared planning workspace and timeline open the same week.",
  },
  {
    title: "Planning",
    when: "The months between",
    body: "Regular meetings, a live budget, vendor management and a production schedule that grows more precise every week.",
  },
  {
    title: "The wedding",
    when: "The day itself",
    body: "Your planning team arrives first and leaves last, working from a written run of show every vendor has confirmed.",
  },
];

/** Commitments: our trust anchor. Every line is an operating policy the business can keep. */
export const commitments = [
  { title: "Published pricing", body: "Starting fees are on this website. Your exact fee is a flat number, written into your proposal before you sign." },
  { title: "Meet your planner first", body: "You are introduced to your lead planner before you commit, and that planner leads your wedding day." },
  { title: "Never fewer than two", body: "Every wedding day is staffed by a lead planner and at least one assistant, so someone is always with you." },
  { title: "Your money stays yours", body: "You pay vendors directly. We track every deposit and due date in a budget you can see at any time." },
  { title: "Disclosed relationships", body: "We recommend vendors on merit. If a referral arrangement ever exists, it is disclosed to you in writing." },
  { title: "A reply you can count on", body: `Every inquiry receives a personal reply ${site.responseTime} — never an automated sales sequence.` },
];

export const homeFaqs: Faq[] = [
  {
    q: "Is a wedding planner worth the cost?",
    a: "For most couples, a planner pays for itself in three ways: time returned (the logistics alone can fill your evenings and weekends for months), mistakes avoided (missed contract terms, unrealistic timelines, no rain plan), and a wedding day you spend as a guest instead of a manager. We publish our fees so you can weigh that value honestly.",
  },
  {
    q: "How much help do we actually need?",
    a: "If you haven't booked a venue and want someone to lead, consider Full-Service Planning. If you have a venue and some vendors but feel stretched, Partial Planning fits. If your plan is largely complete and you want professionals to finalize and run it, choose Wedding Management. Our introductory call exists to answer this for your situation — and we'll tell you if you need less than you think.",
  },
  {
    q: "Will we keep control of the important decisions?",
    a: "Always. We bring options, recommendations and the reasoning behind them; you make the decisions. Nothing is booked, signed or spent without your approval.",
  },
  {
    q: "Can you work with vendors we've already booked?",
    a: "Yes. Most of our Partial Planning and Wedding Management couples arrive with vendors in place. We introduce ourselves, review the contracts for logistics and timing, and become their single point of contact.",
  },
  {
    q: "Who will actually coordinate our wedding?",
    a: "A lead planner from our vetted team of experienced, independent wedding professionals — introduced to you before you sign, and the same person who runs your wedding day, supported by at least one assistant.",
  },
  {
    q: "What happens after we inquire?",
    a: `We reply ${site.responseTime} to arrange a complimentary introductory call. If we're a good fit, you'll receive a written proposal with a flat fee two to three days later. There is no obligation at any stage.`,
  },
];
