import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { CATEGORIES, categoryUrl, formatGermanDate, getArticlesByCategory, getCategory } from '@/lib/articles'
import { SITE, OG_IMAGE } from '@/lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const category = getCategory(slug)

  if (!category) {
    return { title: 'Kategorie nicht gefunden', robots: { index: false, follow: true } }
  }

  const title = `${category.name}: Tipps, Anleitungen und Ideen`
  const description = `${category.intro} Alle Artikel der Kategorie ${category.name} im raumgefühl Magazin – praxisnah erklärt.`

  return {
    title,
    description,
    alternates: { canonical: `/kategorie/${category.slug}` },
    openGraph: { url: `/kategorie/${category.slug}`, title, description, images: [OG_IMAGE] },
    twitter: { card: 'summary_large_image', title, description },
    robots: { index: true, follow: true },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) notFound()

  const articles = getArticlesByCategory(category.slug)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${categoryUrl(category.slug)}#collection`,
      name: `${category.name} – raumgefühl`,
      description: category.intro,
      url: categoryUrl(category.slug),
      inLanguage: 'de-DE',
      isPartOf: { '@type': 'WebSite', '@id': `${SITE.url}/#website` },
      breadcrumb: { '@id': `${categoryUrl(category.slug)}#breadcrumb` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${categoryUrl(category.slug)}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: SITE.url },
        { '@type': 'ListItem', position: 2, name: category.name, item: categoryUrl(category.slug) },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `Artikel aus ${category.name}`,
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE.url}/artikel/${article.slug}`,
        name: article.title,
      })),
    },
  ]

  return (
    <main className="min-h-screen bg-[#f5f1eb] text-[#292a24]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="border-b border-[#292a24]/15 bg-[#292a24] px-5 py-2 text-center text-[10px] font-medium uppercase tracking-[0.24em] text-[#f5f1eb] sm:text-xs">
        Ideen für ein Zuhause mit Gefühl
      </div>

      <header className="mx-auto flex max-w-[1380px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <Link href="/" className="font-serif text-2xl tracking-[-0.05em] sm:text-3xl">
          raum<span className="text-[#ad613d]">.</span>gefühl
        </Link>
        <Link href="/artikel" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] hover:text-[#ad613d]">
          <ArrowLeft size={15} /> Alle Artikel
        </Link>
      </header>

      <section className="mx-auto max-w-[1380px] px-5 pb-16 pt-12 sm:px-8 lg:px-12 lg:pb-24 lg:pt-20">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs uppercase tracking-[0.15em] text-[#292a24]/55">
          <Link href="/" className="hover:text-[#ad613d]">Startseite</Link>
          <span className="mx-2">/</span>
          <span>{category.name}</span>
        </nav>
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#ad613d]">Kategorie</p>
        <h1 className="font-serif text-6xl tracking-[-0.05em] sm:text-8xl">{category.name}</h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-[#292a24]/70">{category.intro}</p>
        <p className="mt-3 text-xs uppercase tracking-[0.15em] text-[#292a24]/50">
          {articles.length} Artikel in dieser Kategorie
        </p>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {articles.map((article) => (
            <article key={article.slug} className="group">
              <Link href={`/artikel/${article.slug}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ad613d]">
                  {category.name} · {formatGermanDate(article.dateIso)}
                </p>
                <h2 className="mt-2 max-w-lg font-serif text-3xl leading-tight tracking-[-0.025em]">{article.title}</h2>
                <p className="mt-3 max-w-lg text-sm leading-6 text-[#292a24]/65">{article.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 border-b border-[#292a24] pb-2 text-xs font-semibold uppercase tracking-[0.14em]">
                  Artikel lesen <ArrowUpRight size={14} />
                </span>
              </Link>
            </article>
          ))}
        </div>

        {articles.length === 0 && (
          <p className="mt-16 text-base text-[#292a24]/65">In dieser Kategorie sind noch keine Artikel erschienen.</p>
        )}

        <div className="mt-16 flex flex-wrap gap-6 border-t border-[#292a24]/15 pt-8">
          {CATEGORIES.filter((item) => item.slug !== category.slug).map((item) => (
            <Link key={item.slug} href={`/kategorie/${item.slug}`} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] hover:text-[#ad613d]">
              {item.name} <ArrowUpRight size={13} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

