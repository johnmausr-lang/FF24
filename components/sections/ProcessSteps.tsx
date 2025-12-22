"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ClipboardList, Truck, HardHat, Factory, 
  PackageCheck, Download, CheckCircle2, Settings, Zap
} from "lucide-react";

const steps = [
  { title: "Заявка", desc: "Аналитика и ТЗ", icon: <ClipboardList /> },
  { title: "Забор", desc: "Логистика 24/7", icon: <Truck /> },
  { title: "Приёмка", desc: "Smart-контроль", icon: <HardHat /> },
  { title: "Маркировка", desc: "Data Matrix / ЧЗ", icon: <Factory /> },
  { title: "Упаковка", desc: "Premium Standard", icon: <PackageCheck /> },
  { title: "Отгрузка", desc: "WB / Ozon / MM", icon: <Download className="rotate-180" /> },
  { title: "Финиш", desc: "Ready for Sale", icon: <CheckCircle2 /> },
];

const doubledSteps = [...steps, ...steps];

export const ProcessSteps = () => {
  return (
    <section id="process" className="relative py-40 bg-black overflow-hidden h-[1000px] flex flex-col justify-center">
      
      {/* Фон с сеткой для 3D глубины */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="container relative z-50 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex items-center gap-6"
        >
          <div className="h-1 w-20 bg-accent-lime" />
          <h2 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">
            SMART <span className="text-accent-lime">FLOW</span>
          </h2>
        </motion.div>
      </div>

      {/* 3D Сцена */}
      <div className="relative w-full perspective-3000 preserve-3d">
        
        {/* КОРПУС СТАНИНЫ */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[150%] h-[480px] z-10 preserve-3d rotate-x-25">
          {/* Стеклянная поверхность станины */}
          <div className="absolute inset-0 bg-white/[0.02] border border-white/10 rounded-[8rem] backdrop-blur-md overflow-hidden">
             {/* Скан-линия */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-lime/5 to-transparent h-1/2 w-full animate-scanline" />
          </div>
          
          {/* Боковая грань с техническим текстом */}
          <div className="absolute -bottom-16 left-0 w-full h-32 bg-gradient-to-b from-white/10 to-transparent border-x border-white/5 opacity-30 flex items-center px-60 justify-between">
             <span className="text-[10px] font-mono text-accent-lime uppercase tracking-[1em]">Industrial_Protocol_v4.0</span>
             <span className="text-[10px] font-mono text-accent-lime uppercase tracking-[1em]">FF24_Systems_Ready</span>
          </div>

          {/* Неоновый "двигатель" */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-accent-lime/10">
            <motion.div 
              animate={{ x: ["-100%", "250%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-1/4 h-full bg-gradient-to-r from-transparent via-accent-lime to-transparent shadow-[0_0_40px_#E0FF64]"
            />
          </div>
        </div>

        {/* ЛЕНТА С КАРТОЧКАМИ */}
        <div className="relative z-40 flex overflow-hidden py-32 mask-edges rotate-x-25 preserve-3d">
          <div className="flex gap-16 animate-conveyor-loop hover:pause-state px-10">
            {doubledSteps.map((step, i) => (
              <motion.div
                key={i}
                whileHover={{ z: 50 }}
                className="relative min-w-[380px] h-[500px] group preserve-3d"
              >
                {/* Динамическая тень */}
                <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-3/4 h-16 bg-black/90 blur-3xl group-hover:bg-accent-lime/20 transition-all duration-500" />
                
                {/* КАРТОЧКА (Стекло) */}
                <div className="relative h-full w-full rounded-[4rem] p-[1px] bg-white/5 border border-white/10 backdrop-blur-3xl group-hover:border-accent-lime/50 group-hover:-translate-y-16 transition-all duration-700 ease-[0.2,1,0.3,1]">
                  
                  {/* Внутренние блики */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_70%)]" />
                  
                  <div className="relative z-10 p-14 h-full flex flex-col">
                    {/* Header карточки */}
                    <div className="flex justify-between items-start mb-12">
                      <motion.div 
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        className="w-20 h-20 rounded-3xl bg-black border border-white/10 flex items-center justify-center text-accent-lime shadow-[0_0_30px_rgba(224,255,100,0.1)] group-hover:border-accent-lime/50 group-hover:shadow-[0_0_40px_rgba(224,255,100,0.2)] transition-all duration-500"
                      >
                        {React.cloneElement(step.icon as React.ReactElement, { size: 32 })}
                      </motion.div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-mono text-white/20 tracking-[0.5em]">0{i % 7 + 1}</span>
                        <Zap size={12} className="text-accent-lime mt-2 animate-pulse" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                      <h3 className="text-4xl font-black italic uppercase tracking-tighter leading-none group-hover:text-accent-lime transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-white/40 text-sm font-medium uppercase leading-relaxed tracking-wider max-w-[240px]">
                        {step.desc}
                      </p>
                    </div>

                    {/* Footer карточки */}
                    <div className="mt-auto pt-10 border-t border-white/5 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-2 h-2 rounded-full bg-accent-lime" />
                            <div className="absolute inset-0 w-2 h-2 rounded-full bg-accent-lime animate-ping" />
                          </div>
                          <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Live_Stream</span>
                       </div>
                       <Settings size={16} className="text-white/10 animate-spin-slow group-hover:text-accent-lime/40 transition-colors" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
        .rotate-x-25 { transform: rotateX(25deg); }
        .pause-state:hover { animation-play-state: paused; }
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>
    </section>
  );
};
