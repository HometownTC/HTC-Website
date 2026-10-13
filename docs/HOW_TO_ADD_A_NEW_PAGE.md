# Hometown TC — How to Add a New Page Guide

This guide explains how to add new pages, landing pages, and content to the Hometown TC website while maintaining design system consistency, bilingual routing, SEO standards, and the media assets structure.

---

## 1. Project Architecture Overview

Hometown TC is built with **Astro** and **React**:
* **Astro Pages (`src/pages/`):** Static file-based routing. Each `.astro` file maps directly to a URL.
* **Layout (`src/layouts/Layout.astro`):** Shared HTML wrapper with SEO tags, canonical URLs, OpenGraph metadata, and Google Fonts (`Fraunces` and `Inter`).
* **Design System (`src/index.css`):** Tailwind CSS v4 with custom brand tokens:
  * Coffee Dark: `#3A2E29`
  * Warm Cream Background: `#EEEAEB`
  * Teal Primary: `#0D9BA3`
  * Orange Accent: `#FE7311`
  * Headings: `font-serif` (Fraunces)
  * Body & UI: `font-sans` (Inter)

---

## 2. Step-by-Step: Creating a New Page

### Step 2.1: Create the Route File
To create a page at `https://hometowntc.com/example-page/`:
1. Create a file at `src/pages/example-page.astro` (or `src/pages/example-page/index.astro`).

### Step 2.2: Basic Page Template
Use the following standard structure:

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Page-specific metadata
const pageTitle = "Example Page Title | Hometown TC";
const pageDescription = "Clear, descriptive summary of the page content for search engines (150-160 characters).";
---

<Layout 
  title={pageTitle} 
  description={pageDescription}
  language="en"
>
  <Header client:load />
  
  <main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="space-y-6">
      <h1 class="text-4xl sm:text-5xl font-serif font-extrabold text-[#3A2E29]">
        Your New Page Headline
      </h1>
      <p class="text-lg text-[#3A2E29]/80 font-sans leading-relaxed">
        Your introductory paragraph text here.
      </p>
    </div>
  </main>

  <Footer client:load />
</Layout>
```

---

## 2.3. Markdown (.md) Page Creation Workflow

For editorial team members, writers, or simple text articles who prefer writing in pure Markdown rather than code:

### Step 1: Create a `.md` file in `src/pages/`
Any Markdown file placed in `src/pages/` becomes a live route automatically:
* `src/pages/closing-deadlines.md` ➔ `https://hometowntc.com/closing-deadlines/`
* `src/pages/es/fechas-limite.md` ➔ `https://hometowntc.com/es/fechas-limite/`

### Step 2: Add YAML Frontmatter Header
Every `.md` file starts with three dashes `---` and metadata pointing to the shared layout:

```markdown
---
layout: ../layouts/MarkdownLayout.astro
title: "Understanding Florida Escrow Deadlines | Hometown TC"
description: "A complete guide for Florida Realtors on Section 2 earnest money deposit timing and Florida Statute § 475.25."
language: "en"
---

# Understanding Florida Escrow Deadlines

Written by **Michelle Martinez**, Founder & Operations Director

The initial deposit is one of the most critical statutory dates under the Florida Realtors® / Florida Bar (FAR/BAR) AS IS Contract.

## 1. Statutory 3-Day Rule (FL Stat. § 475.25)
Unless the contract specifies otherwise, the initial earnest money deposit must be delivered to the escrow agent:
* Within **3 calendar days** after the Effective Date.
* HTC verifies receipt with an **Escrow Verification Letter** within 10 days of request.

### Checklist for Agents:
1. Confirm escrow agent contact info in Paragraph 2.
2. Provide wire instructions securely.
3. Obtain written verification of deposit receipt.
```

### Step 3: Bilingual Markdown Page
To create the Spanish version, create `src/pages/es/fechas-limite.md`:
```markdown
---
layout: ../../layouts/MarkdownLayout.astro
title: "Plazos de Depósito de Garantía en Florida | Hometown TC"
description: "Guía completa para agentes de bienes raíces sobre los plazos de depósito bajo el contrato FAR/BAR."
language: "es"
---

# Plazos de Depósito de Garantía en Florida

Contenido del artículo en español...
```

