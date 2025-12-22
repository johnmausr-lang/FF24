"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { GlassVideo } from "@/components/ui/GlassVideo";

const faqs = [
  {
    q: "Сколько времени занимает приемка?",
    a: "Стандартная приемка — 24 часа. Если товар прибыл до 14:00, в 90% случаев он будет оприходован в тот же день.",
  },
  {
    q: "Как вы проверяете товар на брак?",
    a: "Мы проводим визуальный осмотр упаковки каждой единицы. По запросу выполняем детальную проверку содержимого с фото-фиксацией.",
  },
  {
    q: "Работаете ли вы с КИЗами (Честный Знак)?",
    a: "Да, полностью работаем с маркировкой Честный Знак. Печатаем, наклеиваем и помогаем с документооборотом.",
  },
  {
    q: "Есть ли страхование товара?",
    a: "Да, мы несем полную материальную ответственность за сохранность вашего товара с момента подписания акта приемки.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-40 bg-black relative overflow-hidden border-t border-white/5">
      {/* Закольцовка: используем hero-bg как на первом экране */}
      <GlassVideo 
        src="/videos/hero-bg.webm" 
        opacity={0.3} 
        blur="backdrop-blur-md"
      />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h2 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">
            FAQ / <span className="text-accent-lime text-outline-white">ANSWERS</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="glass-card border border-white/5 backdrop-blur-xl"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-8 flex items-center justify-between text-left group transition-all"
              >
                <span className={`text-xl font-bold uppercase tracking-tight transition-colors duration-500 ${openIndex === i ? 'text-accent-lime' : 'text-white'}`}>
                  {faq.q}
                </span>
                <div className={`w-10 h-10 rounded-full glass flex items-center justify-center transition-all duration-500 ${openIndex === i ? 'bg-accent-lime text-black rotate-180' : 'text-white'}`}>
                  {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-8 pb-8 text-white/50 text-lg leading-relaxed border-t border-white/5 pt-6">
                      {faq.a}
                    </div>
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
