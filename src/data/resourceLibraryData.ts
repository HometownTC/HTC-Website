export type StandardResourceType = 
  | 'Guide'
  | 'Checklist'
  | 'Template'
  | 'Canva Template'
  | 'Calculator'
  | 'Interactive Tool'
  | 'AI Prompt'
  | 'Automation / Apps Script'
  | 'Worksheet'
  | 'Quick Reference'
  | 'Class'
  | 'Mini-Course'
  // Legacy alias compatibility
  | 'Downloadable Guide'
  | 'Apps Script Tool'
  | 'Calculator / Interactive'
  | 'Class / Mini-Course';

// Extensible ResourceType so HTC can add another type later without redesigning the library
export type ResourceType = StandardResourceType | (string & {});

export const EDITABLE_RESOURCE_TYPES: StandardResourceType[] = [
  'Guide',
  'Checklist',
  'Template',
  'Canva Template',
  'Calculator',
  'Interactive Tool',
  'AI Prompt',
  'Automation / Apps Script',
  'Worksheet',
  'Quick Reference',
  'Class',
  'Mini-Course'
];

export type ProblemTopicTag =
  | 'Transactions'
  | 'Listings'
  | 'Condo + HOA'
  | 'Broker Compliance'
  | 'Agent Operations'
  | 'Business Growth'
  | 'AI + Automation'
  | 'Team Training';

export const PROBLEM_TOPIC_TAGS: ProblemTopicTag[] = [
  'Transactions',
  'Listings',
  'Condo + HOA',
  'Broker Compliance',
  'Agent Operations',
  'Business Growth',
  'AI + Automation',
  'Team Training'
];

export interface ProblemTopicInfo {
  tag: ProblemTopicTag;
  label: string;
  problemSummary: string;
  iconName: 'FileCheck' | 'Building' | 'Building2' | 'ShieldAlert' | 'FolderGit2' | 'TrendingUp' | 'Sparkles' | 'GraduationCap';
}

export const PROBLEM_TOPICS_METADATA: ProblemTopicInfo[] = [
  {
    tag: 'Transactions',
    label: 'Transactions',
    problemSummary: 'Escrow verification, contract contingencies, inspection windows, and critical closing milestones.',
    iconName: 'FileCheck'
  },
  {
    tag: 'Listings',
    label: 'Listings',
    problemSummary: 'Pre-listing setup, mandatory seller disclosures, MLS readiness, and intake protocol.',
    iconName: 'Building'
  },
  {
    tag: 'Condo + HOA',
    label: 'Condo + HOA',
    problemSummary: 'SB 4-D milestone inspections, SIRS reserve audits, estoppel caps, and association disclosures.',
    iconName: 'Building2'
  },
  {
    tag: 'Broker Compliance',
    label: 'Broker Compliance',
    problemSummary: 'Florida Statute Ch. 475 compliance, 5-year FREC retention, statutory notices, and audit prep.',
    iconName: 'ShieldAlert'
  },
  {
    tag: 'Agent Operations',
    label: 'Agent Operations',
    problemSummary: 'Daily file coordination, milestone tracking spreadsheets, client updates, and admin leverage.',
    iconName: 'FolderGit2'
  },
  {
    tag: 'Business Growth',
    label: 'Business Growth',
    problemSummary: 'Transaction leverage ROI, commission hourly value, and scalable client referral experiences.',
    iconName: 'TrendingUp'
  },
  {
    tag: 'AI + Automation',
    label: 'AI + Automation',
    problemSummary: 'Contract data intake prompts, Google Apps Script day computations, and repair addenda generators.',
    iconName: 'Sparkles'
  },
  {
    tag: 'Team Training',
    label: 'Team Training',
    problemSummary: 'On-demand video workshops, contract breach prevention classes, and team systems.',
    iconName: 'GraduationCap'
  }
];

export type ResourceTopic = ProblemTopicTag | 'All Topics';

export type SimpleResourceCategory = 
  | 'Guides + Checklists'
  | 'Templates + Client Tools'
  | 'AI + Automation'
  | 'Classes + Workshops';

export const SIMPLE_RESOURCE_CATEGORIES: SimpleResourceCategory[] = [
  'Guides + Checklists',
  'Templates + Client Tools',
  'AI + Automation',
  'Classes + Workshops'
];

