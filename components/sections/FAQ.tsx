"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "Сколько времени занимает приемка?", a: "Стандартная приемка — 24 часа. Если товар прибыл до 14:00, в 90% случаев он будет оприходован в тот же день." },
  { q: "Как вы проверяете товар на брак?", a: "Мы проводим визуальный осмотр упаковки каждой единицы. По запросу выполняем детальную проверку содержимого с фото-фиксацией." },
  { q: "Работаете ли вы с КИЗами?", a: "Да, полностью работаем с маркировкой Честный Знак. Печатаем, наклеиваем и помогаем с документооборотом." },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-black border-t border-white/5">
      <div className="container">
        <h2 className="text-5xl md:text-7xl font-black italic uppercase mb-20">
          Критические <span className="text-accent-lime">вопросы</span>
        </h2>
        <div className="max-w-4xl space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-white/10">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-8 flex items-center justify-between text-left"
              >
                <span className={`text-xl font-bold uppercase ${openIndex === i ? 'text-accent-lime' : 'text-white'}`}>{faq.q}</span>
                {openIndex === i ? <Minus className="text-accent-lime" /> : <Plus />}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <p className="pb-8 text-white/50 text-lg">{faq.a}</p>
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
