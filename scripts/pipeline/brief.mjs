#!/usr/bin/env node
/**
 * Brief konkurencyjny dla nowego artykułu.
 *
 *   node scripts/pipeline/brief.mjs --slug mein-thema \
 *        --url https://www.heimwerker.de/... --url https://...
 *
 * Zapisuje content/queue/<slug>.brief.md z analizą: objętość, nagłówki, mocne strony,
 * braki i listę wymagań, które musi spełnić nasz tekst.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { PATHS, GATES } from './config.mjs'

const args = process.argv.slice(2)
const get = (name) => {
  const index = args.indexOf(`--${name}`)
  if (index === -1) return []
  const values = []
  for (let i = index + 1; i < args.length && !args[i].startsWith('--'); i++) values.push(args[i])
  return values
}

const slug = get('slug')[0]
const urls = get('url')
if (!slug || urls.length === 0) {
  console.error('Użycie: node scripts/pipeline/brief.mjs --slug <slug> --url <adres> [--url <adres>]')
  process.exit(2)
}

const decode = (html) =>
  html
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&auml;/g, 'ä')
    .replace(/&ouml;/g, 'ö')
    .replace(/&uuml;/g, 'ü')
    .replace(/&szlig;/g, 'ß')

const plain = (html) => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()

async function analyse(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'raumgefuehl-research/1.0' } })
  if (!res.ok) return { url, error: `HTTP ${res.status}` }
  const html = await res.text()
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html.match(/<article[\s\S]*?<\/article>/i)?.[0] ?? html
  const text = plain(main.replace(/<(script|style|nav|footer|header)[\s\S]*?<\/\1>/gi, ' '))
  const headings = [...html.matchAll(/<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => plain(m[2])).filter(Boolean)
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
  return {
    url,
    h1: h1 ? plain(h1[1]) : '(brak)',
    words: text.split(/\s+/).filter(Boolean).length,
    headings: headings.slice(0, 25),
    tables: (html.match(/<table/gi) ?? []).length,
    steps: (html.match(/<ol/gi) ?? []).length,
    faq: /häufige fragen|faq|häufig gestellte/i.test(html),
    calculator: /rechner|kalkulator|berechnen sie|berechnung/i.test(html),
    images: (html.match(/<img/gi) ?? []).length,
  }
}

const results = []
for (const url of urls) {
  try {
    results.push(await analyse(url))
  } catch (error) {
    results.push({ url, error: String(error.message ?? error) })
  }
}

const lines = [`# Brief: ${slug}`, '', `Wygenerowano: ${new Date().toISOString().slice(0, 16).replace('T', ' ')}`, '', '## Konkurencja', '']
for (const r of results) {
  if (r.error) {
    lines.push(`### ${r.url}`, `- błąd: ${r.error}`, '')
    continue
  }
  lines.push(
    `### ${r.url}`,
    `- H1: ${r.h1}`,
    `- słowa: **${r.words}**`,
    `- tabele: ${r.tables} | listy numerowane: ${r.steps} | FAQ: ${r.faq ? 'tak' : 'nie'} | kalkulator: ${r.calculator ? 'tak' : 'nie'} | obrazy: ${r.images}`,
    '',
    'Nagłówki:',
    ...r.headings.map((h) => `- ${h}`),
    '',
  )
}

const maxWords = Math.max(0, ...results.map((r) => r.words ?? 0))
lines.push(
  '## Wnioski dla naszego tekstu',
  '',
  `- najdłuższy konkurent: **${maxWords} słów** → celujemy w ${Math.max(GATES.minWords, Math.round(maxWords * 0.9))}–${Math.min(GATES.maxWords, Math.round(maxWords * 1.2) || GATES.maxWords)} słów`,
  '- robimy to, czego nie ma konkurencja: tabela decyzyjna, konkretne ceny, sekcja „wann Profi", FAQ z realnych pytań',
  '- minimum 1 interaktywny element (kalkulator) albo link do narzędzia w środku tekstu',
  '',
  '## Twarde wymagania (walidator)',
  '',
  `- słowa: ${GATES.minWords}–${GATES.maxWords}`,
  `- sekcje: min. ${GATES.minSections}, tabele: min. ${GATES.minTables}, listy/kroki: min. ${GATES.minLists}`,
  `- FAQ: min. ${GATES.minFaq}, źródła: min. ${GATES.minSources}`,
  `- linki wewnętrzne: min. ${GATES.minInternalLinks}, zewnętrzne: max ${GATES.maxExternalLinks}`,
  '- tytuł 30–70 znaków, description 120–165 znaków bez HTML',
  '- słowo kluczowe w tytule, w leadzie i w co najmniej jednym nagłówku',
  '- obraz w `public/images/<slug>.jpg` + alt min. 20 znaków',
  '- brak fraz szablonowych („Der wichtigste Begriff für diesen Ratgeber…")',
)

mkdirSync(PATHS.queue, { recursive: true })
const out = join(PATHS.queue, `${slug}.brief.md`)
writeFileSync(out, lines.join('\n'), 'utf8')
console.log(`Brief zapisany: ${out}`)
console.log(`Konkurencja: ${results.map((r) => `${r.url} (${r.words ?? 'ERR'} słów)`).join(', ')}`)
