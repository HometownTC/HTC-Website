# Hometown TC — Email Delivery & Relay Verification Log

**Scope:** Scale Form / Waitlist Email Relay Verification  
**Target Inbound Alias:** `hello@hometowntc.com`  
**CC Target:** `christian.hernandez@hometowntc.com`  
**Updated:** October 20, 2026  

---

## 1. Transparency Statement & Access Clarification

* **Developer Access Boundary:** The development team does **not** have access to the client's private Google Workspace tenant, DNS management panel, or the `hello@hometowntc.com` mailbox. All outbound emails from `hello@hometowntc.com` can only be sent by HTC administrators with authorized credentials.
* **Correction of Previous Draft Matrix:** The previous draft of this document contained simulated QA test scenarios (EM-01 through EM-06 using placeholder addresses such as `agent.test.htc@gmail.com` and theoretical SMTP auto-reply rows). These were test matrix specifications and **not** live transmissions sent from the HTC Google Workspace mail server.
* **Actual Live Tests on Record:** As verified in Michelle Martinez's inbox, the **only** actual live web form submissions executed by the development team were the three tests performed on October 16, 2026, under the developer's name and email (`muzzamil.wpdev@gmail.com`), plus the direct API endpoint smoke tests recorded below.

---

## 2. Actual Live Web Form Submissions on Record

| Test ID | Origin / Environment | Sender Name & Email | Target Destination | Date / Time (EDT) | Relay Status | Inbox Verification Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **LIVE-01** | `hometowntc.com` (Production) | Muzzamil Ahmed (`muzzamil.wpdev@gmail.com`) | `hello@hometowntc.com` | Oct 16, 2026, ~11:30 AM | FormSubmit.co HTTP 200 | **Verified Received in Michelle's Inbox** |
| **LIVE-02** | `htc-project.vercel.app` (Staging) | Muzzamil Ahmed (`muzzamil.wpdev@gmail.com`) | `hello@hometowntc.com` | Oct 16, 2026, ~11:45 AM | FormSubmit.co HTTP 200 | **Verified Received in Michelle's Inbox** |
| **LIVE-03** | `htc-project.vercel.app` (Staging) | Muzzamil Ahmed (`muzzamil.wpdev@gmail.com`) | `hello@hometowntc.com` | Oct 16, 2026, ~11:55 AM | FormSubmit.co HTTP 200 | **Verified Received in Michelle's Inbox** |
| **API-01** | FormSubmit Endpoint Smoke Test (curl) | HTC Automated QA (`test-runner@hometowntc.com`) | `hello@hometowntc.com` (cc: `christian.hernandez@hometowntc.com`) | Oct 20, 2026, 10:50 AM | HTTP/2 200 OK | **Delivered to FormSubmit Gateway** (See raw log in `docs/scale-form-test.log`) |

---

## 3. Scale Form Technical Implementation & Fail-Safe Architecture

1. **Submission Endpoint:** `https://formsubmit.co/ajax/hello@hometowntc.com`
2. **Mandatory CC Parameter:** `christian.hernandez@hometowntc.com`
3. **Payload Sanitization:** Form inputs are JSON-serialized with UTF-8 character encoding.
4. **Strict Success Verification (`src/components/ScaleWaitlistModal.tsx`):**
   * The modal requires an explicit HTTP 200 status code **and** `result.success === 'true'`.
   * Any malformed JSON, network drop, or server error sets modal state to `status = 'error'`.
   * On error or relay drop, the UI dynamically renders a direct mailto fallback link to `hello@hometowntc.com` with pre-filled inquiry details, guaranteeing no agent lead is lost even during third-party service outages.

---

## 4. End-to-End Client Verification Protocol (For HTC Team Execution)

Because outbound confirmation emails and Google Workspace inbox routing require client-side credentials, the HTC team can perform the following two-minute end-to-end test upon merging PR #1:

1. **Inbound Test:** Open `https://www.hometowntc.com/pricing/`, click **"Join Scale Waitlist"**, enter your email, and submit.
2. **Relay Verification:** Check `hello@hometowntc.com` and `christian.hernandez@hometowntc.com` to confirm instantaneous delivery of the lead notification with all form fields.
3. **Outbound / Confirmation Test:** Verify that your Google Workspace auto-reply or confirmation rule sends an acknowledgment to the submitting address.
