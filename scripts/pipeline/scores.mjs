/**
 * Trzy mierniki „anti-AI": innowacyjność, wartość dla użytkownika, szansa na pozostanie.
 *
 * Logika: czat AI potrafi streścić wiedzę. Nie potrafi natomiast dać interaktywnego
 * narzędzia, aktualnych widełek cenowych, decyzji „co wybrać w moim przypadku" ani
 * lokalnych danych. Te elementy punktujemy najwyżej.
 */

const stripHtml = (text = '') => String(text).replace(/<[^>]+>/g, ' ')
const words = (text = '') => stripHtml(text).trim().split(/\s+/).filter(Boolean)

function blocksOf(content) {
  return (content.sections ?? []).flatMap((section) => section.blocks ?? [])
}

function allText(content) {
  const parts = [content.intro ?? '']
  for (const section of content.sections ?? []) {
    parts.push(section.heading ?? '')
    for (const block of section.blocks ?? []) {
      if (block.text) parts.push(block.text)
      if (block.items) {
        for (const item of block.items) parts.push(typeof item === 'string' ? item : `${item.title} ${item.text}`)
      }
      if (block.head) parts.push(block.head.join(' '))
      if (block.rows) parts.push(block.rows.flat().join(' '))
    }
  }
  for (const faq of content.faq ?? []) parts.push(`${faq.question} ${faq.answer}`)
  return parts.join(' ')
}

const hasPrices = (blocks) =>
  blocks.some((block) => block.type === 'table' && /\d+[.,]?\d*\s*(€|Euro|EUR)/.test(JSON.stringify(block.rows ?? [])))

const hasDecisionTable = (blocks) =>
  blocks.some(
    (block) =>
      block.type === 'table' &&
      (block.head ?? []).some((cell) => /geeignet|empfehlung|situation|was hilft|vorgehen|lösung/i.test(cell)),
  )

const numericDensity = (text) => (String(text).match(/\b\d+[.,]?\d*\s?(°C|mm|cm|m²|m|min|Minuten|h|Watt|W|lx|lm|€|Euro|%|Tage|Wochen)\b/gi) ?? []).length

const hasRiskSection = (text) => /nie(mals)?|nicht geeignet|risiko|gefahr|achtung|sicherheit|warnung/i.test(text)

const hasProSection = (content) =>
  (content.sections ?? []).some((section) => /fachbetrieb|fachkraft|profi|elektriker|handwerker/i.test(section.heading ?? ''))

export function scoreArticle(article) {
  const content = article.content ?? {}
  const blocks = blocksOf(content)
  const text = allText(content)
  const allWords = words(text)
  const intro = stripHtml(content.intro ?? '')
  const keyword = (article.meta?.keyword ?? '').toLowerCase()

  // --- Innowacyjność: coś, czego czat nie da ---
  const innovationDetail = []
  let innovation = 0
  const bump = (points, label) => {
    innovation += points
    innovationDetail.push(`${label} +${points}`)
  }

  if (content.widget) bump(30, `interaktywne narzędzie (${content.widget})`)
  if (hasPrices(blocks)) bump(15, 'tabela z cenami')
  if (hasDecisionTable(blocks)) bump(10, 'tabela decyzyjna')
  if (blocks.some((b) => b.type === 'steps')) bump(8, 'kroki numerowane')
  if (numericDensity(text) >= 12) bump(12, `konkretne wartości (${numericDensity(text)})`)
  if (hasRiskSection(text)) bump(8, 'sekcja granic/ryzyk')
  if (hasProSection(content)) bump(8, 'sekcja „wann Profi"')
  if ((content.sources ?? []).length >= 2) bump(5, 'źródła')
  innovation = Math.min(100, innovation)

  // --- Wartość dla użytkownika: czy odpowiada od razu ---
  const usefulnessDetail = []
  let usefulness = 0
  const uBump = (points, label) => {
    usefulness += points
    usefulnessDetail.push(`${label} +${points}`)
  }

  const firstSixty = words(intro).slice(0, 60).join(' ').toLowerCase()
  if (keyword.length > 3 && firstSixty.includes(keyword)) uBump(20, 'odpowiedź w pierwszych 60 słowach')
  if ((content.keyTakeaways ?? []).length >= 3) uBump(15, 'blok „najważniejsze"')
  if (blocks.filter((b) => ['steps', 'ul', 'ol'].includes(b.type)).length >= 2) uBump(15, 'konkretne kroki/listy')
  if ((content.faq ?? []).length >= 5) uBump(15, 'FAQ')
  if (numericDensity(intro) >= 2) uBump(10, 'liczby już w leadzie')
  if ((content.faq ?? []).some((item) => /warum|was tun|wie |kann ich/i.test(item.question))) uBump(10, 'FAQ z realnych pytań')
  if (hasRiskSection(text)) uBump(5, 'ostrzeżenia')
  usefulness = Math.min(100, usefulness)

  // --- Szansa, że użytkownik zostanie (dwell/hold) ---
  const dwellDetail = []
  let dwell = 0
  const dBump = (points, label) => {
    dwell += points
    dwellDetail.push(`${label} +${points}`)
  }

  if (content.widget) dBump(30, 'element interaktywny')
  if (blocks.filter((b) => b.type === 'table').length >= 2) dBump(15, 'min. 2 tabele')
  if (blocks.some((b) => b.type === 'steps')) dBump(15, 'kroki do wykonania')
  if ((content.faq ?? []).length >= 5) dBump(10, 'FAQ')
  if (allWords.length >= 1000) dBump(10, 'lekturа > 5 min')
  if ((content.sections ?? []).length >= 6) dBump(5, 'spis treści / dużo sekcji')
  if ((content.sources ?? []).length >= 2) dBump(5, 'źródła zwiększają zaufanie')
  dwell = Math.min(100, dwell)

  const aiProof = Boolean(content.widget) && hasPrices(blocks) && (content.faq ?? []).length >= 5

  return {
    innovation,
    usefulness,
    dwell,
    aiProof,
    detail: { innovation: innovationDetail, usefulness: usefulnessDetail, dwell: dwellDetail },
    wordCount: allWords.length,
  }
}
