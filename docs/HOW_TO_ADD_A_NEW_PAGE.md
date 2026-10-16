# Hometown TC — How to Add New Pages & Content Guide

This document is the official operational guide for the Hometown TC team to publish new blog articles, downloadable resources, and regional location landing pages directly within the repository without requiring layout-code edits or developer intervention.

---

## 1. Architecture & Static Routing Overview

* **Engine:** Astro v7 (Static Site Generation / SSG) with React v19 components (`@astrojs/react`) and Tailwind CSS v4.
* **Production Build Command:** `npm run build` (runs `astro build` to compile pre-rendered static HTML into `dist/`).
* **Hosting Platform:** Cloudflare Pages connected to `https://github.com/HometownTC/HTC-Website` (`main` branch).
* **Static Routing Engine (`src/pages/[...slug].astro`):**  
  Astro pre-renders all site URLs at build time via `export async function getStaticPaths()`. Every URL is pre-rendered into complete static HTML:
  * **Core Pages:** Enumerated in the static `routes` array (e.g. `/`, `/pricing/`, `/how-htc-works/`, `/meet-the-tribe/`, etc.).
  * **Blog Articles:** Generated as `/resources/[post-slug]/` from `DEMO_BLOG_POSTS` and `CMS_ARTICLES` in `src/data/blog.ts`.
  * **Category Archives:** Generated as `/resources/[category-slug]/` from `CATEGORY_ARCHIVE_CONFIGS` in `src/data/blog.ts`.
  * **Location Landing Pages:** Generated automatically from `LOCATION_PAGES` in `src/data/locationData.ts` (e.g. `/palm-beach-transaction-coordinator/`).
  * **Downloadable Resources:** Generated as `/resources/free-guides-downloads/[item-slug]/` from `RESOURCE_LIBRARY_ITEMS` in `src/data/resourceLibraryData.ts`.

---

## 2. How to Publish a New Blog Post (The Hometown Brief)

Publishing a new blog post requires adding the article to `src/data/blog.ts`. The article consists of two connected parts in that file:
1. **The Article Body & Content** in `CMS_ARTICLES` (defines the complete article text, H2 sections, callouts, and takeaways).
2. **The Catalog Metadata** in `DEMO_BLOG_POSTS` (defines the card preview for the Resource Hub grid and search engine).

### Step 2.1: Add the Article Body to `CMS_ARTICLES` in `src/data/blog.ts`
Locate the `CMS_ARTICLES` object in `src/data/blog.ts`. Add your new article keyed by its URL slug.

#### Field Reference for `ArticleCmsData`:
* **`slug` (string):** The URL slug (e.g. `"florida-escrow-deposit-timelines-guide"`). Matches the key in `CMS_ARTICLES`.
* **`articleH1` (string):** The main headline displayed at the top of the article.
* **`deck` (string):** The editorial subheadline explaining the key takeaway.
* **`theBrief` (string):** A 40–80 word direct, high-value answer callout rendered in a distinct highlighted brief box.
* **`keyTakeaways` (string[]):** An array of 3 to 5 bullet points rendered in the "What You Need to Know" callout box.
* **`questionSections` (QuestionSection[]):** **This is the core article body.** An array of sections containing:
  * `questionH2` (string): The section heading (formulated as a clear question or operational milestone).
  * `bodyParagraphs` (string[]): The narrative paragraphs for that section.
  * `calloutQuote` (optional string): A highlighted statutory citation, contract clause (e.g. Standard F), or pro-tip.
* **`optionalFieldNote` (optional object):** Field observations directly from active files (includes `kicker`, `title`, `text`, `verifiedDate`, `dossierTag`).
* **`whatThisMeansForAgent` (string):** The closing summary detailing exactly how this protects the Realtor's time and license.
* **`primaryResourceCta` & `secondaryResourceCta` (objects):** Actionable buttons directing the reader to run the calculator, view pricing, or book a call.
* **`metaTitle` & `metaDescription` (strings):** The SEO title and meta description tag for search engines and social share cards.
* **`category` (string):** Topic category (`'Contracts + Forms'` | `'Transaction Operations'` | `'Broker Compliance'` | `'Condo + HOA'` | `'Agent Growth + Leverage'` | `'Florida Real Estate Updates'`).
* **`author` & `reviewer` (strings):** e.g. `"HTC Operations Team"` and `"Michelle Martinez, Founder"`.
* **`publishedDate` & `readTime` (strings):** e.g. `"October 16, 2026"` and `"4 min brief"`.

