# Hometown TC — Search & AI Training Crawler Governance Policy

**Document ID:** HTC-SEO-CRAWLER-01  
**Reference:** Project Book Pre-Launch Checklist — SEO (*"Document the separate training-crawler decision"*)  
**Decision Authority:** Hometown Transaction Coordinators (Client Leadership)  
**Decision Date:** October 22, 2026  
**Status:** Approved & In Effect (`public/robots.txt` unchanged)  

---

## 1. Recorded Client Decision

Per the **Project Book Pre-Launch Checklist (SEO: Document the separate training-crawler decision)**, Hometown Transaction Coordinators has made and recorded the following formal governance decision:

> **Recorded Decision:**  
> Search crawlers and AI crawlers, **including AI training crawlers**, stay allowed across `https://hometowntc.com`. `public/robots.txt` stays as it is.

Specifically, Hometown TC has evaluated **search/retrieval indexing** and **AI model training crawling** as separate governance choices and elected to keep **both** permitted without user-agent `Disallow` rules.

---

## 2. Rationale

1. **Visibility in Generative AI Search & Answer Engines:**  
   Florida Realtors and boutique brokerages increasingly use AI search and answer engines (ChatGPT, Google AI Overviews / Gemini, Perplexity, Claude, Apple Intelligence) to research transaction coordination, FAR/BAR workflows, and flat-fee closing support. Allowing AI crawlers ensures Hometown TC's service lanes, pricing, Florida market coverage, and educational resources are accurately indexed and cited.

2. **Separate Training-Crawler Determination:**  
   Blocking model-training user-agents (`GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`, `CCBot`, etc.) can reduce brand and domain familiarity inside foundational language models over time. Because Hometown TC's public website and `/resources/` articles are published specifically to educate agents and build statewide authority—with no confidential client transaction data exposed on public URLs—training crawlers remain intentionally allowed.

3. **Alignment with `llms.txt` & Sitemap Discovery:**  
   Hometown TC publishes structured machine-readable context at `https://hometowntc.com/llms.txt` and canonical URL discovery at `https://hometowntc.com/sitemap.xml` (which excludes unpublished `draft: true` blog posts at build time).

---

## 3. Production `public/robots.txt` (Unchanged)

Per client instruction, `public/robots.txt` remains unmodified in its exact production state:

```txt
# ========================================================
# Hometown Transaction Coordinators - Production Rules
# Status: Live Production (Search Engine Indexing Enabled)
# ========================================================

User-agent: *
Allow: /

# Sitemaps
Sitemap: https://hometowntc.com/sitemap.xml

# Context specification for AI engines and LLMs
# https://hometowntc.com/llms.txt
```

### Crawler Categories Covered Under `User-agent: *` / `Allow: /`:
* **Search Engine Crawlers (Allowed):** `Googlebot`, `Bingbot`, `Slurp`, `DuckDuckBot`, `Applebot`, `Yandex`.
* **AI Search & Retrieval Crawlers (Allowed):** `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Perplexity-User`.
* **AI Model Training Crawlers — Separate Decision (Allowed):** `GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`, `Meta-ExternalAgent`, `CCBot` (Common Crawl), `Bytespider`, `Diffbot`.

No crawler disallow directives are enacted. Any future change to search or AI training crawler permissions requires explicit client approval and a corresponding update to both this document and `public/robots.txt`.
