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
    <section className="py-32 bg-black relative overflow-hidden">
      {/* ИСПОЛЬЗУЕМ HERO-BG ДЛЯ ЗАКОЛЬЦОВЫВАНИЯ НАЧАЛА И КОНЦА */}
      <GlassVideo 
        src="/videos/hero-bg.webm" 
        opacity={0.4} 
        playbackRate={0.5}
      />
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-16 text-center">
            Критические <span className="text-accent-lime">вопросы</span>
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card !rounded-3xl border-white/5 backdrop-blur-xl">
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
      </div>
    </section>
  );
};
