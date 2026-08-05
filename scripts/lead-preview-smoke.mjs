const targetValue = process.env.LEAD_PREVIEW_SMOKE_URL;

if (!targetValue) {
  throw new Error('LEAD_PREVIEW_SMOKE_URL is required (for example, https://preview.example.com).');
}

const targetUrl = new URL(targetValue);
if (!['http:', 'https:'].includes(targetUrl.protocol) || /^(localhost|127\.0\.0\.1|::1)$/i.test(targetUrl.hostname)) {
  throw new Error('LEAD_PREVIEW_SMOKE_URL must be an http(s) deployed URL, not a local address.');
}

const { default: puppeteer } = await import('puppeteer');
const protectionBypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET?.trim();
const leadEndpoint = /\/functions\/v1\/(?:submit-contact|submit-lead|chat-intake)(?:\?|$)/i;
const writes = [];
const escapedWrites = [];
const blockedTelemetry = [];
const browser = await puppeteer.launch({ headless: true });

function routeUrl(pathname) {
  return new URL(pathname, targetUrl.origin).toString();
}

function describeLocation(value) {
  const url = new URL(value);
  return `${url.origin}${url.pathname}`;
}

function isVercelLogin(value) {
  const url = new URL(value);
  return /vercel\.com$/i.test(url.hostname) || /\/_vercel\/(?:login|sso)/i.test(url.pathname);
}

function isAnalyticsCollection(value) {
  const url = new URL(value);
  return url.hostname === 'analytics.ahrefs.com' ||
    ((/(^|\.)google-analytics\.com$/i.test(url.hostname) ||
      /(^|\.)googletagmanager\.com$/i.test(url.hostname) ||
      url.hostname === 'www.google.com') && /\/(?:g\/|j\/)?collect(?:\/|$)/i.test(url.pathname));
}

