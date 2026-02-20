"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/constants";
import { PackageSearch, Truck, ShieldCheck, Barcode, Box, Rocket, Camera } from "lucide-react";

// Карта иконок для каждого этапа (добавляет визуальный вес)
const STEP_ICONS = [
  PackageSearch, Truck, ShieldCheck, Barcode, Box, Rocket, Camera
];

export const ProcessSteps = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Отслеживаем скролл для анимации "движения" по конвейеру
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Превращаем скролл в ширину зеленой линии
  const lineScale = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section 
      id="process" 
      ref={containerRef}
      className="py-32 relative bg-slate-50 overflow-hidden"
    >
      {/* Декоративные фоновые элементы (светлый стиль) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#E0FF64]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none mix-blend-multiply" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 uppercase italic tracking-tighter shadow-sm">
            Умный <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-emerald-500">Конвейер</span>
          </h2>
          <p className="mt-6 text-slate-500 font-bold max-w-2xl mx-auto uppercase tracking-widest text-xs">
            7 этапов непрерывной обработки 24/7
          </p>
        </motion.div>

        <div className="relative">
          {/* Линия конвейера (Трек) */}
          <div className="absolute left-[28px] top-0 bottom-0 w-1 bg-slate-200 rounded-full md:left-1/2 md:-translate-x-1/2" />
          
          {/* Анимированная линия прогресса */}
          <motion.div 
            style={{ height: lineScale }}
            className="absolute left-[28px] top-0 w-1 bg-gradient-to-b from-lime-400 to-emerald-500 rounded-full md:left-1/2 md:-translate-x-1/2 shadow-[0_0_15px_rgba(224,255,100,0.8)] origin-top" 
          />

          <div className="space-y-12 md:space-y-0 relative z-10">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = STEP_ICONS[index % STEP_ICONS.length];
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-16 relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Узел на конвейере (Кружок) */}
                  <div className="absolute left-0 md:left-1/2 -translate-x-[2px] md:-translate-x-1/2 w-14 h-14 bg-white border-4 border-slate-100 rounded-full flex items-center justify-center z-20 shadow-lg shadow-slate-200/50 group-hover:border-[#E0FF64] transition-colors">
                    <span className="text-slate-900 font-black text-sm">{step.id}</span>
                  </div>

                  {/* Спейсер для выравнивания */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Стеклянная Карточка */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 text-left"}`}>
                    <div className="group relative p-8 bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(224,255,100,0.2)] hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-default">
                      
                      {/* Объемный блик на стекле */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                      <div className={`flex items-center gap-4 mb-4 ${isEven ? "md:flex-row-reverse" : ""}`}>
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-inner group-hover:bg-[#E0FF64] group-hover:border-transparent group-hover:scale-110 transition-all duration-300">
                          <Icon className="w-5 h-5 text-slate-700 group-hover:text-slate-900" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                          {step.title}
                        </h3>
                      </div>

                      <p className="text-slate-600 font-medium leading-relaxed">
                        {step.desc}
                      </p>

                      {/* Декоративный элемент объема (эффект вдавленности) */}
                      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-tl from-slate-200/50 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
