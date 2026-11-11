import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { CATEGORIES, formatGermanDate, getPublishedArticles } from '@/lib/articles'
import { SITE, OG_IMAGE } from '@/lib/site'

const title = 'Alle Artikel: Ratgeber für Licht, Renovierung und Wohnen'
const description =
  'Alle Artikel im raumgefühl Magazin: Lichtplanung, LED, Renovierung, Fenster, Schimmel und Garten – Schritt für Schritt erklärt.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/artikel' },
  openGraph: { url: '/artikel', title, description, images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', title, description },
}

export default function ArtikelIndexPage() {
  const articles = [...getPublishedArticles()].sort(
    (a, b) => new Date(b.publishAt).getTime() - new Date(a.publishAt).getTime(),
  )

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE.url}/artikel#collection`,
    name: 'Alle Artikel – raumgefühl',
    description,
    url: `${SITE.url}/artikel`,
    inLanguage: 'de-DE',
    isPartOf: { '@type': 'WebSite', '@id': `${SITE.url}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE.url}/artikel/${article.slug}`,
        name: article.title,
      })),
    },
  }

  return (
    <main className="min-h-screen bg-[#f5f1eb] text-[#292a24]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="mx-auto flex max-w-[1180px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <Link href="/" className="font-serif text-2xl tracking-[-0.05em] sm:text-3xl">
          raum<span className="text-[#ad613d]">.</span>gefühl
        </Link>
        <Link href="/" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] hover:text-[#ad613d]">
          <ArrowLeft size={15} /> Startseite
        </Link>
      </header>

      <div className="mx-auto max-w-[1180px] px-5 pb-20 sm:px-8 lg:px-12">
        <nav aria-label="Breadcrumb" className="mb-10 text-xs uppercase tracking-[0.15em] text-[#292a24]/55">
          <Link href="/" className="hover:text-[#ad613d]">Startseite</Link>
          <span className="mx-2">/</span>
          <span>Alle Artikel</span>
        </nav>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ad613d]">Magazin</p>
        <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.05em] sm:text-7xl">Alle Artikel</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#292a24]/70">
          {articles.length} Beiträge zu Licht, Materialien, Renovierung und einem Zuhause, das im Alltag funktioniert.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/kategorie/${category.slug}`}
              className="border border-[#292a24]/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] hover:border-[#ad613d] hover:text-[#ad613d]"
            >
              {category.name}
            </Link>
          ))}
        </div>

        <div className="mt-14 grid gap-10 border-t border-[#292a24]/15 pt-10 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article key={article.slug} className="group">
              <Link href={`/artikel/${article.slug}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ad613d]">
                  {article.category} · {formatGermanDate(article.dateIso)}
                </p>
                <h2 className="mt-2 font-serif text-2xl leading-tight tracking-[-0.02em] group-hover:text-[#ad613d]">{article.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#292a24]/65">{article.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
                  Weiterlesen <ArrowUpRight size={13} />
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
