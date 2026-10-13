import Image from 'next/image'
import { ArrowUpRight, Instagram, Menu, Search } from 'lucide-react'

const categories = ['Beleuchtung', 'Wohnen', 'Materialien', 'Grundrisse']

const articles = [
  {
    category: 'Beleuchtung',
    title: 'Lichtplanung ohne Geheimnisse: So wird jeder Raum gemütlich',
    date: '12. Oktober 2026',
    image: '/images/lighting-detail.png',
  },
  {
    category: 'Wohnen',
    title: 'Die neue Ruhe: Warum natürliche Materialien Räume verändern',
    date: '05. Oktober 2026',
    image: '/images/living-room.png',
  },
]

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f5f1eb] text-[#292a24]">
      <div className="border-b border-[#292a24]/15 bg-[#292a24] px-5 py-2 text-center text-[10px] font-medium uppercase tracking-[0.24em] text-[#f5f1eb] sm:text-xs">
        Ideen für ein Zuhause mit Gefühl
      </div>

      <header className="mx-auto flex max-w-[1380px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <a href="#top" className="font-serif text-2xl tracking-[-0.05em] sm:text-3xl" aria-label="Raumgefühl Startseite">
          raum<span className="text-[#ad613d]">.</span>gefühl
        </a>
        <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.16em] lg:flex" aria-label="Hauptnavigation">
          {categories.map((category) => <a key={category} href={`#${category.toLowerCase()}`} className="transition-colors hover:text-[#ad613d]">{category}</a>)}
          <a href="#magazin" className="transition-colors hover:text-[#ad613d]">Magazin</a>
        </nav>
        <div className="flex items-center gap-2">
          <button type="button" className="hidden rounded-full p-2 transition-colors hover:bg-[#292a24]/10 sm:block" aria-label="Suche öffnen"><Search size={18} strokeWidth={1.5} /></button>
          <button type="button" className="rounded-full p-2 transition-colors hover:bg-[#292a24]/10 lg:hidden" aria-label="Menü öffnen"><Menu size={21} strokeWidth={1.5} /></button>
          <a href="#newsletter" className="hidden rounded-full bg-[#ad613d] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-transform hover:-translate-y-0.5 sm:block">Newsletter</a>
        </div>
      </header>

      <section id="top" className="mx-auto grid max-w-[1380px] gap-8 px-5 pb-16 sm:px-8 lg:grid-cols-[1.03fr_0.97fr] lg:gap-14 lg:px-12 lg:pb-24">
        <div className="flex flex-col justify-center py-10 lg:py-20">
          <p className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ad613d]"><span className="h-px w-10 bg-[#ad613d]" /> Die Kunst, daheim zu sein</p>
          <h1 className="max-w-2xl font-serif text-5xl leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-[5.8rem]">Räume, die<br /><em className="font-normal text-[#ad613d]">nach Hause</em><br />kommen.</h1>
          <p className="mt-8 max-w-md text-base leading-7 text-[#292a24]/70 sm:text-lg">Ein Magazin für alle, die ihr Zuhause nicht nur einrichten, sondern wirklich erleben möchten.</p>
          <a href="#magazin" className="mt-9 flex w-fit items-center gap-3 border-b border-[#292a24] pb-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors hover:border-[#ad613d] hover:text-[#ad613d]">Inspiration entdecken <ArrowUpRight size={16} strokeWidth={1.5} /></a>
        </div>
        <div className="relative min-h-[420px] overflow-hidden sm:min-h-[560px]">
          <Image src="/images/hero-interior.png" alt="Warmes Wohnzimmer mit einer leuchtenden Pendelleuchte" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          <div className="absolute bottom-5 left-5 bg-[#f5f1eb]/90 px-4 py-3 backdrop-blur-sm"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ad613d]">Titelstory</p><p className="mt-1 font-serif text-lg">Das richtige Licht</p></div>
        </div>
      </section>

      <section id="magazin" className="bg-[#e8e1d7] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1380px]">
          <div className="mb-10 flex items-end justify-between border-b border-[#292a24]/20 pb-5"><div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ad613d]">Aus dem Magazin</p><h2 className="font-serif text-4xl tracking-[-0.04em] sm:text-5xl">Neu gedacht.</h2></div><a href="#alle-artikel" className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] sm:flex">Alle Artikel <ArrowUpRight size={15} strokeWidth={1.5} /></a></div>
          <div className="grid gap-10 md:grid-cols-2">
            {articles.map((article) => <article key={article.title} className="group"><div className="relative aspect-[4/3] overflow-hidden"><Image src={article.image} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" /></div><p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ad613d]">{article.category}</p><h3 className="mt-2 max-w-lg font-serif text-2xl leading-tight tracking-[-0.025em] sm:text-3xl">{article.title}</h3><p className="mt-4 text-xs uppercase tracking-[0.12em] text-[#292a24]/55">{article.date}</p></article>)}
          </div>
        </div>
      </section>

      <section id="beleuchtung" className="mx-auto grid max-w-[1380px] gap-8 px-5 py-16 sm:px-8 md:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-24"><div><p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#ad613d]">Unsere Themen</p><h2 className="max-w-sm font-serif text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">Gut wohnen beginnt mit guten Fragen.</h2></div><div className="grid gap-0 border-t border-[#292a24]/20">{categories.map((category, index) => <a href={`#${category.toLowerCase()}`} key={category} className="flex items-center justify-between border-b border-[#292a24]/20 py-5 text-xl font-serif transition-colors hover:text-[#ad613d] sm:text-2xl"><span><span className="mr-5 text-xs font-sans text-[#ad613d]">0{index + 1}</span>{category}</span><ArrowUpRight size={20} strokeWidth={1.4} /></a>)}</div></section>

      <footer id="newsletter" className="bg-[#292a24] px-5 py-12 text-[#f5f1eb] sm:px-8 lg:px-12 lg:py-16"><div className="mx-auto flex max-w-[1380px] flex-col justify-between gap-10 md:flex-row md:items-end"><div><p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#d88b62]">Post aus dem Zuhause</p><h2 className="max-w-lg font-serif text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">Ein bisschen Inspiration für deinen Posteingang.</h2></div><div className="w-full max-w-sm"><label htmlFor="email" className="sr-only">E-Mail-Adresse</label><div className="flex border-b border-[#f5f1eb]/50 pb-3"><input id="email" type="email" placeholder="Deine E-Mail-Adresse" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#f5f1eb]/55" /><button type="button" className="text-xs font-semibold uppercase tracking-[0.15em] text-[#d88b62]">Anmelden</button></div><p className="mt-3 text-xs text-[#f5f1eb]/55">Kein Spam. Nur schöne Dinge, versprochen.</p></div></div><div className="mx-auto mt-16 flex max-w-[1380px] items-center justify-between border-t border-[#f5f1eb]/15 pt-5 text-xs text-[#f5f1eb]/55"><span>© 2026 raumgefühl</span><a href="#top" className="flex items-center gap-2 hover:text-[#f5f1eb]"><Instagram size={15} /> Instagram</a></div></footer>
    </main>
  )
}
