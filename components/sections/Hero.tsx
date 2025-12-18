"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl text-center space-y-8"
      >
        <h1 className="text-5xl font-bold">
          Фулфилмент для маркетплейсов под ключ
        </h1>

        <p className="text-xl text-slate-600">
          Приемка, упаковка, хранение и доставка товаров на Ozon, WB, Яндекс
        </p>

        <div className="flex justify-center gap-4">
          <Button size="lg">Рассчитать стоимость</Button>
          <Button size="lg" variant="outline">
            Оставить заявку
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
