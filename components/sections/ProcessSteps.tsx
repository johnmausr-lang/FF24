"use client";

import React from "react";
import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/constants";
import { Box, ArrowRight, CheckCircle2 } from "lucide-react";

export const ProcessSteps = () => {
  return (
    <section id="process" className="py-32 relative bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter">
            Наш <span className="text-[#E0FF64]">Конвейер</span>
          </h2>
          <p className="mt-6 text-white/50 font-medium max-w-2xl mx-auto uppercase tracking-widest text-xs">
            7 этапов обработки вашего товара за 24 часа
          </p>
        </motion.div>

        {/* Анимированная линия конвейера */}
        <div className="relative">
          {/* Свечение и сама линия (SVG/CSS) */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 hidden lg:block" />
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#E0FF64]/20 via-[#E0FF64] to-[#E0FF64]/20 -translate-y-1/2 shadow-[0_0_20px_rgba(224,255,100,0.5)] hidden lg:block" 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6 relative z-10">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="group relative"
              >
                {/* Карточка этапа */}
                <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-2xl hover:border-[#E0FF64]/50 transition-colors h-full flex flex-col items-start relative overflow-hidden">
                  {/* Фоновый градиент при наведении */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#E0FF64]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#E0FF64] mb-6 font-black group-hover:bg-[#E0FF64] group-hover:text-black transition-all">
                    {step.id}
                  </div>
                  
                  <h3 className="text-white font-black uppercase text-sm mb-3 tracking-wide">
                    {step.title}
                  </h3>
                  
                  <p className="text-white/50 text-xs font-medium leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Анимированный декоративный элемент (едущая коробка) */}
                  <motion.div 
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: index * 0.2 }}
                    className="absolute right-4 top-4 opacity-10 group-hover:opacity-50 transition-opacity"
                  >
                    <Box className="w-16 h-16 text-[#E0FF64]" />
                  </motion.div>
                </div>

                {/* Стрелки между карточками (мобильный вид) */}
                {index !== PROCESS_STEPS.length - 1 && (
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 lg:hidden text-white/20">
                    <ArrowRight className="w-4 h-4 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
