import type { Faq } from "./shared";

export const fullServicePhases = [
  {
    when: "12–18 months out",
    title: "Foundation",
    items: ["Budget architecture and guest-count planning", "Venue search, tours and contract negotiation", "Date strategy for peak and off-peak seasons", "Your master planning calendar"],
  },
  {
    when: "9–12 months out",
    title: "The team",
    items: ["Photographer, caterer, florist, music, rentals, officiant and more", "Proposals compared side by side, in plain English", "Contract review and negotiation", "A single payment schedule for every vendor"],
  },
  {
    when: "6–9 months out",
    title: "Design",
    items: ["Design concept, palette and mood", "Floor plans and tablescape mock-ups", "Florals, rentals and lighting selection", "Stationery direction and signage"],
  },
  {
    when: "4–8 months out",
    title: "Your guests",
    items: ["Hotel room blocks", "Guest transportation plan and vendor sourcing", "Welcome experience and wedding-website details", "RSVP tracking and seating-chart support"],
  },
  {
    when: "Final 8 weeks",
    title: "Production",
    items: ["Production schedule for every vendor", "Confirmations by name and by phone", "Final venue walkthrough", "Rehearsal direction"],
  },
  {
    when: "The weekend",
    title: "Your wedding",
    items: ["Lead planner and two assistants, up to 14 hours", "Setup through load-out", "Final payments and gratuities distributed for you", "A fully stocked emergency kit"],
  },
];

export const fullServiceFaqs: Faq[] = [
  { q: "How involved will we be?", a: "As involved as you like. Most couples meet with us monthly and make every meaningful decision — the venue, the look, the people — while we handle research, logistics, negotiation and follow-up between meetings." },
  { q: "Do you have preferred vendors?", a: "We recommend vendors on merit and fit for your wedding, not from a fixed list. If any referral arrangement ever exists with a recommended vendor, we disclose it to you in writing." },
  { q: "Can you plan a full-service wedding in less than 12 months?", a: "Often, yes. A shorter runway narrows the choice of venues and vendors for peak dates, so we'll tell you honestly on our first call what's realistic for your date." },
  { q: "How is the fee determined?", a: "Full-Service Planning starts at the published fee for weddings of up to roughly 150 guests at a single venue. Guest count, tented or private-property production, multiple events and travel beyond Connecticut can raise it. Your fee is flat and confirmed in writing before you sign." },
  { q: "Do you plan multi-day weddings?", a: "Yes. Welcome parties, rehearsal dinners and farewell brunches can be planned as part of your full-service engagement and are priced transparently in your proposal." },
];

export const partialScenarios = [
  { title: "“We booked the venue, then life got busy.”", body: "The big decision is made, the rest of the list is long, and evenings are already spoken for. We take over the remaining sourcing and the vendor inbox." },
  { title: "“We know exactly what we want — we just need it to work.”", body: "You have a clear vision and good taste. We pressure-test it: the timeline, the floor plan, the budget and the rain plan." },
  { title: "“Our vendors are great, but nobody's in charge.”", body: "Each vendor knows their part. Nobody knows how the parts fit together. That becomes our job." },
];

export const partialIncludes = [
  { title: "Plan & budget", items: ["A full audit of your plan to date", "Budget review and a shared tracking sheet", "A master planning calendar"] },
  { title: "Vendor team", items: ["Recommendations for remaining vendors", "Contract review for logistics and timing", "We become every vendor's point of contact"] },
  { title: "Design", items: ["Design review and refinement", "Floor plan and layout", "Rental and décor guidance"] },
  { title: "Production & day-of", items: ["Production schedule and run of show", "Final walkthrough and rehearsal direction", "Lead planner and assistant, up to 12 hours"] },
];

