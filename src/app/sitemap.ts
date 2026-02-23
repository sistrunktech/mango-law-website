import { MetadataRoute } from 'next'

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '2bda9a4cf672486daa2ab28e477568e5'

async function pingIndexNow(baseUrl: string) {
  if (!INDEXNOW_KEY) return
  const pingUrl = `https://api.indexnow.org/indexnow?url=${encodeURIComponent(baseUrl)}&key=${INDEXNOW_KEY}`
  try {
    // fire-and-forget; errors are non-fatal
    await fetch(pingUrl, { next: { revalidate: 0 } })
  } catch (error) {
    console.warn('IndexNow ping failed:', error)
  }
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
    '/delaware-ohio-ovi-lawyer',
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

  // Blog posts - dynamically generate from blogPosts data
  let blogPosts: string[] = []
  try {
    const blogData = require('@/data/blogPosts')
    const publishing = require('@/lib/blogPublishing')
    if (blogData?.blogPosts && Array.isArray(blogData.blogPosts)) {
      const publishablePosts =
        typeof publishing?.getPublishableBlogPosts === 'function'
          ? publishing.getPublishableBlogPosts(blogData.blogPosts)
          : blogData.blogPosts
      blogPosts = publishablePosts.map((post: any) => `/blog/${post.slug}`)
    }
  } catch (error) {
    console.warn('Could not load blog posts for sitemap:', error)
  }

  // Combine all pages
  const allPages = [...staticPages, ...blogPosts].filter((page) => {
    return !privatePrefixes.some((prefix) => page === prefix || page.startsWith(`${prefix}/`))
  })

  // Non-blocking IndexNow ping for homepage (indexes sitemap contents)
  pingIndexNow(baseUrl)

  return allPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
  }))
}
