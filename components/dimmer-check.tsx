'use client'

import { useMemo, useState } from 'react'

const dimmerTypes = [
  { value: 'abschnitt', label: 'Phasenabschnitt / LED-Dimmer', risk: 0 },
  { value: 'anschnitt', label: 'Phasenanschnitt (älter)', risk: 25 },
  { value: 'universal', label: 'Universal-Dimmer', risk: 10 },
] as const

export function DimmerCheck() {
  const [count, setCount] = useState('3')
  const [watt, setWatt] = useState('5')
  const [minLoad, setMinLoad] = useState('20')
  const [type, setType] = useState<'abschnitt' | 'anschnitt' | 'universal'>('abschnitt')

  const result = useMemo(() => {
    const lamps = Math.max(1, Number(count) || 1)
    const wattPerLamp = Math.max(0.5, Number(watt.replace(',', '.')) || 5)
    const min = Math.max(0, Number(minLoad.replace(',', '.')) || 0)
    const total = Math.round(lamps * wattPerLamp * 10) / 10
    const missing = Math.max(0, Math.round((min - total) * 10) / 10)
    const risk = dimmerTypes.find((item) => item.value === type)?.risk ?? 0

    let verdict = 'unproblematisch'
    if (missing > 0) verdict = 'wahrscheinlich Flackern'
    else if (risk >= 25) verdict = 'Flackern möglich'

    const score = Math.min(100, Math.round((total / Math.max(min, 1)) * 60) + (risk >= 25 ? 0 : 25) + (risk === 10 ? 10 : 0))

    return { total, missing, verdict, risk, score }
  }, [count, watt, minLoad, type])

  const tone = result.missing > 0 ? 'text-[#a8432c]' : result.risk >= 25 ? 'text-[#ad613d]' : 'text-[#3f6b45]'

  return (
    <section className="border border-[#292a24]/15 bg-[#eee8df] p-6 sm:p-8" aria-labelledby="dimmercheck-heading">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ad613d]">Interaktiver Check</p>
      <h2 id="dimmercheck-heading" className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">
        Flackert Ihre LED wegen der Mindestlast?
      </h2>
      <p className="mt-3 max-w-xl text-base leading-7 text-[#292a24]/70">
        Geben Sie Leuchtmittel, Leistung und die Mindestlast Ihres Dimmers ein. Der Check zeigt, ob die
        Kombination technisch passt.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Anzahl Leuchtmittel am Dimmer
          <input
            type="number"
            min="1"
            max="30"
            value={count}
            onChange={(event) => setCount(event.target.value)}
            className="h-11 border border-[#292a24]/20 bg-[#f5f1eb] px-3 font-normal outline-none focus:border-[#ad613d]"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Leistung je Leuchtmittel (W)
          <input
            type="number"
            min="1"
            max="100"
            step="0.5"
            value={watt}
            onChange={(event) => setWatt(event.target.value)}
            className="h-11 border border-[#292a24]/20 bg-[#f5f1eb] px-3 font-normal outline-none focus:border-[#ad613d]"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Mindestlast des Dimmers (W)
          <input
            type="number"
            min="0"
            max="200"
            value={minLoad}
            onChange={(event) => setMinLoad(event.target.value)}
            className="h-11 border border-[#292a24]/20 bg-[#f5f1eb] px-3 font-normal outline-none focus:border-[#ad613d]"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Dimmer-Typ
          <select
            value={type}
            onChange={(event) => setType(event.target.value as 'abschnitt' | 'anschnitt' | 'universal')}
            className="h-11 border border-[#292a24]/20 bg-[#f5f1eb] px-3 font-normal outline-none focus:border-[#ad613d]"
          >
            {dimmerTypes.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-7 grid gap-4 border-t border-[#292a24]/15 pt-6 sm:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[#292a24]/55">Gesamtlast</p>
          <p className="mt-1 font-serif text-3xl text-[#292a24]">{result.total} W</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[#292a24]/55">Einschätzung</p>
          <p className={`mt-1 font-serif text-2xl ${tone}`}>{result.verdict}</p>
        </div>
        <p className="self-end text-sm leading-6 text-[#292a24]/65">
          {result.missing > 0
            ? `Es fehlen ${result.missing} W bis zur Mindestlast. Eine Grundlast oder ein LED-Dimmer löst das Problem.`
            : 'Die Last liegt im Arbeitsbereich. Flackert es trotzdem, prüfen Sie Dimmer-Typ und Leuchtmittel-Kompatibilität.'}
        </p>
      </div>

      <p className="mt-5 text-xs leading-5 text-[#292a24]/50">
        Richtwerte. Herstellerangaben zu Mindest- und Maximallast sowie Kompatibilitätslisten gehen vor.
      </p>
    </section>
  )
}
