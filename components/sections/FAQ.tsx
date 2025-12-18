"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Как быстро вы принимаете товар?", a: "В течение 24 часов с момента прибытия на склад. В 90% случаев — в день поставки." },
  { q: "Работаете ли вы с браком?", a: "Да, мы проверяем каждую единицу товара. При обнаружении брака отправляем фотоотчет и изолируем товар." },
  { q: "Какие маркетплейсы вы поддерживаете?", a: "Wildberries, Ozon и Яндекс Маркет по моделям FBO и FBS." },
  { q: "Есть ли минимальный объем заказа?", a: "Мы работаем с любыми объемами, но минимальная стоимость обработки поставки — 1500 руб." }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-black italic uppercase mb-12 text-center">Частые вопросы</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full p-6 flex items-center justify-between text-left"
            >
              <span className="font-bold text-lg">{faq.q}</span>
              <ChevronDown className={`transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div 
                  initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-muted-foreground">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};
