// Page titles and descriptions that are built into each page's HTML.
// Google, Facebook, LinkedIn and text-message link previews read these
// before any JavaScript runs, so every main page needs its own entry here.
// Keep descriptions under about 160 characters and use only claims the page itself makes.

export interface PageMeta {
  title: string;
  description: string;
}

export const PAGE_META: Record<string, PageMeta> = {
  'about': {
    title: 'About Michelle Martinez, Founder | Hometown TC',
    description: 'Meet Michelle Martinez, founder of Hometown Transaction Coordinators, and the standard she built HTC around for Florida Realtors.',
  },
  'team': {
    title: 'Meet the Team | Hometown Transaction Coordinators',
    description: 'Each agent works with an experienced Lead Transaction Coordinator, backed by a dedicated Hometown team. Meet the people handling your files.',
  },
  'meet-the-tribe': {
    title: 'Meet the Team | Hometown Transaction Coordinators',
    description: 'Each agent works with an experienced Lead Transaction Coordinator, backed by a dedicated Hometown team. Meet the people handling your files.',
  },
  'how-htc-works': {
    title: 'How HTC Works | Hometown Transaction Coordinators',
    description: 'Start with a Fit Call, set up your business once, then submit files whenever you need Listing Launch, Contract-to-Close or Broker Compliance support.',
  },
  'how-it-works': {
    title: 'How HTC Works | Hometown Transaction Coordinators',
    description: 'Start with a Fit Call, set up your business once, then submit files whenever you need Listing Launch, Contract-to-Close or Broker Compliance support.',
  },
  'why-htc': {
    title: 'Why Hometown TC | Boutique Florida Real Estate Support',
    description: 'A boutique Florida real estate support agency for Realtors who want experienced people, a dependable team and support that fits how they work.',
  },
  'who-we-support': {
    title: 'Who We Support | Hometown TC for Florida Realtors',
    description: 'See how Hometown TC fits your production model, with the same standard of compliance, responsiveness and calm execution on every file.',
  },
  'pricing': {
    title: 'Florida TC Services & Pricing Plans | Hometown TC',
    description: 'Boutique transaction coordination pricing for Florida agents. Contract-to-Close from $375, Listing Launch, and bilingual TC support.',
  },
  'listing-coordination': {
    title: 'Listing Coordination for Florida Realtors | Hometown TC',
    description: 'HTC moves your listing paperwork toward a clean, compliant, on-time launch. You keep control of pricing, photos and brokerage decisions.',
  },
  'contract-to-close': {
    title: 'Contract-to-Close Services in Florida | Hometown TC',
    description: 'From accepted offer to closing: deadline tracking, multi-party communication, title follow-up and broker-ready files for Florida Realtors.',
  },
  'contract-to-close-services': {
    title: 'Contract-to-Close Services in Florida | Hometown TC',
    description: 'From accepted offer to closing: deadline tracking, multi-party communication, title follow-up and broker-ready files for Florida Realtors.',
  },
  'transaction-coordination': {
    title: 'Transaction Coordination for Florida Realtors | Hometown TC',
    description: 'Boutique transaction coordination for Florida Realtors: Listing Launch, Contract-to-Close and Broker Compliance from an experienced team.',
  },
  'transaction-coordinator-for-realtors': {
    title: 'Transaction Coordinator for Florida Realtors | Hometown TC',
    description: 'Boutique transaction coordination for Florida Realtors: Listing Launch, Contract-to-Close and Broker Compliance from an experienced team.',
  },
  'miami-transaction-coordinator': {
    title: 'Miami Transaction Coordinator | Hometown TC',
    description: 'Contract-to-close coordination for Miami Realtors, built for condo approvals, association follow-up, bilingual buyers and tight escrow deadlines.',
  },
  'miami-dade-transaction-coordinator': {
    title: 'Miami-Dade County Transaction Coordinator | Hometown TC',
    description: 'Contract-to-close coordination for Miami-Dade Realtors, with regional expertise in municipalities, title customs and association workflows.',
  },
  'broward-transaction-coordinator': {
    title: 'Broward County Transaction Coordinator | Hometown TC',
    description: 'Structured contract-to-close coordination, association follow-up, milestone tracking and broker-ready compliance for Broward Realtors.',
  },
  'south-florida-transaction-coordinator': {
    title: 'South Florida Transaction Coordinator | Hometown TC',
    description: 'Founded in South Florida, HTC delivers structured contract-to-close support across the tri-county region and statewide.',
  },
  'agent-business-calculator': {
    title: 'Agent Business Calculator | Hometown TC',
    description: 'Three quick calculators for Florida agents: see what your time, support and growth could be worth.',
  },
  'faq': {
    title: 'Frequently Asked Questions | Hometown TC',
    description: 'Answers to common questions about working with Hometown Transaction Coordinators: services, pricing, onboarding, and how files are handled.',
  },
  'book': {
    title: 'Book a Fit Call | Hometown Transaction Coordinators',
    description: 'Book a 15-minute Fit Call with Hometown Transaction Coordinators to see whether HTC is the right support for your Florida real estate business.',
  },
  'submit-deal': {
    title: 'Submit a New Deal | Hometown Transaction Coordinators',
    description: 'Submit your file details for Listing Launch, Contract-to-Close, or Broker Compliance.',
  },
  'reviews': {
    title: 'Agent Reviews | Hometown Transaction Coordinators',
    description: 'Real stories from Florida agents about working with Hometown Transaction Coordinators on their listings, contracts and closings.',
  },
  'resources': {
    title: 'The Hometown Brief | Florida Real Estate Operations from HTC',
    description: 'Quick, practical answers on Florida contracts, transaction operations, compliance, growth and the work behind the closing.',
  },
};
