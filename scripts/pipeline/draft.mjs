#!/usr/bin/env node
/**
 * Generator draftu na bazie briefu konkurencyjnego.
 * Wymaga klucza OpenAI-compatible API (opcjonalne — bez niego tekst pisze człowiek/asystent).
 *
 *   setx OPENAI_API_KEY "sk-..."
 *   node scripts/pipeline/draft.mjs --slug mein-thema --keyword "mein thema" \
 *        --category zuhause --image /images/mein-thema.jpg
 *
 * Wynik: content/queue/<slug>.json ze statusem "review" (walidator sam sprawdzi bramki).
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { PATHS, GATES } from './config.mjs'

const args = process.argv.slice(2)
const arg = (name, fallback = '') => {
  const i = args.indexOf(`--${name}`)
  return i === -1 ? fallback : (args[i + 1] ?? fallback)
}

const slug = arg('slug')
const keyword = arg('keyword')
const categorySlug = arg('category', 'zuhause')
const image = arg('image', `/images/${slug}.jpg`)
const autoApprove = args.includes('--auto-approve')

if (!slug || !keyword) {
  console.error('Użycie: node scripts/pipeline/draft.mjs --slug <slug> --keyword "fraza" [--category zuhause] [--image /images/x.jpg]')
  process.exit(2)
}

const apiKey =
  process.env.OPENAI_API_KEY ||
  process.env.OPENAI_API_KEY_USER ||
  (typeof process !== 'undefined' && process.env.OPENAI_API_KEY) ||
  ''

if (!apiKey) {
  console.log('Brak OPENAI_API_KEY.')
  console.log('Ustaw go raz:  setx OPENAI_API_KEY "sk-..."  (potem nowy terminal)')
  console.log('Albo napisz draft ręcznie z content/queue/_template.json — walidator i publikacja działają bez klucza.')
  process.exit(1)
}

const briefPath = join(PATHS.queue, `${slug}.brief.md`)
const brief = existsSync(briefPath) ? readFileSync(briefPath, 'utf8').slice(0, 6000) : '(brak briefu — najpierw uruchom brief.mjs)'

const schema = `{
  "meta": { "title": string, "category": string, "categorySlug": "beleuchtung|zuhause|interieur|garten|ratgeber",
    "dateIso": "YYYY-MM-DD", "image": "${image}", "imageAlt": string, "description": string,
    "keyword": "${keyword}", "publishAt": "YYYY-MM-DDTHH:mm:ss.000Z" },
  "content": { "intro": string, "keyTakeaways": string[5], "widget": "fugen-kosten" | null,
    "sections": [{ "heading": string, "blocks": [ {"type":"p","text":string} | {"type":"ul","items":string[]} |
      {"type":"ol","items":string[]} | {"type":"steps","items":[{"title":string,"text":string}]} |
      {"type":"table","head":string[],"rows":string[][]} | {"type":"note","title":string,"text":string} ] }],
    "faq": [{"question":string,"answer":string}], "sources": [{"label":string}] }
}`

const prompt = `Du schreibst einen deutschen Ratgeber für das Magazin "raumgefühl".

Keyword: ${keyword}
Kategorie: ${categorySlug}

Recherche zur Konkurrenz:
${brief}

Harte Vorgaben:
- ${GATES.minWords}–${GATES.maxWords} Wörter Fließtext, ${GATES.minSections}–${GATES.maxSections} Abschnitte
- mindestens ${GATES.minTables} Tabelle, mindestens ${GATES.minLists} Liste oder Schrittfolge
- genau ${GATES.minFaq} FAQ-Fragen, mindestens ${GATES.minSources} Quellen
- mindestens ${GATES.minInternalLinks} interne Links (<a href="/artikel/...">…</a>)
- mindestens 1 Werkzeug: entweder "widget": "fugen-kosten" (nur bei Fugen-Themen) oder ein Link auf /ratgeber/...
- Titel 30–70 Zeichen, description 120–165 Zeichen, kein HTML in description
- Keyword im Titel, im ersten Absatz (intro) und in mindestens einer Überschrift
- Sprache: natürliches Deutsch, kurze Sätze (max. 24 Wörter im Schnitt), konkrete Zahlen, Preise als Bereiche
- keine Floskeln, keine Wiederholungen, keine erfundenen Quellen

Antworte ausschließlich mit JSON in diesem Schema:
${schema}`

const res = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
  body: JSON.stringify({
    model: arg('model', 'gpt-4o-mini'),
    temperature: 0.4,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: 'Du bist ein erfahrener deutscher Fachredakteur für Haus und Wohnen. Antworte nur mit gültigem JSON.' },
      { role: 'user', content: prompt },
    ],
  }),
})

if (!res.ok) {
  console.error(`API HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`)
  process.exit(1)
}

const data = await res.json()
const raw = data.choices?.[0]?.message?.content ?? '{}'
let parsed
try {
  parsed = JSON.parse(raw)
} catch {
  console.error('Model hat kein gültiges JSON geliefert.')
  process.exit(1)
}

const draft = { slug, status: autoApprove ? 'approved' : 'review', ...parsed }
const out = join(PATHS.queue, `${slug}.json`)
writeFileSync(out, JSON.stringify(draft, null, 2), 'utf8')
console.log(`Draft zapisany: ${out}`)
console.log(`Tokeny: ${data.usage?.total_tokens ?? '?'} | status: ${draft.status}`)
console.log('Nächster Schritt: node scripts/pipeline/validate.mjs ' + out)
