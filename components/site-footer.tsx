import Link from 'next/link'
import { CATEGORIES } from '@/lib/articles'
import { SITE } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="bg-[#292a24] px-5 py-10 text-[#f5f1eb] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-8 border-t border-[#f5f1eb]/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-2xl tracking-[-0.05em]">
              raum<span className="text-[#ad613d]">.</span>gefühl
            </p>
            <p className="mt-3 max-w-xs text-sm leading-6 text-[#f5f1eb]/60">
              Das Magazin für schönes Wohnen: Lichtplanung, Renovierung und Materialien – verständlich erklärt.
            </p>
          </div>

          <nav aria-label="Themen" className="text-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#ad613d]">Themen</p>
            <ul className="grid gap-2 text-[#f5f1eb]/70">
              {CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link className="transition-colors hover:text-[#f5f1eb]" href={`/kategorie/${category.slug}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Magazin" className="text-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#ad613d]">Magazin</p>
            <ul className="grid gap-2 text-[#f5f1eb]/70">
              <li><Link className="transition-colors hover:text-[#f5f1eb]" href="/artikel">Alle Artikel</Link></li>
              <li><Link className="transition-colors hover:text-[#f5f1eb]" href="/ratgeber">Rechner &amp; Ratgeber</Link></li>
              <li><Link className="transition-colors hover:text-[#f5f1eb]" href="/ratgeber/lumen-rechner">Lumen Rechner</Link></li>
              <li><Link className="transition-colors hover:text-[#f5f1eb]" href="/ratgeber/farbmengen-rechner">Farbmengen Rechner</Link></li>
              <li><Link className="transition-colors hover:text-[#f5f1eb]" href="/ratgeber/led-ersparnis-rechner">LED Ersparnis Rechner</Link></li>
            </ul>
          </nav>

          <nav aria-label="Über uns und Rechtliches" className="text-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#ad613d]">Über uns</p>
            <ul className="grid gap-2 text-[#f5f1eb]/70">
              <li><Link className="transition-colors hover:text-[#f5f1eb]" href="/ueber-uns">Redaktion &amp; Methodik</Link></li>
              <li><Link className="transition-colors hover:text-[#f5f1eb]" href="/impressum">Impressum</Link></li>
              <li><Link className="transition-colors hover:text-[#f5f1eb]" href="/datenschutz">Datenschutz</Link></li>
              <li>
                <a className="transition-colors hover:text-[#f5f1eb]" href={`mailto:${SITE.email}`}>
                  Kontakt
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-[#f5f1eb]/15 pt-5 text-xs text-[#f5f1eb]/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} raumgefühl</span>
          <span>Inhalte mit Sorgfalt erstellt – keine Rechts- oder Handwerksberatung im Einzelfall.</span>
        </div>
      </div>
    </footer>
  )
}
