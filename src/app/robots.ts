import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/',
          '/brand-guidelines',
          '/brand-guide',
          '/docs/admin-guide',
          '/handoff/',
        ],
      },
    ],
    sitemap: 'https://mango.law/sitemap.xml',
  }
}
