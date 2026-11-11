<#
.SYNOPSIS
  Search Pixabay and download a photo straight into public/images.

.DESCRIPTION
  Needs a free Pixabay API key: https://pixabay.com/api/docs/
  Store it once as environment variable (recommended):

      setx PIXABAY_API_KEY "12345678-abcdef..."

  or pass it with -ApiKey. Pixabay license: free for commercial use,
  no attribution required (credit is still nice and is written to CREDITS.md).

.EXAMPLE
  # 1) search and list candidates
  powershell -NoProfile -ExecutionPolicy Bypass -File scripts\pixabay-images.ps1 -Query "badezimmer fliesen"

.EXAMPLE
  # 2) download candidate no. 3 for the article "fugen-erneuern"
  powershell -NoProfile -ExecutionPolicy Bypass -File scripts\pixabay-images.ps1 -Query "badezimmer fliesen" -Slug fugen-erneuern -Pick 3
#>
param(
  [Parameter(Mandatory = $true)][string]$Query,
  [string]$Slug,
  [switch]$Search,
  [int]$Pick = 0,
  [int]$PerPage = 15,
  [ValidateSet('horizontal', 'vertical', 'all')][string]$Orientation = 'horizontal',
  [string]$ApiKey = $env:PIXABAY_API_KEY,
  [int]$MaxWidth = 1400,
  [int]$Quality = 82
)

$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

# Fallback: der Key wird direkt aus der Registry gelesen, damit "setx" sofort wirkt
# (auch wenn die aktuelle Shell noch die alte Umgebung hat).
if ([string]::IsNullOrWhiteSpace($ApiKey)) {
  $ApiKey = [Environment]::GetEnvironmentVariable('PIXABAY_API_KEY', 'User')
}
if ([string]::IsNullOrWhiteSpace($ApiKey)) {
  $ApiKey = [Environment]::GetEnvironmentVariable('PIXABAY_API_KEY', 'Machine')
}

if ([string]::IsNullOrWhiteSpace($ApiKey)) {
  Write-Output 'Kein API-Key gefunden.'
  Write-Output ''
  Write-Output 'So bekommst du einen (kostenlos, 1 Minute):'
  Write-Output '  1. https://pixabay.com/api/docs/ öffnen und einloggen'
  Write-Output '  2. Key kopieren (Format: 12345678-abcdef1234567890abcdef12)'
  Write-Output '  3. Einmalig speichern:  setx PIXABAY_API_KEY "DEIN_KEY"'
  Write-Output '  4. Terminal neu öffnen und das Skript erneut starten'
  Write-Output ''
  Write-Output 'Alternativ direkt: -ApiKey "DEIN_KEY"'
  return
}

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$imagesDir = Join-Path $root 'public\images'
if (-not (Test-Path -LiteralPath $imagesDir)) { New-Item -ItemType Directory -Path $imagesDir | Out-Null }
$creditsPath = Join-Path $imagesDir 'CREDITS.md'

$url = 'https://pixabay.com/api/?key={0}&q={1}&image_type=photo&orientation={2}&safesearch=true&per_page={3}&lang=de' -f `
  $ApiKey, [uri]::EscapeDataString($Query), $Orientation, $PerPage

try {
  $res = Invoke-RestMethod -Uri $url -Method Get -TimeoutSec 30
} catch {
  $code = $_.Exception.Response.StatusCode.value__
  Write-Output "Pixabay antwortet mit HTTP $code."
  if ($code -eq 400) { Write-Output 'Meistens ist der API-Key falsch oder noch nicht aktiv.' }
  if ($code -eq 429) { Write-Output 'Rate limit erreicht (100 Anfragen pro Minute). Kurz warten.' }
  return
}

$hits = @($res.hits)
if ($hits.Count -eq 0) {
  Write-Output "Keine Treffer für '$Query'. Andere Begriffe probieren (z. B. englisch: 'bathroom tiles')."
  return
}

Write-Output ("{0} Treffer für '{1}' – Gesamt: {2}" -f $hits.Count, $Query, $res.totalHits)
Write-Output ''
$i = 0
foreach ($hit in $hits) {
  $i++
  $tags = $hit.tags
  if ($tags.Length -gt 60) { $tags = $tags.Substring(0, 60) + '…' }
  Write-Output ("[{0,2}] {1}x{2}  {3}" -f $i, $hit.imageWidth, $hit.imageHeight, $tags)
  Write-Output ("      von {0} – {1}" -f $hit.user, $hit.pageURL)
}

if ($Search -or $Pick -le 0) {
  Write-Output ''
  Write-Output 'Download: gleiches Kommando mit  -Slug <slug> -Pick <nummer>'
  return
}

if ([string]::IsNullOrWhiteSpace($Slug)) {
  Write-Output ''
  Write-Output 'Fehler: -Slug fehlt (z. B. -Slug fugen-erneuern).'
  return
}

if ($Pick -gt $hits.Count) {
  Write-Output "Fehler: nur $($hits.Count) Treffer, -Pick $Pick gibt es nicht."
  return
}

$hit = $hits[$Pick - 1]
$src = if ($hit.largeImageURL) { $hit.largeImageURL } else { $hit.webformatURL }
$tmp = Join-Path ([System.IO.Path]::GetTempPath()) ('pixabay_' + $hit.id + '.jpg')

Invoke-WebRequest -Uri $src -OutFile $tmp -UseBasicParsing -TimeoutSec 60 -Headers @{
  'User-Agent' = 'raumgefuehl-blog/1.0 (https://www.lotse-strassenbeleuchtung.de)'
  'Referer'    = 'https://pixabay.com/'
}

$img = [System.Drawing.Image]::FromFile($tmp)
$width = [int]([Math]::Min($MaxWidth, $img.Width))
$height = [int]($img.Height * ($width / $img.Width))
$bmp = New-Object System.Drawing.Bitmap($width, $height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.DrawImage($img, 0, 0, $width, $height)
$img.Dispose()

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)

$out = Join-Path $imagesDir ($Slug + '.jpg')
$bmp.Save($out, $codec, $encParams)
$bmp.Dispose()
$g.Dispose()
Remove-Item -LiteralPath $tmp -Force

$kb = [math]::Round((Get-Item -LiteralPath $out).Length / 1KB)
$credit = "- {0}.jpg – Foto: {1} / Pixabay ({2})" -f $Slug, $hit.user, $hit.pageURL

if (-not (Test-Path -LiteralPath $creditsPath)) {
  Set-Content -LiteralPath $creditsPath -Value "# Bildnachweise`n" -Encoding UTF8
}
Add-Content -LiteralPath $creditsPath -Value $credit -Encoding UTF8

Write-Output ''
Write-Output ("OK  {0}  ({1}x{2}, {3} KB)" -f $out, $width, $height, $kb)
Write-Output ''
Write-Output 'Eintrag in lib/articles.ts:'
Write-Output ("  image: '/images/{0}.jpg'," -f $Slug)
Write-Output ("  imageAlt: '{0}'," -f ($hit.tags -replace ',', ' –'))
Write-Output ''
Write-Output ("Bildnachweis gespeichert in public/images/CREDITS.md: {0}" -f $credit)
