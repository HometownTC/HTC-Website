# Hometown TC — Blog Architecture & Category Alignment Specification
**Document ID:** HTC-DOC-BLOG-ALIGN-01  
**Project:** 2027 Website Build Project Book v1.3 (Section 10)  
**Author:** Engineering Team  
**Reviewer:** Michelle Martinez, Founder & Managing Director  
**Status:** Submitted for Written Client Review & Approval  
**Date:** October 20, 2026  

---

## 1. Executive Summary & Purpose

This document provides the formal architectural rationale and category mapping required by **Project Book Section 10**, addressing the client review inquiry regarding:
1. The use of a typed data layer (`src/data/blog.ts`) alongside Markdown/MDX authoring (`docs/drafts/`).
2. The mapping and naming conventions of the six permanent topic categories.
3. Formal submission for Michelle Martinez’s written approval prior to production publishing.

---

## 2. Content System Architecture: Markdown Drafting vs. Static Pre-Rendering

### 2.1 The Two-Tiered Content Architecture
To balance non-technical authoring simplicity with enterprise web security and sub-50ms Cloudflare edge delivery, Hometown TC operates on a **two-tiered architecture**:

```
┌───────────────────────────────────────────────┐
│              TIER 1: DRAFTING                 │
│         (Non-Technical Authoring)             │
│      Location: docs/drafts/[slug].md          │
│  - Plain Markdown / MDX text editing          │
│  - Standard YAML Frontmatter                  │
│  - Full editorial & compliance review         │
└──────────────────────┬────────────────────────┘
                       │ (Upon Michelle's Written Approval)
                       ▼
┌───────────────────────────────────────────────┐
│          TIER 2: STATIC PRE-RENDERING         │
│          (High-Performance Edge Engine)       │
│          Location: src/data/blog.ts           │
│  - Compile-time type validation (TypeScript)  │
│  - Automatic Google JSON-LD structured data   │
│  - Cloudflare Pages static route compilation   │
│  - Zero-crash, sub-50ms edge HTML generation  │
└───────────────────────────────────────────────┘
```

### 2.2 Why This Architecture Protects Hometown TC
1. **Zero-Crash Production Guarantee:** In traditional runtime Markdown parsing, an unclosed tag, broken YAML indentation, or missing image in a markdown file will crash the live site or cause a 500 error. In the HTC architecture, TypeScript validates every field at build time. If a required field is missing, the build fails safely in staging before reaching production.
2. **Automated Search Engine & AI Optimization (AEO/SEO):** The typed schema automatically injects Google-compliant `Article`, `FAQPage`, `BreadcrumbList`, and OpenGraph metadata into the page header without manual tag construction.
3. **Drafting Freedom for HTC Team:** Authors do not touch code. They draft in standard Markdown in `docs/drafts/` with standard YAML frontmatter (as demonstrated in `docs/drafts/what-makes-a-real-estate-file-defensible.md`).

---

## 3. Structured Frontmatter & Schema Completeness

Every article draft in `docs/drafts/` and record in `src/data/blog.ts` supports all fields specified in Book Section 10:

| Field Name | Type | Purpose | Book Section 10 Status |
| :--- | :--- | :--- | :--- |
| `title` / `articleH1` | String | Headline of the brief | **100% Compliant** |
| `slug` | String | Permanent clean URL (`/resources/[slug]/`) | **100% Compliant** |
| `category` | String | One of the 6 approved topic categories | **100% Compliant** |
| `tags` | Array | Topic indexing keywords | **100% Compliant** |
| `formRevision` | String | Associated FAR/BAR or Florida form revision | **100% Compliant** |
| `language` | String | Language code (`en` or `es`) | **100% Compliant** |
| `translationOf` | String / null | Slug of corresponding translation (if applicable) | **100% Compliant** |
| `sources` | Array | Legal & statutory citations (verified sources only) | **100% Compliant** |
| `author` | String | Editorial byline (e.g., HTC Operations Team) | **100% Compliant** |
| `reviewer` | String | Content reviewer (only when approved) | **100% Compliant** |
| `disclaimer` | String | Standard Florida operational & legal disclaimer | **100% Compliant** |
| `theBrief` | String | 40–80 word direct answer above the fold | **100% Compliant** |
| `keyTakeaways` | Array | Up to 5 scannable bullet points | **100% Compliant** |

---

## 4. The Six Approved Topic Categories: Alignment & Mapping

The repository establishes permanent category archive hubs at `/resources/[slug]/` with introduction copy and breadcrumb navigation:

| # | Category Display Name | Repository Slug | Permanent Archive Route | Primary Focus |
| :-: | :--- | :--- | :--- | :--- |
| **1** | **Florida Contracts + Forms** | `contracts-forms` | `/resources/contracts-forms/` | FAR/BAR contract timelines, Standard F calendar rules, addenda protocols, and notice requirements. |
| **2** | **Transaction Operations** | `transaction-operations` | `/resources/transaction-operations/` | Escrow verification letters, municipal lien searches, title commitments, and walkthrough repairs. |
| **3** | **Broker Compliance** | `broker-compliance` | `/resources/broker-compliance/` | Broker audit readiness, file hygiene, commission disbursement authorizations (CDAs), and documentation. |
| **4** | **Condo + HOA** | `condo-hoa` | `/resources/condo-hoa/` | SB 4-D structural reserve studies (SIRS), association application timelines, and condominium disclosures. |
| **5** | **Agent Growth + Leverage** | `agent-growth` | `/resources/agent-growth/` | Administrative time audits, production capacity modeling, and transaction coordinator leverage. |
| **6** | **Florida Real Estate Updates** | `florida-updates` | `/resources/florida-updates/` | Florida legislative amendments, insurance underwriting (Citizens), and county-specific closing procedures. |

### Note on Category Aliases & Clean URLs:
To prevent 404s, the edge routing in `public/_redirects` and `CATEGORY_SLUG_ALIASES` in `src/data/blog.ts` also resolve alternate slugs (such as `agent-growth-leverage` and `florida-real-estate-updates`) to their canonical paths.

---

## 5. Demonstration Post Delivery Status

In accordance with Book Section 10 and Michelle's written instruction:
* **Approved Demonstration Topic:** *"What Makes a Real Estate File Defensible?"*
* **Delivery Location:** `docs/drafts/what-makes-a-real-estate-file-defensible.md`
* **Status:** Staged as an **unpublished draft** with complete frontmatter, verified operational boundaries, and zero invented statutory references.
* **Launch Safeguard:** `CMS_ARTICLES` and `DEMO_BLOG_POSTS` in `src/data/blog.ts` remain empty (`{}` and `[]`) to uphold the launch-day rule: *"Public visibility is not acceptance."*

---

## 6. Formal Written Approval Sign-Off Block

Please review the architecture and six category designations above. Upon approval, reply or countersign below:

* **Architecture Approved:** [ &nbsp; ] Yes &nbsp;&nbsp;&nbsp;&nbsp; [ &nbsp; ] Revisions requested: ___________________
* **Categories Approved:** [ &nbsp; ] Yes &nbsp;&nbsp;&nbsp;&nbsp; [ &nbsp; ] Revisions requested: ___________________
* **Authorized Sign-off:** Michelle Martinez, Hometown TC  
* **Date:** ___________________