export function getSimpleCategory(item: { resourceType?: string; category?: SimpleResourceCategory }): SimpleResourceCategory {
  if (item.category) return item.category;
  const t = item.resourceType || '';
  if (t === 'Guide' || t === 'Checklist' || t === 'Quick Reference' || t === 'Worksheet' || t.includes('Guide') || t.includes('Checklist')) {
    return 'Guides + Checklists';
  }
  if (t === 'Template' || t === 'Canva Template' || t === 'Calculator' || t === 'Interactive Tool' || t.includes('Calculator') || t.includes('Template')) {
    return 'Templates + Client Tools';
  }
  if (t === 'AI Prompt' || t === 'Automation / Apps Script' || t === 'Apps Script Tool' || t.includes('AI') || t.includes('Script')) {
    return 'AI + Automation';
  }
  if (t === 'Class' || t === 'Mini-Course' || t.includes('Course') || t.includes('Class')) {
    return 'Classes + Workshops';
  }
  return 'Guides + Checklists';
}

/**
 * REUSABLE RESOURCE CONTENT FIELDS
 * Created so HTC can add resources without asking for a redesign.
 */
export interface ResourceItem {
  // Identification & Routing
  id: string;
  slug: string; // URL slug for /resources/free-guides-downloads/[resource-slug]/
  catalogId: string; // e.g. "FILE NO. FL-CHK-01", "CARD NO. 475.25"
  stampLabel: string; // e.g. "FIELD-TESTED", "FL-COMPLIANT", "DESK READY"
  tabCategory: string; // e.g. "DRAWER 01 // TIMELINES"

  // Core content fields requested by HTC:
  title: string; // Resource Title
  category?: SimpleResourceCategory; // Simple category: Guides + Checklists, Templates + Client Tools, etc.
  placeholderTitle: string; // Blueprint schema placeholder
  resourceType: ResourceType; // Resource Type
  shortDescription: string; // Short Description
  placeholderDescription: string; // Blueprint schema placeholder
  fullDescription?: string; // Full Description if needed
  shortIntro?: string; // Short intro for landing page
  seoTitle?: string; // Unique Meta Title for SEO & Open Graph
  seoDescription?: string; // Unique Meta Description for SEO & Open Graph

  // Topic Tags (relational multi-tagging)
  topicTags?: ProblemTopicTag[]; // Reusable topic tags field
  topics: ProblemTopicTag[]; // backward compatible array
  topic: string; // primary topic display

  // Format and presentation
  format: string; // Format (e.g. "Print-Ready PDF", "Canva Template", "Copy-Paste Prompt", "Interactive Tool")
  deliveryMethod: 'instant_download' | 'copy_prompt' | 'canva_link' | 'interactive_tool' | 'class_registration';
  badge?: string; // e.g. "FLAGSHIP CHECKLIST", "CANVA SUITE", "FREE TRAINING"
  estimatedTimeOrPages?: string; // e.g. "4-Page Checklist", "Instant Copy", "25-Min Video"

  // Status & Priority
  isFeatured: boolean; // Featured / Not Featured
  isActive?: boolean; // Active / Hidden (defaults to true)
  sortOrder?: number; // Sort Order for custom ranking

  // Call-To-Action Configuration (Option A vs Option B)
  ctaLabel?: string; // CTA Label (e.g. "DOWNLOAD CHECKLIST", "GET THE PROMPT →")
  actionLabel: string; // primary button text
  ctaDestination?: 'direct_download' | 'landing_page' | 'external_url' | 'interactive_tool' | 'copy_prompt' | 'class_registration';
  landingPageEnabled?: boolean; // OPTION A (Direct) vs OPTION B (Landing Page)

  // Files, URLs & Assets
  downloadFileUrl?: string; // Download File / URL
  externalUrl?: string; // for Canva or external class links
  thumbnailUrl?: string; // Thumbnail / Cover
  thumbnailAlt?: string; // Alt Text
  previewImageUrl?: string; // Preview image for landing page
  videoPreviewUrl?: string; // Video preview for landing page

  // Highlights & Landing Page Scope
  highlights: string[]; // Highlights bullet points
  whatThisHelpsWith?: string[]; // [WHAT THIS RESOURCE HELPS WITH] list for landing page

  // Relational Linking Network
  relatedHometownBriefSlugs?: string[]; // Related Hometown Brief Articles
  relatedResourceIds?: string[]; // Related Resources
  relatedService?: { // Related Service if applicable
    name: string;
    url: string;
    description?: string;
  };