#### Complete Working Code Template for `CMS_ARTICLES`:
```typescript
export const CMS_ARTICLES: Record<string, ArticleCmsData> = {
  // Existing articles...

  'florida-escrow-deposit-timelines-guide': {
    slug: 'florida-escrow-deposit-timelines-guide',
    primarySearchQuestion: 'How do earnest money deposit timelines work on Florida FAR/BAR contracts?',
    searchIntent: 'Compliance',
    metaTitle: 'Florida Escrow Deposit Timelines | FAR/BAR Contract Rules Explained',
    metaDescription: 'Step-by-step operational guide for Florida Realtors on Section 2 earnest money deposit timing, calendar day rules, and Escrow Verification Letters.',
    category: 'Contracts + Forms',
    regionTag: 'FLORIDA STATEWIDE',
    articleH1: 'Florida Escrow Deposit Timelines: FAR/BAR Contract Rules Explained',
    deck: 'How Standard F day counting, written notice requirements, and escrow verification letters protect buyers and sellers.',
    author: 'HTC Operations Team',
    reviewer: 'Michelle Martinez, Founder',
    publishedDate: 'October 16, 2026',
    datePublishedIso: '2026-10-16T08:00:00-04:00',
    modifiedDate: 'October 16, 2026',
    dateModifiedIso: '2026-10-16T08:00:00-04:00',
    readTime: '4 min brief',
    visualStyle: 'marked-up-paperwork',
    featuredImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200',
    thumbnailCrop: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=400',
    ogImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200',
    altText: 'Florida real estate contract and calendar with earnest money deadlines highlighted',
    imageCredit: 'HTC Editorial Desk',
    theBrief: 'Under the Florida FAR/BAR contract, the initial deposit is due within 3 calendar days after the Effective Date unless otherwise specified. Standard F governs date computation, and Florida Statute § 475.25 mandates written verification from the escrow agent within 10 business days of request.',
    keyTakeaways: [
      'The 3-day default window includes weekends, but extends to 5:00 PM next business day if Day 3 falls on a weekend or legal holiday (Standard F).',
      'Wire fraud warnings must precede every deposit instruction transmission.',
      'Securing a written Escrow Verification Letter protects the agent from liability under Florida administrative rules.',
      'Second deposits require dedicated milestone tracking to prevent inadvertent buyer default.'
    ],
    // THE ARTICLE BODY: Add as many H2 sections as needed
    questionSections: [
      {
        id: 'q1',
        questionH2: 'What is the 3-Day Default Rule on FAR/BAR Contracts?',
        bodyParagraphs: [
          'Paragraph 2(a) of both the FAR/BAR Standard and AS IS contracts establishes that if no number of days is specified, the initial deposit is due within 3 calendar days after the Effective Date.',
          'Because calendar days are counted, Saturday and Sunday count toward the 3-day calculation. However, under Standard F, if the final day for performance falls on a Saturday, Sunday, or national legal holiday, the deadline extends to 5:00 PM EST of the next business day.'
        ],
        calloutQuote: 'Standard F: Time is of the essence. Days are calendar days, extending to 5:00 PM on the next business day if the cutoff falls on a weekend or legal holiday.'
      },
      {
        id: 'q2',
        questionH2: 'How Does HTC Handle Escrow Verification Letters?',
        bodyParagraphs: [
          'Florida Statute § 475.25(1)(k) requires that when an escrow agent other than the broker is chosen, the licensee\'s broker must make written request within 10 business days for verification of deposit receipt.',
          'Hometown TC automates this workflow: upon contract intake, we calendar the verification milestone, dispatch the formal request to the closing agent, secure the written Escrow Verification Letter, and upload the signed document directly into your brokerage compliance portal.'
        ]
      }
    ],
    optionalFieldNote: {
      title: 'Miami-Dade & Palm Beach Escrow Protocols',
      kicker: 'FROM THE HTC FILE',
      text: 'Title companies in South Florida often require 24 to 48 hours to confirm wire clearance before issuing formal Escrow Letters. Always provide wire instructions at least 1 day prior to the statutory cutoff.',
      verifiedDate: 'Verified October 2026',
      dossierTag: 'HTC FIELD FILE #284'
    },
    whatThisMeansForAgent: 'Strict adherence to escrow deadlines protects your buyer\'s deposit and your seller\'s closing security. When Hometown TC manages your file, verification is secured automatically without last-minute scrambling.',
    primaryResourceCta: {
      label: 'RUN THE NUMBERS →',
      destination: 'calculator',
      deepLinkHash: 'time-worth',
      subtext: 'See how much administrative time HTC saves you on every contract.'
    },
    secondaryResourceCta: {
      label: 'HOW HTC WORKS →',
      destination: 'how-it-works',
      subtext: 'Review our complete 4-step H.O.M.E. milestone system.'
    },
    internalLinks: [
      { anchor: 'Run the Numbers', url: '/agent-business-calculator/' },
      { anchor: 'Contract-to-Close Services', url: '/contract-to-close-services/' }
    ],
    externalSources: [
      { title: 'Florida Statute § 475.25', url: 'https://www.flsenate.gov/Laws/Statutes/2023/475.25', authority: 'Florida Legislature' }
    ],
    isPurePlaceholder: false
  }
};
```

