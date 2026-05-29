import { MetadataRoute } from 'next'
import { getPublicBlogPosts } from '@/lib/blogPostsRepo'

const STATIC_LASTMOD = new Date('2026-03-24T00:00:00.000Z')
const ROUTE_LASTMOD: Record<string, Date> = {
  '': new Date('2026-05-20T00:00:00.000Z'),
  '/blog': new Date('2026-05-20T00:00:00.000Z'),
  '/practice-areas': new Date('2026-05-20T00:00:00.000Z'),
  '/contact': new Date('2026-05-18T00:00:00.000Z'),
  '/ovi-dui-defense-delaware-oh': new Date('2026-05-19T00:00:00.000Z'),
  '/drug-crime-lawyer-delaware-oh': new Date('2026-05-03T00:00:00.000Z'),
  '/protection-order-lawyer-delaware-oh': new Date('2026-05-03T00:00:00.000Z'),
  '/domestic-violence-lawyer-delaware-oh': new Date('2026-05-03T00:00:00.000Z'),
  '/criminal-defense-delaware-oh': new Date('2026-05-20T00:00:00.000Z'),
  '/resources/dui-checkpoints': new Date('2026-05-29T00:00:00.000Z'),
  '/ovi-checkpoints-ohio': new Date('2026-05-03T00:00:00.000Z'),
  '/first-offense-ovi-ohio': new Date('2026-05-19T00:00:00.000Z'),
  '/ovi-test-refusal-lawyer-ohio': new Date('2026-05-19T00:00:00.000Z'),
  '/als-license-suspension-ohio': new Date('2026-05-19T00:00:00.000Z'),
  '/motion-to-suppress-ovi-ohio': new Date('2026-05-19T00:00:00.000Z'),
  '/civil-protection-order-defense-ohio': new Date('2026-05-19T00:00:00.000Z'),
  '/domestic-violence-first-offense-ohio-defense': new Date('2026-05-19T00:00:00.000Z'),
  '/drug-possession-vs-trafficking-ohio-defense': new Date('2026-05-03T00:00:00.000Z'),
}

type SitemapEntrySeed = {
  page: string
  lastModified: Date
}

function parseSitemapDate(value: string | undefined) {
  if (!value) return null
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mango.law'
  const privatePrefixes = ['/client-updates', '/admin', '/handoff']
  
  // Static pages
  const staticPages = [
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
  ]

  // Blog posts - include only publishable posts (CMS + legacy), excluding future-dated content
  let blogPosts: SitemapEntrySeed[] = []
  try {
    const posts = await getPublicBlogPosts()
    blogPosts = posts.map((post) => ({
      page: `/blog/${post.slug}`,
      lastModified: parseSitemapDate(post.lastVerified) ?? parseSitemapDate(post.date) ?? STATIC_LASTMOD,
    }))
  } catch (error) {
    console.warn('Could not load blog posts for sitemap:', error)
  }

  // Combine all pages
  const allPages = [
    ...staticPages.map((page) => ({
      page,
      lastModified: ROUTE_LASTMOD[page] ?? STATIC_LASTMOD,
    })),
    ...blogPosts,
  ].filter(({ page }) => {
    return !privatePrefixes.some((prefix) => page === prefix || page.startsWith(`${prefix}/`))
  })

  return allPages.map(({ page, lastModified }) => ({
    url: `${baseUrl}${page}`,
    lastModified,
  }))
}
