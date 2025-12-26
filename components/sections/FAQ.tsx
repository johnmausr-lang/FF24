"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "Сколько времени занимает приемка?", a: "Стандартная приемка — 24 часа. Если товар прибыл до 14:00, в 90% случаев он будет оприходован в тот же день." },
  { q: "Как вы проверяете товар на брак?", a: "Мы проводим визуальный осмотр каждой единицы. По запросу выполняем детальную проверку с фото-фиксацией." },
  { q: "Работаете ли вы с КИЗами?", a: "Да, работаем с маркировкой Честный Знак: печать, наклейка и передача данных в систему." },
  { q: "Есть ли страхование товара?", a: "Мы несем полную материальную ответственность за товар с момента подписания акта приемки." }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-black">
      <div className="container flex flex-col items-center">
        {/* Центрированный заголовок */}
        <h2 className="text-5xl md:text-7xl font-black italic uppercase mb-20 tracking-tighter text-center">
          Критические <span className="text-accent-lime">вопросы</span>
        </h2>

        <div className="w-full max-w-4xl space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-white/10">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)} 
                className="w-full py-8 flex items-center justify-between text-left group transition-all"
              >
                <span className={`text-xl md:text-2xl font-bold uppercase tracking-tight transition-colors ${openIndex === i ? 'text-accent-lime' : 'text-white'}`}>
                  {faq.q}
                </span>
                <div className={`p-2 rounded-full transition-all ${openIndex === i ? 'bg-accent-lime text-black rotate-180' : 'text-white/20'}`}>
                  {openIndex === i ? <Minus size={24} /> : <Plus size={24} />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: "auto", opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <p className="pb-8 text-white/50 text-lg leading-relaxed">{faq.a}</p>
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
