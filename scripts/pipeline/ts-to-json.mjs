#!/usr/bin/env node
/**
 * Konwertiert eine handgeschriebene Content-Datei (TS) in einen JSON-Draft für die Pipeline.
 *   node scripts/pipeline/ts-to-json.mjs <content.ts> <meta.json> <out.json> [widget]
 */
import { readFileSync, writeFileSync } from 'node:fs'

const [, , inputPath, metaPath, outPath, widget] = process.argv
if (!inputPath || !metaPath || !outPath) {
  console.error('Użycie: ts-to-json.mjs <content.ts> <meta.json> <out.json> [widget]')
  process.exit(2)
}

const source = readFileSync(inputPath, 'utf8')
  .replace(/^import[^\n]*\n/gm, '')
  .replace(/export const \w+:\s*ArticleContent\s*=/, 'return ')

const content = new Function(source)()
const meta = JSON.parse(readFileSync(metaPath, 'utf8'))
if (widget) content.widget = widget

writeFileSync(outPath, JSON.stringify({ slug: meta.slug, status: 'approved', meta, content }, null, 2), 'utf8')
console.log(`OK: ${outPath} (sekcje: ${content.sections.length}, faq: ${content.faq.length})`)
