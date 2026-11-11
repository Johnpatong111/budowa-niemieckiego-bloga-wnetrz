import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { articleUrl, categoryUrl, formatGermanDate, getArticle, getCategory, getRelatedArticles, ARTICLES } from '@/lib/articles'
import { legacyToContent, type ArticleContent, type Block } from '@/lib/content'
import { RICH_ARTICLES } from '@/content/rich'
import { FugenKostenRechner } from '@/components/fugen-kosten-rechner'
import { KalkCheck } from '@/components/kalk-check'
import { LueftungsCheck } from '@/components/lueftungs-check'
import { DimmerCheck } from '@/components/dimmer-check'
import { HeizkoerperCheck } from '@/components/heizkoerper-check'
import { SITE, SPONSORED_LINKS } from '@/lib/site'

const articles = {
  'vinylboden-fliesenoptik': {
    category: 'Interieur',
    title: 'Vinylboden in Fliesenoptik: Eine stilvolle Alternative zu klassischen Fliesen',
    date: '26. Oktober 2026',
    image: '/images/vinylboden-fliesenoptik.jpg',
    alt: 'Vinylboden in Fliesenoptik in einer hellen Küche mit Holzmöbeln',
    keyword: 'vinyl fliesenoptik',
    intro: 'Wer sich mit der Gestaltung eines neuen Zuhauses oder der Renovierung bestehender Räume beschäftigt, steht früher oder später vor der Frage, welcher Bodenbelag sowohl optisch als auch funktional den eigenen Erwartungen entspricht. Klassische Fliesen gelten seit vielen Jahren als beliebte Lösung, insbesondere in Küchen, Badezimmern und Eingangsbereichen. Mittlerweile gibt es jedoch Alternativen, die eine ähnliche Ästhetik bieten und gleichzeitig zusätzliche Vorteile mit sich bringen. Besonders interessant ist dabei <a href="https://topboden.de/vinylboden/vinylboden-fliesenoptik">Vinylboden in Fliesenoptik</a>, denn dieser Bodenbelag verbindet das elegante Erscheinungsbild keramischer Fliesen mit den angenehmen Eigenschaften moderner Vinylböden. Dadurch eröffnen sich zahlreiche Möglichkeiten für eine individuelle Raumgestaltung, ohne dass auf Komfort und Alltagstauglichkeit verzichtet werden muss.',
    sections: [
      { heading: 'Was zeichnet Vinylboden in Fliesenoptik aus?', paragraphs: ['Ein Vinylboden in Fliesenoptik ist ein moderner Bodenbelag, dessen Oberfläche das Aussehen klassischer Keramik- oder Natursteinfliesen nachbildet. Durch fortschrittliche Drucktechnologien und strukturierte Oberflächen entstehen authentische Designs, die sich auf den ersten Blick kaum von traditionellen Materialien unterscheiden lassen. Dabei stehen unterschiedliche Farben, Muster und Formate zur Verfügung, sodass sich sowohl moderne als auch klassische Wohnkonzepte verwirklichen lassen.', 'Besonders beliebt sind Ausführungen, die Beton, Schiefer, Marmor oder andere natürliche Steinarten imitieren. Während helle Designs Räume freundlich und großzügig wirken lassen, verleihen dunklere Varianten dem Wohnbereich eine elegante und charaktervolle Atmosphäre. Auch die Oberflächenstruktur spielt eine wichtige Rolle, da sie nicht nur das Erscheinungsbild beeinflusst, sondern ebenfalls das Gefühl beim Betreten des Bodens verändert.', 'Im Gegensatz zu keramischen Fliesen fühlt sich Vinyl in der Regel wärmer und etwas elastischer an, was insbesondere in Räumen von Vorteil ist, in denen sich Bewohner häufig aufhalten.'] },
      { heading: 'Warum ist Vinyl eine interessante Alternative zu klassischen Fliesen?', paragraphs: ['Bei der Entscheidung zwischen Vinyl und traditionellen Fliesen sollten nicht ausschließlich optische Eigenschaften berücksichtigt werden. Ebenso wichtig sind der tägliche Nutzungskomfort, die Pflege und die Anforderungen an die Verlegung.', 'Ein wesentlicher Vorteil von Vinylböden besteht darin, dass sie sich beim Gehen angenehmer anfühlen können als harte Keramikfliesen. Das Material gibt unter Belastung geringfügig nach und kann dadurch den Gehkomfort verbessern. Gleichzeitig entstehen beim Begehen häufig weniger laute Schrittgeräusche, wobei die tatsächliche Geräuschentwicklung vom Bodenaufbau und der verwendeten Unterlage abhängt.', 'Auch hinsichtlich der Reinigung bietet vinyl fliesenoptik praktische Eigenschaften. Die geschlossene Oberfläche lässt sich üblicherweise mit einem leicht feuchten Tuch oder Wischmopp reinigen, sodass alltägliche Verschmutzungen ohne großen Aufwand entfernt werden können. Da viele Vinylböden keine klassischen Fliesenfugen besitzen, entfallen außerdem einige der typischen Reinigungsprobleme, die bei keramischen Bodenbelägen auftreten können.', 'Ein weiterer Vorteil liegt in der vergleichsweise geringen Aufbauhöhe vieler Vinylprodukte, wodurch sich bestimmte Varianten besonders gut für Renovierungsarbeiten eignen.'] },
      { heading: 'In welchen Räumen eignet sich Vinylboden in Fliesenoptik?', paragraphs: ['Die Einsatzmöglichkeiten moderner Vinylböden sind vielfältig und beschränken sich längst nicht mehr auf einzelne Wohnbereiche. Besonders in Küchen erfreuen sich diese Bodenbeläge großer Beliebtheit, weil sie eine ansprechende Gestaltung mit unkomplizierter Reinigung verbinden. Kleine Verschmutzungen, die beim Kochen entstehen, lassen sich bei geeigneten Oberflächen schnell entfernen.', 'Auch im Wohnzimmer kann ein Boden in Fliesenoptik interessante gestalterische Akzente setzen. Insbesondere Designs mit Beton- oder Natursteincharakter passen hervorragend zu minimalistischen Möbeln, großen Fensterflächen und offenen Wohnkonzepten. Gleichzeitig entsteht durch die Materialeigenschaften ein wohnlicher Eindruck, der sich deutlich von der oftmals kühlen Wirkung keramischer Fliesen unterscheidet.', 'Für Badezimmer kommen ebenfalls bestimmte Vinylprodukte infrage, allerdings sollte unbedingt auf die ausdrückliche Eignung für Feuchträume sowie auf eine fachgerechte Verlegung geachtet werden. Nicht jeder Vinylboden ist für dauerhafte Feuchtigkeit oder stehendes Wasser geeignet. Mehr auf der Seite: <a href="https://topboden.de">topboden.de</a>.'] },
    ],
    related: 'natuerliche-materialien-fuer-mehr-ruhe',
  },
  'lichtplanung-ohne-geheimnisse': {
    category: 'Beleuchtung',
    title: 'Lichtplanung ohne Geheimnisse: So wird jeder Raum gemütlich',
    date: '12. Oktober 2026',
    image: '/images/lighting-detail.jpg',
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
    image: '/images/living-room.jpg',
    alt: 'Ruhiges Wohnzimmer mit natürlichen Materialien und sanften Farben',
    keyword: 'natürliche Materialien',
    intro: 'Holz, Leinen und Stein bringen als natürliche Materialien eine angenehme Ruhe in Räume. Nicht als Trend, sondern als zeitlose Basis für ein Zuhause mit Charakter.',
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
    image: '/images/heizkoerper-warm.jpg',
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
    image: '/images/led-flackert.jpg',
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
  'gartenbeleuchtung-solar': {
    category: 'Garten',
    title: 'Gartenbeleuchtung Solar: Lohnt sich das und worauf kommt es an?',
    date: '16. Oktober 2026',
    image: '/images/gartenbeleuchtung-solar.jpg',
    alt: 'Solarleuchten beleuchten einen Gartenweg und eine Terrasse bei Dämmerung',
    keyword: 'Gartenbeleuchtung Solar',
    intro: 'Gartenbeleuchtung Solar lohnt sich für Wege, Beete und Terrassen, wenn Sie keine Kabel verlegen wollen und mit sanftem Licht zufrieden sind. Für helle Dauerbeleuchtung im Winter reicht die Sonne in Mitteleuropa dagegen oft nicht.',
    sections: [
      { heading: 'Für wen sich Gartenbeleuchtung Solar lohnt', paragraphs: ['Solarleuchten sparen Stromkosten, brauchen keine Steckdose und sind in wenigen Minuten aufgestellt. Gerade für Mietgärten oder entlegene Ecken ist Gartenbeleuchtung Solar ideal. Für Eingang, Treppen oder Sicherheitslicht sollten Sie aber besser auf eine Netzlösung setzen, denn dort muss das Licht jeden Abend zuverlässig brennen.'] },
      { heading: 'Worauf Sie beim Kauf achten sollten', paragraphs: ['Achten Sie auf eine effiziente monokristalline Solarzelle, besonders wenn der Himmel häufig bewölkt ist. Ein guter Akku aus Lithium-Ionen- oder NiMH-Technik sollte sich austauschen lassen. Ein fest verbauter Akku bedeutet nach zwei bis vier Jahren oft, dass die ganze Leuchte ersetzt werden muss.', 'Auch die Schutzart ist wichtig: Mindestens IP44, besser IP65, schützt die Leuchte vor Regen und Staub. Für stimmungsvolle Akzente reichen 10 bis 50 Lumen pro Leuchte. Wegeleuchten dürfen 50 bis 100 Lumen haben, Strahler für Bäume oder Fassaden 200 Lumen und mehr.'] },
      { heading: 'Der richtige Standort entscheidet', paragraphs: ['Eine Solarleuchte braucht mindestens sechs bis acht Stunden direktes Licht. Stellen Sie sie nicht unter Büsche oder Dachvorsprünge und richten Sie das Panel möglichst nach Süden aus. Wischen Sie die Solarzelle regelmäßig ab, denn Staub und Laub kosten spürbar Leistung.', 'Warmweißes Licht um 2700 Kelvin wirkt im Garten besonders angenehm. Mehr zur Lichtfarbe lesen Sie in unserem Beitrag <a href="/artikel/lichtplanung-ohne-geheimnisse">Lichtplanung ohne Geheimnisse</a>.'] },
      { heading: 'Gartenbeleuchtung Solar im Winter', paragraphs: ['Von November bis Februar liefern Solarleuchten in Deutschland, Österreich und der Schweiz deutlich weniger Licht. Modelle mit Bewegungssensor halten länger durch, weil sie nur bei Bedarf leuchten. Empfindliche Leuchten mit Lithium-Ionen-Akku nehmen Sie im Winter besser ins Haus.'] },
      { heading: 'Was kostet Solar-Gartenlicht wirklich?', paragraphs: ['Einfache Leuchten gibt es ab fünf Euro, hochwertige Modelle kosten meist 20 bis 40 Euro pro Stück. Da keine Stromkosten anfallen, rechnet sich Gartenbeleuchtung Solar schnell, sofern der Akku austauschbar ist. Billigmodelle müssen dagegen häufig ersetzt werden.', 'Flackert die Lampe oder leuchtet sie nur schwach, ist meist der Akku leer, die Zelle verschmutzt oder der Standort zu schattig. Bei Problemen hilft unser Ratgeber <a href="/artikel/led-flackert-ursachen-loesungen">LED flackert: 7 Ursachen und Lösungen</a>.'] },
      { heading: 'Fazit', paragraphs: ['Gartenbeleuchtung Solar ist eine unkomplizierte und günstige Lösung für Stimmungslicht. Achten Sie auf Akku, Schutzart und Standort, und planen Sie für den Winter eine Alternative ein.'] },
    ],
    related: 'led-flackert-ursachen-loesungen',
  },
  'schimmel-selbst-entfernen': {
    category: 'Zuhause',
    title: 'Schimmel entfernen: In 6 Schritten sicher selbst vorgehen',
    date: '16. Oktober 2026',
    image: '/images/schimmel-entfernen.jpg',
    alt: 'Kleine Schimmelstelle an einer Badezimmerwand wird mit einem Tuch gereinigt',
    keyword: 'Schimmel entfernen',
    intro: 'Schimmel entfernen können Sie bei kleinen, oberflächlichen Stellen oft selbst. Entscheidend sind der richtige Schutz, eine feuchte Reinigung und vor allem das Beseitigen der Ursache.',
    sections: [
      { heading: 'Wann Sie Schimmel selbst entfernen können', paragraphs: ['Das Umweltbundesamt empfiehlt, bei Flächen bis etwa einen halben Quadratmeter selbst Hand anzulegen. Ist der Befall größer, sitzt er hinter Tapete oder Putz oder leiden Bewohner an Atembeschwerden, gehört Schimmel entfernen in die Hände eines Fachbetriebs.'] },
      { heading: 'Schritt 1: Schützen Sie sich und den Raum', paragraphs: ['Tragen Sie eine FFP2-Maske, Einmalhandschuhe und eine Schutzbrille. Schließen Sie die Zimmertür, decken Sie Möbel ab und lüften Sie den Raum vorher kurz, aber nicht während der Arbeit. So verteilen sich die Sporen nicht in der ganzen Wohnung.'] },
      { heading: 'Schritt 2: Befallene Stelle nicht trocken abwischen', paragraphs: ['Trockenes Rubbeln wirbelt Sporen auf. Feuchten Sie die Stelle deshalb zuerst leicht mit einem Tuch an. Tapeten mit Schimmel entfernen Sie am besten komplett und entsorgen sie direkt in einem verschlossenen Müllbeutel.'] },
      { heading: 'Schritt 3: Mit Alkohol reinigen', paragraphs: ['Bewährt hat sich Ethanol oder Isopropanol mit 70 bis 80 Prozent. Tränken Sie ein Tuch, wischen Sie die Stelle von außen nach innen ab und lassen Sie den Alkohol kurz einwirken. Chlorreiniger belasten die Raumluft und bringen auf Putz und Tapete kaum Vorteile. Auch Essig ist hier keine verlässliche Lösung.'] },
      { heading: 'Schritt 4 und 5: Trocknen lassen und Ursache beseitigen', paragraphs: ['Lassen Sie die Fläche gründlich trocknen. Bei sichtbaren Flecken auf Silikon- oder Fugenmasse hilft meist nur Austausch, denn Schimmel wurzelt tief im Material. Entsorgen Sie benutzte Tücher sofort.', 'Dieser Schritt entscheidet, ob Schimmel entfernen dauerhaft klappt. Ideal sind 40 bis 60 Prozent Luftfeuchtigkeit. Lüften Sie mehrmals täglich fünf bis zehn Minuten stoßweise und rücken Sie Schränke rund fünf Zentimeter von kalten Wänden ab.'] },
      { heading: 'Schritt 6: Kontrollieren und vorbeugen', paragraphs: ['Prüfen Sie die Stelle nach zwei Wochen erneut. Zeigen sich wieder Flecken, steckt vermutlich ein Bauschaden dahinter, etwa eine Wärmebrücke oder ein Leck. Dann ist ein Gutachter gefragt. Tipps gegen Zugluft finden Sie außerdem in unserem Beitrag <a href="/artikel/fenster-einstellen-winter">Fenster einstellen für den Winter</a>.'] },
      { heading: 'Häufige Fragen zum Schimmel entfernen', paragraphs: ['Ist Schimmel gesundheitsschädlich? Ja, er kann Allergien und Atemwegsreizungen auslösen. Hilft Essig als Hausmittel? Nur eingeschränkt; Alkohol ist für kleine, oberflächliche Stellen zuverlässiger. Bei größeren Schäden oder gesundheitlichen Beschwerden sollten Sie nicht selbst reinigen.'] },
    ],
    related: 'fenster-einstellen-winter',
  },
  'fenster-einstellen-winter': {
    category: 'Zuhause',
    title: 'Fenster einstellen für den Winter: Dichtung und Beschläge in 5 Schritten justieren',
    date: '15. Oktober 2026',
    image: '/images/fenster-winter.jpg',
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
  'kleine-wohnung-einrichten': { category: 'Interieur', title: 'Kleine Wohnung einrichten: 10 Tipps für mehr Platz und Licht', date: '16. Oktober 2026', image: '/images/living-room.jpg', alt: 'Helles, platzsparend eingerichtetes Wohnzimmer', keyword: 'kleine Wohnung einrichten', intro: 'Mit klugen Möbeln, hellen Farben und mehreren Lichtquellen wirkt auch eine kleine Wohnung großzügig und gemütlich.', sections: [{ heading: 'Helle Farben und Möbel mit Doppelfunktion', paragraphs: ['Helle Wände reflektieren Licht und lassen Räume größer wirken. Ein Bett mit Stauraum, ein Schlafsofa oder ein ausziehbarer Tisch spart zusätzlich Fläche.', 'Wer eine kleine Wohnung einrichten möchte, sollte jedes Möbelstück auf mehrere Aufgaben prüfen.'] }, { heading: 'Nach oben denken und Boden sichtbar lassen', paragraphs: ['Hohe Regale, Hängeschränke und Wandhaken nutzen die Raumhöhe. Möbel auf Beinen lassen den Boden durchscheinen und geben dem Raum Luft.', 'Ein großer Spiegel gegenüber dem Fenster verstärkt das Tageslicht.'] }, { heading: 'Lichtinseln und klare Zonen', paragraphs: ['Kombinieren Sie Grundlicht, Leselampe und indirekte Akzente. Teppiche, Regale und unterschiedliche Lichtinseln trennen Wohn-, Schlaf- und Arbeitsbereiche ohne neue Wände.', 'Mit wenig, aber bewusst gewähltem Stauraum bleibt das Zuhause ruhig und aufgeräumt.'] }, { heading: 'Fazit', paragraphs: ['Helle Farben, multifunktionale Möbel, Spiegel und eine durchdachte Lichtplanung machen kleine Wohnungen spürbar wohnlicher.'] }], related: 'lichtplanung-ohne-geheimnisse' },
  'rasen-vertikutieren': { category: 'Garten', title: 'Rasen vertikutieren: Der beste Zeitpunkt und die richtige Methode', date: '17. Oktober 2026', image: '/images/hero-interior.jpg', alt: 'Gepflegter grüner Rasen im Garten', keyword: 'Rasen vertikutieren', intro: 'Moos und Rasenfilz ersticken die Grasnarbe. Mit dem richtigen Zeitpunkt und wenigen Schritten wird der Rasen wieder dicht und kräftig.', sections: [{ heading: 'Der richtige Zeitpunkt', paragraphs: ['Im Frühjahr ist der Rasen bereit, wenn der Boden über zehn Grad warm ist und Sie zwei- bis dreimal gemäht haben. Im Herbst eignet sich der September, solange das Gras noch wächst.', 'Mähen Sie zwei bis drei Tage vorher auf zwei bis drei Zentimeter und arbeiten Sie nur auf leicht feuchtem, nicht nassem Boden.'] }, { heading: 'So vertikutieren Sie richtig', paragraphs: ['Stellen Sie die Messer zunächst nur zwei bis drei Millimeter tief ein. Fahren Sie die Fläche längs und anschließend quer ab, ohne enge Kurven. Rechen Sie das Material sofort zusammen.', 'Direkt danach können Sie kahle Stellen nachsäen, düngen und in den nächsten zwei Wochen regelmäßig wässern.'] }, { heading: 'Häufige Fehler vermeiden', paragraphs: ['Zu tiefes Vertikutieren, Hitze und ein nasser Boden schaden dem Rasen. In der Regel reicht eine Behandlung pro Jahr.'] }, { heading: 'Fazit', paragraphs: ['Mit gutem Timing, passender Arbeitstiefe und Nachsaat lohnt sich das Vertikutieren.'] }], related: 'garten-winterfest-machen' },
  'heizkoerper-entlueften': { category: 'Ratgeber', title: 'Heizkörper entlüften: Anleitung in 5 Schritten', date: '18. Oktober 2026', image: '/images/heizkoerper-warm.jpg', alt: 'Heizkörper wird mit einem Entlüftungsschlüssel gewartet', keyword: 'Heizkörper entlüften', intro: 'Gluckert der Heizkörper oder bleibt er oben kalt, steckt häufig Luft im System. So entlüften Sie ihn sicher selbst.', sections: [{ heading: 'Das brauchen Sie', paragraphs: ['Ein Entlüftungsschlüssel, einen Lappen und ein kleines Gefäß reichen aus. Entlüften Sie bei kaltem oder lauwarmem Heizkörper, nicht während des heißen Betriebs.'] }, { heading: 'In fünf Schritten entlüften', paragraphs: ['Drehen Sie die Thermostate auf und schalten Sie die Pumpe, falls möglich, kurz aus. Beginnen Sie im untersten Stockwerk und öffnen Sie das Ventil langsam eine Vierteldrehung.', 'Sobald das Zischen endet und Wasser austritt, schließen Sie das Ventil. Kontrollieren Sie anschließend den Anlagendruck nach Herstellerangabe.'] }, { heading: 'Wann ein Fachbetrieb nötig ist', paragraphs: ['Müssen Sie ständig entlüften oder fällt der Druck wiederholt ab, können ein Leck oder ein anderes Problem vorliegen. Dann sollte ein Heizungsbauer die Anlage prüfen.'] }, { heading: 'Fazit', paragraphs: ['Regelmäßiges Entlüften verbessert die Wärmeverteilung und kann Heizenergie sparen.'] }], related: 'heizkoerper-wird-nicht-warm' },
  'wandfarbe-auswaehlen': { category: 'Interieur', title: 'Wandfarbe auswählen: Welche Farbe passt zu welchem Raum?', date: '19. Oktober 2026', image: '/images/living-room.jpg', alt: 'Ruhiger Wohnraum mit harmonischer Wandfarbe', keyword: 'Wandfarbe auswählen', intro: 'Himmelsrichtung, Raumgröße und Nutzung entscheiden darüber, welche Wandfarbe wirklich passt.', sections: [{ heading: 'Licht und Himmelsrichtung beachten', paragraphs: ['Nordzimmer profitieren von warmen Creme-, Sand- und Apricottönen. Südzimmer vertragen kühle Farben wie Hellblau oder Salbeigrün.', 'Helle Töne vergrößern Räume optisch, dunkle Farben schaffen in großen Zimmern mehr Tiefe.'] }, { heading: 'Die passende Farbe für jeden Raum', paragraphs: ['Im Wohnzimmer wirken Greige, Beige und gedecktes Grün ruhig. Im Schlafzimmer eignen sich sanfte Blau-, Grün- und Erdtöne. Für Küche und Bad sind helle, abwaschbare Farben praktisch.', 'Streichen Sie vor dem Kauf eine Probefläche und beobachten Sie sie morgens, mittags und abends.'] }, { heading: 'Fazit', paragraphs: ['Wer Licht, Größe und Nutzung berücksichtigt, findet leichter eine Farbe, die langfristig gefällt.'] }], related: 'kleine-wohnung-einrichten' },
  'lichtplanung-wohnzimmer': { category: 'Beleuchtung', title: 'Lichtplanung Wohnzimmer: Wie viele Lumen und welche Lichtfarbe?', date: '20. Oktober 2026', image: '/images/lighting-detail.jpg', alt: 'Warm beleuchtetes Wohnzimmer mit mehreren Lichtquellen', keyword: 'Lichtplanung Wohnzimmer', intro: 'Gute Lichtplanung im Wohnzimmer verteilt etwa 100 bis 150 Lumen pro Quadratmeter auf mehrere, stimmige Lichtquellen.', sections: [{ heading: 'Wie viele Lumen braucht ein Wohnzimmer?', paragraphs: ['Ein 25 Quadratmeter großes Wohnzimmer benötigt ungefähr 2.500 bis 3.750 Lumen. Verteilen Sie diese Helligkeit auf mehrere Leuchten statt auf eine einzelne Deckenlampe.'] }, { heading: 'Die drei Lichtebenen', paragraphs: ['Grundlicht sorgt für Orientierung, Funktionslicht beleuchtet Sofa oder Lesesessel und Akzentlicht hebt Bilder, Regale oder Pflanzen hervor.', 'Warmweiß zwischen 2.700 und 3.000 Kelvin wirkt besonders wohnlich. Ein Farbwiedergabeindex von mindestens Ra 90 lässt Materialien natürlich erscheinen.'] }, { heading: 'Fazit', paragraphs: ['Mehrere dimmbare Lichtquellen in Warmweiß schaffen ein flexibles Wohnzimmer für jede Tageszeit.'] }], related: 'lichtplanung-ohne-geheimnisse' },
  'abfluss-reinigen-ohne-chemie': { category: 'Zuhause', title: 'Abfluss reinigen ohne Chemie: 5 Hausmittel im Vergleich', date: '21. Oktober 2026', image: '/images/hero-interior.jpg', alt: 'Sauberer Küchenbereich mit Waschbecken', keyword: 'Abfluss reinigen', intro: 'Leichte Verstopfungen lassen sich oft ohne aggressive Rohrreiniger lösen. Diese fünf Methoden helfen bei Haaren, Fett und Seifenresten.', sections: [{ heading: 'Warum Abflüsse verstopfen', paragraphs: ['Haare, Seifenreste, Fett und Kalk sammeln sich im Siphon. Ein Haarsieb und regelmäßiges Spülen mit heißem Wasser beugen vor.'] }, { heading: 'Fünf Methoden im Vergleich', paragraphs: ['Die Saugglocke ist bei frischen Verstopfungen besonders wirksam. Heißes Wasser mit Spülmittel hilft gegen Fett, Natron mit Essig oder Salz gegen leichte Beläge und Gerüche.', 'Bei hartnäckigem Schmutz schrauben Sie den Siphon über einem Eimer ab und reinigen ihn von Hand.'] }, { heading: 'Sicherheit und Grenzen', paragraphs: ['Mischen Sie Hausmittel niemals mit chemischem Rohrreiniger. Bleibt das Wasser trotz Reinigung stehen, liegt die Verstopfung vermutlich tiefer und ein Fachbetrieb sollte helfen.'] }], related: 'schimmel-selbst-entfernen' },
  'garten-winterfest-machen': { category: 'Garten', title: 'Garten winterfest machen: Checkliste für Oktober und November', date: '22. Oktober 2026', image: '/images/gartenbeleuchtung-solar.jpg', alt: 'Garten im Herbst mit geschützten Pflanzen', keyword: 'Garten winterfest machen', intro: 'Mit einer klaren Checkliste schützen Sie Pflanzen, Leitungen und Gartengeräte vor Frost und starten im Frühjahr entspannter.', sections: [{ heading: 'Rasen und Beete vorbereiten', paragraphs: ['Mähen Sie den Rasen ein letztes Mal auf vier bis fünf Zentimeter und entfernen Sie Laub. Ein kaliumbetonter Herbstdünger macht die Halme frosthärter.', 'Mulch aus Laub, Rinde oder Kompost schützt Beete. Einige Samenstände dürfen für Vögel und Insekten stehen bleiben.'] }, { heading: 'Kübelpflanzen und Wasserleitungen schützen', paragraphs: ['Empfindliche Pflanzen kommen vor dem ersten Frost ins Haus. Winterharte Kübel stellen Sie geschützt auf Holz oder Styropor.', 'Sperren Sie den Außenwasserhahn ab, entleeren Sie Schläuche und lagern Sie Pumpen sowie Geräte trocken und frostfrei.'] }, { heading: 'Fazit', paragraphs: ['Wer früh beginnt, verteilt die Arbeit und verhindert typische Winterschäden.'] }], related: 'rasen-vertikutieren' },
  'richtig-lueften-im-winter': { category: 'Zuhause', title: 'Richtig lüften im Winter: Wie oft und wie lange?', date: '23. Oktober 2026', image: '/images/fenster-winter.jpg', alt: 'Geöffnetes Fenster im hellen Winterraum', keyword: 'Richtig lüften', intro: 'Stoßlüften tauscht feuchte Raumluft gegen trockene Außenluft, ohne dass die Wände auskühlen.', sections: [{ heading: 'Wie oft und wie lange?', paragraphs: ['Lüften Sie drei- bis viermal täglich fünf bis zehn Minuten. Je kälter es draußen ist, desto kürzer genügt der Luftaustausch. Nach Duschen, Kochen und Wäschetrocknen lüften Sie sofort.'] }, { heading: 'Stoßlüften statt Kippfenster', paragraphs: ['Öffnen Sie die Fenster weit und drehen Sie die Heizkörper kurz herunter. Querlüften mit gegenüberliegenden Fenstern dauert oft nur drei bis fünf Minuten.', 'Eine Luftfeuchtigkeit von 40 bis 60 Prozent gilt als guter Bereich. Ein Hygrometer hilft bei der Kontrolle.'] }, { heading: 'Fazit', paragraphs: ['Kurz, kräftig und regelmäßig zu lüften spart Energie und schützt die Wohnung vor Feuchtigkeit.'] }], related: 'schimmel-selbst-entfernen' },
  'dimmbare-led-auswaehlen': { category: 'Beleuchtung', title: 'Dimmbare LED richtig auswählen: Worauf Sie beim Kauf achten sollten', date: '24. Oktober 2026', image: '/images/led-flackert.jpg', alt: 'Dimmbare LED-Leuchte in warmem Wohnlicht', keyword: 'Dimmbare LED', intro: 'Kennzeichnung, Dimmertyp und Lastbereich entscheiden darüber, ob eine LED ruhig und zuverlässig dimmt.', sections: [{ heading: 'Woran Sie eine dimmbare LED erkennen', paragraphs: ['Achten Sie auf das Dimmsymbol oder den Hinweis „dimmbar“. Nicht dimmbare Leuchtmittel können flackern, brummen oder Schaden nehmen.'] }, { heading: 'Dimmer und Mindestlast prüfen', paragraphs: ['Moderne LED-Dimmer oder passende Phasenabschnitt-Dimmer sind meist die richtige Wahl. Die Gesamtleistung muss zwischen Mindest- und Maximallast des Dimmers liegen.', 'Kompatibilitätslisten des Herstellers verhindern unnötige Fehlersuche. Smarte Leuchtmittel können alternativ per App gedimmt werden.'] }, { heading: 'Fazit', paragraphs: ['Mit passendem Dimmer, ausreichender Last und guter Farbwiedergabe gelingt gemütliches, flackerfreies Licht.'] }], related: 'led-flackert-ursachen-loesungen' },
  'fugen-erneuern': { category: 'Zuhause', title: 'Fugen erneuern: So werden Bad und Küche wieder sauber', date: '25. Oktober 2026', image: '/images/schimmel-entfernen.jpg', alt: 'Frisch erneuerte Fugen im Bad', keyword: 'Fugen erneuern', intro: 'Poröse, verfärbte oder schimmelige Fugen lassen sich mit der richtigen Vorbereitung sauber erneuern.', sections: [{ heading: 'Alte Fugen vollständig entfernen', paragraphs: ['Schneiden Sie alte Silikonfugen vorsichtig mit einem Fugenmesser heraus und entfernen Sie Rückstände. Bei Zementfugen hilft ein passender Fugenkratzer.', 'Der Untergrund muss trocken, sauber und fettfrei sein. Schimmelreste dürfen nicht einfach überarbeitet werden.'] }, { heading: 'Neue Fugen ziehen', paragraphs: ['Kleben Sie die Ränder sauber ab, tragen Sie Sanitärsilikon gleichmäßig auf und glätten Sie es mit einem geeigneten Glättmittel. Entfernen Sie das Band, bevor die Oberfläche anzieht.', 'Lassen Sie die Fuge vollständig aushärten und vermeiden Sie in dieser Zeit Wasser.'] }, { heading: 'Wann Profis helfen', paragraphs: ['Bei dauerhafter Feuchtigkeit, bewegten Bauteilen oder wiederkehrendem Schimmel sollte die Ursache zuerst ein Fachbetrieb prüfen.'] }], related: 'schimmel-selbst-entfernen' },
  'led-beleuchtungssysteme': {
    category: 'Beleuchtung',
    title: 'LED-Beleuchtungssysteme – warum sind sie so beliebt?',
    date: '28. Oktober 2026',
    image: '/images/LED-Beleuchtungssysteme.jpg',
    alt: 'LED-Beleuchtungssysteme mit LED-Leuchtmittel und weißem Schalter auf einem Holztisch',
    keyword: 'LED-Beleuchtungssysteme',
    intro: 'LED-Beleuchtungssysteme gewinnen in vielen Bereichen zunehmend an Bedeutung und ersetzen immer häufiger herkömmliche Beleuchtungslösungen. Sowohl in gewerblichen Gebäuden als auch in öffentlichen Einrichtungen und privaten Räumen wächst das Interesse an moderner Lichttechnik. Dabei spielen nicht nur wirtschaftliche Aspekte eine Rolle, sondern auch die Möglichkeit, Beleuchtung flexibel an unterschiedliche Anforderungen anzupassen. Gleichzeitig entwickeln sich die technischen Lösungen kontinuierlich weiter und eröffnen neue Möglichkeiten für die Planung und Steuerung von Licht. Doch welche Eigenschaften machen LED-Beleuchtungssysteme so attraktiv und warum entscheiden sich immer mehr Anwender für diese Technologie? Diesen Fragen gehen wir im folgenden Artikel nach.',
    sections: [
      { heading: 'LED-Beleuchtungssysteme – was zeichnet sie aus?', paragraphs: ['LED-Beleuchtungssysteme zeichnen sich durch ihre kompakte Bauweise, hohe Schaltfestigkeit und präzise Lichtsteuerung aus. Im Gegensatz zu vielen herkömmlichen Leuchtmitteln erreichen LEDs unmittelbar nach dem Einschalten ihre volle Helligkeit und lassen sich problemlos mit Dimmern kombinieren. Je nach Ausführung ermöglichen sie unterschiedliche Lichtfarben, wodurch sich die Atmosphäre eines Raumes gezielt beeinflussen lässt. Ein weiterer Vorteil ist die geringe Wärmeentwicklung im Vergleich zu klassischen Glühlampen. Moderne LED-Systeme können zudem mit Sensoren, Zeitschaltungen oder zentralen Steuerungseinheiten verbunden werden. Dadurch lassen sich Beleuchtungsszenarien programmieren und einzelne Lichtquellen unabhängig voneinander steuern. Die modulare Bauweise vieler Lösungen erleichtert außerdem spätere Anpassungen an veränderte Anforderungen.'] },
      { heading: 'LED-Beleuchtungssysteme – warum erfreuen sie sich so großer Beliebtheit?', paragraphs: ['Die große Beliebtheit von LED-Beleuchtungssystemen hängt auch mit ihrer vielseitigen Einsetzbarkeit und der einfachen Integration in moderne Gebäudekonzepte zusammen. Sie sind in zahlreichen Formen, Größen und Ausführungen erhältlich, sodass sich passende Lösungen für unterschiedliche architektonische Stile finden lassen. Darüber hinaus ermöglichen intelligente Steuerungssysteme eine individuelle Anpassung der Beleuchtung an Tagesabläufe und persönliche Vorlieben. Auch die Möglichkeit, Licht gezielt für verschiedene Tätigkeiten einzusetzen, macht diese Technik attraktiv. In Büros kann beispielsweise eine sachliche Arbeitsatmosphäre geschaffen werden, während in öffentlichen Einrichtungen eine bedarfsgerechte Beleuchtung zur Orientierung beiträgt. Die Kombination aus technischer Flexibilität, vielfältigem Design und einfacher Bedienung erklärt, weshalb sich immer mehr Nutzer für LED-Beleuchtung entscheiden.'] },
      { heading: 'LED-Beleuchtungssysteme – eine ökologische Lösung?', paragraphs: ['LED-Systeme können einen Beitrag zu einem verantwortungsvolleren Umgang mit natürlichen Ressourcen leisten. Durch den geringeren Strombedarf lässt sich der CO₂-Ausstoß reduzieren, sofern die elektrische Energie aus entsprechenden Quellen stammt. Auch die lange Nutzungsdauer vieler LED-Komponenten ist aus ökologischer Sicht relevant, da weniger häufig neue Produkte hergestellt und alte entsorgt werden müssen. Bei der Auswahl lohnt es sich zudem, auf die Reparierbarkeit der Bauteile und die Möglichkeit zu achten, einzelne Komponenten auszutauschen, statt die gesamte Leuchte zu ersetzen. Nach dem Ende ihrer Nutzungsdauer sollten LED-Produkte fachgerecht entsorgt werden, damit enthaltene Materialien möglichst effizient zurückgewonnen werden können. So lässt sich die Umweltbelastung über den gesamten Lebenszyklus hinweg begrenzen.'] },
    ],
    related: 'lichtplanung-ohne-geheimnisse',
  },
} as const

type ArticleSlug = keyof typeof articles

function getFaq(keyword: string) {
  return [
    { question: `Was ist bei ${keyword} besonders wichtig?`, answer: `${keyword} gelingt am zuverlässigsten, wenn Sie zuerst die Ursache prüfen, die passenden Materialien wählen und die einzelnen Schritte in der richtigen Reihenfolge durchführen.` },
    { question: `Wie oft sollte man sich mit ${keyword} beschäftigen?`, answer: `Kontrollieren Sie ${keyword} regelmäßig und reagieren Sie früh auf Veränderungen. So vermeiden Sie Folgeschäden und unnötige Kosten.` },
    { question: `Wann ist professionelle Hilfe sinnvoll?`, answer: `Wenn die empfohlenen Schritte bei ${keyword} nicht helfen, Risiken bestehen oder die Ursache unklar bleibt, sollte eine qualifizierte Fachperson den Fall prüfen.` },
  ]
}

function renderParagraph(paragraph: string, sponsored = false) {
  const parts = paragraph.split(/(<a href="[^"]+"(?: rel="[^"]+")?>[^<]+<\/a>)/g)
  return parts.map((part, index) => {
    const link = part.match(/^<a href="([^"]+)"(?: rel="([^"]+)")?>([^<]+)<\/a>$/)
    if (!link) return <span key={index}>{part}</span>
    const isExternal = /^https?:\/\//.test(link[1])
    const relParts: Array<string | null | undefined> = [link[2]]
    if (isExternal) {
      relParts.push('noopener')
      // Linkhouse-Vorgabe: bezahlte Links dofollow – siehe SPONSORED_LINKS in lib/site.ts
      if (!sponsored || !SPONSORED_LINKS.dofollow) relParts.push('nofollow')
    }
    const rel = relParts.filter(Boolean).join(' ') || undefined
    return (
      <Link
        key={index}
        href={link[1]}
        rel={rel}
        target={isExternal ? '_blank' : undefined}
        className="font-medium text-[#ad613d] underline decoration-[#ad613d]/40 underline-offset-4 hover:decoration-[#ad613d]"
      >
        {link[3]}
      </Link>
    )
  })
}

