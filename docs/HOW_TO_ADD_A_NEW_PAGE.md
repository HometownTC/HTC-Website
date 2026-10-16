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
  * **Blog Articles:** Generated dynamically as `/resources/[post-slug]/` from `DEMO_BLOG_POSTS` and `CMS_ARTICLES` in `src/data/blog.ts`.
  * **Category Archives:** Generated as `/resources/[category-slug]/` from `CATEGORY_ARCHIVE_CONFIGS` in `src/data/blog.ts`.
  * **Location Landing Pages:** Generated automatically from `LOCATION_PAGES` in `src/data/locationData.ts`.
  * **Downloadable Resources:** Generated as `/resources/free-guides-downloads/[item-slug]/` from `RESOURCE_LIBRARY_ITEMS` in `src/data/resourceLibraryData.ts`.

---

## 2. How to Publish a New Blog Post (The Hometown Brief)

Publishing a new blog post requires adding the article to `src/data/blog.ts`. The article consists of two connected parts in that file:
1. **The Article Body & Content** in `CMS_ARTICLES` (defines the complete article text, H2 sections, callouts, and takeaways).
2. **The Catalog Metadata** in `DEMO_BLOG_POSTS` (defines the card preview for the Resource Hub grid and search engine).

### Step 2.1: Add the Article Body to `CMS_ARTICLES` in `src/data/blog.ts`
Locate the `CMS_ARTICLES` object in `src/data/blog.ts`. Add your new article keyed by its URL slug.

#### Field Reference for `ArticleCmsData`:
* **`slug` (string):** The URL slug (e.g. `"sample-operations-brief"`). Matches the key in `CMS_ARTICLES`.
* **`articleH1` (string):** The main headline displayed at the top of the article.
* **`deck` (string):** The editorial subheadline explaining the key takeaway.
* **`theBrief` (string):** A 40–80 word direct answer callout rendered in a distinct highlighted brief box.
* **`keyTakeaways` (string[]):** An array of 3 to 5 bullet points rendered in the "What You Need to Know" callout box.
* **`questionSections` (QuestionSection[]):** **This is the core article body.** An array of sections containing:
  * `questionH2` (string): The section heading (formulated as a clear question or operational milestone).
  * `bodyParagraphs` (string[]): The narrative paragraphs for that section.
  * `calloutQuote` (optional string): A highlighted operational reminder, field tip, or checklist milestone.
* **`optionalFieldNote` (optional object):** Practical observations directly from active files (includes `kicker`, `title`, `text`, `verifiedDate`, `dossierTag`).
* **`whatThisMeansForAgent` (string):** The closing summary detailing exactly how this protects the Realtor's time and business.
* **`primaryResourceCta` & `secondaryResourceCta` (objects):** Actionable buttons directing the reader to run the calculator, view pricing, or book a call.
* **`metaTitle` & `metaDescription` (strings):** The SEO title and meta description tag for search engines and social share cards.
* **`category` (string):** Topic category (`'Contracts + Forms'` | `'Transaction Operations'` | `'Broker Compliance'` | `'Condo + HOA'` | `'Agent Growth + Leverage'` | `'Florida Real Estate Updates'`).
* **`author` & `reviewer` (strings):** e.g. `"HTC Operations Team"` and `"HTC Editorial Desk"`.
* **`publishedDate` & `readTime` (strings):** e.g. `"October 2026"` and `"3 min brief"`.

