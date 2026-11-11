#!/usr/bin/env node
/**
 * Publikacja: bierze draft z content/queue, sprawdza bramki, przenosi do content/articles,
 * regeneruje pliki wynikowe i robi commit + push (co uruchamia deploy na Vercelu).
 *
 *   node scripts/pipeline/publish.mjs            # publikuje pierwszy gotowy draft
 *   node scripts/pipeline/publish.mjs --dry      # tylko walidacja, bez zapisu
 *   node scripts/pipeline/publish.mjs --no-push  # zapis + commit, bez push
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { PATHS, ROOT } from './config.mjs'
import { validateArticle } from './validate.mjs'

const args = process.argv.slice(2)
const dry = args.includes('--dry')
const push = !args.includes('--no-push')

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'))
mkdirSync(PATHS.queue, { recursive: true })
mkdirSync(PATHS.articles, { recursive: true })

const drafts = readdirSync(PATHS.queue).filter((f) => f.endsWith('.json'))
if (drafts.length === 0) {
  console.log('Kolejka pusta — brak draftów w content/queue.')
  process.exit(0)
}

let chosen = null
for (const file of drafts) {
  const article = readJson(join(PATHS.queue, file))
  const result = validateArticle(article)
  const publishAt = new Date(article.meta?.publishAt ?? 0).getTime()
  const ready = result.ok && article.status !== 'draft' && publishAt <= Date.now()
  const icon = result.ok ? (ready ? '✅' : '⏳') : '❌'
  console.log(`${icon} ${file} — ${result.score}/100, ${result.wordCount} słów, status: ${article.status ?? 'brak'}`)
  if (!result.ok) {
    for (const gate of result.gates.filter((g) => !g.ok)) {
      console.log(`     FAIL ${gate.name}: ${gate.detail}`)
    }
  }
  if (ready && !chosen) chosen = { file, article }
}

if (!chosen) {
  console.log('\nBrak artykułu gotowego do publikacji (wymagany status "approved", publishAt <= teraz i wszystkie bramki OK).')
  process.exit(1)
}

if (dry) {
  console.log(`\n[DRY] Opublikowałbym: ${chosen.article.slug}`)
  process.exit(0)
}

const slug = chosen.article.slug
const target = join(PATHS.articles, `${slug}.json`)
writeFileSync(target, JSON.stringify({ ...chosen.article, status: 'published' }, null, 2), 'utf8')
unlinkSync(join(PATHS.queue, chosen.file))
console.log(`\n→ content/articles/${slug}.json`)

function regenerate() {
  const files = readdirSync(PATHS.articles).filter((f) => f.endsWith('.json'))
  const articles = files
    .map((f) => readJson(join(PATHS.articles, f)))
    .sort((a, b) => String(a.meta.publishAt).localeCompare(String(b.meta.publishAt)))

  const metaHeader = '// AUTO-GENERATED przez scripts/pipeline/publish.mjs — nie edytuj ręcznie.\nimport type { ArticleMeta } from \'./articles\'\n\nexport const GENERATED_ARTICLES: ArticleMeta[] = '
  writeFileSync(PATHS.generatedMeta, metaHeader + JSON.stringify(articles.map((a) => a.meta), null, 2) + '\n', 'utf8')

  const richHeader = '// AUTO-GENERATED przez scripts/pipeline/publish.mjs — nie edytuj ręcznie.\nimport type { ArticleContent } from \'@/lib/content\'\n\nexport const GENERATED_RICH: Record<string, ArticleContent> = '
  const richMap = Object.fromEntries(articles.map((a) => [a.slug, a.content]))
  writeFileSync(PATHS.generatedRich, richHeader + JSON.stringify(richMap, null, 2) + '\n', 'utf8')

  const statePath = PATHS.state
  const state = existsSync(statePath) ? readJson(statePath) : {}
  writeFileSync(
    statePath,
    JSON.stringify({ ...state, lastPublish: new Date().toISOString(), lastSlug: slug, nextIntervalHours: 24 + Math.round(Math.random() * 24) }, null, 2),
    'utf8',
  )
  console.log(`→ ${articles.length} artykułów w generated (meta + treść)`)
}

regenerate()

const git = (gitArgs) => execFileSync('git', gitArgs, { cwd: ROOT, stdio: 'pipe' }).toString().trim()
try {
  git(['add', 'content', 'lib', '.pipeline-state.json'])
  git(['-c', 'user.name=Johnpatong111', '-c', 'user.email=johnpatong111@gmail.com', 'commit', '-m', `content: publish ${slug}`])
  if (push) {
    git(['push', 'origin', 'HEAD:main'])
    console.log('→ push wykonany (Vercel zbuduje automatycznie)')
  } else {
    console.log('→ commit lokalny, bez push')
  }
} catch (error) {
  console.log('git: brak zmian albo błąd — sprawdź `git status`')
  console.log(String(error.message ?? error).split('\n')[0])
}
