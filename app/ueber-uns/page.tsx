import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE, OG_IMAGE } from '@/lib/site'

const title = 'Über raumgefühl: Redaktion, Arbeitsweise und Quellen'
const description =
  'Wer hinter raumgefühl steht, wie unsere Ratgeber und Rechner entstehen, welche Quellen wir nutzen und wie wir Inhalte aktualisieren.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/ueber-uns' },
  openGraph: { url: '/ueber-uns', title, description, images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', title, description },
}

export default function UeberUnsPage() {
  return (
    <main className="min-h-screen bg-[#f5f1eb] text-[#292a24]">
      <header className="border-b border-[#292a24]/15 px-5 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between">
          <Link href="/" className="font-serif text-3xl tracking-[-0.04em]">
            raum<span className="text-[#ad613d]">.</span>gefühl
          </Link>
          <Link href="/artikel" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ad613d] hover:underline">
            Alle Artikel
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#ad613d]">Über uns</p>
        <h1 className="font-serif text-5xl leading-tight tracking-[-0.04em] sm:text-6xl">Redaktion &amp; Methodik</h1>
        <p className="mt-7 font-serif text-2xl leading-tight text-[#292a24]/85">
          raumgefühl ist ein unabhängiges Magazin für Menschen, die ihr Zuhause bewusst gestalten wollen – ohne
          Fachchinesisch und ohne Kaufdruck.
        </p>

        <div className="mt-14 grid gap-10 text-base leading-8 text-[#292a24]/85">
          <section>
            <h2 className="font-serif text-3xl leading-tight text-[#292a24]">Wer schreibt hier?</h2>
            <p className="mt-4">
              Die Inhalte werden von der raumgefühl Redaktion erstellt und redaktionell geprüft. Wir arbeiten mit
              Handwerksbetrieben, Energieberatern und Fachleuten aus der Beleuchtungsbranche zusammen, um
              Praxisaussagen gegenzuprüfen. Bei Themen mit Sicherheitsrelevanz – etwa Elektroinstallation,
              Schimmelbefall oder Statik – verweisen wir bewusst auf Fachbetriebe.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl leading-tight text-[#292a24]">Wie unsere Rechner arbeiten</h2>
            <p className="mt-4">
              Alle Rechner auf dieser Seite nutzen öffentlich dokumentierte Richtwerte und offen nachvollziehbare
              Formeln:
            </p>
            <ul className="mt-4 grid gap-2 text-base">
              <li>
                <strong className="font-semibold">Lumen Rechner:</strong> Raumfläche × Richtwert in Lumen pro
                Quadratmeter (100–300 lm/m² je Nutzung), verteilt auf die Anzahl der Lichtquellen.
              </li>
              <li>
                <strong className="font-semibold">Farbmengen Rechner:</strong> Wandfläche abzüglich Fenster und Türen,
                geteilt durch die Ergiebigkeit pro Liter, multipliziert mit der Anzahl der Anstriche plus Reserve.
              </li>
              <li>
                <strong className="font-semibold">LED Ersparnis Rechner:</strong> (alte Leistung − neue Leistung) ×
                Brennstunden × Strompreis; die Amortisation ergibt sich aus Anschaffungspreis geteilt durch die
                jährliche Ersparnis.
              </li>
            </ul>
            <p className="mt-4">
              Die Ergebnisse sind Orientierungswerte. Raumhöhe, Untergrund, Tageslicht, Leuchtenwirkungsgrad und
              persönliches Empfinden können den tatsächlichen Bedarf verändern.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-3xl leading-tight text-[#292a24]">Redaktionelle Grundsätze</h2>
            <ul className="mt-4 grid gap-2 text-base">
              <li>Wir nennen Unsicherheiten und Grenzen unserer Empfehlungen.</li>
              <li>Wir veröffentlichen keine bezahlten Produktplatzierungen in Ratgebertexten.</li>
              <li>Externe Links führen nur zu weiterführenden, inhaltlich passenden Quellen.</li>
              <li>Beiträge werden bei wesentlichen Änderungen aktualisiert und mit Datum versehen.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-3xl leading-tight text-[#292a24]">Werbung und gesponserte Beiträge</h2>
            <p className="mt-4">
              raumgefühl finanziert sich über vereinzelte bezahlte Platzierungen. Solche Beiträge sind am Label
              „Anzeige" direkt am Titel und am Ende des Textes erkennbar. Wir kennzeichnen Werbung sichtbar und
              trennen sie inhaltlich von redaktionellen Ratgebern.
            </p>
            <ul className="mt-4 grid gap-2 text-base">
              <li>Bezahlte Platzierungen werden nie als redaktionelle Empfehlung ausgegeben.</li>
              <li>Wir nehmen keine Produkte in bestehende Ratgeber auf, ohne sie zu kennzeichnen.</li>
              <li>Es gibt keine Affiliate-Links und keine Provisionsmodelle in unseren Anleitungen.</li>
              <li>Produkte, Dienstleister und Preise werden unabhängig von Kooperationen bewertet.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-3xl leading-tight text-[#292a24]">Kontakt und Korrekturen</h2>
            <p className="mt-4">
              Sie haben einen Fehler gefunden oder eine Frage zu einer Anleitung? Schreiben Sie uns an{' '}
              <a className="text-[#ad613d] underline underline-offset-4" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
              . Wir prüfen Hinweise und korrigieren Inhalte, wenn sie nicht mehr zutreffen.
            </p>
          </section>

          <section className="border-t border-[#292a24]/15 pt-8 text-sm text-[#292a24]/60">
            <p>
              Hinweis: Die Inhalte dieses Magazins dienen der allgemeinen Information und ersetzen keine
              Rechts-, Steuer- oder Handwerksberatung im Einzelfall.
            </p>
          </section>
        </div>
      </article>
    </main>
  )
}