#### Neutral Sample Template for `CMS_ARTICLES`:
```typescript
export const CMS_ARTICLES: Record<string, ArticleCmsData> = {
  // Existing approved articles...

  'sample-operations-brief': {
    slug: 'sample-operations-brief',
    primarySearchQuestion: '[Insert Primary Search Question Here]',
    searchIntent: 'Operational',
    metaTitle: '[SEO Page Title] | The Hometown Brief',
    metaDescription: '[Brief meta description for search engine previews]',
    category: 'Transaction Operations', // Select from approved topic categories
    regionTag: 'FLORIDA STATEWIDE',
    articleH1: '[Insert Article Headline Here]',
    deck: '[Insert 1-2 sentence editorial subtitle explaining the operational takeaway]',
    author: 'HTC Operations Team',
    reviewer: 'HTC Editorial Desk',
    publishedDate: 'October 2026',
    datePublishedIso: '2026-10-16T08:00:00-04:00',
    modifiedDate: 'October 2026',
    dateModifiedIso: '2026-10-16T08:00:00-04:00',
    readTime: '3 min brief',
    visualStyle: 'marked-up-paperwork',
    featuredImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200',
    thumbnailCrop: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=400',
    ogImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200',
    altText: '[Descriptive image alt text]',
    imageCredit: 'HTC Editorial Desk',
    theBrief: '[Insert 40-80 word direct answer summarizing the core milestone or protocol]',
    keyTakeaways: [
      '[Operational takeaway 1]',
      '[Operational takeaway 2]',
      '[Operational takeaway 3]'
    ],
    // THE ARTICLE BODY: Add as many H2 question sections as needed
    questionSections: [
      {
        id: 'q1',
        questionH2: '[First Section Heading / Milestone Question]',
        bodyParagraphs: [
          '[First paragraph explaining the workflow and documentation required.]',
          '[Second paragraph detailing timing and party communication.]'
        ],
        calloutQuote: '[Optional: Highlighted operational tip or milestone reminder]'
      },
      {
        id: 'q2',
        questionH2: '[Second Section Heading / Milestone Question]',
        bodyParagraphs: [
          '[First paragraph describing file execution.]',
          '[Second paragraph outlining broker compliance portal upload.]'
        ]
      }
    ],
    optionalFieldNote: {
      title: '[Regional Operational Note]',
      kicker: 'FROM THE HTC FILE',
      text: '[Practical observation from active Florida transaction management.]',
      verifiedDate: 'Verified October 2026',
      dossierTag: 'HTC FIELD FILE'
    },
    whatThisMeansForAgent: '[Closing summary detailing how professional TC file management protects agent time and client peace of mind.]',
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
      { anchor: 'Services + Pricing', url: '/pricing/' }
    ],
    externalSources: [],
    isPurePlaceholder: false
  }
};
```

### Step 2.2: Add the Card to `DEMO_BLOG_POSTS` in `src/data/blog.ts`
Locate the `DEMO_BLOG_POSTS` array in `src/data/blog.ts` and add the card metadata:
```typescript
export const DEMO_BLOG_POSTS: BlogPost[] = [
  {
    id: 'sample-operations-brief-01',
    slug: 'sample-operations-brief', // Must match slug above
    title: '[Insert Article Headline Here]',
    excerpt: '[Insert 1-2 sentence preview description for the resource archive card.]',
    category: 'Transaction Operations',
    author: 'HTC Operations Team',
    reviewer: 'HTC Editorial Desk',
    dateUpdated: 'October 2026',
    readTime: '3 min brief',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800',
    featured: true
  }
];
```

### Step 2.3: Automatic Build & Live Routing
Once saved:
* Astro's build engine (`src/pages/[...slug].astro`) automatically detects the slug and compiles the static page at:  
  **`https://www.hometowntc.com/resources/[your-slug]/`**
