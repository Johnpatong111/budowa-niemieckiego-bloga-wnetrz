<#
.SYNOPSIS
  Optimizes every image in public/images: max 1400 px wide, JPEG, quality 82.

.DESCRIPTION
  Use this after dropping photos into public/images manually
  (e.g. downloaded from Unsplash via the "Download free" button).
  Files already small enough are skipped.

.EXAMPLE
  powershell -NoProfile -ExecutionPolicy Bypass -File scripts\optimize-images.ps1

.EXAMPLE
  powershell -NoProfile -ExecutionPolicy Bypass -File scripts\optimize-images.ps1 -Force
#>
param(
  [switch]$Force,
  [int]$MaxWidth = 1400,
  [int]$Quality = 82
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$imagesDir = Join-Path $root 'public\images'
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }

function Convert-ToWebJpeg {
  param([string]$Path, [string]$TargetPath)

  $img = [System.Drawing.Image]::FromFile($Path)
  try {
    $width = [int]([Math]::Min($MaxWidth, $img.Width))
    $height = [int]($img.Height * ($width / $img.Width))

    $bmp = New-Object System.Drawing.Bitmap($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($img, 0, 0, $width, $height)

    $encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)
    $bmp.Save($TargetPath, $codec, $encParams)
    $bmp.Dispose()
    $g.Dispose()

    return "$width x $height"
  } finally {
    $img.Dispose()
  }
}

$files = Get-ChildItem -LiteralPath $imagesDir -File | Where-Object { $_.Extension -match '^\.(jpg|jpeg|png|webp)$' }
if ($files.Count -eq 0) { Write-Output 'Keine Bilder gefunden.'; return }

foreach ($file in $files) {
  $target = [System.IO.Path]::ChangeExtension($file.FullName, '.jpg')
  $tooBig = $file.Length -gt 250KB
  $wrongFormat = $file.Extension -notmatch '^\.jpe?g$'

  if (-not $Force -and -not $tooBig -and -not $wrongFormat) {
    Write-Output ("SKIP  {0}  ({1} KB)" -f $file.Name, [math]::Round($file.Length / 1KB))
    continue
  }

  $before = [math]::Round($file.Length / 1KB)
  $dims = Convert-ToWebJpeg -Path $file.FullName -TargetPath $target
  if ($file.FullName -ne $target) { Remove-Item -LiteralPath $file.FullName -Force }
  $after = [math]::Round((Get-Item -LiteralPath $target).Length / 1KB)
  Write-Output ("OK    {0}  {1} KB -> {2} KB  ({3})" -f (Split-Path $target -Leaf), $before, $after, $dims)
}

Write-Output ''
Write-Output 'Fertig. Denke daran: Dateiname = Slug in lib/articles.ts (z. B. fugen-erneuern.jpg).'
