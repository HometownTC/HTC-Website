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

## 2. Blog Content System & Schema (Book Section 10)

The Hometown Brief supports both Markdown/MDX frontmatter authoring and direct TypeScript structured data.

### 2.1. Approved Topic Categories
Per Project Book Section 10, all articles must belong to one of the six approved permanent categories:
1. `Florida Contracts + Forms` (Slug: `contracts-forms`)
2. `Transaction Operations` (Slug: `transaction-operations`)
3. `Broker Compliance` (Slug: `broker-compliance`)
4. `Condo + HOA` (Slug: `condo-hoa`)
5. `Agent Growth + Leverage` (Slug: `agent-growth`)
6. `Florida Real Estate Updates` (Slug: `florida-updates`)

### 2.2. Structured Frontmatter Specification (Markdown/MDX)
For team members drafting in Markdown or MDX (`docs/drafts/*.md`), every article must include this exact frontmatter block:

```yaml
---
title: "What Makes a Real Estate File Defensible?"
slug: "what-makes-a-real-estate-file-defensible"
category: "Broker Compliance"
tags:
  - "Broker Compliance"
  - "File Hygiene"
  - "Audit Readiness"
formRevision: "General Florida Operations"
language: "en"
translationOf: null
sources: []
author: "HTC Operations Team"
reviewer: "HTC Editorial Desk"
publishedDate: "October 2026"
status: "unpublished_draft"
readTime: "4 min read"
disclaimer: "Hometown TC provides independent administrative transaction coordination support to licensed Florida real estate brokerages and agents. This guide is prepared for administrative and operational workflow organization only and does not constitute legal, tax, brokerage, or regulatory compliance counsel."
---
```

### 2.3. Publishing via `src/data/blog.ts`
When an article is approved for publication:
1. **The Article Body & Content** is added to `CMS_ARTICLES` in `src/data/blog.ts`.
2. **The Catalog Metadata** is added to `DEMO_BLOG_POSTS` in `src/data/blog.ts` (for the resource hub grid card preview and search engine).

