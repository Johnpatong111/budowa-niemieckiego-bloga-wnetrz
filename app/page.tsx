import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { CATEGORIES, formatGermanDate, getPublishedArticles } from '@/lib/articles'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function Page() {
  const latest = [...getPublishedArticles()].sort(
    (a, b) => new Date(b.publishAt).getTime() - new Date(a.publishAt).getTime(),
  )
  const magazineArticles = latest.slice(0, 8)

  return (
    <main className="min-h-screen bg-[#f5f1eb] text-[#292a24]">
      <div className="border-b border-[#292a24]/15 bg-[#292a24] px-5 py-2 text-center text-[10px] font-medium uppercase tracking-[0.24em] text-[#f5f1eb] sm:text-xs">
        Ideen für ein Zuhause mit Gefühl
      </div>

      <header className="mx-auto flex max-w-[1380px] flex-wrap items-center justify-between gap-4 px-5 py-6 sm:px-8 lg:px-12">
        <Link href="/" className="font-serif text-2xl tracking-[-0.05em] sm:text-3xl" aria-label="raumgefühl Startseite">
          raum<span className="text-[#ad613d]">.</span>gefühl
        </Link>
        <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.16em] lg:flex" aria-label="Hauptnavigation">
          {CATEGORIES.map((category) => (
            <Link key={category.slug} href={`/kategorie/${category.slug}`} className="transition-colors hover:text-[#ad613d]">
              {category.name}
            </Link>
          ))}
          <Link href="/artikel" className="transition-colors hover:text-[#ad613d]">Magazin</Link>
        </nav>
        <details className="relative lg:hidden">
          <summary className="cursor-pointer list-none rounded border border-[#292a24]/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em]">
            Menü
          </summary>
          <nav className="absolute right-0 z-20 mt-2 w-52 border border-[#292a24]/15 bg-[#f5f1eb] py-2 text-sm shadow-lg" aria-label="Mobile Navigation">
            {CATEGORIES.map((category) => (
              <Link key={category.slug} href={`/kategorie/${category.slug}`} className="block px-4 py-2 hover:text-[#ad613d]">
                {category.name}
              </Link>
            ))}
            <Link href="/artikel" className="block px-4 py-2 hover:text-[#ad613d]">Alle Artikel</Link>
            <Link href="/ratgeber" className="block px-4 py-2 hover:text-[#ad613d]">Rechner</Link>
          </nav>
        </details>
      </header>

      <section id="top" className="mx-auto grid max-w-[1380px] gap-8 px-5 pb-16 sm:px-8 lg:grid-cols-[1.03fr_0.97fr] lg:gap-14 lg:px-12 lg:pb-24">
        <div className="flex flex-col justify-center py-10 lg:py-20">
          <p className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ad613d]">
            <span className="h-px w-10 bg-[#ad613d]" /> Die Kunst, daheim zu sein
          </p>
          <h1 className="max-w-2xl font-serif text-5xl leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-[5.8rem]">
            Räume, die<br /><em className="font-normal text-[#ad613d]">nach Hause</em><br />kommen.
          </h1>
          <p className="mt-8 max-w-md text-base leading-7 text-[#292a24]/70 sm:text-lg">
            Ein Magazin für alle, die ihr Zuhause nicht nur einrichten, sondern wirklich erleben möchten.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <a href="#magazin" className="flex w-fit items-center gap-3 border-b border-[#292a24] pb-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors hover:border-[#ad613d] hover:text-[#ad613d]">
              Inspiration entdecken <ArrowUpRight size={16} strokeWidth={1.5} />
            </a>
            <Link href="/ratgeber/lumen-rechner" className="flex w-fit items-center gap-3 border-b border-[#ad613d] pb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#ad613d] transition-colors hover:text-[#292a24]">
              Lumen berechnen <ArrowUpRight size={16} strokeWidth={1.5} />
            </Link>
            <Link href="/ratgeber/farbmengen-rechner" className="flex w-fit items-center gap-3 border-b border-[#ad613d] pb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#ad613d] transition-colors hover:text-[#292a24]">
              Farbbedarf berechnen <ArrowUpRight size={16} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden sm:min-h-[560px]">
          <Image
            src="/images/hero-interior.jpg"
            alt="Warmes Wohnzimmer mit einer leuchtenden Pendelleuchte"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute bottom-5 left-5 bg-[#f5f1eb]/90 px-4 py-3 backdrop-blur-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ad613d]">Titelstory</p>
            <p className="mt-1 font-serif text-lg">Das richtige Licht</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#292a24]/10 bg-[#eee8df] px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1380px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#ad613d]">Praktischer Ratgeber</p>
            <h2 className="font-serif text-3xl tracking-[-0.03em] sm:text-4xl">Wie viel Licht braucht Ihr Raum?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#292a24]/65">
              Berechnen Sie die passende Lichtmenge in Lumen kostenlos und erhalten Sie direkt eine verständliche Orientierung für Ihre Beleuchtung.
            </p>
          </div>
          <Link href="/ratgeber/lumen-rechner" className="flex shrink-0 items-center gap-2 border-b border-[#ad613d] pb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#ad613d] hover:text-[#292a24]">
            Zum Lumen Rechner <ArrowUpRight size={15} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      <section className="border-b border-[#292a24]/10 bg-[#f5f1eb] px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1380px] gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-3 border border-[#292a24]/15 bg-[#eee8df] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ad613d]">Farbe planen</p>
              <h2 className="mt-1 font-serif text-2xl">Wie viel Wandfarbe brauchen Sie?</h2>
            </div>
            <Link href="/ratgeber/farbmengen-rechner" className="flex w-fit shrink-0 items-center gap-2 border-b border-[#ad613d] pb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#ad613d]">
              Zum Rechner <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="flex flex-col gap-3 border border-[#292a24]/15 bg-[#eee8df] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ad613d]">Strom sparen</p>
              <h2 className="mt-1 font-serif text-2xl">Wie viel sparen Sie mit LED?</h2>
            </div>
            <Link href="/ratgeber/led-ersparnis-rechner" className="flex w-fit shrink-0 items-center gap-2 border-b border-[#ad613d] pb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#ad613d]">
              Zum Rechner <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>



      <section id="magazin" className="bg-[#e8e1d7] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1380px]">
          <div className="mb-10 flex items-end justify-between border-b border-[#292a24]/20 pb-5">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ad613d]">Aus dem Magazin</p>
              <h2 className="font-serif text-4xl tracking-[-0.04em] sm:text-5xl">Neu gedacht.</h2>
            </div>
            <Link href="/artikel" className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] sm:flex">
              Alle Artikel <ArrowUpRight size={15} strokeWidth={1.5} />
            </Link>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            {magazineArticles.map((article) => (
              <article key={article.slug} className="group">
                <Link href={`/artikel/${article.slug}`} aria-label={`Artikel lesen: ${article.title}`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ad613d]">{article.category}</p>
                  <h3 className="mt-2 max-w-lg font-serif text-2xl leading-tight tracking-[-0.025em] sm:text-3xl">{article.title}</h3>
                  <p className="mt-4 text-xs uppercase tracking-[0.12em] text-[#292a24]/55">{formatGermanDate(article.dateIso)}</p>
                  <span className="mt-5 inline-flex items-center gap-2 border-b border-[#292a24] pb-2 text-xs font-semibold uppercase tracking-[0.14em]">
                    Artikel lesen <ArrowUpRight size={14} strokeWidth={1.5} />
                  </span>
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-12 sm:hidden">
            <Link href="/artikel" className="inline-flex items-center gap-2 border-b border-[#292a24] pb-2 text-xs font-semibold uppercase tracking-[0.14em]">
              Alle Artikel <ArrowUpRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      <section id="themen" className="mx-auto grid max-w-[1380px] gap-8 px-5 py-16 sm:px-8 md:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-24">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#ad613d]">Unsere Themen</p>
          <h2 className="max-w-sm font-serif text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">Gut wohnen beginnt mit guten Fragen.</h2>
        </div>
        <div className="grid gap-0 border-t border-[#292a24]/20">
          {CATEGORIES.map((category, index) => (
            <Link
              key={category.slug}
              href={`/kategorie/${category.slug}`}
              className="flex items-center justify-between border-b border-[#292a24]/20 py-5 font-serif text-xl transition-colors hover:text-[#ad613d] sm:text-2xl"
            >
              <span>
                <span className="mr-5 font-sans text-xs text-[#ad613d]">0{index + 1}</span>
                {category.name}
              </span>
              <ArrowUpRight size={20} strokeWidth={1.4} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
