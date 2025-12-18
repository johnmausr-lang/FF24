"use client"

import { motion } from "framer-motion"

export default function Promotions() {
  return (
    <section className="container">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-slate-100 p-6 bg-white"
      >
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight">Акции</h2>
          <p className="text-slate-600">
            Условия: −10% на первый заказ и −10% за приведённого друга.
          </p>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="font-semibold">
              Скидка 10% на первый заказ
            </div>
            <div className="mt-2 text-sm text-slate-600">
              Применяется автоматически при первом обращении.
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="font-semibold">
              Скидка 10% за друга
            </div>
            <div className="mt-2 text-sm text-slate-600">
              Приведите клиента — получите скидку на следующий заказ.
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
