"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const steps = [
  { title: "Заявка", text: "Оставляете контакты и вводные." },
  { title: "Уточнение задач", text: "Собираем требования маркетплейса и SKU." },
  { title: "Расчёт", text: "Считаем стоимость и сроки." },
  { title: "Договорённости", text: "Фиксируем регламент и условия." },
  { title: "Приемка", text: "Принимаем товар на складе." },
  { title: "Обработка", text: "Маркировка, упаковка, комплектация." },
  { title: "Отгрузка", text: "Доставка на маркетплейс." },
]

export default function ProcessSteps() {
  const itemsRef = useRef<HTMLDivElement[]>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const index = Number(entry.target.getAttribute("data-index"))
          if (!Number.isNaN(index)) {
            setActive(index)
          }
        })
      },
      { threshold: 0.35 }
    )

    itemsRef.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="process" className="container">
      <h2 className="text-3xl font-semibold mb-8">Процесс работы</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border p-6 bg-white">
          <div className="text-sm text-slate-500">Текущий шаг</div>
          <div className="mt-2 text-xl font-semibold">
            {steps[active].title}
          </div>
          <div className="mt-2 text-slate-600">
            {steps[active].text}
          </div>
        </div>

        <div className="space-y-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              ref={(el) => {
                if (el) itemsRef.current[i] = el
              }}
              data-index={i}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35 }}
              className={`rounded-2xl border p-5 bg-white ${
                i === active
                  ? "border-[rgb(var(--primary))] shadow-sm"
                  : "border-slate-100"
              }`}
            >
              <div className="font-semibold">
                <span className="text-slate-400 mr-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {step.title}
              </div>
              <div className="mt-2 text-sm text-slate-600">
                {step.text}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
