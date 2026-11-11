/**
 * Model treści artykułów.
 *
 * Dlaczego bloki, a nie same akapity: Google i użytkownik oceniają przede wszystkim
 * to, czy tekst odpowiada na intencję. Tabele, listy kroków i źródła podnoszą zarówno
 * użyteczność, jak i szansę na rich results / featured snippet.
 */
export type Block =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'steps'; items: { title: string; text: string }[] }
  | { type: 'table'; caption?: string; head: string[]; rows: string[][] }
  | { type: 'note'; title?: string; text: string }

export type Section = { heading: string; blocks: Block[] }

export type FaqItem = { question: string; answer: string }

export type ArticleContent = {
  /** Lead-Absatz. Erscheint groß unter dem Titel und im ersten Absatz. */
  intro: string
  /** 3–5 puntki „Das Wichtigste in Kürze" – Antwort auf die Suchintention vor dem Scrollen. */
  keyTakeaways?: string[]
  /** Optionales interaktives Element, das nach der Einleitung gerendert wird. */
  widget?: 'fugen-kosten' | 'kalk-check' | 'lueftungs-check' | 'dimmer-check' | 'heizkoerper-check'
  sections: Section[]
  faq: FaqItem[]
  sources?: { label: string; url?: string }[]
  /** Echtes inhaltliches Update – steuert dateModified und sitemap-lastmod. */
  updatedAt?: string
}

type LegacySection = { heading: string; paragraphs: readonly string[] }

/** Übernimmt die alten, reinen Absatz-Artikel in das neue Blockmodell. */
export function legacyToContent(
  legacy: { intro: string; sections: readonly LegacySection[] },
  faq: FaqItem[],
): ArticleContent {
  return {
    intro: legacy.intro,
    sections: legacy.sections.map((section) => ({
      heading: section.heading,
      blocks: section.paragraphs.map((text) => ({ type: 'p' as const, text })),
    })),
    faq,
  }
}