### Step 2.2: Add the Card to `DEMO_BLOG_POSTS` in `src/data/blog.ts`
Locate the `DEMO_BLOG_POSTS` array in `src/data/blog.ts` and add the card metadata:
```typescript
export const DEMO_BLOG_POSTS: BlogPost[] = [
  {
    id: 'fl-escrow-deposit-timelines-2026',
    slug: 'florida-escrow-deposit-timelines-guide', // Must match slug above
    title: 'Florida Escrow Deposit Timelines: FAR/BAR Contract Rules Explained',
    excerpt: 'A practical breakdown of statutory earnest money deposit deadlines under the Florida FAR/BAR contract and how to prevent buyer default.',
    category: 'Contracts + Forms',
    author: 'HTC Operations Team',
    reviewer: 'Michelle Martinez, Founder',
    dateUpdated: 'October 16, 2026',
    readTime: '4 min brief',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800',
    featured: true
  }
];
```

### Step 2.3: Automatic Build & Live Routing
Once saved:
* Astro's build engine (`src/pages/[...slug].astro`) automatically detects the slug and compiles the static page at:  
  **`https://www.hometowntc.com/resources/florida-escrow-deposit-timelines-guide/`**
* The article automatically appears in the Resource Hub grid (`/resources/`) and under the appropriate category archive (`/resources/contracts-forms/`).

---

## 3. How to Add a New Location Landing Page (Zero Layout-Code Edits)

Location landing pages use a **pure data-driven architecture**. You do **NOT** need to create new React component files, write layout code, or edit routing files.

### How the Data-Driven Location Engine Works:
1. **Data Source (`src/data/locationData.ts`):** All location landing pages are defined in the `LOCATION_PAGES` dictionary.
2. **Static Route Pre-rendering (`src/pages/[...slug].astro`):** Astro automatically reads `Object.keys(LOCATION_PAGES)` at build time and pre-renders static HTML pages for every location key.
3. **Dynamic Presentation Component (`src/components/DynamicLocationPage.tsx`):** React renders the complete, branded layout with local county credentials, MLS board integrations, regional municipality tags, common transaction friction points, and county-specific FAQs.

### Step 3.1: Open `src/data/locationData.ts`
Locate the `LOCATION_PAGES` dictionary and simply add your new location object:

```typescript
export const LOCATION_PAGES: Record<string, LocationPageConfig> = {
  // Existing locations...

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
        title: 'FAR/BAR AS IS Critical Timeline Tracking',
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
```

### Step 3.2: That's It!
* **No component creation required.**
* **No changes to `App.tsx` routing required.**
* **No changes to `src/pages/[...slug].astro` required.**
* Astro automatically compiles:  
  **`https://www.hometowntc.com/palm-beach-transaction-coordinator/`**

---

## 4. How to Add a New Downloadable Guide or Checklist

