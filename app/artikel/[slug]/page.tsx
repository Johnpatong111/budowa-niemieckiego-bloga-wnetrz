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
    keyword: 'Beleuchtung',
    intro: 'Gutes Licht macht mehr als hell. Es schafft Tiefe, lenkt den Blick und gibt einem Raum genau die Stimmung, die du dir wünschst.',
    sections: [
      { heading: 'Die drei Ebenen guter Beleuchtung', paragraphs: ['Die schönste Einrichtung verliert an Wirkung, wenn die Beleuchtung nur aus einer einzigen Deckenleuchte besteht. Ein wohnliches Zuhause lebt von mehreren Lichtquellen, die sich ergänzen und unterschiedliche Bereiche sichtbar machen.', 'Ein einfacher Start ist die Drei-Ebenen-Regel: Grundlicht, Funktionslicht und Stimmungslicht. Wenn diese drei Ebenen zusammenarbeiten, wirkt ein Raum auch ohne große Umgestaltung durchdacht.'] },
      { heading: 'Grundlicht, Funktionslicht und Akzente', paragraphs: ['Beginne mit dem Grundlicht für die allgemeine Orientierung. Danach kommen Akzentleuchten hinzu: eine Pendelleuchte über dem Tisch, eine Leselampe neben dem Sofa oder eine kleine Leuchte auf dem Sideboard. So entsteht ein ruhiges, flexibles Lichtbild.', 'Plane jede Lichtquelle nach ihrer Aufgabe. Im Wohnzimmer darf das Licht weich und indirekt sein, in der Küche braucht die Arbeitsfläche dagegen eine klare, schattenarme Beleuchtung. Im Schlafzimmer helfen Leuchten mit Stoffschirmen oder indirektes Licht dabei, den Raum abends sanft herunterzufahren.'] },
      { heading: 'Lichtfarbe bewusst auswählen', paragraphs: ['Achte außerdem auf die Lichtfarbe. Warmweißes Licht zwischen 2.700 und 3.000 Kelvin wirkt besonders wohnlich. Mit dimmbaren Leuchten kannst du die Atmosphäre im Laufe des Tages verändern, ohne deine Einrichtung neu zu planen.', 'Auch die Position entscheidet über die Wirkung. Eine Leuchte sollte nicht direkt auf Augenhöhe blenden, sondern Wände, Decken oder ausgewählte Objekte streifen. Helle Flächen reflektieren das Licht und lassen kleine Räume großzügiger erscheinen, während dunkle Materialien eine intime, ruhigere Stimmung erzeugen.'] },
      { heading: 'Deine Checkliste für den Alltag', paragraphs: ['Teste neue Leuchten am besten zu unterschiedlichen Tageszeiten und beobachte, wo noch dunkle oder unruhige Stellen entstehen. Lies ergänzend unseren Beitrag über natürliche Materialien, wenn du Licht und Oberflächen besonders harmonisch aufeinander abstimmen möchtest.'] },
    ],
    related: 'natuerliche-materialien-fuer-mehr-ruhe',
  },
  'natuerliche-materialien-fuer-mehr-ruhe': {
    category: 'Zuhause',
    title: 'Die neue Ruhe: Warum natürliche Materialien Räume verändern',
    date: '05. Oktober 2026',
    image: '/images/living-room.png',
    alt: 'Ruhiges Wohnzimmer mit natürlichen Materialien und sanften Farben',
    intro: 'Holz, Leinen und Stein bringen eine angenehme Ruhe in Räume. Nicht als Trend, sondern als zeitlose Basis für ein Zuhause mit Charakter.',
    sections: [
      { heading: 'Warum natürliche Materialien beruhigen', paragraphs: ['Natürliche Materialien erzählen von ihrer Herkunft. Die Maserung von Holz, die Struktur von Leinen und die kühle Oberfläche von Stein machen eine Einrichtung spürbar und geben ihr Tiefe.', 'Besonders harmonisch wirkt eine Mischung aus warmen und kühlen Oberflächen. Kombiniere beispielsweise einen groben Leinenbezug mit einem glatten Holztisch und kleinen Akzenten aus Keramik. Der Kontrast macht die Einrichtung lebendig, ohne dass sie unruhig wird.'] },
      { heading: 'Materialien richtig kombinieren', paragraphs: ['Achte bei Holz auf den Unterton: Helle Eiche und Esche wirken leicht und nordisch, Nussbaum oder geräucherte Hölzer bringen mehr Tiefe. Bei Textilien sorgen Leinen, Wolle und Baumwolle für eine angenehme Haptik. Unterschiedliche Strukturen sind oft wirkungsvoller als viele zusätzliche Farben.', 'Weniger ist dabei oft mehr. Wähle wenige Materialien bewusst aus und wiederhole sie an verschiedenen Stellen im Raum. So entsteht ein roter Faden, der ruhig wirkt und trotzdem persönlich bleibt.'] },
      { heading: 'Pflege, die lange Freude macht', paragraphs: ['Auch die Pflege gehört zur Entscheidung. Naturmaterialien dürfen altern und kleine Spuren zeigen, brauchen aber die passende Behandlung. Öle Holzoberflächen regelmäßig nach, wasche Leinen nach den Pflegehinweisen und stelle heiße Gegenstände nicht direkt auf empfindlichen Stein. So bleibt die schöne Patina kontrolliert und langlebig.'] },
      { heading: 'So findest du deinen Ausgangspunkt', paragraphs: ['Beginne am besten mit einem festen Ausgangspunkt, etwa einem Teppich oder einem Lieblingsmöbel. Leite daraus zwei bis drei Materialien ab und ergänze erst danach Dekoration. Für die passende Atmosphäre hilft dir außerdem unser Guide zur Lichtplanung mit Grundlicht, Funktionslicht und Akzenten.'] },
    ],
    related: 'lichtplanung-ohne-geheimnisse',
  },
  'heizkoerper-wird-nicht-warm': {
    category: 'Zuhause',
    title: 'Heizkörper wird nicht warm: 7 Ursachen und was Sie selbst tun können',
    date: '13. Oktober 2026',
    image: '/images/heizkoerper-warm.png',
    alt: 'Hand dreht vorsichtig das Thermostatventil eines weißen Heizkörpers',
    keyword: 'Heizkörper wird nicht warm',
    intro: 'Wenn der Heizkörper wird nicht warm, ist das meistens noch kein Fall für den Heizungsdienst. Mit sieben einfachen Checks finden Sie die Ursache oft selbst und bringen die Wärme zurück.',
    sections: [
      { heading: 'Heizkörper wird nicht warm: zuerst ruhig prüfen', paragraphs: ['Wenn der Heizkörper wird nicht warm, obwohl die Heizung läuft, sollten Sie nicht sofort am Thermostat drehen oder den Heizungsdienst rufen. Prüfen Sie zuerst, ob nur ein einzelner Heizkörper betroffen ist oder ob alle Räume kühl bleiben.', 'Ist nur ein Heizkörper kalt, liegt die Ursache häufig direkt am Thermostat, an Luft im System oder an einem klemmenden Ventilstift. Bleiben mehrere Heizkörper kalt, kann dagegen die Heizungsanlage, der Wasserdruck oder die zentrale Steuerung betroffen sein.'] },
      { heading: 'Die 7 häufigsten Ursachen im Überblick', paragraphs: ['1. Das Thermostat steht zu niedrig oder ist versehentlich geschlossen. Stellen Sie es testweise auf eine mittlere Stufe und warten Sie einige Minuten.', '2. Luft im Heizkörper verhindert die Wärmeverteilung. Typisch ist ein Gluckern oder ein Heizkörper, der oben kalt und unten warm bleibt.', '3. Das Thermostatventil klemmt nach einer längeren Sommerpause. Der kleine Ventilstift lässt sich dann nicht mehr frei bewegen.', '4. Der Heizungsdruck ist zu niedrig. Ein Blick auf das Manometer der Anlage kann einen ersten Hinweis geben; den optimalen Bereich finden Sie in der Anleitung.', '5. Die Heizungsanlage befindet sich im Sommer- oder Absenkbetrieb. Kontrollieren Sie die zentrale Regelung und die eingestellten Heizzeiten.', '6. Der Heizkörper ist hinter Möbeln oder schweren Vorhängen verdeckt. Die warme Luft kann sich dann nicht im Raum verteilen.', '7. Das System ist hydraulisch nicht optimal abgeglichen. Einige Heizkörper werden sehr heiß, während andere trotz geöffnetem Thermostat kaum Wärme bekommen.'] },
      { heading: 'Heizkörper entlüften: das können Sie selbst tun', paragraphs: ['Drehen Sie das Thermostat zunächst vollständig auf und schalten Sie die Umwälzpumpe, falls zugänglich, kurz aus. Legen Sie ein Tuch unter das Entlüftungsventil und öffnen Sie es langsam mit einem Entlüftungsschlüssel. Sobald statt Luft ein gleichmäßiger Wasserstrahl austritt, schließen Sie das Ventil wieder.', 'Kontrollieren Sie anschließend den Anlagendruck. Nach dem Entlüften kann er sinken. Wenn Sie nicht sicher sind, wie Wasser nachgefüllt wird, lassen Sie diesen Schritt von einer Fachperson erledigen. Lesen Sie dazu auch unseren Beitrag über gute Beleuchtung, denn angenehme Wärme und das richtige Licht machen einen Raum erst wirklich gemütlich.'] },
      { heading: 'Wann Sie besser einen Fachbetrieb rufen', paragraphs: ['Bleibt der Heizkörper trotz geöffneter Ventile und Entlüften kalt, sollten Sie nicht weiter an der Anlage experimentieren. Das gilt besonders bei austretendem Wasser, ungewöhnlichen Geräuschen, stark schwankendem Druck oder wenn mehrere Heizkörper gleichzeitig ausfallen.', 'Auch bei einer Gastherme, sichtbaren Schäden oder Unsicherheit beim Nachfüllen ist professionelle Hilfe die sichere Wahl. Notieren Sie vorher, welche Heizkörper betroffen sind, welche Geräusche auftreten und welchen Druck das Manometer anzeigt. Diese Informationen erleichtern die Diagnose.'] },
      { heading: 'Die schnelle Checkliste für den Winter', paragraphs: ['Thermostat öffnen, Heizkörper auf Luftgeräusche prüfen, Möbel und Vorhänge aus dem Weg räumen, Heizzeiten kontrollieren und den Druck ablesen: Mit dieser Reihenfolge lässt sich die Frage „Heizkörper wird nicht warm“ oft schnell einordnen. Beginnen Sie immer mit den einfachen und gefahrlosen Checks.', 'Wenn die Wärme wieder da ist, lohnt sich ein Blick auf die Raumwirkung insgesamt. Unser Artikel über natürliche Materialien zeigt, wie Holz, Leinen und Stein eine warme Atmosphäre zusätzlich unterstützen können.'] },
    ],
    related: 'natuerliche-materialien-fuer-mehr-ruhe',
  },
  'led-flackert-ursachen-loesungen': {
    category: 'Beleuchtung',
    title: 'LED flackert: 7 Ursachen und Lösungen für Dimmer, Trafo und Leuchtmittel',
    date: '14. Oktober 2026',
    image: '/images/led-flackert.png',
    alt: 'Moderne LED-Leuchte mit Dimmer in einem warm beleuchteten Wohnraum',
    keyword: 'LED flackert',
    intro: 'Wenn eine LED flackert, nervt das nicht nur, sondern kann auch auf ein Problem mit Dimmer, Trafo oder der elektrischen Verbindung hinweisen. Mit dieser Schritt-für-Schritt-Anleitung finden Sie die Ursache.',
    sections: [
      { heading: 'LED flackert: zuerst die einfache Ursache prüfen', paragraphs: ['Wenn Ihre LED flackert, beginnen Sie mit dem Leuchtmittel selbst. Schrauben Sie die Lampe vorsichtig heraus und testen Sie sie in einer anderen, passenden Fassung. Flackert sie dort ebenfalls, ist sie wahrscheinlich defekt oder von minderer Qualität.', 'Bleibt das Licht in der zweiten Fassung stabil, liegt die Ursache eher an der ursprünglichen Leuchte, am Dimmer oder an der Stromversorgung. Arbeiten Sie sich Schritt für Schritt vor und verändern Sie nicht mehrere Dinge gleichzeitig.'] },
      { heading: 'Ursache 1 und 2: Dimmer und Mindestlast', paragraphs: ['Alte Phasenanschnitt-Dimmer wurden für Glühlampen entwickelt und kommen mit der geringen Leistung von LEDs oft nicht zurecht. Besonders beim Dimmen beginnt die LED dann zu flackern. Tauschen Sie den Dimmer gegen ein ausdrücklich LED-taugliches Modell oder einen passenden Phasenabschnitt-Dimmer aus.', 'Prüfen Sie außerdem die Mindestlast. Benötigt der Dimmer beispielsweise 20 Watt, eine einzelne LED aber nur 5 Watt, kann die Last zu niedrig sein. Ein Dimmer mit niedriger Mindestlast schafft in diesem Fall Abhilfe.'] },
      { heading: 'Ursache 3 und 4: Trafo oder Leuchtmittel', paragraphs: ['Bei 12-Volt-Spots muss der Trafo zur Gesamtleistung und zur LED-Technik passen. Ein alter, überlasteter oder nicht LED-geeigneter Trafo liefert unter Umständen keine saubere Spannung. Vergleichen Sie die Angaben und ersetzen Sie den Trafo im Zweifel durch einen passenden LED-Treiber.', 'Auch minderwertige LED-Lampen können flackern. Ihre Treiber reagieren empfindlich auf kleine Spannungsschwankungen. Setzen Sie auf ein Qualitätsleuchtmittel mit stabilem Treiber und beachten Sie, ob es tatsächlich dimmbar ist.'] },
      { heading: 'Ursache 5 bis 7: Verbindung, Netz und Restspannung', paragraphs: ['Lockere Klemmen oder eine korrodierte Fassung können den Stromfluss kurz unterbrechen. Schalten Sie vor jeder Kontrolle die Sicherung aus. Arbeiten an festen Leitungen und Abzweigdosen gehören bei Unsicherheit in die Hand eines Elektrikers.', 'Flackert die LED immer dann, wenn Waschmaschine, Backofen oder Heizlüfter startet, können Spannungsschwankungen im Netz die Ursache sein. Ein beleuchteter Schalter oder eine lange Leitung kann außerdem Restspannung erzeugen, sodass die LED im ausgeschalteten Zustand kurz aufblitzt. Ein Bypass oder Entstörkondensator muss fachgerecht montiert werden.'] },
      { heading: 'So gehen Sie bei der Fehlersuche vor', paragraphs: ['Testen Sie zuerst ein anderes Leuchtmittel, prüfen Sie danach Dimmer und Fassung und schauen Sie erst anschließend auf Trafo und Elektroinstallation. So sparen Sie Zeit und vermeiden unnötige Kosten.', 'Wenn Ihre LED trotz eines passenden Leuchtmittels weiter flackert, mehrere Lampen betroffen sind oder Sie Brandgeruch, Wärmeentwicklung oder lose Leitungen bemerken, schalten Sie die Sicherung aus und beauftragen Sie einen Fachbetrieb. Für eine gemütliche Raumwirkung lesen Sie auch unseren Beitrag zur Lichtplanung.'] },
    ],
    related: 'lichtplanung-ohne-geheimnisse',
  },
  'fenster-einstellen-winter': {
    category: 'Zuhause',
    title: 'Fenster einstellen für den Winter: Dichtung und Beschläge in 5 Schritten justieren',
    date: '15. Oktober 2026',
    image: '/images/fenster-winter.png',
    alt: 'Fensterbeschlag wird mit einem Inbusschlüssel für den Winter eingestellt',
    keyword: 'Fenster einstellen',
    intro: 'Zugige Fenster lassen Wärme entweichen und treiben die Heizkosten in die Höhe. In fünf Schritten zeigen wir, wie Sie Dichtung und Beschläge selbst prüfen und Ihr Fenster für den Winter vorbereiten.',
    sections: [
      { heading: 'Fenster einstellen: das benötigen Sie', paragraphs: ['Legen Sie einen Inbusschlüssel, meist in der Größe 4 mm, einen Kreuzschlitzschraubendreher, Fensterfett oder Silikonspray, einen weichen Lappen und einen Papierstreifen bereit. Arbeiten Sie langsam und halten Sie die Fenstergriffe leichtgängig.', 'Das Fenster einstellen ist bei vielen Kunststoff-, Holz- und Alufenstern möglich. Die genaue Form der Beschläge unterscheidet sich jedoch je nach Hersteller.'] },
      { heading: 'Schritt 1: Dichtheit mit dem Papiertest prüfen', paragraphs: ['Klemmen Sie einen Papierstreifen zwischen Rahmen und Flügel und schließen Sie das Fenster. Lässt sich das Papier mühelos herausziehen, sitzt das Fenster an dieser Stelle zu locker. Prüfen Sie mehrere Punkte rundum und markieren Sie undichte Stellen.', 'Der Test zeigt Ihnen, wo das Fenster einstellen nötig ist. Wenn das Papier nur mit leichtem Widerstand herausgezogen werden kann, liegt die Dichtung meist ausreichend an.'] },
      { heading: 'Schritt 2: Dichtung reinigen und pflegen', paragraphs: ['Wischen Sie die Gummidichtung mit lauwarmem Wasser und einem milden Reiniger ab. Schmutz verhindert, dass sie sauber anliegt. Tragen Sie anschließend etwas Silikonspray oder Dichtungspflege auf, damit das Gummi geschmeidig bleibt und bei Frost nicht spröde wird.', 'Ist die Dichtung rissig oder dauerhaft verformt, hilft kein Nachjustieren. Lassen Sie sie austauschen, damit die warme Luft im Raum bleibt.'] },
      { heading: 'Schritt 3 und 4: Schließzapfen und Flügel justieren', paragraphs: ['An den Beschlägen am Flügelrand finden Sie ovale Schließzapfen. Drehen Sie sie mit dem Inbusschlüssel vorsichtig in Richtung Winterstellung, oft zeigt dabei eine Markierung zum Rahmen. Stellen Sie alle Zapfen gleichmäßig ein und prüfen Sie, ob sich der Griff weiterhin leicht bedienen lässt.', 'Schleift der Flügel am Rahmen oder hängt er schief, korrigieren Sie die Bänder in kleinen Schritten. Drehen Sie jeweils nur eine halbe Umdrehung und testen Sie danach das Schließen. Zu hoher Anpressdruck belastet Dichtungen und Beschläge unnötig.'] },
      { heading: 'Schritt 5: Beschläge ölen und Ergebnis kontrollieren', paragraphs: ['Geben Sie einen Tropfen Fensterfett auf die beweglichen Metallteile, bewegen Sie den Griff mehrmals und wischen Sie überschüssiges Fett ab. Wiederholen Sie danach den Papiertest an den zuvor markierten Stellen.', 'Wenn das Fenster dicht schließt, der Griff leichtgängig bleibt und keine Zugluft mehr spürbar ist, haben Sie das Fenster einstellen erfolgreich abgeschlossen. Planen Sie die Kontrolle am besten jedes Jahr im Herbst ein.'] },
      { heading: 'Wann ein Fachmann gefragt ist', paragraphs: ['Verziehen sich Rahmen oder Flügel sichtbar, beschlagen die Scheiben im Zwischenraum oder bleibt das Fenster trotz Einstellung undicht, lohnt sich der Anruf beim Fensterbauer. Gleiches gilt, wenn Sie den Beschlag nicht eindeutig erkennen oder Widerstand beim Drehen spüren.', 'Weitere Tipps für ein warmes Zuhause finden Sie in unserem Artikel darüber, warum ein Heizkörper nicht warm wird. Zusammen mit einer guten Lichtplanung entsteht so ein komfortabler Winter.'] },
    ],
    related: 'heizkoerper-wird-nicht-warm',
  },
} as const

