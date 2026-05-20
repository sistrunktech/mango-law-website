const STATIC_LASTMOD = new Date('2026-03-24T00:00:00.000Z');

export const ROUTE_LASTMOD: Record<string, Date> = {
  '/blog': new Date('2026-05-20T00:00:00.000Z'),
  '/ovi-dui-defense-delaware-oh': new Date('2026-05-19T00:00:00.000Z'),
  '/drug-crime-lawyer-delaware-oh': new Date('2026-05-03T00:00:00.000Z'),
  '/protection-order-lawyer-delaware-oh': new Date('2026-05-03T00:00:00.000Z'),
  '/domestic-violence-lawyer-delaware-oh': new Date('2026-05-03T00:00:00.000Z'),
  '/criminal-defense-delaware-oh': new Date('2026-05-20T00:00:00.000Z'),
  '/resources/dui-checkpoints': new Date('2026-05-19T00:00:00.000Z'),
  '/ovi-checkpoints-ohio': new Date('2026-05-03T00:00:00.000Z'),
  '/first-offense-ovi-ohio': new Date('2026-05-19T00:00:00.000Z'),
  '/als-license-suspension-ohio': new Date('2026-05-19T00:00:00.000Z'),
};

export type BlogPostSitemapSeed = {
  slug: string;
  date: string;
  lastVerified?: string;
};

export type SitemapEntrySeed = {
  page: string;
  lastModified: Date;
};

const privatePrefixes = ['/client-updates', '/admin', '/handoff'];

export const staticPages = [
  '',
  '/about',
  '/practice-areas',
  '/ovi-dui-defense-delaware-oh',
  '/criminal-defense-delaware-oh',
  '/drug-crime-lawyer-delaware-oh',
  '/sex-crime-defense-lawyer-delaware-oh',
  '/white-collar-crimes-attorney-delaware-oh',
  '/protection-order-lawyer-delaware-oh',
  '/domestic-violence-lawyer-delaware-oh',
  '/personal-injury-lawyer-delaware-oh',
  '/reviews',
  '/contact',
  '/blog',
  '/glossary',
  '/of-counsel',
  '/locations',
  '/resources/dui-checkpoints',
  '/ovi-checkpoints-ohio',
  '/holiday-ovi-enforcement-ohio',
  '/first-offense-ovi-ohio',
  '/felony-ovi-lawyer-ohio',
  '/ovi-test-refusal-lawyer-ohio',
  '/als-license-suspension-ohio',
  '/motion-to-suppress-ovi-ohio',
  '/domestic-violence-first-offense-ohio-defense',
  '/civil-protection-order-defense-ohio',
  '/drug-possession-vs-trafficking-ohio-defense',
  '/privacy',
  '/terms',
];

export function parseSitemapDate(value: string | undefined) {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function mapBlogPostsToSitemapSeeds(posts: BlogPostSitemapSeed[]): SitemapEntrySeed[] {
  return posts.map((post) => ({
    page: `/blog/${post.slug}`,
    lastModified: parseSitemapDate(post.lastVerified) ?? parseSitemapDate(post.date) ?? STATIC_LASTMOD,
  }));
}

export function buildSitemapEntries(args: { baseUrl: string; blogPosts: SitemapEntrySeed[] }) {
  const allPages = [
    ...staticPages.map((page) => ({
      page,
      lastModified: ROUTE_LASTMOD[page] ?? STATIC_LASTMOD,
    })),
    ...args.blogPosts,
  ].filter(({ page }) => {
    return !privatePrefixes.some((prefix) => page === prefix || page.startsWith(`${prefix}/`));
  });

  return allPages.map(({ page, lastModified }) => ({
    url: `${args.baseUrl}${page}`,
    lastModified,
  }));
}
