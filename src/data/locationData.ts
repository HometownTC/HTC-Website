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
}

export const LOCATION_PAGES: Record<string, LocationPageConfig> = {
  'palm-beach-transaction-coordinator': {
    slug: 'palm-beach-transaction-coordinator',
    breadcrumbLabel: 'Palm Beach Transaction Coordinator',
    badge: 'LOCAL PALM BEACH COUNTY TRANSACTION COORDINATION',
    h1Title: 'Palm Beach County Transaction Coordinator',
    h1Accent: 'Built for Luxury Estates, Strict HOA Governance & High-Stakes Closings.',
    introParagraph: 'From Boca Raton and Delray Beach up to Palm Beach Gardens and Jupiter, Palm Beach County transactions involve strict municipal lien requirements, intricate HOA covenants, and high-stakes FAR/BAR contract timelines. Hometown TC provides disciplined, white-glove file coordination so Palm Beach agents stay client-facing.',
    countyName: 'Palm Beach County',
    mlsBoard: 'BeachesMLS / Broward, Palm Beaches & St. Lucie Realtors®',
    citiesCovered: [
      'Boca Raton',
      'Delray Beach',
      'West Palm Beach',
      'Palm Beach Gardens',
      'Jupiter',
      'Boynton Beach',
      'Wellington',
      'Lake Worth'
    ],
    keyChallenges: [
      {
        title: 'Country Club & Equity Membership Verification',
        description: 'Navigating mandatory golf/tennis equity deposits, capital contribution fees, and association approval windows in gated Palm Beach communities.'
      },
      {
        title: 'Municipal Permit & Code Compliance Audits',
        description: 'Tracking open and expired building permits, code violations, and municipal lien searches across Palm Beach County municipalities.'
      },
      {
        title: 'Far/Bar AS IS Critical Timeline Tracking',
        description: 'Strict calendar milestone computation under Standard F to protect earnest money deposits and enforce inspection notice periods.'
      }
    ],
    complianceItems: [
      'Pre-listing portal upload & broker compliance audit',
      'FAR/BAR contract milestone computation & calendar distribution',
      'Second escrow deposit collection & verification letter tracking',
      'Title commitment, lien search, and survey coordination',
      'CDA / Commission disbursement authorization submission'
    ],
    faqs: [
      {
        question: 'Does Hometown TC work with BeachesMLS and Palm Beach brokerages?',
        answer: 'Yes. Our team actively coordinates transactions across BeachesMLS, local Palm Beach brokerage portals (Dotloop, SkySlope, Brokermint, Paperless Pipeline), and local title agencies.'
      },
      {
        question: 'How do you handle gated community and HOA estoppel fees?',
        answer: 'We coordinate estoppel requests, track statutory right of rescission timelines, and ensure all condo/HOA rider requirements are satisfied prior to closing.'
      }
    ],
    metaTitle: 'Palm Beach Transaction Coordinator | Real Estate TC Services in Palm Beach County',
    metaDescription: 'Boutique transaction coordinator services for Palm Beach County Realtors. Expert contract-to-close, BeachesMLS compliance, and luxury condo/HOA file management.'
  }
};
