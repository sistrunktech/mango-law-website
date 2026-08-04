import assert from 'node:assert/strict';
import nextConfig from '../next.config.mjs';

const headerRules = await nextConfig.headers();
const globalRule = headerRules.find((rule) => rule.source === '/:path*');
const contentSecurityPolicy = globalRule?.headers.find(
  (header) => header.key === 'Content-Security-Policy',
)?.value;

assert.ok(contentSecurityPolicy, 'global Content-Security-Policy header should be configured');

const sourcesForDirective = (directiveName) => {
  const directive = contentSecurityPolicy
    .split(';')
    .map((value) => value.trim())
    .find((value) => value.startsWith(`${directiveName} `));

  assert.ok(directive, `${directiveName} directive should be configured`);

  return new Set(directive.split(/\s+/).slice(1));
};

const connectSources = sourcesForDirective('connect-src');

for (const source of [
  'https://*.google-analytics.com',
  'https://*.analytics.google.com',
  'https://*.googletagmanager.com',
  'https://*.g.doubleclick.net',
  'https://*.google.com',
]) {
  assert.ok(
    connectSources.has(source),
    `GA4 collection source ${source} should be permitted by connect-src`,
  );
}

assert.ok(
  sourcesForDirective('script-src').has('https://analytics.ahrefs.com'),
  'the configured Ahrefs Web Analytics script should be permitted by script-src',
);
assert.ok(
  connectSources.has('https://analytics.ahrefs.com'),
  'Ahrefs Web Analytics events should be permitted by connect-src',
);

console.log('securityHeaders tests passed');
