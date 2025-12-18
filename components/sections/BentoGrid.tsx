"use client"

import { motion } from "framer-motion"

const audiences = [
  { title: "Продавцы WB", text: "Подготовка по требованиям и отгрузка на склады." },
  { title: "Продавцы Ozon", text: "Упаковка, маркировка, логистика до МП." },
  { title: "Яндекс Маркет", text: "Аккуратная обработка и понятные статусы." },
  { title: "Бренды/производители", text: "Стабильные процессы и масштабирование." },
]

export default function BentoGrid() {
  return (
    <section className="container">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6"
      >
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight">О компании</h2>
            <p className="text-slate-600 leading-relaxed">
              FF24 — фулфилмент-оператор для продавцов маркетплейсов: приемка, хранение, обработка,
              упаковка и доставка.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 p-6 bg-white shadow-sm">
            <div className="text-sm text-slate-500">Фокус</div>
            <div className="mt-2 text-lg font-semibold">Скорость + качество + прозрачные расчёты</div>
            <div className="mt-3 text-sm text-slate-600">
              Минимум обещаний — максимум понятных действий и SLA.
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {audiences.map((a) => (
            <div key={a.title} className="rounded-2xl border border-slate-100 p-5 bg-white">
              <div className="font-semibold">{a.title}</div>
              <div className="mt-2 text-sm text-slate-600">{a.text}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
