import type { ArticleContent } from '@/lib/content'

export const heizkoerperEntlueften: ArticleContent = {
  updatedAt: '2026-11-11T09:15:00.000Z',
  intro:
    'Wenn ein Heizkörper oben kalt bleibt, unten aber warm wird, sitzt Luft im System. Entlüften dauert pro Heizkörper zwei Minuten, spart Heizenergie und verhindert Gluckern und Korrosion. Diese Anleitung zeigt die richtige Reihenfolge, den Umgang mit dem Druck und was zu tun ist, wenn es danach nicht besser wird.',
  keyTakeaways: [
    'Oben kalt und unten warm ist das klassische Zeichen für Luft im Heizkörper.',
    'Von unten nach oben entlüften und mit dem entferntesten Heizkörper beginnen.',
    'Danach Druck prüfen: bei kaltem System meist 1,5–2,0 bar.',
    'Bleibt ein einzelner Heizkörper kalt, klemmt häufig der Ventilstift.',
    'Ständig fallender Druck gehört in die Hand eines Fachbetriebs.',
  ],
  sections: [
    {
      heading: 'Woran Sie merken, dass Luft im Heizkörper ist',
      blocks: [
        {
          type: 'ul',
          items: [
            'Der Heizkörper wird oben nicht warm, unten schon – typisches Zeichen für einen Lufteinschluss.',
            'Es gluckert oder rauscht, wenn die Heizung anläuft.',
            'Die Heizung braucht länger, bis der Raum warm ist, obwohl der Thermostat voll aufgedreht ist.',
            'Einzelne Heizkörper bleiben kalt, während andere normal heizen.',
            'Der Druck an der Therme sinkt langsam, ohne dass Wasser austritt.',
          ],
        },
        {
          type: 'p',
          text: 'Luft gelangt über Diffusion durch Dichtungen, über die Nachfüllung oder nach Reparaturen ins System. Sie sammelt sich am höchsten Punkt – bei einem Heizkörper also oben. Deshalb ist das obere Drittel kalt, während der Rest warm wird.',
        },
      ],
    },
    {
      heading: 'Werkzeug: mehr brauchen Sie nicht',
      blocks: [
        {
          type: 'ul',
          items: [
            'Entlüftungsschlüssel für Heizkörper (Vierkant, meist 5 oder 6 Millimeter) – alternativ ein passender Inbusschlüssel',
            'Kleiner Eimer oder Schale, ein altes Handtuch, ein Glas',
            'Für geschlossene Systeme: ein Stück Schlauch zum Auffangen des Wassers',
            'Zum Prüfen des Drucks: Blick auf das Manometer an der Heizung oder Therme',
            'Zum Nachfüllen: Füllschlauch oder Hahnwasser-Anschluss, je nach Anlage',
          ],
        },
        {
          type: 'note',
          title: 'Vorher prüfen',
          text: 'Steht der Heizkörper unter einem fest verbauten Thermostatkopf, drehen Sie ihn vor dem Entlüften voll auf. Sonst kann die Luft nicht entweichen. Bei Fußbodenheizung und Wärmepumpe entlüften Sie nicht am Heizkörper, sondern an den Verteilerkreisen.',
        },
      ],
    },
    {
      heading: 'Die richtige Reihenfolge beim Entlüften',
      blocks: [
        {
          type: 'p',
          text: 'Übliche Praxis: von unten nach oben entlüften und mit dem Heizkörper beginnen, der am weitesten von der Heizungsanlage entfernt ist. Entscheidend ist, dass die Luft in Richtung Anlage gedrückt wird und sich nicht über das ganze System verteilt.',
        },
        {
          type: 'ol',
          items: [
            'Schalten Sie die Heizung aus und lassen Sie die Pumpe etwa 10 Minuten stehen.',
            'Beginnen Sie im untersten Stockwerk am entferntesten Heizkörper.',
            'Arbeiten Sie sich stockwerkweise nach oben vor.',
            'Zum Schluss den Heizkörper direkt neben der Heizungsanlage entlüften.',
            'Danach Druck prüfen und gegebenenfalls Wasser nachfüllen.',
          ],
        },
      ],
    },
    {
      heading: 'Heizkörper entlüften in sechs Schritten',
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: '1. Heizung ausschalten',
              text: 'Drehen Sie die Heizung aus und warten Sie, bis die Pumpe steht. Bei laufender Pumpe kann Luft wieder in andere Bereiche gesaugt werden.',
            },
            {
              title: '2. Alle Thermostate voll aufdrehen',
              text: 'Öffnen Sie alle Thermostatventile im Haus. Das verhindert, dass Luft in geschlossenen Kreisen eingesperrt bleibt.',
            },
            {
              title: '3. Entlüftungsventil finden',
              text: 'Das Ventil sitzt an der oberen, freien Seite des Heizkörpers, meist unter einer kleinen Kappe. Stellen Sie Eimer oder Handtuch darunter.',
            },
            {
              title: '4. Ventil eine Vierteldrehung öffnen',
              text: 'Drehen Sie den Vierkant gegen den Uhrzeigersinn, bis es zischt. Es kann kurz Wasser nachlaufen – deshalb das Gefäß bereithalten.',
            },
            {
              title: '5. Warten, bis Wasser kommt',
              text: 'Sobald statt Luft ein gleichmäßiger Wasserstrahl austritt, ist der Heizkörper entlüftet. Sofort zudrehen – nicht zu fest, sonst beschädigen Sie die Dichtung.',
            },
            {
              title: '6. Druck prüfen und Heizung wieder starten',
              text: 'Kontrollieren Sie das Manometer: Bei kaltem System sollten es meist zwischen 1,5 und 2,0 bar sein. Danach die Heizung einschalten und alle Heizkörper prüfen.',
            },
          ],
        },
      ],
    },
    {
      heading: 'Druck, Nachfüllen und die häufigsten Folgeprobleme',
      blocks: [
        {
          type: 'p',
          text: 'Nach dem Entlüften fehlt Wasser im Kreislauf. Sinkt der Druck unter etwa 1,0 bar, schaltet die Therme ab oder zieht Luft nach. Füllen Sie langsam nach und prüfen Sie den Wert am nächsten Tag erneut.',
        },
        {
          type: 'table',
          caption: 'Symptom, Ursache, nächster Schritt',
          head: ['Symptom', 'Ursache', 'Was zu tun ist'],
          rows: [
            ['Oben kalt, unten warm', 'Luft im Heizkörper', 'Entlüften'],
            ['Gleichmäßig kalt, Ventil auf', 'Ventilstift klemmt oder Thermostat defekt', 'Stift vorsichtig lösen, Thermostat prüfen'],
            ['Einzelner Heizkörper bleibt kalt', 'Ventil geschlossen oder verstopft', 'Ventil prüfen, Fachbetrieb bei Verstopfung'],
            ['Alle Heizkörper werden nicht warm', 'Pumpe, Vorlauf oder Brenner', 'Fachbetrieb rufen'],
            ['Druck fällt ständig', 'Undichte Stelle im System', 'Fachbetrieb, nicht selbst nachfüllen'],
            ['Gluckern bleibt nach dem Entlüften', 'Luft im Verteiler oder in der Leitung', 'Weiter entlüften, sonst Fachbetrieb'],
          ],
        },
        {
          type: 'p',
          text: 'Wenn nur ein einzelner Heizkörper nach dem Entlüften kalt bleibt, liegt es oft am klemmenden Ventilstift. Nehmen Sie den Thermostatkopf ab und prüfen Sie, ob sich der Stift eindrücken lässt. Bewegt er sich nicht, hilft vorsichtiges Lösen – bei Widerstand aufhören, sonst tritt Wasser aus.',
        },
        {
          type: 'note',
          title: 'Diese Fälle gehören zum Fachbetrieb',
          text: 'Ständig fallender Druck, Wasser an der Therme, keine Warmwasserbereitung, Fußbodenheizung mit Luftproblemen sowie Anlagen mit Wärmepumpe. Auch das Nachfüllen von Anlagen mit enthärtetem oder behandeltem Wasser sollte fachgerecht erfolgen.',
        },
        {
          type: 'p',
          text: 'Wenn der Heizkörper warm wird, der Raum aber kalt bleibt, liegt es häufig an der Einstellung der Thermostate oder am Lüften. Dazu passen <a href="/artikel/heizkoerper-wird-nicht-warm">Heizkörper wird nicht warm</a> und <a href="/artikel/richtig-lueften-im-winter">Richtig lüften im Winter</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Wie oft sollte man Heizkörper entlüften?',
      answer:
        'Einmal pro Jahr vor Beginn der Heizsaison reicht in den meisten Haushalten. Wenn Sie Gluckern hören oder ein Heizkörper oben kalt bleibt, entlüften Sie sofort – unabhängig vom Zeitpunkt.',
    },
    {
      question: 'In welcher Reihenfolge entlüftet man Heizkörper?',
      answer:
        'Von unten nach oben und mit dem Heizkörper, der am weitesten von der Heizung entfernt ist, beginnend. So wird die Luft in Richtung Anlage gedrückt und nicht im System verteilt.',
    },
    {
      question: 'Wie viel Wasser darf beim Entlüften austreten?',
      answer:
        'Nur wenige Tropfen bis etwa ein Glas pro Heizkörper. Läuft dauerhaft Wasser nach, ohne dass Luft entweicht, ist der Heizkörper voll – dann sofort zudrehen.',
    },
    {
      question: 'Welcher Druck ist in der Heizung richtig?',
      answer:
        'Bei einem Einfamilienhaus mit kaltem System meist 1,5 bis 2,0 bar. Der genaue Wert steht in der Anleitung der Heizungsanlage oder auf einem Aufkleber am Gerät.',
    },
    {
      question: 'Was tun, wenn der Heizkörper nach dem Entlüften immer noch kalt ist?',
      answer:
        'Prüfen Sie, ob der Thermostatkopf aufgedreht ist und ob der Ventilstift sich bewegen lässt. Bleibt der Heizkörper kalt, während andere warm werden, ist das Ventil verstopft oder die Pumpe falsch eingestellt – dann ist ein Fachbetrieb sinnvoll.',
    },
    {
      question: 'Es kommt weder Luft noch Wasser aus dem Ventil – was nun?',
      answer:
        'Dann ist die kleine Bohrung im Entlüftungsventil verstopft, meist durch Farbe oder Kalk. Eine Nadel hilft nur oberflächlich, weil der Kanal im Ventil gekrümmt ist. Sauberer ist der Tausch des Ventils – dafür muss die Anlage drucklos sein, deshalb ist das ein Fall für den Fachbetrieb.',
    },
    {
      question: 'Muss ich auch Heizkörper entlüften, die warm werden?',
      answer:
        'Ja, einmal pro Heizsaison alle Heizkörper. Luft verteilt sich im System und sammelt sich nicht nur dort, wo es gluckert. Wer nur den kalten Heizkörper entlüftet, lässt die übrigen Luftpolster drin.',
    },
  ],
  sources: [
    { label: 'Verbraucherzentrale: Heizkörper entlüften und Heizkosten senken' },
    { label: 'co2online: Richtig heizen und lüften – Heizungscheck' },
  ],
}
