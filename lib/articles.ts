import { SITE } from '@/lib/site'
import { GENERATED_ARTICLES } from './articles.generated'

export type CategorySlug = 'beleuchtung' | 'zuhause' | 'interieur' | 'garten' | 'ratgeber'

export type ArticleMeta = {
  slug: string
  title: string
  category: string
  categorySlug: CategorySlug
  dateIso: string
  image: string
  imageAlt: string
  description: string
  keyword: string
  /** Ab diesem Zeitpunkt erscheint der Artikel auf Startseite, Kategorien und Sitemap. */
  publishAt: string
  /** Echtes inhaltliches Update – wird für dateModified und sitemap-lastmod genutzt. */
  updatedAt?: string
  /**
   * Bezahlte Platzierung (z. B. Linkhouse). Wird sichtbar als „Anzeige" gekennzeichnet
   * und alle externen Links erhalten rel="sponsored" – so verlangt es Google.
   */
  sponsored?: boolean
}

export const CATEGORIES = [
  {
    slug: 'beleuchtung',
    name: 'Beleuchtung',
    intro: 'Licht, das Räume verändert – verständlich erklärt und praktisch geplant.',
  },
  {
    slug: 'zuhause',
    name: 'Zuhause',
    intro: 'Praktische Lösungen für ein Zuhause, das jeden Tag besser funktioniert.',
  },
  {
    slug: 'interieur',
    name: 'Interieur',
    intro: 'Materialien, Farben und Ideen für Räume mit Charakter.',
  },
  {
    slug: 'garten',
    name: 'Garten',
    intro: 'Draußen zuhause: Ideen für einen Garten mit Atmosphäre.',
  },
  {
    slug: 'ratgeber',
    name: 'Ratgeber',
    intro: 'Klare Antworten und Schritt-für-Schritt-Hilfe für Haus und Wohnung.',
  },
] as const

/**
 * Einzige Quelle der Wahrheit für Artikel-Metadaten.
 * Startseite, Kategorie-Seiten, /artikel, Sitemap und Structured Data lesen hier.
 */
