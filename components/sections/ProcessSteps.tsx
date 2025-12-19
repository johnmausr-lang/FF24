"use client";

import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, Truck, HardHat, Factory, PackageCheck, Download, CheckCircle2 } from "lucide-react";

const steps = [
  { title: "Заявка", desc: "Регистрация и передача ТЗ", icon: <ClipboardList /> },
  { title: "Забор", desc: "Забираем товар у поставщика", icon: <Truck /> },
  { title: "Приёмка", desc: "Сверка и проверка на брак", icon: <HardHat /> },
  { title: "Маркировка", desc: "Наклейка штрих-кодов по ТЗ", icon: <Factory /> },
  { title: "Упаковка", desc: "Оптимальная упаковка в короба", icon: <PackageCheck /> },
  { title: "Отгрузка", desc: "Доставка на склад МП за 24ч", icon: <Download /> },
  { title: "Финиш", desc: "Товар готов к продаже", icon: <CheckCircle2 /> },
];

export const ProcessSteps = () => {
  return (
    <section id="process" className="py-32 bg-black overflow-hidden border-y border-white/5">
      <div className="container mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-5xl md:text-7xl font-black italic uppercase mb-6 tracking-tighter">
            Семь шагов <span className="text-accent-lime">к идеалу</span>
          </h2>
          <p className="text-white/40 uppercase tracking-[0.4em] font-bold text-sm">Ваша логистика на автопилоте</p>
        </motion.div>
      </div>

      <div className="flex overflow-x-auto hide-scrollbar px-6 md:px-[8%] gap-8 snap-x pb-12">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-[320px] md:min-w-[420px] snap-center"
          >
            <div className="glass-card p-12 h-[400px] flex flex-col items-start relative group overflow-hidden">
              <span className="text-9xl font-black italic text-white/5 absolute -bottom-4 -right-4 group-hover:text-accent-lime/10 transition-all duration-700 select-none">0{i+1}</span>
              <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center mb-10 text-accent-lime border-accent-lime/20 group-hover:border-accent-lime group-hover:scale-110 transition-all duration-700">
                {React.cloneElement(step.icon as React.ReactElement, { size: 40 })}
              </div>
              <h3 className="text-3xl font-black uppercase italic mb-6 relative z-10">{step.title}</h3>
              <p className="text-white/50 text-lg leading-relaxed relative z-10 max-w-[280px]">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
