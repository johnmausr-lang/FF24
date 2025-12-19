"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Как быстро вы принимаете товар?",
    a: "В течение 24 часов с момента прибытия на склад. В 90% случаев — в день поставки.",
  },
  {
    q: "Работаете ли вы с браком?",
    a: "Да, проверяем каждую единицу. При браке — фотоотчёт и изоляция товара.",
  },
  {
    q: "Какие маркетплейсы поддерживаете?",
    a: "Wildberries, Ozon, Яндекс.Маркет — по моделям FBO и FBS.",
  },
  {
    q: "Есть ли минимальный объём?",
    a: "Работаем с любыми объёмами. Минимальная стоимость обработки — 1500 ₽.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 sm:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black italic uppercase mb-8 text-white">
            Часто задаваемые вопросы
          </h2>
        </motion.div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1.2, ease: "easeOut" }}
              className="glass-card group"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-8 md:p-12 flex items-center justify-between text-left"
              >
                <span className="text-xl md:text-2xl font-black text-white pr-8 text-left">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <ChevronDown className="w-8 h-8 text-white/70 group-hover:text-accent-lime transition-colors" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-8 md:px-12 pb-12 text-white/70 text-lg leading-relaxed text-tight">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
