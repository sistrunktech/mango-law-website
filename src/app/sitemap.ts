import { MetadataRoute } from 'next'
import { getPublicBlogPosts } from '@/lib/blogPostsRepo'
import { buildSitemapEntries, mapBlogPostsToSitemapSeeds, type SitemapEntrySeed } from '@/lib/sitemapEntries'

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || ''

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

  // Blog posts - include only publishable posts (CMS + legacy), excluding future-dated content
  let blogPosts: SitemapEntrySeed[] = []
  try {
    const posts = await getPublicBlogPosts()
    blogPosts = mapBlogPostsToSitemapSeeds(posts)
  } catch (error) {
    console.warn('Could not load blog posts for sitemap:', error)
  }

  // Non-blocking IndexNow ping for homepage (indexes sitemap contents)
  pingIndexNow(baseUrl)

  return buildSitemapEntries({ baseUrl, blogPosts })
}
