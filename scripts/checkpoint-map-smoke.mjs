const targetValue = process.env.CHECKPOINT_MAP_SMOKE_URL;

if (!targetValue) {
  throw new Error('CHECKPOINT_MAP_SMOKE_URL is required (for example, https://staging.example.com).');
}

const targetUrl = new URL(targetValue);
if (!['http:', 'https:'].includes(targetUrl.protocol) || /^(localhost|127\.0\.0\.1|::1)$/i.test(targetUrl.hostname)) {
  throw new Error('CHECKPOINT_MAP_SMOKE_URL must be an http(s) deployed URL, not a local address.');
}

targetUrl.pathname = '/resources/dui-checkpoints';
targetUrl.search = '';
targetUrl.hash = '';

const { default: puppeteer } = await import('puppeteer');
const protectionBypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET?.trim();
const mapboxResponses = [];
const styleResponses = [];
const checkpointViewResponses = [];
const forbiddenWriteRequests = [];
const browser = await puppeteer.launch({ headless: true });

function summarizeResponse(response) {
  const url = new URL(response.url());
  return { status: response.status(), url: `${url.origin}${url.pathname}` };
}

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  if (protectionBypass) await page.setRequestInterception(true);
  page.on('response', (response) => {
    const url = response.url();
    const result = summarizeResponse(response);

    if (/mapbox\.com/i.test(url)) mapboxResponses.push(result);
    if (/api\.mapbox\.com\/styles\/v1\//i.test(url)) styleResponses.push(result);
    if (/\/rest\/v1\/public_dui_checkpoint(?:s|_announcements)(?:\?|$)/i.test(url)) {
      checkpointViewResponses.push(result);
    }
  });
  page.on('request', (request) => {
    if (
      !['GET', 'HEAD', 'OPTIONS'].includes(request.method()) &&
      /\/functions\/v1\/(?:submit-contact|submit-lead|chat-intake)(?:\?|$)/i.test(request.url())
    ) {
      forbiddenWriteRequests.push({ method: request.method(), url: new URL(request.url()).pathname });
    }

    if (protectionBypass) {
      const requestUrl = new URL(request.url());
      const isTargetOrigin = requestUrl.origin === targetUrl.origin;
      void request.continue(isTargetOrigin ? {
        headers: {
          ...request.headers(),
          'x-vercel-protection-bypass': protectionBypass,
          'x-vercel-set-bypass-cookie': 'true',
        },
      } : undefined);
    }
  });

  await page.goto(targetUrl.toString(), { waitUntil: 'domcontentloaded', timeout: 45_000 });
  const loadedUrl = new URL(page.url());
  if (loadedUrl.origin !== targetUrl.origin) {
    throw new Error(
      `The smoke target redirected to ${loadedUrl.origin}${loadedUrl.pathname}. ` +
      'For a protected Vercel preview, provide an existing VERCEL_AUTOMATION_BYPASS_SECRET.',
    );
  }
  await page.waitForFunction(
    () => [...document.querySelectorAll('h1, h2, h3')].some(
      (element) => element.textContent?.trim() === 'Live checkpoint map and recent history',
    ),
    { timeout: 20_000 },
  );
  const scrolledToMap = await page.evaluate(() => {
    const heading = [...document.querySelectorAll('h1, h2, h3')].find(
      (element) => element.textContent?.trim() === 'Live checkpoint map and recent history',
    );
    heading?.scrollIntoView({ block: 'center' });
    return Boolean(heading);
  });

  if (!scrolledToMap) {
    throw new Error('Could not locate the checkpoint map section to trigger deferred rendering.');
  }

  await page.waitForFunction(
    () => Boolean(document.querySelector('.mapboxgl-canvas')) || document.body.innerText.includes('Interactive map unavailable'),
    { timeout: 20_000 },
  );
  await page.waitForNetworkIdle({ idleTime: 500, timeout: 15_000 }).catch(() => undefined);

  const mapState = await page.evaluate(() => {
    const canvas = document.querySelector('.mapboxgl-canvas');
    const rect = canvas?.getBoundingClientRect();
    const text = document.body.innerText;

    return {
      canvasVisible: Boolean(rect && rect.width > 0 && rect.height > 0),
      hasFeedError: text.includes('Live data is temporarily unavailable.'),
      hasMapError: text.includes('Interactive map unavailable'),
    };
  });

  if (mapState.hasFeedError || mapState.hasMapError) {
    throw new Error('The deployed checkpoint page reported a map or feed error state.');
  }

  if (!mapState.canvasVisible) {
    throw new Error('The checkpoint map did not render a visible Mapbox canvas.');
  }

  if (forbiddenWriteRequests.length > 0) {
    throw new Error(`The read-only smoke check triggered a lead write: ${JSON.stringify(forbiddenWriteRequests)}.`);
  }

  const hasSuccessfulMapboxResponse = mapboxResponses.some(({ status }) => status >= 200 && status < 400);
  const hasSuccessfulStyleResponse = styleResponses.some(({ status }) => status >= 200 && status < 400);
  if (!hasSuccessfulMapboxResponse || !hasSuccessfulStyleResponse) {
    throw new Error(
      `Expected successful Mapbox and style HTTP responses; observed Mapbox=${JSON.stringify(mapboxResponses)}, style=${JSON.stringify(styleResponses)}.`,
    );
  }

  const successfulCheckpointViews = new Set(
    checkpointViewResponses
      .filter(({ status }) => status >= 200 && status < 400)
      .map(({ url }) => new URL(url).pathname),
  );
  if (
    ![...successfulCheckpointViews].some((path) => path.endsWith('/public_dui_checkpoints')) ||
    ![...successfulCheckpointViews].some((path) => path.endsWith('/public_dui_checkpoint_announcements'))
  ) {
    throw new Error(
      `Expected successful public checkpoint and announcement view responses; observed ${JSON.stringify(checkpointViewResponses)}.`,
    );
  }

  console.log(`[checkpoint-map:smoke] PASS ${targetUrl}`);
} finally {
  await browser.close();
}
