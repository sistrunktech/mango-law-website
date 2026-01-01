import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { Plugin } from 'vite';

type SitemapUrl = { loc: string; lastmod?: string };

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
  '/ovi-checkpoints-ohio',
  '/delaware-ohio-ovi-lawyer',
  '/holiday-ovi-enforcement-ohio',
  '/privacy',
  '/terms',
];

function asSitemapDate(date: Date): string | undefined {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return undefined;
  return date.toISOString().slice(0, 10);
}

async function getBlogUrls(siteUrl: string): Promise<SitemapUrl[]> {
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

  return Array.from({ length: count }, (_, index) => ({
    loc: `${siteUrl}/blog/${slugs[index]}`,
    lastmod: asSitemapDate(new Date(dates[index])),
  }));
}

function toSitemapXml(urls: SitemapUrl[]): string {
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

export default function sitemapPlugin(): Plugin {
  let outDir = path.resolve(process.cwd(), 'dist');

  return {
    name: 'mango-sitemap',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(process.cwd(), config.build.outDir || 'dist');
    },
    async closeBundle() {
      const siteUrlRaw = process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://mango.law';
      const siteUrl = siteUrlRaw.replace(/\/$/, '');
      const now = new Date();

      const staticUrls: SitemapUrl[] = STATIC_PATHS.map((pathname) => ({
        loc: `${siteUrl}${pathname}`,
        lastmod: asSitemapDate(now),
      }));

      const blogUrls = await getBlogUrls(siteUrl);
      const urlsByLoc = new Map<string, SitemapUrl>();
      for (const url of [...staticUrls, ...blogUrls]) urlsByLoc.set(url.loc, url);

      const urls = Array.from(urlsByLoc.values()).sort((a, b) => a.loc.localeCompare(b.loc));
      const xml = toSitemapXml(urls);

      await writeFile(path.join(outDir, 'sitemap.xml'), xml, 'utf8');
    },
  };
}
