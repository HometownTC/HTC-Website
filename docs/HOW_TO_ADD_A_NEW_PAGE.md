# Hometown TC — How to Add New Pages & Content Guide

This document is the official operational guide for the Hometown TC team to publish new blog articles, downloadable resources, and regional location landing pages directly within the repository.

---

## 1. Architecture & Static Routing Overview

* **Engine:** Astro v7 (Static Site Generation / SSG) with React v19 components (`@astrojs/react`) and Tailwind CSS v4.
* **Production Build Command:** `npm run build` (runs `astro build` to compile pre-rendered static HTML into `dist/`).
* **Hosting Platform:** Cloudflare Pages connected to `https://github.com/HometownTC/HTC-Website` (`main` branch).
* **Static Routing Engine (`src/pages/[...slug].astro`):**  
  Astro pre-renders all site URLs at build time via `export async function getStaticPaths()`. Any URL published on the site is defined through this function:
  * Static core routes are enumerated in the `routes` array.
  * Blog article routes are generated as `/resources/[post-slug]/` from `DEMO_BLOG_POSTS` in `src/data/blog.ts`.
  * Category archive routes are generated as `/resources/[category-slug]/` from `CATEGORY_ARCHIVE_CONFIGS`.
  * Downloadable resource pages are generated as `/resources/free-guides-downloads/[item-slug]/` from `RESOURCE_LIBRARY_ITEMS` in `src/data/resourceLibraryData.ts`.

---

## 2. How to Publish a New Blog Post

Blog articles live in `src/data/blog.ts`. When a new post is added to `DEMO_BLOG_POSTS`, Astro's `getStaticPaths()` automatically generates the static HTML page at build time under `/resources/[slug]/`, and React mounts the article view (`BlogPostPage.tsx`) seamlessly.

### Step 2.1: Open `src/data/blog.ts`
Locate the `DEMO_BLOG_POSTS` array (around line 458):

```typescript
export const DEMO_BLOG_POSTS: BlogPost[] = [ ... ];
```

### Step 2.2: Add Your New Article Matching the Exact `BlogPost` Interface
The `BlogPost` interface requires these exact fields:

```typescript
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  reviewer: string;
  dateUpdated: string;
  readTime: string;
  image: string;
  featured?: boolean;
}
```

#### Working Example to Add to `DEMO_BLOG_POSTS`:
```typescript
{
  id: 'fl-escrow-deposit-timelines-2026',
  slug: 'florida-escrow-deposit-timelines-guide',
  title: 'Florida Escrow Deposit Timelines: FAR/BAR Rules Explained',
  excerpt: 'A practical breakdown of statutory earnest money deposit deadlines under the Florida FAR/BAR contract and how to prevent buyer default.',
  category: 'Contracts + Forms', // Use: 'Contracts + Forms' | 'Transaction Operations' | 'Broker Compliance' | 'Condo + HOA' | 'Agent Growth + Leverage' | 'Florida Real Estate Updates'
  author: 'HTC Operations Team',
  reviewer: 'Michelle Martinez, Founder',
  dateUpdated: 'October 16, 2026',
  readTime: '4 min brief',
  image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800',
  featured: true
}
```

### Step 2.3: URL and Archive Destination
Once committed and deployed:
* **Live Static URL:** `https://www.hometowntc.com/resources/florida-escrow-deposit-timelines-guide/`
* **Category Archive:** It automatically displays in the Resources Hub (`/resources/`) and under its category archive (`/resources/contracts-forms/`).

---

## 3. How to Add a New Downloadable Guide or Checklist

Downloadable templates, field manuals, and agent checklists are stored in `src/data/resourceLibraryData.ts` in the **`RESOURCE_LIBRARY_ITEMS`** array.

### Step 3.1: Open `src/data/resourceLibraryData.ts`
Locate the `RESOURCE_LIBRARY_ITEMS` array (around line 499):

```typescript
export const RESOURCE_LIBRARY_ITEMS: ResourceItem[] = [ ... ];
```

### Step 3.2: Add Your New Resource Object
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

### Step 3.3: Upload the Download File
Place your PDF into `public/downloads/florida-hoa-condo-rider-checklist.pdf`. Astro’s static route generator automatically builds the live landing page at:  
`https://www.hometowntc.com/resources/free-guides-downloads/florida-hoa-condo-rider-checklist/`

---

## 4. How to Add a New Location Landing Page (Matching Astro SSG)

Because Hometown TC uses Astro's Static Site Generation, adding a new regional landing page (e.g. `palm-beach-transaction-coordinator`) requires **three synchronized steps**:

### Step 4.1: Create the Component
1. Duplicate an existing location component:
   * Copy `src/components/MiamiTransactionCoordinatorPage.tsx`
   * Save as `src/components/PalmBeachTransactionCoordinatorPage.tsx`
2. Update the copy inside the new component:
   * Change county name: "Palm Beach County"
   * Change local MLS board: "BeachesMLS / Broward, Palm Beaches & St. Lucie Realtors®"
   * Update regional municipalities: Boca Raton, West Palm Beach, Delray Beach, Jupiter, Palm Beach Gardens.

### Step 4.2: Register the Static Path in Astro (`src/pages/[...slug].astro`)
Open `src/pages/[...slug].astro`. In the `getStaticPaths()` function, add your new URL slug to the `routes` array (around line 30):

```typescript
export async function getStaticPaths() {
  const routes = [
    // ... existing location routes ...
    'miami-transaction-coordinator',
    'miami-dade-transaction-coordinator',
    'broward-transaction-coordinator',
    'south-florida-transaction-coordinator',
    'palm-beach-transaction-coordinator', // <--- ADD YOUR NEW ROUTE SLUG HERE
    // ... remaining routes ...
  ];
```
*This instructs Astro to pre-render `/palm-beach-transaction-coordinator/index.html` at build time.*

### Step 4.3: Register Component in the React Router (`src/App.tsx`)
Open `src/App.tsx` and connect the component:

1. **Add the lazy import (near top with other sub-pages):**
```typescript
const PalmBeachTransactionCoordinatorPage = lazy(() => 
  import('./components/PalmBeachTransactionCoordinatorPage').then(m => ({ default: m.PalmBeachTransactionCoordinatorPage }))
);
```

2. **Add the route flag (near line ~165):**
```typescript
const isPalmBeachTcPage = normalizedPath === '/palm-beach-transaction-coordinator';
```

3. **Include in `isKnownRoute` check (near line ~240):**
```typescript
isPalmBeachTcPage ||
```

4. **Mount in the render block (near line ~370):**
```tsx
) : isPalmBeachTcPage ? (
  <PalmBeachTransactionCoordinatorPage
    onBookCall={() => navigateTo('/book/')}
    onSubmitDeal={() => navigateTo('/submit-deal/')}
    onExploreServices={() => navigateTo('/pricing/')}
    onGoHome={() => navigateTo('/')}
  />
```

5. **(Optional) Add to Navigation Menu:**
In `src/components/Navbar.tsx`, add a link to `/palm-beach-transaction-coordinator/` under the Locations dropdown.

---

## 5. Automated Build & Verification

1. Commit and push your changes to the `main` branch of `https://github.com/HometownTC/HTC-Website`.
2. Cloudflare Pages runs `astro build`.
3. Astro validates all static paths, compiles the static HTML files, and deploys live to `https://www.hometowntc.com` within 60 seconds.
