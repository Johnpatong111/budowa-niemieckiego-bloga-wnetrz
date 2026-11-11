'use client'

import { useMemo, useState } from 'react'

const hardnessLevels = [
  { value: 'weich', label: 'Weich (bis 8,5 °dH)', weeks: 4 },
  { value: 'mittel', label: 'Mittel (8,5–14 °dH)', weeks: 2 },
  { value: 'hart', label: 'Hart (über 14 °dH)', weeks: 1 },
] as const

export function KalkCheck() {
  const [hardness, setHardness] = useState<'weich' | 'mittel' | 'hart'>('mittel')
  const [glass, setGlass] = useState(true)
  const [tap, setTap] = useState(true)

  const result = useMemo(() => {
    const level = hardnessLevels.find((item) => item.value === hardness) ?? hardnessLevels[1]
    let weeks: number = level.weeks
    if (glass) weeks = Math.max(1, weeks - 1)
    if (tap) weeks = Math.max(1, Math.round(weeks * 0.75))
    const interval = weeks === 1 ? 'jede Woche' : `alle ${weeks} Wochen`
    const intensity = weeks <= 1 ? '10–20 Minuten einweichen' : '5–10 Minuten einwirken lassen'
    return { interval, intensity, label: level.label }
  }, [hardness, glass, tap])

  return (
    <section className="border border-[#292a24]/15 bg-[#eee8df] p-6 sm:p-8" aria-labelledby="kalkcheck-heading">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ad613d]">Interaktiver Check</p>
      <h2 id="kalkcheck-heading" className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">
        Wie oft müssen Sie entkalken?
      </h2>
      <p className="mt-3 max-w-xl text-base leading-7 text-[#292a24]/70">
        Wasserhärte und die Zahl der gefährdeten Flächen bestimmen den Rhythmus. Die Empfehlung ist ein
        Erfahrungswert, kein Messergebnis.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Wasserhärte
          <select
            value={hardness}
            onChange={(event) => setHardness(event.target.value as 'weich' | 'mittel' | 'hart')}
            className="h-11 border border-[#292a24]/20 bg-[#f5f1eb] px-3 font-normal outline-none focus:border-[#ad613d]"
          >
            {hardnessLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-2 text-sm font-medium">
          Betroffene Flächen
          <label className="flex items-center gap-2 font-normal">
            <input type="checkbox" checked={tap} onChange={(event) => setTap(event.target.checked)} />
            Armatur und Waschbecken
          </label>
          <label className="flex items-center gap-2 font-normal">
            <input type="checkbox" checked={glass} onChange={(event) => setGlass(event.target.checked)} />
            Duschglas und Fliesen
          </label>
        </div>
      </div>

      <div className="mt-7 grid gap-4 border-t border-[#292a24]/15 pt-6 sm:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[#292a24]/55">Empfohlener Rhythmus</p>
          <p className="mt-1 font-serif text-3xl text-[#ad613d]">{result.interval}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[#292a24]/55">Einwirkzeit</p>
          <p className="mt-1 font-serif text-3xl text-[#292a24]">{result.intensity}</p>
        </div>
        <p className="self-end text-sm leading-6 text-[#292a24]/65 sm:col-span-2">
          Grundlage: {result.label}. Bei hartem Wasser über 14 °dH lohnt zusätzlich ein enthärtender Duschkopf –
          sonst bleibt der Rhythmus eng.
        </p>
      </div>
    </section>
  )
}
