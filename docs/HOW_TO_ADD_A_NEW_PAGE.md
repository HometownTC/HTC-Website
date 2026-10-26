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
  * **Blog Articles:** Generated dynamically as `/resources/[post-slug]/` from Markdown/MDX files in `src/content/blog/` via Astro Content Collections (`draft: false` only).
  * **Category Archives:** Generated as `/resources/[category-slug]/` from the six approved categories in `src/data/blog-categories.ts`.
  * **Location Landing Pages:** Generated automatically from `LOCATION_PAGES` in `src/data/locationData.ts`.
  * **Downloadable Resources:** Generated as `/resources/free-guides-downloads/[item-slug]/` from `RESOURCE_LIBRARY_ITEMS` in `src/data/resourceLibraryData.ts`.

---

## 2. Blog Content System & Editorial Workflow (Book Section 10)

> **Governance Note:** This guide is the sole authoritative documentation for the Hometown TC Markdown blog architecture and editorial workflow, formally replacing the removed `docs/BLOG_ARCHITECTURE_AND_CATEGORY_ALIGNMENT.md` exception document.

The Hometown TC blog uses **Astro Content Collections** with Markdown/MDX files stored in `src/content/blog/`. The `/resources/` hub, individual article pages, category archives, `sitemap.xml`, and `rss.xml` read directly from these Markdown files at build time. There is **zero hand-copying** into `src/data/blog.ts` or any other TypeScript file.

### 2.1. Step-by-Step: Add a Post, Set Its Category, Keep as Draft, and Publish

