"use client"

import { motion } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"

const steps = [
  { title: "Заявка", text: "Оставляете контакты и вводные." },
  { title: "Уточнение задач", text: "Собираем требования маркетплейса и SKU." },
  { title: "Расчёт", text: "Считаем стоимость и сроки." },
  { title: "Договорённости", text: "Фиксируем регламент, SLA, условия." },
  { title: "Приемка", text: "Принимаем товар на складе." },
  { title: "Обработка", text: "Маркировка/упаковка/комплектация." },
  { title: "Отгрузка", text: "Доставка на МП + отчётность." },
]

function useActiveOnView(count: number) {
  const refs = useMemo(() => Array.from({ length: count }, () => ({ el: null as null | HTMLDivElement })), [count])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0))[0]
        if (!visible) return
        const idx = Number((visible.target as HTMLElement).dataset["idx"])
        if (!Number.isNaN(idx)) setActive(idx)
      },
      { threshold: 0.35 }
    )

    refs.forEach((r, i) => {
      const el = r.el
      if (!el) return
      el.dataset["idx"] = String(i)
      obs.observe(el)
    })

    return () => obs.disconnect()
  }, [refs])

  return { refs, active }
}

export default function ProcessSteps() {
  const { refs, active } = useActiveOnView(steps.length)

  return (
    <section id="process" className="container">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight">Процесс работы</h2>
          <p className="text-slate-600">7 шагов — активный шаг подсвечивается при прокрутке.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="rounded-2xl border border-slate-100 p-6 bg-white">
            <div className="text-sm text-slate-500">Сейчас на шаге</div>
            <div className="mt-2 text-xl font-semibold">{steps[active]?.title}</div>
            <div className="mt-2 text-slate-600">{steps[active]?.text}</div>
          </div>

          <div className="space-y-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                ref={(node) => (refs[i].el = node)}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35 }}
                className={`rounded-2xl border p-5 bg-white ${
                  i === active ? "border-[rgb(var(--primary))] shadow-sm" : "border-slate-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold">
                    <span className="text-slate-400 mr-2">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </div>
                  {i === active && (
                    <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                      активный
                    </span>
                  )}
                </div>
                <div className="mt-2 text-sm text-slate-600">{s.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
