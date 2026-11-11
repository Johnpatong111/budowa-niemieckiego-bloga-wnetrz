'use client'

import { useMemo, useState } from 'react'

const symptoms = [
  {
    value: 'oben-kalt',
    label: 'Oben kalt, unten warm',
    cause: 'Luft im Heizkörper',
    action: 'Heizkörper entlüften, danach Wasserdruck prüfen',
    pro: false,
  },
  {
    value: 'unten-kalt',
    label: 'Unten kalt, oben warm',
    cause: 'Verschlammter Heizkörper oder zu geringe Durchströmung',
    action: 'Fachbetrieb prüfen lassen, Spülen möglich',
    pro: true,
  },
  {
    value: 'ganz-kalt-thermostat',
    label: 'Ganz kalt, Thermostat auf',
    cause: 'Ventilstift klemmt oder Thermostatkopf defekt',
    action: 'Thermostatkopf abnehmen und Stift prüfen – mit Vorsicht',
    pro: false,
  },
  {
    value: 'gluckert',
    label: 'Gluckert hörbar',
    cause: 'Luft im System, oft auch in der Leitung',
    action: 'Alle Heizkörper von unten nach oben entlüften',
    pro: false,
  },
  {
    value: 'warm-raum-kalt',
    label: 'Heizkörper warm, Raum bleibt kalt',
    cause: 'Falsche Heizkurve, Zugluft oder Heizkörper zu klein',
    action: 'Lüften und Heizkurve prüfen, Wärmebedarf berechnen',
    pro: true,
  },
  {
    value: 'alle-kalt',
    label: 'Alle Heizkörper kalt',
    cause: 'Anlage gestört: Pumpe, Brenner oder Druck',
    action: 'Sofort Fachbetrieb, nicht selbst eingreifen',
    pro: true,
  },
] as const

export function HeizkoerperCheck() {
  const [value, setValue] = useState<string>('oben-kalt')
  const [pressure, setPressure] = useState('1.6')
  const [othersWarm, setOthersWarm] = useState(true)

  const result = useMemo(() => {
    const symptom = symptoms.find((item) => item.value === value) ?? symptoms[0]
    const bar = Number(String(pressure).replace(',', '.')) || 0
    const lowPressure = bar > 0 && bar < 1.2
    const pro = symptom.pro || lowPressure || !othersWarm
    return { ...symptom, bar, lowPressure, pro }
  }, [value, pressure, othersWarm])

  return (
    <section className="border border-[#292a24]/15 bg-[#eee8df] p-6 sm:p-8" aria-labelledby="heizkoerpercheck-heading">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ad613d]">Interaktiver Check</p>
      <h2 id="heizkoerpercheck-heading" className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">
        Heizkörper wird nicht warm – was ist es?
      </h2>
      <p className="mt-3 max-w-xl text-base leading-7 text-[#292a24]/70">
        Wählen Sie das Symptom, das am besten passt. Der Check nennt die wahrscheinliche Ursache und den
        nächsten Schritt – er ersetzt keine Messung.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium sm:col-span-2">
          Symptom
          <select
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="h-11 border border-[#292a24]/20 bg-[#f5f1eb] px-3 font-normal outline-none focus:border-[#ad613d]"
          >
            {symptoms.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Anlagendruck (bar)
          <input
            type="number"
            min="0"
            max="4"
            step="0.1"
            value={pressure}
            onChange={(event) => setPressure(event.target.value)}
            className="h-11 border border-[#292a24]/20 bg-[#f5f1eb] px-3 font-normal outline-none focus:border-[#ad613d]"
          />
        </label>
        <label className="flex items-end gap-2 pb-3 text-sm font-medium">
          <input type="checkbox" checked={othersWarm} onChange={(event) => setOthersWarm(event.target.checked)} />
          Andere Heizkörper werden warm
        </label>
      </div>

      <div className="mt-7 grid gap-4 border-t border-[#292a24]/15 pt-6 sm:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[#292a24]/55">Wahrscheinliche Ursache</p>
          <p className="mt-1 font-serif text-2xl leading-tight text-[#ad613d]">{result.cause}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[#292a24]/55">Nächster Schritt</p>
          <p className="mt-1 text-base leading-6 text-[#292a24]">{result.action}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[#292a24]/55">Fachbetrieb nötig?</p>
          <p className={`mt-1 font-serif text-2xl ${result.pro ? 'text-[#a8432c]' : 'text-[#3f6b45]'}`}>
            {result.pro ? 'ja' : 'nein, selbst prüfbar'}
          </p>
          {result.lowPressure && (
            <p className="mt-2 text-xs leading-5 text-[#292a24]/60">
              Druck unter 1,2 bar: Wasser fehlt, Luft kann nachströmen. Nachfüllen und Ursache klären lassen.
            </p>
          )}
        </div>
      </div>

      <p className="mt-5 text-xs leading-5 text-[#292a24]/50">
        Richtwerte für Heizungsanlagen im Einfamilienhaus. Bei Fernwärme, Wärmepumpe oder Fußbodenheizung gelten
        andere Werte.
      </p>
    </section>
  )
}
