"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ClipboardList, Truck, HardHat, Factory, 
  PackageCheck, Download, CheckCircle2, Settings 
} from "lucide-react";

const steps = [
  { title: "Заявка", desc: "Регистрация ТЗ", icon: <ClipboardList size={24} /> },
  { title: "Забор", desc: "Логистика", icon: <Truck size={24} /> },
  { title: "Приёмка", desc: "Контроль брака", icon: <HardHat size={24} /> },
  { title: "Маркировка", desc: "Честный Знак", icon: <Factory size={24} /> },
  { title: "Упаковка", desc: "Подготовка", icon: <PackageCheck size={24} /> },
  { title: "Отгрузка", desc: "Склад МП", icon: <Download size={24} className="rotate-180" /> },
  { title: "Финиш", desc: "Готов к продаже", icon: <CheckCircle2 size={24} /> },
];

const doubledSteps = [...steps, ...steps];

export const ProcessSteps = () => {
  return (
    <section id="process" className="relative py-40 bg-black overflow-hidden h-[1000px] flex flex-col justify-center">
      <div className="container relative z-50 mb-32">
        <h2 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter">
          ЛИНИЯ <span className="text-accent-lime">FF24</span>
        </h2>
      </div>

      <div className="relative w-full perspective-3000 preserve-3d">
        {/* Станина */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[130%] h-[420px] z-10 rotate-x-25 preserve-3d">
          <div className="absolute inset-0 bg-white/[0.02] border border-white/10 rounded-[6rem] shadow-[0_50px_100px_rgba(0,0,0,0.9)]" />
          <div className="absolute bottom-12 left-0 w-full h-[1px] bg-accent-lime/20">
             <motion.div 
               animate={{ x: ["-100%", "200%"] }}
               transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
               className="w-1/3 h-full bg-accent-lime shadow-[0_0_30px_#E0FF64]" 
             />
          </div>
        </div>

        {/* Лента */}
        <div className="relative z-40 flex overflow-hidden py-24 mask-edges rotate-x-25 preserve-3d">
          <div className="flex gap-16 animate-conveyor-loop hover:pause-state">
            {doubledSteps.map((step, i) => (
              <div key={i} className="relative min-w-[370px] h-[480px] group preserve-3d">
                <div className="relative h-full w-full rounded-[3.5rem] p-[1px] bg-white/5 border border-white/10 backdrop-blur-3xl group-hover:border-accent-lime/50 group-hover:-translate-y-12 transition-all duration-700 ease-conveyor">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                  <div className="relative z-10 p-12 h-full flex flex-col justify-between">
                    <div>
                      <div className="w-16 h-16 rounded-2xl bg-accent-lime/10 flex items-center justify-center text-accent-lime mb-8 border border-accent-lime/20">{step.icon}</div>
                      <h3 className="text-3xl font-black italic uppercase tracking-tighter">{step.title}</h3>
                      <p className="text-white/40 text-sm uppercase mt-4">{step.desc}</p>
                    </div>
                    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                       <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest transition-colors group-hover:text-accent-lime/60">System_Active</span>
                       <Settings size={14} className="text-white/10 animate-spin-slow" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .pause-state:hover { animation-play-state: paused; }
      `}</style>
    </section>
  );
};
