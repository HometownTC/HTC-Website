# Hometown TC — How to Add New Pages & Content Guide

This operational guide explains how the Hometown TC internal team can publish new blog articles, downloadable guides, and regional location landing pages directly within the actual repository without needing external developer assistance.

---

## 1. Repository & Deployment Architecture

* **Framework:** React SPA with Vite & TypeScript
* **Hosting Platform:** Cloudflare Pages
* **Connected Repository:** `https://github.com/HometownTC/HTC-Website` (branch: `main`)
* **Automated CI/CD:** Any change merged or committed to the `main` branch automatically triggers a fresh Cloudflare Pages build and publishes live to `https://www.hometowntc.com` in approximately 60 seconds.
* **Build Command:** `npm run build`
* **Output Directory:** `dist`

---

## 2. Publishing a New Blog Post (Zero Code / Content-Only)

Blog articles and educational resources do **not** require creating new component files or configuring routes. The routing engine in `src/App.tsx` dynamically generates blog routes from data.

### Step 2.1: Open the Blog Data File
File path: `src/data/blog.ts`

### Step 2.2: Add Your New Article Object to `DEMO_BLOG_POSTS`
Scroll to the top of the `DEMO_BLOG_POSTS` array and paste your new article entry:

```typescript
{
  id: 'fl-escrow-timelines-2026',
  slug: 'florida-escrow-deposit-timelines-guide',
  title: 'Florida Escrow Deposit Timelines: FAR/BAR Contract Rules Explained',
  excerpt: 'A step-by-step breakdown of statutory earnest money deposit deadlines under the Florida FAR/BAR contract and how to prevent buyer default.',
  category: 'Contract to Close', // Choose: 'Contract to Close' | 'Listing Coordination' | 'Broker Compliance' | 'Florida Real Estate'
  readTime: '4 min read',
  date: 'October 16, 2026',
  author: 'Michelle Martinez',
  featured: true, // Set to true to feature on the Resources hub hero
  content: `
    <p>Under the Florida Realtors® / Florida Bar (FAR/BAR) AS IS Contract, the initial deposit is one of the most critical statutory milestones in the entire transaction.</p>
    
    <h3>The 3-Day Default Statutory Rule</h3>
    <p>Unless Paragraph 2(a) specifies a customized number of days, the initial earnest money deposit must be delivered to the escrow agent within <strong>3 calendar days</strong> after the Effective Date.</p>
    
    <h3>Why Written Escrow Verification Matters</h3>
    <p>Hometown TC automatically requests and secures a formal Escrow Verification Letter directly from the title company or closing attorney, archiving it for brokerage compliance and protecting the agent from statutory default liability.</p>
  `,
  seoDescription: 'Complete guide for Florida Realtors on Section 2 earnest money deposit timing, calendar day rules, and Escrow Verification Letters under FAR/BAR.'
}
```

### Step 2.3: Live URLs Generated Automatically
Once committed to `main`, the post is instantly live at both:
* `https://www.hometowntc.com/resources/florida-escrow-deposit-timelines-guide/`
* `https://www.hometowntc.com/blog/florida-escrow-deposit-timelines-guide/`
* It will also automatically appear in the Resources search directory and under the corresponding category archive (`/resources/contract-to-close/`).

---

## 3. Adding a New Free Guide or Checklist

Downloadable checklists, PDF summaries, and agent lead magnets are managed in `src/data/resourceLibraryData.ts`.

### Step 3.1: Open the Resource Library File
File path: `src/data/resourceLibraryData.ts`

### Step 3.2: Add an Entry to `RESOURCE_ITEMS`
```typescript
{
  id: 'fl-hoa-condo-rider-checklist',
  slug: 'florida-hoa-condo-disclosure-checklist',
  title: 'Florida HOA & Condo Rider Disclosure Checklist',
  category: 'Compliance & Disclosures',
  description: 'Essential checklist covering Chapter 720 HOA disclosure summaries and 3-day statutory right of rescission documentation.',
  format: 'PDF Download',
  fileSize: '1.2 MB',
  audience: 'Florida Listing & Buyer Agents',
  downloadUrl: '/downloads/FL-HOA-Condo-Disclosure-Checklist.pdf'
}
```

### Step 3.3: Upload the PDF
Drop the actual PDF file into the `public/downloads/` folder. The landing page and instant download button are automatically generated.

---

## 4. Creating a New County / City Location Landing Page

Location pages provide hyper-targeted programmatic SEO for Florida counties and municipalities (e.g., Palm Beach County, Orlando, Tampa, St. Petersburg).

### Step 4.1: Duplicate an Existing Location Component
Copy an established location page as your template:
* Copy `src/components/MiamiTransactionCoordinatorPage.tsx`
* Rename the copy to `src/components/PalmBeachTransactionCoordinatorPage.tsx`

### Step 4.2: Update the Content & Local Board References
Inside your new component, customize:
1. **County & Municipality Names:** e.g., Palm Beach County, Boca Raton, West Palm Beach, Delray Beach, Jupiter.
2. **Local MLS Board:** Update from MIAMI REALTORS® to **BeachesMLS / Broward, Palm Beaches & St. Lucie Realtors®**.
3. **Local Municipal Liens & Code Compliance:** Update specific regional title and permit conventions.
4. **SEO Schema:** Update the `BreadcrumbList` and `LocalBusiness` JSON-LD schema objects at the top of the component.

### Step 4.3: Register the Route in `src/App.tsx`
Open `src/App.tsx` and add 3 small lines:

1. **Lazy Import (Line ~26):**
```typescript
const PalmBeachTransactionCoordinatorPage = lazy(() => 
  import('./components/PalmBeachTransactionCoordinatorPage').then(m => ({ default: m.PalmBeachTransactionCoordinatorPage }))
);
```

2. **Route Match Condition (Line ~160):**
```typescript
const isPalmBeachTcPage = normalizedPath === '/palm-beach-transaction-coordinator';
```

3. **Add to `isKnownRoute` Check (Line ~235):**
```typescript
isPalmBeachTcPage ||
```

4. **Render in `<main>` (Line ~370):**
```typescript
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

## 5. Publishing Changes

1. Open your Git client (or GitHub web interface at `https://github.com/HometownTC/HTC-Website`).
2. Commit your edits to `main` with a descriptive message (e.g., `Add Florida Escrow Guide blog post`).
3. Push to `main`.
4. Cloudflare Pages automatically builds and deploys your updates live to `https://www.hometowntc.com` within 1 minute.
