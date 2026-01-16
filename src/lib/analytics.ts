type DataLayerEvent = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
    gtag?: (...args: any[]) => void;
  }
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
}
