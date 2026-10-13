import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

const articles = {
  'lichtplanung-ohne-geheimnisse': {
    category: 'Beleuchtung',
    title: 'Lichtplanung ohne Geheimnisse: So wird jeder Raum gemütlich',
    date: '12. Oktober 2026',
    image: '/images/lighting-detail.png',
    alt: 'Detail einer warm leuchtenden Pendelleuchte über einem Esstisch',
    intro: 'Gutes Licht macht mehr als hell. Es schafft Tiefe, lenkt den Blick und gibt einem Raum genau die Stimmung, die du dir wünschst.',
    paragraphs: [
      'Die schönste Einrichtung verliert an Wirkung, wenn die Beleuchtung nur aus einer einzigen Deckenleuchte besteht. Ein wohnliches Zuhause lebt von mehreren Lichtquellen, die sich ergänzen und unterschiedliche Bereiche sichtbar machen.',
      'Beginne mit dem Grundlicht für die allgemeine Orientierung. Danach kommen Akzentleuchten hinzu: eine Pendelleuchte über dem Tisch, eine Leselampe neben dem Sofa oder eine kleine Leuchte auf dem Sideboard. So entsteht ein ruhiges, flexibles Lichtbild.',
      'Achte außerdem auf die Lichtfarbe. Warmweißes Licht zwischen 2.700 und 3.000 Kelvin wirkt besonders wohnlich. Mit dimmbaren Leuchten kannst du die Atmosphäre im Laufe des Tages verändern, ohne deine Einrichtung neu zu planen.',
    ],
  },
  'natuerliche-materialien-fuer-mehr-ruhe': {
    category: 'Wohnen',
    title: 'Die neue Ruhe: Warum natürliche Materialien Räume verändern',
    date: '05. Oktober 2026',
    image: '/images/living-room.png',
    alt: 'Ruhiges Wohnzimmer mit natürlichen Materialien und sanften Farben',
    intro: 'Holz, Leinen und Stein bringen eine angenehme Ruhe in Räume. Nicht als Trend, sondern als zeitlose Basis für ein Zuhause mit Charakter.',
    paragraphs: [
      'Natürliche Materialien erzählen von ihrer Herkunft. Die Maserung von Holz, die Struktur von Leinen und die kühle Oberfläche von Stein machen eine Einrichtung spürbar und geben ihr Tiefe.',
      'Besonders harmonisch wirkt eine Mischung aus warmen und kühlen Oberflächen. Kombiniere beispielsweise einen groben Leinenbezug mit einem glatten Holztisch und kleinen Akzenten aus Keramik.',
      'Weniger ist dabei oft mehr. Wähle wenige Materialien bewusst aus und wiederhole sie an verschiedenen Stellen im Raum. So entsteht ein roter Faden, der ruhig wirkt und trotzdem persönlich bleibt.',
    ],
  },
} as const

type ArticleSlug = keyof typeof articles

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles[slug as ArticleSlug]
  return { title: article ? `${article.title} | raumgefühl` : 'Artikel | raumgefühl', description: article?.intro }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles[slug as ArticleSlug]

  if (!article) {
    return <main className="flex min-h-screen items-center justify-center bg-[#f5f1eb] px-6 text-center text-[#292a24]"><div><p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#ad613d]">404</p><h1 className="font-serif text-5xl">Artikel nicht gefunden.</h1><Link href="/" className="mt-8 inline-flex items-center gap-2 border-b border-[#292a24] pb-2 text-xs font-semibold uppercase tracking-[0.14em]">Zur Startseite <ArrowUpRight size={14} /></Link></div></main>
  }

  return <main className="min-h-screen bg-[#f5f1eb] text-[#292a24]"><header className="mx-auto flex max-w-[1380px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12"><Link href="/" className="font-serif text-2xl tracking-[-0.05em] sm:text-3xl" aria-label="raumgefühl Startseite">raum<span className="text-[#ad613d]">.</span>gefühl</Link><Link href="/" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] hover:text-[#ad613d]"><ArrowLeft size={15} /> Zurück zum Magazin</Link></header><article className="mx-auto max-w-[1180px] px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28"><div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16"><div><p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#ad613d]">{article.category}</p><h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-[5.5rem]">{article.title}</h1><p className="mt-6 text-xs uppercase tracking-[0.15em] text-[#292a24]/55">{article.date}</p></div><div className="relative aspect-[4/3] overflow-hidden"><Image src={article.image} alt={article.alt} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" /></div></div><div className="mx-auto mt-14 grid max-w-3xl gap-7 text-lg leading-8 text-[#292a24]/80"><p className="font-serif text-2xl leading-tight text-[#292a24] sm:text-3xl">{article.intro}</p>{article.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<Link href="/" className="mt-6 inline-flex w-fit items-center gap-2 border-b border-[#292a24] pb-2 text-xs font-semibold uppercase tracking-[0.15em] hover:border-[#ad613d] hover:text-[#ad613d]">Mehr Inspiration entdecken <ArrowUpRight size={15} /></Link></div></article></main>
}
