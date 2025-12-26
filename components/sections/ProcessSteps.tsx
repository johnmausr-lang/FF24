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
  const duplicatedSteps = [...steps, ...steps];

  return (
    <section id="process" className="py-32 bg-black overflow-hidden border-y border-white/5">
      <div className="container mb-20">
        <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
          Процесс <span className="text-accent-lime">работы</span>
        </h2>
      </div>

      <div className="relative flex">
        <motion.div 
          className="flex gap-10 px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        >
          {duplicatedSteps.map((step, i) => (
            <div key={i} className="w-[320px] flex-shrink-0 perspective-1000 py-10">
              <motion.div 
                whileHover={{ rotateY: 10, rotateX: 5, scale: 1.05 }}
                className="glass-card p-8 h-full border-white/10 shadow-[20px_20px_50px_rgba(0,0,0,0.5),-5px_-5px_30px_rgba(255,255,255,0.02)] transform-gpu transition-all duration-300"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="w-16 h-16 rounded-xl bg-accent-lime/10 flex items-center justify-center text-accent-lime mb-6 shadow-[0_0_20px_rgba(224,255,100,0.2)]">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-black italic uppercase mb-2 tracking-tighter">{step.title}</h3>
                <p className="text-white/40 text-sm uppercase font-bold">{step.desc}</p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
