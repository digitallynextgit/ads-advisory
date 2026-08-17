/**
 * Single source of truth for site copy.
 * Every string here is transcribed from ADS_Advisors_Website_Content.pdf so the
 * approved wording can be reviewed and edited in one place.
 */

export const site = {
  name: "The ADS Advisors",
  shortName: "ADS Advisors",
  tagline: "The India-Japan bridge, built in person.",
  description:
    "The ADS Advisors builds the working bridge between governments, institutions and businesses across India and Japan.",
  url: "https://theadsadvisors.com",
} as const;

export const contact = {
  person: "Adarsh Saini",
  phone: "+91 99993 70763",
  phoneHref: "tel:+919999370763",
  email: "adarsh@theadsadvisors.com",
  addressLines: ["86-Ring Road Market", "Sarojini Nagar", "New Delhi-110023"],
  address: "86-Ring Road Market, Sarojini Nagar, New Delhi-110023",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/universities", label: "Universities" },
  { href: "/business", label: "Business" },
  { href: "/contact", label: "Contact" },
] as const;

/* ---------------------------------------------------------------- Home --- */

export const positioning = {
  lead: "The ADS Advisors builds the working bridge between governments, institutions and businesses across India and Japan.",
  /**
   * Display-only split so the statement sets as exactly two lines on desktop
   * rather than being left to reflow into three. Joined with a space these must
   * reproduce `lead` verbatim - asserted below so an edit to one cannot
   * silently desync from the other.
   */
  leadLines: [
    "The ADS Advisors builds the working bridge between governments,",
    "institutions and businesses across India and Japan.",
  ],
  body: "Where diplomacy opens the door, we make sure the right people walk through it, and stay in the room long enough for something real to happen.",
} as const;

if (process.env.NODE_ENV !== "production") {
  const rejoined = positioning.leadLines.join(" ");
  if (rejoined !== positioning.lead) {
    throw new Error(
      `positioning.leadLines must rejoin to positioning.lead.\n  got:      ${rejoined}\n  expected: ${positioning.lead}`,
    );
  }
}

export const whatWeDo = [
  {
    index: "01",
    title: "Government to Government",
    body: "We work alongside ministries, prefectures and diplomatic missions to convert bilateral goodwill into structured, on-ground engagement, from protocol and delegation logistics to the follow-through that keeps a relationship alive after the visit ends.",
  },
  {
    index: "02",
    title: "Government to Institutions",
    body: "We connect universities and academic institutions directly with visiting government delegations and industry leaders, creating a platform where accreditation, research strength and placement ambition meet the people who can act on them.",
  },
  {
    index: "03",
    title: "Business to Business",
    body: "We give companies entering or expanding across the India-Japan corridor direct access to counterparts, talent pipelines and policy stakeholders, cutting through years of cold outreach in a matter of days.",
  },
] as const;

export const flagship = {
  eyebrow: "Currently convening",
  title: "Indo-Japan Delegation Engagement Programme",
  body: "A high-level Japanese delegation of nearly 200 CEOs, senior bureaucrats and government ministers arrives in India this August, hosted in association with the Prime Minister's Office and the Government of Uttar Pradesh. Delegates represent organisations spanning finance, energy, infrastructure, automotive, semiconductors, industrial robotics and hospitality, alongside prefectural governments and Japanese universities. This is the kind of access The ADS Advisors was built to create.",
  stats: [
    { value: 200, prefix: "~", suffix: "", label: "CEOs, bureaucrats and ministers" },
    { value: 14, prefix: "", suffix: "", label: "Sectors represented" },
    { value: 2, prefix: "", suffix: "", label: "Governments hosting" },
  ],
} as const;

/* -------------------------------------------------------- Photo timeline --- */

export type TimelineEntry = {
  src: string;
  alt: string;
  caption: string;
  place: string;
  width: number;
  height: number;
};

export const timelineIntro = {
  title: "A relationship built in person, not on paper.",
  body: "A running visual record of the meetings, visits and moments that have shaped India-Japan engagement, and the role The ADS Advisors has played in bringing them together.",
} as const;

