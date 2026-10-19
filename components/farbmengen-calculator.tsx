'use client'

import { useMemo, useState } from 'react'

export function FarbmengenCalculator() {
  const [length, setLength] = useState('4')
  const [width, setWidth] = useState('3')
  const [height, setHeight] = useState('2.5')
  const [doors, setDoors] = useState('1')
  const [windows, setWindows] = useState('1')
  const [coats, setCoats] = useState('2')
  const [coverage, setCoverage] = useState('7')
  const [ceiling, setCeiling] = useState(false)

  const result = useMemo(() => {
    const l = Math.max(0, Number(length) || 0)
    const w = Math.max(0, Number(width) || 0)
    const h = Math.max(0, Number(height) || 0)
    const wallArea = Math.max(0, 2 * (l + w) * h - Math.max(0, Number(windows) || 0) * 1.5 - Math.max(0, Number(doors) || 0) * 2)
    const paintArea = wallArea + (ceiling ? l * w : 0)
    const liters = paintArea * Math.max(1, Number(coats) || 1) / Math.max(1, Number(coverage) || 7) * 1.1
    const packageSize = liters <= 2.5 ? 2.5 : liters <= 5 ? 5 : liters <= 10 ? 10 : 12.5
    return { wallArea, liters, packageSize }
  }, [length, width, height, doors, windows, coats, coverage, ceiling])

  const inputClass = 'h-11 border border-[#292a24]/20 bg-[#f5f1eb] px-3 font-normal outline-none focus:border-[#ad613d]'
  return <section className="border border-[#292a24]/15 bg-[#eee8df] p-6 sm:p-8" aria-labelledby="paint-calculator-heading">
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
      <div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#ad613d]">Interaktiver Rechner</p><h2 id="paint-calculator-heading" className="font-serif text-3xl leading-tight sm:text-4xl">Ihre Farbmenge auf einen Blick</h2><p className="mt-4 text-base leading-7 text-[#292a24]/70">Berechnen Sie Wandfläche, Farbbedarf und eine passende Gebindegröße inklusive 10 Prozent Reserve.</p></div>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="grid gap-2 text-sm font-medium">Länge in m<input aria-label="Länge in Metern" type="number" min="0" step="0.1" value={length} onChange={(e) => setLength(e.target.value)} className={inputClass} /></label>
        <label className="grid gap-2 text-sm font-medium">Breite in m<input aria-label="Breite in Metern" type="number" min="0" step="0.1" value={width} onChange={(e) => setWidth(e.target.value)} className={inputClass} /></label>
        <label className="grid gap-2 text-sm font-medium">Höhe in m<input aria-label="Raumhöhe in Metern" type="number" min="0" step="0.1" value={height} onChange={(e) => setHeight(e.target.value)} className={inputClass} /></label>
        <label className="grid gap-2 text-sm font-medium">Türen<input aria-label="Anzahl Türen" type="number" min="0" value={doors} onChange={(e) => setDoors(e.target.value)} className={inputClass} /></label>
        <label className="grid gap-2 text-sm font-medium">Fenster<input aria-label="Anzahl Fenster" type="number" min="0" value={windows} onChange={(e) => setWindows(e.target.value)} className={inputClass} /></label>
        <label className="grid gap-2 text-sm font-medium">Anstriche<select aria-label="Anzahl Anstriche" value={coats} onChange={(e) => setCoats(e.target.value)} className={inputClass}><option value="1">1 Anstrich</option><option value="2">2 Anstriche</option><option value="3">3 Anstriche</option></select></label>
        <label className="grid gap-2 text-sm font-medium">Ergiebigkeit m²/l<input aria-label="Ergiebigkeit in Quadratmetern pro Liter" type="number" min="1" step="0.5" value={coverage} onChange={(e) => setCoverage(e.target.value)} className={inputClass} /></label>
        <label className="flex items-center gap-3 self-end pb-3 text-sm font-medium"><input type="checkbox" checked={ceiling} onChange={(e) => setCeiling(e.target.checked)} className="size-4 accent-[#ad613d]" /> Decke mitstreichen</label>
      </div>
    </div>
    <div className="mt-8 grid gap-4 border-t border-[#292a24]/15 pt-6 sm:grid-cols-3"><div><p className="text-xs uppercase tracking-[0.15em] text-[#292a24]/55">Wandfläche</p><p className="mt-1 font-serif text-4xl text-[#292a24]">{result.wallArea.toLocaleString('de-DE', { maximumFractionDigits: 1 })} m²</p></div><div><p className="text-xs uppercase tracking-[0.15em] text-[#292a24]/55">Farbbedarf inkl. Reserve</p><p className="mt-1 font-serif text-4xl text-[#ad613d]">{result.liters.toLocaleString('de-DE', { maximumFractionDigits: 1 })} l</p></div><div><p className="text-xs uppercase tracking-[0.15em] text-[#292a24]/55">Empfohlenes Gebinde</p><p className="mt-1 font-serif text-4xl text-[#292a24]">{result.packageSize.toLocaleString('de-DE')} l</p></div></div>
  </section>
}
