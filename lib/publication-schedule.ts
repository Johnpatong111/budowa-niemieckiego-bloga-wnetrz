export const publicationSchedule = [
  { order: 1, slug: 'kleine-wohnung-einrichten', publishAt: '2026-10-16T12:00:00.000Z' },
  { order: 2, slug: 'rasen-vertikutieren', publishAt: '2026-10-17T12:00:00.000Z' },
  { order: 3, slug: 'heizkoerper-entlueften', publishAt: '2026-10-18T12:00:00.000Z' },
  { order: 4, slug: 'wandfarbe-auswaehlen', publishAt: '2026-10-19T12:00:00.000Z' },
  { order: 5, slug: 'lichtplanung-wohnzimmer', publishAt: '2026-10-20T12:00:00.000Z' },
  { order: 6, slug: 'abfluss-reinigen-ohne-chemie', publishAt: '2026-10-21T12:00:00.000Z' },
  { order: 7, slug: 'garten-winterfest-machen', publishAt: '2026-10-22T12:00:00.000Z' },
  { order: 8, slug: 'richtig-lueften-im-winter', publishAt: '2026-10-23T12:00:00.000Z' },
  { order: 9, slug: 'dimmbare-led-auswaehlen', publishAt: '2026-10-24T12:00:00.000Z' },
  { order: 10, slug: 'fugen-erneuern', publishAt: '2026-10-25T12:00:00.000Z' },
] as const

export function isPublished(publishAt: string, now = new Date()) {
  return new Date(publishAt).getTime() <= now.getTime()
}

export function getPublishedSlugs(now = new Date()) {
  return publicationSchedule.filter((article) => isPublished(article.publishAt, now)).map((article) => article.slug)
}