* The article automatically appears in the Resource Hub grid (`/resources/`) and under the appropriate category archive.

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
  // Existing approved locations...

  'sample-county-transaction-coordinator': {
    slug: 'sample-county-transaction-coordinator',
    breadcrumbLabel: '[County Name] Transaction Coordinator',
    badge: 'LOCAL [COUNTY NAME] COUNTY TRANSACTION COORDINATION',
    h1Title: '[County Name] County Transaction Coordinator',
    h1Accent: 'Boutique Real Estate Support Built for Active Florida Agents.',
    introParagraph: '[Insert introductory paragraph describing local real estate market, typical file complexities, and how HTC supports agents in this county.]',
    countyName: '[County Name] County',
    mlsBoard: '[Local Board Name / Regional MLS]',
    citiesCovered: [
      '[City 1]',
      '[City 2]',
      '[City 3]',
      '[City 4]'
    ],
    keyChallenges: [
      {
        title: '[Local Challenge 1: e.g. Regional HOA / Condo Approvals]',
        description: '[Description of local requirement and timeline management.]'
      },
      {
        title: '[Local Challenge 2: e.g. Municipal Permit & Lien Searches]',
        description: '[Description of local title coordination and permit follow-up.]'
      },
      {
        title: '[Local Challenge 3: e.g. Critical Timeline Calendar Distribution]',
        description: '[Description of strict milestone tracking from contract to close.]'
      }
    ],
    complianceItems: [
      'Pre-listing portal upload & broker compliance audit',
      'Contract milestone computation & calendar distribution',
      'Second escrow deposit collection & verification letter tracking',
      'Title commitment, lien search, and survey coordination',
      'CDA / Commission disbursement authorization submission'
    ],
    faqs: [
      {
        question: 'Does Hometown TC coordinate with [Local Board Name] agents?',
        answer: 'Yes. Our team actively coordinates transactions across local MLS portals, brokerage compliance systems, and regional closing agents.'
      },
      {
        question: 'How do you handle local HOA or condo document packages?',
        answer: 'We coordinate estoppel requests, track statutory rescission windows, and ensure all association riders are satisfied prior to closing.'
      }
    ],
    metaTitle: '[County Name] Transaction Coordinator | Real Estate TC Services',
    metaDescription: 'Boutique transaction coordinator services for [County Name] Realtors. Expert contract-to-close, MLS compliance, and file management.'
  }
};
```

### Step 3.2: That's It!
* **No component creation required.**
* **No changes to `App.tsx` routing required.**
* **No changes to `src/pages/[...slug].astro` required.**
* Astro automatically compiles:  
  **`https://www.hometowntc.com/[your-slug]/`**

---

## 4. How to Add a New Downloadable Guide or Checklist

Downloadable templates, field manuals, and agent checklists are stored in `src/data/resourceLibraryData.ts` in the **`RESOURCE_LIBRARY_ITEMS`** array.

### Step 4.1: Add the Item to `RESOURCE_LIBRARY_ITEMS`
```typescript
{
  id: 'res-sample-01',
  slug: 'sample-checklist-download',
  catalogId: 'FILE NO. FL-01',
  stampLabel: 'FIELD-TESTED',
  tabCategory: 'DRAWER 01 // CHECKLISTS',
  resourceType: 'Checklist',
  title: '[Resource Title: Field Checklist]',
  placeholderTitle: '[Resource Title: Field Checklist]',
  shortDescription: '[Short description of the checklist.]',
  placeholderDescription: '[Short description of the checklist.]',
  shortIntro: '[Introduction to why this tool helps agents.]',
  fullDescription: '[Full description of checklist contents.]',
  topics: ['Transaction Operations', 'Broker Compliance'],
  topicTags: ['Transaction Operations', 'Broker Compliance'],
  topic: 'Transaction Operations',
  format: 'Print-Ready PDF (8.5x11)',
  deliveryMethod: 'instant_download',
  downloadFileUrl: '/downloads/sample-checklist.pdf',
  badge: 'OPERATIONS',
  estimatedTimeOrPages: '2-Page Field Checklist',
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
  thumbnailAlt: 'Document checklist preview',
  previewImageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&auto=format&fit=crop&q=80',
  highlights: [
    '[Highlight item 1]',
    '[Highlight item 2]'
  ],
  whatThisHelpsWith: [
    '[Benefit item 1]',
    '[Benefit item 2]'
  ]
}
```

### Step 4.2: Upload the Download File
Place your PDF into `public/downloads/sample-checklist.pdf`. Astro’s static route generator automatically builds the live landing page at:  
`https://www.hometowntc.com/resources/free-guides-downloads/sample-checklist-download/`

---

## 5. Live Architecture State in the Repository

To ensure that only HTC-approved content is published:
* `CMS_ARTICLES` in `src/data/blog.ts` is initialized clean (`{}`).
* `DEMO_BLOG_POSTS` in `src/data/blog.ts` is initialized clean (`[]`).
* `LOCATION_PAGES` in `src/data/locationData.ts` is initialized clean (`{}`).
* No unapproved draft blog posts or regional landing pages will be live until HTC adds approved copy to these configuration files.

---

## 6. Deployment & Verification Workflow

1. Push your commit to the `main` branch of `https://github.com/HometownTC/HTC-Website`.
2. Cloudflare Pages automatically initiates `npm run build` (`astro build`).
3. Astro validates all static paths, compiles the static HTML files, and deploys live to `https://www.hometowntc.com` within 60 seconds.