const HANDWRITTEN_ARTICLES: ArticleMeta[] = [
  {
    slug: 'lichtplanung-ohne-geheimnisse',
    title: 'Lichtplanung ohne Geheimnisse: So wird jeder Raum gemütlich',
    category: 'Beleuchtung',
    categorySlug: 'beleuchtung',
    dateIso: '2026-10-12',
    image: '/images/lichtplanung-ohne-geheimnisse.jpg',
    imageAlt: 'Wohn- und Essbereich mit mehreren Lichtquellen: Pendelleuchten, Stehlampe und Tischlampen',
    description:
      'Lichtplanung Schritt für Schritt: Grundlicht, Zonenlicht und Akzentlicht richtig kombinieren, Lichtfarbe wählen und typische Fehler vermeiden.',
    keyword: 'Lichtplanung',
    publishAt: '2026-10-12T12:00:00.000Z',
    updatedAt: '2026-11-11T09:10:00.000Z',
  },
  {
    slug: 'vinylboden-fliesenoptik',
    title: 'Vinylboden in Fliesenoptik: Eine stilvolle Alternative zu klassischen Fliesen',
    category: 'Interieur',
    categorySlug: 'interieur',
    dateIso: '2026-10-26',
    image: '/images/vinylboden-fliesenoptik.jpg',
    imageAlt: 'Vinylboden in Fliesenoptik in einer hellen Küche mit Holzmöbeln',
    description:
      'Vinylboden in Fliesenoptik: Vor- und Nachteile, Aufbau, Verlegung, Pflege und für welche Räume sich der Bodenbelag wirklich eignet.',
    keyword: 'Vinylboden Fliesenoptik',
    publishAt: '2026-10-26T12:00:00.000Z',
    updatedAt: '2026-11-11T09:25:00.000Z',
  },
  {
    slug: 'natuerliche-materialien-fuer-mehr-ruhe',
    title: 'Die neue Ruhe: Warum natürliche Materialien Räume verändern',
    category: 'Interieur',
    categorySlug: 'interieur',
    dateIso: '2026-10-05',
    image: '/images/natuerliche-materialien-fuer-mehr-ruhe.jpg',
    imageAlt: 'Natürliche Materialien im Wohnraum: ruhige Holzmaserung als Fläche',
    description:
      'Holz, Leinen, Ton und Kalk: Wie natürliche Materialien Ruhe in den Raum bringen und worauf Sie bei Auswahl und Kombination achten sollten.',
    keyword: 'natürliche Materialien',
    publishAt: '2026-10-05T12:00:00.000Z',
  },
  {
    slug: 'led-flackert-ursachen-loesungen',
    title: 'LED flackert: 7 Ursachen und Lösungen für Dimmer, Trafo und Leuchtmittel',
    category: 'Beleuchtung',
    categorySlug: 'beleuchtung',
    dateIso: '2026-10-14',
    image: '/images/led-flackert-ursachen-loesungen.jpg',
    imageAlt: 'LED flackert: LED-Leuchtmittel im Sockel einer Wohnraumleuchte',
    description:
      'LED flackert oder summt? Die sieben häufigsten Ursachen – von Dimmer und Trafo bis zur Grundlast – und wie Sie das Problem Schritt für Schritt lösen.',
    keyword: 'LED flackert',
    publishAt: '2026-10-14T12:00:00.000Z',
  },
  {
    slug: 'fenster-einstellen-winter',
    title: 'Fenster einstellen für den Winter: Dichtung und Beschläge in 5 Schritten justieren',
    category: 'Zuhause',
    categorySlug: 'zuhause',
    dateIso: '2026-10-15',
    image: '/images/fenster-einstellen-winter.jpg',
    imageAlt: 'Nahaufnahme eines Fenstergriffes mit Hebelmechanik am Fensterrahmen',
    description:
      'Fenster vor dem Winter einstellen: So justieren Sie Beschläge und Anpressdruck in fünf Schritten, ohne Fachbetrieb, und sparen Heizkosten.',
    keyword: 'Fenster einstellen',
    publishAt: '2026-10-15T12:00:00.000Z',
    updatedAt: '2026-11-11T09:05:00.000Z',
  },
  {
    slug: 'heizkoerper-wird-nicht-warm',
    title: 'Heizkörper wird nicht warm: 7 Ursachen und was Sie selbst tun können',
    category: 'Ratgeber',
    categorySlug: 'ratgeber',
    dateIso: '2026-10-13',
    image: '/images/heizkoerper-wird-nicht-warm.jpg',
    imageAlt: 'Heizkörper wird nicht warm: Thermostatventil mit Temperaturskala prüfen',
    description:
      'Heizkörper bleibt kalt, obwohl die Heizung läuft? Die sieben häufigsten Ursachen und welche Schritte Sie selbst prüfen können, bevor der Profi kommt.',
    keyword: 'Heizkörper wird nicht warm',
    publishAt: '2026-10-13T12:00:00.000Z',
  },
  {
    slug: 'gartenbeleuchtung-solar',
    title: 'Gartenbeleuchtung Solar: Lohnt sich das und worauf kommt es an?',
    category: 'Garten',
    categorySlug: 'garten',
    dateIso: '2026-10-16',
    image: '/images/gartenbeleuchtung-solar.jpg',
    imageAlt: 'Gartenbeleuchtung Solar: Solarleuchten aus Stein im Garten',
    description:
      'Solarleuchten für den Garten: Akku, Schutzart, Standort und Lichtleistung im Check – plus ehrliche Einschätzung, wann sich Solar wirklich lohnt.',
    keyword: 'Gartenbeleuchtung Solar',
    publishAt: '2026-10-16T12:00:00.000Z',
  },
  {
    slug: 'schimmel-selbst-entfernen',
    title: 'Schimmel entfernen: In 6 Schritten sicher selbst vorgehen',
    category: 'Zuhause',
    categorySlug: 'zuhause',
    dateIso: '2026-10-16',
    image: '/images/schimmel-entfernen.jpg',
    imageAlt: 'Kleine Schimmelstelle an einer Badezimmerwand wird mit einem Tuch gereinigt',
    description:
      'Schimmel in der Wohnung selbst entfernen: Schutzausrüstung, richtige Mittel, sechs Schritte und wann Sie einen Fachbetrieb rufen sollten.',
    keyword: 'Schimmel entfernen',
    publishAt: '2026-10-16T12:00:00.000Z',
    updatedAt: '2026-11-11T09:20:00.000Z',
  },
  {
    slug: 'kleine-wohnung-einrichten',
    title: 'Kleine Wohnung einrichten: 10 Tipps für mehr Platz und Licht',
    category: 'Interieur',
    categorySlug: 'interieur',
    dateIso: '2026-10-16',
    image: '/images/kleine-wohnung-einrichten.jpg',
    imageAlt: 'Kleine Wohnung einrichten: helle Möbel und offener Wohn-Ess-Bereich',
    description:
      'Kleine Wohnung einrichten: zehn erprobte Tipps für mehr Stauraum, mehr Licht und ein ruhiges Raumgefühl – ohne teure Umbauten.',
    keyword: 'kleine Wohnung einrichten',
    publishAt: '2026-10-16T12:00:00.000Z',
  },
  {
    slug: 'rasen-vertikutieren',
    title: 'Rasen vertikutieren: Der beste Zeitpunkt und die richtige Methode',
    category: 'Garten',
    categorySlug: 'garten',
    dateIso: '2026-10-17',
    image: '/images/rasen-vertikutieren.jpg',
    imageAlt: 'Rasen vertikutieren: dichte Grasharbe als Ausgangslage für die Pflege',
    description:
      'Rasen vertikutieren im Herbst oder Frühjahr? Der richtige Zeitpunkt, die passende Technik und wie Sie den Rasen danach richtig pflegen.',
    keyword: 'Rasen vertikutieren',
    publishAt: '2026-10-17T12:00:00.000Z',
  },
  {
    slug: 'heizkoerper-entlueften',
    title: 'Heizkörper entlüften: Anleitung in 5 Schritten',
    category: 'Ratgeber',
    categorySlug: 'ratgeber',
    dateIso: '2026-10-18',
    image: '/images/heizkoerper-entlueften.jpg',
    imageAlt: 'Weißer Flachheizkörper mit Thermostatventil an der Wand',
    description:
      'Heizkörper entlüften in fünf Schritten: Werkzeug, Reihenfolge, richtiger Zeitpunkt und was Sie tun, wenn die Heizung danach nicht warm wird.',
    keyword: 'Heizkörper entlüften',
    publishAt: '2026-10-18T12:00:00.000Z',
    updatedAt: '2026-11-11T09:15:00.000Z',
  },
  {
    slug: 'wandfarbe-auswaehlen',
    title: 'Wandfarbe auswählen: Welche Farbe passt zu welchem Raum?',
    category: 'Interieur',
    categorySlug: 'interieur',
    dateIso: '2026-10-19',
    image: '/images/wandfarbe-auswaehlen.jpg',
    imageAlt: 'Wandfarbe auswählen: Wand mit Farbrolle streichen',
    description:
      'Welche Wandfarbe passt zu welchem Raum? Wirkung von Licht, Nord- und Südseite, Farbmuster testen und konkrete Empfehlungen pro Zimmer.',
    keyword: 'Wandfarbe auswählen',
    publishAt: '2026-10-19T12:00:00.000Z',
  },
  {
    slug: 'lichtplanung-wohnzimmer',
    title: 'Lichtplanung Wohnzimmer: Wie viele Lumen und welche Lichtfarbe?',
    category: 'Beleuchtung',
    categorySlug: 'beleuchtung',
    dateIso: '2026-10-20',
    image: '/images/lichtplanung-wohnzimmer.jpg',
    imageAlt: 'Lichtplanung Wohnzimmer: Pendelleuchten über dem Esstisch',
    description:
      'Lichtplanung fürs Wohnzimmer: Lumen pro Quadratmeter, Lichtfarbe in Kelvin, Anzahl der Lichtquellen und eine einfache Beispielrechnung.',
    keyword: 'Lichtplanung Wohnzimmer',
    publishAt: '2026-10-20T12:00:00.000Z',
  },
  {
    slug: 'abfluss-reinigen-ohne-chemie',
    title: 'Abfluss reinigen ohne Chemie: 5 Hausmittel im Vergleich',
    category: 'Zuhause',
    categorySlug: 'zuhause',
    dateIso: '2026-10-21',
    image: '/images/abfluss-reinigen-ohne-chemie.jpg',
    imageAlt: 'Abfluss reinigen ohne Chemie: Sieb und Ablauf im Waschbecken',
    description:
      'Verstopften Abfluss ohne Chemie reinigen: fünf Hausmittel im Vergleich, was wirklich hilft und wann Sie besser zum Profi greifen.',
    keyword: 'Abfluss reinigen',
    publishAt: '2026-10-21T12:00:00.000Z',
  },
  {
    slug: 'garten-winterfest-machen',
    title: 'Garten winterfest machen: Checkliste für Oktober und November',
    category: 'Garten',
    categorySlug: 'garten',
    dateIso: '2026-10-22',
    image: '/images/garten-winterfest-machen.jpg',
    imageAlt: 'Garten winterfest machen: Herbstlaub vor dem Winter entfernen',
    description:
      'Garten winterfest machen: Checkliste für Oktober und November – Pflanzen, Wasser, Geräte und Terrasse richtig auf den Winter vorbereiten.',
    keyword: 'Garten winterfest machen',
    publishAt: '2026-10-22T12:00:00.000Z',
  },
  {
    slug: 'richtig-lueften-im-winter',
    title: 'Richtig lüften im Winter: Wie oft und wie lange?',
    category: 'Zuhause',
    categorySlug: 'zuhause',
    dateIso: '2026-10-23',
    image: '/images/fenster-winter.jpg',
    imageAlt: 'Geöffnetes Fenster in einem warmen Wohnraum im Winter',
    description:
      'Richtig lüften im Winter: Stoßlüften statt Dauerkippen, wie oft und wie lange gelüftet werden sollte und wie Sie Schimmel vorbeugen.',
    keyword: 'richtig lüften im Winter',
    publishAt: '2026-10-23T12:00:00.000Z',
  },
  {
    slug: 'dimmbare-led-auswaehlen',
    title: 'Dimmbare LED richtig auswählen: Worauf Sie beim Kauf achten sollten',
    category: 'Beleuchtung',
    categorySlug: 'beleuchtung',
    dateIso: '2026-10-24',
    image: '/images/dimmbare-led-auswaehlen.jpg',
    imageAlt: 'Dimmbare LED auswählen: LED-Leuchtmittel für flackerfreies Dimmen',
    description:
      'Dimmbare LED kaufen: Kompatibilität mit Dimmer und Trafo, Mindestlast, Farbtemperatur und die Angaben, die im Datenblatt wirklich zählen.',
    keyword: 'dimmbare LED',
    publishAt: '2026-10-24T12:00:00.000Z',
  },
  {
    slug: 'fugen-erneuern',
    title: 'Fugen erneuern: So werden Bad und Küche wieder sauber',
    category: 'Zuhause',
    categorySlug: 'zuhause',
    dateIso: '2026-10-25',
    image: '/images/fugen-erneuern.jpg',
    imageAlt: 'Weiße Wandfliesen mit Wassertropfen und deutlich sichtbaren Fugen im Badezimmer',
    description:
      'Fugen im Bad oder in der Küche erneuern: alte Silikonfugen entfernen, Untergrund vorbereiten, neu verfugen – Anleitung, Material und typische Fehler.',
    keyword: 'Fugen erneuern',
    publishAt: '2026-10-25T12:00:00.000Z',
    updatedAt: '2026-11-11T09:00:00.000Z',
  },
  {
    slug: 'led-beleuchtungssysteme',
    title: 'LED-Beleuchtungssysteme: Aufbau, Vorteile und Einsatzbereiche',
    category: 'Beleuchtung',
    categorySlug: 'beleuchtung',
    dateIso: '2026-10-10',
    image: '/images/led-beleuchtungssysteme.jpg',
    imageAlt: 'LED-Beleuchtungssysteme: flexibles LED-Band als Lichtband',
    description:
      'LED-Beleuchtungssysteme einfach erklärt: Aufbau, Lichtfarben, Steuerung, Vorteile und worauf Sie bei Planung und Kauf achten sollten.',
    keyword: 'LED-Beleuchtungssysteme',
    publishAt: '2026-10-10T12:00:00.000Z',
  },
]