export const timeline: TimelineEntry[] = [
  {
    src: "/timeline/01-arrival-welcome.webp",
    alt: "Uttar Pradesh Chief Minister Yogi Adityanath being presented with a bouquet on arrival in Japan.",
    caption:
      "UP Chief Minister Yogi Adityanath is welcomed on arrival in Japan, marking the start of a visit aimed at expanding industrial relations and human resource exchange between Uttar Pradesh and Japan.",
    place: "Arrival, Japan",
    width: 1280,
    height: 854,
  },
  {
    src: "/timeline/02-delegation-received-tokyo.webp",
    alt: "The Uttar Pradesh delegation seated for a formal group photograph with Japanese counterparts in Tokyo.",
    caption:
      "The Uttar Pradesh delegation is received formally in Tokyo, opening a new chapter in UP-Japan cooperation.",
    place: "Tokyo",
    width: 2400,
    height: 1600,
  },
  {
    src: "/timeline/03-traditional-welcome.webp",
    alt: "A young girl applies a ceremonial tilak to the Chief Minister during a traditional welcome in Japan.",
    caption:
      "A traditional welcome is extended to the Chief Minister during the visit, reflecting the warmth alongside the formal diplomacy of the engagement.",
    place: "Tokyo",
    width: 1280,
    height: 854,
  },
  {
    src: "/timeline/04-ambassador-panel.webp",
    alt: "India's Ambassador to Japan speaking on a panel beside Japanese governors, with the Indian flag behind.",
    caption:
      "India's Ambassador to Japan, Nagma Mohamed Mallick (centre), speaks during a panel discussion at the launch of the India-Japan Governors' Network on 16 February 2026, at the Indian Embassy in Tokyo.",
    place: "Indian Embassy, Tokyo",
    width: 900,
    height: 506,
  },
  {
    src: "/timeline/05-nagasaki-speech.webp",
    alt: "Yamanashi Governor Kotaro Nagasaki speaking at a podium marked Embassy of India, Japan.",
    caption:
      "Yamanashi Governor Kotaro Nagasaki delivers a speech at the India-Japan Governors' Network launch in Tokyo.",
    place: "Indian Embassy, Tokyo",
    width: 1600,
    height: 898,
  },
  {
    src: "/timeline/06-miyagi-vice-governor.webp",
    alt: "The Miyagi Vice Governor speaking into a microphone at a panel table beside the Indian flag.",
    caption:
      "The Miyagi Vice Governor speaks during a panel discussion at the launch of the India-Japan Governors' Network in Tokyo.",
    place: "Indian Embassy, Tokyo",
    width: 900,
    height: 506,
  },
  {
    src: "/timeline/07-tottori-governor.webp",
    alt: "Tottori Governor Shinji Hirai delivering a statement at the Embassy of India podium in Tokyo.",
    caption:
      "Tottori Governor Shinji Hirai delivers a statement at the launch of the Governors' Network in Tokyo.",
    place: "Indian Embassy, Tokyo",
    width: 1600,
    height: 898,
  },
  {
    src: "/timeline/08-cm-with-japanese-leaders.webp",
    alt: "Chief Minister Yogi Adityanath standing with Japanese government and industry leaders.",
    caption:
      "Chief Minister Yogi Adityanath with Japanese government and industry leaders during the visit, part of a wider effort to expand industrial relations and human resource exchange.",
    place: "Uttar Pradesh",
    width: 2400,
    height: 1702,
  },
  {
    src: "/timeline/09-robotics-facility.webp",
    alt: "Chief Minister Yogi Adityanath inspecting a collaborative robot arm at a Japanese robotics facility.",
    caption:
      "Chief Minister Yogi Adityanath holds discussions with Yamanashi Prefecture Governor Kotaro Nagasaki at a robotics facility, further strengthening UP-Yamanashi industrial cooperation.",
    place: "Yamanashi Prefecture",
    width: 1280,
    height: 904,
  },
  {
    src: "/timeline/10-closed-door-mou.webp",
    alt: "Closed-door meeting between the Uttar Pradesh and Yamanashi delegations around a conference table.",
    caption:
      "Closed-door discussions between the Uttar Pradesh and Yamanashi delegations, with Japan's Yamanashi Governor proposing an August visit to Uttar Pradesh following the signing of the Memorandum of Understanding.",
    place: "Yamanashi Prefecture",
    width: 1280,
    height: 767,
  },
];

/* --------------------------------------------------------------- About --- */