  // Timestamps
  publishDate?: string; // Publish Date (e.g. "2024-03-15")
  updatedDate?: string; // Updated Date (e.g. "2025-01-10")

  // Interactive Content
  promptContent?: string; // for AI Prompts
}

export type BrowseFormat = 
  | 'ALL RESOURCES'
  | 'GUIDES + CHECKLISTS'
  | 'GUIDE'
  | 'CHECKLIST'
  | 'TEMPLATE'
  | 'TEMPLATES'
  | 'TOOL'
  | 'CALCULATORS + TOOLS'
  | 'AI'
  | 'AI + AUTOMATION'
  | 'CLASS'
  | 'FREE CLASSES';

export const BROWSE_FORMAT_FILTERS: { label: string; value: BrowseFormat; shortCode: string }[] = [
  { label: 'ALL RESOURCES', value: 'ALL RESOURCES', shortCode: 'ALL' },
  { label: 'GUIDES', value: 'GUIDE', shortCode: 'GUIDE' },
  { label: 'CHECKLISTS', value: 'CHECKLIST', shortCode: 'CHECKLIST' },
  { label: 'TEMPLATES', value: 'TEMPLATE', shortCode: 'TEMPLATE' },
  { label: 'TOOLS & CALCS', value: 'TOOL', shortCode: 'TOOL' },
  { label: 'AI PROMPTS', value: 'AI', shortCode: 'AI' },
  { label: 'FREE CLASSES', value: 'CLASS', shortCode: 'CLASS' },
];

export function matchesBrowseFormat(item: ResourceItem, format: BrowseFormat): boolean {
  if (format === 'ALL RESOURCES') return true;
  if (format === 'GUIDES + CHECKLISTS') {
    return (
      item.resourceType === 'Checklist' ||
      item.resourceType === 'Guide' ||
      item.resourceType === 'Downloadable Guide' ||
      item.resourceType === 'Worksheet' ||
      item.resourceType === 'Quick Reference'
    );
  }
  if (format === 'GUIDE') {
    return (
      item.resourceType === 'Guide' ||
      item.resourceType === 'Downloadable Guide' ||
      item.resourceType === 'Quick Reference'
    );
  }
  if (format === 'CHECKLIST') {
    return item.resourceType === 'Checklist' || item.resourceType === 'Worksheet';
  }
  if (format === 'TEMPLATE' || format === 'TEMPLATES') {
    return item.resourceType === 'Template' || item.resourceType === 'Canva Template';
  }
  if (format === 'TOOL' || format === 'CALCULATORS + TOOLS') {
    return (
      item.resourceType === 'Calculator' ||
      item.resourceType === 'Interactive Tool' ||
      item.resourceType === 'Calculator / Interactive' ||
      item.resourceType === 'Automation / Apps Script' ||
      item.resourceType === 'Apps Script Tool'
    );
  }
  if (format === 'AI' || format === 'AI + AUTOMATION') {
    return (
      item.resourceType === 'AI Prompt' ||
      item.resourceType === 'Automation / Apps Script' ||
      item.resourceType === 'Apps Script Tool'
    );
  }
  if (format === 'CLASS' || format === 'FREE CLASSES') {
    return (
      item.resourceType === 'Class' ||
      item.resourceType === 'Mini-Course' ||
      item.resourceType === 'Class / Mini-Course'
    );
  }
  return true;
}

export type AppropriateCTA = 'DOWNLOAD →' | 'USE THE TOOL →' | 'START THE CLASS →' | 'VIEW PAGE →';

export function getAppropriateCTA(item: ResourceItem): AppropriateCTA {
  if (item.landingPageEnabled && item.ctaDestination === 'landing_page') {
    return 'VIEW PAGE →';
  }
  if (
    item.resourceType === 'Class' ||
    item.resourceType === 'Mini-Course' ||
    item.resourceType === 'Class / Mini-Course' || 
    item.deliveryMethod === 'class_registration'
  ) {
    return 'START THE CLASS →';
  }
  if (
    item.resourceType === 'Calculator' ||
    item.resourceType === 'Interactive Tool' ||
    item.resourceType === 'Calculator / Interactive' || 
    item.resourceType === 'Automation / Apps Script' ||
    item.resourceType === 'Apps Script Tool' || 
    item.deliveryMethod === 'interactive_tool'
  ) {
    return 'USE THE TOOL →';
  }
  return 'DOWNLOAD →';
}

