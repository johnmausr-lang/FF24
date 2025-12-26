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
    <section id="process" className="py-32 bg-transparent overflow-hidden border-y border-white/5">
      <div className="container mb-20">
        <motion.h2 
          initial={{ filter: "blur(10px)", opacity: 0, x: -50 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter"
        >
          Процесс <span className="text-accent-lime">работы</span>
        </motion.h2>
      </div>

      <div className="relative flex py-20">
        <motion.div 
          className="flex gap-12 px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 35, repeat: Infinity }}
        >
          {duplicatedSteps.map((step, i) => (
            <div key={i} className="w-[340px] flex-shrink-0" style={{ perspective: "1200px" }}>
              <motion.div 
                whileHover={{ rotateY: 20, rotateX: 10, scale: 1.05 }}
                className="relative glass-card p-10 h-full border border-white/10 bg-white/[0.02] backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu transition-all duration-500 group"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Иконка с глубоким выносом вперед */}
                <div 
                  className="w-20 h-20 rounded-2xl bg-accent-lime/10 flex items-center justify-center text-accent-lime mb-8 shadow-[0_0_30px_rgba(224,255,100,0.15)] group-hover:bg-accent-lime group-hover:text-black transition-colors duration-500"
                  style={{ transform: "translateZ(80px)" }}
                >
                  {step.icon}
                </div>
                
                <div style={{ transform: "translateZ(50px)" }}>
                  <h3 className="text-3xl font-black italic uppercase mb-3 tracking-tighter">{step.title}</h3>
                  <p className="text-white/40 text-sm uppercase font-bold tracking-widest">{step.desc}</p>
                </div>
                
                {/* Светящийся контур при наведении */}
                <div className="absolute inset-0 border border-accent-lime/0 group-hover:border-accent-lime/40 rounded-[2.5rem] transition-colors duration-500 pointer-events-none" style={{ transform: "translateZ(20px)" }} />
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
