/**
 * Zentrale Seiten-Konstanten.
 * Wichtig: Bei einem Domainwechsel (siehe Audit) nur diese Datei anpassen.
 */
export const SITE = {
  name: 'raumgefühl',
  legalName: 'raumgefühl – Das Magazin für schönes Wohnen',
  url: 'https://www.lotse-strassenbeleuchtung.de',
  locale: 'de_DE',
  language: 'de',
  title: 'raumgefühl — Das Magazin für schönes Wohnen',
  description:
    'Inspiration, Tipps und Ideen für ein Zuhause mit Gefühl: Lichtplanung, Renovierung, Materialien und kostenlose Rechner für Licht, Farbe und Strom.',
  email: 'johnpatong111@gmail.com',
  defaultOgImage: '/images/hero-interior.jpg',
} as const

/**
 * Anbieterkennzeichnung nach § 5 DDG.
 * TODO: die drei Platzhalter durch echte Daten ersetzen. Das ist eine Pflichtangabe,
 * sobald die Seite geschäftsmäßig betrieben wird (Werbung, Affiliate, Leads, Verkauf).
 * Ein Impressum-Service (c/o-Adresse) ist zulässig, solange dort Post zugestellt werden kann.
 */
export const OPERATOR = {
  name: 'TODO: Vor- und Nachname',
  street: 'TODO: Straße und Hausnummer',
  city: 'TODO: PLZ und Ort',
  country: 'Deutschland',
  email: 'johnpatong111@gmail.com',
} as const


export const LOGO_PATH = '/icon.svg'

/**
 * Gemeinsames Social-Preview-Bild. Wichtig: Wird `openGraph` auf einer Seite gesetzt,
 * ersetzt es das komplette openGraph-Objekt des Layouts – `images` daher immer mitgeben.
 */
export const OG_IMAGE = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'raumgefühl – Das Magazin für schönes Wohnen',
} as const

export function absoluteUrl(path = '/') {
  return new URL(path, SITE.url).toString()
}

/**
 * Linkbuilding-Vorgabe des Betreibers: bezahlte Platzierungen (Linkhouse) werden
 * dofollow ausgeliefert, also ohne rel="sponsored"/"nofollow".
 *
 * Bewusste Entscheidung – zur Einordnung: Google wertet bezahlte Links ohne
 * Kennzeichnung als Link-Schema. Bei einer manuellen Prüfung ist das ein Risiko
 * für die gesamte Domain. Auf `false` stellen, wenn wieder nofollow gesetzt werden soll.
 */
export const SPONSORED_LINKS = {
  dofollow: true,
} as const

