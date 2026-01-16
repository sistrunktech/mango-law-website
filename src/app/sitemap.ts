import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mango.law'
  
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
  ]

  // Blog posts - dynamically generate from blogPosts data
  let blogPosts: string[] = []
  try {
    const blogData = require('@/data/blogPosts')
    if (blogData?.blogPosts && Array.isArray(blogData.blogPosts)) {
      blogPosts = blogData.blogPosts.map((post: any) => `/blog/${post.slug}`)
    }
  } catch (error) {
    console.warn('Could not load blog posts for sitemap:', error)
  }

  // Combine all pages
  const allPages = [...staticPages, ...blogPosts]

  return allPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page.startsWith('/blog/') ? 'monthly' : 'weekly' as const,
    priority: page === '' ? 1 : page.startsWith('/blog/') ? 0.7 : 0.8,
  }))
}
