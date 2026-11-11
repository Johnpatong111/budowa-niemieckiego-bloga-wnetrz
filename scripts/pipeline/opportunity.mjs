#!/usr/bin/env node
/**
 * Ocena potencjału frazy („czy warto w to wchodzić").
 *
 * Google nie da się odpytać automatycznie (SERP to JS), więc moduł pracuje na danych,
 * które realnie mamy:
 *   1) --gsc <csv>     eksport z Search Console (pozycje, wyświetlenia, CTR)
 *   2) --serp <plik>   wklejony zrzut wyników (linie z URL-ami) + --keyword
 *
 * Zapis do draftu: --write content/queue/<slug>.json (dopisuje pole research)
 *
 *   node scripts/pipeline/opportunity.mjs --gsc zapytania.csv
 *   node scripts/pipeline/opportunity.mjs --keyword "fugen erneuern" --serp serp.txt --write content/queue/x.json
 */
import { readFileSync, writeFileSync } from 'node:fs'

const args = process.argv.slice(2)
const arg = (name) => {
  const i = args.indexOf(`--${name}`)
  return i === -1 ? undefined : args[i + 1]
}

const STRONG_DOMAINS = [
  'obi.de', 'hornbach.de', 'toom.de', 'bauhaus.info', 'amazon.de', 'idealo.de',
  'heimwerker.de', 'selbst.de', 'verbraucherzentrale.de', 'co2online.de',
  'wikipedia.org', 'youtube.com', 'ikea.com', 'myhammer.de', 'chefkoch.de',
  'stiftung-warentest.de', 'wohnglueck.de',
]

const WEAK_DOMAINS = ['gutefrage.net', 'pinterest.de', 'reddit.com', 'quora.com', 'forum', 'blogspot', 'wordpress.com']

function parseCsv(text) {
  const rows = []
  let row = []
  let cell = ''
  let quoted = false
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        cell += '"'
        i++
      } else if (char === '"') quoted = false
      else cell += char
    } else if (char === '"') quoted = true
    else if (char === ',' || char === ';') {
      row.push(cell)
      cell = ''
    } else if (char === '\n') {
      row.push(cell)
      rows.push(row)
      row = []
      cell = ''
    } else if (char !== '\r') cell += char
  }
  if (cell || row.length) {
    row.push(cell)
    rows.push(row)
  }
  return rows.filter((r) => r.some((value) => String(value).trim() !== ''))
}

const toNumber = (value) => Number(String(value).replace('%', '').replace(/\s/g, '').replace(',', '.')) || 0

const expectedCtr = (position) => {
  if (position <= 1) return 0.28
  if (position <= 2) return 0.15
  if (position <= 3) return 0.11
  if (position <= 5) return 0.07
  if (position <= 10) return 0.04
  if (position <= 20) return 0.015
  return 0.005
}

function scoreKeyword({ keyword, impressions, position, ctr }) {
  const impWeight = Math.min(45, Math.round(Math.log10(impressions + 1) * 14))
  const posScore =
    position <= 3 ? 5 : position <= 10 ? 15 : position <= 20 ? 35 : position <= 40 ? 30 : position <= 70 ? 20 : 10
  const gap = Math.max(0, expectedCtr(position) - ctr)
  const ctrGap = Math.min(20, Math.round((gap / 0.28) * 20))
  const score = Math.min(100, impWeight + posScore + ctrGap)
  const label = score >= 60 ? 'wysoki' : score >= 40 ? 'średni' : 'niski'
  const action =
    position > 40
      ? 'treść za słaba lub intencja nietrafiona – przebuduj tekst'
      : position > 10
        ? 'striking distance – dopisz sekcje i linki, najszybszy zysk'
        : 'pozycja dobra – popraw CTR (title/description)'
  return { keyword, impressions, position, ctr, score, label, action }
}

function fromGsc(file) {
  const rows = parseCsv(readFileSync(file, 'utf8'))
  const first = String(rows[0]?.[0] ?? '').toLowerCase()
  const dataRows = first.includes('zapytania') || first.includes('query') ? rows.slice(1) : rows
  const keywords = []
  for (const row of dataRows) {
    if (row.length < 5) continue
    const keyword = String(row[0]).trim()
    if (!keyword) continue
    const ctrRaw = String(row[3])
    keywords.push(
      scoreKeyword({
        keyword,
        impressions: toNumber(row[2]),
        ctr: toNumber(row[3]) / (ctrRaw.includes('%') ? 100 : 1),
        position: toNumber(row[4]),
      }),
    )
  }
  return keywords.sort((a, b) => b.score - a.score)
}

