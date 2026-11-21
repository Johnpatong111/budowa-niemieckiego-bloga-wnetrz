import type { ArticleContent } from '@/lib/content'
import { GENERATED_RICH } from './generated'
import { fugenErneuern } from './fugen-erneuern'
import { fensterEinstellenWinter } from './fenster-einstellen-winter'
import { lichtplanungOhneGeheimnisse } from './lichtplanung-ohne-geheimnisse'
import { heizkoerperEntlueften } from './heizkoerper-entlueften'
import { schimmelSelbstEntfernen } from './schimmel-selbst-entfernen'
import { vinylbodenFliesenoptik } from './vinylboden-fliesenoptik'
import { abflussReinigenOhneChemie } from './abfluss-reinigen-ohne-chemie'

/**
 * Ausgearbeitete Langfassungen. Alles, was hier nicht steht, wird aus dem
 * alten Absatz-Format in das Blockmodell überführt (siehe lib/content.ts).
 */
export const RICH_ARTICLES: Record<string, ArticleContent> = {
  'fugen-erneuern': fugenErneuern,
  'fenster-einstellen-winter': fensterEinstellenWinter,
  'lichtplanung-ohne-geheimnisse': lichtplanungOhneGeheimnisse,
  'heizkoerper-entlueften': heizkoerperEntlueften,
  'schimmel-selbst-entfernen': schimmelSelbstEntfernen,
  'vinylboden-fliesenoptik': vinylbodenFliesenoptik,
  'abfluss-reinigen-ohne-chemie': abflussReinigenOhneChemie,
  // generierte Artikel überschreiben hier bewusst die handgeschriebenen
  ...GENERATED_RICH,
}
