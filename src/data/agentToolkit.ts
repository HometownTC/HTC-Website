// =============================================================================
// HOMETOWN TC — FREE AGENT TOOLKIT
// Single source of truth for the free tools and downloads at
// /resources/free-guides-downloads/. Only real, working resources go here.
// To add one: copy an item, fill in the fields, and set `gated`:
//   gated: false  -> anyone can open it (good for SEO pages and on-site tools)
//   gated: true   -> visitor unlocks it once with name, email and phone
// =============================================================================

export interface ToolkitLink {
  label: string;
  url: string;
  note?: string;
}

export interface ToolkitItem {
  id: string;
  title: string;
  description: string;
  format: string;
  gated: boolean;
  links: ToolkitLink[];
}

export interface ToolkitSection {
  id: string;
  title: string;
  intro: string;
  items: ToolkitItem[];
}

export const TOOLKIT_SECTIONS: ToolkitSection[] = [
  {
    id: 'free-tools',
    title: 'Free tools (no sign-up)',
    intro: 'Open these right away.',
    items: [
      {
        id: 'condo-coop-hoa-guide',
        title: 'Condo, Co-op & HOA Resource Guide',
        description:
          'Florida statutes, Miami-Dade and Broward association rules, DBPR forms, the Condominium Ombudsman and the scripts we use to request association documents, all on one page.',
        format: 'Web page + PDF',
        gated: false,
        links: [{ label: 'Open the guide', url: '/resources/free-guides-downloads/condo-coop-hoa-guide/' }],
      },
      {
        id: 'agent-business-calculator',
        title: 'Agent Business Calculator',
        description: 'See what your admin hours cost you and what more files would mean for your business.',
        format: 'Interactive tool',
        gated: false,
        links: [{ label: 'Run the numbers', url: '/agent-business-calculator/' }],
      },
    ],
  },
  {
    id: 'downloads',
    title: 'Free downloads',
    intro: 'Unlock once with your name, email and phone. Everything below opens right away.',
    items: [
      {
        id: 'farbar-timeline-calculator',
        title: 'FAR/BAR Timeline Calculator',
        description:
          'A Google Sheet that calculates every contract deadline from the Effective Date, accounts for federal holidays, builds a client-ready summary PDF and syncs deadlines to Google Calendar.',
        format: 'Google Sheet + guide + video',
        gated: true,
        links: [
          {
            label: 'Make your copy of the calculator',
            url: 'https://docs.google.com/spreadsheets/d/1Sx7jR2AsxT5YcC39wDtoROvVD_zgEoY4P0SBxotPgzM/copy',
            note: 'Requires a Google account',
          },
          { label: 'Read Me First (PDF)', url: 'https://drive.google.com/file/d/1M6JwbdjOjKVvXt2DpQexmFOMJVz5R6Ex/view' },
          { label: 'Getting started video', url: 'https://www.loom.com/share/037353f31546482c936b9733ebaecaa1' },
        ],
      },
      {
        id: 'client-email-templates',
        title: 'Client Email Templates',
        description:
          'Four milestone emails for each side of the deal: accepted offer, end of the inspection period, loan approval, and two weeks from closing. Edit the brackets and send.',
        format: 'Word documents (.docx)',
        gated: true,
        links: [
          { label: 'Buyer email templates', url: '/downloads/htc-buyer-email-templates.docx' },
          { label: 'Seller email templates', url: '/downloads/htc-seller-email-templates.docx' },
        ],
      },
      {
        id: 'agent-toolbox',
        title: 'Agent Toolbox: 9 Canva Templates',
        description:
          'Buyer and seller guides, a listing presentation, an offer presentation and more. Open a template, save a copy in your free Canva account, and add your branding.',
        format: 'Canva templates',
        gated: true,
        links: [
          { label: 'Buyer Guide', url: 'https://www.canva.com/design/DAFYrwzTxJs/UKfsCr_1NMFIsNv3GTShag/view?utm_content=DAFYrwzTxJs&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview' },
          { label: 'Seller Guide', url: 'https://www.canva.com/design/DAFYrzVlnFE/AZzbewddfhIgc7tYPS9ZuA/view?utm_content=DAFYrzVlnFE&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview' },
          { label: 'Listing Presentation', url: 'https://www.canva.com/design/DAFZVsHI07o/V_LmA8Y4YLHVTp2sCLNyKA/view?utm_content=DAFZVsHI07o&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview' },
          { label: 'Buyer Closing Checklist', url: 'https://www.canva.com/design/DAFZQCTIMzM/-FHqgPCSqp0M3u7KnDj2XA/view?utm_content=DAFZQCTIMzM&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview' },
          { label: 'Offer Presentation', url: 'https://www.canva.com/design/DAFYBwfJBtI/0dSJa5LMFrowp69kJyM8Aw/view?utm_content=DAFYBwfJBtI&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview' },
          { label: 'Home Buying Process', url: 'https://www.canva.com/design/DAFYr_R-leM/qRMzCzgw9Op8jSTIWcjfgQ/view?utm_content=DAFYr_R-leM&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview' },
          { label: 'New Home Binder', url: 'https://www.canva.com/design/DAFYr5A9CGE/uiLIvXkXbSeTVDKvHSLSwQ/view?utm_content=DAFYr5A9CGE&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview' },
          { label: 'Closing Costs', url: 'https://www.canva.com/design/DAFZQRQj_6Q/B1PaxUmUX9vqHK7hhrFEFA/view?utm_content=DAFZQRQj_6Q&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview' },
          { label: 'Benefits of Having a TC', url: 'https://www.canva.com/design/DAFYsrXAZs0/beRCu_1Plmd9MjrJy8dOaA/view?utm_content=DAFYsrXAZs0&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview' },
        ],
      },
      {
        id: 'condo-guide-pdf',
        title: 'Condo, Co-op & HOA Resource Guide (PDF)',
        description: 'The printable version of the guide, to keep in your files.',
        format: 'PDF',
        gated: true,
        links: [{ label: 'Download the PDF', url: '/downloads/htc-condo-coop-hoa-resource-guide.pdf' }],
      },
    ],
  },
];

// -----------------------------------------------------------------------------
// Unlock state: kept only in the visitor's own browser. Never store the
// visitor's name, email or phone here.
// -----------------------------------------------------------------------------
const UNLOCK_KEY = 'htc_toolkit_unlocked_v1';

export function readToolkitUnlocked(): boolean {
  try {
    return typeof window !== 'undefined' && window.localStorage.getItem(UNLOCK_KEY) === '1';
  } catch {
    return false;
  }
}

export function saveToolkitUnlocked(): void {
  try {
    window.localStorage.setItem(UNLOCK_KEY, '1');
  } catch {
    /* storage blocked: unlock lasts for this visit only */
  }
}
