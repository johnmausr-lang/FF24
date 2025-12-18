"use client"

import { PRICING } from "@/app/data/pricing"

const titles: Record<string, string> = {
  receiving: "Приемка товара",
  processing: "Обработка товара",
  packing: "Упаковка",
  logistics: "Логистика до маркетплейсов",
  storage: "Хранение",
  pickup: "Забор товара",
  other: "Прочие услуги",
}

export default function Services() {
  return (
    <section id="services" className="container">
      <h2 className="text-3xl font-semibold mb-8">Услуги и цены</h2>

      <div className="space-y-6">
        {Object.entries(PRICING).map(([key, items]) => (
          <div key={key} className="rounded-2xl border p-6 bg-white">
            <h3 className="text-xl font-semibold mb-4">
              {titles[key]}
            </h3>

            <ul className="space-y-2 text-sm">
              {items.map((i) => (
                <li
                  key={i.title}
                  className="flex justify-between border-b last:border-none py-2"
                >
                  <span>{i.title}</span>
                  <span className="font-medium">
                    {i.price === 0 ? "Бесплатно" : `${i.price} ₽ / ${i.unit}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
