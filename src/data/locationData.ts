/**
 * Hometown TC — Data-Driven Regional Location Pages
 * Add a new location here to automatically publish a dedicated landing page
 * without any layout, component, or routing code modifications.
 */

export interface LocationFeature {
  title: string;
  description: string;
  /** Official source for the fact in this card, shown as a link under it. */
  source?: { title: string; link: string };
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
  /** Luxury section: a local line naming the area's luxury market. Shared HTC luxury copy renders around it. */
  luxuryLocalLine?: string;
  /** Condo section for high-density cities: a local line about the area's condo market. Shared HTC condo copy renders around it. */
  condoLocalLine?: string;
  /** Neighborhood cards: what each area is, how many condos the state has registered there, and what its files need. */
  neighborhoodsHeading?: string;
  neighborhoods?: NeighborhoodCard[];
}

export interface NeighborhoodCard {
  name: string;
  /** ZIP codes the condo count is drawn from (the state lists condos by address, not by neighborhood). */
  zips?: string;
  condos: number;
  /** Rounded unit count, written as shown on the page, e.g. "about 9,000". */
  units: string;
  about: string;
  files: string;
}

// Condo counts: Florida DBPR registered condominiums files (Dade & Monroe pulled Nov 7, 2026; Broward & Palm Beach pulled Nov 10, 2026), counted by address ZIP code.
export const DBPR_CONDO_SOURCE = {
  title: 'Florida DBPR, registered condominiums public records (pulled Nov 2026)',
  link: 'https://www2.myfloridalicense.com/condos-timeshares-mobile-homes/public-records/',
};

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
    'HTC’s Contract-to-Close service, the Hometown Signature, is a flat $495 per closed side, never a percentage of your commission. New clients pay a one-time $399 Agent Setup at registration, which builds your brokerage requirements and preferences into our workflow. Agents who want listing support and extras included every month can choose SCALE ($397 a month, 3-month minimum). See the pricing page for everything each plan includes.',
});

const LEAD_FAQ = {
  question: 'Will HTC talk to my clients?',
  answer:
    'Only the way you want us to. You lead every client relationship, and on luxury files the agent is the only voice the client hears. We keep the dates, documents and people on track behind you. Licensed activities always stay with you and your broker.',
};

