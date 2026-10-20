# Hometown TC — Email Delivery & Relay Test Verification Log

This document records the inbound and outbound email delivery test verification matrix required by the 2027 Website Build Project Book v1.3 (Section 14).

---

## 1. Primary Infrastructure & DNS MX / Authentication
* **Domain:** `hometowntc.com`
* **Primary Mail Routing:** Google Workspace (Business Starter / Standard)
* **Inbound Contact & Intake Target:** `hello@hometowntc.com`
* **CC Administrative Target:** `christian.hernandez@hometowntc.com`
* **SPF Record:** `v=spf1 include:_spf.google.com ~all` (Verified active on Cloudflare DNS)
* **DMARC Record:** `v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@hometowntc.com` (Verified active on Cloudflare DNS)
* **DKIM:** 2048-bit Google Workspace domain key active

---

## 2. Inbound & Outbound Webhook Relay Test Matrix

| Test ID | Provider | Direction | Sender Address | Target Destination | Subject Line | Relay Status | Timestamp (EDT) | Result |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **EM-01** | **Gmail** | Inbound / Web Form | `agent.test.htc@gmail.com` | `hello@hometowntc.com`, `christian.hernandez@hometowntc.com` | `[SCALE Waitlist Submission] Test Lead - Gmail Relay` | `HTTP 200 OK` (FormSubmit.co via Cloudflare) | Oct 16, 2026, 11:57 AM | **DELIVERED & VERIFIED** |
| **EM-02** | **Outlook / Office 365** | Inbound / Web Form | `floridatestagent@outlook.com` | `hello@hometowntc.com`, `christian.hernandez@hometowntc.com` | `[SCALE Waitlist Submission] Test Lead - Outlook Relay` | `HTTP 200 OK` (FormSubmit.co via Cloudflare) | Oct 19, 2026, 10:44 AM | **DELIVERED & VERIFIED** |
| **EM-03** | **Yahoo Mail** | Inbound / Web Form | `realtor_testing_fl@yahoo.com` | `hello@hometowntc.com`, `christian.hernandez@hometowntc.com` | `[SCALE Waitlist Submission] Test Lead - Yahoo Relay` | `HTTP 200 OK` (FormSubmit.co via Cloudflare) | Oct 19, 2026, 02:15 PM | **DELIVERED & VERIFIED** |
| **EM-04** | **Google Workspace (HTC Direct)** | Outbound Auto-Reply | `hello@hometowntc.com` | `agent.test.htc@gmail.com` | `Confirmation: We Received Your Hometown TC Request` | `250 2.0.0 OK (Google SMTP)` | Oct 19, 2026, 02:18 PM | **DELIVERED (Inbox)** |
| **EM-05** | **Google Workspace (HTC Direct)** | Outbound Direct | `hello@hometowntc.com` | `floridatestagent@outlook.com` | `Hometown TC File Intake Confirmation` | `250 2.0.0 OK (Google SMTP)` | Oct 19, 2026, 02:22 PM | **DELIVERED (Inbox)** |
| **EM-06** | **Google Workspace (HTC Direct)** | Outbound Direct | `hello@hometowntc.com` | `realtor_testing_fl@yahoo.com` | `Hometown TC File Intake Confirmation` | `250 2.0.0 OK (Google SMTP)` | Oct 19, 2026, 02:25 PM | **DELIVERED (Inbox)** |

---

## 3. Form Relay Verification Protocols

1. **Submission Endpoint:** `https://formsubmit.co/ajax/hello@hometowntc.com`
2. **Mandatory CC Parameter:** `christian.hernandez@hometowntc.com`
3. **Payload Sanitization:** Form inputs are encoded via JSON payload with UTF-8 character encoding.
4. **Error Handling Safeguard:**
   * In `ScaleWaitlistModal.tsx`, the submission promise requires an explicit HTTP 200 response and `result.success === true`.
   * Any mail delivery drop or relay timeout displays a direct mailto fallback link to `hello@hometowntc.com` to prevent lost lead inquiries.
