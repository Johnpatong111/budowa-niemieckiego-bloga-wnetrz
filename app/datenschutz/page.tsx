import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Datenschutz | raumgefühl',
  description: 'Datenschutzerklärung von raumgefühl.',
  alternates: { canonical: 'https://www.lotse-strassenbeleuchtung.de/datenschutz' },
}

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-[#f5f1eb] text-[#292a24]">
      <header className="border-b border-[#292a24]/15 px-5 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between">
          <Link href="/" className="font-serif text-3xl tracking-[-0.04em]">raum.gefühl</Link>
          <Link href="/" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ad613d] hover:underline">Zur Startseite</Link>
        </div>
      </header>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#ad613d]">Rechtliches</p>
        <h1 className="font-serif text-5xl leading-tight tracking-[-0.04em] sm:text-6xl">Datenschutzerklärung</h1>
        <p className="mt-6 text-lg leading-8 text-[#292a24]/75">Stand: 17. Oktober 2026</p>

        <div className="mt-14 grid gap-10 text-base leading-8">
          <section>
            <h2 className="font-serif text-3xl leading-tight">1. Verantwortlicher</h2>
            <p className="mt-4">Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist:</p>
            <p className="mt-3">raumgefühl<br />Website: https://www.lotse-strassenbeleuchtung.de<br />E-Mail: Bitte tragen Sie hier Ihre geschäftliche Kontaktadresse ein.</p>
          </section>

          <section>
            <h2 className="font-serif text-3xl leading-tight">2. Aufruf der Website</h2>
            <p className="mt-4">Beim Besuch dieser Website werden technisch notwendige Daten verarbeitet, die Ihr Browser automatisch an den Server übermittelt. Dazu können IP-Adresse, Datum und Uhrzeit des Abrufs, aufgerufene Seiten, Referrer-URL, Browsertyp und Betriebssystem gehören. Die Verarbeitung erfolgt, um die Website sicher und stabil bereitzustellen.</p>
          </section>

          <section>
            <h2 className="font-serif text-3xl leading-tight">3. Hosting</h2>
            <p className="mt-4">Diese Website wird über Vercel bereitgestellt. Dabei können technische Verbindungsdaten an den Hosting-Anbieter übermittelt werden. Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an einer sicheren und zuverlässigen Bereitstellung der Website gemäß Art. 6 Abs. 1 lit. f DSGVO.</p>
          </section>

          <section>
            <h2 className="font-serif text-3xl leading-tight">4. Webanalyse</h2>
            <p className="mt-4">Für die technische Auswertung der Nutzung kann Vercel Web Analytics eingesetzt werden. Dabei werden datenschutzfreundliche, aggregierte Nutzungsdaten verarbeitet, um die Leistung und Inhalte dieser Website zu verbessern. Soweit hierfür eine Einwilligung erforderlich ist, erfolgt die Verarbeitung erst nach Ihrer Einwilligung. Weitere Informationen finden Sie in den Datenschutzhinweisen von Vercel.</p>
          </section>

          <section>
            <h2 className="font-serif text-3xl leading-tight">5. Cookies und lokale Speicherung</h2>
            <p className="mt-4">Diese Website verwendet nach aktuellem Stand keine nicht notwendigen Cookies und keine personalisierte Werbung. Technisch notwendige Speicherungen können erforderlich sein, damit die Website funktioniert.</p>
          </section>

          <section>
            <h2 className="font-serif text-3xl leading-tight">6. Ihre Rechte</h2>
            <p className="mt-4">Sie haben nach Maßgabe der DSGVO insbesondere das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch gegen bestimmte Verarbeitungen. Sie können außerdem eine Beschwerde bei einer Datenschutzaufsichtsbehörde einreichen.</p>
          </section>

          <section>
            <h2 className="font-serif text-3xl leading-tight">7. Aktualisierung</h2>
            <p className="mt-4">Wir können diese Datenschutzerklärung anpassen, wenn sich die Website, eingesetzte Dienste oder rechtliche Vorgaben ändern. Es gilt die jeweils auf dieser Seite veröffentlichte Fassung.</p>
          </section>
        </div>
      </article>
    </main>
  )
}
