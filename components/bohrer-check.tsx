'use client'

import { useMemo, useState } from 'react'

const tiles = [
  { value: 'steinzeug', label: 'Steinzeug / Keramik', risk: 20 },
  { value: 'feinsteinzeug', label: 'Feinsteinzeug (hartgebrannt)', risk: 45 },
  { value: 'naturstein', label: 'Naturstein / Marmor', risk: 35 },
] as const

export function BohrerCheck() {
  const [tile, setTile] = useState<'steinzeug' | 'feinsteinzeug' | 'naturstein'>('feinsteinzeug')
  const [diameter, setDiameter] = useState('6')
  const [hammer, setHammer] = useState(false)

  const result = useMemo(() => {
    const selected = tiles.find((item) => item.value === tile) ?? tiles[0]
    const mm = Math.max(3, Math.min(12, Number(diameter) || 6))
    let risk = selected.risk + (hammer ? 40 : 0) + (mm > 8 ? 10 : 0)
    risk = Math.min(100, risk)
    const verdict = risk >= 60 ? 'hohes Risiko' : risk >= 35 ? 'mittel' : 'unkritisch'
    const drill = mm <= 8 ? 'HM-Fliesenbohrer 6–8 mm' : 'HM-Fliesenbohrer + Diamantbohrer für große Durchmesser'
    return { risk, verdict, drill, mm }
  }, [tile, diameter, hammer])

  const tone = result.risk >= 60 ? 'text-[#a8432c]' : result.risk >= 35 ? 'text-[#ad613d]' : 'text-[#3f6b45]'

  return (
    <section className="border border-[#292a24]/15 bg-[#eee8df] p-6 sm:p-8" aria-labelledby="bohrercheck-heading">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ad613d]">Interaktiver Check</p>
      <h2 id="bohrercheck-heading" className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">
        Welcher Bohrer für Ihre Fliese?
      </h2>
      <p className="mt-3 max-w-xl text-base leading-7 text-[#292a24]/70">
        Fliesenart, Durchmesser und Schlagfunktion entscheiden, ob die Fliese hält. Der Check nennt Bohrer und
        Risiko.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Fliesenart
          <select
            value={tile}
            onChange={(event) => setTile(event.target.value as 'steinzeug' | 'feinsteinzeug' | 'naturstein')}
            className="h-11 border border-[#292a24]/20 bg-[#f5f1eb] px-3 font-normal outline-none focus:border-[#ad613d]"
          >
            {tiles.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Bohrerdurchmesser (mm)
          <input
            type="number"
            min="3"
            max="12"
            value={diameter}
            onChange={(event) => setDiameter(event.target.value)}
            className="h-11 border border-[#292a24]/20 bg-[#f5f1eb] px-3 font-normal outline-none focus:border-[#ad613d]"
          />
        </label>
        <label className="flex items-end gap-2 pb-3 text-sm font-medium sm:col-span-2">
          <input type="checkbox" checked={hammer} onChange={(event) => setHammer(event.target.checked)} />
          Schlagfunktion eingeschaltet
        </label>
      </div>

      <div className="mt-7 grid gap-4 border-t border-[#292a24]/15 pt-6 sm:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[#292a24]/55">Risiko</p>
          <p className={`mt-1 font-serif text-2xl ${tone}`}>{result.verdict}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[#292a24]/55">Empfohlener Bohrer</p>
          <p className="mt-1 text-base leading-6 text-[#292a24]">{result.drill}</p>
        </div>
        <p className="self-end text-sm leading-6 text-[#292a24]/65">
          {hammer
            ? 'Schlag ausschalten: Er ist der häufigste Grund für geplatzte Fliesen.'
            : 'Ohne Schlag und mit wenig Druck arbeiten – Geduld ist hier Werkzeug.'}
        </p>
      </div>

      <p className="mt-5 text-xs leading-5 text-[#292a24]/50">
        Richtwerte. Bei Bodenfliesen mit Fußbodenheizung vorher prüfen, wo die Heizleitungen liegen.
      </p>
    </section>
  )
}
