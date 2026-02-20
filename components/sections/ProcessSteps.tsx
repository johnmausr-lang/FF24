"use client";

import React from "react";
import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/constants";
import { Barcode, Box, ShieldCheck, Zap, ScanLine } from "lucide-react";

// Ультимативная Голографическая 3D-коробка
const Premium3DBox = () => {
  const size = 160; 
  const half = size / 2;

  return (
    <div className="relative mx-auto mb-40 mt-20" style={{ width: size, height: size, perspective: "1500px" }}>
      <motion.div
        animate={{ rotateY: [-25, 25, -25], rotateX: [-15, -5, -15] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Парящий неоновый "товар" внутри коробки */}
        <motion.div 
          animate={{ y: [-10, 10, -10], scale: [0.9, 1, 0.9] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: "translateZ(0)" }}
        >
          <div className="w-16 h-16 bg-[#E0FF64] rounded-xl shadow-[0_0_80px_rgba(224,255,100,0.8)] flex items-center justify-center">
            <Box className="w-8 h-8 text-black" />
          </div>
        </motion.div>

        {/* Сканирующий лазер */}
        <motion.div
          animate={{ translateY: [0, size, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute left-[-20%] right-[-20%] h-1 bg-[#E0FF64] shadow-[0_0_20px_#E0FF64] z-50 opacity-50"
          style={{ transform: `translateZ(${half + 1}px)` }}
        />

        {/* --- ГРАНИ СТЕКЛЯННОЙ КОРОБКИ --- */}
        {/* Задняя стенка (самая темная) */}
        <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 border border-[#E0FF64]/20 backdrop-blur-sm" style={{ transform: `rotateY(180deg) translateZ(${half}px)` }} />
        
        {/* Левая стенка */}
        <div className="absolute inset-0 bg-white/5 dark:bg-white/5 border border-[#E0FF64]/30 backdrop-blur-md shadow-[inset_20px_0_40px_rgba(0,0,0,0.5)]" style={{ transform: `rotateY(-90deg) translateZ(${half}px)` }} />
        
        {/* Правая стенка */}
        <div className="absolute inset-0 bg-white/10 dark:bg-white/10 border border-[#E0FF64]/40 backdrop-blur-md shadow-[inset_-20px_0_40px_rgba(255,255,255,0.05)]" style={{ transform: `rotateY(90deg) translateZ(${half}px)` }} />
        
        {/* Дно (с массивной тенью) */}
        <div className="absolute inset-0 bg-slate-950/80 border border-[#E0FF64]/50 shadow-[0_50px_100px_rgba(224,255,100,0.4)]" style={{ transform: `rotateX(-90deg) translateZ(${half}px)` }} />
        
        {/* Передняя стенка (самая прозрачная, с логотипом) */}
        <div className="absolute inset-0 bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-[#E0FF64]/50 flex items-center justify-center shadow-[inset_0_0_30px_rgba(224,255,100,0.15)]" style={{ transform: `translateZ(${half}px)` }}>
          <ScanLine className="w-12 h-12 text-[#E0FF64]/30" />
        </div>

        {/* --- ОТКИДНЫЕ СТВОРКИ (КРЫШКА) --- */}
        <motion.div
          animate={{ rotateX: [0, 130, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-0 w-full h-1/2 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-[#E0FF64]/60 origin-top shadow-lg"
          style={{ transform: `translateZ(${half}px)` }}
        />
        <motion.div
          animate={{ rotateX: [0, 130, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-0 w-full h-1/2 bg-slate-900/40 dark:bg-black/40 backdrop-blur-md border border-[#E0FF64]/40 origin-top"
          style={{ transform: `rotateY(180deg) translateZ(${half}px)` }}
        />

        {/* --- ГОЛОГРАФИЧЕСКИЕ ИНТЕРФЕЙСЫ (ВЫЛЕТАЮТ ИЗ КОРОБКИ) --- */}
        <motion.div
          animate={{ y: [0, -180], opacity: [0, 1, 0], scale: [0.5, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeOut", delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
          style={{ transformStyle: "preserve-3d", transform: "translateZ(50px)" }}
        >
          <div className="bg-[#E0FF64]/10 border border-[#E0FF64]/50 px-4 py-2 rounded-xl backdrop-blur-xl shadow-[0_0_40px_rgba(224,255,100,0.4)] flex items-center gap-3">
            <Barcode className="w-6 h-6 text-[#E0FF64]" />
            <span className="text-[#E0FF64] font-black text-xs uppercase tracking-widest drop-shadow-md">Промаркировано</span>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -140], x: [0, -80], opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeOut", delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="bg-white/10 border border-white/30 p-3 rounded-full backdrop-blur-xl shadow-2xl">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -120], x: [0, 90], opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut", delay: 1.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="bg-lime-500/20 border border-lime-400/50 p-3 rounded-full backdrop-blur-xl shadow-2xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-lime-400" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export const ProcessSteps = () => {
  return (
    <section id="process" className="py-32 relative bg-slate-50 dark:bg-black transition-colors duration-500 overflow-hidden">
      {/* Сетка на фоне для технологичности */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter transition-colors">
            Умный <span className="text-lime-500 dark:text-[#E0FF64]">Конвейер</span>
          </h2>
        </motion.div>

        {/* Интеграция премиум-коробки */}
        <Premium3DBox />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 relative z-10">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 rounded-3xl flex flex-col items-center text-center relative overflow-hidden group hover:border-lime-500 dark:hover:border-[#E0FF64]/50 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl dark:shadow-none"
            >
              {/* Эффект прожектора при наведении */}
              <div className="absolute inset-0 bg-gradient-to-b from-lime-400/10 dark:from-[#E0FF64]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-lime-600 dark:text-[#E0FF64] mb-4 font-black group-hover:bg-lime-400 dark:group-hover:bg-[#E0FF64] group-hover:text-slate-900 transition-all duration-300 shadow-inner group-hover:scale-110">
                {step.id}
              </div>
              
              <h3 className="text-slate-900 dark:text-white font-black uppercase text-xs mb-3 tracking-wide group-hover:text-lime-600 dark:group-hover:text-[#E0FF64] transition-colors">
                {step.title}
              </h3>
              
              <p className="text-slate-500 dark:text-white/40 group-hover:text-slate-700 dark:group-hover:text-white/70 text-[10px] font-bold leading-relaxed uppercase tracking-widest transition-colors">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
