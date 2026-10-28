import type { MetadataRoute } from 'next'

const siteUrl = 'https://www.lotse-strassenbeleuchtung.de'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cdn-cgi/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
