'use client'

import { useMemo, useState } from 'react'

const roomTypes = [
  { value: 'wohnzimmer', label: 'Wohnzimmer', lumens: 150 },
  { value: 'schlafzimmer', label: 'Schlafzimmer', lumens: 100 },
  { value: 'kueche', label: 'Küche', lumens: 200 },
  { value: 'bad', label: 'Bad', lumens: 200 },
  { value: 'arbeitszimmer', label: 'Arbeitszimmer', lumens: 300 },
  { value: 'flur', label: 'Flur', lumens: 100 },
]

export function LumenCalculator() {
  const [room, setRoom] = useState('wohnzimmer')
  const [area, setArea] = useState('20')
  const [lights, setLights] = useState('3')
  const result = useMemo(() => {
    const roomType = roomTypes.find((item) => item.value === room) ?? roomTypes[0]
    const squareMeters = Math.max(0, Number(area) || 0)
    const lightCount = Math.max(1, Number(lights) || 1)
    const total = Math.round(squareMeters * roomType.lumens)
    return { total, perLight: Math.ceil(total / lightCount), lightCount, roomType }
  }, [area, lights, room])

  return <section className="border border-[#292a24]/15 bg-[#eee8df] p-6 sm:p-8" aria-labelledby="calculator-heading">
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#ad613d]">Interaktiver Rechner</p>
        <h2 id="calculator-heading" className="font-serif text-3xl leading-tight sm:text-4xl">Ihre Lichtmenge auf einen Blick</h2>
        <p className="mt-4 text-base leading-7 text-[#292a24]/70">Geben Sie Raum und Fläche ein. Der Richtwert ist eine Orientierung für die Grundbeleuchtung.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <label className="grid gap-2 text-sm font-medium">Raum<select value={room} onChange={(event) => setRoom(event.target.value)} className="h-11 border border-[#292a24]/20 bg-[#f5f1eb] px-3 font-normal outline-none focus:border-[#ad613d]">{roomTypes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-medium">Fläche in m²<input type="number" min="1" max="500" value={area} onChange={(event) => setArea(event.target.value)} className="h-11 border border-[#292a24]/20 bg-[#f5f1eb] px-3 font-normal outline-none focus:border-[#ad613d]" /></label>
        <label className="grid gap-2 text-sm font-medium">Lichtquellen<input type="number" min="1" max="30" value={lights} onChange={(event) => setLights(event.target.value)} className="h-11 border border-[#292a24]/20 bg-[#f5f1eb] px-3 font-normal outline-none focus:border-[#ad613d]" /></label>
      </div>
    </div>
    <div className="mt-8 grid gap-4 border-t border-[#292a24]/15 pt-6 sm:grid-cols-3">
      <div><p className="text-xs uppercase tracking-[0.15em] text-[#292a24]/55">Empfehlung gesamt</p><p className="mt-1 font-serif text-4xl text-[#ad613d]">{result.total.toLocaleString('de-DE')} lm</p></div>
      <div><p className="text-xs uppercase tracking-[0.15em] text-[#292a24]/55">Pro Lichtquelle</p><p className="mt-1 font-serif text-4xl text-[#292a24]">{result.perLight.toLocaleString('de-DE')} lm</p></div>
      <p className="self-end text-sm leading-6 text-[#292a24]/65">Für ein {result.roomType.label} mit {area || 0} m² und {result.lightCount} Lichtquellen.</p>
    </div>
  </section>
}
