"use client";

import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, Truck, HardHat, Factory, PackageCheck, Download, CheckCircle2 } from "lucide-react";

const steps = [
  { title: "Заявка", desc: "Регистрация ТЗ", icon: <ClipboardList size={32} /> },
  { title: "Забор", desc: "Логистика", icon: <Truck size={32} /> },
  { title: "Приёмка", desc: "Контроль брака", icon: <HardHat size={32} /> },
  { title: "Маркировка", desc: "Честный Знак", icon: <Factory size={32} /> },
  { title: "Упаковка", desc: "Подготовка", icon: <PackageCheck size={32} /> },
  { title: "Отгрузка", desc: "Склад МП", icon: <Download size={32} className="rotate-180" /> },
  { title: "Финиш", desc: "Готов к продаже", icon: <CheckCircle2 size={32} /> },
];

export const ProcessSteps = () => {
  // Удваиваем массив для бесшовной анимации
  const duplicatedSteps = [...steps, ...steps];

  return (
    <section id="process" className="py-32 bg-black overflow-hidden border-y border-white/5">
      <div className="container mb-20">
        <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
          Процесс <span className="text-accent-lime text-outline-white">работы</span>
        </h2>
      </div>

      <div className="relative flex">
        <motion.div 
          className="flex gap-6 px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 30, // Скорость движения
            repeat: Infinity,
          }}
        >
          {duplicatedSteps.map((step, i) => (
            <div key={i} className="w-[300px] flex-shrink-0">
              <div className="glass-card p-8 h-full border-white/10">
                <div className="w-16 h-16 rounded-xl bg-accent-lime/10 flex items-center justify-center text-accent-lime mb-6">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-black italic uppercase mb-2">{step.title}</h3>
                <p className="text-white/40 text-sm uppercase">{step.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
