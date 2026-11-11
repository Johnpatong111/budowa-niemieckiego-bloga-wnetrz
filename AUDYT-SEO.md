# Audyt SEO i techniczny – lotse-strassenbeleuchtung.de („raumgefühl")

**Data audytu:** 11.11.2026
**Zakres:** kod aplikacji (Next.js 16 / App Router), dane GSC za 28 dni (13.10–09.11.2026), weryfikacja wyrenderowanego HTML na produkcji.

---

## 1. TL;DR – co się dzieje

| Metryka (GSC, 28 dni) | Wartość |
|---|---|
| Kliknięcia | **3** |
| Wyświetlenia | **268** |
| CTR | **1,1 %** |
| Średnia pozycja | **~73** |
| Kliknięcia z Niemiec | 2 na 207 wyświetleń (0,97 %, poz. 72,9) |

Strona **nie „spada" w sensie technicznym – ona nigdy nie weszła do Top 10.** Jest zaindeksowana, ale Google ocenia ją na pozycje 60–100, gdzie nie ma kliknięć. Jedyne kliknięcia pochodzą z zapytania brandowego („raumgefühl magazin", 2 kliknięcia, poz. 4,4).

Dodatkowo widać wyraźny wzorzec:

- 17–25.10: 9–46 wyświetleń dziennie, pozycje 49–78,
- od 26.10: **1–5 wyświetleń dziennie**, pozycje 81–97.

To klasyczny „testowy" okres po publikacji partii nowych URL-i (codzienny harmonogram publikacji 16–25.10), po którym Google przeliczył jakość i **obniżył rankingi**. Główna przyczyna nie jest techniczna – jest nią **jakość i wiarygodność treści** oraz kilka błędów, które tę ocenę dodatkowo pogarszały.

---

## 2. Największe problemy, które znalazłem

### 2.1 Treści są skrajnie cienkie (główny zabójca)

Artykuł `/artikel/fugen-erneuern` (35 wyświetleń, poz. 75) ma **273 słowa** łącznie z nawigacją – czyli ok. 300 słów treści w 3 krótkich sekcjach. Dla frazy „fugen erneuern" konkurencja w Niemczech ma poradniki 1 500–2 500 słów z listą materiałów, kosztami, tabelą „silikon vs. cement", zdjęciami krok po kroku.

Dodatkowo w każdym artykule było **wklejone to samo zdanie-szablon**:

> „Der wichtigste Begriff für diesen Ratgeber ist **{keyword}**. In diesem Beitrag finden Sie eine klare, praktische Antwort für den Alltag."

