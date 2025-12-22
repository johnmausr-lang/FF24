"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
// БЫЛО: "@/components/ui/GlassVideo"
import { GlassVideo } from "@/components/GlassVideo"; 

const faqs = [
  {
    q: "Сколько времени занимает приемка?",
    a: "Стандартная приемка — 24 часа. Если товар прибыл до 14:00, в 90% случаев он будет оприходован в тот же день.",
  },
  {
    q: "Как вы проверяете товар на брак?",
    a: "Мы проводим визуальный осмотр упаковки каждой единицы. По запросу выполняем детальную проверку содержимого с фото-фиксацией.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <GlassVideo src="/videos/hero-bg.webm" opacity={0.3} />
      
      <div className="container relative z-10">
        <h2 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter mb-20 leading-none">
          FAQ / <span className="text-accent-lime text-outline-white">ANSWERS</span>
        </h2>

        <div className="max-w-4xl space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card border border-white/5">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-8 flex items-center justify-between text-left group"
              >
                <span className={`text-xl font-bold uppercase ${openIndex === i ? 'text-accent-lime' : 'text-white'}`}>
                  {faq.q}
                </span>
                <div className={`w-10 h-10 rounded-full glass flex items-center justify-center transition-transform ${openIndex === i ? 'rotate-180 bg-accent-lime text-black' : ''}`}>
                  {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-white/50 text-lg border-t border-white/5 pt-6 uppercase text-sm tracking-widest">
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
