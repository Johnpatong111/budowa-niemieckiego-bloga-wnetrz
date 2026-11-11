'use client'

import { useMemo, useState } from 'react'

const goals = [
  { value: 'ruhe', label: 'Ruhig und zurückhaltend' },
  { value: 'weite', label: 'Raum größer wirken lassen' },
  { value: 'waerme', label: 'Warm und gemütlich' },
] as const

const lights = [
  { value: 'nord', label: 'Nordzimmer (kühles Licht)' },
  { value: 'sued', label: 'Südzimmer (viel Sonne)' },
  { value: 'ostwest', label: 'Ost- oder Westzimmer' },
  { value: 'wenig', label: 'Wenig Tageslicht' },
] as const

const palettes = {
  ruhe: [
    { name: 'Salbei', hex: '#A8B5A2' },
    { name: 'Nebelgrau', hex: '#C3C7C4' },
    { name: 'Leinenweiß', hex: '#EFEAE2' },
  ],
  weite: [
    { name: 'Kaltweiß', hex: '#F4F6F5' },
    { name: 'Hellgrau-Blau', hex: '#CBD5D8' },
    { name: 'Sandleinen', hex: '#E7DFD3' },
  ],
  waerme: [
    { name: 'Terracotta', hex: '#C07B5A' },
    { name: 'Warmbeige', hex: '#DCC9B0' },
    { name: 'Oliv', hex: '#8A8B5C' },
  ],
} as const

export function FarbtonCheck() {
  const [goal, setGoal] = useState<'ruhe' | 'weite' | 'waerme'>('ruhe')
  const [light, setLight] = useState<'nord' | 'sued' | 'ostwest' | 'wenig'>('nord')

  const result = useMemo(() => {
    const palette = palettes[goal]
    const coolLight = light === 'nord' || light === 'wenig'
    const order = coolLight ? [...palette].reverse() : palette
    const note = coolLight
      ? 'Kühles oder knappes Tageslicht: warme Töne ausgleichen, Gelb- und Rottöne wirken hier natürlicher.'
      : 'Viel Tageslicht verträgt kühlere Töne – Grau und Blau wirken hier nicht trist.'
    return { colors: order, note }
  }, [goal, light])

  return (
    <section className="border border-[#292a24]/15 bg-[#eee8df] p-6 sm:p-8" aria-labelledby="farbtoncheck-heading">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ad613d]">Interaktiver Check</p>
      <h2 id="farbtoncheck-heading" className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">
        Welche Wandfarbe passt zu Ihrem Raum?
      </h2>
      <p className="mt-3 max-w-xl text-base leading-7 text-[#292a24]/70">
        Wirkung und Tageslicht entscheiden mehr als der Trend. Der Check schlägt drei Töne vor – als Startpunkt
        für ein Farbmuster, nicht als Kaufentscheidung.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Ziel
          <select
            value={goal}
            onChange={(event) => setGoal(event.target.value as 'ruhe' | 'weite' | 'waerme')}
            className="h-11 border border-[#292a24]/20 bg-[#f5f1eb] px-3 font-normal outline-none focus:border-[#ad613d]"
          >
            {goals.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Tageslicht
          <select
            value={light}
            onChange={(event) => setLight(event.target.value as 'nord' | 'sued' | 'ostwest' | 'wenig')}
            className="h-11 border border-[#292a24]/20 bg-[#f5f1eb] px-3 font-normal outline-none focus:border-[#ad613d]"
          >
            {lights.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-7 grid gap-4 border-t border-[#292a24]/15 pt-6 sm:grid-cols-3">
        {result.colors.map((color) => (
          <div key={color.name}>
            <div
              className="h-16 w-full border border-[#292a24]/10"
              style={{ backgroundColor: color.hex }}
              aria-hidden
            />
            <p className="mt-2 font-serif text-lg">{color.name}</p>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-[#292a24]/50">{color.hex}</p>
          </div>
        ))}
      </div>

      <p className="mt-5 text-sm leading-6 text-[#292a24]/70">{result.note}</p>
      <p className="mt-2 text-xs leading-5 text-[#292a24]/50">
        Bildschirmfarben weichen vom Anstrich ab. Testen Sie immer ein Muster von mindestens 50 × 50 cm an der
        echten Wand.
      </p>
    </section>
  )
}
