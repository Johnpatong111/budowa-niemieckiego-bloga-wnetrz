#!/usr/bin/env node
/**
 * Raport ze wszystkich opublikowanych artykułów: bramki, mierniki anti-AI, potencjał.
 *   node scripts/pipeline/report.mjs
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { PATHS, GATES } from './config.mjs'
import { validateArticle } from './validate.mjs'

const files = readdirSync(PATHS.articles).filter((f) => f.endsWith('.json'))
const rows = []

for (const file of files) {
  const article = JSON.parse(readFileSync(join(PATHS.articles, file), 'utf8'))
  const result = validateArticle(article)
  rows.push({
    slug: article.slug,
    words: result.wordCount,
    gates: `${result.gates.filter((g) => g.ok).length}/${result.gates.length}`,
    ok: result.ok,
    innovation: result.scores.innovation,
    usefulness: result.scores.usefulness,
    dwell: result.scores.dwell,
    aiProof: result.scores.aiProof,
    opportunity: article.research?.opportunityScore ?? 0,
    widget: article.content?.widget ?? '—',
  })
}

rows.sort((a, b) => b.innovation - a.innovation)

console.log('| artykuł | słowa | bramki | innow. | wartość | pozostanie | AI-proof | potencjał | widget |')
console.log('|---|---|---|---|---|---|---|---|---|')
for (const row of rows) {
  console.log(
    `| ${row.ok ? '✅' : '❌'} ${row.slug} | ${row.words} | ${row.gates} | ${row.innovation} | ${row.usefulness} | ${row.dwell} | ${row.aiProof ? 'tak' : 'nie'} | ${row.opportunity} | ${row.widget} |`,
  )
}

const avg = (key) => Math.round(rows.reduce((sum, row) => sum + row[key], 0) / Math.max(1, rows.length))
console.log('')
console.log(`Artykuły: ${rows.length}`)
console.log(`Średnia innowacyjność: ${avg('innovation')} (próg ${GATES.minInnovation})`)
console.log(`Średnia wartość: ${avg('usefulness')} (próg ${GATES.minUsefulness})`)
console.log(`Średnia pozostanie: ${avg('dwell')} (próg ${GATES.minDwell})`)
console.log(`Odpornych na AI: ${rows.filter((r) => r.aiProof).length}/${rows.length}`)
console.log(`Z widgetem: ${rows.filter((r) => r.widget !== '—').length}/${rows.length}`)
console.log(`Wszystkie bramki OK: ${rows.filter((r) => r.ok).length}/${rows.length}`)
