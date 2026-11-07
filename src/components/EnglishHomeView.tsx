import React from 'react';
import { Hero } from './Hero';
import { ProofBar } from './ProofBar';
import { HomeMethod } from './HomeMethod';
import { ChooseYourPath } from './ChooseYourPath';
import { AgentPain } from './AgentPain';
import { WhatMovesOffPlate } from './WhatMovesOffPlate';
import { RealAgentProof } from './RealAgentProof';
import { MichelleFounder } from './MichelleFounder';
import { FloridaPositioning } from './FloridaPositioning';
import { FinalCTA } from './FinalCTA';
import { usePageSeo } from '../hooks/usePageSeo';
import { getOrganizationSchema } from '../utils/seoUtils';
import type { Language } from '../types';

interface Props {
  language?: Language;
  onBookCall: () => void;
  onSubmitDeal: () => void;
  onSeeHowItWorks: () => void;
  onExploreServices: () => void;
  onOpenAbout: () => void;
  onOpenRoi: () => void;
  onOpenMeetTheTribe?: () => void;
  onOpenMiamiTc?: () => void;
  onOpenMiamiDadeTc?: () => void;
  onOpenBrowardTc?: () => void;
  onOpenSouthFloridaTc?: () => void;
}

export const EnglishHomeView: React.FC<Props> = ({
  onBookCall,
  onSubmitDeal,
  onSeeHowItWorks,
  onExploreServices,
  onOpenAbout,
  onOpenRoi,
  onOpenMeetTheTribe,
  onOpenMiamiTc,
  onOpenMiamiDadeTc,
  onOpenBrowardTc,
  onOpenSouthFloridaTc,
  language = 'en'
}) => {
  const es = language === 'es';
  usePageSeo({
    title: es
      ? 'Hometown TC en Español | Agencia Boutique de Apoyo Inmobiliario para Realtors en Florida'
      : 'Hometown TC | Boutique Real Estate Support Agency for Florida Realtors',
    description: es
      ? 'Apoyo inmobiliario boutique para Realtors en Florida: Lanzamiento de Listados, De Contrato a Cierre y Post-Cierre. Fundada en el Sur de Florida, con servicio en todo el estado.'
      : 'Boutique real estate support for Florida Realtors — from Listing Launch to Contract-to-Close and Post-Close. South Florida-founded, serving statewide.',
    canonicalUrl: es ? 'https://hometowntc.com/es/' : 'https://hometowntc.com/',
    language,
    alternates: [
      { lang: 'en', url: 'https://hometowntc.com/' },
      { lang: 'es', url: 'https://hometowntc.com/es/' }
    ],
    breadcrumbs: [
      es ? { name: 'Inicio', url: 'https://hometowntc.com/es/' } : { name: 'Home', url: 'https://hometowntc.com/' }
    ],
    structuredData: [
      getOrganizationSchema(language),
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Hometown Transaction Coordinators',
        url: es ? 'https://hometowntc.com/es/' : 'https://hometowntc.com/',
        inLanguage: es ? 'es-US' : 'en-US'
      }
    ]
  });

  return (
    <>
      {/* 1. HERO */}
      <Hero
        language={language}
        onBookCall={onBookCall}
        onSubmitDeal={onSubmitDeal}
        onSeeHowItWorks={onSeeHowItWorks}
        onExploreServices={onExploreServices}
      />

      {/* 2. PROOF BAR */}
      <ProofBar language={language} />

      {/* 3. INTRODUCE H.O.M.E. CLOSE METHOD */}
      <HomeMethod
        language={language}
        onSeeHowItWorks={onSeeHowItWorks}
        onOpenAbout={onOpenAbout}
        onBookCall={onBookCall}
      />

      {/* 4. CHOOSE YOUR PATH */}
      <ChooseYourPath
        language={language}
        onBookCall={onBookCall}
        onSubmitDeal={onSubmitDeal}
        onOpenRoi={onOpenRoi}
        onExploreServices={onExploreServices}
      />

      {/* 5. AGENT PAIN / RECOGNITION */}
      <AgentPain
        language={language}
        onBookCall={onBookCall}
      />

      {/* 6. WHAT MOVES OFF YOUR PLATE */}
      <WhatMovesOffPlate
        language={language}
        onSubmitDeal={onSubmitDeal}
        onExploreServices={onExploreServices}
      />

      {/* 7. REAL AGENT PROOF */}
      <RealAgentProof language={language} />

      {/* 8. MICHELLE MARTINEZ FOUNDER SPOTLIGHT & TEAM */}
      <MichelleFounder
        language={language}
        onOpenAbout={onOpenAbout}
        onBookCall={onBookCall}
        onOpenMeetTheTribe={onOpenMeetTheTribe}
      />

      {/* 9. FLORIDA POSITIONING */}
      <FloridaPositioning
        language={language}
        onBookCall={onBookCall}
        onOpenMiamiTc={onOpenMiamiTc}
        onOpenMiamiDadeTc={onOpenMiamiDadeTc}
        onOpenBrowardTc={onOpenBrowardTc}
        onOpenSouthFloridaTc={onOpenSouthFloridaTc}
      />

      {/* 10. FINAL CTA */}
      <FinalCTA
        language={language}
        onBookCall={onBookCall}
        onSubmitDeal={onSubmitDeal}
      />
    </>
  );
};
