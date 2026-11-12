import type { Faq } from "./shared";

/**
 * Regional landing pages. Each one carries genuinely local planning knowledge
 * (transport, seasonality, venue styles) rather than swapped town names.
 * No venue partnerships are claimed; venues are described by type only.
 * To add a region (e.g. Rhode Island, the Berkshires), add an entry here.
 */
export interface Region {
  slug: string;
  name: string;
  /** H1 for the page. */
  headline: string;
  metaTitle: string;
  metaDescription: string;
  townsShort: string;
  towns: string[];
  image: { src: string; alt: string; focus?: string };
  intro: string[];
  settings: { name: string; body: string }[];
  logistics: { title: string; body: string }[];
  season: string;
  servicesNote: string;
  faqs: Faq[];
}

export const regions: Region[] = [
  {
    slug: "fairfield-county",
    name: "Fairfield County",
    headline: "Wedding planning in Fairfield County",
    metaTitle: "Fairfield County Wedding Planner",
    metaDescription:
      "Wedding planning and management in Fairfield County, CT — Greenwich, Westport, Darien, New Canaan and Stamford. Club, estate and tented weddings.",
    townsShort: "Greenwich · Westport · Darien · New Canaan · Stamford",
    towns: ["Greenwich", "Old Greenwich", "Stamford", "Darien", "New Canaan", "Norwalk", "Rowayton", "Westport", "Weston", "Wilton", "Ridgefield", "Fairfield", "Southport"],
    image: { src: "/images/estate-shingle.jpg", alt: "A grey-shingled house with a white wraparound porch above a broad green lawn", focus: "45% 50%" },
    intro: [
      "Fairfield County weddings tend to happen in one of three places: a private club on the water, a family property under a tent, or a historic house with a garden that photographs beautifully in late afternoon light. Each asks for a different kind of planning.",
      "Many guests will come up from Manhattan or across from Westchester, so the plan has to work for people arriving by train, by car service and by their own wheels on a Saturday when I-95 is rarely kind. We build the day around those realities from the start.",
    ],
    settings: [
      { name: "Private clubs on the Sound", body: "Golf, beach and yacht clubs often require a member sponsor and come with their own catering and house rules. We work within those rules and coordinate everything the club doesn't provide." },
      { name: "Tented weddings at home", body: "A backyard or family estate wedding means building a venue from nothing: tent, flooring, power, lighting, restrooms, catering kitchen and a weather plan. It is the most rewarding — and most logistics-heavy — wedding there is." },
      { name: "Historic houses and gardens", body: "Beautiful, and usually strict about load-in windows, vendor insurance, candles and end times. We read the venue agreement closely so its rules shape the timeline instead of surprising it." },
    ],
    logistics: [
      { title: "Metro-North matters", body: "Greenwich, Stamford, Darien, Westport and Fairfield all sit on the New Haven Line, and New Canaan has its own branch. For city guests we plan arrival windows around the train schedule and arrange station pickups where they help." },
      { title: "The Merritt Parkway is not a shuttle route", body: "Commercial vehicles — including buses — are prohibited on the Merritt Parkway. Guest shuttles are routed on I-95 or local roads, and we time departures with Saturday traffic in mind." },
      { title: "Town permits for tents", body: "Larger tents and private-property events typically involve permits and sign-off from the town's building and fire officials. We build those approvals into the planning calendar early." },
      { title: "Hotel blocks book early", body: "Hotel inventory clusters in Stamford, Greenwich and Norwalk. For peak-season dates, we recommend securing room blocks as soon as the date and venue are confirmed." },
    ],
    season: "June and September through mid-October are the most requested months. Waterfront weddings bring afternoon sea breezes worth planning for — in ceremony placement, in florals and in what the officiant can be heard over.",
    servicesNote: "All three services are available throughout Fairfield County. Tented and private-estate weddings typically need Full-Service or Partial Planning because of the production involved; club weddings with a strong in-house team are often well served by Wedding Management.",
    faqs: [
      { q: "Do you plan tented weddings at private homes in Fairfield County?", a: "Yes. Private-property weddings are a core part of what we plan, including tent and rental coordination, permit timelines, power and restrooms, neighbor considerations and a complete weather plan. They are usually best served by Full-Service or Partial Planning." },
      { q: "Can you help guests coming from New York City?", a: "Yes. We plan arrival windows around Metro-North, coordinate station pickups or shuttles where useful, and put clear travel details in your guest communication." },
    ],
  },
  {
    slug: "connecticut-shoreline",
    name: "The Connecticut Shoreline",
    headline: "Shoreline wedding planning, from Branford to Stonington",
    metaTitle: "Connecticut Shoreline Wedding Planner",
    metaDescription:
      "Waterfront wedding planning on the Connecticut shoreline — Guilford, Madison, Old Saybrook, Essex, Old Lyme, Mystic and Stonington.",
    townsShort: "Guilford · Madison · Old Saybrook · Essex · Mystic · Stonington",
    towns: ["Branford", "Guilford", "Madison", "Clinton", "Westbrook", "Old Saybrook", "Essex", "Old Lyme", "Niantic", "Waterford", "New London", "Groton", "Mystic", "Stonington"],
    image: { src: "/images/hero-shoreline.jpg", alt: "A couple embraces on a stony beach beneath a pale overcast sky", focus: "50% 35%" },
    intro: [
      "The shoreline is where many Connecticut couples picture their wedding: salt air, a harbor full of masts, a long table as the light goes gold over the water. It is also where the weather, the wind and summer traffic have the most to say.",
      "We plan shoreline weddings with the water in mind — when the sun sets, where the wind comes from, how guests get from the hotel to a harbor-side ceremony on a July Saturday, and exactly what happens if the fog rolls in.",
    ],
    settings: [
      { name: "Waterfront hotels and inns", body: "Seaside hotels and historic inns offer ceremony lawns, ballrooms and rooms for guests under one roof — the simplest logistics on the coast, provided room blocks are secured early." },
      { name: "Yacht clubs and harbors", body: "Intimate and atmospheric, often with tight capacities, firm end times and limited parking. Shuttles and a careful arrival plan make them work." },
      { name: "River towns and maritime history", body: "Essex, Old Lyme and Mystic pair the Connecticut River and maritime heritage with walkable villages that make lovely welcome-party settings." },
    ],
    logistics: [
      { title: "Sunset, tides and wind", body: "We set ceremony times from the actual sunset for your date and plan ceremony orientation around prevailing breezes. Waterfront tents need wind-rated installation and a clear plan for weather calls." },
      { title: "Summer traffic on I-95", body: "Eastbound Friday afternoons and summer Saturdays can be slow toward the Rhode Island beaches. Timelines include realistic travel buffers for vendors and guests alike." },
      { title: "Train-friendly for out-of-town guests", body: "Amtrak stops at Old Saybrook, New London and Mystic, and Shore Line East connects New Haven with the coast — useful for guests coming from New York or Boston." },
      { title: "Beaches and public land", body: "Public beaches and parks have their own permit rules, restrictions and noise limits. We confirm what is permitted before a site is promised to anyone." },
    ],
    season: "Summer weekends book first and fill hotels quickly; September is often the shoreline's best-kept secret, with warm water and softer light. Late-season waterfront weddings need heaters, sidewalls and an honest temperature conversation.",
    servicesNote: "All three services are available along the shoreline. Waterfront hotels with strong event teams pair well with Wedding Management; island, beach and harbor weddings with more moving parts are best served by Partial or Full-Service Planning, often with our guest transportation add-on.",
    faqs: [
      { q: "What happens if it rains at a waterfront ceremony?", a: "Every shoreline plan includes a written weather plan with a decision deadline, a tent or indoor alternative already reserved, and a clear call-time so vendors and guests know what to expect." },
      { q: "Can you coordinate shuttles between shoreline hotels and the venue?", a: "Yes. Our guest transportation add-on covers route and timing plans, vehicles sourced from licensed carriers and a dispatch contact on the day." },
    ],
  },
  {
    slug: "new-haven",
    name: "New Haven",
    headline: "Wedding planning in New Haven",
    metaTitle: "New Haven Wedding Planner",
    metaDescription:
      "Wedding planning and coordination in New Haven, CT and nearby towns — historic halls, restaurants, museums and lofts, with published pricing.",
    townsShort: "New Haven · Hamden · Woodbridge · Milford · Branford",
    towns: ["New Haven", "Hamden", "Woodbridge", "Orange", "West Haven", "East Haven", "Milford", "North Haven", "Wallingford", "Cheshire"],
    image: { src: "/images/loft-light.jpg", alt: "A tall, light-filled loft with sheer curtains and candles scattered across a polished floor", focus: "50% 50%" },
    intro: [
      "New Haven is Connecticut's most urban wedding setting — a city of historic halls, museums, celebrated restaurants and converted industrial spaces, with a university's architecture as the backdrop for portraits.",
      "City weddings trade lawns and tents for loading docks, street parking and building rules. Planned well, they are some of the most memorable celebrations in the state: guests walk from dinner to a late-night bar, and the whole weekend feels like a destination.",
    ],
    settings: [
      { name: "Historic halls and institutions", body: "Grand rooms with strict rules on load-in, decor, candles and vendor insurance. We read every clause so the timeline respects them." },
      { name: "Restaurants and private dining", body: "Ideal for rehearsal dinners, welcome parties and intimate weddings. We coordinate menus, timing and the details restaurants don't usually manage." },
      { name: "Lofts and raw spaces", body: "A blank canvas that needs everything brought in — rentals, catering infrastructure, lighting and sometimes restrooms. Production-heavy, and worth it." },
    ],
    logistics: [
      { title: "Union Station is a gift", body: "Metro-North, Amtrak and Shore Line East all serve New Haven's Union Station, making the city one of the easiest Connecticut weddings for guests without cars." },
      { title: "Check the university calendar", body: "Commencement and reunion weekends in late spring fill hotels and restaurants. We check the academic calendar before you commit to a date." },
      { title: "Load-in, parking and permits", body: "Downtown venues often have limited loading access and parking. We schedule vendor arrivals precisely and plan guest parking or drop-off before the invitations go out." },
    ],
    season: "Spring and fall are New Haven's strongest seasons. Winter city weddings — candlelit dinners, velvet and a late-night pizza delivery — are underrated and often have more date availability.",
    servicesNote: "Restaurant and hotel weddings with experienced in-house teams are often a perfect fit for Wedding Management. Loft and raw-space weddings usually need Partial or Full-Service Planning.",
    faqs: [
      { q: "Do you plan restaurant weddings and rehearsal dinners in New Haven?", a: "Yes. Restaurant weddings can be coordinated under any of our services, and rehearsal dinners or welcome parties are available as add-ons from $1,200." },
      { q: "Which dates should we avoid in New Haven?", a: "Late-spring university commencement and reunion weekends put pressure on hotels and restaurants. We check the calendar with you before you sign a venue contract." },
    ],
  },
  {
    slug: "hartford-county",
    name: "Hartford County",
    headline: "Wedding planning in Hartford County & the Farmington Valley",
    metaTitle: "Hartford Wedding Planner & Coordinator",
    metaDescription:
      "Wedding planning and management in Hartford County, CT — West Hartford, Farmington, Avon, Simsbury and Glastonbury estates, clubs and orchards.",
    townsShort: "Hartford · West Hartford · Farmington · Simsbury · Glastonbury",
    towns: ["Hartford", "West Hartford", "Farmington", "Avon", "Simsbury", "Canton", "Glastonbury", "Wethersfield", "South Windsor", "Suffield", "Windsor"],
    image: { src: "/images/reception-ballroom.jpg", alt: "A reception room with tall windows and round tables dressed in white linen and blush florals", focus: "50% 55%" },
    intro: [
      "Hartford County offers some of Connecticut's best value for a beautifully executed wedding: historic mansions, country clubs, Farmington Valley estates and orchard properties, all within easy reach of an international airport.",
      "The region's venues are often generous with space and guest counts, which makes thoughtful design and a precise timeline even more important. A large room should still feel intimate, and a long evening should still feel effortless.",
    ],
    settings: [
      { name: "Historic mansions and estates", body: "Period architecture and formal grounds, often with preferred-vendor lists and specific rules. We coordinate within them and fill the gaps." },
      { name: "Country clubs", body: "Polished in-house catering and service teams, which pair beautifully with a planner who handles design, outside vendors and the timeline." },
      { name: "Orchards and farm properties", body: "Seasonal and photogenic, with more infrastructure to plan — from power and lighting to restrooms and a plan for a muddy lawn." },
    ],
    logistics: [
      { title: "Flying in? Bradley is close", body: "Bradley International Airport in Windsor Locks makes Hartford County one of the easiest Connecticut regions for guests flying in. We include airport timing in guest travel planning." },
      { title: "More room in the hotel blocks", body: "Compared with the coast, Hartford County has a broader range of hotels at a range of prices, which makes multi-night guest weekends easier to arrange." },
      { title: "Spread-out venues mean planned transport", body: "Valley venues can sit twenty or more minutes from hotels on dark, winding roads. Guest shuttles are often worth it — for comfort and for safety." },
    ],
    season: "Late spring and the fall foliage weeks are peak. Orchard and farm venues are especially popular in September and October, so those dates book early.",
    servicesNote: "All three services are available. Country club weddings often suit Wedding Management or Partial Planning; estate and farm weddings with more production typically suit Partial or Full-Service Planning.",
    faqs: [
      { q: "Do you serve West Hartford and the Farmington Valley?", a: "Yes — Hartford, West Hartford, Farmington, Avon, Simsbury, Canton, Glastonbury and the surrounding towns are all within our standard service area, with travel included in our fees." },
      { q: "Is Wedding Management enough for a country club wedding?", a: "Often, yes. Clubs typically provide strong catering and service teams. Wedding Management adds the timeline, vendor coordination and on-site direction that a club's banquet team doesn't usually cover." },
    ],
  },
  {
    slug: "litchfield-hills",
    name: "The Litchfield Hills",
    headline: "Wedding planning in the Litchfield Hills",
    metaTitle: "Litchfield County Wedding Planner",
    metaDescription:
      "Wedding planning in Litchfield County, CT — country inns, farms, vineyards, lakes and estates in Washington, Litchfield, Kent and Salisbury.",
    townsShort: "Litchfield · Washington · Kent · Salisbury · New Preston",
    towns: ["Litchfield", "Washington", "Washington Depot", "New Preston", "Kent", "Cornwall", "Sharon", "Salisbury", "Norfolk", "Roxbury", "Woodbury", "New Milford"],
    image: { src: "/images/ceremony-lakeside.jpg", alt: "White ceremony chairs lined up on a lawn facing a lake with wooded hills beyond", focus: "50% 50%" },
    intro: [
      "Northwest Connecticut is the state's countryside wedding destination: stone walls, country inns, farms and lakes, and a two-hour drive from Manhattan that makes the whole weekend feel like an escape.",
      "That remoteness is the appeal — and the planning challenge. Guests spread across inns and rentals, cell service can be patchy, and country roads are very dark at 11 p.m. A Litchfield wedding is as much a hospitality and logistics exercise as a design one.",
    ],
    settings: [
      { name: "Country inns", body: "Intimate, elegant and often limited in rooms and capacity. Ideal for smaller weddings and full-buyout weekends." },
      { name: "Farms, vineyards and barns", body: "Atmospheric settings that frequently need rentals, power, lighting and restrooms brought in, plus a weather plan for open fields." },
      { name: "Lakes and private estates", body: "Lakeside lawns and family properties with sweeping views — and every element of production to plan, from tent to transport." },
    ],
    logistics: [
      { title: "Guests will be spread out", body: "Lodging is limited and scattered across inns, B&Bs and rentals. We map where guests are staying and build a shuttle plan around it." },
      { title: "Plan the drive home", body: "Rural roads are unlit and unfamiliar to most guests. Late-night return shuttles are one of the most valuable things a Litchfield wedding can provide." },
      { title: "Don't count on cell service", body: "Some properties have limited coverage. We confirm vendor communication plans in advance and carry printed timelines and contact sheets." },
    ],
    season: "Peak foliage in the Litchfield Hills typically arrives in early to mid-October, and those weekends are the most sought-after of the year. June brings long evenings and green hills; late summer offers warm lake days.",
    servicesNote: "Because of the travel and production involved, Litchfield weddings are usually best served by Full-Service or Partial Planning, often with our guest transportation add-on. Wedding Management is available for inn and venue weddings with a strong on-site team.",
    faqs: [
      { q: "Do you charge travel for Litchfield County weddings?", a: "No. Travel within Connecticut is included in our fees. If an overnight stay is needed for an early start or a multi-day wedding, we discuss it openly in your proposal." },
      { q: "How do we get guests to and from a countryside venue?", a: "We map guest lodging, then plan shuttles from inns and hotels to the venue and back — including late-night return runs, which matter on unlit country roads." },
    ],
  },
];

export const regionBySlug = (slug: string) => regions.find((r) => r.slug === slug);
