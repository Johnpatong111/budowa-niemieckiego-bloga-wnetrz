import type { ArticleContent } from '@/lib/content'

export const dimmbareLedAuswaehlen: ArticleContent = {
  updatedAt: '2026-11-21T12:30:00.000Z',
  intro:
    '„Dimmbar“ auf der Verpackung heißt nicht, dass eine LED an jedem Dimmer sauber läuft. Entscheidend sind Dimmer-Typ, Mindestlast, Trafo und die tatsächliche Kompatibilität. Dieser Ratgeber zeigt, welche Angaben im Datenblatt zählen, wie Sie Flackern vermeiden und wann ein neuer Dimmer günstiger ist als der dritte Leuchtmittel-Tausch.',
  keyTakeaways: [
    'Eine dimmbare LED braucht einen passenden Dimmer – meist Phasenabschnitt, nicht Phasenanschnitt.',
    'Die Mindestlast des Dimmers muss mit der Summe aller LED-Leistungen zusammenpassen.',
    'Bei 12-V-Systemen entscheidet der Trafo, ob die LED dimmbar ist.',
    '„Dimmbar“ ohne Angabe des Dimmer-Typs ist keine belastbare Information.',
    'Im unteren Dimmbereich testen: Dort zeigt sich Flackern zuerst.',
  ],
  sections: [
    {
      heading: 'Woran Sie eine wirklich dimmbare LED erkennen',
      blocks: [
        {
          type: 'p',
          text: 'Eine LED ist nicht „von sich aus“ dimmbar. Sie braucht einen Treiber, der die Leistung reduzieren kann, und einen Dimmer, der zu diesem Treiber passt. Auf der Verpackung stehen oft nur Prozentwerte oder das Wort „dimmbar“. Für die Praxis sind drei Angaben wichtiger: Dimmer-Typ, Mindestlast und die Kompatibilitätsliste des Herstellers.',
        },
        {
          type: 'ul',
          items: [
            'Suchen Sie nach „Phasenabschnitt“ oder „RC-fähig“ – das ist bei LED-Retrofits die häufigste passende Steuerung.',
            'Steht nur „dimmbar“ ohne Dimmer-Typ, ist die Angabe für den Kauf zu unscharf.',
            'Prüfen Sie die Mindestlast des Dimmers und die Leistung aller Leuchtmittel an diesem Stromkreis.',
            'Bei 12-V-Leuchten muss der Trafo ausdrücklich für LED und Dimmen geeignet sein.',
            'Eine Hersteller-Kompatibilitätsliste ist verlässlicher als die Verpackung.',
          ],
        },
        {
          type: 'note',
          title: 'Der häufigste Fehler',
          text: 'Ein alter Dimmer für Glühlampen arbeitet oft mit Phasenanschnitt. LED-Retrofits kommen damit nicht immer zurecht: Sie flackern, brummen oder lassen sich nur in einem kleinen Bereich dimmen. In diesem Fall ist ein neuer LED-Dimmer meist die günstigere Lösung als der Austausch mehrerer Leuchtmittel.',
        },
      ],
    },
    {
      heading: 'Dimmer-Typen im Vergleich',
      blocks: [
        {
          type: 'table',
          caption: 'Welcher Dimmer passt zu welcher LED?',
          head: ['Dimmer-Typ', 'Typische Verwendung', 'Für LED geeignet?', 'Risiko'],
          rows: [
            ['Phasenanschnitt', 'Ältere Glühlampen-Dimmer', 'Nur mit ausdrücklicher Freigabe', 'Flackern, Brummen, Mindestlast'],
            ['Phasenabschnitt', 'Moderne LED- und Universal-Dimmer', 'Meist ja', 'Falsche Last oder billiger Treiber'],
            ['Universal-Dimmer', 'Nachrüstung für gemischte Lasten', 'Oft ja', 'Kompatibilität einzeln prüfen'],
            ['Funk-/Smart-Dimmer', 'App- oder Schaltersteuerung', 'Nur mit passendem Treiber', 'Mindestlast und Neutralleiter'],
          ],
        },
        {
          type: 'p',
          text: 'Phasenabschnitt ist bei LED die sicherste Ausgangsbasis, weil er die Spannung am Ende der Halbwelle abschaltet und die Treiber weniger belastet. Ein Universal-Dimmer kann beides, ist aber nicht automatisch mit jeder LED kompatibel. Bei Smart-Home-Dimmern kommt ein weiterer Punkt hinzu: Viele brauchen einen Neutralleiter in der Dose, der in älteren Installationen fehlt.',
        },
      ],
    },
    {
      heading: 'Mindestlast: warum eine LED gar nicht erst angeht',
      blocks: [
        {
          type: 'p',
          text: 'Dimmer haben eine Mindestlast, oft 20, 25 oder 50 Watt. Eine einzelne LED mit 5 Watt liegt darunter. Der Dimmer erkennt dann keine ausreichende Last und schaltet unsauber: Die LED flackert, glimmt oder bleibt ganz aus. Die Lösung ist nicht mehr Leistung, sondern die Summe aller Leuchtmittel am Dimmer.',
        },
        {
          type: 'ul',
          items: [
            'Addieren Sie die Wattzahl aller LED-Leuchtmittel, die an einem Dimmer hängen.',
            'Vergleichen Sie die Summe mit der Mindest- und Höchstlast des Dimmers.',
            'Bei zu kleiner Last hilft ein Dimmer mit niedrigerer Mindestlast oder ein zusätzlicher Verbraucher – nicht einfach eine stärkere LED.',
            'Bei gemischten Lasten (LED plus Halogen) die Dimmer-Freigabe beachten; die Kennlinie kann ungleich sein.',
          ],
        },
        {
          type: 'p',
          text: 'Ein Beispiel: Vier LED-Spots mit je 6 Watt ergeben 24 Watt. Ein Dimmer mit Mindestlast 20 Watt passt, ein Modell mit 50 Watt nicht. Wer nur eine einzelne 5-Watt-Lampe dimmen will, braucht einen Dimmer für kleine Lasten oder eine smarte Steuerung mit passendem Treiber.',
        },
      ],
    },
    {
      heading: '12 Volt, Trafo und Netzteil',
      blocks: [
        {
          type: 'p',
          text: 'Bei Niedervolt-Leuchten sitzt zwischen Dimmer und LED ein Trafo oder Netzteil. Ein alter Halogen-Trafo ist nicht automatisch LED-fähig. Billige elektronische Trafos brauchen eine Mindestlast und takten bei zu wenig Leistung. Das äußert sich als Blinken im Sekundentakt oder als Pfeifen.',
        },
        {
          type: 'ul',
          items: [
            'Der Trafo muss ausdrücklich für LED-Betrieb und Dimmen freigegeben sein.',
            '„Halogen“ auf dem Etikett ist ein Ausschlusskriterium für LED-Dimmung.',
            'Sekundärspannung (12 V oder 24 V) muss zum Leuchtmittel passen.',
            'Lange Zuleitungen verursachen Spannungsabfall – dünne Kabel und lange Strecken vermeiden.',
            'Ein defekter Trafo flackert oft erst nach einigen Minuten, wenn er warm wird.',
          ],
        },
      ],
    },
    {
      heading: 'Lichtfarbe und Dimmverhalten',
      blocks: [
        {
          type: 'p',
          text: 'Dimmbare LEDs verändern beim Herunterdimmen häufig die Lichtfarbe: Aus 2700 Kelvin wird schnell ein kühleres, grünstichiges Licht. Hochwertige Treiber halten die Farbtemperatur stabiler. Für Wohnräume ist warmweiß mit 2700 bis 3000 Kelvin die sichere Wahl; im Bad oder in der Küche sind 3000 bis 4000 Kelvin funktionaler.',
        },
        {
          type: 'table',
          caption: 'Lichtfarbe nach Raum',
          head: ['Raum', 'Empfohlene Lichtfarbe', 'Hinweis'],
          rows: [
            ['Wohnzimmer', '2700–3000 K', 'Warmweiß, dimmbar bis ca. 10 %'],
            ['Schlafzimmer', '2700 K', 'Sehr niedrige Dimmstufe einplanen'],
            ['Küche', '3000–4000 K', 'Arbeitslicht separat schalten'],
            ['Bad', '3000–4000 K', 'IP-Schutz und Feuchtraum beachten'],
            ['Flur', '2700–3000 K', 'Bewegungsmelder mit LED-Last prüfen'],
          ],
        },
      ],
    },
    {
      heading: 'So prüfen Sie die Kompatibilität vor dem Kauf',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Dimmer-Typ am Schalter ablesen',
              text: 'Schalten Sie die Sicherung aus und nehmen Sie den Dimmer aus der Dose. Auf dem Gehäuse steht der Typ, oft auch die Mindest- und Höchstlast. Notieren Sie beides.',
            },
            {
              title: 'Leistung aller Leuchtmittel addieren',
              text: 'Zählen Sie alle LEDs an diesem Dimmer und addieren Sie die Wattwerte. Vergleichen Sie die Summe mit der Mindestlast. Bei Unsicherheit lieber einen Elektriker messen lassen.',
            },
            {
              title: 'Kompatibilitätsliste prüfen',
              text: 'Suchen Sie beim Hersteller des Leuchtmittels nach der Liste „dimmbare Dimmer“. Dort steht, welche Modelle geprüft wurden. Eine allgemeine Angabe „dimmbar“ reicht nicht.',
            },
            {
              title: 'Im unteren Bereich testen',
              text: 'Dimmen Sie nach dem Einbau auf die niedrigste Stufe und beobachten Sie zwei Minuten. Flackern, Brummen oder Ausgehen zeigt eine falsche Kombination – nicht selten erst nach dem Warmlaufen.',
            },
            {
              title: 'Erst dann tauschen',
              text: 'Wenn die LED am geprüften Dimmer flackert, ist der Treiber im Leuchtmittel die nächste Verdächtige. Testen Sie ein zweites Modell gleicher Bauart, bevor Sie den Dimmer ersetzen.',
            },
          ],
        },
      ],
    },
    {
      heading: 'Was kostet die Umrüstung?',
      blocks: [
        {
          type: 'p',
          text: 'Ein guter LED-Dimmer kostet 25 bis 70 Euro, ein smartes Modell 50 bis 120 Euro. Dazu kommt der Elektriker, wenn die Dose keinen Neutralleiter hat oder der Dimmer nicht passt: meist 60 bis 120 Euro pro Schalter. Ein einzelnes Marken-Leuchtmittel liegt bei 8 bis 25 Euro. Der Austausch des Dimmers ist oft günstiger als der wiederholte Kauf neuer Leuchtmittel.',
        },
        {
          type: 'note',
          title: 'Sicherheit',
          text: 'Arbeiten an der Elektroinstallation nur mit abgeschalteter Sicherung und geeignetem Messgerät. Wenn Sie den Dimmer nicht sicher bestimmen können, lassen Sie die Kombination von einer Elektrofachkraft prüfen. Ein falsch dimensionierter Dimmer ist ein Brandrisiko.',
        },
      ],
    },
    {
      heading: 'Mehr zum Thema',
      blocks: [
        {
          type: 'p',
          text: 'Wie viele Lumen ein Wohnzimmer braucht und welche Lichtfarbe zu welchem Raum passt, steht im Ratgeber <a href="/artikel/lichtplanung-wohnzimmer">Lichtplanung Wohnzimmer</a>. Die Grundlagen zu Grundlicht, Zonenlicht und Akzentlicht erklärt <a href="/artikel/lichtplanung-ohne-geheimnisse">Lichtplanung ohne Geheimnisse</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Warum flackert eine dimmbare LED trotz passendem Dimmer?',
      answer:
        'Meist liegt die Gesamtleistung unter der Mindestlast, der Trafo ist nicht LED-fähig oder der Dimmer arbeitet mit Phasenanschnitt. Testen Sie die niedrigste Dimmstufe und prüfen Sie die Kompatibilitätsliste. Erst danach das Leuchtmittel tauschen.',
    },
    {
      question: 'Kann ich einen alten Glühlampen-Dimmer für LED verwenden?',
      answer:
        'Nur wenn der Hersteller die Kombination ausdrücklich freigibt. Viele alte Dimmer arbeiten mit Phasenanschnitt und kommen mit LED-Treibern nicht zurecht. Ein LED-Dimmer mit Phasenabschnitt ist die sicherere Investition.',
    },
    {
      question: 'Was bedeutet Mindestlast beim Dimmer?',
      answer:
        'Der Dimmer braucht eine minimale Leistung, um stabil zu schalten. Liegt die Summe aller LEDs darunter, flackert oder glimmt die Lampe. Addieren Sie alle Leuchtmittel an einem Dimmer und vergleichen Sie die Summe mit der Angabe auf dem Dimmer.',
    },
    {
      question: 'Sind 12-V-LEDs mit einem alten Halogen-Trafo dimmbar?',
      answer:
        'In der Regel nicht zuverlässig. Der Trafo muss für LED-Betrieb und Dimmen ausgelegt sein. Ein alter Halogen-Trafo hat oft eine hohe Mindestlast und taktet bei kleinen LED-Leistungen. Dann hilft nur ein passender LED-Trafo.',
    },
    {
      question: 'Wie viele LEDs kann ich an einen Dimmer anschließen?',
      answer:
        'Das hängt von der Höchstlast des Dimmers und der Leistung der LEDs ab. Ein Dimmer mit 100 Watt verträgt rechnerisch 20 LEDs mit 5 Watt, die Mindestlast muss aber ebenfalls erreicht werden. Bei gemischten Leuchtmitteln die Freigabe beachten.',
    },
    {
      question: 'Warum verändert sich die Lichtfarbe beim Dimmen?',
      answer:
        'Günstige Treiber verschieben beim Herunterdimmen den Farbton, oft ins Grünliche oder Kühle. Hochwertige dimmbare LEDs halten die Farbtemperatur stabiler. Für Wohnräume ist ein Modell mit guter Dimmkurve und 2700 bis 3000 Kelvin empfehlenswert.',
    },
    {
      question: 'Was kostet ein passender LED-Dimmer?',
      answer:
        'Ein einfacher Dimmer kostet 25 bis 70 Euro, ein smartes Modell 50 bis 120 Euro. Dazu kommen 60 bis 120 Euro für den Elektriker, wenn die Installation angepasst werden muss. Der Austausch ist oft günstiger als mehrere Fehlkäufe bei Leuchtmitteln.',
    },
  ],
  sources: [
    { label: 'Verbraucherzentrale: LED-Lampen richtig auswählen und dimmen' },
    { label: 'Umweltbundesamt: Energieeffiziente Beleuchtung im Haushalt' },
  ],
}