function fromSerp(file) {
  const text = readFileSync(file, 'utf8')
  const urls = (text.match(/https?:\/\/[^\s"'<>)]+/g) ?? []).map((url) => url.toLowerCase())
  const domains = [...new Set(urls.map((url) => url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]))]
  const strong = domains.filter((domain) => STRONG_DOMAINS.some((known) => domain.endsWith(known)))
  const weak = domains.filter((domain) => WEAK_DOMAINS.some((known) => domain.includes(known)))
  const unknown = domains.filter((domain) => !strong.includes(domain) && !weak.includes(domain))
  const score = Math.max(0, Math.min(100, 70 - strong.length * 8 + weak.length * 6 + unknown.length * 2))
  return {
    domains,
    strong,
    weak,
    unknown,
    score,
    label: score >= 60 ? 'wysoki' : score >= 40 ? 'średni' : 'niski',
    note:
      strong.length >= 5
        ? 'SERP zdominowany przez duże serwisy – wchodzić tylko z narzędziem lub unikalnymi danymi'
        : 'SERP zawiera luki (fora, małe blogi) – realna szansa przy dobrym tekście',
  }
}

const gscFile = arg('gsc')
const serpFile = arg('serp')
const keyword = arg('keyword')
const writeTarget = arg('write')
const outFile = arg('out') ?? 'content/queue/_opportunities.md'

if (!gscFile && !serpFile && !arg('score')) {
  console.error('Użycie: --gsc <csv>  lub  --keyword "fraza" --serp <plik>  lub  --write <json> --score <0-100>')
  process.exit(2)
}

const result = {}

if (gscFile) {
  const keywords = fromGsc(gscFile)
  result.gsc = keywords.slice(0, 40)
  const lines = ['# Potencjał fraz (GSC)', '', '| # | fraza | wyśw. | poz. | CTR | ocena | wniosek |', '|---|---|---|---|---|---|---|']
  keywords.slice(0, 40).forEach((item, index) => {
    lines.push(
      `| ${index + 1} | ${item.keyword} | ${item.impressions} | ${item.position} | ${(item.ctr * 100).toFixed(1)} % | **${item.score}** (${item.label}) | ${item.action} |`,
    )
  })
  writeFileSync(outFile, lines.join('\n'), 'utf8')
  console.log(`Zapisano: ${outFile} (${keywords.length} fraz)`)
  console.log('\nTop 10 do wzięcia:')
  keywords.slice(0, 10).forEach((item, index) => {
    console.log(`${index + 1}. ${item.keyword} — ${item.score}/100 (${item.label}), poz. ${item.position}, ${item.impressions} wyśw.`)
  })
}

if (serpFile) {
  const serp = fromSerp(serpFile)
  result.serp = { keyword, ...serp }
  console.log(`\nSERP dla „${keyword}": ${serp.score}/100 (${serp.label})`)
  console.log(`  duże serwisy: ${serp.strong.join(', ') || 'brak'}`)
  console.log(`  słabe/fora: ${serp.weak.join(', ') || 'brak'}`)
  console.log(`  inne: ${serp.unknown.join(', ') || 'brak'}`)
  console.log(`  ${serp.note}`)
}

if (writeTarget) {
  const draft = JSON.parse(readFileSync(writeTarget, 'utf8'))
  const previous = draft.research ?? {}
  const serpScore = result.serp?.score ?? 0
  const gscBest = result.gsc?.[0]
  const gscMatch = gscBest && keyword && gscBest.keyword.toLowerCase() === keyword.toLowerCase() ? gscBest.score : 0
  const manualScore = Number(arg('score') ?? 0)
  const opportunityScore = manualScore || Math.max(serpScore, gscMatch)
  draft.research = {
    ...previous,
    opportunityScore,
    opportunityLabel: opportunityScore >= 60 ? 'wysoki' : opportunityScore >= 40 ? 'średni' : 'niski',
    note: arg('note') ?? previous.note,
    serp: result.serp ?? previous.serp,
    gsc: result.gsc?.slice(0, 10) ?? previous.gsc,
    assessedAt: new Date().toISOString(),
  }
  writeFileSync(writeTarget, JSON.stringify(draft, null, 2), 'utf8')
  console.log(`\n→ zapisano research w ${writeTarget} (potencjał: ${opportunityScore}/100)`)
}

