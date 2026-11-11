'use client'

import { useMemo, useState } from 'react'

const rooms = [
  { value: 'wohnen', label: 'Wohnzimmer / Schlafzimmer', wet: false },
  { value: 'kueche', label: 'Küche', wet: false },
  { value: 'bad', label: 'Bad ohne bodengleiche Dusche', wet: true },
  { value: 'bad-dusche', label: 'Bad mit bodengleicher Dusche', wet: true },
  { value: 'flur', label: 'Flur / Diele', wet: false },
] as const

export function BodenCheck() {
  const [room, setRoom] = useState<'wohnen' | 'kueche' | 'bad' | 'bad-dusche' | 'flur'>('wohnen')
  const [traffic, setTraffic] = useState<'normal' | 'hoch'>('normal')
  const [heated, setHeated] = useState(false)

  const result = useMemo(() => {
    const selected = rooms.find((item) => item.value === room) ?? rooms[0]
    if (selected.value === 'bad-dusche') {
      return {
        verdict: 'Fliesen',
        reason:
          'Bodengleiche Duschen brauchen eine wasserdichte Fläche mit Gefälle. Vinyl ist dort riskant, auch wenn es als feuchtraumgeeignet verkauft wird.',
        tone: 'text-[#a8432c]',
      }
    }
    if (selected.value === 'bad') {
      return {
        verdict: 'Vinyl nur verklebt',
        reason:
          'Im Bad ohne Bodenablauf funktioniert Vinyl, wenn es vollflächig verklebt und für Feuchträume freigegeben ist. Schwimmend verlegt bleibt Wasser in den Fugen.',
        tone: 'text-[#ad613d]',
      }
    }
    if (traffic === 'hoch' || heated) {
      return {
        verdict: 'Vinyl geklebt oder Fliesen',
        reason: traffic === 'hoch'
          ? 'Bei viel Verkehr leidet die Nutzschicht. Verklebt hält Vinyl länger; bei jahrzehntelanger Nutzung bleiben Fliesen die robustere Wahl.'
          : 'Auf Fußbodenheizung ist Vinyl möglich, braucht aber einen dafür freigegebenen Aufbau und langsame Aufheizphasen.',
        tone: 'text-[#ad613d]',
      }
    }
    return {
      verdict: 'Vinyl passend',
      reason:
        'Für Wohnräume mit normalem Verkehr ist Vinyl in Fliesenoptik eine pragmatische Lösung: warm, fugenarm, schnell verlegt. Auf Nutzschicht und Prüfsiegel achten.',
      tone: 'text-[#3f6b45]',
    }
  }, [room, traffic, heated])

  return (
    <section className="border border-[#292a24]/15 bg-[#eee8df] p-6 sm:p-8" aria-labelledby="bodencheck-heading">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ad613d]">Interaktiver Check</p>
      <h2 id="bodencheck-heading" className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">
        Passt Vinyl in Fliesenoptik zu Ihrem Raum?
      </h2>
      <p className="mt-3 max-w-xl text-base leading-7 text-[#292a24]/70">
        Raum, Nutzung und Fußbodenheizung entscheiden, ob Vinyl sinnvoll ist oder ob Fliesen die bessere Wahl
        bleiben.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Raum
          <select
            value={room}
            onChange={(event) => setRoom(event.target.value as 'wohnen' | 'kueche' | 'bad' | 'bad-dusche' | 'flur')}
            className="h-11 border border-[#292a24]/20 bg-[#f5f1eb] px-3 font-normal outline-none focus:border-[#ad613d]"
          >
            {rooms.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Nutzung
          <select
            value={traffic}
            onChange={(event) => setTraffic(event.target.value as 'normal' | 'hoch')}
            className="h-11 border border-[#292a24]/20 bg-[#f5f1eb] px-3 font-normal outline-none focus:border-[#ad613d]"
          >
            <option value="normal">Normal (2 Personen)</option>
            <option value="hoch">Hoch (Kinder, Haustiere, viel Laufweg)</option>
          </select>
        </label>
        <label className="flex items-end gap-2 pb-3 text-sm font-medium sm:col-span-2">
          <input type="checkbox" checked={heated} onChange={(event) => setHeated(event.target.checked)} />
          Fußbodenheizung vorhanden
        </label>
      </div>

      <div className="mt-7 grid gap-4 border-t border-[#292a24]/15 pt-6 sm:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[#292a24]/55">Empfehlung</p>
          <p className={`mt-1 font-serif text-2xl leading-tight ${result.tone}`}>{result.verdict}</p>
        </div>
        <p className="self-end text-sm leading-6 text-[#292a24]/70">{result.reason}</p>
      </div>

      <p className="mt-5 text-xs leading-5 text-[#292a24]/50">
        Vereinfachte Entscheidungshilfe. Verbindlich sind Aufbau, Abdichtung und Herstellerfreigabe.
      </p>
    </section>
  )
}