export type FormatSpecificCTA = 
  | 'GET THE GUIDE →'
  | 'GET THE CHECKLIST →'
  | 'GET THE TEMPLATE →'
  | 'USE THE TOOL →'
  | 'GET THE PROMPT →'
  | 'BUILD THE TOOL →'
  | 'START THE CLASS →'
  | 'GET THE WORKSHEET →'
  | 'GET THE REFERENCE →';

export function getFormatSpecificCTA(item: ResourceItem): FormatSpecificCTA {
  switch (item.resourceType) {
    case 'Guide':
    case 'Downloadable Guide':
      return 'GET THE GUIDE →';
    case 'Checklist':
      return 'GET THE CHECKLIST →';
    case 'Template':
    case 'Canva Template':
      return 'GET THE TEMPLATE →';
    case 'Calculator':
    case 'Interactive Tool':
    case 'Calculator / Interactive':
      return 'USE THE TOOL →';
    case 'AI Prompt':
      return 'GET THE PROMPT →';
    case 'Automation / Apps Script':
    case 'Apps Script Tool':
      return 'BUILD THE TOOL →';
    case 'Class':
    case 'Mini-Course':
    case 'Class / Mini-Course':
      return 'START THE CLASS →';
    case 'Worksheet':
      return 'GET THE WORKSHEET →';
    case 'Quick Reference':
      return 'GET THE REFERENCE →';
    default:
      return 'GET THE GUIDE →';
  }
}

export type TypeMarker = 'GUIDE' | 'CHECKLIST' | 'TEMPLATE' | 'TOOL' | 'AI' | 'CLASS';

export interface TypeMarkerInfo {
  marker: TypeMarker;
  stampBg: string;
  stampText: string;
  stampBorder: string;
  cardAccentBorder: string;
  iconBg: string;
  mediaCategory: string;
}

export function getTypeMarkerInfo(type: ResourceType): TypeMarkerInfo {
  switch (type) {
    case 'Checklist':
      return {
        marker: 'CHECKLIST',
        stampBg: 'bg-[#0D9BA3]/10',
        stampText: 'text-[#0D9BA3]',
        stampBorder: 'border-[#0D9BA3]/40',
        cardAccentBorder: 'hover:border-[#0D9BA3]',
        iconBg: 'bg-[#0D9BA3]/10 text-[#0D9BA3]',
        mediaCategory: 'Field Checklist'
      };
    case 'Worksheet':
      return {
        marker: 'CHECKLIST',
        stampBg: 'bg-[#0D9BA3]/10',
        stampText: 'text-[#0D9BA3]',
        stampBorder: 'border-[#0D9BA3]/40',
        cardAccentBorder: 'hover:border-[#0D9BA3]',
        iconBg: 'bg-[#0D9BA3]/10 text-[#0D9BA3]',
        mediaCategory: 'Field Worksheet'
      };
    case 'Guide':
    case 'Downloadable Guide':
    case 'Quick Reference':
      return {
        marker: 'GUIDE',
        stampBg: 'bg-[#3A2E29]/5',
        stampText: 'text-[#3A2E29]',
        stampBorder: 'border-[#3A2E29]/25',
        cardAccentBorder: 'hover:border-[#3A2E29]',
        iconBg: 'bg-[#3A2E29]/10 text-[#3A2E29]',
        mediaCategory: 'Field Guide'
      };
    case 'Template':
    case 'Canva Template':
      return {
        marker: 'TEMPLATE',
        stampBg: 'bg-[#FE7311]/10',
        stampText: 'text-[#FE7311]',
        stampBorder: 'border-[#FE7311]/40',
        cardAccentBorder: 'hover:border-[#FE7311]',
        iconBg: 'bg-[#FE7311]/10 text-[#FE7311]',
        mediaCategory: 'Template Suite'
      };
    case 'Calculator':
    case 'Interactive Tool':
    case 'Calculator / Interactive':
      return {
        marker: 'TOOL',
        stampBg: 'bg-[#0D9BA3]/10',
        stampText: 'text-[#0D9BA3]',
        stampBorder: 'border-[#0D9BA3]/40',
        cardAccentBorder: 'hover:border-[#0D9BA3]',
        iconBg: 'bg-[#0D9BA3]/10 text-[#0D9BA3]',
        mediaCategory: 'Interactive Tool'
      };
    case 'Automation / Apps Script':
    case 'Apps Script Tool':
      return {
        marker: 'TOOL',
        stampBg: 'bg-[#3A2E29]/5',
        stampText: 'text-[#3A2E29]',
        stampBorder: 'border-[#3A2E29]/25',
        cardAccentBorder: 'hover:border-[#0D9BA3]',
        iconBg: 'bg-[#3A2E29]/10 text-[#3A2E29]',
        mediaCategory: 'Workflow Automation'
      };
    case 'AI Prompt':
      return {
        marker: 'AI',
        stampBg: 'bg-[#0D9BA3]/10',
        stampText: 'text-[#0D9BA3]',
        stampBorder: 'border-[#0D9BA3]/40',
        cardAccentBorder: 'hover:border-[#0D9BA3]',
        iconBg: 'bg-[#0D9BA3]/10 text-[#0D9BA3]',
        mediaCategory: 'AI Prompt Package'
      };
    case 'Class':
    case 'Mini-Course':
    case 'Class / Mini-Course':
    default:
      return {
        marker: 'CLASS',
        stampBg: 'bg-[#FE7311]/10',
        stampText: 'text-[#FE7311]',
        stampBorder: 'border-[#FE7311]/40',
        cardAccentBorder: 'hover:border-[#FE7311]',
        iconBg: 'bg-[#FE7311]/10 text-[#FE7311]',
        mediaCategory: 'On-Demand Education'
      };
  }
}

