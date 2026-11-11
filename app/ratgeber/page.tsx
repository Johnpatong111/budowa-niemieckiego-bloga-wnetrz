import type { Metadata } from 'next'
import Link from 'next/link'
import { formatGermanDate, getArticlesByCategory } from '@/lib/articles'
import { OG_IMAGE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Ratgeber: Rechner und praktische Tipps für Ihr Zuhause',
  description:
    'Praktische Ratgeber und Rechner rund um Beleuchtung, Energie und Renovierung für ein schöneres Zuhause.',
  alternates: { canonical: '/ratgeber' },
  openGraph: {
    url: '/ratgeber',
    title: 'Ratgeber: Rechner und praktische Tipps für Ihr Zuhause',
    description:
      'Lumen, Farbmenge und LED-Ersparnis berechnen – plus Schritt-für-Schritt-Anleitungen für Renovierung und Alltag.',
      images: [OG_IMAGE],
  },
}

const tools = [
  ['Lumen Rechner', 'Berechnen Sie, wie viele Lumen ein Raum für eine passende Beleuchtung benötigt.', '/ratgeber/lumen-rechner'],
  ['Farbmengen Rechner', 'Ermitteln Sie den ungefähren Farbbedarf für Wände und Decken.', '/ratgeber/farbmengen-rechner'],
  ['LED Ersparnis Rechner', 'Vergleichen Sie Stromkosten und Ersparnis beim Wechsel auf LED.', '/ratgeber/led-ersparnis-rechner'],
]

export default function RatgeberPage() {
  return (
    <main className="min-h-screen bg-[#f5f1eb] text-[#292a24]">
      <header className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-7 sm:px-8">
        <Link href="/" className="font-serif text-2xl tracking-[-0.05em]">raum<span className="text-[#ad613d]">.</span>gefühl</Link>
        <Link href="/" className="text-sm text-[#292a24]/65 hover:text-[#ad613d]">Startseite</Link>
      </header>
      <div className="mx-auto max-w-[900px] px-5 py-10 sm:px-8 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-10 text-xs text-[#292a24]/55"><Link href="/">Startseite</Link><span className="mx-2">/</span><span>Ratgeber</span></nav>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ad613d]">Praktische Werkzeuge</p>
        <h1 className="mt-3 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">Ratgeber und Rechner für Ihr Zuhause</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#292a24]/70">Nützliche Rechner und verständliche Tipps helfen Ihnen bei Beleuchtung, Renovierung und einem komfortablen Zuhause.</p>
        <section aria-labelledby="rechner" className="mt-14">
          <h2 id="rechner" className="font-serif text-3xl">Unsere Rechner</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {tools.map(([title, description, href]) => <Link key={href} href={href} className="border border-[#292a24]/15 bg-[#eee8df] p-5 transition-colors hover:border-[#ad613d]"><h3 className="font-serif text-xl">{title}</h3><p className="mt-3 text-sm leading-6 text-[#292a24]/65">{description}</p><span className="mt-5 block text-xs font-semibold uppercase tracking-[0.12em] text-[#ad613d]">Zum Rechner →</span></Link>)}
          </div>
        </section>

        <section aria-labelledby="ratgeber-artikel" className="mt-16">
          <div className="flex items-end justify-between gap-4 border-b border-[#292a24]/15 pb-4">
            <h2 id="ratgeber-artikel" className="font-serif text-3xl">Ratgeber-Artikel</h2>
            <Link href="/artikel" className="text-xs font-semibold uppercase tracking-[0.12em] text-[#ad613d] hover:underline">
              Alle Artikel →
            </Link>
          </div>
          <div className="mt-6 grid gap-3">
            {getArticlesByCategory('ratgeber').map((article) => (
              <Link
                key={article.slug}
                href={`/artikel/${article.slug}`}
                className="flex flex-col gap-1 border-b border-[#292a24]/10 py-4 transition-colors hover:text-[#ad613d] sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span className="font-serif text-xl leading-tight">{article.title}</span>
                <span className="shrink-0 text-[10px] uppercase tracking-[0.14em] text-[#292a24]/50">
                  {formatGermanDate(article.dateIso)}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
