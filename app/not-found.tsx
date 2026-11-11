import Link from 'next/link'
import type { Metadata } from 'next'
import { CATEGORIES } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Seite nicht gefunden',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f1eb] px-6 py-20 text-center text-[#292a24]">
      <div className="w-full max-w-lg">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#ad613d]">404</p>
        <h1 className="font-serif text-5xl leading-tight">Diese Seite gibt es nicht.</h1>
        <p className="mt-5 text-base leading-7 text-[#292a24]/70">
          Vielleicht hat sich der Link geändert. Hier finden Sie zurück zum Magazin:
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
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
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs font-semibold uppercase tracking-[0.14em]">
          <Link href="/" className="border-b border-[#292a24] pb-2 hover:border-[#ad613d] hover:text-[#ad613d]">
            Startseite
          </Link>
          <Link href="/artikel" className="border-b border-[#292a24] pb-2 hover:border-[#ad613d] hover:text-[#ad613d]">
            Alle Artikel
          </Link>
        </div>
      </div>
    </main>
  )
}