#### Working TypeScript Schema Template:
```typescript
export const CMS_ARTICLES: Record<string, ArticleCmsData> = {
  'what-makes-a-real-estate-file-defensible': {
    slug: 'what-makes-a-real-estate-file-defensible',
    primarySearchQuestion: 'What documentation makes a Florida real estate file audit-ready?',
    searchIntent: 'Compliance',
    metaTitle: 'What Makes a Real Estate File Defensible? | The Hometown Brief',
    metaDescription: 'Operational guidelines for Florida Realtors on chronological milestone logging, date-stamped execution trails, and broker audit compliance.',
    category: 'Broker Compliance',
    regionTag: 'FLORIDA STATEWIDE',
    articleH1: 'What Makes a Real Estate File Defensible?',
    deck: 'An operational review of administrative discipline, chronological documentation, and audit-ready file assembly for Florida transactions.',
    author: 'HTC Operations Team',
    reviewer: 'HTC Editorial Desk',
    publishedDate: 'October 2026',
    datePublishedIso: '2026-10-19T08:00:00-04:00',
    readTime: '4 min read',
    visualStyle: 'marked-up-paperwork',
    featuredImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200',
    thumbnailCrop: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=400',
    ogImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200',
    altText: 'Florida real estate file compliance and milestone calendar checklist',
    imageCredit: 'HTC Editorial Desk',
    theBrief: 'A transaction file is defensible when an independent reviewer can reconstruct the complete chronological timeline and verify every milestone from the documentation alone, without relying on verbal recollection or text message memory.',
    keyTakeaways: [
      'Contemporaneous written confirmations supersede verbal agreements in any file review.',
      'Unbroken numerical sequences of executed addenda prevent critical timeline gaps.',
      'Independent escrow deposit verification letters protect the agent from administrative liability.',
      'Audit-ready broker portal staging ensures compliance clearance on first submission.'
    ],
    questionSections: [
      {
        id: 'q1',
        questionH2: 'Why Do Contemporaneous Written Records Matter?',
        bodyParagraphs: [
          'In an administrative file audit, verbal agreements and unrecorded phone assurances carry zero evidentiary weight. A defensible file establishes a contemporaneous written record following significant conversations.',
          'Every signature, initial, counter-offer, and extension should reflect clear electronic date-and-time stamping to verify timely delivery.'
        ],
        calloutQuote: 'A defensible file tells its own story from date-stamped records alone, without needing anyone to remember what was said.'
      },
      {
        id: 'q2',
        questionH2: 'How Are Addenda Sequences and Disclosures Organized?',
        bodyParagraphs: [
          'Every addendum must maintain continuous numerical sequence and explicitly identify the base agreement it amends.',
          'Cross-referenced terms—such as repair credits or closing extensions—must be signed by all principals prior to the expiration of the contingency window they modify.'
        ]
      }
    ],
    optionalFieldNote: {
      title: 'South Florida Broker File Intake',
      kicker: 'FROM THE HTC FILE',
      text: 'Brokerages increasingly require all addenda and inspection releases to be uploaded within 48 hours of execution to maintain active file insurance compliance.',
      verifiedDate: 'Verified October 2026',
      dossierTag: 'HTC FIELD FILE'
    },
    whatThisMeansForAgent: 'Administrative file discipline protects the agent, the brokerage, and the client. When transaction milestones are tracked systematically from intake through post-close, files remain clean, compliant, and defensible.',
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

---

## 3. How to Add a New Location Landing Page (Zero Layout-Code Edits)

Location landing pages use a **pure data-driven architecture**. You do **NOT** need to create new React component files, write layout code, or edit routing files.

### How the Data-Driven Location Engine Works:
1. **Data Source (`src/data/locationData.ts`):** All location landing pages are defined in the `LOCATION_PAGES` dictionary.
2. **Static Route Pre-rendering (`src/pages/[...slug].astro`):** Astro automatically reads `Object.keys(LOCATION_PAGES)` at build time and pre-renders static HTML pages for every location key.
3. **Dynamic Presentation Component (`src/components/DynamicLocationPage.tsx`):** React renders the complete, branded layout with local county credentials, MLS board integrations, regional municipality tags, common transaction friction points, and county-specific FAQs.

### Step 3.1: Open `src/data/locationData.ts`
Simply add your approved location object:

```typescript
export const LOCATION_PAGES: Record<string, LocationPageConfig> = {
  'sample-county-transaction-coordinator': {
    slug: 'sample-county-transaction-coordinator',
    breadcrumbLabel: '[County Name] Transaction Coordinator',
    badge: 'LOCAL [COUNTY NAME] COUNTY TRANSACTION COORDINATION',
    h1Title: '[County Name] County Transaction Coordinator',
    h1Accent: 'Boutique Real Estate Support Built for Active Florida Agents.',
    introParagraph: '[Introductory paragraph describing local real estate market, typical file complexities, and how HTC supports agents in this county.]',
    countyName: '[County Name] County',
    mlsBoard: '[Local Board Name / Regional MLS]',
    citiesCovered: ['[City 1]', '[City 2]', '[City 3]', '[City 4]'],
    keyChallenges: [
      {
        title: '[Local Challenge 1: e.g. Regional HOA / Condo Approvals]',
        description: '[Description of local requirement and timeline management.]'
      },
      {
        title: '[Local Challenge 2: e.g. Municipal Permit & Lien Searches]',
        description: '[Description of local title coordination and permit follow-up.]'
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
      }
    ],
    metaTitle: '[County Name] Transaction Coordinator | Real Estate TC Services',
    metaDescription: 'Boutique transaction coordinator services for [County Name] Realtors. Expert contract-to-close, MLS compliance, and file management.'
  }
};
```

---

## 4. Current Repository Content State
To honor the launch acceptance principle ("Public visibility is not acceptance"):
* `CMS_ARTICLES` in `src/data/blog.ts` is initialized clean (`{}`).
* `DEMO_BLOG_POSTS` in `src/data/blog.ts` is initialized clean (`[]`).
* `LOCATION_PAGES` in `src/data/locationData.ts` is initialized clean (`{}`).
* **Approved Unpublished Draft:** The locked demo post *"What Makes a Real Estate File Defensible?"* is staged for Michelle’s review at `docs/drafts/what-makes-a-real-estate-file-defensible.md` and will only be published upon written approval.