export const story = {
  paragraphs: [
    "The ADS Advisors was founded on a simple observation: India and Japan have no shortage of goodwill between them. What has always been harder to find is the person who picks up the phone, books the room, briefs the delegation and makes sure the right institution is sitting across the table when it matters.",
    "That gap, between diplomatic intent and working execution, is where we operate. We are not a policy think tank and we are not a travel and logistics company. We sit in between, translating high-level bilateral relationships into structured engagements that universities, companies and government bodies can actually act on.",
    "Over the past several years, this has meant coordinating institutional visits, structuring delegation programmes, and building the kind of on-ground relationships that ordinarily take embassies and trade bodies years to establish. Our work spans government-to-government coordination, university and industry engagement, and the detailed protocol work that sits underneath any high-level visit, from the Chief Minister's office to a prefectural governor's delegation.",
    "Our current flagship undertaking is the Indo-Japan Delegation Engagement Programme, convened in association with the Prime Minister's Office and the Government of Uttar Pradesh. It brings together close to 200 Japanese CEOs, bureaucrats and ministers with Indian universities and businesses, building directly on the Memorandum of Understanding signed between Uttar Pradesh and Japan's Yamanashi Prefecture, and on the diplomatic groundwork laid over multiple visits between the two governments.",
  ],
  pullQuote:
    "We are not a policy think tank and we are not a travel and logistics company. We sit in between.",
} as const;

export const whyWeExist = {
  title: "Why We Exist",
  body: "Most institutions and businesses only get one kind of access to a foreign delegation: a name on an invitation list, or a seat in the back of a hall. We think that is a waste of a genuinely rare opportunity. Our role is to make sure the institutions and companies we work with are not just present in the room, but positioned to walk out of it with something concrete, a placement pipeline, a research partnership, an investment conversation, a signed commitment.",
} as const;

export const approach = [
  {
    index: "01",
    title: "Government-first credibility",
    body: "Every engagement we build sits on a foundation of genuine government backing, not manufactured proximity to power. It is what gets Japanese CEOs and ministers to the table in the first place.",
  },
  {
    index: "02",
    title: "Precision over scale",
    body: "We would rather secure the right ten institutions a real conversation than fill a hall with names that go nowhere. Slots, meetings and introductions are curated, not sold in bulk.",
  },
  {
    index: "03",
    title: "Follow-through as standard",
    body: "Our work does not end when the delegation leaves the room. Coordination, documentation and facilitation continue well past the event itself, because that is where most of the real value gets realised.",
  },
  {
    index: "04",
    title: "Discretion and protocol",
    body: "We operate in rooms where diplomatic sensitivity matters. Confidentiality, protocol and formality are built into how we work, not treated as an afterthought.",
  },
] as const;

export const team = [
  {
    name: "Adarsh Saini",
    initials: "AS",
    role: "Founder, The ADS Advisors",
    bio: "Adarsh Saini founded The ADS Advisors to close the gap between diplomatic intent and on-ground execution in India's engagement with the world. His work has included coordinating institutional and government-level engagement through the Confederation of Indian Industry (CII), and building relationships across ministries, prefectural governments and industry bodies that today form the backbone of the firm's delegation and institutional work. He leads the firm's government relations, delegation strategy and client engagement.",
    focus: ["Government relations", "Delegation strategy", "Client engagement"],
  },
  {
    name: "Aditi Chaudhary",
    initials: "AC",
    role: "Business Development Lead, The ADS Advisors",
    bio: "Aditi Chaudhary leads business development at The ADS Advisors, managing institutional outreach, partner onboarding and the relationships that carry each engagement from first conversation through to confirmed participation. She works closely with universities, institutions and corporate partners to shape their participation and ensure every engagement is positioned for the outcomes they are seeking.",
    focus: ["Institutional outreach", "Partner onboarding", "Participation strategy"],
  },
] as const;

/* -------------------------------------------------------- Universities --- */

