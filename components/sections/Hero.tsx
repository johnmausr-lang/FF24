"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section id="top" className="pt-10">
      <div className="container min-h-[calc(100vh-64px)] grid items-center">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Фулфилмент для маркетплейсов без лишней боли
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed">
            Приемка → хранение → упаковка → доставка на Ozon / WB / Яндекс. Быстро, прозрачно, по процессу.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" onClick={() => document.getElementById("calc")?.scrollIntoView({ behavior: "smooth" })}>
              Рассчитать стоимость
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
            >
              Оставить заявку
            </Button>
          </div>

          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600">
            <div className="rounded-xl border border-slate-100 p-4">
              <div className="font-semibold text-slate-900">1–2 дня</div>
              <div>быстрый старт</div>
            </div>
            <div className="rounded-xl border border-slate-100 p-4">
              <div className="font-semibold text-slate-900">7 шагов</div>
              <div>понятный процесс</div>
            </div>
            <div className="rounded-xl border border-slate-100 p-4">
              <div className="font-semibold text-slate-900">Telegram</div>
              <div>заявки в бот</div>
            </div>
            <div className="rounded-xl border border-slate-100 p-4">
              <div className="font-semibold text-slate-900">90+</div>
              <div>Lighthouse цель</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
