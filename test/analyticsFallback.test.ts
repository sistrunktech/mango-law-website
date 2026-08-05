import assert from 'node:assert/strict';

import {
  extractGa4MeasurementIdFromScripts,
  hasGtmContainerScript,
  hasGrantedAnalyticsConsent,
  trackFallbackPhoneLead,
  trackLeadSubmitted,
} from '../src/lib/analytics.ts';

assert.equal(
  extractGa4MeasurementIdFromScripts([
    'https://www.googletagmanager.com/gtag/js?id=G-NJZD79GGFG&cx=c&gtm=4e6460',
  ]),
  'G-NJZD79GGFG'
);

assert.equal(
  extractGa4MeasurementIdFromScripts([
    'https://www.googletagmanager.com/gtm.js?id=GTM-WLJQZKB5',
    'https://example.com/app.js',
  ]),
  null
);

assert.equal(hasGrantedAnalyticsConsent({ analytics_storage: 'granted' }), true);
assert.equal(hasGrantedAnalyticsConsent({ analytics_storage: 'denied' }), false);
assert.equal(hasGrantedAnalyticsConsent(null), false);
assert.equal(hasGtmContainerScript(['https://www.googletagmanager.com/gtm.js?id=GTM-WLJQZKB5']), true);
assert.equal(hasGtmContainerScript(['https://www.googletagmanager.com/gtag/js?id=G-NJZD79GGFG']), false);

const originalWindow = globalThis.window;
const originalDocument = globalThis.document;

const gtagCalls: unknown[][] = [];
const dataLayer: Record<string, unknown>[] = [];

globalThis.window = {
  dataLayer,
  gtag: (...args: unknown[]) => {
    gtagCalls.push(args);
  },
  __mlConsent: {
    get: () => ({ analytics_storage: 'granted' }),
  },
} as typeof globalThis.window;

globalThis.document = {
  scripts: [
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-NJZD79GGFG&cx=c&gtm=4e6460',
    },
  ],
} as typeof globalThis.document;

try {
  trackLeadSubmitted('form', 'contact_form_submit', { target_email: 'office@mango.law' });

  assert.equal(dataLayer.length, 1);
  assert.equal(dataLayer[0]?.event, 'lead_submitted');
  assert.equal(dataLayer[0]?.checkpoint_id, 'contact_form_submit');

  assert.equal(gtagCalls.length, 3);
  assert.equal(gtagCalls[0]?.[0], 'js');
  assert.equal(gtagCalls[1]?.[0], 'config');
  assert.equal(gtagCalls[1]?.[1], 'G-NJZD79GGFG');
  assert.deepEqual(gtagCalls[1]?.[2], { send_page_view: false });
  assert.equal(gtagCalls[2]?.[0], 'event');
  assert.equal(gtagCalls[2]?.[1], 'generate_lead');
  assert.deepEqual(gtagCalls[2]?.[2], {
    lead_source: 'form',
    checkpoint_id: 'contact_form_submit',
    target_email: 'office@mango.law',
  });

  trackLeadSubmitted('phone', 'contact_page_call_office');
  assert.equal(gtagCalls.length, 4);
  assert.equal(gtagCalls[3]?.[0], 'event');
  assert.equal(gtagCalls[3]?.[1], 'generate_lead');

  trackLeadSubmitted('email', 'contact_page_email_office', { target_email: 'office@mango.law' });
  assert.equal(gtagCalls.length, 5);
  assert.equal(gtagCalls[4]?.[0], 'event');
  assert.equal(gtagCalls[4]?.[1], 'generate_lead');
  assert.deepEqual(gtagCalls[4]?.[2], {
    lead_source: 'email',
    checkpoint_id: 'contact_page_email_office',
    target_email: 'office@mango.law',
  });

  trackLeadSubmitted('chat', 'chat_widget', { source: 'chat_widget' });
  assert.equal(gtagCalls.length, 6);
  assert.equal(gtagCalls[5]?.[0], 'event');
  assert.equal(gtagCalls[5]?.[1], 'generate_lead');
  assert.deepEqual(gtagCalls[5]?.[2], {
    lead_source: 'chat',
    checkpoint_id: 'chat_widget',
    source: 'chat_widget',
  });

  globalThis.document = {
    scripts: [
      { src: 'https://www.googletagmanager.com/gtm.js?id=GTM-WLJQZKB5' },
      { src: 'https://www.googletagmanager.com/gtag/js?id=G-NJZD79GGFG' },
    ],
  } as typeof globalThis.document;
  const gtagCallCount = gtagCalls.length;
  const dataLayerCount = dataLayer.length;
  trackFallbackPhoneLead('lead_backend_fallback_call', {
    target_number: '4191234567',
  });

  assert.equal(dataLayer.length, dataLayerCount + 2);
  assert.equal(dataLayer.slice(dataLayerCount).filter((event) => event.event === 'lead_submitted').length, 1);
  assert.equal(dataLayer.at(-2)?.event, 'cta_click');
  assert.equal(dataLayer.at(-2)?.cta, 'lead_backend_fallback_call');
  assert.equal(dataLayer.at(-1)?.event, 'lead_submitted');
  assert.equal(dataLayer.at(-1)?.lead_source, 'phone');
  assert.equal(gtagCalls.length, gtagCallCount);
} finally {
  globalThis.window = originalWindow;
  globalThis.document = originalDocument;
}