/**
 * Endgültige Liste: generierte Artikel mit gleichem Slug ersetzen die handgeschriebene Version
 * (Meta + Inhalt). So kann die Pipeline bestehende Texte aktualisieren, ohne doppelte URLs.
 */
export const ARTICLES: ArticleMeta[] = (() => {
  const generatedBySlug = new Map(GENERATED_ARTICLES.map((article) => [article.slug, article]))
  const replaced = HANDWRITTEN_ARTICLES.map((article) => generatedBySlug.get(article.slug) ?? article)
  const newOnes = GENERATED_ARTICLES.filter(
    (article) => !HANDWRITTEN_ARTICLES.some((existing) => existing.slug === article.slug),
  )
  return [...replaced, ...newOnes]
})()

export function formatGermanDate(iso: string) {
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso))
}

export function getPublishedArticles(now = new Date()): ArticleMeta[] {
  return ARTICLES.filter((article) => new Date(article.publishAt).getTime() <= now.getTime())
}

export function getArticle(slug: string): ArticleMeta | undefined {
  return ARTICLES.find((article) => article.slug === slug)
}

export function getArticlesByCategory(categorySlug: string): ArticleMeta[] {
  return getPublishedArticles().filter((article) => article.categorySlug === categorySlug)
}

export function getCategory(slug: string) {
  return CATEGORIES.find((category) => category.slug === slug)
}

/** 3 verwandte Artikel – gleiche Kategorie zuerst, danach thematisch passende Ergänzungen. */
export function getRelatedArticles(slug: string, limit = 3): ArticleMeta[] {
  const current = getArticle(slug)
  if (!current) return []
  const published = getPublishedArticles().filter((article) => article.slug !== slug)
  const sameCategory = published.filter((article) => article.categorySlug === current.categorySlug)
  const rest = published.filter((article) => article.categorySlug !== current.categorySlug)
  return [...sameCategory, ...rest].slice(0, limit)
}

export function articleUrl(slug: string) {
  return `${SITE.url}/artikel/${slug}`
}

export function categoryUrl(slug: string) {
  return `${SITE.url}/kategorie/${slug}`
}
