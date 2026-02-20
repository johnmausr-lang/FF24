"use client";

import React from "react";
import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/constants";
import { Barcode, Box, ShieldCheck, Zap } from "lucide-react";

// Математически точная 3D-коробка с анимацией открытия
const Premium3DBox = () => {
  const half = 64; // Половина ширины коробки (128/2) для правильного позиционирования граней

  return (
    <div className="relative w-32 h-32 mx-auto mb-32 mt-10" style={{ perspective: "1200px" }}>
      <motion.div
        // Плавное покачивание всей коробки для демонстрации объема
        animate={{ rotateY: [-20, 20, -20], rotateX: [-15, -5, -15] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Внутреннее свечение (груз) */}
        <div className="absolute inset-0 bg-[#E0FF64]/20 blur-2xl" style={{ transform: "translateZ(0)" }} />

        {/* --- ГРАНИ КОРОБКИ --- */}
        {/* Задняя стенка */}
        <div className="absolute inset-0 bg-slate-900/90 border border-[#E0FF64]/20" style={{ transform: `rotateY(180deg) translateZ(${half}px)` }} />
        {/* Левая стенка */}
        <div className="absolute inset-0 bg-slate-800/90 border border-[#E0FF64]/30" style={{ transform: `rotateY(-90deg) translateZ(${half}px)` }} />
        {/* Правая стенка */}
        <div className="absolute inset-0 bg-slate-800/90 border border-[#E0FF64]/30" style={{ transform: `rotateY(90deg) translateZ(${half}px)` }} />
        {/* Дно */}
        <div className="absolute inset-0 bg-black border border-[#E0FF64]/50 shadow-[0_20px_50px_rgba(224,255,100,0.6)]" style={{ transform: `rotateX(-90deg) translateZ(${half}px)` }} />
        
        {/* Передняя стенка (полупрозрачное стекло с иконкой) */}
        <div className="absolute inset-0 bg-slate-800/60 backdrop-blur-md border border-[#E0FF64]/50 flex items-center justify-center shadow-[inset_0_0_20px_rgba(224,255,100,0.1)]" style={{ transform: `translateZ(${half}px)` }}>
          <Box className="w-8 h-8 text-[#E0FF64]/40" />
        </div>

        {/* --- ОТКИДНЫЕ СТВОРКИ (КРЫШКА) --- */}
        {/* Передняя створка */}
        <motion.div
          animate={{ rotateX: [0, 120, 0] }} // 120 градусов для полного открытия
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-0 w-full h-1/2 bg-slate-800/80 backdrop-blur-sm border border-[#E0FF64]/60 origin-top"
          style={{ transform: `translateZ(${half}px)` }}
        />
        {/* Задняя створка */}
        <motion.div
          animate={{ rotateX: [0, 120, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-0 w-full h-1/2 bg-slate-900/80 border border-[#E0FF64]/40 origin-top"
          style={{ transform: `rotateY(180deg) translateZ(${half}px)` }}
        />

        {/* --- ВЫЛЕТАЮЩИЕ ИНТЕРФЕЙСЫ (ДАННЫЕ) --- */}
        {/* Голограмма "Упаковано" */}
        <motion.div
          animate={{ y: [20, -120], opacity: [0, 1, 0], scale: [0.5, 1.2, 0.8], rotateZ: [0, 10, -10] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeOut", delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="bg-[#E0FF64]/10 border border-[#E0FF64]/50 p-3 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(224,255,100,0.5)] flex items-center gap-2">
            <Barcode className="w-5 h-5 text-[#E0FF64]" />
            <span className="text-[#E0FF64] font-black text-[10px] uppercase tracking-widest">Промаркировано</span>
          </div>
        </motion.div>

        {/* Голограмма "Безопасность" */}
        <motion.div
          animate={{ y: [0, -150], opacity: [0, 1, 0], scale: [0.5, 1, 0.5], rotateZ: [0, -15, 15] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeOut", delay: 2.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="bg-white/10 border border-white/30 p-4 rounded-full backdrop-blur-md shadow-xl">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
        </motion.div>

        {/* Искра скорости */}
        <motion.div
          animate={{ y: [10, -100], opacity: [0, 1, 0], x: [0, 40] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeOut", delay: 1.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Zap className="w-6 h-6 text-lime-400 drop-shadow-[0_0_15px_#E0FF64]" />
        </motion.div>

      </motion.div>
    </div>
  );
};

export const ProcessSteps = () => {
  return (
    <section id="process" className="py-32 relative bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter">
            Умный <span className="text-gradient">Конвейер</span>
          </h2>
        </motion.div>

        {/* Наша новая премиальная 3D-коробка */}
        <Premium3DBox />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 relative z-10">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-card p-6 rounded-3xl flex flex-col items-center text-center relative overflow-hidden group hover:border-[#E0FF64]/50 hover:-translate-y-2 transition-all duration-300 cursor-default"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#E0FF64]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#E0FF64] mb-4 font-black group-hover:bg-[#E0FF64] group-hover:text-black transition-colors duration-300 shadow-inner">
                {step.id}
              </div>
              
              <h3 className="text-white font-black uppercase text-xs mb-3 tracking-wide group-hover:text-[#E0FF64] transition-colors">
                {step.title}
              </h3>
              
              <p className="text-white/40 group-hover:text-white/70 text-[10px] font-medium leading-relaxed uppercase tracking-widest transition-colors">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
