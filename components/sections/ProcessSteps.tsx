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

      {/* 3D КОНТЕЙНЕР ПЕРСПЕКТИВЫ */}
      <div className="relative w-full perspective-3000 preserve-3d">
        
        {/* Станина конвейера (Корпус с глубиной) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[120%] h-[400px] z-10 preserve-3d rotate-x-25">
          
          {/* Боковая "толстая" грань (дает объем корпусу) */}
          <div className="absolute -bottom-10 left-0 w-full h-20 bg-gradient-to-b from-white/10 to-transparent border-x border-white/5" />
          
          {/* Верхняя панель станины */}
          <div className="absolute inset-0 bg-white/[0.02] border border-white/10 rounded-[5rem] shadow-[0_40px_100px_rgba(0,0,0,0.9)]" />
          
          {/* Светящийся неоновый рельс */}
          <div className="absolute bottom-10 left-0 w-full h-[2px] bg-accent-lime/20 flex items-center">
             <motion.div 
               animate={{ x: ["-100%", "200%"] }}
               transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
               className="w-1/3 h-full bg-accent-lime shadow-[0_0_40px_#E0FF64]" 
             />
          </div>

          {/* Механические детали (Шестерни) */}
          <div className="absolute left-20 top-1/2 -translate-y-1/2 opacity-10">
             <Settings className="animate-spin-slow text-accent-lime" size={120} />
          </div>
        </div>

        {/* ЛЕНТА С ПАРЯЩИМИ КАРТОЧКАМИ */}
        <div className="relative z-30 flex overflow-hidden py-24 mask-edges-heavy rotate-x-25 preserve-3d">
          <div className="flex gap-16 animate-conveyor-loop hover:pause">
            {doubledSteps.map((step, i) => (
              <div
                key={i}
                className="relative min-w-[360px] h-[460px] group preserve-3d"
              >
                {/* Тень под каждой карточкой на ленте */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/60 blur-xl group-hover:bg-accent-lime/10 transition-colors" />
                
                <div className="relative h-full w-full rounded-[3rem] p-[1px] overflow-hidden bg-white/5 border border-white/10 backdrop-blur-3xl group-hover:border-accent-lime/50 group-hover:-translate-y-10 transition-all duration-700">
                  
                  {/* Заглушка градиентом вместо видео (убирает 404) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                  
                  <div className="relative z-10 p-12 h-full flex flex-col justify-between">
                    <div>
                      <div className="w-20 h-20 rounded-2xl bg-accent-lime/10 flex items-center justify-center text-accent-lime mb-10 border border-accent-lime/20 shadow-inner">
                        {step.icon}
                      </div>
                      <span className="text-[10px] font-bold text-accent-lime/30 uppercase tracking-[0.5em]">SYSTEM_STEP_0{i % 7 + 1}</span>
                      <h3 className="text-4xl font-black italic uppercase tracking-tighter mt-3">{step.title}</h3>
                      <p className="text-white/40 text-sm uppercase mt-4 leading-relaxed tracking-wide">{step.desc}</p>
                    </div>

                    <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-accent-lime animate-pulse shadow-[0_0_10px_#E0FF64]" />
                          <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest transition-colors group-hover:text-accent-lime/60">Node_Active</span>
                       </div>
                       <Settings size={18} className="text-white/5 animate-spin-slow" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .mask-edges-heavy {
          mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
        }
        .pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
