"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "Как быстро вы отгружаете товар?",
    answer: "Стандартный SLA — отгрузка за 24 часа с момента поступления товара на наш склад. В пиковые сезоны (ноябрь-декабрь) сроки фиксируются в договоре.",
  },
  {
    question: "С какими габаритами вы работаете?",
    answer: "Мы обрабатываем как стандартные товары (одежда, косметика, электроника), так и КГТ (крупногабаритный товар). У нас есть выделенная зона для работы со сложными грузами.",
  },
  {
    question: "Что происходит в случае утери товара?",
    answer: "Мы несем 100% материальную ответственность с момента подписания акта приемки. В случае утери или порчи товара по нашей вине, мы компенсируем его розничную стоимость.",
  },
  {
    question: "Как происходит интеграция с моим магазином?",
    answer: "Мы предоставляем удобный личный кабинет и возможность интеграции по API. Также мы напрямую связываемся с кабинетами Wildberries и Ozon для автоматизации поставок.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 bg-slate-50 dark:bg-black transition-colors duration-500 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter transition-colors duration-500">
            Частые <span className="text-lime-500 dark:text-[#E0FF64]">Вопросы</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md rounded-2xl overflow-hidden transition-colors duration-500"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wide transition-colors duration-500">
                  {item.question}
                </span>
                <ChevronDown 
                  className={`w-6 h-6 text-lime-500 dark:text-[#E0FF64] transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-6 text-slate-600 dark:text-slate-400 font-medium leading-relaxed transition-colors duration-500">
                      {item.answer}
                    </div>
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
