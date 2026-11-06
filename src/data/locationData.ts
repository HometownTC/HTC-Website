/**
 * Hometown TC — Data-Driven Regional Location Pages
 * Add a new location here to automatically publish a dedicated landing page
 * without any layout, component, or routing code modifications.
 */

export interface LocationFeature {
  title: string;
  description: string;
}

export interface LocationFaq {
  question: string;
  answer: string;
}

export interface LocationPageConfig {
  slug: string;
  breadcrumbLabel: string;
  badge: string;
  h1Title: string;
  h1Accent: string;
  introParagraph: string;
  countyName: string;
  mlsBoard: string;
  citiesCovered: string[];
  keyChallenges: LocationFeature[];
  complianceItems: string[];
  faqs: LocationFaq[];
  metaTitle: string;
  metaDescription: string;
  /** Official sources behind the local facts on the page (shown as links; required for new pages). */
  sources?: { title: string; link: string }[];
}

// Wave 1 local pages (Nov 6, 2026). Every local fact links to an official source in `sources`.
// Per HTC practice: the title company runs permit searches and orders estoppels; HTC tracks and confirms receipt.
const SHARED_CHECKLIST = (place: string): string[] => [
  `Written confirmation of the Effective Date on every ${place} file, so every deadline is built from the right day`,
  'A full timeline of contract deadlines, sent to you and tracked to closing',
  'File Integrity Audit: a second pair of eyes on the contract and file, with anything we see brought to you for your call',
  'Tracking of the title company’s permit search and lien results, and of association estoppels, until they are received and on file',
  'Condo and HOA document requests tracked on the checklist (listing side or buyer side, as the contract calls for)',
  'Lender, title and co-op agent follow-up so nothing stalls between milestones',
  'A clean, complete file for your broker’s review',
  'You lead every client conversation; we work behind you',
];

const MILESTONE_FAQ = {
  question: 'Which Florida condo buildings need a milestone inspection?',
  answer:
    'Under section 553.899, Florida Statutes, condominium and cooperative buildings three habitable stories or taller need a milestone inspection by December 31 of the year they turn 30 (a local building official can require it at 25 based on conditions such as closeness to salt water), then every 10 years. The association must send each unit owner the inspector’s summary within 45 days of receiving the report. We make sure the summary is on the document checklist for your file.',
};

const PRICING_FAQ = (place: string) => ({
  question: `How much does a transaction coordinator cost in ${place}?`,
  answer:
    'HTC’s Contract-to-Close service, the Hometown Signature, is a flat $495 per closed side. It is never a percentage of your commission. Agents who want listing support and extras included every month can choose SCALE. See the pricing page for everything each plan includes.',
});

const LEAD_FAQ = {
  question: 'Will HTC talk to my clients?',
  answer:
    'Only the way you want us to. You lead every client relationship, and on luxury files the agent is the only voice the client hears. We keep the dates, documents and people on track behind you. Licensed activities always stay with you and your broker.',
};

