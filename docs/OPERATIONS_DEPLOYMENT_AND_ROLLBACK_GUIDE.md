# Hometown TC — Website Operations, Deployment & Rollback Guide

This document outlines standard operating procedures for managing, deploying, updating, and rolling back the Hometown TC website.

---

## 1. Hosting & Infrastructure Architecture

* **Production Domain:** `https://www.hometowntc.com` (and `https://hometowntc.com`)
* **Sole Authoritative Hosting Platform:** **Cloudflare Pages** (Connected to `main` branch of `https://github.com/HometownTC/HTC-Website`)
* **Legacy Staging Clarification:** Vercel was used strictly for early temporary comparison testing. `vercel.json` has been formally removed from the repository. **Cloudflare Pages is the sole host that deploys from `main`.**
* **SSL/TLS:** Automated Edge Certificate with Cloudflare Universal SSL (HSTS enabled, Full Strict encryption)
* **DNS Management:** Cloudflare DNS (Proxied `CNAME` pointing to Cloudflare Pages)
* **Code Repository:** `https://github.com/HometownTC/HTC-Website` (Solely owned by Hometown TC)

---

## 2. Standard Deployment Workflow

Deployments are 100% automated via Git Integration between GitHub and Cloudflare Pages.

### 2.1. Triggering an Update
1. Any commit pushed directly to the `main` branch of `HometownTC/HTC-Website` (or any Pull Request merged into `main`) triggers an automated build.
2. Cloudflare Pages spins up an isolated build container:
   * **Node.js Runtime:** v18+ / v20+
   * **Build Command:** `npm run build`
   * **Build Output Directory:** `dist`
3. Upon build completion, Cloudflare propagates static assets across 300+ global edge data centers.
4. **Typical Deployment Time:** 45 to 75 seconds from push to live.

### 2.2. Checking Deployment Status
* Open the Cloudflare Dashboard at [dash.cloudflare.com](https://dash.cloudflare.com).
* Go to **Workers & Pages** ➔ Select your project (`htc-website`).
* The **Deployments** tab shows real-time build logs, commit hash, build duration, and deployment status.

---

## 3. Instant 10-Second Rollback Procedure

If a bad commit or broken asset is ever deployed to production, Cloudflare Pages allows instant rollback to any previous deployment without needing to run Git commands.

### How to Roll Back:
1. Log into your Cloudflare Dashboard at [dash.cloudflare.com](https://dash.cloudflare.com).
2. Go to **Workers & Pages** ➔ Click on your project (`htc-website`).
3. Click on the **Deployments** tab.
4. Locate the last known good deployment in the deployment list.
5. Click the three dots (`...`) on the right side of that deployment row.
6. Click **"Rollback to this deployment"**.
7. Confirm the prompt.
8. **Result:** Cloudflare immediately repoints production traffic to the selected build snapshot in under 10 seconds globally.

---

## 4. Local Testing & Verification

Before pushing code changes to `main`, changes can be tested on any local computer:

```bash
# 1. Clone the repository
git clone git@github.com:HometownTC/HTC-Website.git
cd HTC-Website

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
# Server starts at http://localhost:3000

# 4. Test production build locally
npm run build
npm run preview
```

---

## 5. Third-Party Integrations & Configurations

1. **FormSubmit Email Relay (Scale Form):**
   * Endpoint: `https://formsubmit.co/ajax/hello@hometowntc.com`
   * CC Recipient: `christian.hernandez@hometowntc.com`
   * Validation: Requires HTTP 200 and explicit `success: true` in response.
   * Fallback: Renders one-click mailto link on relay drop or network timeout.

2. **Google Analytics 4 (GA4):**
   * Property ID: `G-H2MZLXMY6G` (HTC Website Property)
   * Configured in `src/layouts/Layout.astro` via deferred, non-blocking script loader.
   * Tracks the 7 official business conversion events from Book Section 11:
     1. `book_call_click` (Fit call / calendar booking start)
     2. `booking_complete` (Confirmed calendar booking)
     3. `pricing_plan_click` (Plan selection / modal interaction)
     4. `submit_deal_start` (Deal submission initiation)
     5. `submit_deal_complete` (Successful transaction intake)
     6. `calculator_complete` (Time value calculation completed)
     7. `language_switch` (English/Spanish locale switch)

3. **Edge Permanent Redirects (`public/_redirects`):**
   * All legacy aliases (`/services`, `/deal-intake`, `/pricing-plans`, `/contact`) are mapped to clean 301 destinations.
   * `/register` and `/register/` are mapped directly to `/submit-deal/` to safeguard legacy Fillout links.
