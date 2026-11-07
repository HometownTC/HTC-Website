import React, { useState, useEffect, lazy, Suspense } from 'react';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EnglishHomeView } from './components/EnglishHomeView';

// Modals (Code-Split / Lazy)
const SubmitDealModal = lazy(() => import('./components/SubmitDealModal').then(m => ({ default: m.SubmitDealModal })));
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
const AffiliateProgramPage = lazy(() => import('./components/AffiliateProgramPage').then(m => ({ default: m.AffiliateProgramPage })));
const AgentToolkitPage = lazy(() => import('./components/AgentToolkitPage').then(m => ({ default: m.AgentToolkitPage })));
const CondoHoaGuidePage = lazy(() => import('./components/CondoHoaGuidePage').then(m => ({ default: m.CondoHoaGuidePage })));
const ResourceLandingPage = lazy(() => import('./components/ResourceLandingPage').then(m => ({ default: m.ResourceLandingPage })));
const NotFoundPage = lazy(() => import('./components/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const DynamicLocationPage = lazy(() => import('./components/DynamicLocationPage').then(m => ({ default: m.DynamicLocationPage })));
import { getResourceBySlug } from './data/resourceLibraryData';
import {
  BlogPostData,
  CATEGORY_ARCHIVES,
  LEGACY_CATEGORY_REDIRECTS,
  getPublishedPostBySlug,
  setPublishedBlogPosts,
} from './data/blog';
import { LOCATION_PAGES } from './data/locationData';
import { Language } from './types';
import { 
  trackBookDiscoveryCall, 
  trackDealIntakeStart, 
  trackLanguageSwitch 
} from './utils/analytics';

interface AppProps {
  initialPath?: string;
  initialLanguage?: Language;
  publishedPosts?: BlogPostData[];
}

export default function App({ initialPath, initialLanguage, publishedPosts }: AppProps = {}) {
  if (publishedPosts) {
    setPublishedBlogPosts(publishedPosts);
  }
  const [submitDealOpen, setSubmitDealOpen] = useState(false);
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
      } else if (normalizedPath === '/tcworkshop/affiliates') {
        navigateTo('/es/tcworkshop/afiliados/');
      } else if (normalizedPath === '/book' || normalizedPath === '/book-call' || normalizedPath === '/book-discovery-call') {
        navigateTo('/es/agendar/');
      } else if (normalizedPath === '/how-htc-works' || normalizedPath === '/how-it-works') {
        navigateTo('/es/como-funciona/');
      } else if (normalizedPath === '/why-htc') {
        navigateTo('/es/por-que-htc/');
      } else if (normalizedPath === '/about' || normalizedPath === '/michelle') {
        navigateTo('/es/michelle/');
      } else if (normalizedPath === '/team' || normalizedPath === '/meet-the-tribe') {
        navigateTo('/es/equipo/');
      } else if (normalizedPath === '/') {
        navigateTo('/es/');
      }
    } else {
      if (normalizedPath === '/es/precios') {
        navigateTo('/pricing/');
      } else if (normalizedPath === '/es/enviar-transaccion') {
        navigateTo('/submit-deal/');
      } else if (normalizedPath === '/es/tcworkshop/afiliados') {
        navigateTo('/tcworkshop/affiliates/');
      } else if (normalizedPath === '/es/agendar') {
        navigateTo('/book/');
      } else if (normalizedPath === '/es/como-funciona') {
        navigateTo('/how-htc-works/');
      } else if (normalizedPath === '/es/por-que-htc') {
        navigateTo('/why-htc/');
      } else if (normalizedPath === '/es/michelle') {
        navigateTo('/about/');
      } else if (normalizedPath === '/es/equipo') {
        navigateTo('/team/');
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
  const isHowItWorksPage = normalizedPath === '/how-htc-works' || normalizedPath === '/how-it-works' || normalizedPath === '/es/como-funciona';
  const isWhyHtcPage = normalizedPath === '/why-htc' || normalizedPath === '/es/por-que-htc';
  const isTransactionCoordinationPage = normalizedPath === '/transaction-coordination';
  const isContractToClosePage = normalizedPath === '/contract-to-close' || normalizedPath === '/contract-to-close-services';
  const isRealtorTcPage = normalizedPath === '/transaction-coordinator-for-realtors' || normalizedPath === '/realtor-transaction-coordinator';
  const isListingCoordinationPage = normalizedPath === '/listing-coordination';
  const isPricingPage = normalizedPath === '/pricing' || normalizedPath === '/es/precios' || normalizedPath === '/services-and-pricing' || normalizedPath === '/services';
  const isMeetTheTribePage = normalizedPath === '/team' || normalizedPath === '/meet-the-tribe' || normalizedPath === '/es/equipo';
  const isAboutPage = normalizedPath === '/about' || normalizedPath === '/michelle' || normalizedPath === '/es/michelle';
  const isWhoWeSupportPage = normalizedPath === '/who-we-support';
  const isMiamiDadeTcPage = normalizedPath === '/miami-dade-transaction-coordinator';
  const isMiamiTcPage = normalizedPath === '/miami-transaction-coordinator';
  const isBrowardTcPage = normalizedPath === '/broward-transaction-coordinator';
  const isSouthFloridaTcPage = normalizedPath === '/south-florida-transaction-coordinator';
  const isFaqPage = normalizedPath === '/faq';
  const isBookCallPage = normalizedPath === '/book' || normalizedPath === '/es/agendar' || normalizedPath === '/book-call' || normalizedPath === '/book-discovery-call';
  const isSubmitDealPage = 
    normalizedPath === '/es/enviar-transaccion' ||
    normalizedPath === '/submit-deal' || 
    normalizedPath === '/deal-intake' || 
    normalizedPath === '/submit';
  // '/register' → team.hometowntc.com/homebase/register.html (public/_redirects, Nov 2 2026)
  const isReviewsPage = normalizedPath === '/reviews';
  const isTcWorkshopPage = normalizedPath === '/tcworkshop';
  const isAffiliateProgramPage = normalizedPath === '/tcworkshop/affiliates' || normalizedPath === '/es/tcworkshop/afiliados';

  // Guides & Resource Library
  const isGuidesHubPage = 
    normalizedPath === '/free-guides-downloads' || 
    normalizedPath === '/resources/free-guides-downloads' ||
    normalizedPath === '/guides' ||
    normalizedPath === '/resources/guides';

  // Condo, Co-op & HOA Resource Guide (own page)
  const isCondoGuidePage =
    normalizedPath === '/resources/free-guides-downloads/condo-coop-hoa-guide' ||
    normalizedPath === '/condo-coop-hoa-guide';

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

  // Blog / Resources routing — reads from single category settings file & published Markdown files
  const knownCategorySlugs = [
    ...Object.keys(CATEGORY_ARCHIVES),
    ...Object.keys(LEGACY_CATEGORY_REDIRECTS),
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
      return Boolean(getPublishedPostBySlug(pathParts[1]));
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
    isAffiliateProgramPage ||
    isGuidesHubPage ||
    isCondoGuidePage ||
    isResourceDetailPage ||
    isBlogIndexPage ||
    isCategoryArchivePage ||
    isBlogPostPage;

  const is404Page = !isKnownRoute;

  const scrollToHomeMethod = () => {
    if (!isHomePage && !isSpanishHomePage) {
      navigateTo(language === 'es' ? '/es/' : '/');
      setTimeout(() => {
        const el = document.getElementById('home-method');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('home-method');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isEs = language === 'es';
  const bookPath = isEs ? '/es/agendar/' : '/book/';
  const howPath = isEs ? '/es/como-funciona/' : '/how-htc-works/';
  const whyPath = isEs ? '/es/por-que-htc/' : '/why-htc/';
  const homePath = isEs ? '/es/' : '/';
  const aboutPath = isEs ? '/es/michelle/' : '/about/';
  const teamPath = isEs ? '/es/equipo/' : '/team/';
  const pricingPath = isEs ? '/es/precios/' : '/pricing/';
  const submitPath = isEs ? '/es/enviar-transaccion/' : '/submit-deal/';

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
            navigateTo(bookPath);
          }}
          onSubmitDeal={() => {
            trackDealIntakeStart('navbar');
            navigateTo(language === 'es' ? '/es/enviar-transaccion/' : '/submit-deal/');
          }}
          onOpenRoi={() => navigateTo('/agent-business-calculator/')}
          onOpenHowItWorks={() => navigateTo(howPath)}
          onOpenWhyHtc={() => navigateTo(whyPath)}
          onOpenWhoWeSupport={() => navigateTo('/who-we-support/')}
          onOpenMiamiTc={() => navigateTo('/miami-transaction-coordinator/')}
          onOpenMiamiDadeTc={() => navigateTo('/miami-dade-transaction-coordinator/')}
          onOpenBrowardTc={() => navigateTo('/broward-transaction-coordinator/')}
          onOpenSouthFloridaTc={() => navigateTo('/south-florida-transaction-coordinator/')}
          onOpenContractToClose={() => navigateTo('/contract-to-close-services/')}
          onOpenRealtorTc={() => navigateTo('/transaction-coordinator-for-realtors/')}
          onOpenFaq={() => navigateTo('/faq/')}
          onOpenAbout={() => navigateTo(aboutPath)}
          onOpenMeetMichelle={() => navigateTo(aboutPath)}
          onOpenMeetTheTribe={() => navigateTo(teamPath)}
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
              onBookCall={() => navigateTo(bookPath)}
              onExploreServices={() => navigateTo('/pricing/#contract-to-close')}
              onGoHome={() => navigateTo('/')}
              onOpenResources={() => navigateTo('/resources/')}
            />
          ) : isHowItWorksPage ? (
          <HowHtcWorksPage
            language={language}
            onBookCall={() => navigateTo(bookPath)}
            onSubmitDeal={() => navigateTo(submitPath)}
            onExploreServices={() => navigateTo(pricingPath)}
            onOpenListingCoordination={() => navigateTo('/listing-coordination/')}
            onOpenContractToClose={() => navigateTo('/contract-to-close-services/')}
            onOpenBrokerCompliance={() => {
              navigateTo(pricingPath);
              setTimeout(() => {
                const el = document.getElementById('broker-compliance');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 150);
            }}
            onCompareBasePro={() => {
              navigateTo(pricingPath);
              setTimeout(() => {
                const el = document.getElementById('contract-to-close');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 150);
            }}
            onGoHome={() => navigateTo(homePath)}
          />
        ) : isWhyHtcPage ? (
          <WhyHtcPage
            language={language}
            onBookCall={() => navigateTo(bookPath)}
            onSubmitDeal={() => navigateTo(submitPath)}
            onExploreServices={() => navigateTo(pricingPath)}
            onGoHome={() => navigateTo(homePath)}
            onOpenHowItWorks={() => navigateTo(howPath)}
            onOpenAbout={() => navigateTo(aboutPath)}
            onOpenSpanish={() => setLanguage('es')}
            onOpenReviews={() => navigateTo('/reviews/')}
          />
        ) : isTransactionCoordinationPage ? (
          <TransactionCoordinationPage
            onBookCall={() => navigateTo(bookPath)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onExploreServices={() => navigateTo('/pricing/')}
            onGoHome={() => navigateTo('/')}
            onOpenHowItWorks={() => navigateTo(howPath)}
            onOpenWhyHtc={() => navigateTo(whyPath)}
          />
        ) : isContractToClosePage ? (
          <ContractToCloseServicesPage
            onBookCall={() => navigateTo(bookPath)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onOpenPricing={() => navigateTo('/pricing/')}
            onGoHome={() => navigateTo('/')}
            onOpenHowItWorks={() => navigateTo(howPath)}
            onOpenWhyHtc={() => navigateTo(whyPath)}
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
            onBookCall={() => navigateTo(bookPath)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onOpenPricing={() => navigateTo('/pricing/')}
            onGoHome={() => navigateTo('/')}
            onOpenHowItWorks={() => navigateTo(howPath)}
            onOpenWhyHtc={() => navigateTo(whyPath)}
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
            onBookCall={() => navigateTo(bookPath)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onExploreServices={() => navigateTo('/pricing/')}
            onGoHome={() => navigateTo('/')}
            onOpenHowItWorks={() => navigateTo(howPath)}
            onOpenWhyHtc={() => navigateTo(whyPath)}
            onOpenTransactionCoordination={() => navigateTo('/transaction-coordination/')}
          />
        ) : isSouthFloridaTcPage ? (
          <SouthFloridaTransactionCoordinatorPage
            onBookCall={() => navigateTo(bookPath)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onGoHome={() => navigateTo('/')}
            onOpenPricing={() => navigateTo('/pricing/')}
            onOpenHowItWorks={() => navigateTo(howPath)}
            onOpenWhyHtc={() => navigateTo(whyPath)}
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
            onBookCall={() => navigateTo(bookPath)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onGoHome={() => navigateTo('/')}
            onOpenPricing={() => navigateTo('/pricing/')}
            onOpenHowItWorks={() => navigateTo(howPath)}
            onOpenWhyHtc={() => navigateTo(whyPath)}
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
            onBookCall={() => navigateTo(bookPath)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onGoHome={() => navigateTo('/')}
            onOpenPricing={() => navigateTo('/pricing/')}
            onOpenHowItWorks={() => navigateTo(howPath)}
            onOpenWhyHtc={() => navigateTo(whyPath)}
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
            onBookCall={() => navigateTo(bookPath)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onGoHome={() => navigateTo('/')}
            onOpenPricing={() => navigateTo('/pricing/')}
            onOpenHowItWorks={() => navigateTo(howPath)}
            onOpenWhyHtc={() => navigateTo(whyPath)}
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
            onBookCall={() => navigateTo(bookPath)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onGoHome={() => navigateTo('/')}
            onOpenPricing={() => navigateTo('/pricing/')}
          />
        ) : isPricingPage ? (
          <PricingPlansPage
            language={language}
            onBookCall={() => navigateTo(bookPath)}
            onSubmitDeal={() => navigateTo(submitPath)}
            onGoHome={() => navigateTo(homePath)}
            onOpenTransactionCoordination={() => navigateTo('/transaction-coordination/')}
            onOpenListingCoordination={() => navigateTo('/listing-coordination/')}
            onOpenHowItWorks={() => navigateTo(howPath)}
            onOpenWhyHtc={() => navigateTo(whyPath)}
            onOpenRoi={() => navigateTo('/agent-business-calculator/')}
            onOpenTcWorkshop={() => navigateTo('/tcworkshop/')}
            onOpenFaq={() => navigateTo('/faq/')}
          />
        ) : isMeetTheTribePage ? (
          <MeetTheTribePage
            language={language}
            onBookCall={() => navigateTo(bookPath)}
            onSubmitDeal={() => navigateTo(submitPath)}
            onGoHome={() => navigateTo(homePath)}
            onOpenAboutMichelle={() => navigateTo(aboutPath)}
            onOpenHowItWorks={() => navigateTo(howPath)}
            onOpenWhyHtc={() => navigateTo(whyPath)}
            onOpenPricing={() => navigateTo(pricingPath)}
            onOpenTransactionCoordination={() => navigateTo('/transaction-coordination/')}
            onOpenListingCoordination={() => navigateTo('/listing-coordination/')}
            onOpenFaq={() => navigateTo('/faq/')}
          />
        ) : isAboutPage ? (
          <AboutMichellePage
            language={language}
            onBookCall={() => navigateTo(bookPath)}
            onSubmitDeal={() => navigateTo(submitPath)}
            onGoHome={() => navigateTo(homePath)}
            onOpenHowItWorks={() => navigateTo(howPath)}
            onOpenWhyHtc={() => navigateTo(whyPath)}
            onOpenPricing={() => navigateTo(pricingPath)}
            onOpenTransactionCoordination={() => navigateTo('/transaction-coordination/')}
            onOpenListingCoordination={() => navigateTo('/listing-coordination/')}
            onOpenMeetTheTribe={() => navigateTo(teamPath)}
          />
        ) : isWhoWeSupportPage ? (
          <WhoWeSupportPage
            onBookCall={() => navigateTo(bookPath)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onGoHome={() => navigateTo('/')}
            onOpenPricing={() => navigateTo('/pricing/')}
            onOpenHowItWorks={() => navigateTo(howPath)}
            onOpenWhyHtc={() => navigateTo(whyPath)}
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
            onBookCall={() => navigateTo(bookPath)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onGoHome={() => navigateTo('/')}
            onOpenPricing={() => navigateTo('/pricing/')}
            onOpenHowItWorks={() => navigateTo(howPath)}
            onOpenWhyHtc={() => navigateTo(whyPath)}
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
            language={language}
            onGoHome={() => navigateTo(homePath)}
            onSubmitDeal={() => navigateTo(submitPath)}
            onOpenPricing={() => navigateTo(pricingPath)}
            onOpenFaq={() => navigateTo('/faq/')}
            onOpenHowItWorks={() => navigateTo(howPath)}
            onOpenWhyHtc={() => navigateTo(whyPath)}
            onOpenWhoWeSupport={() => navigateTo('/who-we-support/')}
            onOpenRoi={() => navigateTo('/agent-business-calculator/')}
          />
        ) : isSubmitDealPage ? (
          <SubmitDealPage
            language={language}
            onGoHome={() => navigateTo(homePath)}
            onOpenPricing={() => navigateTo(pricingPath)}
            onOpenFaq={() => navigateTo('/faq/')}
            onBookCall={() => navigateTo(bookPath)}
          />
        ) : isReviewsPage ? (
          <ReviewsPage
            onGoHome={() => navigateTo('/')}
            onBookCall={() => navigateTo(bookPath)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
          />
        ) : isBlogIndexPage ? (
          <BlogResourcesPage
            onGoHome={() => navigateTo('/')}
            onOpenPost={(slug) => navigateTo(`/resources/${slug}/`)}
            onBookCall={() => navigateTo(bookPath)}
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
            onBookCall={() => navigateTo(bookPath)}
          />
        ) : isBlogPostPage ? (
          <BlogPostPage
            slug={currentPostSlug}
            onBackToBlog={() => navigateTo('/resources/')}
            onBookCall={() => navigateTo(bookPath)}
            onOpenCalculator={(hash?: string) =>
              navigateTo(hash ? `/agent-business-calculator/#${hash}` : '/agent-business-calculator/')
            }
            onOpenHowItWorks={() => navigateTo(howPath)}
            onOpenPricing={() => navigateTo('/pricing/')}
            onOpenContractToClose={() => navigateTo('/contract-to-close-services/')}
            onOpenListingCoordination={() => navigateTo('/listing-coordination/')}
            onOpenGuides={() => navigateTo('/resources/free-guides-downloads/')}
            onOpenTcWorkshop={() => navigateTo('/tcworkshop/')}
            onOpenArticle={(slug) => navigateTo(`/resources/${slug}/`)}
          />
        ) : isCondoGuidePage ? (
          <CondoHoaGuidePage
            onGoHome={() => navigateTo('/')}
            onBookCall={() => navigateTo(bookPath)}
            onNavigate={(path) => navigateTo(path)}
          />
        ) : isResourceDetailPage ? (
          <ResourceLandingPage
            slug={currentResourceSlug}
            onBackToLibrary={() => navigateTo('/resources/free-guides-downloads/')}
            onNavigate={(path) => navigateTo(path)}
            onBookCall={() => navigateTo(bookPath)}
            onExploreServices={() => navigateTo('/pricing/')}
            onGoHome={() => navigateTo('/')}
            onOpenCalculator={() => navigateTo('/agent-business-calculator/')}
          />
        ) : isGuidesHubPage ? (
          <AgentToolkitPage
            onGoHome={() => navigateTo('/')}
            onBookCall={() => navigateTo(bookPath)}
            onNavigate={(path) => navigateTo(path)}
          />
        ) : isTcWorkshopPage ? (
          <TcWorkshopPage
            language={language}
            onGoHome={() => navigateTo(language === 'es' ? '/es/' : '/')}
            onBookCall={() => navigateTo(bookPath)}
          />
        ) : isAffiliateProgramPage ? (
          <AffiliateProgramPage
            language={language}
            onGoHome={() => navigateTo(language === 'es' ? '/es/' : '/')}
            onOpenWorkshop={() => navigateTo('/tcworkshop/')}
          />
        ) : isSpanishHomePage ? (
          <EnglishHomeView
            language="es"
            onBookCall={() => navigateTo('/es/agendar/')}
            onSubmitDeal={() => navigateTo('/es/enviar-transaccion/')}
            onSeeHowItWorks={() => navigateTo('/es/como-funciona/')}
            onExploreServices={() => navigateTo('/es/precios/')}
            onOpenAbout={() => navigateTo(aboutPath)}
            onOpenRoi={() => navigateTo('/agent-business-calculator/')}
            onOpenMeetTheTribe={() => navigateTo(teamPath)}
            onOpenMiamiTc={() => navigateTo('/miami-transaction-coordinator/')}
            onOpenMiamiDadeTc={() => navigateTo('/miami-dade-transaction-coordinator/')}
            onOpenBrowardTc={() => navigateTo('/broward-transaction-coordinator/')}
            onOpenSouthFloridaTc={() => navigateTo('/south-florida-transaction-coordinator/')}
          />
        ) : is404Page ? (
          <NotFoundPage
            onGoHome={() => navigateTo('/')}
            onOpenPricing={() => navigateTo('/pricing/')}
            onOpenFaq={() => navigateTo('/faq/')}
            onBookCall={() => navigateTo(bookPath)}
            requestedPath={currentPath}
          />
        ) : (
          <EnglishHomeView
            onBookCall={() => navigateTo(bookPath)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
            onSeeHowItWorks={() => navigateTo(howPath)}
            onExploreServices={() => setServicesPricingOpen(true)}
            onOpenAbout={() => setAboutOpen(true)}
            onOpenRoi={() => navigateTo('/agent-business-calculator/')}
            onOpenMeetTheTribe={() => navigateTo(teamPath)}
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
        onBookCall={() => navigateTo(bookPath)}
        onSubmitDeal={() => navigateTo(language === 'es' ? '/es/enviar-transaccion/' : '/submit-deal/')}
        onOpenRoi={() => navigateTo('/agent-business-calculator/')}
        onOpenHowItWorks={() => navigateTo(howPath)}
        onOpenWhyHtc={() => navigateTo(whyPath)}
        onOpenWhoWeSupport={() => navigateTo('/who-we-support/')}
        onOpenMiamiTc={() => navigateTo('/miami-transaction-coordinator/')}
        onOpenMiamiDadeTc={() => navigateTo('/miami-dade-transaction-coordinator/')}
        onOpenBrowardTc={() => navigateTo('/broward-transaction-coordinator/')}
        onOpenSouthFloridaTc={() => navigateTo('/south-florida-transaction-coordinator/')}
        onOpenContractToClose={() => navigateTo('/contract-to-close-services/')}
        onOpenRealtorTc={() => navigateTo('/transaction-coordinator-for-realtors/')}
        onOpenFaq={() => navigateTo('/faq/')}
        onOpenBookCallPage={() => navigateTo(bookPath)}
        onOpenTransactionCoordination={() => navigateTo('/transaction-coordination/')}
        onOpenListingCoordination={() => navigateTo('/listing-coordination/')}
        onOpenPricingPlans={() => navigateTo(language === 'es' ? '/es/precios/' : '/pricing/')}
        onOpenAbout={() => navigateTo(aboutPath)}
        onOpenMeetMichelle={() => navigateTo(aboutPath)}
        onOpenMeetTheTribe={() => navigateTo(teamPath)}
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

        {aboutOpen && (
          <AboutHtcModal
            isOpen={aboutOpen}
            onClose={() => setAboutOpen(false)}
            onBookCall={() => navigateTo(bookPath)}
          />
        )}

        {servicesPricingOpen && (
          <ServicesAndPricingModal
            isOpen={servicesPricingOpen}
            onClose={() => setServicesPricingOpen(false)}
            onBookCall={() => navigateTo(bookPath)}
            onSubmitDeal={() => navigateTo('/submit-deal/')}
          />
        )}
      </Suspense>

    </div>
  );
}

