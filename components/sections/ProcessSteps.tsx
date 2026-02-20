"use client";

import React from "react";
import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/constants";
import { Barcode, CheckCircle, PackageSearch } from "lucide-react";

// CSS 3D Коробка, из которой вылетает информация
const CSS3DBox = () => {
  return (
    <div className="relative w-48 h-48 mx-auto mb-16" style={{ perspective: "1000px" }}>
      <motion.div 
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d", transform: "rotateX(60deg) rotateZ(-45deg)" }}
      >
        {/* Дно коробки */}
        <div className="absolute inset-0 bg-[#E0FF64]/20 border border-[#E0FF64]/50 shadow-[0_0_50px_rgba(224,255,100,0.2)]" />
        
        {/* Левая стенка */}
        <div className="absolute inset-0 bg-white/10 border border-white/20 origin-left" style={{ transform: "rotateY(90deg) translateZ(-192px)" }} />
        {/* Правая стенка */}
        <div className="absolute inset-0 bg-white/20 border border-white/20 origin-bottom" style={{ transform: "rotateX(90deg) translateZ(-192px)" }} />

        {/* Открывающаяся крышка */}
        <motion.div 
          animate={{ rotateY: [-90, -160, -90] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
          className="absolute inset-0 bg-[#E0FF64]/40 border-2 border-[#E0FF64] origin-left backdrop-blur-sm"
        />

        {/* Вылетающие элементы из коробки */}
        <motion.div 
          animate={{ z: [0, 150, 0], opacity: [0, 1, 0], rotateZ: [0, 45, 90] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Barcode className="w-12 h-12 text-white drop-shadow-[0_0_10px_#E0FF64]" style={{ transform: "rotateX(-60deg) rotateZ(45deg)" }} />
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

        {/* Анимированная 3D Коробка */}
        <CSS3DBox />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 relative z-10">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-card p-6 rounded-2xl flex flex-col items-center text-center relative overflow-hidden group hover:border-[#E0FF64]/50 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#E0FF64]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#E0FF64] mb-4 font-black group-hover:bg-[#E0FF64] group-hover:text-black transition-colors">
                {step.id}
              </div>
              <h3 className="text-white font-black uppercase text-xs mb-2 tracking-wide">
                {step.title}
              </h3>
              <p className="text-white/40 text-[10px] font-medium leading-relaxed uppercase tracking-widest">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
