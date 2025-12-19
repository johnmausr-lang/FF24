"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Как быстро вы принимаете товар?", a: "В течение 24 часов с момента прибытия на склад. В 90% случаев — в день поставки." },
  { q: "Работаете ли вы с браком?", a: "Да, проверяем каждую единицу. При браке — фотоотчёт и изоляция товара." },
  { q: "Какие маркетплейсы поддерживаете?", a: "Wildberries, Ozon, Яндекс.Маркет — по моделям FBO и FBS." },
  { q: "Есть ли минимальный объём?", a: "Работаем с любыми объёмами. Минимальная стоимость обработки — 1500 ₽." },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 sm:py-32 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase text-white">FAQ</h2>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 md:p-8 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-lg md:text-xl font-bold text-white pr-4">
                  {faq.q}
                </span>
                <ChevronDown className={`w-6 h-6 text-accent-lime transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/5"
                  >
                    <p className="p-6 md:p-8 text-white/60 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
