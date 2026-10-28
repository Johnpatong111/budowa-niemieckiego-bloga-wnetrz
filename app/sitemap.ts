import type { MetadataRoute } from 'next'
import { publicationSchedule } from '@/lib/publication-schedule'

const siteUrl = 'https://www.lotse-strassenbeleuchtung.de'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/ratgeber`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/artikel/led-beleuchtungssysteme`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/artikel/vinylboden-fliesenoptik`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/ratgeber/led-ersparnis-rechner`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${siteUrl}/ratgeber/farbmengen-rechner`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${siteUrl}/ratgeber/lumen-rechner`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${siteUrl}/artikel/lichtplanung-ohne-geheimnisse`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/artikel/natuerliche-materialien-fuer-mehr-ruhe`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/artikel/heizkoerper-wird-nicht-warm`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/artikel/led-flackert-ursachen-loesungen`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/artikel/fenster-einstellen-winter`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...publicationSchedule.map((article) => ({
      url: `${siteUrl}/artikel/${article.slug}`,
      lastModified: new Date(article.publishAt),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })),
  ]
}

export const revalidate = 3600
