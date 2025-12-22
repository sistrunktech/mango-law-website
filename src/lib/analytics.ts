type DataLayerEvent = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
    gtag?: (...args: any[]) => void;
  }
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
