# Hometown TC — Email Delivery Test Plan & Verification Protocol
**Document ID:** HTC-QA-EMAIL-PLAN-01  
**Project Book Version:** v1.3 (Section 14 — Operational Quality & Email Handshake)  
**Author:** Engineering Team  
**Reviewer:** Michelle Martinez, Founder & CEO  
**Date:** October 21, 2026  

---

## 1. Executive Summary & Separation of Responsibilities

To satisfy **Book Section 14** delivery requirements without breaching security boundaries:
* **Developer Boundary:** Development engineers have zero access to HTC Google Workspace admin credentials, private DNS records, or internal mailbox accounts (`hello@hometowntc.com`, `christian.hernandez@hometowntc.com`). 
* **Inbound Tests:** Executed by developer using verified real personal/work accounts across the three major consumer/enterprise mail networks (Google/Gmail, Microsoft Outlook, Yahoo Mail).
* **Outbound Tests:** Executed directly by the HTC internal team from inside authorized Google Workspace mailboxes.

---

## 2. Inbound Test Execution Plan (Developer Scope)

### Objective
Verify that web form submissions originating from real sender addresses across Gmail, Outlook, and Yahoo reach FormSubmit.co and relay successfully into `hello@hometowntc.com` with mandatory CC to `christian.hernandez@hometowntc.com`.

### Test Matrix

| Test Case | Origin Mail Provider | Sender Email Identity | Form Tested | Target Endpoints | Expected Relay Code |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **IN-GMAIL-01** | Google (Gmail) | `muzzamil.wpdev@gmail.com` | Scale Waitlist Modal (`/pricing/`) | `hello@hometowntc.com`<br>cc: `christian.hernandez@hometowntc.com` | HTTP 200 OK |
| **IN-OUTLOOK-02**| Microsoft Outlook | Verified personal Outlook address | Scale Waitlist Modal (`/pricing/`) | `hello@hometowntc.com`<br>cc: `christian.hernandez@hometowntc.com` | HTTP 200 OK |
| **IN-YAHOO-03**  | Yahoo Mail | Verified personal Yahoo address | Scale Waitlist Modal (`/pricing/`) | `hello@hometowntc.com`<br>cc: `christian.hernandez@hometowntc.com` | HTTP 200 OK |

### Inbound Step-by-Step Procedure:
1. Navigate to `https://www.hometowntc.com/pricing/` (or staging preview).
2. Open the **"Join Scale Waitlist"** modal.
3. Fill all fields with the respective provider identity (e.g. Outlook/Yahoo account).
4. Verify instant UI feedback: Button enters `Submitting...`, checks response headers, and displays success state.
5. Capture raw timestamp and HTTP response headers in `docs/scale-form-test.log`.
6. Confirm delivery in Michelle's and Christian's Google Workspace inbox.

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
| **OUT-02** | Send direct email | `hello@hometowntc.com` | External Microsoft Outlook / Hotmail inbox | Inbox arrival (not Junk folder); TLS encryption verified. |
| **OUT-03** | Send direct email | `hello@hometowntc.com` | External Yahoo Mail inbox | Inbox arrival; Yahoo postmaster 2024 compliance passed. |
| **OUT-04** | Deliverability Score Check | `hello@hometowntc.com` | Mail-Tester.com generated disposable test address | Score >= 9.5/10 with zero blacklist hits. |

### Verification Instructions for HTC Team:
1. From `hello@hometowntc.com`, compose a new email with subject: `[Deliverability Verification] HTC Outbound Handshake Test`.
2. Body: "This is an authorized deliverability handshake test for Hometown TC domain records."
3. Send to the developer's address (`muzzamil.wpdev@gmail.com`) and your external personal Outlook and Yahoo accounts.
4. In the receiving mailbox:
   - Check raw message headers (in Gmail: *More -> Show Original*; in Outlook: *File -> Properties -> Internet Headers*).
   - Confirm:
     - `Authentication-Results: ... dkim=pass header.i=@hometowntc.com`
     - `spf=pass (google.com: domain of hello@hometowntc.com designates ...)`
     - `dmarc=pass`
5. Record confirmation in `docs/EMAIL_DELIVERY_TEST_LOG.md`.
