import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../scripts/lead-preview-smoke.mjs', import.meta.url), 'utf8');

assert.match(source, /LEAD_PREVIEW_SMOKE_URL is required/);
assert.match(source, /page\.setRequestInterception\(true\)/);
assert.match(source, /method === 'OPTIONS'/);
assert.match(source, /method === 'POST'/);
assert.match(source, /request\.abort\('blockedbyclient'\)/);
assert.match(source, /isAnalyticsCollection[\s\S]*blockedTelemetry/);
assert.match(source, /requestUrl\.origin === targetUrl\.origin/);
assert.match(source, /Vercel login redirect detected/);
assert.match(source, /__leadSmokePassTurnstile/);
assert.match(source, /lead_submitted/);
assert.match(source, /qa-preview@example\.invalid/);
assert.match(source, /page\.\$\(formSelector\)[\s\S]*window\.scrollBy/);