oraz **generyczne FAQ** podstawiane słowem kluczowym („Was ist bei Fugen erneuern besonders wichtig?" → odpowiedź identyczna dla każdego tematu). To sygnał „scaled content without added value" z Google Search Essentials – dokładnie to, za co Google obniża całe serwisy.

**Wniosek:** 19 artykułów × ~300 słów = 19 stron, które nie odpowiadają na intencję. Lepiej mieć 6 mocnych poradników niż 19 szkiców.

### 2.2 Nienaturalne linki wychodzące (ryzyko ręcznej oceny)

W treści były linki komercyjne z anchorami exact-match:

- `https://topboden.de/vinylboden/vinylboden-fliesenoptik` z anchor „vinylboden fliesenoptik",
- `https://lenalighting.de/produkte/194-lichtbandsysteme` z anchor „Lichtbandsysteme" (**dwa razy w jednym zdaniu**) + link brandowy.

To wzorzec płatnego link placementu. W połączeniu z cienką treścią daje Google powód, by uznać profil linkowy strony za nieorganiczny. **Usunąłem te linki z treści** (zostały zastąpione neutralnym tekstem), a mechanizm renderowania linków zewnętrznych ustawia teraz `rel="nofollow noopener"` i `target="_blank"`.

### 2.3 Meta description zawierał HTML

Artykuł o winylu miał w `<meta name="description">` surowy, escapowany HTML:

```
... Besonders interessant ist dabei &lt;a href=&quot;https://topboden.de/...&quot;&gt;vinylboden fliesenoptik&lt;/a&gt;, denn ...
```

Bo `description: article.intro` brało intro razem ze znacznikami. Efekt: w SERP-ie śmieci zamiast opisu + dodatkowy sygnał spamu. **Naprawione:** każdy z 19 artykułów ma teraz własny, czysty opis 140–160 znaków w rejestrze `lib/articles.ts`.


### 2.4 Brak kanonicznych, OG i metadanych bazowych

Na produkcji sprawdziłem: strona główna i wszystkie artykuły **nie miały** `<link rel="canonical">`, `og:*`, `twitter:*`, `robots`. Brak `metadataBase` w layoucie. Skutki:

- brak kontroli nad wersjami URL (www / non-www / http / parametry),
- zerowy preview przy udostępnianiu (social, WhatsApp, LinkedIn),
- brak `max-image-preview:large` → mniejsze miniatury w Google Discover/SERP.

**Naprawione** globalnie w `app/layout.tsx` + per strona (`alternates.canonical`).

### 2.5 Soft 404

`/kategorie/xyz-nie-istnieje` zwracało **HTTP 200** z pustą stroną (`return null`). Google indeksuje takie adresy jako „soft 404" i obniża jakość domeny. **Naprawione:** `notFound()` + `dynamicParams = false` + własna strona `app/not-found.tsx`. Zweryfikowane: nieistniejąca kategoria zwraca teraz **404**.

### 2.6 Wydajność – obrazy zabijały Core Web Vitals

W `next.config.mjs` było `images: { unoptimized: true }`, a w `public/images` leżało **10 plików PNG po 1,3–2,1 MB (razem ~16,4 MB)**, serwowanych w oryginale, w tym hero na stronie głównej (`priority`, LCP). Na mobile to LCP rzędu 4–10 s → ocena „poor" w CWV, co realnie obniża ranking mobilny.

**Naprawione:**

- konwersja do JPEG (max 1200 px, quality 80–82): **16,4 MB → 1,4 MB** (‑91 %),
- włączona optymalizacja Next.js + AVIF/WebP + `srcset` (`/_next/image?...&w=...`),
- `Cache-Control: immutable` dla `/images/*`,
- dodany dedykowany `public/og-image.jpg` 1200×630.

### 2.7 Brak stron zaufania (E-E-A-T) i brak Impressum

- `/impressum` → **404**. W Niemczech to nie tylko sygnał jakości, ale **obowiązek prawny (§ 5 DDG)**.
- Brak strony „o nas", brak autora, brak metodyki rechnerów.
- Artykuły nie miały autora ani daty w formie maszynowej (`datePublished`/`dateModified`), schema `Article` nie miała `image`, `author`, `publisher`, a `FAQPage` była **wklejona w `mainEntity` artykułu** (niepoprawna struktura).

**Naprawione:** nowe `/impressum`, `/ueber-uns` (redakcja, metodyka obliczeń, zasady), stopka z linkami, poprawny `Article` + osobny `BreadcrumbList` + osobny `FAQPage`, widoczny breadcrumb i autor pod tytułem.

### 2.8 Architektura linkowania wewnętrznego

- Strona główna linkowała do `#alle-artikel` – **kotwica nie istniała**.
- Strony kategorii pokazywały **1–2 artykuły** (np. „Garten" tylko 1), mimo że w kategorii było ich więcej.
- Każdy artykuł linkował do **jednego** „powiązanego" tekstu.

**Naprawione:** nowy `/artikel` (archiwum wszystkich tekstów), kategorie renderują **wszystkie** swoje artykuły z rejestru, każdy artykuł ma **3 powiązane** + link do kategorii + CTA do narzędzia + link do archiwum.

### 2.9 Sitemap i robots

- Wszystkie `lastmod` były **identyczne** (czas builda) – Google ignoruje taki sygnał świeżości.
- Brak stron kategorii, `/impressum`, `/ueber-uns`, narzędzi w części wpisów.
- `changefreq: daily` dla artykułów, które się nie zmieniają.

**Naprawione:** 33 adresy, realny `lastmod` per artykuł (data publikacji / `updatedAt`), dodane kategorie i strony prawne, brak sztucznego `daily`.

### 2.10 Rozjazd brandu i domeny (problem strategiczny)

Domena `lotse-strassenbeleuchtung.de` = „lotse – oświetlenie uliczne", a serwis to magazyn wnętrzarski **raumgefühl**. Google nie może zbudować spójnej encji: brak sygnałów topical relevance, brak wyszukiwań brandowych (poza 8 wyświetleniami „raumgefühl magazin").

To nie jest błąd do „naprawienia w kodzie" – to decyzja biznesowa. Rekomendacja: **docelowo domena `raumgefuehl.de`** (301 z obecnej). Jeśli to niemożliwe, trzeba konsekwentnie budować markę „raumgefühl" (strona o nas, profile, spójny `Organization` schema, linki brandowe).

---

## 3. Co już zostało zmienione (wdrożone w kodzie)

| Obszar | Plik | Zmiana |
|---|---|---|
| Rejestr treści | `lib/articles.ts` (nowy) | 19 artykułów: tytuł, kategoria, data ISO, obraz, alt, unikalny opis SEO, publishAt; helpery: `getPublishedArticles`, `getRelatedArticles`, `formatGermanDate`, `articleUrl` |
| Stałe strony | `lib/site.ts` (nowy) | URL, nazwa, e-mail, domyślny obraz OG |
| Layout | `app/layout.tsx` | `metadataBase`, szablon tytułu, canonical, OG/Twitter, `robots`, schema `Organization` + `WebSite` + `SearchAction`, stopka globalna |
| Stopka | `components/site-footer.tsx` (nowy) | Linkowanie do kategorii, archiwum, narzędzi, `Über uns`, `Impressum`, `Datenschutz`, kontakt |
| Artykuł | `app/artikel/[slug]/page.tsx` | `generateMetadata` z canonical/OG/`article:*`, schema `Article` + `BreadcrumbList` + `FAQPage`, breadcrumb UI, autor, czas czytania, 3 powiązane, CTA, `notFound()`, `dynamicParams=false`, usunięte zdanie-szablon i linki spamowe |
| Kategoria | `app/kategorie/[slug]/page.tsx` | pełna lista artykułów, `generateMetadata`, canonical/OG, `CollectionPage` + `BreadcrumbList` + `ItemList`, `notFound()` |
| Archiwum | `app/artikel/page.tsx` (nowy) | wszystkie artykuły + `ItemList` |
| Prawne / E-E-A-T | `app/impressum/page.tsx`, `app/ueber-uns/page.tsx` (nowe) | Impressum, redakcja, metodyka rechnerów, zasady |
| 404 | `app/not-found.tsx` (nowy) | prawdziwy 404 + nawigacja |
| Sitemap | `app/sitemap.ts` | 33 URL-e, realny `lastmod`, kategorie i strony prawne |
| Robots | `app/robots.ts` | blokada `/api/` |
| Obrazy | `public/images/*.jpg`, `public/og-image.jpg` | 16,4 MB → 1,4 MB, OG 1200×630 |
| Wydajność | `next.config.mjs` | optymalizacja obrazów (AVIF/WebP), cache headers, **usunięte `typescript.ignoreBuildErrors`** |
| Narzędzia | strony `ratgeber/*` | canonical, OG, tytuły bez podwójnego sufiksu marki |
| Revalidacja | `app/api/publish/route.ts` | odświeża też `/artikel` i kategorie (poza pętlą) |

**Weryfikacja:** `npm run build` przechodzi (TypeScript sprawdzany, 37 stron statycznych). Lokalnie sprawdzone: `/` 200 + canonical + og:image, artykuł 200 + canonical + og:image + 12 typów schema, kategoria 200, nieistniejąca kategoria **404**, `/impressum` 200, sitemap z 33 URL-ami i 18 różnymi `lastmod`.

---

## 4. Co MUSISZ zrobić ręcznie (nie da się tego zautomatyzować)

### P0 – w tym tygodniu

1. **Uzupełnij Impressum.** W `app/impressum/page.tsx` są trzy miejsca oznaczone `TODO:` (imię i nazwisko, ulica, kod i miasto). Bez tego strona jest niezgodna z § 5 DDG – a to także sygnał zaufania, który Google bierze pod uwagę przy YMYL.
2. **Zdecyduj o domenie.** Jeśli zostajesz na `lotse-strassenbeleuchtung.de`, dodaj w GSC osobną usługę dla `raumgefuehl.de` i przygotuj 301. Jeśli nie – wpisz w `lib/site.ts` nowy URL i zrób przekierowania 301 wszystkie-do-jednego.
3. **Zgłoś do ponownego indeksowania** w GSC: `/`, `/artikel`, `/artikel/fugen-erneuern`, `/artikel/fenster-einstellen-winter`, `/artikel/lichtplanung-ohne-geheimnisse`, `/ratgeber/led-ersparnis-rechner`.
4. **Sprawdź przekierowania www/non-www/http.** Test `HEAD` na `http://lotse-strassenbeleuchtung.de` zwracał 200 – upewnij się, że Cloudflare/Vercel robi 301 na wersję `https://www.`. Trzy wersje = rozproszone sygnały.

### P1 – treści (największy zwrot)

Nie pisz nowych artykułów. **Rozbuduj 5 istniejących**, które już mają wyświetlenia:

| Fraza (GSC) | Wyśw. | Poz. | URL | Co dodać |
|---|---|---|---|---|
| gute lichtplanung | 24 | 78,5 | `/artikel/lichtplanung-ohne-geheimnisse` | plan pomieszczenia, tabela „warstwa światła → funkcja → lumen", przykłady dla 3 pokoi, błędy, zdjęcia |
| fenster im wintermodus | 15 | 83,9 | `/artikel/fenster-einstellen-winter` | 6 zdjęć kroków, tabela „problem → objaw → rozwiązanie", informacja o gwarancji producenta |
| fugen erneuern | 14 | 78 | `/artikel/fugen-erneuern` | lista materiałów z cenami, tabela silikon vs. cement, czasy schnięcia, kiedy wzywać fachowca |
| led einsparung rechner | 10 | 80,5 | `/ratgeber/led-ersparnis-rechner` | przykład liczbowy 60 W → 9 W, tabela kosztów kWh, wyjaśnienie lumenów, FAQ |
| heizkörper entlüften | 6+ | 98 | `/artikel/heizkoerper-entlueften` | kolejność w instalacji, zdjęcia zaworu, co jeśli po odpowietrzeniu nadal zimny |

Cel: **1 200–1 800 słów**, min. 1 tabela, min. 3 zdjęcia z opisowym `alt`, sekcja „Wann Sie einen Fachbetrieb rufen sollten", źródła (VDI, producent, energia).

Dodatkowo: **dodaj prawdziwe zdjęcia** (własne lub licencjonowane). Obecne grafiki to powtarzające się 10 plików AI użytych w kilku artykułach – Google rozpoznaje duplikaty obrazów, a użytkownik traci zaufanie.

### P2 – autorytet i linki

- **Autor z imieniem i nazwiskiem** + krótkie bio i doświadczenie (obecnie „raumgefühl Redaktion" – lepsze niż nic, ale słabsze niż osoba). Schema: `Person` zamiast `Organization`.
- **Linki wewnętrzne w treści** (nie tylko w boxach): każdy poradnik powinien w środku tekstu linkować do 2–3 pokrewnych tekstów z anchorami opisowymi.
- **Linki przychodzące:** Pinterest (wnętrza), lokalne grupy/fora, 2–3 guest posty u niemieckich blogów wnętrzarskich. Bez linków domena pozostanie „anonimowa".
- **GSC + Bing Webmaster Tools**, dodaj też **GA4** (obecnie jest tylko Vercel Analytics) – bez tego nie zmierzysz zachowania po wejściu.
- **Nie publikuj codziennie nowych tekstów AI.** Harmonogram 16–25.10 (10 artykułów w 9 dni) zbiegł się dokładnie z załamaniem wyświetleń. Publikuj 1 dobry tekst na 1–2 tygodnie.


---

## 5. Plan na 90 dni

**Tydzień 1–2**
- Impressum (dane), decyzja o domenie, 301, GSC „Poproś o ponowne zindeksowanie".
- Pomiar bazowy: zapisz pozycje dla 10 fraz z sekcji 4.
- Sprawdź CWV w PageSpeed Insights po deployu (LCP powinno spaść z >4 s do <2,5 s).

**Tydzień 3–6**
- Rozbudowa 5 artykułów z tabeli P1 (po jednym na 4–5 dni).
- Prawdziwe zdjęcia do 3 najważniejszych tekstów.
- Autor + strona autora, `Person` schema.

**Tydzień 7–10**
- 3 nowe teksty oparte na frazach, gdzie Google **już** pokazuje stronę (nie zgaduj tematów): „stoßlüften wie lange", „schimmel in der wohnung entfernen", „wieviel strom led lampe".
- Linki wewnętrzne: hub „Beleuchtung" → wszystkie teksty o świetle + Lumen Rechner.

**Tydzień 11–13**
- Konsolidacja: artykuły poniżej 400 słów albo rozbuduj, albo połącz i zrób 301 (unikaj 19 cienkich URL-i).
- Przegląd GSC: które frazy przesunęły się z 60–100 na <30; dla nich dopisz sekcje.
- Link building: 5 realnych pozyskań (Pinterest, 2 guest posty, 2 lokalne katalogi branżowe).

---

## 6. KPI – co mierzyć

| KPI | Stan 11.11.2026 | Cel 90 dni |
|---|---|---|
| Wyświetlenia / 28 dni | 268 | 2 000+ |
| Kliknięcia / 28 dni | 3 | 60+ |
| Średnia pozycja (całość) | ~73 | < 30 |
| Frazy w Top 10 | ~0 | 5+ |
| CTR przy poz. 1–10 | brak danych | > 4 % |
| LCP mobile | prawdopodobnie > 4 s | < 2,5 s |
| Zaindeksowane URL-e bez błędów | 30 (1 soft 404) | 33, 0 soft 404 |

---

## 7. Uwagi i ryzyka

1. **Impressum zawiera placeholdery `TODO:`** – musi zostać uzupełnione przed traktowaniem strony jako produkcyjnej.
2. **Zmiana `images.unoptimized` na optymalizację** oznacza, że Vercel będzie generował warianty obrazów (drobny koszt w planie Hobby/Pro – przy tym ruchu pomijalny). Zaleta: `srcset` + AVIF = realny spadek LCP.
3. **Usunąłem `typescript.ignoreBuildErrors`** – build przechodzi, ale każda przyszła zmiana musi być typowana poprawnie. To celowe: ukrywanie błędów TS w projekcie SEO kończy się błędami w schema i metadanych.
4. **Teksty artykułów nadal są krótkie i generyczne.** Zmiany techniczne (schema, canonical, obrazy, linkowanie) są konieczne, ale **nie zastąpią treści** – bez rozbudowy z sekcji 4 strona pozostanie na pozycjach 60–100.
5. **Nie dodawałem nowych treści AI** – to pogłębiłoby problem „scaled content". Rozbudowa powinna być redakcyjna, z konkretami (ceny, modele, kody błędów, wymiary).
6. **Artykuł `led-beleuchtungssysteme`** nie jest linkowany ze strony głównej (był tylko w sitemapie). Został dodany do rejestru i pojawia się w archiwum oraz kategorii „Beleuchtung" – warto go rozbudować lub scalić z tekstem o dimmowalnych LED.


---

## 8. Tura 2 – treści (wdrożone 11.11.2026)

Zamiast dopisywać kolejne krótkie teksty, rozbudowano sześć istniejących adresów, które **już mają wyświetlenia w GSC**. Wprowadzono model blokowy treści (`lib/content.ts`): akapity, nagłówki H3, listy, kroki numerowane, tabele i wyróżnienia.

| URL | Frazy z GSC | Słowa przed → po | Nowe elementy |
|---|---|---|---|
| `/artikel/fugen-erneuern` | fugen erneuern, badfugen erneuern, fugen sanieren | ~300 → **1 237** | 3 tabele, 6 kroków, lista błędów, koszty, 5 FAQ |
| `/artikel/fenster-einstellen-winter` | fenster im wintermodus, fenster einstellen winter | ~300 → **1 212** | papier-test, 5 kroków, tabela problemów, 5 FAQ |
| `/artikel/lichtplanung-ohne-geheimnisse` | gute lichtplanung, lichtplanung zu hause | ~300 → **1 144** | 3 tabele (lumen, kelvin, przykład 24 m²), 5 kroków, 5 FAQ |
| `/artikel/heizkoerper-entlueften` | heizkörper entlüften, reihenfolge | ~300 → **1 018** | kolejność, 6 kroków, tabela symptomów, 5 FAQ |
| `/artikel/schimmel-selbst-entfernen` | schimmel entfernen, schimmel in der wohnung entfernen | ~300 → **1 009** | kryterium 0,5 m² (UBA), tabela środków i powierzchni, 6 kroków |
| `/artikel/vinylboden-fliesenoptik` | vinylboden fliesenoptik, küchenboden vinyl | ~300 → **914** | 3 tabele, 5 kroków, koszty, 5 FAQ, **usunięty link do topboden.de** |

Dodatkowo:

- każdy z tych artykułów ma **listę źródeł** i datę „Stand" (`dateModified` = 11.11.2026, widoczna też w sitemapie),
- `dateModified` trafia do schema `Article` i do `lastmod` w sitemapie,
- meta description każdego tekstu jest unikalny i **nie zawiera HTML**,
- artykuły linkują do siebie nawzajem i do rechnerów (kontekstowo, w treści),
- usunięto ostatni komercyjny link wychodzący z anchorem exact-match.

### Impressum – odpowiedź na pytanie

`app/impressum/page.tsx` to strona z **obowiązkową w Niemczech informacją o operatorze** (§ 5 DDG). Imię, nazwisko i adres są wymagane, gdy strona jest „geschäftsmäßig" – czyli gdy zarabia lub przygotowuje się do zarabiania (reklamy, affiliate, leady, sprzedaż, newsletter).

Opcje:

1. **Prawdziwe dane** – najprościej, jeśli nie przeszkadza Ci adres domowy.
2. **Impressum-Service / c/o-Adresse** – usługa pocztowa (5–10 €/mies.), pod warunkiem że pod tym adresem można doręczać pisma. To standardowa praktyka.
3. **Jednoosobowa działalność / firma** – adres siedziby.
4. **Blog ściśle prywatny** – bez reklam, affiliate i sprzedaży: wtedy przepis formalnie nie obejmuje strony, ale w praktyce każdy sygnał komercji (np. link afiliacyjny) przywraca obowiązek.

Dane są teraz w jednym miejscu: `OPERATOR` w `lib/site.ts`. Uzupełnij trzy pola i gotowe – strona Impressum i schema same się zaktualizują.

### Co dalej z treścią (kolejność wg potencjału)

1. `/artikel/led-flackert-ursachen-loesungen` – 22 wyświetlenia, poz. 55 (najlepsza pozycja w serwisie, warto pchnąć do Top 20).
2. `/artikel/richtig-lueften-im-winter` – 17 wyświetleń, poz. 61,8.
3. `/artikel/heizkoerper-wird-nicht-warm` – 18 wyświetleń, poz. 64.
4. `/artikel/wandfarbe-auswaehlen` – 13 wyświetleń, poz. 58,6 + link do Farbmengen Rechner.
5. `/ratgeber/led-ersparnis-rechner` – 32 wyświetlenia; dodać przykład liczbowy 60 W → 9 W i tabelę kosztów kWh.

Zasada: każdy tekst 1 000–1 600 słów, minimum jedna tabela, sekcja „wann Profi", źródła, 5 FAQ i 2–3 linki wewnętrzne w treści.


---

## 9. Tura 3 – jakość, sponsoring i zdjęcia (11.11.2026)

### 9.1 Impressum przy publikacjach sponsorowanych

Blog z **jednorazowymi płatnymi publikacjami (Linkhouse)** to działalność *geschäftsmäßig*. Wniosek: **Impressum jest obowiązkowe** – ale wystarczy wersja minimalna (nazwa, adres do doręczeń, e-mail, osoba odpowiedzialna). Nie trzeba zakładać firmy ani pisać „usługi".

Najtańsze sensowne rozwiązanie: **Impressum-Service / c/o-Adresse** (5–10 €/mies.) – adres, pod który realnie można doręczyć pismo. Wpisujesz go w `OPERATOR` w `lib/site.ts`.

### 9.2 Linkhouse: jak publikować, żeby nie oberwać filtrem

Płatne linki bez oznaczenia to *link scheme* – jedno z niewielu przewinień, za które Google nakłada ręczne kary na całą domenę. Dlatego wdrożyłem to w kodzie:

1. W `lib/articles.ts` dodaj do artykułu `sponsored: true`.
2. Szablon automatycznie:
   - pokazuje label **„Anzeige"** przy tytule i w treści (obowiązek z § 6 UWG / Medienstaatsvertrag),
   - zostawia linki zewnętrzne **dofollow** (`rel="noopener"` tylko ze względów bezpieczeństwa),
   - wyświetla zdanie o niezależności oceny redakcyjnej.

**Decyzja z 11.11.2026:** linki w publikacjach sponsorowanych są **dofollow** — tak wynika z ustaleń z Linkhouse. Sterowane jedną flagą:

```ts
// lib/site.ts
export const SPONSORED_LINKS = { dofollow: true }
```

Przestawienie na `false` przywraca `rel="nofollow"` bez zmian w treści artykułów.

**Ryzyko, o którym trzeba wiedzieć (nie moralizuję, tylko stan faktyczny):** Google traktuje płatne linki bez oznaczenia jako *link scheme*. Przy ręcznej weryfikacji grozi to karą dla całej domeny — nie tylko dla jednego URL-a. Praktyczne ograniczenia ryzyka:

- maks. 1 publikacja sponsorowana na 8–10 tekstów redakcyjnych,
- brak anchorów exact-match w linkach sponsorowanych („fugen erneuern" jako anchor = najgorszy przypadek),
- link prowadzi do realnej, tematycznej strony, nie do „link farmy",
- jeśli w GSC pojawi się „Manual Action → Unnatural links", wtedy jedyny ratunek to przestawienie flagi na `false` + `disavow`.

Przykład wpisu:

```ts
{
  slug: 'mein-partnerbeitrag',
  title: '…',
  sponsored: true,        // <- to wystarczy
  // resztę pól jak zwykle
}
```

Dodatkowo w `/ueber-uns` jest sekcja „Werbung und gesponserte Beiträge", która opisuje politykę serwisu – to wspiera E-E-A-T i pokazuje, że oznaczenia są celowe.

**Zasady, których warto się trzymać:**
- maks. 1 publikacja sponsorowana na 8–10 tekstów redakcyjnych,
- sponsorowany tekst nie może być jedynym źródłem informacji o temacie,
- nie linkuj z artykułu sponsorowanego do artykułów redakcyjnych w celu „przepchnięcia" mocy – linkuj normalnie, bez exact-match.

### 9.3 Skąd brać zdjęcia (realistycznie, dla bloga)

Nie potrzebujesz sesji zdjęciowej. Kolejność od najlepszej do najgorszej:

1. **Własne zdjęcia telefonem** – najlepsze, bo unikalne. Wystarczy: okno jako źródło światła, zdjęcie z góry, jedna scena na artykuł. Np. dla „Fugen erneuern": stara fuga, nałożone Kreppband, gotowa fuga. Telefon + dzienne światło = wystarczy.
2. **Unsplash / Pexels / Pixabay** – darmowe, do użytku komercyjnego, bez attribution (sprawdź licencję przy każdym pliku). Szukaj po niemiecku: „Badezimmer Fugen", „Heizkörper", „Fenster Winter".
3. **Wikimedia Commons** – licencje CC, wymagają podania autora i licencji (dodaj to w podpisie).
4. **AI (jak teraz)** – dopuszczalne, ale: nie powtarzaj tego samego pliku w 5 artykułach, dodawaj podpisy i `alt`, nie generuj zdjęć „krok po kroku", bo wyglądają nienaturalnie.

Na start wystarczy: 1 własne zdjęcie na artykuł + 1–2 stockowe. Google nie karze za stock, karze za **duplikaty i brak kontekstu**.

**Automatyzacja:** `scripts/add-image.ps1` pobiera zdjęcie z bezpośredniego URL, skaluje do 1400 px i zapisuje jako `public/images/<slug>.jpg` (test: 1280×1608 → 278 KB). Użycie:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\add-image.ps1 -Slug fugen-erneuern -Url "https://images.unsplash.com/photo-...?w=1600&q=80"
```

Unsplash blokuje automatyczne wyszukiwanie (401 / Anubis-Challenge), dlatego URL trzeba skopiować z przeglądarki: prawy klik na zdjęciu → „Bildadresse kopieren" („Kopiuj adres obrazu"). Reszta (pobranie, kadrowanie, kompresja, wpis do rejestru) to jedno polecenie.

### Pixabay API – wyszukiwanie i pobieranie jednym poleceniem

Pixabay nie blokuje botów, więc to wygodniejsza droga niż Unsplash.

1. Wejdź na **https://pixabay.com/api/docs/**, zaloguj się i skopiuj swój **API Key**.
2. Zapisz go raz na komputerze:
   ```powershell
   setx PIXABAY_API_KEY "12345678-abcdef1234567890abcdef12"
   ```
   (skrypt czyta też klucz bezpośrednio z rejestru, więc nie trzeba restartować VS Code)
3. Wyszukaj kandydatów:
   ```powershell
   powershell -NoProfile -ExecutionPolicy Bypass -File scripts\pixabay-images.ps1 -Query "badezimmer fliesen"
   ```
4. Pobierz wybrany numer do artykułu:
   ```powershell
   powershell -NoProfile -ExecutionPolicy Bypass -File scripts\pixabay-images.ps1 -Query "badezimmer fliesen" -Slug fugen-erneuern -Pick 3
   ```

Skrypt sam: skaluje do 1400 px, kompresuje do JPEG ~150 KB, zapisuje jako `public/images/<slug>.jpg` i dopisuje autora do `public/images/CREDITS.md`. Limity Pixabay: 100 zapytań/min.

**Licencja Pixabay:** użycie komercyjne dozwolone, attribution nie jest wymagane — dlatego autor trafia tylko do `CREDITS.md`, a nie pod zdjęciem. Nie używaj API do masowego pobierania ani nie odsprzedawaj plików jako stock.

### 9.6 Prawdziwe zdjęcia (11.11.2026)

**16 z 19 artykułów** ma teraz zdjęcia z Pixabay (JPEG, 1280–1400 px, 41–267 KB). Wszystkie przeszły weryfikację: są w HTML i zwracają HTTP 200 przez `/_next/image` (19/19 artykułów, 0 błędów). Autorzy i ID w `public/images/CREDITS.md`.

Zasada dla `alt`: **opis zdjęcia + fraza kluczowa na początku, jeśli zdjęcie faktycznie ją pokazuje**. Przykłady:

| Artykuł | alt |
|---|---|
| `fugen-erneuern` | Weiße Wandfliesen mit Wassertropfen und deutlich sichtbaren Fugen im Badezimmer |
| `heizkoerper-wird-nicht-warm` | Heizkörper wird nicht warm: Thermostatventil mit Temperaturskala prüfen |
| `wandfarbe-auswaehlen` | Wandfarbe auswählen: Wand mit Farbrolle streichen |
| `rasen-vertikutieren` | Rasen vertikutieren: dichte Grasharbe als Ausgangslage für die Pflege |

Nie samo słowo kluczowe („fugen erneuern fugen erneuern") — to sygnał spamu i psuje dostępność. Alt ma opisywać obraz; fraza ma w nim wynikać z treści zdjęcia.

**Trzy artykuły zostały przy grafice AI** — świadomie:

- `schimmel-selbst-entfernen`: Pixabay nie ma sensownych zdjęć pleśni („Schimmel" = biały koń, „mold" = śluzowce),
- `vinylboden-fliesenoptik`: „vinyl" zwraca gramofony, „vinylboden" daje 0 wyników,
- `richtig-lueften-im-winter`: obecne zdjęcie okna zimą jest trafniejsze niż dostępny stock.

Do tego hero strony głównej (`hero-interior.jpg`) i `og-image.jpg` zostały bez zmian.

**Nieaktualne pliki** (nie są już nigdzie używane, można usunąć): `living-room.jpg`, `lighting-detail.jpg`, `heizkoerper-warm.jpg`, `led-flackert.jpg`.


### 9.4 Co poprawiono w tekstach (tura 3)

- Dodano blok **„Das Wichtigste in Kürze"** (3–5 punktów) na początku każdego z 6 artykułów – to odpowiedź na intencję przed scrollowaniem i materiał do featured snippet / AI Overviews.
- Dodano automatyczny **spis treści** z linkami kotwicznymi (dla tekstów z 3+ sekcjami).
- Dodano **box redakcyjny** na końcu („Über diesen Beitrag") z linkiem do metodologii – sygnał E-E-A-T.
- Doprecyzowano dane:
  - wyjaśniono, że **1 lx = 1 lm/m²**, więc wartości w tabeli to jednocześnie luksy (zgodność z DIN EN 12464-1),
  - „0,5 m²" przy schimmelu opisane jako **orientacja UBA**, z zastrzeżeniem, że granica zależy od materiału,
  - kolejność odpowietrzania opisana jako **„übliche Praxis"**, z wyjaśnieniem mechanizmu,
  - tabele cen mają podpis: **„Erfahrungswerte, Stand November 2026, ±30 % regional"**.

### 9.5 Czego nie udało się zweryfikować automatycznie

Wyszukiwarki blokują boty (DuckDuckGo zwróciło captcha), a bezpośrednie adresy UBA/co2online zwracały 404 – dlatego zamiast cytować konkretne strony, opisałem dane jako **orientacyjne** i oparłem je na normach oraz powszechnej praktyce. Przed publikacją warto kliknąć 2–3 źródła i podmienić etykiety w `sources` na linki (`url`), co dodatkowo wzmocni E-E-A-T.


---

## 10. Wdrożenie i konkurencja (11.11.2026)

### 10.1 Czy to jest na Vercelu? **Nie.**

Sprawdzenie live (`www.lotse-strassenbeleuchtung.de`):

| Test | Wynik |
|---|---|
| `<link rel="canonical">` na `/` | brak |
| `/impressum` | **404** |
| `/artikel` (archiwum) | **404** |
| „Das Wichtigste in Kürze" w artykule | brak |
| nowe zdjęcie `fugen-erneuern.jpg` | brak |

Czyli produkcja to wersja sprzed zmian. Lokalnie wszystko jest gotowe (build OK, 33/33 URL-i).

Stan narzędzi:

- Vercel CLI **65.11.0** zainstalowane,
- brak `.vercel/project.json` (projekt niepodłączony),
- brak `VERCEL_TOKEN` w środowisku,
- folder projektu **nie jest w repo git** (repo root to `C:\Users\Hubert`, katalog jest untracked),
- pierwotny `layout.tsx` miał `generator: 'v0.app'` → obecna strona prawdopodobnie pochodzi z projektu v0.

**Dwie drogi wdrożenia:**

1. **GitHub → Vercel (zalecane).** Utwórz repo, wypchnij ten katalog, w Vercel: *Add New → Project → Import*, albo podłącz repo do istniejącego projektu. Od tej pory każdy `git push` = deploy.
2. **CLI.** `vercel login` (interaktywnie, na Twoim koncie), potem w katalogu projektu:
   ```powershell
   vercel link      # podłącz do istniejącego projektu lotse-strassenbeleuchtung
   vercel --prod
   ```

Bez Twojego logowania nie mogę tego zrobić — CLI wymaga tokenu albo przeglądarki.

### 10.2 Konkurencja – co realnie rankuje (heimwerker.de, sprawdzone 11.11.2026)

Wyszukiwarki blokują boty, więc analizę zrobiłem na konkretnych stronach wyciągniętych z ich sitemapy.

| Temat | Strona konkurencji | Objętość | Mocne strony | Słabe strony |
|---|---|---|---|---|
| Fugen | `/dauerelastische-fugen-setzen/` | ~1 500 słów | chemia silikonu, ZGV-Wert, autor-handlowiec z bio, 72 oceny, komentarze | **brak kroków 1-2-3**, brak cen, brak FAQ, brak tabeli „co gdzie" |
| Heizung entlüften | `/heizung-entlueften-mit-der-schritt-fuer-schritt-anleitung/` | ~1 500 słów | 4 kroki, 10 komentarzy z realnymi pytaniami | brak FAQ, brak tabeli objawów, brak informacji o ciśnieniu |
| Wandfarbe | `/wandfarben-farbsorten-fuer-wand-und-decke/` | ~3 000+ słów | encyklopedia rodzajów farb | zero porad „jaka farba do jakiego pokoju", brak tabel decyzyjnych |
| Licht | `/licht-lampen/` (hub) | dużo krótkich wpisów | szerokość tematu, autorytet domeny (od 1996) | brak kalkulatorów, brak konkretnych lumenów |

Dodatkowy sygnał: **selbst.de wycofuje treści online** („selbst.de zieht um – alle Themen findest du jetzt im Heft"). Jeden z dużych konkurentów wychodzi z SEO – to okno.

### 10.3 Wniosek strategiczny

Nie wygramy z heimwerker.de objętością ani autorytetem domeny. Wygranie polega na tym, czego oni **nie mają**:

1. **Interaktywne narzędzia** – oni mają zero kalkulatorów. My mamy już 4 (Lumen, Farbmenge, LED, od dziś Fugen-Kosten).
2. **Tabele decyzyjne i ceny** – „welches Silikon wohin", „was kostet lfm", „wann Profi".
3. **FAQ z realnych pytań** – pytania z ich komentarzy, tylko z odpowiedziami na stronie.
4. **Checklisty do wydruku** – jeszcze do zrobienia, tanie w produkcji i chętnie linkowane.
5. **Huby tematyczne + linkowanie wewnętrzne** – oni mają hub, my dopiero budujemy.

### 10.4 Co wdrożono w tej turze

- **`Fugen-Kostenrechner`** (`components/fugen-kosten-rechner.tsx`) – suwak lfm + wybór „selbst / Fachbetrieb" → widełki kosztów, czas, informacja o mindestpauschale. Wstawiony pod artykułem `fugen-erneuern` (`widget: 'fugen-kosten'` w treści).
- **5 nowych FAQ z realnych pytań użytkowników** (podpatrzonych w komentarzach konkurencji):
  - Fugen: usuwanie resztek silikonu, acryl w łazience, dlaczego nowa fuga znów czarna,
  - Heizung: brak wody i powietrza w wentylu, czy odpowietrzać także ciepłe grzejniki.
- Weryfikacja: build OK, rechner widoczny w HTML, 8 pytań FAQ w fugen, 7 w heizkoerper.

