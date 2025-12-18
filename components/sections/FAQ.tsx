"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const items = [
  { q: "С какими маркетплейсами работаете?", a: "Ozon, Wildberries, Яндекс Маркет. Подстроим упаковку под требования." },
  { q: "Как быстро можно начать?", a: "Обычно 1–2 дня после уточнения деталей и согласования процесса." },
  { q: "Где находится склад?", a: "Лодочная д. 5 (курьеры) и Лодочная д. 7 (водители)." },
  { q: "Как отправить заявку?", a: "Форма в конце страницы отправляет данные в Telegram-бот." },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="container">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight">FAQ</h2>
          <p className="text-slate-600">Частые вопросы.</p>
        </div>

        <div className="rounded-2xl border border-slate-100 overflow-hidden bg-white">
          {items.map((it, idx) => {
            const isOpen = open === idx
            return (
              <div key={it.q} className="border-b border-slate-100 last:border-b-0">
                <button
                  className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-slate-50"
                  onClick={() => setOpen(isOpen ? null : idx)}
                >
                  <div className="font-semibold">{it.q}</div>
                  <div className="text-slate-400">{isOpen ? "—" : "+"}</div>
                </button>
                {isOpen && <div className="px-5 pb-5 text-sm text-slate-600">{it.a}</div>}
              </div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