type ArticleSlug = keyof typeof articles

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles[slug as ArticleSlug]
  return {
    title: article ? `${article.title} | raumgefühl` : 'Artikel | raumgefühl',
    description: article?.intro,
    keywords: article?.keyword ? [article.keyword, 'Lichtplanung', 'Wohnung Beleuchtung'] : undefined,
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles[slug as ArticleSlug]

  if (!article) {
    return <main className="flex min-h-screen items-center justify-center bg-[#f5f1eb] px-6 text-center text-[#292a24]"><div><p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#ad613d]">404</p><h1 className="font-serif text-5xl">Artikel nicht gefunden.</h1><Link href="/" className="mt-8 inline-flex items-center gap-2 border-b border-[#292a24] pb-2 text-xs font-semibold uppercase tracking-[0.14em]">Zur Startseite <ArrowUpRight size={14} /></Link></div></main>
  }

  return <main className="min-h-screen bg-[#f5f1eb] text-[#292a24]"><header className="mx-auto flex max-w-[1380px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12"><Link href="/" className="font-serif text-2xl tracking-[-0.05em] sm:text-3xl" aria-label="raumgefühl Startseite">raum<span className="text-[#ad613d]">.</span>gefühl</Link><Link href="/" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] hover:text-[#ad613d]"><ArrowLeft size={15} /> Zurück zum Magazin</Link></header><article className="mx-auto max-w-[1180px] px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28"><div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16"><div><p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#ad613d]">{article.category}</p><h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-[5.5rem]">{article.title}</h1><p className="mt-6 text-xs uppercase tracking-[0.15em] text-[#292a24]/55">{article.date}</p></div><div className="relative aspect-[4/3] overflow-hidden"><Image src={article.image} alt={article.alt} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" /></div></div><div className="mx-auto mt-14 grid max-w-3xl gap-10 text-lg leading-8 text-[#292a24]/80"><p className="font-serif text-2xl leading-tight text-[#292a24] sm:text-3xl">{article.keyword === 'Beleuchtung' ? <>Gutes Licht macht mehr als hell. Eine durchdachte <strong className="font-semibold text-[#ad613d]">Beleuchtung</strong> schafft Tiefe, lenkt den Blick und gibt einem Raum genau die Stimmung, die du dir wünschst.</> : article.intro}</p>{article.sections.map((section, index) => <section key={section.heading} aria-labelledby={`section-${index}`} className="grid gap-4"><h2 id={`section-${index}`} className="font-serif text-3xl leading-tight text-[#292a24] sm:text-4xl">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{index === 0 && <h3 className="pt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#ad613d]">Ein guter Anfang</h3>}</section>)}<aside className="mt-4 border-t border-[#292a24]/15 pt-8" aria-labelledby="related-heading"><p id="related-heading" className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#ad613d]">Weiterlesen</p><Link href={`/artikel/${article.related}`} className="group grid gap-4 sm:grid-cols-[150px_1fr] sm:items-center"><div className="relative aspect-[4/3] overflow-hidden"><Image src={articles[article.related].image} alt={articles[article.related].alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="150px" /></div><div><h3 className="font-serif text-2xl leading-tight text-[#292a24] group-hover:text-[#ad613d]">{articles[article.related].title}</h3><span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em]">Artikel lesen <ArrowUpRight size={15} /></span></div></Link></aside><Link href="/" className="mt-2 inline-flex w-fit items-center gap-2 border-b border-[#292a24] pb-2 text-xs font-semibold uppercase tracking-[0.15em] hover:border-[#ad613d] hover:text-[#ad613d]">Mehr Inspiration entdecken <ArrowUpRight size={15} /></Link></div></article></main>
}
