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
    <section id="process" className="relative py-32 bg-black overflow-hidden h-[900px] flex flex-col justify-center">
      
      <div className="container relative z-40 mb-24">
        <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter">
          КОНВЕЙЕР <span className="text-accent-lime">FF24</span>
        </h2>
      </div>

      {/* КОНСТРУКЦИЯ КОНВЕЙЕРА С ПЕРСПЕКТИВОЙ */}
      <div className="relative w-full" style={{ perspective: '2000px' }}>
        
        {/* Станина конвейера (Корпус) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[115%] h-[350px] z-10">
          {/* Верхняя стеклянная плоскость под углом */}
          <div className="absolute inset-0 bg-white/[0.03] border-t border-white/10 rounded-[4rem] transform rotate-x-12 shadow-[0_-20px_50px_rgba(255,255,255,0.02)]" />
          
          {/* Боковая панель с неоновым рельсом (как на фото) */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/40 to-black/80 border-b border-accent-lime/30 rounded-b-[4rem] flex items-center px-32">
             <div className="w-full h-[2px] bg-accent-lime/10 relative overflow-hidden">
                <motion.div 
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-1/3 bg-accent-lime shadow-[0_0_25px_#E0FF64]" 
                />
             </div>
          </div>

          {/* Технические детали (шестерни) */}
          <div className="absolute left-16 top-1/2 -translate-y-1/2 opacity-20">
             <Settings className="animate-spin-slow text-accent-lime" size={100} />
          </div>
        </div>

        {/* ЛЕНТА С КАРТОЧКАМИ */}
        <div className="relative z-30 flex overflow-hidden py-20 mask-edges">
          <div className="flex gap-12 animate-conveyor-loop hover:pause">
            {doubledSteps.map((step, i) => (
              <div
                key={i}
                className="relative min-w-[340px] h-[400px] group transition-all duration-700"
              >
                {/* Эффект тени на ленте */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-2/3 h-12 bg-accent-lime/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative h-full w-full rounded-[2.5rem] p-[1px] overflow-hidden bg-white/5 border border-white/10 backdrop-blur-2xl group-hover:border-accent-lime/50 group-hover:-translate-y-8 transition-all duration-500">
                  
                  {/* Внутренний градиент (вместо видео для избежания 404) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-lime/[0.03] to-transparent" />
                  
                  <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="w-16 h-16 rounded-2xl bg-accent-lime/10 flex items-center justify-center text-accent-lime mb-8 border border-accent-lime/20 shadow-inner">
                        {step.icon}
                      </div>
                      <span className="text-[10px] font-bold text-accent-lime/40 uppercase tracking-[0.4em]">Step_Auto_0{i % 7 + 1}</span>
                      <h3 className="text-3xl font-black italic uppercase tracking-tighter mt-2">{step.title}</h3>
                      <p className="text-white/40 text-xs uppercase mt-3 leading-relaxed tracking-wider">{step.desc}</p>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse shadow-[0_0_10px_#E0FF64]" />
                          <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Active_Node</span>
                       </div>
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
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
        .pause:hover {
          animation-play-state: paused;
        }
        .rotate-x-12 {
          transform: rotateX(15deg);
        }
      `}</style>
    </section>
  );
};