const CONDO_RESALE_FAQ = {
  question: 'What documents does a buyer get when buying a resale condo in Florida?',
  answer:
    'Under section 718.503(2), Florida Statutes, a resale buyer under contract is entitled, at the seller’s expense, to the declaration, articles of incorporation, bylaws and rules, the annual financial statement and budget, the association’s FAQ sheet, a governance form and, if applicable, the milestone inspection summary and the structural integrity reserve study. If the buyer requests them in writing, the buyer can cancel within 7 days (not counting weekends and legal holidays) after receiving them, and that right ends at closing. On the FR/Bar contracts, these items are handled through the Condominium Rider (Rider A).',
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
        source: { title: 'Palm Beach County PZB, Permit Center (ePZB)', link: 'https://discover.pbc.gov/pzb/building/Pages/Permit-Center.aspx' },
      },
      {
        title: 'Condo milestone inspections',
        description:
          'Florida’s milestone inspection law covers condo and co-op buildings three habitable stories or taller once they reach 30 years, then every 10 years. When your file is a condo, we make sure the inspector’s summary is requested in the document set and tracked on the checklist.',
        source: { title: 'Florida Statutes § 553.899', link: 'https://m.flsenate.gov/Statutes/553.899' },
      },
      {
        title: 'Deadlines that start on the Effective Date',
        description:
          'Every Florida contract deadline runs from the Effective Date. We confirm it in writing on day one and build your full timeline from it, so inspection, financing and closing dates are built from the right day.',
        source: { title: 'Florida Realtors/Florida Bar contract (Effective Date terms)', link: 'https://www.floridarealtors.org/media/5856' },
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
      DBPR_CONDO_SOURCE,
    ],
    luxuryLocalLine: 'From the island of Palm Beach to Boca Raton, Jupiter and Wellington, Palm Beach County is home to some of Florida’s most exclusive addresses.',
    neighborhoodsHeading: 'Palm Beach County towns',
    neighborhoods: [
      {
        name: 'Boca Raton',
        zips: 'every address listed as Boca Raton',
        condos: 644,
        units: 'about 37,000',
        about: 'Downtown and beachfront towers, plus country-club and 55-plus communities across the city.',
        files: 'Many communities have more than one association. When a home sits under a master association too, an estoppel can be needed from each, and we track every one until it is received.',
      },
      {
        name: 'Downtown West Palm Beach',
        zips: '33401',
        condos: 77,
        units: 'about 8,700',
        about: 'Towers along Flagler Drive and the Intracoastal, across the water from the island of Palm Beach.',
        files: 'Newer towers can mean a first resale in the building. We confirm early which documents the association can provide and request any buyer approval application.',
      },
      {
        name: 'Palm Beach (the island)',
        zips: '33480',
        condos: 131,
        units: 'about 6,700',
        about: 'The Town of Palm Beach: oceanfront condos, estates and some of Florida’s best-known addresses.',
        files: 'The Town has its own building department and approval process. We make sure the records come from the Town, and the luxury file can stay on our founder’s desk.',
      },
      {
        name: 'Singer Island & Palm Beach Shores',
        zips: '33404 oceanfront streets and Palm Beach Shores',
        condos: 57,
        units: 'about 3,700',
        about: 'Oceanfront towers on Singer Island, part of Riviera Beach, and the small Town of Palm Beach Shores at the island’s south tip.',
        files: 'Two cities on one island. We confirm which one the building is in, and request milestone inspection summaries early for the older oceanfront towers.',
      },
    ],
    metaTitle: 'Palm Beach County Transaction Coordinator & Luxury Transaction Coordinator | Hometown TC',
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
        source: { title: 'City of Fort Lauderdale, Building Safety Inspection Program', link: 'https://www.fortlauderdale.gov/Government/Departments/Development-Services/Permitting-Services/Building-Safety-Inspection-Program' },
      },
      {
        title: 'City records live in LauderBuild',
        description:
          'Fort Lauderdale’s LauderBuild portal lets anyone run a basic record search by address. The title company’s permit search is still the record for closing; we track it until it is on file and flag anything open to you while there is time to act.',
        source: { title: 'City of Fort Lauderdale, LauderBuild', link: 'https://www.fortlauderdale.gov/government/departments-a-h/development-services/lauderbuild' },
      },
      {
        title: 'Condo milestone inspections',
        description:
          'Condo and co-op buildings three habitable stories or taller also fall under Florida’s milestone inspection law at 30 years. Associations must send owners the inspector’s summary within 45 days, and we make sure it is requested for your file.',
        source: { title: 'Florida Statutes § 553.899', link: 'https://m.flsenate.gov/Statutes/553.899' },
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
      CONDO_RESALE_FAQ,
      MILESTONE_FAQ,
      PRICING_FAQ('Fort Lauderdale'),
      LEAD_FAQ,
    ],
    sources: [
      { title: 'City of Fort Lauderdale, Building Safety Inspection Program', link: 'https://www.fortlauderdale.gov/Government/Departments/Development-Services/Permitting-Services/Building-Safety-Inspection-Program' },
      { title: 'City of Fort Lauderdale, LauderBuild', link: 'https://www.fortlauderdale.gov/government/departments-a-h/development-services/lauderbuild' },
      { title: 'Florida Statutes § 553.899, Mandatory structural inspections for condominium and cooperative buildings', link: 'https://m.flsenate.gov/Statutes/553.899' },
      { title: 'Florida Statutes § 718.503, Disclosure prior to sale (resale disclosures)', link: 'https://www.flsenate.gov/Laws/Statutes/2026/718.503' },
      { title: 'HTC Condo, Co-op & HOA Resource Guide', link: '/resources/free-guides-downloads/condo-coop-hoa-guide/' },
      DBPR_CONDO_SOURCE,
    ],
    condoLocalLine: 'From the high-rises along Las Olas and the Intracoastal to the oceanfront towers of the Galt Ocean Mile, Fort Lauderdale is one of Broward’s densest condo markets.',
    luxuryLocalLine: 'From Las Olas Isles and Harbor Beach to the waterfront estates along the Intracoastal, Fort Lauderdale’s luxury files are some of Broward’s most complex.',
    neighborhoodsHeading: 'Fort Lauderdale & the Broward coast',
    neighborhoods: [
      {
        name: 'Downtown & Las Olas',
        zips: '33301',
        condos: 88,
        units: 'about 4,300',
        about: 'Fort Lauderdale’s downtown towers along the New River and Las Olas Boulevard, with the Las Olas Isles to the east.',
        files: 'Newer towers can mean a purchase from the developer, which follows different Florida disclosure rules than a resale, including a 15-day cancellation window. We track the right checklist for each.',
      },
      {
        name: 'Fort Lauderdale Beach & Victoria Park',
        zips: '33304',
        condos: 99,
        units: 'about 4,600',
        about: 'The central beach strip along A1A and the established neighborhoods between downtown and the Intracoastal.',
        files: 'A mix of oceanfront towers and small low-rise associations. We verify the association contact early, because an estoppel is only as fast as the person who answers it.',
      },
      {
        name: 'Galt Ocean Mile, Coral Ridge & Lauderdale-by-the-Sea',
        zips: '33308',
        condos: 153,
        units: 'about 12,900',
        about: 'A wall of oceanfront condo towers on the Galt Ocean Mile, the Coral Ridge neighborhoods behind it and the small town of Lauderdale-by-the-Sea to the north.',
        files: 'Many of these towers are decades old, so milestone inspection summaries and reserve studies come up often. Lauderdale-by-the-Sea is its own town, so we confirm which city’s records apply.',
      },
      {
        name: 'Harbor Beach & Rio Vista',
        zips: '33316',
        condos: 58,
        units: 'about 3,800',
        about: 'Waterfront neighborhoods south of Las Olas, near the 17th Street Causeway and Port Everglades.',
        files: 'Boating neighborhoods mean dock and marina questions. When a slip is part of the sale, we make sure the association documents covering it are in the file.',
      },
      {
        name: 'Hallandale Beach',
        zips: '33009',
        condos: 148,
        units: 'about 17,000',
        about: 'Broward’s southernmost beach city, lined with high-rise condos along A1A and the Intracoastal.',
        files: 'About 17,000 units in one ZIP code means large associations with full management. We request the complete document set and any buyer approval application early.',
      },
      {
        name: 'Hollywood Beach & east Hollywood',
        zips: '33019',
        condos: 92,
        units: 'about 8,800',
        about: 'The Hollywood Beach Broadwalk, oceanfront towers and the neighborhoods along the Intracoastal.',
        files: 'Small oceanfront buildings sit next to large towers. We confirm early which documents each association can provide and track every estoppel to the closing table.',
      },
      {
        name: 'Downtown Hollywood',
        zips: '33020',
        condos: 131,
        units: 'about 4,300',
        about: 'Hollywood’s historic downtown around Young Circle, with many small, low-rise condos nearby.',
        files: 'Lots of small associations, many run by volunteer boards. We find the right contact and keep following up until the documents arrive.',
      },
      {
        name: 'Pompano Beach oceanfront & Hillsboro Beach',
        zips: '33062',
        condos: 190,
        units: 'about 13,400',
        about: 'Pompano Beach’s oceanfront towers and, to the north, the Town of Hillsboro Beach on the narrow Hillsboro Mile.',
        files: 'Two municipalities share this ZIP code. We confirm which one the building is in, so the right recertification and permit records are part of the file.',
      },
      {
        name: 'Deerfield Beach (east)',
        zips: '33441',
        condos: 333,
        units: 'about 13,300',
        about: 'Broward’s northernmost beach city, from the Deerfield Beach pier to the Hillsboro Canal.',
        files: 'More than 300 associations, many of them small. We verify contacts early and keep the documents and estoppel moving.',
      },
    ],
    metaTitle: 'Fort Lauderdale Transaction Coordinator & Luxury Condo Transaction Coordinator | Hometown TC',
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
        source: { title: 'City of Miami Beach, Building Recertification', link: 'https://www.miamibeachfl.gov/city-hall/building/building-recert/' },
      },
      {
        title: 'Condo documents and milestone summaries',
        description:
          'Condo buildings three habitable stories or taller also need a state milestone inspection, and the association must send owners the inspector’s summary within 45 days. We track the full condo document set, as the contract calls for, until it is in hand.',
        source: { title: 'Florida Statutes § 553.899', link: 'https://m.flsenate.gov/Statutes/553.899' },
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
      CONDO_RESALE_FAQ,
      MILESTONE_FAQ,
      PRICING_FAQ('Miami Beach'),
      LEAD_FAQ,
    ],
    sources: [
      { title: 'City of Miami Beach, Building Recertification (previously 40-Year Recertification)', link: 'https://www.miamibeachfl.gov/city-hall/building/building-recert/' },
      { title: 'City of Miami Beach, Civic Access (permits and records portal)', link: 'https://www.miamibeachfl.gov/business/civicaccess/' },
      { title: 'Florida Statutes § 553.899, Mandatory structural inspections for condominium and cooperative buildings', link: 'https://m.flsenate.gov/Statutes/553.899' },
      { title: 'Florida Statutes § 718.503, Disclosure prior to sale (resale disclosures)', link: 'https://www.flsenate.gov/Laws/Statutes/2026/718.503' },
      { title: 'HTC Condo, Co-op & HOA Resource Guide', link: '/resources/free-guides-downloads/condo-coop-hoa-guide/' },
      DBPR_CONDO_SOURCE,
    ],
    neighborhoodsHeading: 'The Miami Beaches & islands',
    neighborhoods: [
      {
        name: 'South Beach, SoFi, Sunset Harbor & the islands',
        zips: '33139',
        condos: 586,
        units: 'about 22,700',
        about: 'Art Deco historic districts, the luxury towers of South of Fifth (SoFi), Sunset Harbor and the Venetian and Sunset Islands.',
        files: 'Hundreds of associations, from small Art Deco buildings to oceanfront towers. Rental rules matter to many buyers here, so we make sure the declaration and rules are in the document set early.',
      },
      {
        name: 'Mid-Beach',
        zips: '33140',
        condos: 111,
        units: 'about 11,700',
        about: 'Oceanfront towers along Collins Avenue between the beach and Indian Creek, with single-family streets to the west.',
        files: 'Big oceanfront buildings mean milestone inspection summaries and structural integrity reserve studies come up often. We request them with the resale documents and track them until they arrive.',
      },
      {
        name: 'North Beach & North Bay Village',
        zips: '33141',
        condos: 235,
        units: 'about 10,600',
        about: 'North Beach’s mid-century buildings and Normandy Isles, plus North Bay Village, its own small city on islands along the 79th Street Causeway.',
        files: 'Two cities share this ZIP code. We confirm which one the building is in, so the right city’s recertification and permit records are part of the file.',
      },
      {
        name: 'Surfside, Bal Harbour & Bay Harbor Islands',
        zips: '33154',
        condos: 140,
        units: 'about 7,600',
        about: 'Three separate towns side by side: Surfside’s quiet streets, Bal Harbour’s oceanfront towers and Bay Harbor Islands’ low-rise buildings on the bay.',
        files: 'Three towns, three building departments. We confirm which town the building is in so the right records are requested, and track every association document and estoppel to the closing table.',
      },
      {
        name: 'Key Biscayne',
        zips: '33149',
        condos: 74,
        units: 'about 5,700',
        about: 'An island village across the Rickenbacker Causeway, with oceanfront condo towers and parks at both ends.',
        files: 'Coastal buildings can be called for a milestone inspection as early as 25 years under state law. We make sure the inspection status is asked about early.',
      },
      {
        name: 'Fisher Island',
        zips: '33109',
        condos: 18,
        units: 'about 600',
        about: 'A private island community off the tip of South Beach, reached only by ferry or boat.',
        files: 'Every visit is by ferry or boat, so inspections, appraisals and the walk-through take advance access arrangements. We build that lead time into the timeline and track each association document and estoppel.',
      },
    ],
    condoLocalLine: 'From the Art Deco buildings of South Beach to the oceanfront towers of Mid-Beach and North Beach, Miami Beach is condo country.',
    luxuryLocalLine: 'From oceanfront condo towers to the Venetian and Sunset Islands, Miami Beach is one of South Florida’s best-known luxury markets.',
    metaTitle: 'Miami Beach Transaction Coordinator & Luxury Condo Transaction Coordinator | Hometown TC',
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
        source: { title: 'City of Coral Gables, Building Recertification', link: 'https://coralgables.com/department/development-services/building-division/services/building-recertification' },
      },
      {
        title: 'Published recertification lists',
        description:
          'The City publishes the properties due for recertification by year. When your file is in one of those buildings, we make sure the question is asked early, so nobody is surprised at the closing table.',
        source: { title: 'City of Coral Gables, Building Recertification', link: 'https://coralgables.com/department/development-services/building-division/services/building-recertification' },
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
      DBPR_CONDO_SOURCE,
    ],
    neighborhoodsHeading: 'Coral Gables condos',
    neighborhoods: [
      {
        name: 'Coral Gables',
        condos: 152,
        units: 'about 5,400',
        about: 'The City Beautiful: Mediterranean Revival architecture, Downtown Gables condos and some of Miami-Dade’s most established luxury neighborhoods.',
        files: 'Condo files here need the City’s recertification status as well as the state disclosures. We make sure both are requested and tracked on the checklist.',
      },
    ],
    luxuryLocalLine: 'From Gables Estates and Cocoplum to the historic homes of the Granada and Riviera neighborhoods, Coral Gables is built for luxury.',
    metaTitle: 'Coral Gables Transaction Coordinator & Luxury Transaction Coordinator | Hometown TC',
    metaDescription:
      'Transaction coordination for Coral Gables Realtors and luxury files: recertification notices, condo milestone summaries and every deadline tracked. Agent-led, flat $495 per side.',
  },

  'downtown-miami-transaction-coordinator': {
    slug: 'downtown-miami-transaction-coordinator',
    breadcrumbLabel: 'Downtown Miami & Brickell',
    badge: 'Downtown Miami · Brickell · Edgewater',
    h1Title: 'Transaction Coordinator for Realtors in',
    h1Accent: 'Downtown Miami, Brickell & Edgewater',
    introParagraph:
      'Downtown Miami is where our founder, Michelle Martinez, cut her teeth in condo sales. Today Hometown Transaction Coordinators keeps Brickell, Edgewater and downtown condo files moving from signed contract to funded closing, for a flat fee per closed side, while you lead every client conversation.',
    countyName: 'Downtown Miami',
    mlsBoard: 'Permits & recertification: City of Miami Building Department · Miami-Dade County',
    citiesCovered: ['Brickell', 'Brickell Key', 'Central Business District', 'Downtown Miami Historic District', 'Government Center', 'Arts & Entertainment District (Omni)', 'Park West', 'Jewelry District', 'Edgewater', 'Overtown', 'Wynwood', 'Midtown'],
    keyChallenges: [
      {
        title: 'City of Miami building recertification',
        description:
          'Under the Miami-Dade County Code, the City of Miami requires recertification of buildings other than single-family homes, duplexes and minor structures. An architect or engineer inspects and submits signed and sealed structural and electrical reports. On condo files, we make sure the building’s recertification status is part of the document request and tracked.',
        source: { title: 'City of Miami, Get a Building Recertification', link: 'https://miami.gov/Permits-Construction/Unsafe-Structures/Get-a-Building-Recertification' },
      },
      {
        title: 'Resale condo disclosures',
        description:
          'Florida law entitles a resale condo buyer to the declaration, bylaws and rules, budget and financial statement, the FAQ sheet and, where they apply, the milestone inspection summary and structural integrity reserve study, with a 7-day window to cancel after receiving them. We track the full document set on the checklist until it is in hand.',
        source: { title: 'Florida Statutes § 718.503, Disclosure prior to sale (resale disclosures)', link: 'https://www.flsenate.gov/Laws/Statutes/2026/718.503' },
      },
      {
        title: 'Milestone inspections in high-rises',
        description:
          'Condo buildings three habitable stories or taller need a state milestone inspection at 30 years, then every 10 years, and the association must send owners the inspector’s summary. In a high-rise market, we make sure that summary is requested early for your file.',
        source: { title: 'Florida Statutes § 553.899, Mandatory structural inspections for condominium and cooperative buildings', link: 'https://m.flsenate.gov/Statutes/553.899' },
      },
    ],
    complianceItems: SHARED_CHECKLIST('Downtown Miami'),
    faqs: [
      {
        question: 'Does HTC handle Brickell and Edgewater condo files?',
        answer:
          'Yes. Condo files are where our founder started: from 2010 to 2015 she closed more than 300 condo units a month in downtown Miami buildings. HTC coordinates condo and luxury condo files across Brickell, Edgewater and downtown Miami today.',
      },
      CONDO_RESALE_FAQ,
      MILESTONE_FAQ,
      PRICING_FAQ('Downtown Miami'),
      LEAD_FAQ,
    ],
    sources: [
      { title: 'City of Miami, Get a Building Recertification', link: 'https://miami.gov/Permits-Construction/Unsafe-Structures/Get-a-Building-Recertification' },
      { title: 'Florida Statutes § 718.503, Disclosure prior to sale (resale disclosures)', link: 'https://www.flsenate.gov/Laws/Statutes/2026/718.503' },
      { title: 'Florida Statutes § 553.899, Mandatory structural inspections for condominium and cooperative buildings', link: 'https://m.flsenate.gov/Statutes/553.899' },
      { title: 'HTC Condo, Co-op & HOA Resource Guide', link: '/resources/free-guides-downloads/condo-coop-hoa-guide/' },
      DBPR_CONDO_SOURCE,
    ],
    neighborhoodsHeading: 'Mainland Miami neighborhoods',
    neighborhoods: [
      {
        name: 'Brickell & south Downtown',
        zips: '33129, 33130, 33131',
        condos: 199,
        units: 'about 31,600',
        about: 'Miami’s financial district and its densest stretch of high-rise condos, running from the Miami River down Brickell Avenue.',
        files: 'Large towers mean professional management companies, recertification and milestone questions, and buyer approval applications when the declaration requires them. We request the full document set early and track each piece until it is on file.',
      },
      {
        name: 'Brickell Key',
        condos: 10,
        units: 'about 2,600',
        about: 'A small island at the mouth of the Miami River, reached by one bridge from Brickell and lined with condo towers.',
        files: 'Fewer buildings, but big ones. When a building sits under more than one association, an estoppel can be needed from each, and we track every one until it is received.',
      },
      {
        name: 'North Downtown, Omni & Park West',
        zips: '33132',
        condos: 27,
        units: 'about 9,200',
        about: 'The bayfront north of the Central Business District, around the Arts & Entertainment District and the arena.',
        files: 'Few associations, many units each. Newer towers can mean a first resale in the building, so we confirm early which documents the association can actually provide.',
      },
      {
        name: 'Edgewater, Wynwood, Midtown & Design District',
        zips: '33127, 33137',
        condos: 67,
        units: 'about 9,000',
        about: 'Waterfront towers along Biscayne Bay in Edgewater, with Midtown, the Design District and Wynwood’s arts district just west.',
        files: 'A mix of resales and purchases from developers. A developer sale follows different Florida disclosure rules than a resale, including a 15-day cancellation window, so we track the right checklist for each.',
      },
      {
        name: 'Overtown & Government Center',
        zips: '33128, 33136',
        condos: 54,
        units: 'about 2,600',
        about: 'One of Miami’s oldest historic neighborhoods, just northwest of downtown, next to the county and city government center.',
        files: 'Smaller associations are more common here. We verify association contacts early, because an estoppel request is only as fast as the person who answers it.',
      },
      {
        name: 'Upper East Side / MiMo',
        zips: '33138',
        condos: 62,
        units: 'about 3,000',
        about: 'Biscayne Boulevard’s Miami Modern (MiMo) historic district, with mid-century condo buildings and bayside single-family neighborhoods.',
        files: 'Older buildings make recertification status and the title company’s permit search results matter. We make sure both are requested and on file.',
      },
      {
        name: 'Coconut Grove',
        zips: '33133',
        condos: 369,
        units: 'about 6,200',
        about: 'Miami’s bayfront village south of Brickell: shaded streets, single-family homes and many small, low-rise condos.',
        files: 'Hundreds of small associations, many run by volunteer boards instead of management companies. We find the right contact and keep following up until the documents and estoppel arrive.',
      },
    ],
    condoLocalLine: 'Brickell, Edgewater and downtown Miami are packed with condo towers, each with its own association, management company and document set.',
    luxuryLocalLine: 'From Brickell’s high-rise residences and Brickell Key to Edgewater’s waterfront towers, downtown Miami’s luxury market is built vertically.',
    metaTitle: 'Downtown Miami & Brickell Transaction Coordinator & Luxury Condo Transaction Coordinator | Hometown TC',
    metaDescription:
      'Luxury condo transaction coordination for Brickell, Edgewater and downtown Miami Realtors: resale disclosures, recertification and milestone summaries tracked. Agent-led, flat $495 per side.',
  },

  'sunny-isles-beach-transaction-coordinator': {
    slug: 'sunny-isles-beach-transaction-coordinator',
    breadcrumbLabel: 'Sunny Isles Beach',
    badge: 'Sunny Isles Beach · Miami-Dade County',
    h1Title: 'Transaction Coordinator for Realtors in',
    h1Accent: 'Sunny Isles Beach, Florida',
    introParagraph:
      'Sunny Isles Beach is oceanfront towers and luxury condo files. Hometown Transaction Coordinators keeps them predictable from signed contract to funded closing, for a flat fee per closed side, while you stay the only voice your client hears.',
    countyName: 'Sunny Isles Beach',
    mlsBoard: 'Permits & recertification: City of Sunny Isles Beach Building Department · Miami-Dade County',
    citiesCovered: ['Collins Avenue oceanfront', 'Atlantic Isle', 'Golden Shores', 'Golden Beach', 'Bal Harbour', 'Aventura'],
    keyChallenges: [
      {
        title: 'Recertification at 30 years, sometimes 25',
        description:
          'Sunny Isles Beach recertifies buildings at 30 years and every 10 years after. Condo and co-op buildings three or more stories, within three miles of the coastline and built in 1998 or later, recertify at 25. Owners have 90 days after the City’s notice to submit reports. On condo files, we make sure recertification status is requested and tracked.',
        source: { title: 'City of Sunny Isles Beach, Building Recertification Program', link: 'https://www.sibfl.gov/Building-Code/Building-Department/Building-Recertification-Program' },
      },
      {
        title: 'Resale condo disclosures',
        description:
          'A resale buyer is entitled to the full association document set, including the milestone inspection summary and structural integrity reserve study where they apply, with a 7-day window to cancel after receiving them. We track every item on the checklist until it is in hand.',
        source: { title: 'Florida Statutes § 718.503, Disclosure prior to sale (resale disclosures)', link: 'https://www.flsenate.gov/Laws/Statutes/2026/718.503' },
      },
      {
        title: 'Milestone inspections on the coast',
        description:
          'Florida’s milestone law lets a local building official require the first inspection at 25 years instead of 30 based on conditions such as closeness to salt water. On oceanfront files, we make sure the inspector’s summary is requested early.',
        source: { title: 'Florida Statutes § 553.899, Mandatory structural inspections for condominium and cooperative buildings', link: 'https://m.flsenate.gov/Statutes/553.899' },
      },
    ],
    complianceItems: SHARED_CHECKLIST('Sunny Isles Beach'),
    faqs: [
      {
        question: 'Does HTC handle luxury condo files in Sunny Isles Beach?',
        answer:
          'Yes. Luxury condo files can stay on our founder’s desk, and the agent leads every client conversation. We keep the timeline, the association document set and every party on track behind you.',
      },
      CONDO_RESALE_FAQ,
      MILESTONE_FAQ,
      PRICING_FAQ('Sunny Isles Beach'),
      LEAD_FAQ,
    ],
    sources: [
      { title: 'City of Sunny Isles Beach, Building Recertification Program', link: 'https://www.sibfl.gov/Building-Code/Building-Department/Building-Recertification-Program' },
      { title: 'Florida Statutes § 718.503, Disclosure prior to sale (resale disclosures)', link: 'https://www.flsenate.gov/Laws/Statutes/2026/718.503' },
      { title: 'Florida Statutes § 553.899, Mandatory structural inspections for condominium and cooperative buildings', link: 'https://m.flsenate.gov/Statutes/553.899' },
      { title: 'HTC Condo, Co-op & HOA Resource Guide', link: '/resources/free-guides-downloads/condo-coop-hoa-guide/' },
      DBPR_CONDO_SOURCE,
    ],
    neighborhoodsHeading: 'Sunny Isles Beach condos',
    neighborhoods: [
      {
        name: 'Sunny Isles Beach',
        zips: '33160 (Collins Avenue and Intracoastal streets)',
        condos: 71,
        units: 'about 14,200',
        about: 'A two-mile strip between the ocean and the Intracoastal, lined with some of the tallest oceanfront condo towers in South Florida.',
        files: 'New luxury towers sit next to buildings from the 1960s and 70s. A purchase from a developer follows different disclosure rules (with a 15-day cancellation window) than a resale in an older tower, where milestone inspection summaries matter. We track the right checklist for each.',
      },
    ],
    condoLocalLine: 'Sunny Isles Beach is lined with oceanfront condo towers along Collins Avenue, many with full-service management and detailed association rules.',
    luxuryLocalLine: 'From the oceanfront towers along Collins Avenue to the neighboring estates of Golden Beach, Sunny Isles Beach is a luxury condo market first.',
    metaTitle: 'Sunny Isles Beach Transaction Coordinator & Luxury Condo Transaction Coordinator | Hometown TC',
    metaDescription:
      'Luxury condo transaction coordination for Sunny Isles Beach Realtors: 25/30-year recertification, resale disclosures and milestone summaries tracked. Agent-led, flat $495 per side.',
  },

  'aventura-transaction-coordinator': {
    slug: 'aventura-transaction-coordinator',
    breadcrumbLabel: 'Aventura',
    badge: 'Aventura · Miami-Dade County',
    h1Title: 'Transaction Coordinator for Realtors in',
    h1Accent: 'Aventura, Florida',
    introParagraph:
      'Aventura is a city of condo communities and waterfront towers. Hometown Transaction Coordinators keeps Aventura files moving from signed contract to funded closing, for a flat fee per closed side, while you lead every client conversation.',
    countyName: 'Aventura',
    mlsBoard: 'Building safety: City of Aventura Community Development · Miami-Dade County',
    citiesCovered: ['Williams Island', 'Turnberry', 'Country Club Drive', 'Porto Vita', 'Island Estates', 'Hidden Bay'],
    keyChallenges: [
      {
        title: 'Aventura’s building safety reports',
        description:
          'Aventura’s Enhanced Building Safety Inspections program checks that buildings meet Miami-Dade County’s 40- and 50-year recertifications, requires residential associations to share structural engineering and life-safety reports with the City, and posts engineering reports online. On condo files, we make sure the building’s status is part of the document request.',
        source: { title: 'City of Aventura, Enhanced Building Safety Inspections Program', link: 'https://cityofaventura.com/453/Enhanced-Building-Safety-Inspections-Pro' },
      },
      {
        title: 'Resale condo disclosures',
        description:
          'A resale buyer is entitled to the full association document set, including the milestone inspection summary and structural integrity reserve study where they apply, with a 7-day window to cancel after receiving them. We track every item on the checklist until it is in hand.',
        source: { title: 'Florida Statutes § 718.503, Disclosure prior to sale (resale disclosures)', link: 'https://www.flsenate.gov/Laws/Statutes/2026/718.503' },
      },
      {
        title: 'Milestone inspections',
        description:
          'Condo and co-op buildings three habitable stories or taller need a state milestone inspection at 30 years, then every 10 years. We make sure the inspector’s summary is requested for your file.',
        source: { title: 'Florida Statutes § 553.899, Mandatory structural inspections for condominium and cooperative buildings', link: 'https://m.flsenate.gov/Statutes/553.899' },
      },
    ],
    complianceItems: SHARED_CHECKLIST('Aventura'),
    faqs: [
      {
        question: 'Does HTC work with Aventura Realtors?',
        answer:
          'Yes. HTC supports Realtors in Aventura and across Miami-Dade, Broward and Palm Beach counties, including condo and luxury condo files.',
      },
      CONDO_RESALE_FAQ,
      MILESTONE_FAQ,
      PRICING_FAQ('Aventura'),
      LEAD_FAQ,
    ],
    sources: [
      { title: 'City of Aventura, Enhanced Building Safety Inspections Program', link: 'https://cityofaventura.com/453/Enhanced-Building-Safety-Inspections-Pro' },
      { title: 'Florida Statutes § 718.503, Disclosure prior to sale (resale disclosures)', link: 'https://www.flsenate.gov/Laws/Statutes/2026/718.503' },
      { title: 'Florida Statutes § 553.899, Mandatory structural inspections for condominium and cooperative buildings', link: 'https://m.flsenate.gov/Statutes/553.899' },
      { title: 'HTC Condo, Co-op & HOA Resource Guide', link: '/resources/free-guides-downloads/condo-coop-hoa-guide/' },
      DBPR_CONDO_SOURCE,
    ],
    neighborhoodsHeading: 'Aventura condos',
    neighborhoods: [
      {
        name: 'Aventura',
        zips: '33180',
        condos: 100,
        units: 'about 16,500',
        about: 'High-rise condo communities around the golf course on Country Club Drive and along the Intracoastal Waterway.',
        files: 'Large, established towers mean buyer approval applications, milestone inspection summaries and reserve studies come up often. We request them early and track each one until it is on file.',
      },
    ],
    condoLocalLine: 'Much of Aventura’s housing is in condo communities, so most files run through an association.',
    luxuryLocalLine: 'From Williams Island and Turnberry to the waterfront towers of Country Club Drive, Aventura’s luxury market is built around its condo communities.',
    metaTitle: 'Aventura Transaction Coordinator & Luxury Condo Transaction Coordinator | Hometown TC',
    metaDescription:
      'Luxury condo transaction coordination for Aventura Realtors: building safety reports, resale disclosures and milestone summaries tracked. Agent-led, flat $495 per side.',
  },

};

