import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const SITE_URL = (process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://mango.law').replace(
  /\/$/,
  ''
);

const STATIC_PATHS = [
  '/',
  '/about',
  '/practice-areas',
  '/ovi-dui-defense-delaware-oh',
  '/criminal-defense-delaware-oh',
  '/drug-crime-lawyer-delaware-oh',
  '/sex-crime-defense-lawyer-delaware-oh',
  '/white-collar-crimes-attorney-delaware-oh',
  '/protection-order-lawyer-delaware-oh',
  '/personal-injury-lawyer-delaware-oh',
  '/reviews',
  '/contact',
  '/blog',
  '/glossary',
  '/of-counsel',
  '/locations',
  '/resources/dui-checkpoints',
  '/privacy',
  '/terms',
];

function asSitemapDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return undefined;
  return date.toISOString().slice(0, 10);
}

async function getBlogUrls() {
  const filePath = path.resolve(process.cwd(), 'src/data/blogPosts.ts');

  let fileText = '';
  try {
    fileText = await readFile(filePath, 'utf8');
  } catch {
    return [];
  }

  const slugs = Array.from(fileText.matchAll(/slug:\s*'([^']+)'/g), (match) => match[1]);
  const dates = Array.from(fileText.matchAll(/date:\s*'([^']+)'/g), (match) => match[1]);
  const count = Math.min(slugs.length, dates.length);

  return Array.from({ length: count }, (_, index) => {
    const lastmod = asSitemapDate(new Date(dates[index]));
    return {
      loc: `${SITE_URL}/blog/${slugs[index]}`,
      lastmod,
    };
  });
}

function toSitemapXml(urls) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  for (const url of urls) {
    lines.push('  <url>');
    lines.push(`    <loc>${url.loc}</loc>`);
    if (url.lastmod) lines.push(`    <lastmod>${url.lastmod}</lastmod>`);
    lines.push('  </url>');
  }

  lines.push('</urlset>');
  lines.push('');

  return lines.join('\n');
}

async function main() {
  const now = new Date();
  const staticUrls = STATIC_PATHS.map((pathName) => ({
    loc: `${SITE_URL}${pathName}`,
    lastmod: asSitemapDate(now),
  }));

  const blogUrls = await getBlogUrls();
  const urlsByLoc = new Map();
  for (const url of [...staticUrls, ...blogUrls]) urlsByLoc.set(url.loc, url);

  const urls = Array.from(urlsByLoc.values()).sort((a, b) => a.loc.localeCompare(b.loc));
  const xml = toSitemapXml(urls);

  const outputPath = path.join(DIST_DIR, 'sitemap.xml');
  await writeFile(outputPath, xml, 'utf8');
  console.log(`Generated sitemap: ${outputPath} (${urls.length} URLs)`);
}

main().catch((error) => {
  console.error('Failed to generate sitemap:', error);
  process.exitCode = 1;
});

