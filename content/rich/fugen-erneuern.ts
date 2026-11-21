import type { ArticleContent } from '@/lib/content'

export const fugenErneuern: ArticleContent = {
  updatedAt: '2026-11-11T09:00:00.000Z',
  intro:
    'Verfärbte, poröse oder schimmelige Silikonfugen sind kein Schönheitsfehler, sondern eine Feuchtigkeitsbrücke in die Wand. Diese Anleitung zeigt, welches Material in welchen Bereich gehört, welches Werkzeug Sie brauchen und in welcher Reihenfolge Sie eine Fuge erneuern, die auch nach zwei Jahren noch dicht ist.',
  keyTakeaways: [
    'Schimmel in der Fuge lässt sich nicht wegreinigen – das Silikon muss entfernt werden.',
    'Silikon haftet nicht auf Silikon: alte Fuge restlos auskratzen, nicht überspritzen.',
    'Eine Rundschnur als Hinterfüllung verhindert Risse und spart Material.',
    'Nach dem Ziehen 24 Stunden kein Wasser, bei breiten Fugen 48 Stunden.',
    'Material für ein Bad kostet 25–40 €, ein Fachbetrieb 8–15 € pro laufendem Meter.',
  ],
  widget: 'fugen-kosten',
  sections: [
    {
      heading: 'Wann Sie Fugen wirklich erneuern müssen',
      blocks: [
        {
          type: 'p',
          text: 'Nicht jede dunkle Stelle bedeutet, dass die Fuge raus muss. Entscheidend ist, ob die Feuchtigkeit im Silikon sitzt oder nur auf der Oberfläche. Sitzt der Schimmel in der Fuge, hilft kein Schrubben – dann muss das Material ersetzt werden, weil Silikon Schimmel nicht wieder abgibt.',
        },
        {
          type: 'table',
          caption: 'Fugenschaden richtig einordnen',
          head: ['Befund', 'Typische Ursache', 'Was zu tun ist'],
          rows: [
            ['Schwarze Punkte in der Fuge, die nach dem Reinigen bleiben', 'Schimmel im Silikon', 'Fuge vollständig erneuern'],
            ['Fuge löst sich am Rand ab', 'Haftungsverlust durch Nässe oder Bewegung', 'Fuge erneuern, Untergrund neu vorbereiten'],
            ['Risse quer durch die Fuge', 'Bewegung der Bauteile oder zu junge Belastung', 'Fuge erneuern, mit Hinterfüllung arbeiten'],
            ['Fuge wirkt milchig oder vergilbt', 'UV-Licht und Alterung', 'Optischer Mangel – erneuern, wenn es stört'],
            ['Feuchter Geruch, Wasser läuft hinter die Fuge', 'Undichtigkeit, defekte Bauwerksabdichtung', 'Sofort handeln und Fachbetrieb hinzuziehen'],
          ],
        },
        {
          type: 'p',
          text: 'Als Faustregel halten Silikonfugen im Nassbereich acht bis zwölf Jahre, wenn sie fachgerecht gezogen wurden. Fugen in der Dusche altern schneller als am Waschbecken, weil sie täglich Wasser und Reinigungsmitteln ausgesetzt sind.',
        },
      ],
    },
    {
      heading: 'Silikon, Acryl oder Zementfuge: Was gehört wohin?',
      blocks: [
        {
          type: 'p',
          text: 'Der häufigste Grund für eine schnell wieder schwarze Fuge ist das falsche Material. Silikon, Acryl und Zementfuge haben unterschiedliche Aufgaben und dürfen nicht beliebig getauscht werden.',
        },
        {
          type: 'table',
          head: ['Einsatzort', 'Material', 'Warum'],
          rows: [
            ['Dusche, Badewanne, Waschbecken', 'Sanitärsilikon, acetatvernetzend', 'Wasserfest, elastisch, schimmelhemmend ausgerüstet'],
            ['Marmor, Naturstein, Acrylwanne', 'Neutralvernetzendes Silikon', 'Acetat kann Stein und Acryl angreifen'],
            ['Übergang Wand–Fensterrahmen (gestrichen)', 'Acryl', 'Überstreichbar, für trockene Anschlüsse'],
            ['Bodenfliesen, Küchenarbeitsplatte aus Stein', 'Zementfuge / Fliesenmörtel', 'Druckfest und schleifbar, kein elastischer Kunststoff'],
            ['Bewegungsfuge zwischen zwei Bauteilen', 'Dauerelastisches Silikon mit Hinterfüllung', 'Nimmt Bewegung auf, ohne zu reißen'],
          ],
        },
        {
          type: 'note',
          title: 'Die eiserne Regel',
          text: 'Silikon haftet nicht auf Silikon. Alte Reste müssen vollständig entfernt werden, sonst löst sich die neue Fuge innerhalb weniger Wochen wieder ab. Das gilt auch für feine Schmierfilme von Reinigern.',
        },
      ],
    },
    {
      heading: 'Werkzeug und Material für ein Bad',
      blocks: [
        {
          type: 'ul',
          items: [
            'Fugenmesser oder Silikonentferner mit Klinge, alternativ ein scharfes Cuttermesser',
            'Sanitärsilikon in Kartusche, passend zum Untergrund (acetat- oder neutralvernetzend)',
            'Rundschnur als Hinterfüllung, Durchmesser etwa halb so groß wie die Fugenbreite',
            'Abklebeband, am besten glattes Kreppband',
            'Glättmittel oder ein Gemisch aus Wasser und einem Tropfen Spülmittel',
            'Silikonspritze mit glatter Düse, Küchenpapier, Spiritus oder Isopropanol',
            'Für Schimmel: Einwegmaske FFP2, Handschuhe, Schutzbrille',
          ],
        },
        {
          type: 'p',
          text: 'Rechnen Sie für ein komplettes Bad mit 25 bis 40 Euro Material. Zwei Kartuschen Sanitärsilikon reichen in der Regel für Wanne, Waschbecken und Duschecke.',
        },
      ],
    },
    {
      heading: 'Schritt für Schritt: Fuge in sechs Schritten erneuern',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: '1. Alte Fuge vollständig entfernen',
              text: 'Setzen Sie das Fugenmesser am Rand an und ziehen Sie das Silikon in einem Zug heraus. Arbeiten Sie nicht in der Fuge hin und her, sonst ritzen Sie die Fliese. Kleine Reste mit dem Cutter vorsichtig abschaben.',
            },
            {
              title: '2. Fugenflanken reinigen',
              text: 'Entfernen Sie Seifenreste, Kalk und Schimmel mit Spiritus oder Isopropanol. Tupfen Sie die Fläche trocken und lassen Sie sie mindestens 24 Stunden auslüften, damit die Feuchtigkeit aus dem Fugenkanal entweicht.',
            },
            {
              title: '3. Untergrund prüfen und grundieren',
              text: 'Der Untergrund muss trocken, sauber, fettfrei und tragfähig sein. Auf saugenden Untergründen wie Kalkputz oder Gipskarton hilft eine Silikon-Grundierung, damit die Fuge haftet.',
            },
            {
              title: '4. Abkleben und hinterfüllen',
              text: 'Kleben Sie beide Fugenränder mit Kreppband ab – das ergibt eine saubere Kante. Legen Sie anschließend eine Rundschnur ein. Sie verhindert, dass Silikon in den Spalt läuft, und sorgt dafür, dass die Fuge nur an zwei Flanken haftet und sich bewegen kann.',
            },
            {
              title: '5. Silikon ziehen und glätten',
              text: 'Kartusche aufschneiden, Düse schräg ansetzen und die Fuge mit gleichmäßigem Druck füllen. Danach sofort mit dem Glättmittel in einem Zug abziehen. Überschüssiges Material auf Küchenpapier abnehmen, nicht mit dem Finger nachwischen.',
            },
            {
              title: '6. Band entfernen und aushärten lassen',
              text: 'Ziehen Sie das Kreppband ab, solange das Silikon noch nicht anzieht – etwa 10 bis 15 Minuten nach dem Glätten. Danach 24 Stunden kein Wasser, bei breiten Fugen 48 Stunden. Erst dann wieder duschen.',
            },
          ],
        },
      ],
    },
    {
      heading: 'Die fünf Fehler, die fast jede neue Fuge ruinieren',
      blocks: [
        {
          type: 'ol',
          items: [
            'Auf feuchten Untergrund gespritzt: Das Silikon haftet nicht, Wasser bleibt eingeschlossen, Schimmel kommt zurück.',
            'Alte Silikonreste nicht entfernt: Die neue Fuge hält nur auf dem alten Film, nicht auf der Fliese.',
            'Ohne Hinterfüllung gearbeitet: Die Fuge ist zu dick, reißt bei Bewegung und wird porös.',
            'Mit dem Finger glatt gestrichen: Fett und Bakterien von der Haut landen in der Fuge.',
            'Zu früh geduscht: Silikon braucht Aushärtezeit, sonst entstehen Bläschen und Risse.',
          ],
        },
      ],
    },
    {
      heading: 'Was kostet eine neue Fuge?',
      blocks: [
        {
          type: 'table',
          caption: 'Erfahrungswerte für Deutschland, November 2026 – regionale Abweichungen bis ±30 % möglich',
          head: ['Variante', 'Kosten', 'Zeitaufwand'],
          rows: [
            ['Selbst machen, Material für ein Bad', '25–40 €', '2–3 Stunden plus 24 Stunden Trocknung'],
            ['Fachbetrieb, Preis pro laufendem Meter', '8–15 €/lfm', 'Ein Bad meist in 1–2 Stunden'],
            ['Fachbetrieb mit Mindestpauschale', '150–300 €', 'inklusive Anfahrt und Entsorgung'],
            ['Fugensanierung mit Schimmelbefall', 'ab 300 €', 'abhängig vom Befund'],
          ],
        },
        {
          type: 'p',
          text: 'Ein Bad hat typischerweise 8 bis 14 laufende Meter Fugen an Wanne, Dusche und Waschbecken. Der Selbstbau lohnt sich finanziell, scheitert aber oft an der Vorbereitung – genau an der Stelle, an der Fachbetriebe den Großteil der Zeit investieren.',
        },
      ],
    },
    {
      heading: 'Wann Sie einen Fachbetrieb rufen sollten',
      blocks: [
        {
          type: 'p',
          text: 'Bei rein optischen Schäden und einer einzelnen Fuge ist Selbstmachen unproblematisch. Anders sieht es aus, wenn Feuchtigkeit hinter die Fliesen oder in die Wand gelangt ist: Dann ist die Fuge nur das Symptom.',
        },
        {
          type: 'note',
          title: 'Diese Fälle gehören in Fachhände',
          text: 'Wiederkehrender Schimmel trotz richtigem Lüften, feuchte Stellen an der Wand unter der Dusche, Risse in der Bauwerksabdichtung, Fugen in bodengleichen Duschen sowie alles, was größer als ein halber Quadratmeter ist. Hier muss zuerst die Ursache geklärt werden – sonst ist die neue Fuge in wenigen Monaten wieder schwarz.',
        },
        {
          type: 'p',
          text: 'Mehr zur Ursachenklärung finden Sie im Ratgeber <a href="/artikel/schimmel-selbst-entfernen">Schimmel entfernen</a>. Wenn Sie prüfen möchten, ob Ihr Bad ausreichend gelüftet wird, hilft der Artikel <a href="/artikel/richtig-lueften-im-winter">Richtig lüften im Winter</a>.',
        },
      ],
    },
    {
      heading: 'Mehr zum Thema',
      blocks: [
        {
          type: 'p',
          text: 'Wenn die neue Fuge trotz Reinigung wieder schwarz wird, steckt oft Feuchtigkeit dahinter. Wie Sie Schimmel sicher entfernen, steht im Ratgeber <a href="/artikel/schimmel-selbst-entfernen">Schimmel selbst entfernen</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Wie lange hält eine neue Silikonfuge im Bad?',
      answer:
        'Bei fachgerechter Verarbeitung acht bis zwölf Jahre. In der Dusche, mit täglicher Belastung durch Wasser und Reiniger, eher acht Jahre. Entscheidend sind trockener Untergrund, vollständig entfernte Altfuge und eine Hinterfüllung.',
    },
    {
      question: 'Kann ich die alte Fuge überstreichen oder überspritzen?',
      answer:
        'Nein. Silikon haftet nicht auf Silikon, und Farbe hält auf Silikon nicht. Die alte Fuge muss mechanisch entfernt werden. Nur bei Acrylfugen ist ein Überstreichen möglich.',
    },
    {
      question: 'Welches Silikon im Bad gegen Schimmel?',
      answer:
        'Sanitärsilikon mit Schimmelhemmer, im Nassbereich acetatvernetzend. Bei Naturstein, Marmor oder Acrylwannen müssen Sie neutralvernetzendes Silikon verwenden, weil Acetat die Oberfläche angreifen kann.',
    },
    {
      question: 'Wie viel Silikon brauche ich pro Meter Fuge?',
      answer:
        'Bei einer Fugenbreite von 5 Millimetern und einer Tiefe von 5 Millimetern reicht eine handelsübliche 310-Milliliter-Kartusche für etwa 10 bis 12 laufende Meter. Bei breiteren Fugen entsprechend weniger.',
    },
    {
      question: 'Muss ich die Fuge nach dem Ziehen glätten?',
      answer:
        'Ja. Glätten verdichtet das Material, drückt es an die Flanken und verhindert Lufteinschlüsse. Ohne Glätten bleibt eine raue Oberfläche, auf der sich Wasser und Seifenreste sammeln.',
    },
    {
      question: 'Wie bekomme ich alte Silikonreste restlos weg?',
      answer:
        'Mit einem Fugenmesser längs zur Fuge herausziehen, Reste mit dem Cutter flach abschaben – nie quer zur Fliese kratzen, sonst entstehen Kratzer in der Glasur. Anschließend die Flanken mit Spiritus oder Isopropanol entfetten und vollständig trocknen lassen.',
    },
    {
      question: 'Kann ich Acryl statt Silikon im Bad verwenden?',
      answer:
        'Nein. Acryl ist nicht wasserdicht, quillt bei dauerhafter Feuchte auf und ist ein Nährboden für Schimmel. Acryl gehört an trockene Anschlüsse wie Wand–Fensterrahmen, im Nassbereich bleibt Sanitärsilikon die einzige sichere Wahl.',
    },
    {
      question: 'Warum ist die neue Fuge nach wenigen Wochen wieder schwarz?',
      answer:
        'Meist war der Untergrund nicht trocken, es stand Wasser hinter der Fuge, oder es wurde acetatvernetzendes Silikon auf Naturstein verwendet. Wenn der Befall in der Tiefe sitzt, hilft nur: Fuge erneut entfernen und die Feuchtequelle klären.',
    },
  ],
  sources: [
    { label: 'Umweltbundesamt: Schimmelpilze in Innenräumen – Leitfaden zur Vorbeugung und Sanierung' },
    { label: 'Verbraucherzentrale: Feuchtigkeit und Schimmel in der Wohnung' },
  ],
}

