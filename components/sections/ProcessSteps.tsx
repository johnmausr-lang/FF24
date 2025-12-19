"use client";

import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, Truck, HardHat, Factory, PackageCheck, Download, CheckCircle2 } from "lucide-react";

const steps = [
  { title: "Заявка", desc: "Регистрация и передача ТЗ", icon: <ClipboardList className="w-12 h-12 text-accent-lime" /> },
  { title: "Забор", desc: "Забираем товар у поставщика", icon: <Truck className="w-12 h-12 text-accent-lime" /> },
  { title: "Приёмка", desc: "Сверка и проверка на брак", icon: <HardHat className="w-12 h-12 text-accent-lime" /> },
  { title: "Маркировка", desc: "Наклейка штрих-кодов по ТЗ", icon: <Factory className="w-12 h-12 text-accent-lime" /> },
  { title: "Упаковка", desc: "Оптимальная упаковка в короба", icon: <PackageCheck className="w-12 h-12 text-accent-lime" /> },
  { title: "Отгрузка", desc: "Доставка на склад МП за 24ч", icon: <Download className="w-12 h-12 text-accent-lime rotate-180" /> },
  { title: "Финиш", desc: "Товар готов к продаже", icon: <CheckCircle2 className="w-12 h-12 text-accent-lime" /> },
];

export const ProcessSteps = () => {
  return (
    <section id="process" className="py-24 sm:py-32 overflow-hidden bg-black">
      <div className="container mx-auto px-6">
        <motion.div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase text-white mb-6">Процесс</h2>
          <p className="text-white/60 text-lg">Семь шагов к идеальной логистике</p>
        </motion.div>

        {/* Сетка вместо скролла для лучшей адаптивности, либо плавный flex-wrap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 relative group flex flex-col items-center text-center"
            >
              <div className="absolute top-4 right-6 text-5xl font-black italic text-white/5 group-hover:text-accent-lime/10 transition-colors">
                0{i + 1}
              </div>
              <div className="mb-6 w-20 h-20 rounded-2xl glass flex items-center justify-center border border-white/10 group-hover:border-accent-lime transition-all">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold uppercase text-white mb-3 italic">{step.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