export const RESOURCE_TYPE_FILTERS: { label: string; value: 'ALL' | ResourceType; count?: number }[] = [
  { label: 'All Resources', value: 'ALL' },
  { label: 'Checklists', value: 'Checklist' },
  { label: 'Guides & Manuals', value: 'Downloadable Guide' },
  { label: 'Canva Templates', value: 'Canva Template' },
  { label: 'AI Prompts', value: 'AI Prompt' },
  { label: 'Apps Script & Tools', value: 'Apps Script Tool' },
  { label: 'Calculators', value: 'Calculator / Interactive' },
  { label: 'Classes & Courses', value: 'Class / Mini-Course' },
  { label: 'Quick Reference', value: 'Quick Reference' }
];

export const RESOURCE_TOPIC_FILTERS: (ProblemTopicTag | 'All Topics')[] = [
  'All Topics',
  'Transactions',
  'Listings',
  'Condo + HOA',
  'Broker Compliance',
  'Agent Operations',
  'Business Growth',
  'AI + Automation',
  'Team Training'
];

// The old placeholder library (unbuilt PDFs, sample classes and AI prompts) was
// retired on Oct 26, 2026. Real resources now live in src/data/agentToolkit.ts.
// Old URLs redirect to /resources/free-guides-downloads/ (public/_redirects).
export const RESOURCE_LIBRARY_ITEMS: ResourceItem[] = [];

const SLUG_ALIASES: Record<string, string> = {
  // Direct matches to new primary slugs
  'far-bar-critical-date-calculator': 'far-bar-critical-date-calculator',
  'florida-condo-milestone-inspection-guide': 'florida-condo-milestone-inspection-guide',
  'pre-listing-onboarding-packet': 'pre-listing-onboarding-packet',
  'repair-credit-negotiation-cheat-sheet': 'repair-credit-negotiation-cheat-sheet',
  'florida-frec-compliance-vault': 'florida-frec-compliance-vault',

  // Backward-compatible legacy aliases
  'google-sheets-contract-date-calculator-script': 'far-bar-critical-date-calculator',
  'sb-4d-condo-reserve-audit-field-guide': 'florida-condo-milestone-inspection-guide',
  'florida-listing-to-under-contract-checklist': 'pre-listing-onboarding-packet',
  'broker-compliance-frec-audit-manual': 'florida-frec-compliance-vault',
  'repair-request-paragraph-9-prompt': 'repair-credit-negotiation-cheat-sheet'
};

export function getResourceBySlug(slug: string): ResourceItem | undefined {
  const normalized = (slug || '').toLowerCase().trim().replace(/^\/+|\/+$/g, '');
  const targetSlug = SLUG_ALIASES[normalized] || normalized;
  return RESOURCE_LIBRARY_ITEMS.find((item) => item.slug === targetSlug || item.slug === normalized || item.id === normalized);
}

export function getAllResourceSlugs(): string[] {
  return RESOURCE_LIBRARY_ITEMS.map((item) => item.slug);
}
