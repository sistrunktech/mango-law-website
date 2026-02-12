import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const repoRoot = process.cwd();
const robotsPath = join(repoRoot, 'src/app/robots.ts');
const sitemapPath = join(repoRoot, 'src/app/sitemap.ts');

const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

assert(existsSync(robotsPath), `Missing file: ${robotsPath}`);
assert(existsSync(sitemapPath), `Missing file: ${sitemapPath}`);

if (errors.length) {
  for (const error of errors) console.error(`[seo:smoke] ${error}`);
  process.exit(1);
}

const robots = readFileSync(robotsPath, 'utf8');
const sitemap = readFileSync(sitemapPath, 'utf8');

assert(robots.includes("sitemap: 'https://mango.law/sitemap.xml'"), 'robots.ts must expose canonical sitemap URL.');
for (const route of ['/admin', '/client-updates', '/handoff/']) {
  assert(robots.includes(`'${route}'`), `robots.ts missing disallow route: ${route}`);
}

assert(sitemap.includes("const baseUrl = 'https://mango.law'"), 'sitemap.ts must use canonical base URL https://mango.law.');

const staticPagesMatch = sitemap.match(/const staticPages\s*=\s*\[(.*?)\]/s);
assert(Boolean(staticPagesMatch), 'Unable to parse staticPages array from sitemap.ts.');

if (staticPagesMatch) {
  const staticPagesBlock = staticPagesMatch[1];
  for (const route of [
    '/blog',
    '/resources/dui-checkpoints',
    '/domestic-violence-lawyer-delaware-oh',
    '/privacy',
    '/terms',
  ]) {
    assert(staticPagesBlock.includes(`'${route}'`), `sitemap.ts staticPages missing required route: ${route}`);
  }

  for (const forbiddenRoute of ['/admin', '/client-updates', '/handoff']) {
    assert(!staticPagesBlock.includes(`'${forbiddenRoute}'`), `sitemap.ts staticPages must not include private route: ${forbiddenRoute}`);
  }
}

if (errors.length) {
  for (const error of errors) console.error(`[seo:smoke] ${error}`);
  process.exit(1);
}

console.log('[seo:smoke] PASS');
