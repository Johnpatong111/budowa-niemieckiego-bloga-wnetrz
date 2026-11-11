'use client'

import { useMemo, useState } from 'react'

const windowTypes = [
  { value: 'fluegel', label: 'Flügelfenster (ganz öffnen)', minutes: 5 },
  { value: 'kipp', label: 'Kippfenster', minutes: 12 },
] as const

export function LueftungsCheck() {
  const [area, setArea] = useState('20')
  const [persons, setPersons] = useState('2')
  const [type, setType] = useState<'fluegel' | 'kipp'>('fluegel')
  const [humidity, setHumidity] = useState<'normal' | 'hoch'>('normal')

  const result = useMemo(() => {
    const squareMeters = Math.max(5, Number(area.replace(',', '.')) || 20)
    const people = Math.max(1, Number(persons) || 1)
    const base = windowTypes.find((item) => item.value === type)?.minutes ?? 5

    let minutes = base
    if (squareMeters > 25) minutes += 2
    if (people > 2) minutes += 1

    let perDay = 3
    if (people > 2) perDay += 1
    if (humidity === 'hoch') perDay += 1

    const cross = squareMeters > 20 && type === 'fluegel'
    return { minutes, perDay, cross, squareMeters, people }
  }, [area, persons, type, humidity])

  return (
    <section className="border border-[#292a24]/15 bg-[#eee8df] p-6 sm:p-8" aria-labelledby="lueftungscheck-heading">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ad613d]">Interaktiver Check</p>
      <h2 id="lueftungscheck-heading" className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">
        Wie lange müssen Sie lüften?
      </h2>
      <p className="mt-3 max-w-xl text-base leading-7 text-[#292a24]/70">
        Raumgröße, Personenzahl und Fenstertyp bestimmen Dauer und Häufigkeit. Die Werte sind Richtwerte für
        Wohnräume ohne Lüftungsanlage.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Raumfläche in m²
          <input
            type="number"
            min="5"
            max="120"
            value={area}
            onChange={(event) => setArea(event.target.value)}
            className="h-11 border border-[#292a24]/20 bg-[#f5f1eb] px-3 font-normal outline-none focus:border-[#ad613d]"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Personen im Haushalt
          <input
            type="number"
            min="1"
            max="10"
            value={persons}
            onChange={(event) => setPersons(event.target.value)}
            className="h-11 border border-[#292a24]/20 bg-[#f5f1eb] px-3 font-normal outline-none focus:border-[#ad613d]"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Fenstertyp
          <select
            value={type}
            onChange={(event) => setType(event.target.value as 'fluegel' | 'kipp')}
            className="h-11 border border-[#292a24]/20 bg-[#f5f1eb] px-3 font-normal outline-none focus:border-[#ad613d]"
          >
            {windowTypes.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Feuchtigkeit
          <select
            value={humidity}
            onChange={(event) => setHumidity(event.target.value as 'normal' | 'hoch')}
            className="h-11 border border-[#292a24]/20 bg-[#f5f1eb] px-3 font-normal outline-none focus:border-[#ad613d]"
          >
            <option value="normal">Normal (40–55 %)</option>
            <option value="hoch">Hoch (über 60 %)</option>
          </select>
        </label>
      </div>

      <div className="mt-7 grid gap-4 border-t border-[#292a24]/15 pt-6 sm:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[#292a24]/55">Dauer pro Lüften</p>
          <p className="mt-1 font-serif text-3xl text-[#ad613d]">{result.minutes} Minuten</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[#292a24]/55">Häufigkeit</p>
          <p className="mt-1 font-serif text-3xl text-[#292a24]">{result.perDay}× täglich</p>
        </div>
        <p className="self-end text-sm leading-6 text-[#292a24]/65">
          {result.cross
            ? 'Bei dieser Raumgröße lohnt Querlüften mit gegenüberliegenden Fenstern – das halbiert die Zeit.'
            : 'Einzelfenster reicht bei dieser Größe; bei mehreren Personen öfter lüften.'}
        </p>
      </div>

      <p className="mt-5 text-xs leading-5 text-[#292a24]/50">
        Richtwerte für Räume bis 2,80 m Höhe. Bei Lüftungsanlage oder dauerhaft gekippten Fenstern gelten andere
        Werte.
      </p>
    </section>
  )
}