function blockText(block: Block): string {
  switch (block.type) {
    case 'p':
    case 'h3':
      return block.text
    case 'ul':
    case 'ol':
      return block.items.join(' ')
    case 'steps':
      return block.items.map((item) => `${item.title} ${item.text}`).join(' ')
    case 'table':
      return [block.head.join(' '), ...block.rows.map((row) => row.join(' '))].join(' ')
    case 'note':
      return [block.title ?? '', block.text].join(' ')
  }
}

function contentText(content: ArticleContent): string {
  return [
    content.intro,
    ...content.sections.flatMap((section) => [section.heading, ...section.blocks.map(blockText)]),
  ].join(' ')
}

function renderBlocks(blocks: Block[], sponsored = false) {
  const renderInline = (text: string) => renderParagraph(text, sponsored)
  return blocks.map((block, index) => {
    switch (block.type) {
      case 'p':
        return <p key={index}>{renderInline(block.text)}</p>
      case 'h3':
        return (
          <h3 key={index} className="pt-2 font-serif text-2xl leading-tight text-[#292a24]">
            {block.text}
          </h3>
        )
      case 'ul':
        return (
          <ul key={index} className="list-disc space-y-2 pl-6">
            {block.items.map((item) => (
              <li key={item}>{renderInline(item)}</li>
            ))}
          </ul>
        )
      case 'ol':
        return (
          <ol key={index} className="list-decimal space-y-2 pl-6">
            {block.items.map((item) => (
              <li key={item}>{renderInline(item)}</li>
            ))}
          </ol>
        )
      case 'steps':
        return (
          <ol key={index} className="grid gap-5">
            {block.items.map((item) => (
              <li key={item.title} className="border-l-2 border-[#ad613d]/40 pl-5">
                <p className="font-semibold text-[#292a24]">{item.title}</p>
                <p className="mt-1 text-base leading-7">{renderInline(item.text)}</p>
              </li>
            ))}
          </ol>
        )
      case 'table':
        return (
          <figure key={index} className="my-2 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr>
                  {block.head.map((cell) => (
                    <th
                      key={cell}
                      scope="col"
                      className="border-b border-[#292a24]/25 pb-3 pr-4 align-bottom text-[10px] font-semibold uppercase tracking-[0.12em] text-[#292a24]/70"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row.join('|')}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border-b border-[#292a24]/10 py-3 pr-4 align-top leading-6">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {block.caption && (
              <figcaption className="mt-2 text-xs uppercase tracking-[0.12em] text-[#292a24]/50">
                {block.caption}
              </figcaption>
            )}
          </figure>
        )
      case 'note':
        return (
          <aside key={index} className="border border-[#292a24]/15 bg-[#eee8df] p-5">
            {block.title && (
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ad613d]">{block.title}</p>
            )}
            <p className="mt-2 text-base leading-7">{renderInline(block.text)}</p>
          </aside>
        )
    }
  })
}

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles[slug as ArticleSlug]
  const meta = getArticle(slug)

  if (!article || !meta) {
    return { title: 'Artikel nicht gefunden', robots: { index: false, follow: true } }
  }

  return {
    title: meta.title,
    description: meta.description,
    keywords: [meta.keyword, meta.category, 'raumgefühl'],
    alternates: { canonical: `/artikel/${meta.slug}` },
    openGraph: {
      type: 'article' as const,
      url: `/artikel/${meta.slug}`,
      title: meta.title,
      description: meta.description,
      publishedTime: meta.publishAt,
      modifiedTime: meta.updatedAt ?? meta.publishAt,
      section: meta.category,
      images: [{ url: meta.image, alt: meta.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: meta.title,
      description: meta.description,
      images: [meta.image],
    },
    robots: { index: true, follow: true },
  }
}


export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles[slug as ArticleSlug]
  const meta = getArticle(slug)

  if (!meta) notFound()

  const category = getCategory(meta.categorySlug)
  const related = getRelatedArticles(meta.slug)
  const content =
    RICH_ARTICLES[meta.slug] ?? (article ? legacyToContent(article, getFaq(meta.keyword)) : undefined)

  if (!content) notFound()
  const faq = content.faq
  const wordCount = contentText(content).split(/\s+/).length
  const readingMinutes = Math.max(2, Math.round(wordCount / 180))
  const dateModified = content.updatedAt ?? meta.updatedAt ?? meta.publishAt

  const tool =
    meta.categorySlug === 'beleuchtung'
      ? { href: '/ratgeber/lumen-rechner', label: 'Lumen Rechner: Lichtmenge für Ihren Raum berechnen' }
      : meta.categorySlug === 'interieur'
        ? { href: '/ratgeber/farbmengen-rechner', label: 'Farbmengen Rechner: Farbbedarf für Wände berechnen' }
        : { href: '/ratgeber', label: 'Alle Rechner und Ratgeber im Überblick' }

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: SITE.url },
        { '@type': 'ListItem', position: 2, name: category?.name ?? meta.category, item: categoryUrl(meta.categorySlug) },
        { '@type': 'ListItem', position: 3, name: meta.title, item: articleUrl(meta.slug) },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${articleUrl(meta.slug)}#article`,
      headline: meta.title,
      description: meta.description,
      image: [new URL(meta.image, SITE.url).toString()],
      datePublished: meta.publishAt,
      dateModified,
      inLanguage: 'de-DE',
      articleSection: meta.category,
      keywords: [meta.keyword, meta.category].join(', '),
      isAccessibleForFree: true,
      author: {
        '@type': 'Organization',
        name: 'raumgefühl Redaktion',
        url: `${SITE.url}/ueber-uns`,
      },
      publisher: {
        '@type': 'Organization',
        '@id': `${SITE.url}/#organization`,
        name: SITE.name,
        logo: { '@type': 'ImageObject', url: `${SITE.url}/icon.svg` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl(meta.slug) },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ]

  return (
    <main className="min-h-screen bg-[#f5f1eb] text-[#292a24]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="mx-auto flex max-w-[1180px] items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <Link href="/" className="font-serif text-2xl tracking-[-0.05em] sm:text-3xl" aria-label="raumgefühl Startseite">
          raum<span className="text-[#ad613d]">.</span>gefühl
        </Link>
        <Link href="/artikel" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] hover:text-[#ad613d]">
          <ArrowLeft size={15} /> Alle Artikel
        </Link>
      </header>

      <article className="mx-auto max-w-[1180px] px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <nav aria-label="Breadcrumb" className="mb-10 text-xs uppercase tracking-[0.15em] text-[#292a24]/55">
          <Link href="/" className="hover:text-[#ad613d]">Startseite</Link>
          <span className="mx-2">/</span>
          <Link href={`/kategorie/${meta.categorySlug}`} className="hover:text-[#ad613d]">{category?.name ?? meta.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-[#292a24]/70">{meta.title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Link href={`/kategorie/${meta.categorySlug}`} className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#ad613d] hover:underline">
                {category?.name ?? meta.category}
              </Link>
              {meta.sponsored && (
                <span className="border border-[#ad613d] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ad613d]">
                  Anzeige
                </span>
              )}
            </div>
            <h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-[5rem]">{meta.title}</h1>
            <p className="mt-6 text-xs uppercase tracking-[0.15em] text-[#292a24]/55">
              <time dateTime={meta.dateIso}>{formatGermanDate(meta.dateIso)}</time>
              <span className="mx-2">·</span>
              raumgefühl Redaktion
              <span className="mx-2">·</span>
              {readingMinutes} Min. Lesezeit
            </p>
            {meta.sponsored && (
              <p className="mt-3 max-w-sm text-xs leading-5 text-[#292a24]/60">
                Dieser Beitrag ist eine bezahlte Platzierung. Die redaktionelle Auswahl und Bewertung bleibt
                davon unberührt.
              </p>
            )}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src={meta.image} alt={meta.imageAlt} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
          </div>
        </div>


        <div className="mx-auto mt-14 grid max-w-3xl gap-10 text-lg leading-8 text-[#292a24]/80">
          <p className="font-serif text-2xl leading-tight text-[#292a24] sm:text-3xl">{renderParagraph(content.intro, meta.sponsored)}</p>

          {content.keyTakeaways && content.keyTakeaways.length > 0 && (
            <aside className="border border-[#ad613d]/30 bg-[#eee8df] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ad613d]">
                Das Wichtigste in Kürze
              </p>
              <ul className="mt-3 grid gap-2 text-base leading-7">
                {content.keyTakeaways.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#ad613d]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {content.sections.length >= 3 && (
            <nav aria-label="Inhaltsverzeichnis" className="border-y border-[#292a24]/15 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ad613d]">Inhalt</p>
              <ol className="mt-3 grid gap-2 text-sm leading-6">
                {content.sections.map((section, index) => (
                  <li key={section.heading}>
                    <a href={`#section-${index}`} className="hover:text-[#ad613d]">
                      {index + 1}. {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {content.widget === 'fugen-kosten' && <FugenKostenRechner />}
          {content.widget === 'kalk-check' && <KalkCheck />}
          {content.widget === 'lueftungs-check' && <LueftungsCheck />}
          {content.widget === 'dimmer-check' && <DimmerCheck />}
          {content.widget === 'heizkoerper-check' && <HeizkoerperCheck />}

          {content.sections.map((section, index) => (
            <section key={section.heading} aria-labelledby={`section-${index}`} className="grid gap-4">
              <h2 id={`section-${index}`} className="font-serif text-3xl leading-tight text-[#292a24] sm:text-4xl">
                {section.heading}
              </h2>
              {renderBlocks(section.blocks, meta.sponsored)}
            </section>
          ))}

          <aside className="border border-[#292a24]/15 bg-[#eee8df] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ad613d]">Passendes Werkzeug</p>
            <Link href={tool.href} className="mt-3 flex items-start justify-between gap-4 font-serif text-2xl leading-tight hover:text-[#ad613d]">
              {tool.label}
              <ArrowUpRight size={20} strokeWidth={1.4} className="mt-1 shrink-0" />
            </Link>
          </aside>

          {related.length > 0 && (
            <aside className="border-t border-[#292a24]/15 pt-8" aria-labelledby="related-heading">
              <h2 id="related-heading" className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#ad613d]">
                Weiterlesen
              </h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {related.map((item) => (
                  <Link key={item.slug} href={`/artikel/${item.slug}`} className="group">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                    <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ad613d]">{item.category}</p>
                    <h3 className="mt-1 font-serif text-lg leading-tight group-hover:text-[#ad613d]">{item.title}</h3>
                  </Link>
                ))}
              </div>
            </aside>
          )}

          <section className="mt-4 grid gap-5 border-t border-[#292a24]/15 pt-10" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="font-serif text-3xl text-[#292a24] sm:text-4xl">Häufige Fragen zu {meta.keyword}</h2>
            {faq.map((item) => (
              <details key={item.question} className="border-b border-[#292a24]/15 pb-4">
                <summary className="cursor-pointer font-medium text-[#292a24]">{item.question}</summary>
                <p className="mt-3 text-base leading-7">{item.answer}</p>
              </details>
            ))}
          </section>

          {content.sources && content.sources.length > 0 && (
            <section className="border-t border-[#292a24]/15 pt-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#292a24]/60">
                Quellen und Grundlagen
              </h2>
              <ul className="mt-3 grid gap-1 text-sm leading-6 text-[#292a24]/70">
                {content.sources.map((source) => (
                  <li key={source.label}>
                    {source.url ? (
                      <a className="underline underline-offset-4 hover:text-[#ad613d]" href={source.url} rel="nofollow noopener" target="_blank">
                        {source.label}
                      </a>
                    ) : (
                      source.label
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-5 text-[#292a24]/50">
                Stand: {formatGermanDate(dateModified)}. Dieser Beitrag ersetzt keine Beratung im Einzelfall.
              </p>
            </section>
          )}

          <aside className="border border-[#292a24]/15 bg-[#eee8df]/60 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ad613d]">Über diesen Beitrag</p>
            <p className="mt-3 text-sm leading-6 text-[#292a24]/75">
              Verfasst von der raumgefühl Redaktion. Wir arbeiten mit Richtwerten aus Normen, Herstellerangaben und
              Erfahrungswerten aus der Praxis – Preise sind Orientierungswerte und können regional abweichen.{' '}
              <Link href="/ueber-uns" className="underline underline-offset-4 hover:text-[#ad613d]">
                Mehr zu Redaktion und Methodik
              </Link>
            </p>
          </aside>

          <div className="flex flex-wrap items-center gap-6 border-t border-[#292a24]/15 pt-8">
            <Link href={`/kategorie/${meta.categorySlug}`} className="inline-flex items-center gap-2 border-b border-[#292a24] pb-2 text-xs font-semibold uppercase tracking-[0.15em] hover:border-[#ad613d] hover:text-[#ad613d]">
              Mehr aus {category?.name ?? meta.category} <ArrowUpRight size={15} />
            </Link>
            <Link href="/artikel" className="inline-flex items-center gap-2 border-b border-[#292a24] pb-2 text-xs font-semibold uppercase tracking-[0.15em] hover:border-[#ad613d] hover:text-[#ad613d]">
              Alle Artikel <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}
