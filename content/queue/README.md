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
