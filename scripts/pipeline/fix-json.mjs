#!/usr/bin/env node
/**
 * Naprawia typowe błędy w ręcznie pisanym JSON-ie draftu: przecinki końcowe przed } i ].
 *   node scripts/pipeline/fix-json.mjs content/queue/mein-artikel.json
 */
import { readFileSync, writeFileSync } from 'node:fs'

const file = process.argv[2]
if (!file) {
  console.error('Użycie: node scripts/pipeline/fix-json.mjs <plik.json>')
  process.exit(2)
}

let text = readFileSync(file, 'utf8')
let removed = 0
text = text.replace(/,\s*([}\]])/g, (_match, brace) => {
  removed++
  return brace
})

try {
  JSON.parse(text)
} catch (error) {
  console.error(`Nadal niepoprawny JSON: ${error.message}`)
  process.exit(1)
}

writeFileSync(file, text, 'utf8')
console.log(`OK — usunięto ${removed} przecinków końcowych, JSON poprawny`)
