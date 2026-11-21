import type { ArticleContent } from '@/lib/content'

export const gartenWinterfestMachen: ArticleContent = {
  updatedAt: '2026-11-21T13:00:00.000Z',
  intro:
    'Der Garten muss nicht in einer einzigen Oktoberwoche winterfest werden. Wichtiger ist die Reihenfolge: zuerst empfindliche Kübelpflanzen und Wasserleitungen, dann Rasen, Beete und Geräte. Diese Checkliste zeigt, was vor dem ersten harten Frost wirklich Priorität hat – und was Sie sich sparen können.',
  keyTakeaways: [
    'Vor dem ersten harten Frost zuerst Wasser abstellen, Schläuche entleeren und Kübelpflanzen schützen.',
    'Rasen kurz mähen, Laub entfernen und im Spätherbst keinen stickstoffbetonten Dünger mehr geben.',
    'Immergrüne und junge Pflanzen brauchen Winterschutz, frostharte Stauden meist nur eine Mulchschicht.',
    'Terrasse, Möbel und Geräte trocken einlagern – Feuchtigkeit richtet mehr Schaden an als Kälte.',
    'Nicht alles abdecken: Luftzirkulation verhindert Schimmel und Fäulnis.',
  ],
  sections: [
    {
      heading: 'Wann ist der richtige Zeitpunkt?',
      blocks: [
        {
          type: 'p',
          text: 'Der beste Zeitraum liegt zwischen Mitte Oktober und Ende November, solange der Boden noch nicht gefroren ist und die Tage mild bleiben. Arbeiten an Wasserleitungen und Kübelpflanzen sollten vor dem ersten Nachtfrost erledigt sein. Rasen, Laub und Beete können danach noch nachgezogen werden, solange kein Schnee liegt.',
        },
        {
          type: 'table',
          caption: 'Prioritäten vor dem Winter',
          head: ['Aufgabe', 'Zeitpunkt', 'Warum'],
          rows: [
            ['Wasser abstellen und Leitungen entleeren', 'vor dem ersten Frost', 'Gefrorenes Wasser sprengt Rohre und Ventile'],
            ['Kübelpflanzen schützen', 'vor dem ersten Nachtfrost', 'Wurzeln frieren im Topf schneller als im Boden'],
            ['Rasen letztmals mähen', 'Oktober bis November', 'Zu langer Rasen fault unter Schnee'],
            ['Laub entfernen', 'Oktober bis November', 'Laub erstickt Rasen und fördert Pilze'],
            ['Beete mulchen', 'nach dem ersten Frost', 'Boden bleibt temperiert, Unkraut keimt weniger'],
            ['Möbel und Geräte einlagern', 'November', 'Feuchtigkeit und Frost schädigen Holz und Elektronik'],
          ],
        },
      ],
    },
    {
      heading: 'Pflanzen: schützen, aber nicht ersticken',
      blocks: [
        {
          type: 'p',
          text: 'Kübelpflanzen sind im Winter besonders gefährdet, weil der Wurzelballen von allen Seiten der Kälte ausgesetzt ist. Stellen Sie den Topf auf eine isolierende Unterlage, rücken Sie ihn an die Hauswand und umwickeln Sie ihn mit Vlies oder Jute. Ein Übertopf aus Kunststoff schützt zusätzlich vor Wind, darf aber kein Wasser sammeln.',
        },
        {
          type: 'ul',
          items: [
            'Immergrüne Kübelpflanzen brauchen auch im Winter Wasser – an frostfreien Tagen sparsam gießen.',
            'Stauden erst nach dem ersten Frost zurückschneiden; hohle Stängel sind oft Winterquartier für Insekten.',
            'Rosen nicht bei Frost schneiden; lange Triebe erst im Frühjahr entfernen.',
            'Junge Bäume und Sträucher mit einem Stammschutz gegen Frost und Wildverbiss sichern.',
            'Mulch aus Laub oder Rindenmulde hält den Boden gleichmäßig kühl, aber nicht zu nass.',
          ],
        },
        {
          type: 'note',
          title: 'Keine Plastikfolie direkt auf die Pflanze',
          text: 'Plastik oder dichte Folie verhindert den Luftaustausch. Unter der Abdeckung sammelt sich Feuchtigkeit, die bei Frost zu Eis wird und Triebe erfrieren lässt. Vlies, Jute oder ein luftiger Schutzkorb sind die bessere Wahl.',
        },
      ],
    },
    {
      heading: 'Rasen und Beete',
      blocks: [
        {
          type: 'p',
          text: 'Der letzte Rasenschnitt sollte kurz ausfallen, aber nicht zu kurz: drei bis vier Zentimeter sind ein guter Kompromiss. Zu langer Rasen knickt unter Schnee um und fault, zu kurzer Rasen verliert die schützende Blattmasse. Entfernen Sie außerdem Laub von der Fläche, sonst bildet sich darunter eine feuchte Schicht.',
        },
        {
          type: 'ul',
          items: [
            'Im Spätherbst keinen stickstoffbetonten Dünger mehr ausbringen – er treibt weiches Wachstum, das Frost schädigt.',
            'Laub von Rasen und Wegen rechen; auf Beeten kann eine dünne Schicht als Mulch bleiben.',
            'Beete nicht umgraben, solange der Boden nass ist; sonst verdichtet sich die Erde.',
            'Fallobst entfernen, damit keine Pilze und Schädlinge überwintern.',
            'Empfindliche Stauden mit Laub, Reisig oder Vlies abdecken, aber nicht fest einpacken.',
          ],
        },
      ],
    },
    {
      heading: 'Wasser, Leitungen und Bewässerung',
      blocks: [
        {
          type: 'p',
          text: 'Wasser ist der häufigste Grund für Frostschäden im Garten. Stellen Sie die Außenwasserhähne ab, öffnen Sie sie kurz und entleeren Sie Schläuche, Gießkannen und Bewässerungssysteme. Wasser, das in einem Ventil oder einer Leitung bleibt, dehnt sich beim Gefrieren aus und kann Rohre und Anschlüsse sprengen.',
        },
        {
          type: 'ul',
          items: [
            'Außenwasserhahn schließen, Innenschieber zudrehen und den Hahn öffnen, damit Restwasser ablaufen kann.',
            'Schläuche aufrollen, entleeren und trocken lagern – nicht im Freien über den Winter hängen lassen.',
            'Bewässerungsschläuche und Tropfsysteme entleeren oder mit Druckluft ausblasen lassen.',
            'Regentonnen entleeren oder abdecken, damit sie nicht durch Eis aufplatzen.',
            'Teichpumpen reinigen und einlagern; Filter nicht mit Wasser gefüllt stehen lassen.',
          ],
        },
        {
          type: 'note',
          title: 'Erst Wasser abstellen, dann Pflanzen gießen',
          text: 'Im Winter brauchen immergrüne Pflanzen gelegentlich Wasser. Gießen Sie an frostfreien Tagen morgens, damit die Feuchtigkeit vor der Nacht abziehen kann. Stehendes Wasser in Töpfen und Untersetzern vermeiden.',
        },
      ],
    },
    {
      heading: 'Terrasse, Möbel und Gartengeräte',
      blocks: [
        {
          type: 'p',
          text: 'Holzmöbel leiden unter Nässe und Frost, Metall unter Korrosion. Reinigen Sie alles vor dem Einlagern und lassen Sie es vollständig trocknen. Polster und Textilien gehören nicht in eine feuchte Garage; besser trocken und luftig lagern. Elektrische Geräte wie Rasenmäher und Heckenschere werden gereinigt, entleert und mit vollem Akku an einem frostfreien Ort untergebracht.',
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Terrasse reinigen',
              text: 'Laub und Erde entfernen, damit keine Feuchtigkeit auf der Fläche bleibt. Bei Holzterrassen prüfen, ob Wasser ablaufen kann und keine Pfützen stehen.',
            },
            {
              title: 'Möbel trocknen und abdecken',
              text: 'Holz und Metall gründlich trocknen lassen. Wenn die Möbel draußen bleiben, eine atmungsaktive Abdeckung verwenden, die unten offen bleibt.',
            },
            {
              title: 'Geräte warten',
              text: 'Rasenmäher reinigen, Kraftstoff ablassen und Öl prüfen. Akkus bei etwa 50 Prozent laden und frostfrei lagern.',
            },
            {
              title: 'Werkzeug prüfen',
              text: 'Gartenschere und Spaten reinigen, trocknen und leicht ölen. Rost und Erde über den Winter vermeiden.',
            },
            {
              title: 'Letzte Kontrolle',
              text: 'Nach dem ersten Frost noch einmal prüfen, ob Abdeckungen halten, Wasser abläuft und keine Pflanze unter Folie erstickt.',
            },
          ],
        },
      ],
    },
    {
      heading: 'Was Sie im Herbst nicht tun sollten',
      blocks: [
        {
          type: 'ul',
          items: [
            'Keine frostempfindlichen Pflanzen bei Temperaturen unter fünf Grad zurückschneiden – offene Schnittstellen erfrieren.',
            'Keinen stickstoffbetonten Dünger im Spätherbst ausbringen.',
            'Keine dichte Folie direkt über Pflanzen spannen; es entsteht Kondenswasser und Fäulnis.',
            'Den Rasen nicht bis auf den Boden abmähen – die Blattmasse schützt die Grasnarbe.',
            'Laub nicht auf dem Rasen liegen lassen; darunter bildet sich schnell Schimmel.',
          ],
        },
      ],
    },
    {
      heading: 'Mehr zum Thema',
      blocks: [
        {
          type: 'p',
          text: 'Wenn Sie im Winter auch Wege und Terrasse beleuchten wollen, lesen Sie den Ratgeber <a href="/artikel/gartenbeleuchtung-solar">Gartenbeleuchtung Solar</a> – mit Kaufkriterien, Standortwahl und ehrlicher Einschätzung für die kalte Jahreszeit.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Wann sollte ich den Garten winterfest machen?',
      answer:
        'Zwischen Mitte Oktober und Ende November, solange der Boden nicht gefroren ist. Wasserleitungen und Kübelpflanzen zuerst, Rasen und Beete danach. Vor dem ersten harten Frost sollten die kritischen Arbeiten abgeschlossen sein.',
    },
    {
      question: 'Muss ich den Rasen im Herbst noch mähen?',
      answer:
        'Ja, aber nicht zu kurz. Drei bis vier Zentimeter sind ideal. Zu langer Rasen fault unter Schnee, zu kurzer Rasen verliert den Schutz. Entfernen Sie außerdem Laub, damit die Fläche atmen kann.',
    },
    {
      question: 'Wie schütze ich Kübelpflanzen vor Frost?',
      answer:
        'Topf auf eine isolierende Unterlage stellen, an die Hauswand rücken und mit Vlies oder Jute umwickeln. Immergrüne Pflanzen an frostfreien Tagen sparsam gießen. Keine dichte Folie verwenden, sonst entsteht Kondenswasser.',
    },
    {
      question: 'Darf ich im Herbst noch düngen?',
      answer:
        'Keinen stickstoffbetonten Dünger im Spätherbst. Er fördert weiches Wachstum, das Frost schädigt. Wenn der Boden noch warm ist, kann eine leichte Kaliumgabe die Frosthärte unterstützen; im Zweifel lieber auf das Frühjahr warten.',
    },
    {
      question: 'Was passiert, wenn Wasser in der Leitung bleibt?',
      answer:
        'Es gefriert, dehnt sich aus und kann Rohre, Ventile oder Anschlüsse sprengen. Deshalb Außenhahn abstellen, Restwasser ablassen und Schläuche sowie Bewässerungssysteme entleeren.',
    },
    {
      question: 'Sollte ich Laub auf den Beeten liegen lassen?',
      answer:
        'Eine dünne Schicht kann als Mulch schützen. Dicke Laubhaufen auf Rasen und Wegen entfernen, weil darunter Feuchtigkeit und Schimmel entstehen. Auf Beeten das Laub locker verteilen, nicht fest andrücken.',
    },
    {
      question: 'Wann sollte ich Gartenmöbel einlagern?',
      answer:
        'Im November, bevor längere Frost- und Regenperioden beginnen. Holz und Metall vorher trocknen. Wenn die Möbel draußen bleiben, eine atmungsaktive Abdeckung verwenden, die unten offen bleibt.',
    },
  ],
  sources: [
    { label: 'Nabu: Garten winterfest machen – Pflanzen und Tiere schützen' },
    { label: 'Verbraucherzentrale: Garten und Balkon im Winter' },
  ],
}
