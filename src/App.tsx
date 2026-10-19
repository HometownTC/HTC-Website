import React, { useState, useEffect, lazy, Suspense } from 'react';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EnglishHomeView } from './components/EnglishHomeView';

// Modals (Code-Split / Lazy)
const SubmitDealModal = lazy(() => import('./components/SubmitDealModal').then(m => ({ default: m.SubmitDealModal })));
const BookCallModal = lazy(() => import('./components/BookCallModal').then(m => ({ default: m.BookCallModal })));
const AboutHtcModal = lazy(() => import('./components/AboutHtcModal').then(m => ({ default: m.AboutHtcModal })));
const ServicesAndPricingModal = lazy(() => import('./components/ServicesAndPricingModal').then(m => ({ default: m.ServicesAndPricingModal })));

// Sub-pages (Code-Split / Lazy)
const AgentCalculatorPage = lazy(() => import('./components/AgentCalculatorPage').then(m => ({ default: m.AgentCalculatorPage })));
const HowHtcWorksPage = lazy(() => import('./components/HowHtcWorksPage').then(m => ({ default: m.HowHtcWorksPage })));
const WhyHtcPage = lazy(() => import('./components/WhyHtcPage').then(m => ({ default: m.WhyHtcPage })));
const TransactionCoordinationPage = lazy(() => import('./components/TransactionCoordinationPage').then(m => ({ default: m.TransactionCoordinationPage })));
const ListingCoordinationPage = lazy(() => import('./components/ListingCoordinationPage').then(m => ({ default: m.ListingCoordinationPage })));
const PricingPlansPage = lazy(() => import('./components/PricingPlansPage').then(m => ({ default: m.PricingPlansPage })));
const AboutMichellePage = lazy(() => import('./components/AboutMichellePage').then(m => ({ default: m.AboutMichellePage })));
const MeetTheTribePage = lazy(() => import('./components/MeetTheTribePage').then(m => ({ default: m.MeetTheTribePage })));
const WhoWeSupportPage = lazy(() => import('./components/WhoWeSupportPage').then(m => ({ default: m.WhoWeSupportPage })));
const MiamiTransactionCoordinatorPage = lazy(() => import('./components/MiamiTransactionCoordinatorPage').then(m => ({ default: m.MiamiTransactionCoordinatorPage })));
const MiamiDadeTransactionCoordinatorPage = lazy(() => import('./components/MiamiDadeTransactionCoordinatorPage').then(m => ({ default: m.MiamiDadeTransactionCoordinatorPage })));
const BrowardTransactionCoordinatorPage = lazy(() => import('./components/BrowardTransactionCoordinatorPage').then(m => ({ default: m.BrowardTransactionCoordinatorPage })));
const SouthFloridaTransactionCoordinatorPage = lazy(() => import('./components/SouthFloridaTransactionCoordinatorPage').then(m => ({ default: m.SouthFloridaTransactionCoordinatorPage })));
const ContractToCloseServicesPage = lazy(() => import('./components/ContractToCloseServicesPage').then(m => ({ default: m.ContractToCloseServicesPage })));
const RealtorTransactionCoordinatorPage = lazy(() => import('./components/RealtorTransactionCoordinatorPage').then(m => ({ default: m.RealtorTransactionCoordinatorPage })));
const FaqPage = lazy(() => import('./components/FaqPage').then(m => ({ default: m.FaqPage })));
const BookDiscoveryCallPage = lazy(() => import('./components/BookDiscoveryCallPage').then(m => ({ default: m.BookDiscoveryCallPage })));
const SubmitDealPage = lazy(() => import('./components/SubmitDealPage').then(m => ({ default: m.SubmitDealPage })));
const ReviewsPage = lazy(() => import('./components/ReviewsPage').then(m => ({ default: m.ReviewsPage })));
const BlogResourcesPage = lazy(() => import('./components/BlogResourcesPage').then(m => ({ default: m.BlogResourcesPage })));
const CategoryArchivePage = lazy(() => import('./components/CategoryArchivePage').then(m => ({ default: m.CategoryArchivePage })));
const BlogPostPage = lazy(() => import('./components/BlogPostPage').then(m => ({ default: m.BlogPostPage })));
const TcWorkshopPage = lazy(() => import('./components/TcWorkshopPage').then(m => ({ default: m.TcWorkshopPage })));
const FreeGuidesPage = lazy(() => import('./components/FreeGuidesPage').then(m => ({ default: m.FreeGuidesPage })));
const ResourceLandingPage = lazy(() => import('./components/ResourceLandingPage').then(m => ({ default: m.ResourceLandingPage })));
const NotFoundPage = lazy(() => import('./components/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const SpanishHomePage = lazy(() => import('./components/SpanishHomePage').then(m => ({ default: m.SpanishHomePage })));
const SpanishPricingPage = lazy(() => import('./components/SpanishPricingPage').then(m => ({ default: m.SpanishPricingPage })));
const SpanishSubmitDealPage = lazy(() => import('./components/SpanishSubmitDealPage').then(m => ({ default: m.SpanishSubmitDealPage })));
const DynamicLocationPage = lazy(() => import('./components/DynamicLocationPage').then(m => ({ default: m.DynamicLocationPage })));
import { getResourceBySlug } from './data/resourceLibraryData';
import { DEMO_BLOG_POSTS } from './data/blog';
import { LOCATION_PAGES } from './data/locationData';
import { Language } from './types';
import { 
  trackBookDiscoveryCall, 
  trackDealIntakeStart, 
  trackPricingModalView, 
  trackLanguageSwitch 
} from './utils/analytics';

interface AppProps {
  initialPath?: string;
  initialLanguage?: Language;
}

export default function App({ initialPath, initialLanguage }: AppProps = {}) {
  const [submitDealOpen, setSubmitDealOpen] = useState(false);
  const [bookCallOpen, setBookCallOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [servicesPricingOpen, setServicesPricingOpen] = useState(false);

  // Client-side router path state with SSR and instant hydration support
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return initialPath || '/';
  });

  const rawPath = currentPath.split('?')[0].split('#')[0];
  const normalizedPath = rawPath.replace(/\/+$/, '') || '/';
  const pathParts = normalizedPath.split('/').filter(Boolean);

  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      return (p === '/es' || p.startsWith('/es/')) ? 'es' : 'en';
    }
    if (initialLanguage) return initialLanguage;
    const p = initialPath || '/';
    return (p === '/es' || p.startsWith('/es/')) ? 'es' : 'en';
  });

  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      setCurrentPath(p);
      setLanguage((p === '/es' || p.startsWith('/es/')) ? 'es' : 'en');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      const isEs = path === '/es' || path.startsWith('/es/');
      setLanguage(isEs ? 'es' : 'en');
      const hashIndex = path.indexOf('#');
      if (hashIndex !== -1) {
        const hash = path.substring(hashIndex + 1);
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleLanguageToggle = (targetLang: Language) => {
    trackLanguageSwitch(targetLang);
    setLanguage(targetLang);
    if (targetLang === 'es') {
      if (normalizedPath === '/pricing' || normalizedPath === '/services-and-pricing' || normalizedPath === '/services') {
        navigateTo('/es/precios/');
      } else if (normalizedPath === '/submit-deal') {
        navigateTo('/es/enviar-transaccion/');
      } else if (normalizedPath === '/') {
        navigateTo('/es/');
      }
    } else {
      if (normalizedPath === '/es/precios') {
        navigateTo('/pricing/');
      } else if (normalizedPath === '/es/enviar-transaccion') {
        navigateTo('/submit-deal/');
      } else if (normalizedPath === '/es') {
        navigateTo('/');
      }
    }
  };

  // Exact / normalized route matchers
  const isHomePage = normalizedPath === '/';
  const isSpanishHomePage = normalizedPath === '/es';
  const isSpanishPricingPage = normalizedPath === '/es/precios';
  const isSpanishSubmitDealPage = normalizedPath === '/es/enviar-transaccion';

  const isCalculatorPage = normalizedPath === '/agent-business-calculator';
  const isHowItWorksPage = normalizedPath === '/how-htc-works' || normalizedPath === '/how-it-works';
  const isWhyHtcPage = normalizedPath === '/why-htc';
  const isTransactionCoordinationPage = normalizedPath === '/transaction-coordination';
  const isContractToClosePage = normalizedPath === '/contract-to-close' || normalizedPath === '/contract-to-close-services';
  const isRealtorTcPage = normalizedPath === '/transaction-coordinator-for-realtors' || normalizedPath === '/realtor-transaction-coordinator';
  const isListingCoordinationPage = normalizedPath === '/listing-coordination';
  const isPricingPage = normalizedPath === '/pricing' || normalizedPath === '/services-and-pricing' || normalizedPath === '/services';
  const isMeetTheTribePage = normalizedPath === '/team' || normalizedPath === '/meet-the-tribe';
  const isAboutPage = normalizedPath === '/about' || normalizedPath === '/michelle';
  const isWhoWeSupportPage = normalizedPath === '/who-we-support';
  const isMiamiDadeTcPage = normalizedPath === '/miami-dade-transaction-coordinator';
  const isMiamiTcPage = normalizedPath === '/miami-transaction-coordinator';
  const isBrowardTcPage = normalizedPath === '/broward-transaction-coordinator';
  const isSouthFloridaTcPage = normalizedPath === '/south-florida-transaction-coordinator';
  const isFaqPage = normalizedPath === '/faq';
  const isBookCallPage = normalizedPath === '/book' || normalizedPath === '/book-call' || normalizedPath === '/book-discovery-call';
  const isSubmitDealPage = 
    normalizedPath === '/submit-deal' || 
    normalizedPath === '/deal-intake' || 
    normalizedPath === '/submit' || 
    normalizedPath === '/register';
  const isReviewsPage = normalizedPath === '/reviews';
  const isTcWorkshopPage = normalizedPath === '/tcworkshop';

  // Guides & Resource Library
  const isGuidesHubPage = 
    normalizedPath === '/free-guides-downloads' || 
    normalizedPath === '/resources/free-guides-downloads' ||
    normalizedPath === '/guides' ||
    normalizedPath === '/resources/guides';

  // Dedicated Resource Landing Page:
  // /resources/free-guides-downloads/[resource-slug]
  // /free-guides-downloads/[resource-slug]
  // /resources/guides/[resource-slug]
  const isResourceDetailPage = (() => {
    if (pathParts[0] === 'resources' && (pathParts[1] === 'free-guides-downloads' || pathParts[1] === 'guides' || pathParts[1] === 'downloads') && pathParts.length === 3) {
      return Boolean(getResourceBySlug(pathParts[2]));
    }
    if ((pathParts[0] === 'free-guides-downloads' || pathParts[0] === 'guides' || pathParts[0] === 'downloads') && pathParts.length === 2) {
      return Boolean(getResourceBySlug(pathParts[1]));
    }
    return false;
  })();

  const currentResourceSlug = isResourceDetailPage ? pathParts[pathParts.length - 1] : '';

  // Blog / Resources routing
  const knownCategorySlugs = [
    'contracts-forms',
    'transaction-operations',
    'broker-compliance',
    'condo-hoa',
    'agent-growth',
    'florida-updates',
    'agent-growth-leverage',
    'florida-real-estate-updates',
    'florida-contracts-forms'
  ];

  const isBlogIndexPage = normalizedPath === '/resources' || normalizedPath === '/blog';
  
  const isCategoryArchivePage = (() => {
    if ((pathParts[0] === 'resources' || pathParts[0] === 'blog') && pathParts.length === 2) {
      return knownCategorySlugs.includes(pathParts[1]);
    }
    return false;
  })();

  const isBlogPostPage = (() => {
    if ((pathParts[0] === 'resources' || pathParts[0] === 'blog') && pathParts.length === 2 && !knownCategorySlugs.includes(pathParts[1])) {
      return DEMO_BLOG_POSTS.some(p => p.slug === pathParts[1]);
    }
    return false;
  })();

  const currentCategorySlug = isCategoryArchivePage ? pathParts[1] : '';
  const currentPostSlug = isBlogPostPage ? pathParts[1] : '';

  const dynamicLocationConfig = LOCATION_PAGES[pathParts[0]] || (normalizedPath.startsWith('/') ? LOCATION_PAGES[normalizedPath.slice(1)] : undefined);
  const isDynamicLocationPage = Boolean(dynamicLocationConfig);

  // Check if current route is a known valid route
  const isKnownRoute = 
    isHomePage ||
    isDynamicLocationPage ||
    isSpanishHomePage ||
    isSpanishPricingPage ||
    isSpanishSubmitDealPage ||
    isCalculatorPage ||
    isHowItWorksPage ||
    isWhyHtcPage ||
    isTransactionCoordinationPage ||
    isContractToClosePage ||
    isRealtorTcPage ||
    isListingCoordinationPage ||
    isPricingPage ||
    isMeetTheTribePage ||
    isAboutPage ||
    isWhoWeSupportPage ||
    isMiamiDadeTcPage ||
    isMiamiTcPage ||
    isBrowardTcPage ||
    isSouthFloridaTcPage ||
    isFaqPage ||
    isBookCallPage ||
    isSubmitDealPage ||
    isReviewsPage ||
    isTcWorkshopPage ||
    isGuidesHubPage ||
    isResourceDetailPage ||
    isBlogIndexPage ||
    isCategoryArchivePage ||
    isBlogPostPage;

  const is404Page = !isKnownRoute;

  const scrollToHomeMethod = () => {
    if (!isHomePage && !isSpanishHomePage) {
      navigateTo(language === 'es' ? '/es/' : '/');
      setTimeout(() => {
        const el = document.getElementById(language === 'es' ? 'metodo-home' : 'home-method');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(language === 'es' ? 'metodo-home' : 'home-method');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#EEEAEB] text-[#3A2E29]">
      
      {/* Banner Landmark wrapping TopBar and Navbar */}
      <header role="banner" className="sticky top-0 z-40">
        <TopBar
          language={language}
          onLanguageChange={handleLanguageToggle}
          onSubmitDeal={() => navigateTo(language === 'es' ? '/es/enviar-transaccion/' : '/submit-deal/')}
        />

        {/* Header Navigation */}
        <Navbar
          language={language}
          onBookCall={() => {
            trackBookDiscoveryCall('navbar');
            navigateTo('/book/');
          }}
          onSubmitDeal={() => {
            trackDealIntakeStart('navbar');
            navigateTo(language === 'es' ? '/es/enviar-transaccion/' : '/submit-deal/');
          }}
          onOpenRoi={() => navigateTo('/agent-business-calculator/')}
          onOpenHowItWorks={() => navigateTo('/how-htc-works/')}
          onOpenWhyHtc={() => navigateTo('/why-htc/')}
          onOpenWhoWeSupport={() => navigateTo('/who-we-support/')}
          onOpenMiamiTc={() => navigateTo('/miami-transaction-coordinator/')}
          onOpenMiamiDadeTc={() => navigateTo('/miami-dade-transaction-coordinator/')}
          onOpenBrowardTc={() => navigateTo('/broward-transaction-coordinator/')}
          onOpenSouthFloridaTc={() => navigateTo('/south-florida-transaction-coordinator/')}
          onOpenContractToClose={() => navigateTo('/contract-to-close-services/')}
          onOpenRealtorTc={() => navigateTo('/transaction-coordinator-for-realtors/')}
          onOpenFaq={() => navigateTo('/faq/')}
          onOpenAbout={() => navigateTo('/about/')}
          onOpenMeetMichelle={() => navigateTo('/about/')}
          onOpenMeetTheTribe={() => navigateTo('/team/')}
          onOpenTransactionCoordination={() => navigateTo('/transaction-coordination/')}
          onOpenListingCoordination={() => navigateTo('/listing-coordination/')}
          onOpenPricingPlans={() => navigateTo(language === 'es' ? '/es/precios/' : '/pricing/')}
          onOpenServicesPricing={() => navigateTo(language === 'es' ? '/es/precios/' : '/pricing/')}
          onOpenReviews={() => navigateTo('/reviews/')}
          onOpenBlog={() => navigateTo('/resources/')}
          onOpenGuides={() => navigateTo('/free-guides-downloads/')}
          onGoHome={() => navigateTo(language === 'es' ? '/es/' : '/')}
        />
      </header>

      {/* RENDER DEDICATED PAGES OR HOMEPAGE */}
      <main className="flex-grow">
        <Suspense fallback={<div className="min-h-[50vh]" />}>
          {isCalculatorPage ? (
            <AgentCalculatorPage
              onBookCall={() => navigateTo('/book/')}
              onExploreServices={() => navigateTo('/pricing/#contract-to-close')}
              onGoHome={() => navigateTo('/')}
              onOpenResources={() => navigateTo('/resources/')}
            />
          ) : isHowItWorksPage ? (
          <HowHtcWorksPage
            onBookCall={() => setBookCallOpen(true)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onExploreServices={() => navigateTo('/pricing/')}
            onOpenListingCoordination={() => navigateTo('/listing-coordination/')}
            onOpenContractToClose={() => navigateTo('/contract-to-close-services/')}
            onOpenBrokerCompliance={() => {
              navigateTo('/pricing/');
              setTimeout(() => {
                const el = document.getElementById('broker-compliance');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 150);
            }}
            onCompareBasePro={() => {
              navigateTo('/pricing/');
              setTimeout(() => {
                const el = document.getElementById('contract-to-close');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 150);
            }}
            onGoHome={() => navigateTo('/')}
          />
        ) : isWhyHtcPage ? (
          <WhyHtcPage
            onBookCall={() => setBookCallOpen(true)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onExploreServices={() => navigateTo('/pricing/')}
            onGoHome={() => navigateTo('/')}
            onOpenHowItWorks={() => navigateTo('/how-htc-works/')}
            onOpenAbout={() => navigateTo('/about/')}
            onOpenSpanish={() => setLanguage('es')}
            onOpenReviews={() => navigateTo('/reviews/')}
          />
        ) : isTransactionCoordinationPage ? (
          <TransactionCoordinationPage
            onBookCall={() => setBookCallOpen(true)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onExploreServices={() => navigateTo('/pricing/')}
            onGoHome={() => navigateTo('/')}
            onOpenHowItWorks={() => navigateTo('/how-htc-works/')}
            onOpenWhyHtc={() => navigateTo('/why-htc/')}
          />
        ) : isContractToClosePage ? (
          <ContractToCloseServicesPage
            onBookCall={() => setBookCallOpen(true)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onOpenPricing={() => navigateTo('/pricing/')}
            onGoHome={() => navigateTo('/')}
            onOpenHowItWorks={() => navigateTo('/how-htc-works/')}
            onOpenWhyHtc={() => navigateTo('/why-htc/')}
            onOpenWhoWeSupport={() => navigateTo('/who-we-support/')}
            onOpenRoi={() => navigateTo('/agent-business-calculator/')}
            onOpenTransactionCoordination={() => navigateTo('/transaction-coordination/')}
            onOpenListingCoordination={() => navigateTo('/listing-coordination/')}
            onOpenMiamiTc={() => navigateTo('/miami-transaction-coordinator/')}
            onOpenMiamiDadeTc={() => navigateTo('/miami-dade-transaction-coordinator/')}
            onOpenBrowardTc={() => navigateTo('/broward-transaction-coordinator/')}
            onOpenSouthFloridaTc={() => navigateTo('/south-florida-transaction-coordinator/')}
          />
        ) : isRealtorTcPage ? (
          <RealtorTransactionCoordinatorPage
            onBookCall={() => setBookCallOpen(true)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onOpenPricing={() => navigateTo('/pricing/')}
            onGoHome={() => navigateTo('/')}
            onOpenHowItWorks={() => navigateTo('/how-htc-works/')}
            onOpenWhyHtc={() => navigateTo('/why-htc/')}
            onOpenWhoWeSupport={() => navigateTo('/who-we-support/')}
            onOpenRoi={() => navigateTo('/agent-business-calculator/')}
            onOpenTransactionCoordination={() => navigateTo('/transaction-coordination/')}
            onOpenListingCoordination={() => navigateTo('/listing-coordination/')}
            onOpenContractToClose={() => navigateTo('/contract-to-close-services/')}
            onOpenMiamiTc={() => navigateTo('/miami-transaction-coordinator/')}
            onOpenMiamiDadeTc={() => navigateTo('/miami-dade-transaction-coordinator/')}
            onOpenBrowardTc={() => navigateTo('/broward-transaction-coordinator/')}
            onOpenSouthFloridaTc={() => navigateTo('/south-florida-transaction-coordinator/')}
          />
        ) : isListingCoordinationPage ? (
          <ListingCoordinationPage
            onBookCall={() => setBookCallOpen(true)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onExploreServices={() => navigateTo('/pricing/')}
            onGoHome={() => navigateTo('/')}
            onOpenHowItWorks={() => navigateTo('/how-htc-works/')}
            onOpenWhyHtc={() => navigateTo('/why-htc/')}
            onOpenTransactionCoordination={() => navigateTo('/transaction-coordination/')}
          />
        ) : isSouthFloridaTcPage ? (
          <SouthFloridaTransactionCoordinatorPage
            onBookCall={() => setBookCallOpen(true)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onGoHome={() => navigateTo('/')}
            onOpenPricing={() => navigateTo('/pricing/')}
            onOpenHowItWorks={() => navigateTo('/how-htc-works/')}
            onOpenWhyHtc={() => navigateTo('/why-htc/')}
            onOpenWhoWeSupport={() => navigateTo('/who-we-support/')}
            onOpenRoi={() => navigateTo('/agent-business-calculator/')}
            onOpenTransactionCoordination={() => navigateTo('/transaction-coordination/')}
            onOpenListingCoordination={() => navigateTo('/listing-coordination/')}
            onOpenMiamiTc={() => navigateTo('/miami-transaction-coordinator/')}
            onOpenMiamiDadeTc={() => navigateTo('/miami-dade-transaction-coordinator/')}
            onOpenBrowardTc={() => navigateTo('/broward-transaction-coordinator/')}
          />
        ) : isBrowardTcPage ? (
          <BrowardTransactionCoordinatorPage
            onBookCall={() => setBookCallOpen(true)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onGoHome={() => navigateTo('/')}
            onOpenPricing={() => navigateTo('/pricing/')}
            onOpenHowItWorks={() => navigateTo('/how-htc-works/')}
            onOpenWhyHtc={() => navigateTo('/why-htc/')}
            onOpenWhoWeSupport={() => navigateTo('/who-we-support/')}
            onOpenRoi={() => navigateTo('/agent-business-calculator/')}
            onOpenTransactionCoordination={() => navigateTo('/transaction-coordination/')}
            onOpenListingCoordination={() => navigateTo('/listing-coordination/')}
            onOpenMiamiTc={() => navigateTo('/miami-transaction-coordinator/')}
            onOpenMiamiDadeTc={() => navigateTo('/miami-dade-transaction-coordinator/')}
            onOpenSouthFloridaTc={() => navigateTo('/south-florida-transaction-coordinator/')}
          />
        ) : isMiamiDadeTcPage ? (
          <MiamiDadeTransactionCoordinatorPage
            onBookCall={() => setBookCallOpen(true)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onGoHome={() => navigateTo('/')}
            onOpenPricing={() => navigateTo('/pricing/')}
            onOpenHowItWorks={() => navigateTo('/how-htc-works/')}
            onOpenWhyHtc={() => navigateTo('/why-htc/')}
            onOpenWhoWeSupport={() => navigateTo('/who-we-support/')}
            onOpenRoi={() => navigateTo('/agent-business-calculator/')}
            onOpenTransactionCoordination={() => navigateTo('/transaction-coordination/')}
            onOpenListingCoordination={() => navigateTo('/listing-coordination/')}
            onOpenMiamiTc={() => navigateTo('/miami-transaction-coordinator/')}
            onOpenBrowardTc={() => navigateTo('/broward-transaction-coordinator/')}
            onOpenSouthFloridaTc={() => navigateTo('/south-florida-transaction-coordinator/')}
          />
        ) : isMiamiTcPage ? (
          <MiamiTransactionCoordinatorPage
            onBookCall={() => setBookCallOpen(true)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onGoHome={() => navigateTo('/')}
            onOpenPricing={() => navigateTo('/pricing/')}
            onOpenHowItWorks={() => navigateTo('/how-htc-works/')}
            onOpenWhyHtc={() => navigateTo('/why-htc/')}
            onOpenWhoWeSupport={() => navigateTo('/who-we-support/')}
            onOpenRoi={() => navigateTo('/agent-business-calculator/')}
            onOpenTransactionCoordination={() => navigateTo('/transaction-coordination/')}
            onOpenListingCoordination={() => navigateTo('/listing-coordination/')}
            onOpenMiamiDadeTc={() => navigateTo('/miami-dade-transaction-coordinator/')}
            onOpenBrowardTc={() => navigateTo('/broward-transaction-coordinator/')}
            onOpenSouthFloridaTc={() => navigateTo('/south-florida-transaction-coordinator/')}
          />
        ) : isDynamicLocationPage && dynamicLocationConfig ? (
          <DynamicLocationPage
            data={dynamicLocationConfig}
            onBookCall={() => setBookCallOpen(true)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onGoHome={() => navigateTo('/')}
            onOpenPricing={() => navigateTo('/pricing/')}
          />
        ) : isSpanishPricingPage ? (
          <SpanishPricingPage
            onBookCall={() => setBookCallOpen(true)}
            onSubmitDeal={() => navigateTo('/es/enviar-transaccion/')}
            onGoHome={() => navigateTo('/es/')}
            onOpenFaq={() => navigateTo('/faq/')}
          />
        ) : isPricingPage ? (
          <PricingPlansPage
            onBookCall={() => setBookCallOpen(true)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onGoHome={() => navigateTo('/')}
            onOpenTransactionCoordination={() => navigateTo('/transaction-coordination/')}
            onOpenListingCoordination={() => navigateTo('/listing-coordination/')}
            onOpenHowItWorks={() => navigateTo('/how-htc-works/')}
            onOpenWhyHtc={() => navigateTo('/why-htc/')}
            onOpenRoi={() => navigateTo('/agent-business-calculator/')}
            onOpenTcWorkshop={() => navigateTo('/tcworkshop/')}
            onOpenFaq={() => navigateTo('/faq/')}
          />
        ) : isMeetTheTribePage ? (
          <MeetTheTribePage
            onBookCall={() => setBookCallOpen(true)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onGoHome={() => navigateTo('/')}
            onOpenAboutMichelle={() => navigateTo('/about/')}
            onOpenHowItWorks={() => navigateTo('/how-htc-works/')}
            onOpenWhyHtc={() => navigateTo('/why-htc/')}
            onOpenPricing={() => navigateTo('/pricing/')}
            onOpenTransactionCoordination={() => navigateTo('/transaction-coordination/')}
            onOpenListingCoordination={() => navigateTo('/listing-coordination/')}
            onOpenFaq={() => navigateTo('/faq/')}
          />
        ) : isAboutPage ? (
          <AboutMichellePage
            onBookCall={() => setBookCallOpen(true)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onGoHome={() => navigateTo('/')}
            onOpenHowItWorks={() => navigateTo('/how-htc-works/')}
            onOpenWhyHtc={() => navigateTo('/why-htc/')}
            onOpenPricing={() => navigateTo('/pricing/')}
            onOpenTransactionCoordination={() => navigateTo('/transaction-coordination/')}
            onOpenListingCoordination={() => navigateTo('/listing-coordination/')}
            onOpenMeetTheTribe={() => navigateTo('/team/')}
          />
        ) : isWhoWeSupportPage ? (
          <WhoWeSupportPage
            onBookCall={() => setBookCallOpen(true)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onGoHome={() => navigateTo('/')}
            onOpenPricing={() => navigateTo('/pricing/')}
            onOpenHowItWorks={() => navigateTo('/how-htc-works/')}
            onOpenWhyHtc={() => navigateTo('/why-htc/')}
            onOpenRoi={() => navigateTo('/agent-business-calculator/')}
            onOpenTransactionCoordination={() => navigateTo('/transaction-coordination/')}
            onOpenListingCoordination={() => navigateTo('/listing-coordination/')}
            onOpenRealtorTc={() => navigateTo('/transaction-coordinator-for-realtors/')}
            onOpenMiamiTc={() => navigateTo('/miami-transaction-coordinator/')}
            onOpenMiamiDadeTc={() => navigateTo('/miami-dade-transaction-coordinator/')}
            onOpenBrowardTc={() => navigateTo('/broward-transaction-coordinator/')}
            onOpenSouthFloridaTc={() => navigateTo('/south-florida-transaction-coordinator/')}
          />
        ) : isFaqPage ? (
          <FaqPage
            onBookCall={() => navigateTo('/book/')}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onGoHome={() => navigateTo('/')}
            onOpenPricing={() => navigateTo('/pricing/')}
            onOpenHowItWorks={() => navigateTo('/how-htc-works/')}
            onOpenWhyHtc={() => navigateTo('/why-htc/')}
            onOpenWhoWeSupport={() => navigateTo('/who-we-support/')}
            onOpenRoi={() => navigateTo('/agent-business-calculator/')}
            onOpenTransactionCoordination={() => navigateTo('/transaction-coordination/')}
            onOpenListingCoordination={() => navigateTo('/listing-coordination/')}
            onOpenContractToClose={() => navigateTo('/contract-to-close-services/')}
            onOpenRealtorTc={() => navigateTo('/transaction-coordinator-for-realtors/')}
            onOpenMiamiTc={() => navigateTo('/miami-transaction-coordinator/')}
            onOpenMiamiDadeTc={() => navigateTo('/miami-dade-transaction-coordinator/')}
            onOpenBrowardTc={() => navigateTo('/broward-transaction-coordinator/')}
            onOpenSouthFloridaTc={() => navigateTo('/south-florida-transaction-coordinator/')}
          />
        ) : isBookCallPage ? (
          <BookDiscoveryCallPage
            onGoHome={() => navigateTo('/')}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onOpenPricing={() => navigateTo('/pricing/')}
            onOpenFaq={() => navigateTo('/faq/')}
            onOpenHowItWorks={() => navigateTo('/how-htc-works/')}
            onOpenWhyHtc={() => navigateTo('/why-htc/')}
            onOpenWhoWeSupport={() => navigateTo('/who-we-support/')}
            onOpenRoi={() => navigateTo('/agent-business-calculator/')}
          />
        ) : isSpanishSubmitDealPage ? (
          <SpanishSubmitDealPage
            onGoHome={() => navigateTo('/es/')}
            onOpenPricing={() => navigateTo('/es/precios/')}
            onOpenFaq={() => navigateTo('/faq/')}
            onBookCall={() => setBookCallOpen(true)}
          />
        ) : isSubmitDealPage ? (
          <SubmitDealPage
            onGoHome={() => navigateTo('/')}
            onOpenPricing={() => navigateTo('/pricing/')}
            onOpenFaq={() => navigateTo('/faq/')}
            onBookCall={() => setBookCallOpen(true)}
          />
        ) : isReviewsPage ? (
          <ReviewsPage
            onGoHome={() => navigateTo('/')}
            onBookCall={() => setBookCallOpen(true)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
          />
        ) : isBlogIndexPage ? (
          <BlogResourcesPage
            onGoHome={() => navigateTo('/')}
            onOpenPost={(slug) => navigateTo(`/resources/${slug}/`)}
            onBookCall={() => setBookCallOpen(true)}
            onOpenCalculator={(hash?: string) =>
              navigateTo(hash ? (hash.startsWith('#') ? `/agent-business-calculator/${hash}` : `/agent-business-calculator/#${hash}`) : '/agent-business-calculator/')
            }
            onOpenGuides={() => navigateTo('/free-guides-downloads/')}
            onExploreServices={() => navigateTo('/pricing/')}
            onNavigate={(path) => navigateTo(path)}
          />
        ) : isCategoryArchivePage ? (
          <CategoryArchivePage
            categorySlug={currentCategorySlug}
            onNavigate={(path) => navigateTo(path)}
            onBookCall={() => setBookCallOpen(true)}
          />
        ) : isBlogPostPage ? (
          <BlogPostPage
            slug={currentPostSlug}
            onBackToBlog={() => navigateTo('/resources/')}
            onBookCall={() => setBookCallOpen(true)}
            onOpenCalculator={(hash?: string) =>
              navigateTo(hash ? `/agent-business-calculator/#${hash}` : '/agent-business-calculator/')
            }
            onOpenHowItWorks={() => navigateTo('/how-htc-works/')}
            onOpenPricing={() => navigateTo('/pricing/')}
            onOpenContractToClose={() => navigateTo('/contract-to-close-services/')}
            onOpenListingCoordination={() => navigateTo('/listing-coordination/')}
            onOpenGuides={() => navigateTo('/resources/free-guides-downloads/')}
            onOpenTcWorkshop={() => navigateTo('/tcworkshop/')}
            onOpenArticle={(slug) => navigateTo(`/resources/${slug}/`)}
          />
        ) : isResourceDetailPage ? (
          <ResourceLandingPage
            slug={currentResourceSlug}
            onBackToLibrary={() => navigateTo('/resources/free-guides-downloads/')}
            onNavigate={(path) => navigateTo(path)}
            onBookCall={() => setBookCallOpen(true)}
            onExploreServices={() => navigateTo('/pricing/')}
            onGoHome={() => navigateTo('/')}
            onOpenCalculator={() => navigateTo('/agent-business-calculator/')}
          />
        ) : isGuidesHubPage ? (
          <FreeGuidesPage
            onGoHome={() => navigateTo('/')}
            onBackToBlog={() => navigateTo('/resources/')}
            onBookCall={() => setBookCallOpen(true)}
            onOpenCalculator={() => navigateTo('/agent-business-calculator/')}
            onNavigate={(path) => navigateTo(path)}
          />
        ) : isTcWorkshopPage ? (
          <TcWorkshopPage
            onGoHome={() => navigateTo('/')}
            onBookCall={() => setBookCallOpen(true)}
          />
        ) : isSpanishHomePage ? (
          <SpanishHomePage
            onBookCall={() => setBookCallOpen(true)}
            onSubmitDeal={() => navigateTo('/es/enviar-transaccion/')}
            onExploreServices={() => navigateTo('/es/precios/')}
            onSeeHowItWorks={() => {
              const el = document.getElementById('metodo-home');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        ) : is404Page ? (
          <NotFoundPage
            onGoHome={() => navigateTo('/')}
            onOpenPricing={() => navigateTo('/pricing/')}
            onOpenFaq={() => navigateTo('/faq/')}
            onBookCall={() => setBookCallOpen(true)}
            requestedPath={currentPath}
          />
        ) : (
          <EnglishHomeView
            onBookCall={() => setBookCallOpen(true)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onSeeHowItWorks={() => navigateTo('/how-htc-works/')}
            onExploreServices={() => setServicesPricingOpen(true)}
            onOpenAbout={() => setAboutOpen(true)}
            onOpenRoi={() => navigateTo('/agent-business-calculator/')}
            onOpenMeetTheTribe={() => navigateTo('/team/')}
            onOpenMiamiTc={() => navigateTo('/miami-transaction-coordinator/')}
            onOpenMiamiDadeTc={() => navigateTo('/miami-dade-transaction-coordinator/')}
            onOpenBrowardTc={() => navigateTo('/broward-transaction-coordinator/')}
            onOpenSouthFloridaTc={() => navigateTo('/south-florida-transaction-coordinator/')}
          />
        )}
        </Suspense>
      </main>

      {/* FOOTER */}
      <Footer
        onBookCall={() => setBookCallOpen(true)}
        onSubmitDeal={() => navigateTo(language === 'es' ? '/es/enviar-transaccion/' : '/submit-deal/')}
        onOpenRoi={() => navigateTo('/agent-business-calculator/')}
        onOpenHowItWorks={() => navigateTo('/how-htc-works/')}
        onOpenWhyHtc={() => navigateTo('/why-htc/')}
        onOpenWhoWeSupport={() => navigateTo('/who-we-support/')}
        onOpenMiamiTc={() => navigateTo('/miami-transaction-coordinator/')}
        onOpenMiamiDadeTc={() => navigateTo('/miami-dade-transaction-coordinator/')}
        onOpenBrowardTc={() => navigateTo('/broward-transaction-coordinator/')}
        onOpenSouthFloridaTc={() => navigateTo('/south-florida-transaction-coordinator/')}
        onOpenContractToClose={() => navigateTo('/contract-to-close-services/')}
        onOpenRealtorTc={() => navigateTo('/transaction-coordinator-for-realtors/')}
        onOpenFaq={() => navigateTo('/faq/')}
        onOpenBookCallPage={() => navigateTo('/book/')}
        onOpenTransactionCoordination={() => navigateTo('/transaction-coordination/')}
        onOpenListingCoordination={() => navigateTo('/listing-coordination/')}
        onOpenPricingPlans={() => navigateTo(language === 'es' ? '/es/precios/' : '/pricing/')}
        onOpenAbout={() => navigateTo('/about/')}
        onOpenMeetMichelle={() => navigateTo('/about/')}
        onOpenMeetTheTribe={() => navigateTo('/team/')}
        onOpenServicesPricing={() => navigateTo(language === 'es' ? '/es/precios/' : '/pricing/')}
        onOpenReviews={() => navigateTo('/reviews/')}
        onOpenBlog={() => navigateTo('/resources/')}
        onOpenGuides={() => navigateTo('/free-guides-downloads/')}
        onOpenTcWorkshop={() => navigateTo('/tcworkshop/')}
        language={language}
        onLanguageChange={handleLanguageToggle}
      />

      {/* INTERACTIVE MODALS (Code-Split / Lazy) */}
      <Suspense fallback={null}>
        {submitDealOpen && (
          <SubmitDealModal
            isOpen={submitDealOpen}
            onClose={() => setSubmitDealOpen(false)}
          />
        )}

        {bookCallOpen && (
          <BookCallModal
            isOpen={bookCallOpen}
            onClose={() => setBookCallOpen(false)}
          />
        )}

        {aboutOpen && (
          <AboutHtcModal
            isOpen={aboutOpen}
            onClose={() => setAboutOpen(false)}
            onBookCall={() => setBookCallOpen(true)}
          />
        )}

        {servicesPricingOpen && (
          <ServicesAndPricingModal
            isOpen={servicesPricingOpen}
            onClose={() => setServicesPricingOpen(false)}
            onBookCall={() => setBookCallOpen(true)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
          />
        )}
      </Suspense>

    </div>
  );
}

