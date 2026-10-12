/**
 * Hometown TC — Google Analytics 4 (GA4) Event Dispatcher
 * Implements real-time tracking for the 7 key business conversion events.
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export type HtcGa4EventType =
  | 'book_discovery_call'
  | 'deal_intake_start'
  | 'calculator_interact'
  | 'pricing_modal_view'
  | 'guide_download'
  | 'newsletter_signup'
  | 'language_switch';

export interface HtcGa4EventParams {
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

/**
 * Fires a tracked conversion event to GA4 dataLayer / gtag
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
  if (import.meta.env.DEV) {
    console.log(`[GA4 Event Fired] ${eventName}`, params);
  }
}

// Convenience helpers for the 7 core events:

export const trackBookDiscoveryCall = (source: string = 'header_button') =>
  trackHtcEvent('book_discovery_call', {
    category: 'engagement',
    label: source,
    event_action: 'click_calendar_booking'
  });

export const trackDealIntakeStart = (source: string = 'submit_button') =>
  trackHtcEvent('deal_intake_start', {
    category: 'conversion',
    label: source,
    event_action: 'initiate_deal_intake'
  });

export const trackCalculatorInteract = (mode: string, volume: number) =>
  trackHtcEvent('calculator_interact', {
    category: 'roi_tool',
    calculator_mode: mode,
    transaction_volume: volume
  });

export const trackPricingModalView = (planSelected?: string) =>
  trackHtcEvent('pricing_modal_view', {
    category: 'pricing',
    plan_name: planSelected || 'all_plans'
  });

export const trackGuideDownload = (guideTitle: string, format: string) =>
  trackHtcEvent('guide_download', {
    category: 'lead_magnet',
    guide_title: guideTitle,
    asset_format: format
  });

export const trackNewsletterSignup = (sourcePage: string) =>
  trackHtcEvent('newsletter_signup', {
    category: 'subscription',
    page_source: sourcePage
  });

export const trackLanguageSwitch = (targetLanguage: 'en' | 'es') =>
  trackHtcEvent('language_switch', {
    category: 'localization',
    target_lang: targetLanguage
  });
