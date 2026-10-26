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

// Approved location pages will be supplied directly by HTC.
// Leave empty until official regional copy is approved.
export const LOCATION_PAGES: Record<string, LocationPageConfig> = {};