export const universities = {
  opportunity: {
    title: "The Opportunity",
    paragraphs: [
      "For most Indian institutions, a direct, structured audience with foreign CEOs and government ministers, in the same room, on the same day, with a clear agenda already in place, is simply not reachable through ordinary channels. Relationships like these are usually built slowly through embassy introductions or years of individual outreach with no guarantee of a real outcome.",
      "The ADS Advisors changes that equation. We give universities and institutions a direct, government-backed platform to present themselves to visiting delegations, structured specifically around the outcomes that matter to academic institutions: placements, exchange, research, and investment.",
    ],
  },
  provide: [
    {
      index: "01",
      title: "Direct Interaction",
      body: "A dedicated, time-bound slot to present your institution before delegation members, including a formal photo opportunity and an official participation letter.",
    },
    {
      index: "02",
      title: "Pitch Session",
      body: "A structured interaction with visiting CEOs and government officials, built around research partnerships, student placements, faculty exchange and investment linkage, not a generic institutional overview.",
    },
    {
      index: "03",
      title: "Networking & Collateral",
      body: "Inclusion in the curated delegation networking environment and in official briefing materials, positioning your institution firmly within the wider engagement ecosystem.",
    },
    {
      index: "04",
      title: "PR & Media Coverage",
      body: "Press and media coverage of your institution's participation, extending the value of the day beyond the room and into your institution's own public profile.",
    },
    {
      index: "05",
      title: "Coordination & Follow-Up",
      body: "End-to-end logistics and protocol support, plus structured facilitation connecting your institution with interested delegates once the event itself is over.",
    },
  ],
  outcomes: [
    {
      title: "Student placements",
      body: "Direct pitches to visiting companies for internships and full-time placement pipelines for your students and graduates.",
    },
    {
      title: "Faculty exchange",
      body: "Two-way arrangements including joint teaching and visiting scholar programmes.",
    },
    {
      title: "Research & collaboration",
      body: "Joint research projects, sponsored labs, technology transfer and CSR-funded academic initiatives.",
    },
    {
      title: "Investment linkage",
      body: "Positioning your institution as a partner of choice for foreign investment in skilling, infrastructure and innovation.",
    },
  ],
  steps: [
    {
      title: "Confirm interest",
      body: "Notify The ADS Advisors of your institution's intent to participate and reserve a slot.",
    },
    {
      title: "Submit your institutional profile",
      body: "Share your accreditation, rankings, flagship programmes and the specific outcomes you are seeking.",
    },
    {
      title: "Confirm participation",
      body: "Complete the onboarding process to formally secure your slot.",
    },
    {
      title: "Prepare the pitch",
      body: "Work with our team to refine your presentation for maximum impact ahead of the event.",
    },
    {
      title: "Engage and follow up",
      body: "Present before the delegation, and pursue the connections that follow with our continued facilitation support.",
    },
  ],
} as const;

/* ------------------------------------------------------------ Business --- */

export const business = {
  opportunity: {
    title: "The Opportunity",
    paragraphs: [
      "Entering or expanding within the India-Japan corridor usually means navigating two things at once: a talent market you don't yet have relationships in, and a policy and government landscape that takes years to learn from the outside. The ADS Advisors shortens that timeline considerably.",
      "We work with Japanese and international companies looking to engage India, and with Indian businesses looking to build relationships across Japan's corporate and government landscape, giving both sides direct access to the people, institutions and policymakers that matter.",
    ],
  },
  provide: [
    {
      index: "01",
      title: "Talent Pipeline Access",
      body: "Direct introductions into India's academic and technical talent base, built through our existing relationships with universities and institutions across the country.",
    },
    {
      index: "02",
      title: "Government-Level Access",
      body: "Structured engagement with the government bodies, ministries and prefectural offices that shape policy and investment conditions on both sides.",
    },
    {
      index: "03",
      title: "Institutional Partnerships",
      body: "Facilitated connections with universities and research institutions for sponsored research, technology transfer and long-term collaboration.",
    },
    {
      index: "04",
      title: "Coordination & Protocol Support",
      body: "Full logistics, protocol and delegation support for any engagement, so your team can focus on the relationship rather than the arrangements around it.",
    },
  ],
  sectors: [
    "Automotive and automotive components",
    "Industrial robotics",
    "Semiconductors",
    "Electronics",
    "Advanced materials and chemicals",
    "Clean energy and green hydrogen",
    "Infrastructure and construction",
    "Finance and banking",
    "Food processing and beverages",
    "Hospitality and tourism",
    "Pharmaceuticals and healthcare",
    "Agriculture",
    "IT and technology services",
    "Public economic institutions",
  ],
} as const;

export const interestOptions = ["University / Institution", "Business / Corporate"] as const;
