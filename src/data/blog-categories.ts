// =============================================================================
// HOMETOWN TC — THE HOMETOWN BRIEF APPROVED CATEGORIES SETTINGS FILE
// Project Book v1.3 Section 10: Six Permanent Approved Editorial Categories
// Single source of truth for categories across Astro collections, React, and redirects
// =============================================================================

export const APPROVED_BLOG_CATEGORIES = [
  'Transaction Coordination',
  'Florida Contracts & Defensible Files',
  'Miami-Dade & Broward Closings',
  'Agent Growth & Operations',
  'Checklists & Guides',
  'HTC Updates & Community'
] as const;

export type ApprovedBlogCategory = typeof APPROVED_BLOG_CATEGORIES[number];

export interface CategoryArchiveConfig {
  name: ApprovedBlogCategory;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  tagline: string;
  categoryIntro: string;
  canonicalUrl: string;
  categoryIntroPlaceholder: string;
}

export const CATEGORY_ARCHIVES: Record<string, CategoryArchiveConfig> = {
  'transaction-coordination': {
    name: 'Transaction Coordination',
    slug: 'transaction-coordination',
    metaTitle: 'Transaction Coordination Archive | The Hometown Brief • Florida Real Estate Operations',
    metaDescription: 'Operational workflows, timeline tracking, escrow release protocols, and closing management for Florida real estate.',
    tagline: 'Escrow procedures, timeline tracking, walkthrough protocols, and closing coordination.',
    categoryIntro: 'Operational workflows for active Florida real estate transactions: earnest money deposits, walkthrough repair checks, escrow releases, and title coordination.',
    canonicalUrl: 'https://hometowntc.com/resources/transaction-coordination/',
    categoryIntroPlaceholder: 'Operational workflows for active Florida real estate transactions: earnest money deposits, walkthrough repair checks, escrow releases, and title coordination.'
  },
  'florida-contracts-defensible-files': {
    name: 'Florida Contracts & Defensible Files',
    slug: 'florida-contracts-defensible-files',
    metaTitle: 'Florida Contracts & Defensible Files | The Hometown Brief • Florida Real Estate Operations',
    metaDescription: 'Practical guidance on FAR/BAR contracts, addenda sequence, audit readiness, and assembling defensible real estate files.',
    tagline: 'FAR/BAR contract administration, addenda sequence, and audit-ready file assembly.',
    categoryIntro: 'Practical standards for Florida contract execution: chronological documentation, contingency date tracking, brokerage compliance, and defensible file assembly.',
    canonicalUrl: 'https://hometowntc.com/resources/florida-contracts-defensible-files/',
    categoryIntroPlaceholder: 'Practical standards for Florida contract execution: chronological documentation, contingency date tracking, brokerage compliance, and defensible file assembly.'
  },
  'miami-dade-broward-closings': {
    name: 'Miami-Dade & Broward Closings',
    slug: 'miami-dade-broward-closings',
    metaTitle: 'Miami-Dade & Broward Closings Archive | The Hometown Brief • Florida Real Estate Operations',
    metaDescription: 'South Florida local closing conventions, municipal lien searches, condo/HOA estoppels, and county-specific procedures.',
    tagline: 'South Florida municipal procedures, condo/HOA estoppels, and local closing practices.',
    categoryIntro: 'Local real estate closing procedures across Miami-Dade, Broward, and Palm Beach: municipal lien searches, association approval windows, and local closing conventions.',
    canonicalUrl: 'https://hometowntc.com/resources/miami-dade-broward-closings/',
    categoryIntroPlaceholder: 'Local real estate closing procedures across Miami-Dade, Broward, and Palm Beach: municipal lien searches, association approval windows, and local closing conventions.'
  },
  'agent-growth-operations': {
    name: 'Agent Growth & Operations',
    slug: 'agent-growth-operations',
    metaTitle: 'Agent Growth & Operations Archive | The Hometown Brief • Florida Real Estate Operations',
    metaDescription: 'Time audits, administrative leverage, and production economics for high-performing Florida Realtors.',
    tagline: 'Administrative leverage, production economics, and capacity scaling for agents.',
    categoryIntro: 'Operational leverage for producing Florida real estate agents: eliminating administrative bottlenecks, managing volume, and protecting client-facing hours.',
    canonicalUrl: 'https://hometowntc.com/resources/agent-growth-operations/',
    categoryIntroPlaceholder: 'Operational leverage for producing Florida real estate agents: eliminating administrative bottlenecks, managing volume, and protecting client-facing hours.'
  },
  'checklists-guides': {
    name: 'Checklists & Guides',
    slug: 'checklists-guides',
    metaTitle: 'Checklists & Guides Archive | The Hometown Brief • Florida Real Estate Operations',
    metaDescription: 'Step-by-step transaction checklists, critical date calculators, and operational field guides for Florida real estate.',
    tagline: 'Operational checklists, date calculation frameworks, and step-by-step guides.',
    categoryIntro: 'Practical checklists, milestone worksheets, and operational cheat sheets developed from active Florida real estate files.',
    canonicalUrl: 'https://hometowntc.com/resources/checklists-guides/',
    categoryIntroPlaceholder: 'Practical checklists, milestone worksheets, and operational cheat sheets developed from active Florida real estate files.'
  },
  'htc-updates-community': {
    name: 'HTC Updates & Community',
    slug: 'htc-updates-community',
    metaTitle: 'HTC Updates & Community Archive | The Hometown Brief • Florida Real Estate Operations',
    metaDescription: 'Agency announcements, team updates, operational workshops, and Florida real estate community news from Hometown TC.',
    tagline: 'Agency announcements, workshops, and Florida transaction community updates.',
    categoryIntro: 'Updates from Hometown Transaction Coordinators: operational announcements, workshops, community initiatives, and service improvements.',
    canonicalUrl: 'https://hometowntc.com/resources/htc-updates-community/',
    categoryIntroPlaceholder: 'Updates from Hometown Transaction Coordinators: operational announcements, workshops, community initiatives, and service improvements.'
  }
};

// Legacy category URL mapping to redirect existing links
export const LEGACY_CATEGORY_REDIRECTS: Record<string, string> = {
  'contracts-forms': 'florida-contracts-defensible-files',
  'contracts-and-forms': 'florida-contracts-defensible-files',
  'transaction-operations': 'transaction-coordination',
  'broker-compliance': 'florida-contracts-defensible-files',
  'condo-hoa': 'miami-dade-broward-closings',
  'condo-and-hoa': 'miami-dade-broward-closings',
  'agent-growth': 'agent-growth-operations',
  'agent-growth-leverage': 'agent-growth-operations',
  'florida-updates': 'htc-updates-community',
  'florida-real-estate-updates': 'htc-updates-community'
};
