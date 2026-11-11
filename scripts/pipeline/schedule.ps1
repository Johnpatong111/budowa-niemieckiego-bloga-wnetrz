# Wrapper dla Harmonogramu zadań Windows.
# Uruchamiaj co 20-30 minut — publikacja następuje dopiero, gdy minie losowy odstęp 24-48 h.
#
# Rejestracja zadania (raz, w PowerShellu jako administrator NIE jest wymagane):
#   $action  = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$PWD\scripts\pipeline\schedule.ps1`""
#   $trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(5) -RepetitionInterval (New-TimeSpan -Minutes 25)
#   Register-ScheduledTask -TaskName "raumgefuehl-content" -Action $action -Trigger $trigger -Description "Publikuje zatwierdzone artykuly"

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
Set-Location $root

$statePath = Join-Path $root '.pipeline-state.json'
$logPath = Join-Path $root '.pipeline.log'

function Write-Log([string]$message) {
  $line = "{0} {1}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $message
  Add-Content -LiteralPath $logPath -Value $line -Encoding UTF8
}

$state = $null
if (Test-Path -LiteralPath $statePath) {
  try { $state = Get-Content -LiteralPath $statePath -Raw | ConvertFrom-Json } catch { $state = $null }
}

$intervalHours = 24
$lastPublish = (Get-Date).AddDays(-30)

if ($state) {
  if ($state.nextIntervalHours) { $intervalHours = [double]$state.nextIntervalHours }
  if ($state.lastPublish) { $lastPublish = [datetime]$state.lastPublish }
}

$due = $lastPublish.AddHours($intervalHours)
if ((Get-Date) -lt $due) {
  Write-Log ("czekam — następna publikacja po {0}" -f $due.ToString('yyyy-MM-dd HH:mm'))
  exit 0
}

Write-Log ("start publikacji (interwał {0} h, ostatnia {1})" -f $intervalHours, $lastPublish.ToString('yyyy-MM-dd HH:mm'))

$output = & node "scripts/pipeline/publish.mjs" 2>&1
$code = $LASTEXITCODE
foreach ($line in $output) { Write-Log ("  " + $line) }

if ($code -eq 0) {
  Write-Log 'publikacja OK'
} else {
  Write-Log ("brak publikacji (kod $code) — kolejna próba za 25 min")
}

# Po udanej publikacji ustaw nowy losowy interwał (24-48 h)
if ($code -eq 0 -and (Test-Path -LiteralPath $statePath)) {
  try {
    $fresh = Get-Content -LiteralPath $statePath -Raw | ConvertFrom-Json
    if (-not $fresh.nextIntervalHours) {
      $fresh | Add-Member -NotePropertyName nextIntervalHours -NotePropertyValue (24 + (Get-Random -Minimum 0 -Maximum 25)) -Force
      $fresh | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $statePath -Encoding UTF8
    }
    Write-Log ("następny interwał: {0} h" -f $fresh.nextIntervalHours)
  } catch { Write-Log 'nie udało się zaktualizować stanu' }
}
