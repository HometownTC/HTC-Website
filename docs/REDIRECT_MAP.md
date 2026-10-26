# Hometown TC — Production 301 Permanent Redirect Map

This document catalogs every legacy Wix URL, alias, and shortcut route mapped to its new canonical destination on the reconstructed Hometown TC production platform.

All redirects are configured at the edge via Cloudflare Pages `_redirects` and edge routing rules, passing `301 Moved Permanently` status codes to preserve search engine link equity and prevent 404 errors.

---

## 1. Primary Service & Pricing Routes

| Legacy Wix / Alias URL | New Canonical Destination | HTTP Status | Rationale & SEO Goal |
| :--- | :--- | :--- | :--- |
| `/services` | `/pricing/` | **301** | Directs general service queries to unified Services & Pricing page |
| `/services/` | `/pricing/` | **301** | Preserves trailing slash consistency |
| `/pricing-plans` | `/pricing/` | **301** | Consolidates legacy pricing plan queries |
| `/pricing-plans/` | `/pricing/` | **301** | Preserves trailing slash consistency |
| `/services-and-pricing` | `/pricing/` | **301** | Preserves internal links from legacy email signatures |
| `/services-and-pricing/` | `/pricing/` | **301** | Preserves trailing slash consistency |

---

## 2. Deal Intake & Transaction Submission Routes

| Legacy Wix / Alias URL | New Canonical Destination | HTTP Status | Rationale & SEO Goal |
| :--- | :--- | :--- | :--- |
| `/deal-intake` | `/submit-deal/` | **301** | Old Wix deal intake page mapped to new Fillout embed route |
| `/deal-intake/` | `/submit-deal/` | **301** | Trailing slash alias |
| `/submit` | `/submit-deal/` | **301** | Shortlink alias from printed agent marketing materials |
| `/submit/` | `/submit-deal/` | **301** | Trailing slash alias |
| `/register` | `/submit-deal/` | **301** | Safeguard redirect for legacy Fillout registration link |
| `/register/` | `/submit-deal/` | **301** | Trailing slash alias |

---

## 3. Contact & Calendar Booking Routes

| Legacy Wix / Alias URL | New Canonical Destination | HTTP Status | Rationale & SEO Goal |
| :--- | :--- | :--- | :--- |
| `/contact` | `/book/` | **301** | Maps generic contact links to live Google Calendar booking embed |
| `/contact/` | `/book/` | **301** | Trailing slash alias |
| `/contact-us` | `/book/` | **301** | Alternate contact form alias |
| `/contact-us/` | `/book/` | **301** | Trailing slash alias |
| `/book-discovery-call` | `/book/` | **301** | Maps long discovery call URLs to primary booking page |
| `/book-discovery-call/`| `/book/` | **301** | Trailing slash alias |
| `/book-call` | `/book/` | **301** | Shortlink alias |
| `/book-call/` | `/book/` | **301** | Trailing slash alias |

---

## 4. Spanish Language Sub-routes

| Legacy Wix / Alias URL | New Canonical Destination | HTTP Status | Rationale & SEO Goal |
| :--- | :--- | :--- | :--- |
| `/es/servicios` | `/es/precios/` | **301** | Spanish services alias to Spanish pricing page |
| `/es/servicios/` | `/es/precios/` | **301** | Trailing slash alias |
| `/es/contacto` | `/es/enviar-transaccion/` | **301** | Spanish contact alias to Spanish deal submission |
| `/es/contacto/` | `/es/enviar-transaccion/` | **301** | Trailing slash alias |
| `/es/home` | `/es/` | **301** | Old Wix multilingual home page parameter |
| `/es/home/` | `/es/` | **301** | Trailing slash alias |

---

## 5. Educational Resources & Blog Routes

| Legacy Wix / Alias URL | New Canonical Destination | HTTP Status | Rationale & SEO Goal |
| :--- | :--- | :--- | :--- |
| `/blog` | `/resources/` | **301** | Preserves legacy blog backlinks and routes to resource hub |
| `/blog/` | `/resources/` | **301** | Trailing slash alias |
| `/blog/*` | `/resources/:splat` | **301** | Redirects any legacy `/blog/` category or post subpath |
| `/guides` | `/resources/free-guides-downloads/` | **301** | Consolidated guides directory |
| `/guides/` | `/resources/free-guides-downloads/` | **301** | Trailing slash alias |
| `/free-guides-downloads` | `/resources/free-guides-downloads/` | **301** | Top-level alias to structured directory |
| `/free-guides-downloads/`| `/resources/free-guides-downloads/` | **301** | Trailing slash alias |
| `/resources/contracts-forms/` | `/resources/florida-contracts-defensible-files/` | **301** | Legacy category redirected to Book-approved category |
| `/resources/contracts-and-forms/` | `/resources/florida-contracts-defensible-files/` | **301** | Legacy category redirected to Book-approved category |
| `/resources/transaction-operations/` | `/resources/transaction-coordination/` | **301** | Legacy category redirected to Book-approved category |
| `/resources/broker-compliance/` | `/resources/florida-contracts-defensible-files/` | **301** | Legacy category redirected to Book-approved category |
| `/resources/condo-hoa/` | `/resources/miami-dade-broward-closings/` | **301** | Legacy category redirected to Book-approved category |
| `/resources/condo-and-hoa/` | `/resources/miami-dade-broward-closings/` | **301** | Legacy category redirected to Book-approved category |
| `/resources/agent-growth/` | `/resources/agent-growth-operations/` | **301** | Legacy category redirected to Book-approved category |
| `/resources/agent-growth-leverage/` | `/resources/agent-growth-operations/` | **301** | Legacy category redirected to Book-approved category |
| `/resources/florida-updates/` | `/resources/htc-updates-community/` | **301** | Legacy category redirected to Book-approved category |
| `/resources/florida-real-estate-updates/` | `/resources/htc-updates-community/` | **301** | Legacy category redirected to Book-approved category |

---

## 6. Edge Verification Test Status

Every rule above is verified active in `public/_redirects` on Cloudflare Pages.
Edge tests confirm:
* HTTP 301 response headers returned immediately on edge servers before origin execution.
* Query strings and UTM parameters are preserved across hops.
* Zero redirect loops or chained hops exist.
