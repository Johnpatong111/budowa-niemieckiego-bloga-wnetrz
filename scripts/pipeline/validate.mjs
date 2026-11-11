#!/usr/bin/env node
/**
 * Walidator artykułu. Uruchamiaj przed publikacją:
 *   node scripts/pipeline/validate.mjs content/queue/mein-artikel.json
 * Kod wyjścia 0 = wszystkie bramki zaliczone.
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { GATES, FORBIDDEN_PHRASES, CATEGORY_SLUGS, PATHS } from './config.mjs'
import { scoreArticle } from './scores.mjs'

const stripHtml = (text = '') => text.replace(/<[^>]+>/g, '')
const words = (text = '') => stripHtml(text).trim().split(/\s+/).filter(Boolean)
const links = (text = '') => [...String(text).matchAll(/<a\s+href="([^"]+)"/g)].map((m) => m[1])

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

export function validateArticle(article) {
  const gates = []
  const add = (name, ok, detail) => gates.push({ name, ok, detail })

  const meta = article.meta ?? {}
  const content = article.content ?? {}
  const slug = article.slug ?? ''
  const bodyText = allText(content)
  const bodyWords = words(bodyText)
  const blocks = blocksOf(content)
  const intro = stripHtml(content.intro ?? '')
  const keyword = (meta.keyword ?? '').toLowerCase()

  add('slug', /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug), slug || 'brak')
  add('kategoria', CATEGORY_SLUGS.includes(meta.categorySlug), meta.categorySlug ?? 'brak')
  add('titel-länge', (meta.title ?? '').length >= GATES.titleMin && (meta.title ?? '').length <= GATES.titleMax,
    `${(meta.title ?? '').length} znaków (${GATES.titleMin}–${GATES.titleMax})`)
  add('description', (meta.description ?? '').length >= GATES.descMin && (meta.description ?? '').length <= GATES.descMax,
    `${(meta.description ?? '').length} znaków`)
  add('description-bez-html', !/<[a-z/]/i.test(meta.description ?? ''), 'brak tagów HTML')
  add('data', /^\d{4}-\d{2}-\d{2}$/.test(meta.dateIso ?? ''), meta.dateIso ?? 'brak')
  add('słowa', bodyWords.length >= GATES.minWords && bodyWords.length <= GATES.maxWords,
    `${bodyWords.length} (${GATES.minWords}–${GATES.maxWords})`)

  const competitor = article.research?.competitor
  if (competitor?.targetWords) {
    add(
      'słowa vs konkurencja',
      bodyWords.length >= competitor.targetWords,
      `${bodyWords.length}/${competitor.targetWords} (średnia konkurencji ${competitor.avgWords}, max ${competitor.maxWords})`,
    )
  }
  add('sekcje', (content.sections ?? []).length >= GATES.minSections && (content.sections ?? []).length <= GATES.maxSections,
    `${(content.sections ?? []).length}`)
  add('tabele', blocks.filter((b) => b.type === 'table').length >= GATES.minTables,
    `${blocks.filter((b) => b.type === 'table').length}`)
  add('listy/kroki', blocks.filter((b) => ['ul', 'ol', 'steps'].includes(b.type)).length >= GATES.minLists,
    `${blocks.filter((b) => ['ul', 'ol', 'steps'].includes(b.type)).length}`)
  add('faq', (content.faq ?? []).length >= GATES.minFaq, `${(content.faq ?? []).length}`)
  add('źródła', (content.sources ?? []).length >= GATES.minSources, `${(content.sources ?? []).length}`)

  const headings = (content.sections ?? []).map((s) => s.heading ?? '').join(' ').toLowerCase()
  const keywordInTitle = keyword.length > 3 && (meta.title ?? '').toLowerCase().includes(keyword)
  const keywordInIntro = keyword.length > 3 && intro.toLowerCase().includes(keyword)
  const keywordInHeadings = keyword.length > 3 && headings.includes(keyword)
  add('słowo-kluczowe', keywordInTitle && keywordInIntro && keywordInHeadings,
    `tytuł:${keywordInTitle} lead:${keywordInIntro} nagłówki:${keywordInHeadings}`)

  const allLinks = links(bodyText)
  const internal = allLinks.filter((href) => href.startsWith('/'))
  const external = allLinks.filter((href) => /^https?:\/\//.test(href))
  add('linki-wewnętrzne', internal.length >= GATES.minInternalLinks, `${internal.length}`)
  add('linki-zewnętrzne', external.length <= GATES.maxExternalLinks, `${external.length} (max ${GATES.maxExternalLinks})`)

  const hasWidget = Boolean(content.widget)
  const hasToolLink = allLinks.some((href) => href.startsWith('/ratgeber/'))
  add('element-angażujący', !GATES.requireWidgetOrTool || hasWidget || hasToolLink,
    hasWidget ? `widget:${content.widget}` : hasToolLink ? 'link do narzędzia' : 'brak')

  const imagePath = meta.image ? join(PATHS.images, String(meta.image).replace('/images/', '')) : ''
  add('obraz-istnieje', Boolean(imagePath) && existsSync(imagePath), meta.image ?? 'brak')
  add('alt', (meta.imageAlt ?? '').length >= 20, `${(meta.imageAlt ?? '').length} znaków`)

  const forbidden = FORBIDDEN_PHRASES.filter((phrase) => bodyText.includes(phrase))
  add('zakazane-frazy', forbidden.length === 0, forbidden.join(' | ') || 'brak')

  const sentences = stripHtml(bodyText).split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.split(/\s+/).length > 2)
  const avg = sentences.length ? Math.round(bodyWords.length / sentences.length) : 0
  add('długość-zdań', avg <= GATES.maxAvgSentenceWords, `średnio ${avg} słów (max ${GATES.maxAvgSentenceWords})`)

  const scores = scoreArticle(article)
  add('innowacyjność', scores.innovation >= GATES.minInnovation, `${scores.innovation}/100 (min ${GATES.minInnovation})`)
  add('wartość dla użytkownika', scores.usefulness >= GATES.minUsefulness, `${scores.usefulness}/100 (min ${GATES.minUsefulness})`)
  add('szansa pozostania', scores.dwell >= GATES.minDwell, `${scores.dwell}/100 (min ${GATES.minDwell})`)
  add('odporny na AI', scores.aiProof, scores.aiProof ? 'widget + ceny + FAQ' : 'brakuje: widget / ceny / FAQ')

  const research = article.research ?? {}
  const opportunity = Number(research.opportunityScore ?? 0)
  add(
    'potencjał frazy',
    opportunity >= GATES.minOpportunity,
    opportunity
      ? `${opportunity}/100 (${research.opportunityLabel ?? '?'})`
      : 'brak oceny — uruchom opportunity.mjs (GSC lub SERP)',
  )

  const passed = gates.filter((g) => g.ok).length
  const score = Math.round((passed / gates.length) * 100)
  return { slug, ok: gates.every((g) => g.ok), score, gates, wordCount: bodyWords.length, scores }
}


function formatReport(result) {
  const lines = [`${result.ok ? '✅' : '❌'} ${result.slug} — ${result.score}/100, ${result.wordCount} słów`, '']
  for (const gate of result.gates) {
    lines.push(`${gate.ok ? '  ok  ' : '  FAIL'} ${gate.name.padEnd(20)} ${gate.detail}`)
  }
  if (result.scores) {
    lines.push('', '  Mierniki anti-AI:')
    lines.push(`    innowacyjność  ${result.scores.innovation}/100  → ${result.scores.detail.innovation.join(', ')}`)
    lines.push(`    wartość        ${result.scores.usefulness}/100  → ${result.scores.detail.usefulness.join(', ')}`)
    lines.push(`    pozostanie     ${result.scores.dwell}/100  → ${result.scores.detail.dwell.join(', ')}`)
  }
  return lines.join('\n')
}

const isCli = process.argv[1]?.endsWith('validate.mjs')
if (isCli) {
  const file = process.argv[2]
  if (!file) {
    console.error('Użycie: node scripts/pipeline/validate.mjs <plik.json>')
    process.exit(2)
  }
  const result = validateArticle(JSON.parse(readFileSync(file, 'utf8')))
  console.log(formatReport(result))
  process.exit(result.ok ? 0 : 1)
}
