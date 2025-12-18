"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { PRICE, SERVICES, type Marketplace, type ServiceKey } from "@/app/data/pricing"

function animateNumber(from: number, to: number, ms = 650, cb: (v: number) => void) {
  const start = performance.now()
  function tick(t: number) {
    const p = Math.min(1, (t - start) / ms)
    const eased = 1 - Math.pow(1 - p, 3)
    cb(Math.round(from + (to - from) * eased))
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

export default function Calculator() {
  const [marketplace, setMarketplace] = useState<Marketplace>("Ozon")
  const [qty, setQty] = useState(200)
  const [pallets, setPallets] = useState(1)
  const [selected, setSelected] = useState<Record<ServiceKey, boolean>>({
    receiving: true,
    processing: true,
    packing: true,
    delivery: true,
    storage: false,
    pickup: false,
    other: false,
  })
  const [result, setResult] = useState<number | null>(null)
  const [animated, setAnimated] = useState(0)

  const calc = useMemo(() => {
    // простая и прозрачная формула (чистый TS)
    const base = qty * PRICE.perItemBase
    const byPallet = pallets * PRICE.perPallet
    const servicesSum = (Object.keys(selected) as ServiceKey[])
      .filter((k) => selected[k])
      .reduce((sum, k) => {
        const v = PRICE.services[k]
        if (k === "storage") return sum + pallets * v
        if (k === "pickup") return sum + v
        return sum + qty * v
      }, 0)

    // marketplace пока влияет только в UI (можешь добавить коэффициенты)
    return Math.max(0, base + byPallet + servicesSum)
  }, [qty, pallets, selected])

  const onCalculate = () => {
    setResult(calc)
    animateNumber(animated, calc, 700, setAnimated)
  }

  return (
    <section id="calc" className="container">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight">Калькулятор стоимости</h2>
          <p className="text-slate-600">
            Вовлечение + заявка. Расчёт на клиенте, данные берём из `pricing.ts`. :contentReference[oaicite:1]{index=1}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-slate-100 p-6 bg-white space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-slate-500">Маркетплейс</div>
                <select
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm"
                  value={marketplace}
                  onChange={(e) => setMarketplace(e.target.value as Marketplace)}
                >
                  <option>Ozon</option>
                  <option>Wildberries</option>
                  <option>Яндекс Маркет</option>
                </select>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-slate-500">Кол-во товаров</div>
                <input
                  type="number"
                  min={0}
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <div className="text-sm text-slate-500">Объём / паллеты</div>
                <input
                  type="number"
                  min={0}
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm"
                  value={pallets}
                  onChange={(e) => setPallets(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="font-semibold">Выбор услуг</div>
              <div className="grid sm:grid-cols-2 gap-3">
                {SERVICES.map((s) => (
                  <Checkbox
                    key={s.key}
                    label={s.title}
                    checked={selected[s.key]}
                    onCheckedChange={(v) => setSelected((prev) => ({ ...prev, [s.key]: v }))}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" onClick={onCalculate}>Рассчитать</Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
              >
                Получить точный расчёт
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 p-6 bg-white space-y-4">
            <div className="text-sm text-slate-500">Результат</div>

            <motion.div
              key={result ?? "empty"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="text-4xl font-bold tracking-tight"
            >
              {result === null ? "—" : `${animated.toLocaleString("ru-RU")} ₽`}
            </motion.div>

            <div className="text-sm text-slate-600">
              {result === null
                ? "Выберите параметры и нажмите «Рассчитать»."
                : `Маркетплейс: ${marketplace}. Это предварительный расчёт.`}
            </div>

            <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              <div className="font-medium text-slate-900">Важно</div>
              <div className="mt-1">
                После заявки уточним нюансы (категория товара, упаковка, требования МП).
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
