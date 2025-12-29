export type ConsentValue = 'granted' | 'denied';

export type ConsentStateV2 = {
  analytics_storage: ConsentValue;
  ad_storage: ConsentValue;
  ad_user_data: ConsentValue;
  ad_personalization: ConsentValue;
};

declare global {
  interface Window {
    __mlConsent?: {
      cookieName: string;
      get: () => unknown;
      update: (next: ConsentStateV2) => void;
    };
    gtag?: (...args: any[]) => void;
  }
}

const DEFAULT_DENIED: ConsentStateV2 = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
};

export function getStoredConsent(): ConsentStateV2 | null {
  if (typeof window === 'undefined') return null;
  const value = window.__mlConsent?.get?.();
  if (!value || typeof value !== 'object') return null;
  const v = value as Partial<Record<keyof ConsentStateV2, unknown>>;
  const analytics_storage = v.analytics_storage === 'granted' ? 'granted' : 'denied';
  const ad_storage = v.ad_storage === 'granted' ? 'granted' : 'denied';
  const ad_user_data = v.ad_user_data === 'granted' ? 'granted' : 'denied';
  const ad_personalization = v.ad_personalization === 'granted' ? 'granted' : 'denied';
  return { analytics_storage, ad_storage, ad_user_data, ad_personalization };
}

export function setConsent(next: ConsentStateV2) {
  if (typeof window === 'undefined') return;
  if (window.__mlConsent?.update) {
    window.__mlConsent.update(next);
    return;
  }

  // Fallback: still emit consent update into dataLayer via gtag shim if present.
  window.gtag?.('consent', 'update', next);
}

export function acceptAllConsent(): ConsentStateV2 {
  return {
    analytics_storage: 'granted',
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  };
}

export function rejectAllConsent(): ConsentStateV2 {
  return { ...DEFAULT_DENIED };
}

