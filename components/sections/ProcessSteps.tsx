"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  ClipboardList, Truck, HardHat, Factory,
  PackageCheck, Download, CheckCircle2
} from "lucide-react";
import { GlassVideo } from "@/components/ui/GlassVideo";

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
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 35,
    damping: 30,
    restDelta: 0.001
  });

  // Движение всей ленты конвейера
  const xTransform = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section id="process" ref={targetRef} className="relative h-[500vh] bg-black overflow-hidden">
      <div className="sticky top-0 h-screen flex flex-col justify-center">
        
        {/* Заголовок секции */}
        <div className="container relative z-40 mb-20">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter"
          >
            КОНВЕЙЕР <span className="text-accent-lime">FF24</span>
          </motion.h2>
        </div>

        {/* Конструкция конвейера */}
        <div className="relative w-full h-[500px] flex items-center">
          
          {/* Основная станина конвейера (черная база) */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-40 bg-white/[0.02] border-y border-white/5 backdrop-blur-sm z-10" />

          {/* Светящиеся рельсы (как на картинке) */}
          <div className="absolute inset-x-0 top-[40%] h-px bg-accent-lime/20 z-20 shadow-[0_0_20px_rgba(224,255,100,0.2)]" />
          <div className="absolute inset-x-0 top-[60%] h-px bg-accent-lime/20 z-20 shadow-[0_0_20px_rgba(224,255,100,0.2)]" />
          
          {/* Динамическая линия движения */}
          <motion.div 
            style={{ scaleX: smoothProgress }}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-accent-lime z-30 origin-left shadow-[0_0_30px_#E0FF64]" 
          />

          {/* Лента с карточками */}
          <motion.div 
            style={{ x: xTransform }} 
            className="flex gap-12 px-[10vw] relative z-40 mt-[-50px]"
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="relative min-w-[280px] md:min-w-[320px] h-[380px] group"
              >
                {/* Стеклянная подставка под карточку */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-accent-lime/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative h-full w-full rounded-2xl p-[1px] overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md hover:border-accent-lime/50 transition-all duration-500 group-hover:-translate-y-4">
                  {/* Видео внутри каждой детали конвейера */}
                  <GlassVideo 
                    src="/videos/process-bg.webm" 
                    opacity={0.1} 
                    blur="blur-[20px]" 
                  />
                  
                  <div className="relative z-10 p-8 h-full flex flex-col">
                    <div className="w-16 h-16 rounded-xl bg-accent-lime/10 flex items-center justify-center text-accent-lime mb-6 border border-accent-lime/20">
                      {step.icon}
                    </div>
                    
                    <div className="mb-4">
                      <span className="text-xs font-bold text-accent-lime/40 uppercase tracking-[0.3em]">Этап 0{i + 1}</span>
                      <h3 className="text-2xl font-black italic uppercase tracking-tighter mt-1">{step.title}</h3>
                    </div>
                    
                    <p className="text-white/40 text-sm uppercase leading-snug">
                      {step.desc}
                    </p>

                    <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
                      <div className="w-2 h-2 rounded-full bg-accent-lime animate-pulse" />
                      <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest transition-colors group-hover:text-accent-lime/60">System Active</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Фоновые элементы для объема */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-accent-lime/5 to-transparent pointer-events-none" />
      </div>
    </section>
  );
};
