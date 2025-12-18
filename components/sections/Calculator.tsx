"use client"

import { useState } from "react"
import { PRICING } from "@/app/data/pricing"
import { Button } from "@/components/ui/button"

export default function Calculator() {
  const [qty, setQty] = useState(100)
  const [result, setResult] = useState<number | null>(null)

  const calculate = () => {
    // базовый сценарий: приемка + обработка + упаковка
    const receiving = PRICING.receiving[0].price * qty
    const processing = PRICING.processing[1].price * qty
    const packing = PRICING.packing[0].price

    setResult(receiving + processing + packing)
  }

  return (
    <section id="calc" className="container">
      <h2 className="text-3xl font-semibold mb-6">Калькулятор стоимости</h2>

      <div className="rounded-2xl border p-6 bg-white space-y-4 max-w-xl">
        <div>
          <label className="text-sm text-slate-500">Количество товаров</label>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(+e.target.value)}
            className="w-full border rounded-lg px-3 h-10"
          />
        </div>

        <Button onClick={calculate}>Рассчитать</Button>

        {result !== null && (
          <div className="text-2xl font-bold">
            ≈ {result.toLocaleString("ru-RU")} ₽
          </div>
        )}
      </div>
    </section>
  )
}
