<#
.SYNOPSIS
  Download an image, resize it for the web and store it in public/images/<slug>.jpg

.DESCRIPTION
  Works with direct image URLs, e.g. the ones you get in Unsplash via
  right click > "Copy image address" (images.unsplash.com/photo-...?w=1600).

.EXAMPLE
  .\scripts\add-image.ps1 -Slug fugen-erneuern -Url "https://images.unsplash.com/photo-1234567890-abcdef?w=1600&q=80"

.NOTES
  After running, update the registry entry in lib/articles.ts with the printed path.
#>
param(
  [Parameter(Mandatory = $true)][string]$Slug,
  [Parameter(Mandatory = $true)][string]$Url,
  [int]$MaxWidth = 1400,
  [int]$Quality = 82,
  [string]$UserAgent = 'raumgefuehl-blog/1.0 (https://www.lotse-strassenbeleuchtung.de; johnpatong111@gmail.com)'
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$imagesDir = Join-Path $root 'public\images'
if (-not (Test-Path -LiteralPath $imagesDir)) { New-Item -ItemType Directory -Path $imagesDir | Out-Null }

$tmp = Join-Path ([System.IO.Path]::GetTempPath()) ('img_' + [guid]::NewGuid().ToString('N') + '.bin')

Invoke-WebRequest -Uri $Url -OutFile $tmp -UseBasicParsing -TimeoutSec 60 `
  -Headers @{ 'User-Agent' = $UserAgent }

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
Write-Output ("OK  {0}  ({1}x{2}, {3} KB)" -f $out, $width, $height, $kb)
Write-Output ""
Write-Output "Eintrag in lib/articles.ts:"
Write-Output ("  image: '/images/{0}.jpg'," -f $Slug)
Write-Output "  imageAlt: '<kurze Beschreibung des Bildes>',"
