# Zaawansowana checklista przed publikacją

Używaj razem z `validate.mjs` (automat) + ten dokument (rzeczy, których automat nie sprawdzi).
Automatycznych bramek jest 25 – poniżej tylko to, co wymaga oka człowieka.

## 1. Research (przed pisaniem)

- [ ] Uruchomiony `brief.mjs` na min. 1 stronie konkurencji
- [ ] Spisane 3 luki konkurencji (czego nie mają: ceny, tabela decyzyjna, FAQ, narzędzie)
- [ ] Ocena potencjału frazy z `opportunity.mjs` ≥ 25 i zapisana w `research`
- [ ] Sprawdzone, czy fraza nie jest już pokryta innym URL-em (kanibalizacja)

## 2. Fakty i liczby

- [ ] Każda cena ma widełki i podpis „Erfahrungswerte, Stand <miesiąc rok>"
- [ ] Każda norma/standard ma źródło (DIN, UBA, Verbraucherzentrale)
- [ ] Żadna liczba nie jest zmyślona „na oko" — jeśli nie ma źródła, jest opisana jako orientacyjna
- [ ] Wszystkie jednostki spójne (°C, bar, lm/m², €)
- [ ] Brak obietnic gwarancyjnych („immer", „niemals" tylko przy realnych zakazach)

## 3. Treść

- [ ] Lead odpowiada na pytanie z tytułu w pierwszych 60 słowach
- [ ] Fraza kluczowa w tytule, leadzie i min. jednym nagłówku — bez upychania
- [ ] Min. 2 miejsca, gdzie tekst mówi „tego nie rób" (granice, ryzyka)
- [ ] Sekcja „wann Profi" z konkretnym kryterium (nie „w razie wątpliwości")
- [ ] Żadnych powtórzeń tego samego akapitu innymi słowami
- [ ] Artykuł da się przeczytać na telefonie: akapity max. 4 linijki

## 4. Element, którego nie ma czat AI

- [ ] Widget albo kalkulator w środku tekstu (nie tylko link)
- [ ] Tabela z cenami lub widełkami
- [ ] Tabela decyzyjna („co wybrać w moim przypadku")
- [ ] FAQ odpowiada na realne pytania (także te z forów konkurencji)

## 5. SEO i technika

- [ ] `validate.mjs` → 100/100
- [ ] Obraz istnieje, `alt` opisuje zdjęcie (min. 20 znaków)
- [ ] Min. 2 linki wewnętrzne w treści (nie w boxach)
- [ ] Canonical poprawny (`/artikel/<slug>`, bez parametrów)
- [ ] Sitemap zawiera URL, `lastmod` = data realnej zmiany
- [ ] Brak linków zewnętrznych bez `rel` (nasz renderer dokłada `nofollow noopener`)

## 6. E-E-A-T

- [ ] Autor/redakcja pod tytułem, data publikacji
- [ ] Data „Stand" przy tabelach z cenami
- [ ] Źródła na końcu (min. 2)
- [ ] Box „Über diesen Beitrag" z linkiem do `/ueber-uns`

## 7. Po publikacji (24–48 h)

- [ ] Strona zwraca 200 na żywej domenie
- [ ] Widget renderuje się (sprawdź w HTML, nie tylko w podglądzie)
- [ ] GSC → „Sprawdzenie adresu URL" → „Poproś o ponowne zindeksowanie"
- [ ] GSC → Sitemaps: sitemap zgłoszona i bez błędów
- [ ] Po 7 dniach: sprawdź w GSC wyświetlenia i pozycję dla frazy głównej
- [ ] Jeśli pozycja > 50 po 3 tygodniach: dopisz sekcje, nie zmieniaj URL-a

## 8. Sponsoring (jeśli dotyczy)

- [ ] `sponsored: true` w metadanych
- [ ] Widoczne oznaczenie „Anzeige"
- [ ] Brak anchorów exact-match w linkach sponsorowanych
- [ ] Maks. 1 publikacja sponsorowana na 8–10 redakcyjnych

## 9. Automatyczna publikacja

- [ ] Draft ma `status: "approved"`
- [ ] `publishAt` nie jest w przyszłości
- [ ] Zadanie `raumgefuehl-content` zarejestrowane (`Get-ScheduledTask`)
- [ ] Po publikacji sprawdzone `.pipeline.log` i `.pipeline-state.json`