## 3. Creating a Spanish Equivalent Page

Hometown TC is bilingual. If you create an English page, always create the corresponding Spanish page under `src/pages/es/`:

1. Create `src/pages/es/pagina-ejemplo.astro`.
2. Set `language="es"` on `<Layout>`.
3. Provide the explicit alternate URLs so search engines index the language pair properly:

```astro
---
import Layout from '../../layouts/Layout.astro';
import SpanishHeader from '../../components/SpanishHeader';
import SpanishFooter from '../../components/SpanishFooter';

const alternateUrls = [
  { lang: 'en', url: 'https://hometowntc.com/example-page/' },
  { lang: 'es', url: 'https://hometowntc.com/es/pagina-ejemplo/' },
  { lang: 'x-default', url: 'https://hometowntc.com/example-page/' }
];
---

<Layout 
  title="Título en Español | Hometown TC"
  description="Descripción en español para motores de búsqueda."
  language="es"
  alternateUrls={alternateUrls}
>
  <SpanishHeader client:load />
  <main>
    <!-- Contenido en español -->
  </main>
  <SpanishFooter client:load />
</Layout>
```

---

## 4. Media & Asset Folder Conventions

Follow this strict convention when adding images, videos, or downloadable files:

### Directory Structure:
```
public/
  ├── favicon.ico
  ├── robots.txt
  ├── sitemap.xml
  ├── llms.txt
  └── downloads/              <-- PDFs, downloadable checklists, guides
src/assets/
  └── images/                 <-- High-resolution photos, team headshots, hero imagery
```

### Media Rules:
1. **Photographs & Team Images (`src/assets/images/`):**
   * Use lowercase filenames with underscores (e.g. `michelle_martinez_headshot.jpg`).
   * Compress photos before committing (maximum 200–300 KB for photos, WebP or high-quality JPG).
   * In Astro files, import images:
     ```astro
     import myImage from '../assets/images/my_photo.jpg';
     <img src={myImage.src} alt="Descriptive alt text" loading="lazy" />
     ```
2. **Downloadable Files & PDFs (`public/downloads/`):**
   * Place client-facing PDF downloads inside `public/downloads/` (e.g. `public/downloads/florida-contract-to-close-checklist.pdf`).
   * Link to them directly with a leading slash:
     ```html
     <a href="/downloads/florida-contract-to-close-checklist.pdf" download>Download Checklist</a>
     ```
3. **Videos (VSLs):**
   * Embed via responsive 16:9 container using the standard `aspect-video` Tailwind utility.
   * If using external video hosts (YouTube, Vimeo, Cloudflare Stream), use privacy-enhanced embeds or direct player links.

---

## 5. Adding the Page to the XML Sitemap

When you add a new page, add its canonical entry to `public/sitemap.xml`:

```xml
<url>
  <loc>https://hometowntc.com/example-page/</loc>
  <xhtml:link rel="alternate" hreflang="en" href="https://hometowntc.com/example-page/" />
  <xhtml:link rel="alternate" hreflang="es" href="https://hometowntc.com/es/pagina-ejemplo/" />
  <xhtml:link rel="alternate" hreflang="x-default" href="https://hometowntc.com/example-page/" />
  <lastmod>2026-10-18T00:00:00+00:00</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

---

## 6. Pre-Publish Quality Checklist

Before committing and pushing your new page:
- [ ] Heading uses `font-serif` (Fraunces).
- [ ] Body copy and buttons use `font-sans` (Inter).
- [ ] All images have descriptive `alt` attributes (WCAG 2.1 AA requirement).
- [ ] Mobile responsive: test viewport on phone (375px) and tablet (768px).
- [ ] Hreflang alternates point between English and Spanish versions.
- [ ] Run `npm run build` locally to verify 0 errors during static compilation.
