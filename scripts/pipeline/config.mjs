import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')

export const PATHS = {
  queue: join(ROOT, 'content', 'queue'),
  articles: join(ROOT, 'content', 'articles'),
  generatedRich: join(ROOT, 'content', 'rich', 'generated.ts'),
  generatedMeta: join(ROOT, 'lib', 'articles.generated.ts'),
  images: join(ROOT, 'public', 'images'),
  state: join(ROOT, '.pipeline-state.json'),
}

/**
 * Bramki jakości. Zmieniaj świadomie – to one decydują, czy tekst jedzie na produkcję.
 */
export const GATES = {
  minWords: 1100,
  maxWords: 2600,
  minSections: 5,
  maxSections: 14,
  minFaq: 5,
  minSources: 2,
  minInternalLinks: 2,
  maxExternalLinks: 2,
  minTables: 1,
  minLists: 1,
  titleMin: 30,
  titleMax: 70,
  descMin: 120,
  descMax: 165,
  maxAvgSentenceWords: 24,
  requireWidgetOrTool: true,
  // Nowe mierniki „anti-AI" – tekst ma być lepszy niż odpowiedź czatu
  minInnovation: 60,
  minUsefulness: 70,
  minDwell: 55,
}

export const FORBIDDEN_PHRASES = [
  'Der wichtigste Begriff für diesen Ratgeber',
  'In diesem Beitrag finden Sie eine klare, praktische Antwort',
  'lediglich',
  'grundsätzlich immer',
]

export const CATEGORY_SLUGS = ['beleuchtung', 'zuhause', 'interieur', 'garten', 'ratgeber']