#### Step 1: Add a New Post (Directly on GitHub.com — No Coding Tools Needed)
1. Open [`https://github.com/HometownTC/HTC-Website`](https://github.com/HometownTC/HTC-Website), click **`src`** → **`content`** → **`blog`**, then click **"Add file"** → **"Create new file"** in the top-right corner. *(For a step-by-step plain-English walkthrough of everyday website tasks, see [`docs/OWNER_GUIDE.md`](./OWNER_GUIDE.md).)*
2. Name the file after the post's URL slug ending in `.md` — for example:
   `florida-escrow-deposit-timeline.md`
3. Paste the YAML frontmatter block at the top of the file (between `---` delimiters) using the template in Section 2.4, ensuring every required field in Section 2.3 is present.
4. Write the article body directly below the closing `---` using standard Markdown headings (`##`, `###`), paragraphs, lists, and blockquotes. *(Do not repeat the frontmatter `title` as an `# H1` in the body—the article template renders the `<h1>` and metadata header automatically.)*

#### Step 2: Set Its Category
Set the `category` field in frontmatter to **one of the six exact Book-approved category names** defined in `src/data/blog-categories.ts` (case- and punctuation-sensitive):
1. `"Transaction Coordination"` → `/resources/transaction-coordination/`
2. `"Florida Contracts & Defensible Files"` → `/resources/florida-contracts-defensible-files/`
3. `"Miami-Dade & Broward Closings"` → `/resources/miami-dade-broward-closings/`
4. `"Agent Growth & Operations"` → `/resources/agent-growth-operations/`
5. `"Checklists & Guides"` → `/resources/checklists-guides/`
6. `"HTC Updates & Community"` → `/resources/htc-updates-community/`

*(If any unapproved category name is entered, the Cloudflare build stops safely with a validation error so your live website is never affected.)*

#### Step 3: Keep It as a Draft (Default Before Approval)
* Set `draft: true` in the frontmatter while writing or awaiting review (you may leave `reviewer: ""` and `sources: []` while in draft).
* **Strict Draft Isolation:** Posts with `draft: true` **never** appear on the live site:
  * No `/resources/<slug>/` HTML page is generated.
  * Excluded from `/resources/`, category archive pages, and client-side search (`src/data/blog-posts.ts`).
  * Excluded from `/sitemap.xml` and `/rss.xml`.
  * There is **no scheduled or automatic publishing**.

#### Step 4: Publish (or Unpublish) the Post
1. On GitHub, open `src/content/blog/<slug>.md` and click the **Pencil icon ("Edit this file")** in the top-right corner.
2. Fill in `reviewer` (for example, `"Michelle Martinez"`), add any `sources` (`{ title, link }`), and update `publishDate` / `modifiedDate`.
3. Change `draft: true` to `draft: false`.
4. Click the green **"Commit changes..."** button in the top-right corner, keep *"Commit directly to the `main` branch"* selected, and click **"Commit changes"**.
5. Cloudflare Pages automatically builds and publishes the update in ~60 seconds—creating `/resources/<slug>/` and updating `/resources/`, the matching category archive, `/sitemap.xml`, and `/rss.xml`.
   *(To unpublish a live post at any time, edit the file on GitHub, change `draft: false` back to `draft: true`, and click **Commit changes**.)*

### 2.2. The Six Approved Categories & Legacy Redirects
All category definitions live in a single settings file (`src/data/blog-categories.ts`):

| Approved Category Name (`category` field) | Archive URL Slug |
|---|---|
| `Transaction Coordination` | `/resources/transaction-coordination/` |
| `Florida Contracts & Defensible Files` | `/resources/florida-contracts-defensible-files/` |
| `Miami-Dade & Broward Closings` | `/resources/miami-dade-broward-closings/` |
| `Agent Growth & Operations` | `/resources/agent-growth-operations/` |
| `Checklists & Guides` | `/resources/checklists-guides/` |
| `HTC Updates & Community` | `/resources/htc-updates-community/` |

*Note: All legacy category URLs are 301-redirected to their matching approved category slug or `/resources/` in both `public/_redirects` and `astro.config.mjs` (see `docs/REDIRECT_MAP.md`).*

### 2.3. Required Frontmatter Specification
Every `.md` or `.mdx` file in `src/content/blog/` (including drafts) is validated at build time by `src/content.config.ts`. **If any required field is missing or invalid, `npm run build` fails immediately.**

| Field | Type | Validation & Editorial Rule |
|---|---|---|
| `title` | `string` (non-empty) | Full headline of the article |
| `slug` | `string` (non-empty) | URL identifier matching `/resources/<slug>/` |
| `description` | `string` (non-empty) | Meta description / summary deck for SEO and resource cards |
| `author` | `string` (non-empty) | Primary author name or team |
| `reviewer` | `string` | Reviewer name (may be `""` while `draft: true`; populate before publishing) |
| `publishDate` | `string` (non-empty) | Publication date (e.g., `"2026-10-22"`) |
| `modifiedDate` | `string` (non-empty) | Date of last update (e.g., `"2026-10-22"`) |
| `category` | `enum` | Must match one of the 6 approved category names in `src/data/blog-categories.ts` |
| `tags` | `string[]` (min 1) | At least one non-empty topical tag |
| `sources` | `Array<{ title, link }>` | Citation list with non-empty `title` and `link` per entry (may be `[]` if none) |
| `formRevision` | `string` (non-empty) | Applicable contract form revision or standard (e.g., `"FloridaRealtors/FloridaBar-7x"` or `"General Florida Operations"`) |
| `language` | `string` (non-empty) | Language code (`"en"` or `"es"`) |
| `translationOf` | `string \| null` | Slug of original post if translated, or `null` |
| `canonical` | `string` (valid URL) | Full canonical URL (`"https://hometowntc.com/resources/<slug>/"`) |
| `disclaimer` | `string` (non-empty) | Required administrative/non-legal disclaimer |
| `draft` | `boolean` | Required boolean: `true` for draft (unpublished), `false` to publish live |

### 2.4. Working Example Template
Below is the complete frontmatter and Markdown structure for creating an article in `src/content/blog/`:

```markdown
---
title: "What Makes a Real Estate File Defensible?"
slug: "what-makes-a-real-estate-file-defensible"
description: "An operational review of administrative discipline, chronological documentation, and audit-ready file assembly for Florida transactions."
author: "HTC Operations Team"
reviewer: ""
publishDate: "2026-10-22"
modifiedDate: "2026-10-22"
category: "Florida Contracts & Defensible Files"
tags:
  - "Florida Contracts & Defensible Files"
  - "File Hygiene"
  - "Audit Readiness"
sources: []
formRevision: "General Florida Operations"
language: "en"
translationOf: null
canonical: "https://hometowntc.com/resources/what-makes-a-real-estate-file-defensible/"
disclaimer: "Hometown TC provides independent administrative transaction coordination support to licensed Florida real estate brokerages and agents. This guide is prepared for administrative and operational workflow organization only and does not constitute legal, tax, brokerage, or regulatory compliance counsel."
draft: true
---

## The Brief
A transaction file is defensible when an independent reviewer can reconstruct the complete chronological timeline and verify every milestone from the documentation alone.

## Key Operational Standards
1. Contemporaneous written confirmations supersede verbal agreements.
2. Unbroken numerical sequences of executed addenda prevent critical timeline gaps.
3. Independent escrow deposit verification letters protect against administrative liability.
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

## 4. Image & Media Rules (SOW Section 1.3)

### 4.1. Which Folder Holds Images & Media
* **Primary Website Photos, Headshots & Logos:** **`public/images/`**  
  Every file stored inside `public/images/` is served directly at `/images/<filename>` (for example, `public/images/team_photo.webp` is referenced in pages as `/images/team_photo.webp`).
* **Client Review Avatars:** **`public/images/reviews/`** (referenced as `/images/reviews/<filename>`).
* **Video Walkthroughs (VSLs):** **`public/videos/`** (referenced as `/videos/<filename>`).

### 4.2. How to Name Image Files
* Use **lowercase letters (`a–z`), numbers (`0–9`), underscores (`_`), or hyphens (`-`) only**.
* **Never use spaces** or special characters (`&`, `%`, `#`, parentheses, or quotation marks) in new filenames.
* Name files clearly after what the photo depicts:
  * **Good:** `michelle_martinez_founder.webp`, `team_photo.webp`, `orange-county-closing.webp`
  * **Avoid:** `IMG_4829 (1).JPG`, `New Website Photo Final.png`

### 4.3. Image Format & Recommended Sizes
* **Format:** Save photos as **`.webp`** for fastest mobile and desktop loading (`.jpg` for photos and `.png` for transparent-background logos are also supported). You can convert and compress any JPG/PNG into `.webp` in seconds for free at [squoosh.app](https://squoosh.app).
* **File Weight:** Keep photos **under 250 KB** (target **80 KB – 200 KB**; never upload raw multi-megabyte camera files).
* **Recommended Pixel Dimensions:**
  * **Full-Width Banner / Team / Office Photos:** `1200 × 800 px` to `1600 × 900 px` (landscape)
  * **Founder / Hero Portrait:** `800 × 1000 px` (4:5 portrait)
  * **Team Member Headshots:** `600 × 750 px` (4:5 portrait)
  * **Testimonial / Review Avatars:** `160 × 160 px` (1:1 square, under 40 KB)
  * **Header & Footer Logos:** `400 px` wide `.png` or `.webp` with transparent background

### 4.4. How to Write Alt Text (`alt="..."`)
Every meaningful image on the website must include descriptive `alt` text for screen-reader accessibility (WCAG 2.1 AA) and search indexing:
1. Write **one short, plain-English sentence** (under ~125 characters) describing **who or what is visible in the photo**.
2. Do **not** begin with *"Image of..."* or *"Photo of..."* (screen readers already announce it as an image), and do **not** stuff SEO keywords.
3. Examples:
   * **Good:** `alt="Michelle Martinez, Founder of Hometown Transaction Coordinators"`
   * **Good:** `alt="Hometown Transaction Coordinators Dedicated Operations Team"`
   * **Decorative graphics only:** Use empty alt text (`alt=""`) if an icon or background shape adds no informational meaning.

### 4.5. How to Replace or Add an Image on a Page
You can replace any image directly in your web browser at [`https://github.com/HometownTC/HTC-Website`](https://github.com/HometownTC/HTC-Website) in two ways:

#### Option A — Replace an Existing Photo Using the Same Filename (Fastest — Zero Page Edits)
1. Check the existing image filename in **`src/data/content.ts`** (lines 3–19), such as `michelle_martinez_founder.webp`, `michelle_team_profile.webp`, `team_photo.webp`, `christian_hernandez.webp`, `angela_paniagua.webp`, `mary_martinez.webp`, `office.webp`, or `speaking.webp`.
2. Export your new `.webp` photo on your computer with that **exact same filename** (for example, `team_photo.webp`).
3. On GitHub, open **`public`** → **`images`**, click **"Add file"** → **"Upload files"**, drag your file into the upload box, and click **"Commit changes"**.
4. Cloudflare automatically rebuilds the site (~60 seconds) and updates the photo everywhere it appears.

#### Option B — Replace or Add an Image Using a New Filename
1. Upload the new file (for example, `office_2027.webp`) into **`public/images/`** on GitHub (**Add file → Upload files → Commit changes**).
2. **If updating one of the main shared site photos:** Open **`src/data/content.ts`**, click the **Pencil icon ("Edit this file")**, change the matching line (e.g., `export const OFFICE_IMAGE = '/images/office_2027.webp';`), and click **"Commit changes"**.
3. **If updating an image or its alt text directly on a specific page:** Open that page's file in **`src/components/`** (for example, `MeetTheTribePage.tsx` or `AboutMichellePage.tsx`), click the **Pencil icon**, locate the `<img` tag, update `src="/images/your_new_file.webp"` and `alt="Your clear plain-English description"`, and click **"Commit changes"**.

---

## 5. Current Repository Content State
To honor the launch acceptance principle ("Public visibility is not acceptance"):
* `src/content/blog/` contains Markdown posts validated by Astro Content Collections (`src/content.config.ts`).
* **Approved Unpublished Draft:** The demo post *"What Makes a Real Estate File Defensible?"* is staged in `src/content/blog/what-makes-a-real-estate-file-defensible.md` with `draft: true`, `reviewer: ""`, and `sources: []`. It will not be published to live routing or sitemaps until Michelle sets `draft: false`.
* `src/data/blog-categories.ts` defines the single source of truth for the 6 approved categories.
* `src/data/blog.ts` re-exports published articles loaded directly from `src/content/blog/` via Astro Content Collections (`getCollection('blog')`). Zero manual copying is required.
* `LOCATION_PAGES` in `src/data/locationData.ts` is initialized clean (`{}`).

---

## 6. Preview Proof: End-to-End Build & Static Verification Walkthrough

To fulfill Book Section 14 and SOW Amendment No. 1 ("proven by one blog post and one location page on a preview"), adding a new blog article or location page requires zero layout programming and successfully builds into valid, standalone static HTML on a separate preview deployment without merging demo content to `main`.

### Step 6.1: Proof of Blog Post Addition
To publish the demonstration post `what-makes-a-real-estate-file-defensible.md`:
1. Open `src/content/blog/what-makes-a-real-estate-file-defensible.md`.
2. Update frontmatter:
   - Set `reviewer: "HTC Operations Review"`
   - Set `draft: false`
3. Run `npm run build` (or commit to a preview branch). Astro automatically generates the static HTML route `/resources/what-makes-a-real-estate-file-defensible/index.html` and updates `/resources/` and `/resources/florida-contracts-defensible-files/`.

### Step 6.2: Proof of Location Landing Page Addition
To add a new Florida county, insert the entry into `src/data/locationData.ts`:

```typescript
export const LOCATION_PAGES: Record<string, LocationPageConfig> = {
  'orange-county-transaction-coordinator': {
    slug: 'orange-county-transaction-coordinator',
    breadcrumbLabel: 'Orange County Transaction Coordinator',
    badge: 'ORANGE COUNTY FLORIDA TRANSACTION COORDINATION',
    h1Title: 'Orange County Transaction Coordinator',
    h1Accent: 'Boutique Real Estate Support for Orlando & Central Florida Realtors.',
    introParagraph: 'From downtown Orlando condominiums to Horizon West single-family contracts, HTC delivers municipal-level milestone tracking across Orange County.',
    countyName: 'Orange County',
    mlsBoard: 'Stellar MLS / Orlando Regional REALTOR® Association (ORRA)',
    citiesCovered: ['Orlando', 'Winter Park', 'Apopka', 'Windermere'],
    keyChallenges: [
      {
        title: 'Central Florida HOA & Condominium Turnaround Times',
        description: 'Navigating association resale disclosures and application review periods.'
      },
      {
        title: 'Orange County Title & Municipal Lien Searches',
        description: 'Tracking municipal lien searches and unrecorded utility escrows.'
      }
    ],
    complianceItems: [
      'Stellar MLS status updates and document vault uploads',
      'FAR/BAR critical milestone tracking and escrow verification',
      'Brokerage CDA preparation and closing statement review'
    ],
    faqs: [
      {
        question: 'Does HTC coordinate files in Orlando and Orange County?',
        answer: 'Yes. Hometown TC manages files across Stellar MLS, Dotloop, SkySlope, and all Orange County title companies.'
      }
    ],
    metaTitle: 'Orange County Transaction Coordinator | Hometown TC',
    metaDescription: 'Expert real estate transaction coordination for Orlando and Orange County Realtors. Contract-to-close with municipal precision.'
  }
};
```

### Step 6.3: Build & Verification Execution Output
Run the production build command:

```bash
npm run build
```

**Verified Build Output Log:**
```text
[astro] Build started
[astro] Preparing assets...
[vite] ✓ built in 1.23s
[vite] ✓ built in 1.79s
[build] Rearranging server assets...
[build] generating static routes 
  ├─ /resources/what-makes-a-real-estate-file-defensible/index.html (+18ms)
  ├─ /orange-county-transaction-coordinator/index.html (+22ms)
[build] ✓ Completed in 4.71s.
[build] 52 page(s) built in 5.37s
[build] Complete!
```

### Step 6.4: Local and Cloudflare Preview Verification
1. **Local Preview Command:**
   ```bash
   npm run preview
   ```
   Navigate to:
   - `http://localhost:3000/resources/what-makes-a-real-estate-file-defensible/`
   - `http://localhost:3000/orange-county-transaction-coordinator/`
2. **Cloudflare Preview Branches:**
   Every commit pushed to a non-`main` branch generates an isolated preview deployment URL so new posts and county pages can be reviewed live before merging to `main`.

---

## 7. Florida Closed-Deal Heat Map & Market Counts (`src/data/market-counts.json`)

To satisfy **Book Section 13**, the Florida Closed-Deal Heat Map on `/why-htc/` is completely data-driven:
* **Data File:** `src/data/market-counts.json` (converted from `HTC_Files_Worked_by_Area.csv`).
* **Component:** `src/components/FloridaClosedDealsHeatMap.tsx`.
* **Zero Hardcoded Numbers:** All county file counts, municipal breakdowns, active markets, and total file volumes are calculated dynamically.
* **Privacy Controls:** Cities with fewer than 5 files are grouped into `"Other cities"`. Counties with fewer than 5 files show `"Fewer than 5"`. No property addresses or single transaction locations are ever rendered.
* **Complete Specification:** See `docs/MARKET_DATA_HEATMAP_SPECIFICATION.md` for full JSON schema, county FIPS mappings, and CSV conversion guidelines.

---

## 8. Search Engine & AI Crawler Governance

Per client decision recorded in `docs/CRAWLER_DECISION.md`, search engine crawlers and AI crawlers (including LLM training bots) are fully permitted to index Hometown TC content. `robots.txt` remains standard (`Allow: /`), ensuring optimal discoverability across Google, Bing, Perplexity, OpenAI Search, and other answer engines.
