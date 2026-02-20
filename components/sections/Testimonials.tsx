"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "ИП Смирнов А.",
    role: "Селлер на Wildberries",
    text: "Искали партнера, который сможет интегрироваться по API и забирать товар день в день. С FF24 закрыли проблему зависших остатков. Отгрузки идут без перебоев.",
  },
  {
    name: "Екатерина Л.",
    role: "Владелец бренда одежды",
    text: "Очень спасает фотоотчет в личном кабинете. Раньше постоянно спорили с маркетплейсами из-за брака при приемке, теперь все задокументировано на этапе упаковки.",
  },
  {
    name: "Дмитрий В.",
    role: "Директор по e-commerce",
    text: "Перевели логистику на аутсорс в FF24 три месяца назад. Ошибки при маркировке КИЗами свелись к нулю. Процесс стал прозрачным и предсказуемым.",
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-32 bg-slate-50 dark:bg-black transition-colors duration-500 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter transition-colors duration-500">
            Опыт <span className="text-lime-500 dark:text-[#E0FF64]">Партнеров</span>
          </h2>
          <p className="mt-6 text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto uppercase tracking-widest text-xs transition-colors duration-500">
            Реальные кейсы селлеров, доверивших нам свою логистику
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-8 bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl hover:bg-white dark:hover:bg-white/10 transition-colors duration-500 group relative backdrop-blur-sm"
            >
              <Quote className="absolute top-8 right-8 text-lime-500 dark:text-[#E0FF64] opacity-20 w-12 h-12 group-hover:opacity-100 transition-opacity" />
              <p className="text-slate-700 dark:text-white/80 font-medium leading-relaxed mb-8 relative z-10 transition-colors duration-500">
                "{testimonial.text}"
              </p>
              <div>
                <p className="text-slate-900 dark:text-white font-black uppercase tracking-wider text-sm transition-colors duration-500">{testimonial.name}</p>
                <p className="text-lime-600 dark:text-[#E0FF64] text-xs font-bold uppercase mt-1 transition-colors duration-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
