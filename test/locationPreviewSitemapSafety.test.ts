import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { metadata, unionCountyLocationSeo } from '../src/app/(site)/ovi-dui-defense-union-county-oh/metadata.ts';
import { buildSitemapEntries } from '../src/lib/sitemapEntries.ts';

const previewPath = '/ovi-dui-defense-union-county-oh';
const routeSource = readFileSync('src/app/(site)/ovi-dui-defense-union-county-oh/page.tsx', 'utf8');

assert.equal(
  unionCountyLocationSeo.noindex,
  true,
  'Union County location preview SEO config must stay noindexed until production approval'
);

assert.deepEqual(metadata.robots, {
  index: false,
  follow: false,
});

assert.equal(
  routeSource.includes('StructuredData'),
  true,
  'Union County location preview should keep FAQ and breadcrumb structured-data wiring'
);

assert.equal(
  routeSource.includes("export { metadata } from './metadata';"),
  true,
  'Union County location preview route must use the exported server metadata'
);

const generatedSitemapEntries = buildSitemapEntries({
  baseUrl: 'https://mango.law',
  blogPosts: [],
});

assert.equal(
  generatedSitemapEntries.some((entry) => entry.url.endsWith(previewPath)),
  false,
  'Union County location preview must not appear in sitemap until approval'
);
