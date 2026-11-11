import type { ArticleContent } from '@/lib/content'

export const schimmelSelbstEntfernen: ArticleContent = {
  updatedAt: '2026-11-11T09:20:00.000Z',
  intro:
    'Kleine Schimmelflächen lassen sich selbst entfernen – aber nur, wenn Sie die Ursache danach beseitigen. Sonst ist der Befall nach wenigen Wochen wieder da. Diese Anleitung zeigt, welches Mittel auf welcher Oberfläche funktioniert, wie Sie sich schützen und wann nach Empfehlung des Umweltbundesamts ein Fachbetrieb übernehmen sollte.',
  keyTakeaways: [
    'Bis etwa 0,5 m² oberflächlicher Befall ist Selbstentfernen vertretbar.',
    'Alkohol mit 70–80 Prozent ist auf glatten Flächen die zuverlässigste Wahl.',
    'Nicht trocken abkratzen – dabei werden Sporen aufgewirbelt.',
    'Silikonfugen werden ersetzt, nicht behandelt.',
    'Ohne beseitigte Feuchtequelle kommt der Schimmel innerhalb weniger Wochen zurück.',
  ],
  sections: [
    {
      heading: 'Selbst entfernen oder Fachbetrieb?',
      blocks: [
        {
          type: 'p',
          text: 'Das Umweltbundesamt nennt als Orientierung rund einen halben Quadratmeter Befallsfläche, ab dem eine Fachfirma sanieren sollte. Die genaue Grenze hängt von Material und Befallstiefe ab: Schimmel in Tapete oder hinter Fußleisten ist auch bei kleiner Fläche ein Fall für Profis. Alles darunter lässt sich bei oberflächlichem Befall selbst behandeln.',
        },
        {
          type: 'table',
          head: ['Situation', 'Selbst machbar?', 'Warum'],
          rows: [
            ['Kleine Flecken an Fliesen- oder Silikonfugen', 'Ja', 'Oberflächlicher Befall, glatter Untergrund'],
            ['Flecken an gestrichenen Wänden bis 0,5 m²', 'Ja, mit Vorsicht', 'Farbe kann den Schimmel aufnehmen'],
            ['Befall auf Tapete oder Raufaser', 'Nein', 'Schimmel sitzt im Papier, Tapete muss entfernt werden'],
            ['Schimmel hinter Fußleisten oder in der Wand', 'Nein', 'Ursache liegt im Baukörper'],
            ['Geruch ohne sichtbaren Befall', 'Nein', 'Vermutlich verdeckter Befall, Feuchtemessung nötig'],
            ['Befall größer als 0,5 m²', 'Nein', 'Empfehlung Umweltbundesamt: Fachbetrieb'],
          ],
        },
        {
          type: 'note',
          title: 'Gesundheit zuerst',
          text: 'Schimmelsporen belasten die Atemwege. Menschen mit Asthma, Allergie, geschwächtem Immunsystem sowie Kinder und Schwangere sollten den Raum während der Arbeiten nicht betreten. Bei großflächigem Befall lohnt sich eine Feuchtemessung durch einen Sachverständigen.',
        },
      ],
    },
    {
      heading: 'Schutzausrüstung und Werkzeug',
      blocks: [
        {
          type: 'ul',
          items: [
            'FFP2- oder FFP3-Maske, Einweghandschuhe, Schutzbrille',
            'Alte Kleidung, die anschließend gewaschen oder entsorgt wird',
            'Sprühflasche, Schwamm, Einwegtücher, Müllbeutel',
            'Desinfektionsmittel auf Alkoholbasis (70–80 Prozent) oder Wasserstoffperoxid',
            'Für Fugen: Fugenmesser und neues Sanitärsilikon',
            'Hygrometer zur Kontrolle der Luftfeuchtigkeit (Ziel: 40–60 Prozent)',
          ],
        },
      ],
    },
    {
      heading: 'Welches Mittel gegen Schimmel?',
      blocks: [
        {
          type: 'table',
          head: ['Mittel', 'Geeignet für', 'Hinweise'],
          rows: [
            ['Alkohol 70–80 %', 'Fliesen, Glas, Silikon, lackierte Flächen', 'Schnell wirksam, verdunstet, Geruch brennbar'],
            ['Wasserstoffperoxid 3 %', 'Glatte Oberflächen, Fugen', 'Bleichende Wirkung, nicht auf Textilien'],
            ['Essigessenz', 'Nur glatte Flächen', 'Wirkt nicht gegen alle Schimmelarten, Geruch'],
            ['Chlorhaltige Reiniger', 'Sanitärbereich, Fliesen', 'Nicht auf Kalkputz, Metall und buntem Silikon'],
            ['Spezielle Schimmelentferner', 'Nach Herstellerangabe', 'Auf Wirkstoff und Materialverträglichkeit achten'],
          ],
        },
        {
          type: 'p',
          text: 'Wichtig: Kein Mittel dauerhaft in die Wand einbringen und niemals mehrere Reiniger mischen – besonders nicht chlorhaltige mit säurehaltigen. Für poröse Untergründe wie Gipskarton oder Kalkputz ist Abtragen und Erneuern die einzige sichere Lösung.',
        },
      ],
    },
    {
      heading: 'Schimmel entfernen in sechs Schritten',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: '1. Ursache grob eingrenzen',
              text: 'Prüfen Sie, ob die Stelle an einer Außenwand, hinter einem Schrank oder in einer Ecke liegt. Typische Ursachen sind zu wenig Lüften, Wäschetrocknen in der Wohnung und Möbel, die direkt an der Außenwand stehen.',
            },
            {
              title: '2. Raum vorbereiten',
              text: 'Fenster öffnen, Heizung aus, Möbel wegrücken. Legen Sie eine Folie aus und halten Sie einen Müllbeutel für die benutzten Tücher bereit. Keine anderen Personen im Raum.',
            },
            {
              title: '3. Schutz anlegen',
              text: 'Maske, Handschuhe und Brille anlegen, bevor Sie das Mittel aufsprühen. Das gilt auch bei kleinen Flächen – Sporen werden beim Wischen aufgewirbelt.',
            },
            {
              title: '4. Fläche besprühen und abwischen',
              text: 'Mittel aufsprühen, kurz einwirken lassen und mit einem Einwegtuch abwischen. Nicht trocken abkratzen und nicht mit dem Schwamm über die Fläche verteilen – beides verteilt die Sporen.',
            },
            {
              title: '5. Tücher und Handschuhe entsorgen',
              text: 'Alles, was mit dem Befall in Berührung kam, in den Müllbeutel geben und verschließen. Hände waschen, Kleidung wechseln und waschen.',
            },
            {
              title: '6. Nach 2–3 Tagen kontrollieren',
              text: 'Ist die Stelle trocken und ohne neue Flecken, war die Behandlung erfolgreich. Kommt der Befall wieder, ist die Ursache nicht behoben – dann Feuchtigkeit messen lassen.',
            },
          ],
        },
      ],
    },
    {
      heading: 'Welche Oberfläche, welches Vorgehen?',
      blocks: [
        {
          type: 'table',
          head: ['Oberfläche', 'Vorgehen'],
          rows: [
            ['Fliesen und Glas', 'Alkohol aufsprühen, abwischen, Fuge anschließend erneuern'],
            ['Silikonfuge', 'Alte Fuge komplett entfernen, nicht behandeln – das Silikon bleibt Träger'],
            ['Gestrichene Wand', 'Oberfläche behandeln, bei wiederkehrendem Befall Farbe abtragen und neu streichen'],
            ['Raufaser oder Vliestapete', 'Tapete entfernen, Untergrund behandeln und nach Trocknung neu tapezieren'],
            ['Gipskarton', 'Befallene Platte ausschneiden und ersetzen, Ursache klären'],
            ['Holz (Möbel)', 'Abschleifen, mit Alkohol behandeln, trocknen lassen'],
            ['Textilien', 'Bei 60 Grad waschen, was nicht waschbar ist, entsorgen'],
          ],
        },
      ],
    },
    {
      heading: 'Die Ursache beseitigen, sonst kommt der Schimmel zurück',
      blocks: [
        {
          type: 'ul',
          items: [
            'Stoßlüften statt Kippfenster: drei- bis viermal täglich fünf bis zehn Minuten.',
            'Luftfeuchtigkeit zwischen 40 und 60 Prozent halten und mit einem Hygrometer kontrollieren.',
            'Möbel mindestens 5 bis 10 Zentimeter von Außenwänden abrücken, damit Luft zirkulieren kann.',
            'Wäsche möglichst draußen oder im Trockner trocknen, nicht in der Wohnung.',
            'Nach dem Duschen und Kochen sofort lüften, Feuchtigkeit nicht in andere Räume tragen.',
            'Kalte Wandflächen (Wärmebrücken) prüfen lassen – dort hilft Lüften allein nicht dauerhaft.',
          ],
        },
        {
          type: 'p',
          text: 'Wie viel Lüften nötig ist, hängt von Raumgröße, Dämmung und Nutzung ab. Eine konkrete Anleitung dazu finden Sie unter <a href="/artikel/richtig-lueften-im-winter">Richtig lüften im Winter</a>. Wenn die Feuchtigkeit trotz richtigem Verhalten bleibt, hilft der Weg über die Ursachenklärung im Artikel <a href="/artikel/fugen-erneuern">Fugen erneuern</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Wie entferne ich Schimmel richtig?',
      answer:
        'Schutzausrüstung anlegen, Fläche mit Alkohol oder Wasserstoffperoxid einsprühen, mit einem Einwegtuch abwischen und alles entsorgen. Nicht trocken abkratzen, weil dabei Sporen aufgewirbelt werden. Danach die Ursache der Feuchtigkeit beseitigen.',
    },
    {
      question: 'Ab wann muss ein Fachbetrieb den Schimmel entfernen?',
      answer:
        'Das Umweltbundesamt empfiehlt eine Fachfirma ab etwa einem halben Quadratmeter Befallsfläche, bei Befall hinter Tapeten oder in der Wand sowie bei verdecktem Befall mit Geruch.',
    },
    {
      question: 'Ist Essig gegen Schimmel sinnvoll?',
      answer:
        'Nur eingeschränkt und nur auf glatten Flächen. Essig wirkt nicht gegen alle Schimmelarten und kann auf porösen Untergründen Nährboden für andere Mikroorganismen schaffen. Alkohol ist die zuverlässigere Wahl.',
    },
    {
      question: 'Warum kommt der Schimmel nach dem Entfernen wieder?',
      answer:
        'Weil die Feuchtigkeit bleibt. Schimmel ist ein Symptom, nicht die Ursache. Ohne beseitigte Feuchtequelle – durch Lüftungsverhalten, Wärmebrücke oder Undichtigkeit – kehrt der Befall innerhalb weniger Wochen zurück.',
    },
    {
      question: 'Wie lange dauert es, bis die Stelle wieder trocken ist?',
      answer:
        'Bei oberflächlichem Befall auf glatten Flächen meist wenige Stunden bis ein Tag. Nach dem Behandeln sollte die Fläche vollständig abtrocknen, bevor Möbel wieder davor gestellt werden.',
    },
  ],
  sources: [
    { label: 'Umweltbundesamt: Schimmelpilze in Innenräumen – Leitfaden zur Vorbeugung, Untersuchung und Sanierung' },
    { label: 'Verbraucherzentrale: Schimmel in der Wohnung – Ursachen und was Sie tun können' },
  ],
}
