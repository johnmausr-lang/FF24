"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "Как быстро вы принимаете товар?", a: "Норматив FF24 — 24 часа с момента разгрузки. Если товар приехал утром, в 90% случаев он будет доступен к продаже в тот же вечер." },
  { q: "Как вы работаете с браком?", a: "Мы проводим тотальный визуальный осмотр. При обнаружении дефекта — сразу высылаем фото в ваш Telegram-чат для принятия решения." },
  { q: "Вы маркируете товар по Честному Знаку?", a: "Да, мы полностью берем на себя работу с КИЗами: печать, оклейка и передача данных в систему Честный Знак." },
  { q: "Где именно находится склад?", a: "Наш логистический центр расположен в Москве: ул. Лавочкина, 23. Удобная транспортная доступность для любого типа авто." }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 bg-transparent">
      <div className="container">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter">
            Частые <span className="text-[#E0FF64]">вопросы</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card rounded-[2rem] overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)} 
                className="w-full p-8 flex items-center justify-between text-left transition-all"
              >
                <span className={`text-xl md:text-2xl font-black uppercase tracking-tight ${openIndex === i ? 'text-[#E0FF64]' : 'text-white'}`}>
                  {faq.q}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${openIndex === i ? 'bg-[#E0FF64] text-black' : 'bg-white/5 text-white'}`}>
                  {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: "auto", opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="px-8 pb-8 text-white/50 text-lg leading-relaxed font-medium border-t border-white/5 pt-4">
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
