import type { Metadata } from 'next'
import Link from 'next/link'
import { OPERATOR, SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum und Anbieterkennzeichnung von raumgefühl.',
  alternates: { canonical: '/impressum' },
  robots: { index: true, follow: true },
}

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-[#f5f1eb] text-[#292a24]">
      <header className="border-b border-[#292a24]/15 px-5 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between">
          <Link href="/" className="font-serif text-3xl tracking-[-0.04em]">
            raum<span className="text-[#ad613d]">.</span>gefühl
          </Link>
          <Link href="/" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ad613d] hover:underline">
            Zur Startseite
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#ad613d]">Rechtliches</p>
        <h1 className="font-serif text-5xl leading-tight tracking-[-0.04em] sm:text-6xl">Impressum</h1>
        <p className="mt-6 text-lg leading-8 text-[#292a24]/75">Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz).</p>

        <div className="mt-14 grid gap-10 text-base leading-8">
          <section>
            <h2 className="font-serif text-3xl leading-tight">Anbieter</h2>
            <p className="mt-4">
              raumgefühl – Das Magazin für schönes Wohnen
              <br />
              {OPERATOR.name}
              <br />
              {OPERATOR.street}
              <br />
              {OPERATOR.city}
              <br />
              {OPERATOR.country}
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl leading-tight">Kontakt</h2>
            <p className="mt-4">
              E-Mail:{' '}
              <a className="text-[#ad613d] underline underline-offset-4" href={`mailto:${OPERATOR.email}`}>
                {OPERATOR.email}
              </a>
            </p>
            <p className="mt-2 text-sm text-[#292a24]/60">
              Anfragen werden in der Regel innerhalb von zwei Werktagen beantwortet.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl leading-tight">Verantwortlich für den Inhalt</h2>
            <p className="mt-4">
              {OPERATOR.name}, Anschrift wie oben. Verantwortlich im Sinne von § 18 Abs. 2 MStV.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl leading-tight">Streitschlichtung</h2>
            <p className="mt-4">
              Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl leading-tight">Haftung für Inhalte und Links</h2>
            <p className="mt-4">
              Die Inhalte dieser Seiten wurden mit Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und
              Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Unsere Ratgeber ersetzen keine
              fachliche Beratung im Einzelfall – insbesondere nicht bei Elektroarbeiten, Schimmelbefall oder
              statischen Fragen. Für Inhalte externer Links sind ausschließlich deren Betreiber verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl leading-tight">Urheberrecht</h2>
            <p className="mt-4">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
              Urheberrecht. Vervielfältigung, Bearbeitung und Verbreitung außerhalb der Grenzen des Urheberrechts
              bedürfen der schriftlichen Zustimmung. Kontakt für Rückfragen:{' '}
              <a className="text-[#ad613d] underline underline-offset-4" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  )
}

