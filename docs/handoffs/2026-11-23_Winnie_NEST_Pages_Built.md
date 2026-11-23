# Winnie + N.E.S.T. checkout pages: built (Mon Nov 23, 2026)

**N.E.S.T. launch list item 4 built — waiting on Michelle's merge OK.**
Practice mode only. Nothing is merged or live, and no card has been charged.

## Links
- PR: https://github.com/HometownTC/HTC-Website/pull/64 (branch `winnie-nest-checkout-pages`)
- Preview, N.E.S.T.: https://winnie-nest-checkout-pages.htc-website-e1w.pages.dev/nest/ · ES: https://winnie-nest-checkout-pages.htc-website-e1w.pages.dev/es/nest/
- Preview, Winnie: https://winnie-nest-checkout-pages.htc-website-e1w.pages.dev/winnie/ · ES: https://winnie-nest-checkout-pages.htc-website-e1w.pages.dev/es/winnie/

## What was built
- `src/components/WinniePage.tsx`, `src/components/NestPage.tsx`, plus the shared `src/components/ExtrasCheckoutKit.tsx`
- Routes and the language switch are in `App.tsx`. Meta and hreflang tags are in `[...slug].astro`. Also updated: sitemap and `llms.txt` (the N.E.S.T. touch days are now 7/30/60/90/180/240/365).
- Price, terms version, closing-date limits and all four N.E.S.T. choice lists come from `op: config`.
- The form shows only after config loads, so nothing typed is lost while the page starts up.
- If config says `available = false`, the page shows "Not available right now…".
- One `checkout_id` per page load. A new one is made only after a 402 decline. A 409 or 429 shows its message with no retry, and a double tap is blocked.

## Tested
- Mock backend, phone-size screen (390 px), EN and ES on both pages:
  - The Grok box error shows.
  - Choosing the Seller side pre-selects the Seller customer type.
  - Answering No to Q2 shows the gray line and the notes box stays visible.
  - ZIP takes digits only, max 5.
  - Date limits come from config.
  - The success screen shows the order code.
  - A double tap makes only one purchase call.
- Production build passes. TypeScript shows only the existing `astro:content` errors, the same as on main.
- **Not done yet:** real practice purchases against `winnie-checkout` and `nest-checkout`. Claude's workspace can't reach Supabase, and Chrome wasn't connected.

## Next (in order)
1. Michelle, on her phone, runs the practice purchases on the preview links:
   - Winnie EN + ES
   - N.E.S.T. EN + ES
   - The same N.E.S.T. address + closing date a second time, which should say "already enrolled"
2. Send the `WIN-26-…` and `NST-26-…` codes to Business HQ. Business HQ checks the rows and emails, then cancels the practice enrollments.
3. Michelle says "merge PR 64" → merge, then read back the live pages.
4. Business HQ flips `winnie_checkout_mode` and `nest_checkout_mode` to live after the QR test.
