import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ratgeber: Rechner und praktische Tipps für Ihr Zuhause',
  description: 'Praktische Ratgeber und Rechner rund um Beleuchtung, Energie und Renovierung für ein schöneres Zuhause.',
  alternates: { canonical: 'https://www.lotse-strassenbeleuchtung.de/ratgeber' },
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
      </div>
    </main>
  )
}
