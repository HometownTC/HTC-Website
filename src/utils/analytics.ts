/**
 * Hometown TC — Google Analytics 4 (GA4) Event Dispatcher
 * Implements real-time tracking for the 7 official business conversion events
 * specified in the 2027 Website Build Project Book v1.3 (Section 11).
 *
 * NOTE: Duplicate legacy events (book_discovery_call, deal_intake_start,
 * calculator_interact, pricing_modal_view) have been removed to prevent double-counting.
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Official Book Section 11 Event Names
export type HtcGa4EventType =
  | 'book_call_click'
  | 'booking_complete'
  | 'pricing_plan_click'
  | 'submit_deal_start'
  | 'submit_deal_complete'
  | 'calculator_complete'
  | 'language_switch'
  | 'guide_download'
  | 'newsletter_signup';

export interface HtcGa4EventParams {
  category?: string;
  label?: string;
  value?: number;
  source?: string;
  cta_location?: string;
  plan_name?: string;
  pricing_tier?: string;
  calculator_type?: string;
  annual_units?: number;
  result_primary?: number;
  target_lang?: string;
  from_language?: string;
  to_language?: string;
  appointment_type?: string;
  provider?: string;
  deal_type?: string;
  status?: string;
  [key: string]: any;
}

/**
 * Fires a tracked conversion event to GA4 dataLayer / gtag without duplicate legacy events
 */
export function trackHtcEvent(eventName: HtcGa4EventType, params: HtcGa4EventParams = {}): void {
  if (typeof window === 'undefined') return;

  const eventPayload = {
    event: eventName,
    event_timestamp: new Date().toISOString(),
    ...params
  };

  // Push to dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventPayload);

  // Invoke gtag if initialized
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }

  // Developer feedback in development mode
  if ((import.meta as any).env?.DEV) {
    console.log(`[GA4 Event Fired: ${eventName}]`, params);
  }
}

// =============================================================================
// BOOK SECTION 11 SPECIFIED EVENT HANDLERS (CLEAN - ZERO DUPLICATES)
// =============================================================================

// 1. book_call_click: Triggered when user initiates fit call / calendar scheduling
export const trackBookCallClick = (source: string = 'header_button', ctaLocation: string = 'navbar') => {
  trackHtcEvent('book_call_click', {
    category: 'engagement',
    source,
    cta_location: ctaLocation,
    event_action: 'click_calendar_booking'
  });
};

// 2. booking_complete: Triggered when appointment is confirmed
export const trackBookingComplete = (appointmentType: string = '15_min_fit_call') => {
  trackHtcEvent('booking_complete', {
    category: 'conversion',
    appointment_type: appointmentType,
    provider: 'google_appointments'
  });
};

// 3. pricing_plan_click: Triggered when a specific plan button is clicked (e.g. Base, Pro, Listing)
export const trackPricingPlanClick = (planName: string, tier: string = 'standard') => {
  trackHtcEvent('pricing_plan_click', {
    category: 'pricing',
    plan_name: planName,
    pricing_tier: tier
  });
};

// 4. submit_deal_start: Triggered when user opens/starts transaction intake
export const trackSubmitDealStart = (source: string = 'submit_button') => {
  trackHtcEvent('submit_deal_start', {
    category: 'conversion',
    source,
    flow: 'fillout_deal_intake'
  });
};

// 5. submit_deal_complete: Triggered upon successful transaction intake
export const trackSubmitDealComplete = (dealType: string = 'contract_to_close') => {
  trackHtcEvent('submit_deal_complete', {
    category: 'conversion',
    deal_type: dealType,
    status: 'received'
  });
};

// 6. calculator_complete: Triggered when a valid calculation result displays
export const trackCalculatorComplete = (
  calculatorType: 'time-value' | 'in-house' | 'growth-scenario',
  annualUnits: number,
  resultPrimary: number
) => {
  trackHtcEvent('calculator_complete', {
    category: 'roi_tool',
    calculator_type: calculatorType,
    annual_units: annualUnits,
    result_primary: Math.round(resultPrimary)
  });
};

// 7. language_switch: Triggered when English/Spanish locale is toggled
export const trackLanguageSwitch = (targetLanguage: 'en' | 'es', fromLanguage: 'en' | 'es' = targetLanguage === 'es' ? 'en' : 'es') => {
  trackHtcEvent('language_switch', {
    category: 'localization',
    target_lang: targetLanguage,
    from_language: fromLanguage,
    to_language: targetLanguage
  });
};

// =============================================================================
// ALIASES FOR COMPONENT COMPATIBILITY (POINTING DIRECTLY TO CLEAN SECTION 11 EVENTS)
// =============================================================================
export const trackBookDiscoveryCall = trackBookCallClick;
export const trackDealIntakeStart = trackSubmitDealStart;
export const trackCalculatorInteract = trackCalculatorComplete;

// Helper for other events
export const trackGuideDownload = (guideTitle: string, format: string) =>
  trackHtcEvent('guide_download', { category: 'lead_magnet', guide_title: guideTitle, asset_format: format });

export const trackNewsletterSignup = (sourcePage: string) =>
  trackHtcEvent('newsletter_signup', { category: 'subscription', page_source: sourcePage });
