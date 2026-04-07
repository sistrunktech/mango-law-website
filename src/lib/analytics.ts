type DataLayerEvent = Record<string, unknown>;

type ConsentSnapshot = {
  analytics_storage?: 'granted' | 'denied';
};

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
    gtag?: (...args: any[]) => void;
    __mlGa4FallbackConfiguredIds?: string[];
  }
}

function hasGrantedAnalyticsConsent(consent: ConsentSnapshot | null | undefined): boolean {
  return consent?.analytics_storage === 'granted';
}

function extractGa4MeasurementIdFromScripts(scriptSources: string[]): string | null {
  for (const src of scriptSources) {
    if (!src || !src.includes('googletagmanager.com/gtag/js')) continue;
    try {
      const id = new URL(src).searchParams.get('id');
      if (id) return id;
    } catch {
      continue;
    }
  }
  return null;
}

function dispatchGa4FallbackEvent(eventName: string, params: Record<string, unknown>): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  const consent = window.__mlConsent?.get?.() as ConsentSnapshot | null | undefined;
  if (!hasGrantedAnalyticsConsent(consent)) return false;
  if (typeof window.gtag !== 'function') return false;

  const measurementId = extractGa4MeasurementIdFromScripts(
    Array.from(document.scripts, (script) => script.src)
  );
  if (!measurementId) return false;

  window.__mlGa4FallbackConfiguredIds = window.__mlGa4FallbackConfiguredIds || [];
  if (!window.__mlGa4FallbackConfiguredIds.includes(measurementId)) {
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { send_page_view: false });
    window.__mlGa4FallbackConfiguredIds.push(measurementId);
  }

  window.gtag('event', eventName, params);
  return true;
}

// AI traffic detection functions
function detectTrafficOriginType(): 'direct' | 'search' | 'ai' | 'referral' {
  if (typeof window === 'undefined') return 'direct';
  
  const referrer = document.referrer;
  if (referrer.includes('chat.openai.com') || referrer.includes('claude.ai') || 
      referrer.includes('perplexity.ai') || referrer.includes('bing.com/search')) {
    return 'ai';
  }
  if (referrer.includes('google.com') || referrer.includes('bing.com')) {
    return 'search';
  }
  if (referrer) {
    return 'referral';
  }
  return 'direct';
}

function detectTrafficOriginSource(): 'google' | 'chatgpt' | 'claude' | 'perplexity' | 'bing' | 'direct' {
  if (typeof window === 'undefined') return 'direct';
  
  const referrer = document.referrer;
  if (referrer.includes('chat.openai.com')) return 'chatgpt';
  if (referrer.includes('claude.ai')) return 'claude';
  if (referrer.includes('perplexity.ai')) return 'perplexity';
  if (referrer.includes('google.com')) return 'google';
  if (referrer.includes('bing.com')) return 'bing';
  return 'direct';
}

export function trackPageView(pageTitle: string) {
  if (typeof window === 'undefined') return;

  const page_location = window.location.href;
  const page_path = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  
  // AI traffic detection
  const traffic_origin_type = detectTrafficOriginType();
  const traffic_origin_source = detectTrafficOriginSource();

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'mango_page_view',
    page_title: pageTitle,
    page_location,
    page_path,
    traffic_origin_type,
    traffic_origin_source,
  });
}

export function trackCtaClick(cta: string, extra?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'cta_click',
    cta,
    ...extra,
  });
}

export function trackExperimentExposure(
  experiment_id: string,
  variant: 'A' | 'B',
  extra?: Record<string, unknown>
) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'experiment_exposure',
    experiment_id,
    variant,
    ...extra,
  });
}

export function trackLeadModalOpen(trigger: string) {
  trackCtaClick('lead_modal_open', { trigger });
}

export function trackChatOpen(source: string) {
  trackCtaClick('chat_open', { source });
}

export function trackLeadSubmitted(
  lead_source: 'form' | 'phone' | 'email' | 'chat',
  checkpoint_id: string,
  extra?: Record<string, unknown>
) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'lead_submitted',
    lead_source,
    checkpoint_id,
    ...extra,
  });

  dispatchGa4FallbackEvent('lead_submitted', {
    lead_source,
    checkpoint_id,
    ...extra,
  });
}

export { extractGa4MeasurementIdFromScripts, hasGrantedAnalyticsConsent };