export const LOCATION_PAGES: Record<string, LocationPageConfig> = {
  'palm-beach-county-transaction-coordinator': {
    slug: 'palm-beach-county-transaction-coordinator',
    breadcrumbLabel: 'Palm Beach County',
    badge: 'Palm Beach County · Boca Raton to Jupiter',
    h1Title: 'Transaction Coordinator for Realtors in',
    h1Accent: 'Palm Beach County, Florida',
    introParagraph:
      'Hometown Transaction Coordinators supports Palm Beach County Realtors from signed contract to funded closing, for a flat fee per closed side. You lead the client relationship. We keep every date, document and party on track behind you, on standard and luxury files alike.',
    countyName: 'Palm Beach County',
    mlsBoard: 'Permits: Palm Beach County ePZB (unincorporated areas) plus each city’s own building department',
    citiesCovered: ['Boca Raton', 'Delray Beach', 'Boynton Beach', 'West Palm Beach', 'Palm Beach Gardens', 'Jupiter', 'Wellington', 'Lake Worth Beach'],
    keyChallenges: [
      {
        title: 'Two permit systems, depending on the address',
        description:
          'Palm Beach County’s Building Division issues permits for unincorporated areas through its ePZB portal, while cities such as Boca Raton and West Palm Beach run their own building departments. We track that the title company’s permit search comes back for the right jurisdiction and bring any open items to you early.',
      },
      {
        title: 'Condo milestone inspections',
        description:
          'Florida’s milestone inspection law covers condo and co-op buildings three habitable stories or taller once they reach 30 years, then every 10 years. When your file is a condo, we make sure the inspector’s summary is requested in the document set and tracked on the checklist.',
      },
      {
        title: 'Deadlines that start on the Effective Date',
        description:
          'Every Florida contract deadline runs from the Effective Date. We confirm it in writing on day one and build your full timeline from it, so inspection, financing and closing dates are built from the right day.',
      },
    ],
    complianceItems: SHARED_CHECKLIST('Palm Beach County'),
    faqs: [
      {
        question: 'Does HTC work with Realtors in Palm Beach County?',
        answer:
          'Yes. HTC supports Realtors across Miami-Dade, Broward and Palm Beach counties, including Boca Raton, Delray Beach, Boynton Beach, West Palm Beach, Palm Beach Gardens and Jupiter.',
      },
      {
        question: 'Who checks for open permits on a Palm Beach County property?',
        answer:
          'The title company runs the permit and lien search. For unincorporated Palm Beach County, permits are tracked in the County’s ePZB portal; properties inside a city are handled by that city’s building department. HTC tracks the results until they are on file and brings anything open to you.',
      },
      MILESTONE_FAQ,
      PRICING_FAQ('Palm Beach County'),
      LEAD_FAQ,
    ],
    sources: [
      { title: 'Palm Beach County Planning, Zoning & Building, Permit Center (ePZB)', link: 'https://discover.pbc.gov/pzb/building/Pages/Permit-Center.aspx' },
      { title: 'Florida Statutes § 553.899, Mandatory structural inspections for condominium and cooperative buildings', link: 'https://m.flsenate.gov/Statutes/553.899' },
    ],
    metaTitle: 'Palm Beach County Transaction Coordinator for Realtors | Hometown TC',
    metaDescription:
      'Transaction coordination for Palm Beach County Realtors, from Boca Raton to Jupiter. Flat $495 per closed side, Effective Date confirmed day one, agent-led on every file.',
  },

  'fort-lauderdale-transaction-coordinator': {
    slug: 'fort-lauderdale-transaction-coordinator',
    breadcrumbLabel: 'Fort Lauderdale',
    badge: 'Fort Lauderdale · Broward County',
    h1Title: 'Transaction Coordinator for Realtors in',
    h1Accent: 'Fort Lauderdale, Florida',
    introParagraph:
      'From Las Olas condos to single-family homes across the city, Hometown Transaction Coordinators keeps Fort Lauderdale files moving from signed contract to funded closing. Flat fee per closed side. You lead the client; we run the file behind you.',
    countyName: 'Fort Lauderdale',
    mlsBoard: 'Permits & records: City of Fort Lauderdale LauderBuild portal · Broward County',
    citiesCovered: ['Las Olas', 'Downtown Fort Lauderdale', 'Victoria Park', 'Coral Ridge', 'Rio Vista', 'Galt Ocean Mile', 'Wilton Manors', 'Oakland Park'],
    keyChallenges: [
      {
        title: 'Broward’s 25-year building safety inspections',
        description:
          'Under Broward County Board of Rules and Appeals Policy 05-05, Fort Lauderdale requires a safety inspection when most buildings reach 25 years, then every 10 years (small homes of up to four units and three stories are exempt). On condo and multifamily files, we make sure the building’s inspection status is part of the document request and tracked on the checklist.',
      },
      {
        title: 'City records live in LauderBuild',
        description:
          'Fort Lauderdale’s LauderBuild portal lets anyone run a basic record search by address. The title company’s permit search is still the record for closing; we track it until it is on file and flag anything open to you while there is time to act.',
      },
      {
        title: 'Condo milestone inspections',
        description:
          'Condo and co-op buildings three habitable stories or taller also fall under Florida’s milestone inspection law at 30 years. Associations must send owners the inspector’s summary within 45 days, and we make sure it is requested for your file.',
      },
    ],
    complianceItems: SHARED_CHECKLIST('Fort Lauderdale'),
    faqs: [
      {
        question: 'Does HTC work with Fort Lauderdale Realtors?',
        answer:
          'Yes. HTC supports Realtors throughout Fort Lauderdale and Broward County, as well as Miami-Dade and Palm Beach counties.',
      },
      {
        question: 'What is the Fort Lauderdale Building Safety Inspection Program?',
        answer:
          'It is the City’s version of Broward County’s program under Board of Rules and Appeals Policy 05-05. Most buildings need a safety inspection by a licensed engineer or architect at 25 years and every 10 years after. Single-family homes and small buildings of up to four units and three stories are exempt. The City mails notices between June 1 and August 31, and owners have 180 days to submit the report.',
      },
      MILESTONE_FAQ,
      PRICING_FAQ('Fort Lauderdale'),
      LEAD_FAQ,
    ],
    sources: [
      { title: 'City of Fort Lauderdale, Building Safety Inspection Program', link: 'https://www.fortlauderdale.gov/Government/Departments/Development-Services/Permitting-Services/Building-Safety-Inspection-Program' },
      { title: 'City of Fort Lauderdale, LauderBuild', link: 'https://www.fortlauderdale.gov/government/departments-a-h/development-services/lauderbuild' },
      { title: 'Florida Statutes § 553.899, Mandatory structural inspections for condominium and cooperative buildings', link: 'https://m.flsenate.gov/Statutes/553.899' },
    ],
    metaTitle: 'Fort Lauderdale Transaction Coordinator for Realtors | Hometown TC',
    metaDescription:
      'Transaction coordination for Fort Lauderdale Realtors: Broward 25-year safety inspections, condo milestone summaries and every deadline tracked. Flat $495 per closed side.',
  },

  'miami-beach-transaction-coordinator': {
    slug: 'miami-beach-transaction-coordinator',
    breadcrumbLabel: 'Miami Beach',
    badge: 'Miami Beach · Miami-Dade County',
    h1Title: 'Transaction Coordinator for Realtors in',
    h1Accent: 'Miami Beach, Florida',
    introParagraph:
      'Miami Beach files are condo-heavy, often luxury, and full of moving parts. Hometown Transaction Coordinators keeps them predictable from signed contract to funded closing, for a flat fee per closed side, while you stay the only voice your client hears.',
    countyName: 'Miami Beach',
    mlsBoard: 'Permits & recertification: City of Miami Beach Building Department (Civic Access) · Miami-Dade County',
    citiesCovered: ['South Beach', 'Mid-Beach', 'North Beach', 'Bayshore', 'La Gorce', 'Venetian Islands', 'Sunset Islands', 'Normandy Isles'],
    keyChallenges: [
      {
        title: 'Building recertification at 30 years',
        description:
          'Miami Beach follows Miami-Dade County Code Section 8-11(f): most buildings must be recertified at 30 years and every 10 years after, with structural and electrical reports from Florida-licensed engineers on threshold buildings (over three stories or 50 feet). On condo files, we make sure recertification status is part of the document request and tracked.',
      },
      {
        title: 'Condo documents and milestone summaries',
        description:
          'Condo buildings three habitable stories or taller also need a state milestone inspection, and the association must send owners the inspector’s summary within 45 days. We track the full condo document set, as the contract calls for, until it is in hand.',
      },
      {
        title: 'Luxury files, agent-led',
        description:
          'On high-value files the agent is the only voice the client hears. We work behind you, keep every date and party on track, and bring anything we see to you and the closing attorney for your call.',
      },
    ],
    complianceItems: SHARED_CHECKLIST('Miami Beach'),
    faqs: [
      {
        question: 'Does HTC handle luxury files in Miami Beach?',
        answer:
          'Yes. Luxury files can stay on our founder’s desk, and the agent leads every client conversation. We keep the timeline, documents and parties on track behind you.',
      },
      {
        question: 'Which Miami Beach buildings need recertification?',
        answer:
          'Under Miami-Dade County Code Section 8-11(f), buildings 30 years or older from their original certificate of occupancy must be recertified, then every 10 years. Single-family homes, duplexes and minor buildings (occupant load of 10 or less and 2,000 square feet or less) are exempt. The City of Miami Beach Building Department reviews the reports.',
      },
      MILESTONE_FAQ,
      PRICING_FAQ('Miami Beach'),
      LEAD_FAQ,
    ],
    sources: [
      { title: 'City of Miami Beach, Building Recertification (previously 40-Year Recertification)', link: 'https://www.miamibeachfl.gov/city-hall/building/building-recert/' },
      { title: 'City of Miami Beach, Civic Access (permits and records portal)', link: 'https://www.miamibeachfl.gov/business/civicaccess/' },
      { title: 'Florida Statutes § 553.899, Mandatory structural inspections for condominium and cooperative buildings', link: 'https://m.flsenate.gov/Statutes/553.899' },
    ],
    metaTitle: 'Miami Beach Transaction Coordinator for Realtors & Luxury Files | Hometown TC',
    metaDescription:
      'Transaction coordination for Miami Beach Realtors and luxury files: 30-year recertification, condo milestone summaries and every deadline tracked. Agent-led, flat $495 per side.',
  },

  'coral-gables-transaction-coordinator': {
    slug: 'coral-gables-transaction-coordinator',
    breadcrumbLabel: 'Coral Gables',
    badge: 'Coral Gables · Miami-Dade County',
    h1Title: 'Transaction Coordinator for Realtors in',
    h1Accent: 'Coral Gables, Florida',
    introParagraph:
      'Coral Gables buyers and sellers expect a polished process. Hometown Transaction Coordinators gives Coral Gables Realtors one: every date, document and party tracked from signed contract to funded closing, for a flat fee per closed side, with you leading every conversation.',
    countyName: 'Coral Gables',
    mlsBoard: 'Permits & recertification: City of Coral Gables Development Services · Miami-Dade County',
    citiesCovered: ['Coral Gables', 'Gables Estates', 'Cocoplum', 'Old Cutler', 'Granada', 'Riviera', 'Downtown Gables', 'South Gables'],
    keyChallenges: [
      {
        title: 'Recertification notices and a 90-day window',
        description:
          'Coral Gables applies Miami-Dade County Code Section 8-11(f) to buildings other than single-family homes, duplexes and minor structures. Once the City mails a Notice of Required Recertification, the owner has 90 days to submit the report, and recertification repeats every 10 years. On condo and commercial files, we make sure that status is requested and tracked.',
      },
      {
        title: 'Published recertification lists',
        description:
          'The City publishes the properties due for recertification by year. When your file is in one of those buildings, we make sure the question is asked early, so nobody is surprised at the closing table.',
      },
      {
        title: 'Luxury files, agent-led',
        description:
          'Many Coral Gables files are high-value. The agent stays the only voice the client hears; we keep the timeline and parties on track and bring anything we see to you and the attorney for your call.',
      },
    ],
    complianceItems: SHARED_CHECKLIST('Coral Gables'),
    faqs: [
      {
        question: 'Does HTC work with Coral Gables Realtors?',
        answer:
          'Yes. HTC supports Realtors in Coral Gables and across Miami-Dade, Broward and Palm Beach counties, including luxury files, which can stay on our founder’s desk.',
      },
      {
        question: 'How does building recertification work in Coral Gables?',
        answer:
          'Under Miami-Dade County Code Section 8-11(f), the City mails owners of applicable buildings a Notice of Required Recertification, and the owner has 90 days to submit a report prepared by a Florida-registered engineer or architect. Single-family homes, duplexes and minor structures are exempt, and recertification repeats every 10 years. The City publishes yearly lists of properties due.',
      },
      MILESTONE_FAQ,
      PRICING_FAQ('Coral Gables'),
      LEAD_FAQ,
    ],
    sources: [
      { title: 'City of Coral Gables, Building Recertification', link: 'https://coralgables.com/department/development-services/building-division/services/building-recertification' },
      { title: 'Florida Statutes § 553.899, Mandatory structural inspections for condominium and cooperative buildings', link: 'https://m.flsenate.gov/Statutes/553.899' },
    ],
    metaTitle: 'Coral Gables Transaction Coordinator for Realtors & Luxury Files | Hometown TC',
    metaDescription:
      'Transaction coordination for Coral Gables Realtors and luxury files: recertification notices, condo milestone summaries and every deadline tracked. Agent-led, flat $495 per side.',
  },
};

