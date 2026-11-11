import type { MetadataRoute } from 'next'
import { ARTICLES, CATEGORIES } from '@/lib/articles'
import { SITE } from '@/lib/site'

const siteUrl = SITE.url

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/artikel`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/ratgeber`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/ratgeber/lumen-rechner`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/ratgeber/farbmengen-rechner`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/ratgeber/led-ersparnis-rechner`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/ueber-uns`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${siteUrl}/impressum`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/datenschutz`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((category) => ({
    url: `${siteUrl}/kategorie/${category.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const articlePages: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${siteUrl}/artikel/${article.slug}`,
    lastModified: new Date(article.updatedAt ?? article.publishAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...categoryPages, ...articlePages].sort((a, b) => {
    if (a.url === siteUrl) return -1
    if (b.url === siteUrl) return 1
    return new Date(b.lastModified ?? 0).getTime() - new Date(a.lastModified ?? 0).getTime()
  })
}

export const revalidate = 3600

