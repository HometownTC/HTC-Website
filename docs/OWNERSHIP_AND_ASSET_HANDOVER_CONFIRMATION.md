# Hometown TC — Asset Ownership & Operational Control Handover Confirmation

**Date:** October 16, 2026  
**To:** Michelle Martinez, Founder & Operations Director — Hometown Transaction Coordinators  
**From:** Muzzamil Ahmed Khan, Lead Developer  
**Subject:** Formal Confirmation of Client Ownership, Asset Transfer & System Control (SOW Section 1.3 / Section 4)

---

## 1. Formal Ownership & Control Confirmation

This document confirms that Hometown Transaction Coordinators ("HTC") maintains complete, sole, and unencumbered ownership and administrative control over all digital assets, source code repositories, hosting environments, domain configurations, and third-party integrations comprising the Hometown TC web platform.

---

## 2. Infrastructure & Asset Register

### 2.1. Source Code Repository
* **Repository:** `https://github.com/HometownTC/HTC-Website`
* **Account / Owner:** `HometownTC` (Sole administrative owner)
* **Access Status:** Lead developer administrative and write seats revoked; Hometown TC maintains sole administrative custody.
* **Sync Architecture:** All external sync workflows (including `.github/workflows/sync-to-client.yml`) have been permanently removed. The repository is 100% self-contained with no upstream dependencies or external force-push mechanisms.

### 2.2. Domain & DNS Management
* **Domain Name:** `hometowntc.com` (and `www.hometowntc.com`)
* **DNS Provider:** Cloudflare DNS (Cloudflare Account: Hometown TC)
* **Status:** Fully configured with Universal SSL, DNSSEC, automated HTTPS rewrites, and fast edge proxying.
* **Registrar Delegation:** Any temporary developer delegate or contributor roles on domain registrars (Squarespace / Google Domains) have been removed.

### 2.3. Web Hosting & Edge Infrastructure
* **Hosting Platform:** Cloudflare Pages
* **Cloudflare Project:** `htc-website`
* **CI/CD Pipeline:** Connected directly to `HometownTC/HTC-Website` (`main` branch).
* **Rollback Capability:** Enabled directly from the Cloudflare Pages dashboard with 10-second instant global restoration.

### 2.4. Legacy Platforms (Wix)
* **Legacy CMS:** Developer administrative seats and collaborator permissions on the legacy Wix site have been de-provisioned.

### 2.5. Forms & Workflow Integrations
* **Lead Ingestion Relay:** FormSubmit AJAX relay configured to deliver leads to `hello@hometowntc.com` with CC to `christian.hernandez@hometowntc.com`.
* **Appointment Scheduling:** Google Appointments direct modal embeds for 15-Minute Fit Calls.
* **Client Intake Workflow:** Fillout secure form embedded on `/submit-deal/`.

---

## 3. Intellectual Property & Work-Product Transfer

In accordance with the agreed Statement of Work and NDA provisions:
1. **Work Product Assignment:** All custom source code, components, scripts, stylesheets, documentation, and digital layouts created for the Hometown TC platform are the exclusive property of Hometown Transaction Coordinators.
2. **Confidentiality:** All credentials, API keys, operational workflows, and client transaction procedures accessed or configured during this engagement remain strictly confidential.
3. **No Backdoors or Residual Access:** No hidden administrative accounts, tokens, or unauthorized webhooks remain active across any client property.

---

**Confirmed and Certified by:**  
*Muzzamil Ahmed Khan*  
Lead Developer — Hometown TC Modernization Project  
Date: October 16, 2026
