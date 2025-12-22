"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ClipboardList, Truck, HardHat, Factory,
  PackageCheck, Download, CheckCircle2, Settings
} from "lucide-react";
import { GlassVideo } from "@/components/ui/GlassVideo";

const steps = [
  { title: "Заявка", desc: "Регистрация ТЗ", icon: <ClipboardList size={24} /> },
  { title: "Забор", desc: "Логистика", icon: <Truck size={24} /> },
  { title: "Приёмка", desc: "Контроль брака", icon: <HardHat size={24} /> },
  { title: "Маркировка", desc: "Честный Знак", icon: <Factory size={24} /> },
  { title: "Упаковка", desc: "Подготовка", icon: <PackageCheck size={24} /> },
  { title: "Отгрузка", desc: "Склад МП", icon: <Download size={24} className="rotate-180" /> },
  { title: "Финиш", desc: "Готов к продаже", icon: <CheckCircle2 size={24} /> },
];

// Дублируем шаги для бесшовной зацикленной анимации
const doubledSteps = [...steps, ...steps];

export const ProcessSteps = () => {
  return (
    <section id="process" className="relative py-32 bg-black overflow-hidden h-[850px] flex flex-col justify-center">
      
      {/* Заголовок секции */}
      <div className="container relative z-40 mb-20">
        <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter">
          КОНВЕЙЕР <span className="text-accent-lime">FF24</span>
        </h2>
      </div>

      {/* Основная 3D конструкция */}
      <div className="relative w-full perspective-[2000px]">
        
        {/* Корпус станины конвейера */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[110%] h-[320px] z-10">
          {/* Верхняя стеклянная грань */}
          <div className="absolute inset-0 bg-white/[0.03] rounded-[3rem] border-t border-white/10 backdrop-blur-sm" />
          
          {/* Нижняя техническая панель с неоновой линией */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black/60 border-b border-accent-lime/20 rounded-b-[3rem] flex items-center px-24">
             <div className="w-full h-[2px] bg-accent-lime/10 relative overflow-hidden">
                <motion.div 
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-1/4 bg-accent-lime shadow-[0_0_15px_#E0FF64]" 
                />
             </div>
          </div>

          {/* Декоративные вращающиеся элементы (ролики) */}
          <div className="absolute left-12 top-1/2 -translate-y-1/2 opacity-20 animate-spin-slow">
             <Settings size={80} className="text-accent-lime" />
          </div>
        </div>

        {/* Движущаяся лента с карточками */}
        <div className="relative z-30 flex overflow-hidden py-16 mask-fade-side">
          <div className="flex gap-10 animate-conveyor-loop hover:pause-anim">
            {doubledSteps.map((step, i) => (
              <div
                key={i}
                className="relative min-w-[320px] h-[380px] group transition-transform duration-700"
              >
                {/* Свечение под блоком */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-accent-lime/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative h-full w-full rounded-3xl p-[1px] overflow-hidden bg-white/5 border border-white/10 backdrop-blur-2xl group-hover:border-accent-lime/40 group-hover:-translate-y-6 transition-all duration-500">
                  
                  {/* Заглушка для видео (предотвращает пустой блок при 404) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-lime/5 to-transparent" />
                  
                  {/* Фоновое видео */}
                  <GlassVideo 
                    src="/videos/process-bg.webm" 
                    opacity={0.05} 
                    blur="blur-[15px]" 
                  />
                  
                  <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-accent-lime/10 flex items-center justify-center text-accent-lime mb-8 border border-accent-lime/20">
                        {step.icon}
                      </div>
                      <span className="text-[10px] font-bold text-accent-lime/30 uppercase tracking-[0.4em]">Step_Auto_0{i % 7 + 1}</span>
                      <h3 className="text-2xl font-black italic uppercase tracking-tighter mt-2">{step.title}</h3>
                      <p className="text-white/40 text-xs uppercase mt-3 leading-relaxed tracking-wide">{step.desc}</p>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                       <span className="text-[9px] font-mono text-accent-lime/40 uppercase">Status: Online</span>
                       <div className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse shadow-[0_0_8px_#E0FF64]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .mask-fade-side {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
        .pause-anim {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
