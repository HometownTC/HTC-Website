# Hometown TC — Website Owner Guide (Plain-English Step-by-Step Manual)

**Prepared for:** Michelle Martinez & Christian Hernandez (Hometown Transaction Coordinators)  
**Website:** `https://www.hometowntc.com`  
**No Coding Required:** Every task in this guide is done in your regular web browser (Chrome, Safari, or Edge) using clickable buttons on **GitHub.com** and **Cloudflare.com**. You never need to install developer software or type terminal commands.

---

## Quick Reference: Your 5 Key Dashboards

| What It Does | Where to Sign In |
|---|---|
| **1. Website Files & Blog Posts** (text, photos, articles) | [github.com/HometownTC/HTC-Website](https://github.com/HometownTC/HTC-Website) |
| **2. Live Website Hosting, Domain & 10-Second Rollback** | [dash.cloudflare.com](https://dash.cloudflare.com) *(Workers & Pages → `htc-website`)* |
| **3. Submit a Deal Intake Form** (`/submit-deal/`) | [build.fillout.com](https://build.fillout.com) *(Form ID: `m2YU3nCffEus`)* |
| **4. 15-Minute Fit Call Calendar** (`/book/`) | [calendar.google.com](https://calendar.google.com) *(Appointment Schedules)* |
| **5. Website Visitor & Click Reports** (GA4) | [analytics.google.com](https://analytics.google.com) *(Property: `G-H2MZLXMY6G`)* |

> **Built-In Safety Net:** Whenever you save a change on GitHub, Cloudflare automatically tests and builds the website in the background (~60 seconds). **If you accidentally make a typo that breaks a required blog field or page file, Cloudflare stops the build and keeps your current working website live.** Nothing breaks for visitors—and if a visual mistake ever goes live, you can undo it in 10 seconds (Section 4).

---

## 1. How to Publish a Blog Post, Unpublish One, or Add a New One

All blog posts for **The Hometown Brief** (`/resources/`) live in one folder on GitHub:  
**`src` → `content` → `blog`**

### A. How to Publish a Draft Blog Post (e.g., *"What Makes a Real Estate File Defensible?"*)
1. Go to [github.com/HometownTC/HTC-Website](https://github.com/HometownTC/HTC-Website) and sign in.
2. Click **`src`** → click **`content`** → click **`blog`**.
3. Click the post file you want to publish (for example, **`what-makes-a-real-estate-file-defensible.md`**).
4. Click the **Pencil icon (✏️ "Edit this file")** in the top-right corner of the file box.
5. At the top of the file (inside the `---` lines), update these lines:
   * Add your reviewer name inside the quotes:  
     `reviewer: "Michelle Martinez"`
   * Update the date if needed (`YYYY-MM-DD`):  
     `publishDate: "2026-11-01"`  
     `modifiedDate: "2026-11-01"`
   * *(Optional)* If you have citation links to show at the bottom of the article, replace `sources: []` with:
     ```yaml
     sources:
       - title: "Florida Realtors Contract Guide"
         link: "https://www.floridarealtors.org/"
     ```
     *(If the post has no external sources, leave `sources: []` exactly as it is.)*
   * Change **`draft: true`** to **`draft: false`**.
6. Click the green **"Commit changes..."** button in the top-right corner.
7. In the pop-up window, leave **"Commit directly to the `main` branch"** selected and click **"Commit changes"**.
8. Wait **1 to 2 minutes**. Your article is now live at `https://www.hometowntc.com/resources/<slug>/`, listed on `/resources/`, listed in its category page, and added to Google's sitemap!

### B. How to Unpublish (Hide) a Live Blog Post
1. Go to [github.com/HometownTC/HTC-Website](https://github.com/HometownTC/HTC-Website) → click **`src`** → **`content`** → **`blog`**.
2. Click the post file you want to hide, then click the **Pencil icon (✏️)** in the top-right corner.
3. Change **`draft: false`** back to **`draft: true`**.
4. Click the green **"Commit changes..."** button → click **"Commit changes"**.
5. Wait **1 to 2 minutes**. The post is completely removed from the live website, `/resources/`, category pages, RSS feed, and sitemap, while staying safely saved as a draft in GitHub.

### C. How to Create a Brand-New Blog Post
The easiest way so you never forget a required field is to **copy the top block from an existing post**:
1. Open `src` → `content` → `blog` → click any existing `.md` file and copy lines 1–22 (everything from the top `---` through the closing `---`).
2. Go back to the `blog` folder, click **"Add file"** (top right) → **"Create new file"**.
3. In the **"Name your file..."** box at the top, type your URL slug in lowercase with hyphens, ending in **`.md`** — for example:  
   `florida-hoa-estoppel-deadlines.md`
4. Paste the `---` block at the top and fill in your new `title`, `slug` (must match the filename without `.md`), `description`, `publishDate`, `modifiedDate`, and `canonical` (`"https://hometowntc.com/resources/florida-hoa-estoppel-deadlines/"`).
5. Make sure `category:` matches **one of your 6 exact category names** (spelling and `&` must match):
   * `"Transaction Coordination"`
   * `"Florida Contracts & Defensible Files"`
   * `"Miami-Dade & Broward Closings"`
   * `"Agent Growth & Operations"`
   * `"Checklists & Guides"`
   * `"HTC Updates & Community"`
6. Keep **`draft: true`** if you want to save it for review first, or set **`draft: false`** to publish right away.
7. Below the second `---` line, write your article:
   * Use `## Section Heading` for main headings and `### Subheading` for smaller headings.
   * Use `**bold words**` for bold, `*italic words*` for italics, and `* Bullet item` for bullet lists.
   * Use `[Clickable Text](https://example.com)` to add a link.
8. Click **"Commit changes..."** → **"Commit changes"**.

---

## 2. How to Change Text or an Image on a Page

### Where Website Content Lives (Quick Finder Map)

| What You Want to Change | Exact File to Open on GitHub |
|---|---|
| **Phone number, email address, office hours, or main photo links** | `src/data/content.ts` *(right at the top, lines 3–23)* |
| **Pricing numbers, plans, add-ons & terms (`/pricing/`)** | `src/data/pricingData.ts` *(and summary cards in `src/data/content.ts`)* |
| **Spanish pages text (`/es/`, `/es/precios/`, `/es/enviar-transaccion/`)** | `src/data/spanishContent.ts` |
| **Client reviews & testimonials (`/reviews/`)** | `src/data/reviews.ts` *(and homepage quotes in `src/data/content.ts`)* |
| **Free Guides & Downloads items (`/resources/free-guides-downloads/`)** | `src/data/resourceLibraryData.ts` |
| **County / City location pages** | `src/data/locationData.ts` |
| **Homepage headline & intro text (`/`)** | `src/components/Hero.tsx` |
| **Meet the Tribe team bios (`/team/`)** | `src/components/MeetTheTribePage.tsx` |
| **About Michelle story (`/about/`)** | `src/components/AboutMichellePage.tsx` |
| **How HTC Works (`/how-htc-works/`)** | `src/components/HowHtcWorksPage.tsx` |
| **Why HTC (`/why-htc/`)** | `src/components/WhyHtcPage.tsx` |
| **Frequently Asked Questions (`/faq/`)** | `src/components/FaqPage.tsx` |
| **Book a Fit Call text (`/book/`)** | `src/components/BookDiscoveryCallPage.tsx` |
| **Submit a Deal checklist & help text (`/submit-deal/`)** | `src/components/SubmitDealPage.tsx` |
| **TC Workshop course page (`/tcworkshop/`)** | `src/components/TcWorkshopPage.tsx` |

> **Shortcut if you aren't sure which file holds a sentence:** On [github.com/HometownTC/HTC-Website](https://github.com/HometownTC/HTC-Website), click the **Search bar** at the very top of GitHub (or press `/` on your keyboard), type 3–4 words from the sentence you see on the website, and press **Enter**. GitHub will show you the exact file and line!

### A. Step-by-Step: How to Change Text on a Page
1. Open [github.com/HometownTC/HTC-Website](https://github.com/HometownTC/HTC-Website) and click into the file from the table above (for example, `src` → `data` → `content.ts`, or `src` → `components` → `MeetTheTribePage.tsx`).
2. Click the **Pencil icon (✏️ "Edit this file")** in the top-right corner.
3. Press **`Ctrl + F`** (Windows) or **`Cmd + F`** (Mac) to jump straight to the words you want to change.
4. **Golden Rule When Editing Text:**  
   Only change the English/Spanish words **between quotation marks** (`"..."` or `'...'`) or **between `>` and `<`**.  
   * **Good:** Change `export const PHONE_NUMBER = '(954) 377-8330';` to `export const PHONE_NUMBER = '(954) 282-9029';`  
   * **Avoid:** Deleting the `'`, `"`, `,`, `{`, `}`, `<`, or `>` symbols around the text. *(Tip: If your new sentence contains an apostrophe like `We're` inside single quotes `'...'`, use a curly apostrophe `We’re` so the quote doesn't close early.)*
5. Click the green **"Commit changes..."** button (top right) → click **"Commit changes"**.
6. Wait **1 to 2 minutes**, then check your live page!

### B. Step-by-Step: How to Replace or Add an Image on a Page

**Before uploading — 3 Quick Photo Rules:**
1. **Format & Size:** Save photos as **`.webp`** (fastest) or `.jpg` (use `.png` for transparent logos). Keep the file size **under 250 KB** so pages load fast on phones. *(Free drag-and-drop converter: [squoosh.app](https://squoosh.app) — drop any photo in, choose **WebP** on the right, and click Download.)*
   * **Team / Banner photos:** around `1200 × 800 px` (landscape)
   * **Founder / Team headshots:** around `600 × 750 px` or `800 × 1000 px` (4:5 portrait)
2. **File Name:** Use **lowercase letters, numbers, and underscores or hyphens only — NO spaces** (for example: `michelle_founder_2027.webp`, not `Michelle New Photo (1).JPG`).
3. **Where Images Live:** Every website image goes inside **`public` → `images`** on GitHub.

#### Option 1 — Easiest Way to Swap an Existing Photo (Zero Page Edits!)
If you are updating an existing photo (like the team banner, office photo, or a headshot):
1. Check the current photo's exact filename in `src/data/content.ts` (for example:
   * Founder photo: `michelle_martinez_founder.webp`
   * Michelle team card: `michelle_team_profile.webp`
   * Full team banner: `team_photo.webp`
   * Christian headshot: `christian_hernandez.webp`
   * Angela headshot: `angela_paniagua.webp`
   * Mary headshot: `mary_martinez.webp`
   * Office photo: `office.webp`
   * Speaking photo: `speaking.webp`)
2. Rename your new photo on your computer to that **exact same filename** (e.g., `team_photo.webp`).
3. On GitHub, click **`public`** → click **`images`**.
4. Click **"Add file"** (top right) → **"Upload files"**.
5. Drag your `team_photo.webp` file into the box and click the green **"Commit changes"** button.
6. Done! GitHub replaces the old image automatically across every page that uses it.

#### Option 2 — Uploading an Image With a Brand-New Filename
1. Upload your new image (e.g., `new_office_photo.webp`) to **`public` → `images`** (**Add file → Upload files → Commit changes**).
2. To connect it to a shared photo slot: open **`src` → `data` → `content.ts`**, click the **Pencil icon (✏️)**, change `'/images/office.webp'` to `'/images/new_office_photo.webp'`, and click **Commit changes**.
3. To change an image or its **alt text** (the short description read aloud to visually impaired visitors and Google) on a specific page:
   * Open that page file in `src/components/` (e.g., `MeetTheTribePage.tsx`), click the **Pencil icon (✏️)**, find `<img`, and update `src="/images/your_new_photo.webp"` and `alt="Short plain-English description of who or what is in the photo"`.
   * Click **Commit changes**.

---

## 3. How to Check That an Update Went Live in Cloudflare

Every time you click **"Commit changes"** on GitHub, Cloudflare starts publishing your update automatically. Here is how to watch it finish:

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and sign in to the Hometown TC Cloudflare account.
2. In the left sidebar, click **"Workers & Pages"**.
3. Click your project: **`htc-website`**.
4. Look at the **"Deployments"** list right at the top:
   * 🟡 **Building / Initializing:** Cloudflare is putting your update together (usually takes **45 to 75 seconds**).
   * 🟢 **Active / Success:** Your update is **live on `hometowntc.com`!**
   * 🔴 **Failed:** Something in your last edit had a formatting mistake (for example, a missing quote or an unapproved blog category name). **Do not panic—your live website is still 100% up and showing the previous working version.** Click **"View build"**, scroll to the bottom of the log to read which file/line had the typo, fix that line on GitHub, and commit again.
5. **Tip if you still see old text/photos in your browser:** Your browser sometimes remembers old photos for a few minutes. Open a **Private / Incognito window** (`Ctrl + Shift + N` on Windows, `Cmd + Shift + N` on Mac) and visit `https://www.hometowntc.com` to see the fresh version immediately.

---

## 4. How to Roll Back in 10 Seconds If Something Breaks

If an update goes live and you ever think *"Wait—that doesn't look right, put the website back the way it was 5 minutes ago!"*, you do **not** need to touch GitHub or find what went wrong first. Cloudflare keeps a snapshot of every past version:

1. Log in to [dash.cloudflare.com](https://dash.cloudflare.com).
2. Click **"Workers & Pages"** in the left menu → click **`htc-website`**.
3. Stay on the **"Deployments"** tab.
4. Look just below the top row to find the **previous working deployment** (from before your change).
5. Click the **three dots (`⋯`)** on the far right side of that row.
6. Click **"Rollback to this deployment"** and click **Confirm**.
7. **Within 10 seconds**, `hometowntc.com` switches back to that clean working version worldwide!
8. *(Afterward, whenever you're ready, go back to GitHub and fix or undo the text edit you made before publishing your next update.)*

---

## 5. Where Each Form and Tool Sends Its Data

Here is the complete map of every interactive form, booking calendar, and tracking tool on the website so you always know where submissions go and where to manage them:

| Tool / Form on Website | Which Pages Use It | Exact Destination (Where Data Goes) | Where You Manage It |
|---|---|---|---|
| **1. Fillout** *(Submit a New Deal intake form)* | `/submit-deal/` and `/es/enviar-transaccion/` | Sends deal files, contact info, and contract notes directly into **HTC's Fillout account** (`Form ID: m2YU3nCffEus`), triggering your Fillout confirmation email & internal workflow. *(Fallback contact box on page shows `(954) 377-8330` and `support@hometowntc.com`.)* | Log in at **[build.fillout.com](https://build.fillout.com)**. Any question or email changes you save inside Fillout appear on the website automatically. |
| **2. FormSubmit** *(Join the SCALE Priority Waitlist pop-up)* | `/pricing/` *(when clicking the SCALE waitlist button)* | Emails the lead's Name, Email, Phone, Brokerage, Monthly Volume, and After-Hours Need directly to **`hello@hometowntc.com`** with an automatic CC to **`christian.hernandez@hometowntc.com`**. *(Note: On preview links, it safely blocks sending and displays "Preview Mode — Nothing Was Sent". If email relay ever fails, it shows a direct one-click email button.)* | Delivered straight to your **Google Workspace Gmail inboxes** (`hello@` and `christian.hernandez@`). |
| **3. Google Appointments** *(15-Minute Fit Call scheduler)* | `/book/` and the **"Book a Fit Call"** pop-up across all pages | Books the 15-minute meeting directly onto **Michelle Martinez's Google Calendar**, generates a Google Meet link, and emails calendar invites to both Michelle and the Realtor (`calendar.app.google/BZAmWb4fz4UhKcJ88`). | Open **[calendar.google.com](https://calendar.google.com)** under Michelle's HTC account to adjust available days, hours, or buffer times—the website updates instantly. |
| **4. Google Analytics 4 (GA4)** *(Visitor & button tracking)* | Every page on `hometowntc.com` | Sends anonymous page-view and conversion counts to **HTC's GA4 Property (`G-H2MZLXMY6G`)**. Tracks the 7 Book events: `book_call_click`, `booking_complete`, `pricing_plan_click`, `submit_deal_start`, `submit_deal_complete`, `calculator_complete`, and `language_switch` (plus guide downloads & newsletter clicks). *Stores zero personal names or contract data.* | Log in at **[analytics.google.com](https://analytics.google.com)** → select HTC Website (`G-H2MZLXMY6G`) → click **Reports** or **Realtime**. |

*Note on Other Tools:*
* **Agent Business Calculator (`/agent-business-calculator/`):** Calculates numbers privately inside the visitor's own web browser (nothing is stored or emailed; only an anonymous `calculator_complete` count is sent to GA4).
* **TC Workshop Enrollment (`/tcworkshop/`):** Clicking *"Get Instant Access"* opens HTC's payment checkout page at `secure.usaepay.com`.

---

## 6. What to Do, and Who to Contact, When Something Goes Wrong

### Step-by-Step Troubleshooting Checklist

| What Happened | What to Do Right Away |
|---|---|
| **1. "I edited a page on GitHub and now something looks broken on the live site."** | Follow **Section 4** (Cloudflare → `htc-website` → Deployments → `⋯` → **Rollback to this deployment**). The live site is restored in 10 seconds. Then review your last edit on GitHub for a missing quote or bracket. |
| **2. "I saved a new blog post or edit on GitHub, waited 3 minutes, and nothing changed on `hometowntc.com`."** | Open **Cloudflare → Workers & Pages → `htc-website` → Deployments**:<br>• If the top row says **Failed (Red)**: click **"View build"**—most often a blog post is missing a quote, has an invalid URL in `canonical`, or has a typo in `category`. Fix it on GitHub and commit again.<br>• If the top row says **Active (Green)**: open `https://www.hometowntc.com` in an **Incognito/Private window** to bypass your browser's saved cache. |
| **3. "The Submit a Deal form (`/submit-deal/`) is blank or won't load."** | Log in to [build.fillout.com](https://build.fillout.com) to confirm form `m2YU3nCffEus` is active and published (or check [status.fillout.com](https://status.fillout.com)). Visitors automatically see your direct phone `(954) 377-8330` and `support@hometowntc.com` right below the form so no deal is lost. |
| **4. "The Fit Call calendar (`/book/`) says no times are available or won't load."** | Open Michelle's **Google Calendar** ([calendar.google.com](https://calendar.google.com)) and check the **15-Minute Fit Call Appointment Schedule** settings (date range, working hours, or busy blocks). Visitors also have a direct *"Open in Google Calendar ↗"* link below the calendar. |
| **5. "Someone tested the SCALE Waitlist form and saw an 'Activation' or delivery message."** | Check the **`hello@hometowntc.com`** inbox (and Spam folder) for an email from **`FormSubmit` (`noreply@formsubmit.co`)** and click **"Activate Form"** if FormSubmit ever asks to re-confirm the email address. Meanwhile, the form automatically gives the visitor a **"Send via Direct Email Instead"** button addressed to `hello@hometowntc.com` and `christian.hernandez@hometowntc.com`. |
| **6. "The whole website (`hometowntc.com`) is unreachable."** | 1. Check [cloudflarestatus.com](https://www.cloudflarestatus.com) to see if Cloudflare has a temporary outage.<br>2. Log in to [dash.cloudflare.com](https://dash.cloudflare.com) and check **Domain Registration / Billing** to make sure `hometowntc.com` domain renewal is active and **DNS** records were not deleted. |

### Who to Contact Directory

1. **Website Defects & Warranty Support (Trial Period + 30-Day Post-Acceptance Warranty):**
   * **Contact:** **Muzzamil Ahmed Khan** (Website Build Developer)
   * **Email:** `muzzamil.wpdev@gmail.com`
   * **When to contact:** During the 7-day acceptance review and the 30-day warranty period under SOW Amendment No. 1 if any existing page, layout, redirect, heat map, form integration, or blog build feature is not working as delivered. *(Include the page link and a quick screenshot of what you see so it can be fixed fast.)*

2. **Hosting, Domain (`hometowntc.com`), SSL & DNS:**
   * **Provider:** **Cloudflare**
   * **Dashboard & Support:** [dash.cloudflare.com](https://dash.cloudflare.com) (click the **`?` Support** icon in the top-right corner) · Status: [cloudflarestatus.com](https://www.cloudflarestatus.com)

3. **Submit a Deal Form (`m2YU3nCffEus`):**
   * **Provider:** **Fillout**
   * **Dashboard & Support:** [build.fillout.com](https://build.fillout.com) · Email: `support@fillout.com` · Status: [status.fillout.com](https://status.fillout.com)

4. **Fit Call Booking Calendar & `@hometowntc.com` Email:**
   * **Provider:** **Google Workspace**
   * **Admin & Support:** [admin.google.com](https://admin.google.com) *(24/7 Google Workspace Admin chat/phone support included with your Google Workspace subscription)* · Status: [google.com/appsstatus](https://www.google.com/appsstatus/dashboard/)

5. **SCALE Waitlist Email Relay:**
   * **Provider:** **FormSubmit**
   * **Support:** [formsubmit.co/support](https://formsubmit.co/support)

6. **Website Files & Version History:**
   * **Provider:** **GitHub** (`HometownTC/HTC-Website`)
   * **Support:** [support.github.com](https://support.github.com) · Status: [githubstatus.com](https://www.githubstatus.com)