async function fillAndSubmit(page, pathname, formSelector, fields, checkpointId) {
  await page.goto(routeUrl(pathname), { waitUntil: 'domcontentloaded', timeout: 45_000 });
  const loaded = page.url();
  if (isVercelLogin(loaded)) {
    throw new Error('Vercel login redirect detected. Provide an existing VERCEL_AUTOMATION_BYPASS_SECRET for this preview.');
  }
  if (new URL(loaded).origin !== targetUrl.origin) {
    throw new Error(`Smoke target redirected to ${describeLocation(loaded)} instead of ${targetUrl.origin}.`);
  }
  if (pathname === '/') {
    for (let attempt = 0; attempt < 24 && !(await page.$(formSelector)); attempt += 1) {
      await page.evaluate(() => window.scrollBy(0, Math.max(window.innerHeight * 0.8, 600)));
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  await page.waitForSelector(formSelector, { timeout: 20_000 });
  await page.evaluate(() => {
    if (!document.querySelector('script[src*="googletagmanager.com/gtm.js"]')) {
      const gtm = document.createElement('script');
      gtm.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-LEADSMOKE';
      document.head.appendChild(gtm);
    }
  });

  const phoneLink = await page.$(`${formSelector} a[href^="tel:"]`);
  if (!phoneLink) throw new Error(`Missing Turnstile fallback phone link on ${pathname}.`);
  const phoneHref = await phoneLink.evaluate((element) => element.getAttribute('href'));
  if (!/^tel:\+?\d{10,15}$/.test(phoneHref || '')) throw new Error(`Unsafe fallback telephone href: ${phoneHref}.`);

  const analyticsBefore = await page.evaluate(() => ({
    dataLayer: (window.dataLayer || []).length,
    gtag: (window.__leadSmokeGtagCalls || []).length,
  }));
  await phoneLink.evaluate((element) => element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })));
  await page.waitForFunction((start) => (window.dataLayer || []).length >= start + 2, {}, analyticsBefore.dataLayer);
  const fallbackAnalytics = await page.evaluate((start) => ({
    events: (window.dataLayer || []).slice(start),
    gtag: (window.__leadSmokeGtagCalls || []).length,
  }), analyticsBefore.dataLayer);
  const fallbackEvents = fallbackAnalytics.events.filter((event) =>
    event?.checkpoint_id === checkpointId || event?.cta === checkpointId
  );
  if (fallbackEvents.filter((event) => event?.event === 'cta_click' && event?.cta === checkpointId).length !== 1 ||
      fallbackEvents.filter((event) => event?.event === 'lead_submitted' && event?.checkpoint_id === checkpointId && event?.lead_source === 'phone').length !== 1 ||
      fallbackAnalytics.gtag !== analyticsBefore.gtag) {
    throw new Error(`Fallback analytics contract failed on ${pathname}: ${JSON.stringify(fallbackEvents)}.`);
  }

  await page.evaluate(() => window.__leadSmokePassTurnstile());
  for (const [name, value] of Object.entries(fields)) await page.locator(`${formSelector} [name="${name}"]`).fill(value);
  await page.locator(`${formSelector} button[type="submit"]`).click();
  await page.waitForFunction(() => document.body.innerText.includes('Message Sent'), { timeout: 15_000 });
}

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.setRequestInterception(true);
  await page.evaluateOnNewDocument(() => {
    window.__leadSmokeGtagCalls = [];
    window.gtag = (...args) => window.__leadSmokeGtagCalls.push(args);
    document.addEventListener('click', (event) => {
      if (event.target.closest('a[href^="tel:"]')) event.preventDefault();
    }, true);
    const callbacks = [];
    window.turnstile = {
      render: (_container, options) => { callbacks.push(options.callback); return `smoke-${callbacks.length}`; },
      remove: () => {},
    };
    window.__leadSmokePassTurnstile = () => callbacks.splice(0).forEach((callback) => callback('smoke-turnstile-token'));
  });
  page.on('request', (request) => {
    const method = request.method();
    const url = request.url();
    if (leadEndpoint.test(url)) {
      if (method === 'OPTIONS') return void request.respond({ status: 204, headers: { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'POST, OPTIONS' } });
      if (method === 'POST') {
        writes.push({ url: describeLocation(url), payload: request.postData() || '' });
        return void request.respond({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ ok: true }) });
      }
      return void request.abort('blockedbyclient');
    }
    if (isAnalyticsCollection(url)) {
      blockedTelemetry.push({ method, url: describeLocation(url) });
      return void request.abort('blockedbyclient');
    }
    if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
      escapedWrites.push({ method, url: describeLocation(url) });
      return void request.abort('blockedbyclient');
    }
    const requestUrl = new URL(url);
    return void request.continue(protectionBypass && requestUrl.origin === targetUrl.origin ? {
      headers: { ...request.headers(), 'x-vercel-protection-bypass': protectionBypass, 'x-vercel-set-bypass-cookie': 'true' },
    } : undefined);
  });

  const qa = { name: 'Mango QA Preview', email: 'qa-preview@example.invalid', phone: '6145550199', message: 'Synthetic smoke test only.' };
  const contactWrites = writes.length;
  await fillAndSubmit(page, '/contact', 'form:has([data-cta="contact_form_submit"])', { ...qa, case_type: 'ovi_dui' }, 'contact_form_turnstile_fallback_call');
  if (writes.length !== contactWrites + 1) throw new Error(`Contact form made ${writes.length - contactWrites} POSTs, expected one.`);
  const quickIntakeWrites = writes.length;
  await fillAndSubmit(page, '/', 'form:has([data-cta="quick_intake_submit"])', qa, 'quick_intake_turnstile_fallback_call');
  if (writes.length !== quickIntakeWrites + 1) throw new Error(`Quick Intake made ${writes.length - quickIntakeWrites} POSTs, expected one.`);
  if (escapedWrites.length) throw new Error(`Unexpected write escape blocked: ${JSON.stringify(escapedWrites)}.`);
  if (writes.length !== 2 || writes.some(({ payload }) => !payload.includes('qa-preview@example.invalid') || !payload.includes('smoke-turnstile-token'))) {
    throw new Error(`Expected exactly two intercepted synthetic lead POSTs: ${JSON.stringify(writes)}.`);
  }
  console.log(`[lead:preview-smoke] PASS ${targetUrl.origin} (2 synthetic submissions intercepted; ${blockedTelemetry.length} analytics requests blocked)`);
} finally {
  await browser.close();
}