export const partialSplit = {
  yours: ["The creative lead and final say on every vendor", "Your guest list and family conversations", "Design choices — with an expert opinion when you want it"],
  ours: ["Vendor communication, follow-ups and confirmations", "Contracts, timelines, floor plans and the budget tracker", "Everything on the day, from load-in to last dance"],
};

export const partialFaqs: Faq[] = [
  { q: "What's the difference between partial planning and wedding management?", a: "Timing and depth. Partial Planning begins six to nine months out and includes vendor recommendations, design refinement and six planning meetings. Wedding Management begins ten to twelve weeks out, when the plan is largely complete." },
  { q: "We've already booked most of our vendors. Is partial planning still worth it?", a: "Possibly not — if your plan is mostly complete, Wedding Management may serve you just as well for less. We'll tell you which fits on our introductory call." },
  { q: "How many meetings are included?", a: "Six planning meetings — in person, by video or at your venue — plus email support between meetings and the final walkthrough and rehearsal." },
  { q: "Can you help with design even if we're doing most of it ourselves?", a: "Yes. Design review and refinement is included: we look at your palette, florals, rentals and layout, and suggest changes that make it more cohesive or more practical." },
];

export const managementWeeks = [
  { when: "12 weeks", title: "Handoff & plan audit", body: "We review every contract, the budget and your plans so far, and flag anything missing, unrealistic or unconfirmed." },
  { when: "10 weeks", title: "Vendor introductions", body: "We introduce ourselves to each vendor and become their point of contact for logistics and timing." },
  { when: "6 weeks", title: "Timeline & floor plan", body: "A first draft of the wedding-day timeline and floor plan, shared with you for review." },
  { when: "4 weeks", title: "Final walkthrough", body: "We walk the venue with you: ceremony, cocktail hour, reception, rain plan, load-in and the room flip." },
  { when: "2 weeks", title: "Confirmations", body: "Every vendor confirmed by name and by phone: arrival times, contacts, final counts and requirements." },
  { when: "Wedding week", title: "Run of show & rehearsal", body: "The final run of show goes to every vendor. We direct the rehearsal so everyone knows where to stand and when to walk." },
];

/** An illustrative example — labeled as such on the page. */
export const sampleRunOfShow = [
  ["10:00", "Planning team arrives; vendor load-in begins"],
  ["10:30", "Hair and makeup underway; personal details collected for setup"],
  ["13:30", "Florals delivered; ceremony site set"],
  ["14:45", "First look and portraits"],
  ["16:00", "Guest shuttles depart the hotel"],
  ["16:30", "Guests arrive; prelude music"],
  ["17:00", "Ceremony"],
  ["17:30", "Cocktail hour; reception room finished and checked"],
  ["18:30", "Grand entrance, toasts and dinner service"],
  ["20:15", "First dance; dancing begins"],
  ["22:45", "Last dance; send-off"],
  ["23:00", "Final shuttles depart"],
  ["23:45", "Load-out complete; your personal items packed and handed off"],
];

export const managementFaqs: Faq[] = [
  { q: "What's the difference between a venue coordinator and Wedding Management?", a: "A venue coordinator represents the venue and its services. We represent you: we manage every outside vendor, own the timeline, direct the ceremony and look after your family and wedding party throughout the day." },
  { q: "Why do you start ten to twelve weeks out instead of just the day of?", a: "Because problems are found in the plan, not on the day. Starting early gives us time to spot gaps, confirm every vendor and build a timeline everyone has agreed to before anyone arrives." },
  { q: "What if our wedding is less than ten weeks away?", a: "Get in touch. If we have availability, we can often compress the process, and we'll be honest about what's realistic." },
  { q: "Will you set up our décor and personal items?", a: "Yes. We place the items you provide — escort cards, signage, favors, guest book, personal photos — according to the floor plan, and pack them up at the end of the night." },
  { q: "Do you handle vendor payments and tips on the day?", a: "We distribute final payments and gratuities that you prepare in labeled envelopes, so you never have to think about them during the celebration." },
];
