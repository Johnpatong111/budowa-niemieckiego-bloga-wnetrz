# Kolejka artykułów

Ten katalog to wejście do pipeline'u treści. Nic tu nie jest publikowane automatycznie —
artykuł jedzie na produkcję tylko wtedy, gdy przejdzie wszystkie bramki jakości.

## Przepływ

```
1. BRIEF      node scripts/pipeline/brief.mjs --slug <slug> --url <konkurencja> [--url ...]
              → content/queue/<slug>.brief.md  (objętość, nagłówki, braki konkurencji)

2. DRAFT      kopiujesz _template.json → <slug>.json i wypełniasz
              status: "draft" → "review" → "approved"

3. WALIDACJA  node scripts/pipeline/validate.mjs content/queue/<slug>.json
              → raport bramek, exit 0 = wszystko OK

4. PUBLIKACJA node scripts/pipeline/publish.mjs
              → content/articles/<slug>.json
              → regeneracja lib/articles.generated.ts + content/rich/generated.ts
              → git commit + push → Vercel buduje automatycznie
```

## Harmonogram (nieregularne pory)

`scripts/pipeline/schedule.ps1` uruchamiany co 25 minut sprawdza, czy minął losowy
odstęp 24–48 h od ostatniej publikacji. Jeśli tak i jest zatwierdzony draft — publikuje.
Dzięki temu artykuły wychodzą o różnych porach, nie „co równą dobę".

Rejestracja zadania (raz):

```powershell
$action  = New-ScheduledTaskAction -Execute "powershell.exe" `
  -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$PWD\scripts\pipeline\schedule.ps1`""
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(5) `
  -RepetitionInterval (New-TimeSpan -Minutes 25)
Register-ScheduledTask -TaskName "raumgefuehl-content" -Action $action -Trigger $trigger
```

Log: `.pipeline.log`, stan: `.pipeline-state.json` (oba lokalne, poza repo).

## Bramki jakości (`scripts/pipeline/config.mjs`)

### Mierniki „anti-AI" (nowe)

Czat AI odpowie na „jak to zrobić”. Nie da natomiast narzędzia, aktualnych cen ani decyzji
„co wybrać w moim przypadku”. Trzy mierniki w `scripts/pipeline/scores.mjs` to wychwytują:

| Miernik | Próg | Za co punkty |
|---|---|---|
| **Innowacyjność** | min. 60 | widget +30, tabela cen +15, tabela decyzyjna +10, kroki +8, ≥12 konkretnych wartości +12, sekcja granic/ryzyk +8, sekcja „wann Profi" +8, źródła +5 |
| **Wartość dla użytkownika** | min. 70 | odpowiedź w pierwszych 60 słowach +20, „najważniejsze" +15, kroki/listy +15, FAQ +15, liczby w leadzie +10, FAQ z realnych pytań +10, ostrzeżenia +5 |
| **Szansa pozostania** | min. 55 | element interaktywny +30, ≥2 tabele +15, kroki +15, FAQ +10, >1000 słów +10, ≥6 sekcji +5, źródła +5 |
| **Odporny na AI** | wymagane | widget **i** tabela z cenami **i** ≥5 FAQ |

Walidator wypisuje rozbicie punktów, np.:

```
innowacyjność  88/100 → interaktywne narzędzie (lueftungs-check) +30, tabela z cenami +15, …
wartość        80/100 → odpowiedź w pierwszych 60 słowach +20, blok „najważniejsze" +15, …
pozostanie     90/100 → element interaktywny +30, min. 2 tabele +15, kroki do wykonania +15, …
```

### Ocena potencjału frazy (nowe)

Google zwraca SERP wyłącznie przez JavaScript — nie da się go pobrać automatycznie
(sprawdzone: 0 wyników w HTML). Dlatego moduł pracuje na danych, które mamy:

```powershell
# 1. realne dane z Search Console (pozycje, wyświetlenia, CTR)
node scripts/pipeline/opportunity.mjs --gsc "C:\...\Zapytania.csv"
#    → content/queue/_opportunities.md (ranking fraz z oceną i wnioskiem)

# 2. wklejony zrzut SERP (skopiuj 10 wyników z Google do pliku .txt)
node scripts/pipeline/opportunity.mjs --keyword "fugen erneuern" --serp serp.txt

# 3. ręczna ocena dla nowej frazy bez danych
node scripts/pipeline/opportunity.mjs --keyword "x" --write content/queue/x.json --score 45 --note "..."
```

Model oceny (0–100):

| Element | Waga | Logika |
|---|---|---|
| Wyświetlenia | do 45 pkt | logarytmicznie; 1000+ wyświetleń to maksimum |
| Pozycja | do 35 pkt | szczyt dla 11–20 („striking distance"), mniej dla 1–10 i dla 70+ |
| Luka CTR | do 20 pkt | różnica między realnym CTR a typowym dla tej pozycji |
| SERP | 0–100 | duże serwisy odejmują punkty, fora i małe blogi dodają |

Bramka **„potencjał frazy"** wymaga min. **25/100** i konkretnej wartości w `research.opportunityScore`.

### Bramki formalne

| Bramka | Próg |
|---|---|
| słowa | 1100–2600 |
| sekcje | 5–14 |
| tabele | min. 1 |
| listy / kroki | min. 1 |
| FAQ | min. 5 |
| źródła | min. 2 |
| linki wewnętrzne | min. 2 |
| linki zewnętrzne | max 2 |
| tytuł / description | 30–70 / 120–165 znaków, bez HTML |
| słowo kluczowe | w tytule, leadzie i min. jednym nagłówku |
| element angażujący | kalkulator (`widget`) lub link do `/ratgeber/…` |
| obraz | plik musi istnieć w `public/images`, alt min. 20 znaków |
| zakazane frazy | m.in. „Der wichtigste Begriff für diesen Ratgeber" |
| długość zdań | średnio max 24 słowa |

## Zasady

- `status` musi być `approved`, a `publishAt` nie może być w przyszłości.
- Publikacja nigdy nie nadpisuje istniejącego artykułu o tym samym slugu.
- Rollback: `git revert` + push (Vercel wdroży poprzednią wersję).
