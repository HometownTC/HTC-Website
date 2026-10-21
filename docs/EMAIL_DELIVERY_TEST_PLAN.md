# Hometown TC — Email Delivery Test Plan & Verification Protocol
**Document ID:** HTC-QA-EMAIL-PLAN-01  
**Project Book Version:** v1.3 (Section 14 — Operational Quality & Email Handshake)  
**Author:** Muzzamil Ahmed (Development Team)  
**Reviewer:** Michelle Martinez, Founder & CEO  
**Date:** October 21, 2026  

---

## 1. Executive Summary & Separation of Responsibilities

To satisfy **Book Section 14** delivery requirements without breaching security boundaries:
* **Developer Boundary:** Development engineers have zero access to HTC Google Workspace admin credentials, private DNS records, or internal mailbox accounts (`hello@hometowntc.com`, `christian.hernandez@hometowntc.com`). 
* **Inbound Tests (Completed by Developer):** Executed by developer using verified real personal accounts across the three major consumer/enterprise mail networks (Google/Gmail, Microsoft Outlook, Yahoo Mail).
* **Outbound Tests (HTC Team Scope):** Executed directly by the HTC internal team from inside authorized Google Workspace mailboxes.

---

## 2. Inbound Test Execution Results (Developer Scope — COMPLETED)

### Objective
Verify that web form submissions originating from real sender addresses across Gmail, Outlook, and Yahoo reach FormSubmit.co and relay successfully into `hello@hometowntc.com` with mandatory CC to `christian.hernandez@hometowntc.com`.

### Verified Inbound Test Runs (Live Output Recorded in `docs/scale-form-test.log`)

| Test Run | Provider | Sender Email Identity | Tester Name | Exact UTC Timestamp | FormSubmit Status | Relay Code |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **IN-GMAIL-01** | Google (Gmail) | `muzzamil.wpdev@gmail.com` | Muzzamil Ahmed | **Oct 21, 2026 15:21:38 UTC** | Delivered | HTTP 200 OK |
| **IN-OUTLOOK-02** | Microsoft Outlook | `muzzamil.wpdev@outlook.com` | Muzzamil Ahmed | **Oct 21, 2026 15:29:17 UTC** | Delivered | HTTP 200 OK |
| **IN-YAHOO-03** | Yahoo Mail | `muzzamil.wpdev@yahoo.com` | Muzzamil Ahmed | **Oct 21, 2026 15:29:18 UTC** | Delivered | HTTP 200 OK |

Michelle and Christian can match these exact timestamps and subject lines in their Google Workspace inbox:
- Subject: `[SCALE Waitlist Verification] Live Form Endpoint Test` (15:21:38 UTC)
- Subject: `[SCALE Waitlist Verification] Inbound Test - Outlook` (15:29:17 UTC)
- Subject: `[SCALE Waitlist Verification] Inbound Test - Yahoo` (15:29:18 UTC)

---

## 3. Outbound Test Execution Plan (HTC Internal Team Scope)

### Objective
Ensure that emails sent *from* `hello@hometowntc.com` pass modern SPF, DKIM, and DMARC alignment checks, landing directly in the primary inbox of agent recipients on Google, Microsoft 365 / Outlook, and Yahoo without entering spam.

### Prerequisites (HTC Team / Domain Admin)
Confirm Google Workspace DNS TXT records are active:
* **SPF:** `v=spf1 include:_spf.google.com ~all`
* **DKIM:** Google Workspace DKIM 2048-bit key active in Google Admin Console and published to DNS TXT record `google._domainkey.hometowntc.com`.
* **DMARC:** `v=DMARC1; p=quarantine; ...` or `p=none; rua=mailto:...`

### Outbound Test Matrix & Step-by-Step Procedure

| Step | Action | Sender Account | Recipient Address | Pass Criteria |
| :--- | :--- | :--- | :--- | :--- |
| **OUT-01** | Send direct email | `hello@hometowntc.com` | External Gmail inbox (`muzzamil.wpdev@gmail.com`) | Inbox arrival; headers show `spf=pass`, `dkim=pass`, `dmarc=pass`. |
| **OUT-02** | Send direct email | `hello@hometowntc.com` | External Microsoft Outlook inbox (`muzzamil.wpdev@outlook.com`) | Inbox arrival (not Junk folder); TLS encryption verified. |
| **OUT-03** | Send direct email | `hello@hometowntc.com` | External Yahoo Mail inbox (`muzzamil.wpdev@yahoo.com`) | Inbox arrival; Yahoo postmaster compliance passed. |
| **OUT-04** | Deliverability Score Check | `hello@hometowntc.com` | Mail-Tester.com generated test address | Score >= 9.5/10 with zero blacklist hits. |
