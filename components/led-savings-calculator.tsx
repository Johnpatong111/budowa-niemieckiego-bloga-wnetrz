"use client"

import { useMemo, useState } from 'react'

export function LedSavingsCalculator() {
  const [oldW, setOldW] = useState(60)
  const [ledW, setLedW] = useState(9)
  const [hours, setHours] = useState(3)
  const [count, setCount] = useState(1)
  const [price, setPrice] = useState(35)
  const [lampPrice, setLampPrice] = useState(5)
  const result = useMemo(() => {
    const oldKwh = oldW / 1000 * hours * 365 * count
    const ledKwh = ledW / 1000 * hours * 365 * count
    const oldCost = oldKwh * price / 100
    const ledCost = ledKwh * price / 100
    const saving = Math.max(0, oldCost - ledCost)
    return { oldCost, ledCost, saving, tenYear: saving * 10, payback: saving > 0 ? lampPrice * count / saving * 12 : 0, co2: (oldKwh - ledKwh) * 0.375 }
  }, [oldW, ledW, hours, count, price, lampPrice])
  const field = (label: string, value: number, setValue: (value: number) => void, suffix: string, min = 0.1) => <label className="grid gap-2 text-xs font-medium text-[#292a24]/70"><span>{label}</span><div className="flex items-center border border-[#292a24]/20 bg-[#f5f1eb]"><input type="number" min={min} step="0.1" value={value} onChange={(event) => setValue(Math.max(min, Number(event.target.value) || min))} className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-[#292a24] outline-none" /><span className="px-3 text-xs text-[#292a24]/50">{suffix}</span></div></label>
  return <div className="grid gap-7 border border-[#292a24]/15 bg-[#eee8df] p-6 sm:p-8"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{field('Alte Lampe', oldW, setOldW, 'W')}{field('Neue LED', ledW, setLedW, 'W')}{field('Brenndauer pro Tag', hours, setHours, 'h')}{field('Anzahl Lampen', count, setCount, 'Stück', 1)}{field('Strompreis', price, setPrice, 'ct/kWh')}{field('Preis je LED', lampPrice, setLampPrice, '€')}</div><div className="grid gap-5 border-t border-[#292a24]/15 pt-6 sm:grid-cols-2 lg:grid-cols-5"><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ad613d]">Alt pro Jahr</p><p className="mt-1 font-serif text-2xl">{result.oldCost.toFixed(2)} €</p></div><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ad613d]">LED pro Jahr</p><p className="mt-1 font-serif text-2xl">{result.ledCost.toFixed(2)} €</p></div><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ad613d]">Ersparnis pro Jahr</p><p className="mt-1 font-serif text-2xl text-[#ad613d]">{result.saving.toFixed(2)} €</p></div><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ad613d]">Ersparnis in 10 Jahren</p><p className="mt-1 font-serif text-2xl">{result.tenYear.toFixed(0)} €</p></div><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ad613d]">Amortisation</p><p className="mt-1 font-serif text-2xl">{result.payback.toFixed(1)} Monate</p></div></div><p className="text-xs leading-5 text-[#292a24]/60">Orientierungswert: etwa {result.co2.toFixed(1)} kg CO₂ weniger pro Jahr bei rund 375 g CO₂/kWh. Der tatsächliche Wert hängt vom Strommix ab.</p></div>
}
