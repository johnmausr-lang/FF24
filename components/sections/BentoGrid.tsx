"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Clock, TrendingUp, MapPin, Smartphone } from "lucide-react";

const FEATURES = [
  {
    title: "100% Финансовая гарантия",
    description: "Несем полную материальную ответственность за ваш товар на всех этапах.",
    icon: ShieldCheck,
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    title: "Скорость 24 часа",
    description: "От приемки до отгрузки на маркетплейс проходит ровно сутки.",
    icon: Zap,
    colSpan: "col-span-1",
  },
  {
    title: "Прозрачный трекинг",
    description: "Отслеживание каждого артикула в реальном времени через личный кабинет.",
    icon: Smartphone,
    colSpan: "col-span-1",
  },
  {
    title: "Рост продаж",
    description: "Снимаем рутину, чтобы вы могли сфокусироваться на маркетинге и росте.",
    icon: TrendingUp,
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    title: "Выгодное расположение",
    description: "Склады вблизи центральных сортировочных центров WB и Ozon.",
    icon: MapPin,
    colSpan: "col-span-1",
  },
  {
    title: "Работаем без выходных",
    description: "Отгрузки 7 дней в неделю, включая праздники.",
    icon: Clock,
    colSpan: "col-span-1 md:col-span-2",
  },
];

export const BentoGrid = () => {
  return (
    <section id="features" className="py-32 relative bg-slate-50 dark:bg-black transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter transition-colors duration-500">
            Экосистема <span className="text-lime-500 dark:text-[#E0FF64]">FF24</span>
          </h2>
          <p className="mt-6 text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto uppercase tracking-widest text-xs transition-colors duration-500">
            Инфраструктура, созданная для масштабирования вашего бизнеса
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`group relative p-8 rounded-3xl overflow-hidden flex flex-col justify-end bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xl hover:shadow-[0_20px_40px_rgba(132,204,22,0.1)] dark:hover:shadow-[0_20px_40px_rgba(224,255,100,0.1)] transition-all duration-500 ${feature.colSpan}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-lime-100/50 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <feature.icon className="absolute top-8 right-8 w-12 h-12 text-slate-200 dark:text-white/10 group-hover:text-lime-500 dark:group-hover:text-[#E0FF64] transition-colors duration-500 group-hover:scale-110" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight transition-colors duration-500">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium text-sm leading-relaxed transition-colors duration-500">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
