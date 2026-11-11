#!/usr/bin/env node
/**
 * Benchmark konkurencji: ile słów mają strony rankujące na daną frazę.
 * Ustala dynamiczny cel długości: cel = średnia * 1.15 (min. 1100, max 2600).
 *
 * Google nie da się odpytać automatycznie (SERP = JS), dlatego źródła są jawne:
 *   --url <adres>      konkretna strona konkurencji (można podać wiele)
 *   --sitemap <adres>  wykrywanie po słowach kluczowych w sitemapie konkurenta
 *   --query "fraza"    do dopasowania w sitemapie i opisu
 *   --write <draft>    zapisuje research.competitor do draftu
 *
 *   node scripts/pipeline/benchmark.mjs --query "vinylboden fliesenoptik" \
 *        --sitemap https://www.heimwerker.de/sitemap.xml --write content/queue/x.json
 */
import { readFileSync, writeFileSync } from 'node:fs'

const args = process.argv.slice(2)
const arg = (name) => {
  const i = args.indexOf(`--${name}`)
  return i === -1 ? undefined : args[i + 1]
}
const argAll = (name) => {
  const out = []
  args.forEach((value, index) => {
    if (value === `--${name}` && args[index + 1]) out.push(args[index + 1])
  })
  return out
}

const query = arg('query') ?? ''
const sitemap = arg('sitemap')
const writeTarget = arg('write')
let urls = argAll('url')

const decode = (html) =>
  html.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&auml;/g, 'ä').replace(/&ouml;/g, 'ö').replace(/&uuml;/g, 'ü').replace(/&szlig;/g, 'ß')

const plain = (html) => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()

async function fromSitemap(sitemapUrl, keywords) {
  const res = await fetch(sitemapUrl, { headers: { 'User-Agent': 'raumgefuehl-research/1.0' } })
  if (!res.ok) return []
  const xml = await res.text()
  const all = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  const words = keywords.toLowerCase().split(/\s+/).filter((word) => word.length > 3)
  const scored = all
    .map((url) => {
      const slug = url.toLowerCase()
      const hits = words.filter((word) => slug.includes(word)).length
      return { url, hits }
    })
    .filter((item) => item.hits > 0)
    .sort((a, b) => b.hits - a.hits)
  return scored.slice(0, 3).map((item) => item.url)
}

async function measure(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'raumgefuehl-research/1.0' } })
    if (!res.ok) return { url, error: `HTTP ${res.status}` }
    const html = await res.text()
    const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html.match(/<article[\s\S]*?<\/article>/i)?.[0] ?? html
    const text = plain(main.replace(/<(script|style|nav|footer|header)[\s\S]*?<\/\1>/gi, ' '))
    return {
      url,
      words: text.split(/\s+/).filter(Boolean).length,
      tables: (html.match(/<table/gi) ?? []).length,
      faq: /häufige fragen|faq/i.test(html),
      calculator: /rechner|kalkulator|berechnen sie/i.test(html),
      steps: (html.match(/<ol/gi) ?? []).length,
    }
  } catch (error) {
    return { url, error: String(error.message ?? error) }
  }
}

if (sitemap && query) {
  const found = await fromSitemap(sitemap, query)
  urls = [...new Set([...urls, ...found])]
}

if (urls.length === 0) {
  console.error('Brak źródeł. Podaj --url lub --sitemap + --query')
  process.exit(2)
}

const results = []
for (const url of urls.slice(0, 6)) results.push(await measure(url))
const ok = results.filter((r) => !r.error && r.words > 200)
const avg = ok.length ? Math.round(ok.reduce((sum, r) => sum + r.words, 0) / ok.length) : 0
const max = ok.length ? Math.max(...ok.map((r) => r.words)) : 0
const target = Math.max(1100, Math.min(2600, Math.round(Math.max(avg, max) * 1.15)))

const lines = [`# Benchmark: ${query || '—'}`, '']
for (const r of results) {
  lines.push(r.error ? `- ${r.url} → ${r.error}` : `- ${r.url} → **${r.words} słów**, tabele ${r.tables}, FAQ ${r.faq ? 'tak' : 'nie'}, kalkulator ${r.calculator ? 'tak' : 'nie'}`)
}
lines.push('', `Średnia konkurencji: **${avg}** słów · najdłuższy: **${max}** · nasz cel: **${target}** słów (+15%)`)

console.log(lines.join('\n'))

if (writeTarget) {
  const draft = JSON.parse(readFileSync(writeTarget, 'utf8'))
  draft.research = {
    ...(draft.research ?? {}),
    competitor: { query, urls: results, avgWords: avg, maxWords: max, targetWords: target, measuredAt: new Date().toISOString() },
  }
  writeFileSync(writeTarget, JSON.stringify(draft, null, 2), 'utf8')
  console.log(`\n→ research.competitor zapisany w ${writeTarget} (cel: ${target} słów)`)
}
