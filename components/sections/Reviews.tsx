"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const slides = [
  { name: "ИП, товары для дома", text: "Снизили возвраты благодаря упаковке и маркировке.", metric: "+18% к повторным заказам" },
  { name: "Бренд одежды", text: "Стабильные отгрузки на WB, меньше штрафов.", metric: "−30% ошибок" },
  { name: "Электроника", text: "Наладили процесс приемки и комплектации.", metric: "SLA 99%" },
]

export default function Reviews() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [])

  const s = slides[i]

  return (
    <section className="container">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight">Отзывы / Кейсы</h2>
          <p className="text-slate-600">Коротко, по делу: текст + цифры.</p>
        </div>

        <div className="rounded-2xl border border-slate-100 p-6 bg-white">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-3"
          >
            <div className="text-sm text-slate-500">{s.name}</div>
            <div className="text-lg font-semibold">{s.metric}</div>
            <div className="text-slate-600">{s.text}</div>
          </motion.div>

          <div className="mt-6 flex gap-3">
            <Button variant="outline" size="sm" onClick={() => setI((p) => (p - 1 + slides.length) % slides.length)}>
              Назад
            </Button>
            <Button variant="outline" size="sm" onClick={() => setI((p) => (p + 1) % slides.length)}>
              Вперёд
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
