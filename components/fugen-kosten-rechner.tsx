'use client'

import { useMemo, useState } from 'react'

const variants = [
  { value: 'diy', label: 'Selbst machen', min: 2, max: 4, fixedMin: 0, fixedMax: 0 },
  { value: 'pro', label: 'Fachbetrieb', min: 8, max: 15, fixedMin: 150, fixedMax: 300 },
] as const

export function FugenKostenRechner() {
  const [meters, setMeters] = useState('12')
  const [variant, setVariant] = useState<'diy' | 'pro'>('diy')

  const result = useMemo(() => {
    const selected = variants.find((item) => item.value === variant) ?? variants[0]
    const length = Math.max(0, Number(meters.replace(',', '.')) || 0)
    const low = Math.max(selected.fixedMin, Math.round(length * selected.min))
    const high = Math.max(selected.fixedMax, Math.round(length * selected.max))
    const minutes = Math.round(length * 15)
    return { low, high, minutes, label: selected.label, length }
  }, [meters, variant])

  const euro = (value: number) =>
    new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value)

  return (
    <section className="border border-[#292a24]/15 bg-[#eee8df] p-6 sm:p-8" aria-labelledby="fugenrechner-heading">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ad613d]">Interaktiver Rechner</p>
      <h2 id="fugenrechner-heading" className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">
        Was kostet Ihre Fugensanierung?
      </h2>
      <p className="mt-3 max-w-xl text-base leading-7 text-[#292a24]/70">
        Laufende Meter eingeben und zwischen Eigenleistung und Fachbetrieb wählen. Die Werte sind
        Erfahrungswerte, keine Angebote.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Laufende Meter Fuge
          <input
            type="number"
            min="1"
            max="200"
            inputMode="decimal"
            value={meters}
            onChange={(event) => setMeters(event.target.value)}
            className="h-11 border border-[#292a24]/20 bg-[#f5f1eb] px-3 font-normal outline-none focus:border-[#ad613d]"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Variante
          <select
            value={variant}
            onChange={(event) => setVariant(event.target.value as 'diy' | 'pro')}
            className="h-11 border border-[#292a24]/20 bg-[#f5f1eb] px-3 font-normal outline-none focus:border-[#ad613d]"
          >
            {variants.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-7 grid gap-4 border-t border-[#292a24]/15 pt-6 sm:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[#292a24]/55">Kostenrahmen</p>
          <p className="mt-1 font-serif text-3xl text-[#ad613d]">
            {euro(result.low)} – {euro(result.high)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[#292a24]/55">Zeitaufwand</p>
          <p className="mt-1 font-serif text-3xl text-[#292a24]">
            {variant === 'diy' ? `ca. ${Math.max(30, result.minutes)} Min.` : '1 Termin'}
          </p>
        </div>
        <p className="self-end text-sm leading-6 text-[#292a24]/65">
          Für {result.length || 0} m Fuge bei „{result.label}". Bei Fachbetrieben kommt die Mindestpauschale von
          150–300 € zum Tragen, wenn die Fläche klein ist.
        </p>
      </div>

      <p className="mt-5 text-xs leading-5 text-[#292a24]/50">
        Richtwerte für Deutschland, Stand November 2026. Regionale Preise können um bis zu 30 % abweichen. Der
        Rechner ersetzt kein Angebot.
      </p>
    </section>
  )
}
