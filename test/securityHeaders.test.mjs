import assert from 'node:assert/strict';
import nextConfig from '../next.config.mjs';

const headerRules = await nextConfig.headers();
const globalRule = headerRules.find((rule) => rule.source === '/:path*');
const contentSecurityPolicy = globalRule?.headers.find(
  (header) => header.key === 'Content-Security-Policy',
)?.value;

assert.ok(contentSecurityPolicy, 'global Content-Security-Policy header should be configured');

for (const source of [
  'https://*.google-analytics.com',
  'https://*.analytics.google.com',
  'https://*.googletagmanager.com',
  'https://*.g.doubleclick.net',
  'https://*.google.com',
]) {
  assert.match(
    contentSecurityPolicy,
    new RegExp(`connect-src[^;]*${source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`),
    `GA4 collection source ${source} should be permitted by connect-src`,
  );
}

assert.match(
  contentSecurityPolicy,
  /script-src[^;]*https:\/\/analytics\.ahrefs\.com/,
  'the configured Ahrefs Web Analytics script should be permitted by script-src',
);
assert.match(
  contentSecurityPolicy,
  /connect-src[^;]*https:\/\/analytics\.ahrefs\.com/,
  'Ahrefs Web Analytics events should be permitted by connect-src',
);

console.log('securityHeaders tests passed');