Downloadable templates, field manuals, and agent checklists are stored in `src/data/resourceLibraryData.ts` in the **`RESOURCE_LIBRARY_ITEMS`** array.

### Step 4.1: Add the Item to `RESOURCE_LIBRARY_ITEMS`
```typescript
{
  id: 'res-hoa-condo-01',
  slug: 'florida-hoa-condo-rider-checklist',
  catalogId: 'FILE NO. FL-HOA-01',
  stampLabel: 'FIELD-TESTED',
  tabCategory: 'DRAWER 03 // CONDO + HOA DISCLOSURES',
  resourceType: 'Checklist',
  title: 'Florida HOA & Condo Rider Statutory Disclosure Checklist',
  placeholderTitle: '[RESOURCE TITLE: Florida HOA & Condo Rider Disclosure Checklist]',
  shortDescription: 'Operational checklist covering Chapter 720 HOA disclosure summaries and 3-day statutory right of rescission documentation.',
  placeholderDescription: '[SHORT DESCRIPTION: Operational checklist covering Chapter 720 HOA disclosure summaries.]',
  shortIntro: 'Avoid buyer cancellation pitfalls by verifying complete condominium governance and HOA financial packages prior to statutory expiration.',
  fullDescription: 'Comprehensive field checklist for Florida listing and buyer agents to track milestone delivery of HOA Estoppel certificates, condo declaration riders, and inspection waivers.',
  topics: ['Condo + HOA', 'Broker Compliance', 'Transactions'],
  topicTags: ['Condo + HOA', 'Broker Compliance', 'Transactions'],
  topic: 'Condo + HOA',
  format: 'Print-Ready PDF (8.5x11)',
  deliveryMethod: 'instant_download',
  downloadFileUrl: '/downloads/florida-hoa-condo-rider-checklist.pdf',
  badge: 'COMPLIANCE AUDIT',
  estimatedTimeOrPages: '3-Page Field Checklist',
  isFeatured: false,
  isActive: true,
  sortOrder: 10,
  landingPageEnabled: true,
  ctaLabel: 'DOWNLOAD CHECKLIST',
  actionLabel: 'DOWNLOAD CHECKLIST',
  ctaDestination: 'landing_page',
  publishDate: '2026-10-16',
  updatedDate: '2026-10-16',
  thumbnailUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80',
  thumbnailAlt: 'Florida condominium documents and disclosure forms',
  previewImageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&auto=format&fit=crop&q=80',
  highlights: [
    'Chapter 720 HOA statutory disclosure checklist',
    '3-day right of rescission tracking from receipt of complete governance packet',
    'Estoppel certificate ordering and fee compliance guidelines'
  ],
  whatThisHelpsWith: [
    'Eliminates contract cancellation risk due to incomplete condo document delivery',
    'Protects buyer and seller timelines under FAR/BAR Comprehensive Rider clauses'
  ]
}
```

### Step 4.2: Upload the Download File
Place your PDF into `public/downloads/florida-hoa-condo-rider-checklist.pdf`. Astro’s static route generator automatically builds the live landing page at:  
`https://www.hometowntc.com/resources/free-guides-downloads/florida-hoa-condo-rider-checklist/`

---

## 5. Live Demonstrations in the Repository

The codebase includes live working examples of both content types:
1. **Complete Blog Post with Full Article Body:**  
   * Source: `CMS_ARTICLES['florida-escrow-deposit-timelines-guide']` and `DEMO_BLOG_POSTS[0]` in `src/data/blog.ts`.
   * Generated Route: `/resources/florida-escrow-deposit-timelines-guide/index.html`.
2. **Complete Data-Driven Location Landing Page:**  
   * Source: `LOCATION_PAGES['palm-beach-transaction-coordinator']` in `src/data/locationData.ts`.
   * Generated Route: `/palm-beach-transaction-coordinator/index.html`.

---

## 6. Deployment & Verification Workflow

1. Push your commit to the `main` branch of `https://github.com/HometownTC/HTC-Website`.
2. Cloudflare Pages automatically initiates `npm run build` (`astro build`).
3. Astro validates all static paths, compiles the static HTML files, and deploys live to `https://www.hometowntc.com` within 60 seconds.
