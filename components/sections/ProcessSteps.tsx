"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/constants";
import { ScanLine, ChevronDown } from "lucide-react";

export const ProcessSteps = () => {
  const [placedSteps, setPlacedSteps] = useState<number[]>([]);
  const [isExploding, setIsExploding] = useState(false);
  
  // Рефы для оптимизации и drag-n-drop
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  
  // Хуки производительности
  const isInView = useInView(containerRef, { once: false, margin: "0px 0px -200px 0px" });
  const shouldReduceMotion = useReducedMotion();

  // Предвычисление векторов взрыва для снятия нагрузки с рендера
  const explosionVectors = useMemo(() => {
    return PROCESS_STEPS.map(() => ({
      x: (Math.random() - 0.5) * 600,
      y: -400 - Math.random() * 200,
      r: Math.random() * 360,
    }));
  }, []);

  // Проверка завершения игры
  useEffect(() => {
    if (placedSteps.length === PROCESS_STEPS.length && !isExploding) {
      setIsExploding(true);
      // Плавный скролл к форме после взрыва
      const timer = setTimeout(() => {
        document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [placedSteps, isExploding]);

  // Логика броска (Drag & Drop)
  const handleDragEnd = (e: any, info: any, stepId: number) => {
    // Если пользователь потянул карточку вверх
    if (info.offset.y < -50) {
      if (!placedSteps.includes(stepId)) {
        setPlacedSteps((prev) => [...prev, stepId]);
      }
    }
  };

  const progress = (placedSteps.length / PROCESS_STEPS.length) * 100;
  const size = 180;
  const half = size / 2;

  // Определение текущей анимации коробки
  const getBoxAnimation = () => {
    if (shouldReduceMotion) return { rotateY: -20, rotateX: -15 };
    if (isExploding) return { rotateY: [0, 360], scale: [1, 1.2, 1], rotateX: [-15, -25, -15] };
    if (isInView) return { rotateY: [-20, 20, -20], rotateX: [-15, -5, -15] };
    return { rotateY: -20, rotateX: -15 }; // Статика, если вне экрана
  };

  return (
    <section 
      id="process" 
      ref={containerRef}
      className="py-32 relative overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
            Собери <span className="text-lime-500 dark:text-[#E0FF64]">Конвейер</span>
          </h2>
          <p className="mt-4 text-slate-500 font-bold uppercase tracking-widest text-xs">
            Перетащите все этапы в коробку, чтобы запустить процесс
          </p>
        </motion.div>

        {/* Прогресс-бар мини-игры */}
        <div className="max-w-md mx-auto mb-16 relative h-2 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden shadow-inner">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-lime-400 to-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* 3D-КОРОБКА */}
        <div ref={boxRef} className="relative mx-auto mb-32 mt-10" style={{ width: size, height: size, perspective: "1500px" }}>
          <motion.div
            animate={getBoxAnimation()}
            transition={isExploding ? { duration: 1.5, ease: "easeInOut" } : { repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="w-full h-full relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Ядро (Оптимизировано: shadow вместо blur для производительности) */}
            <motion.div 
              animate={{ opacity: 0.2 + (progress / 100) * 0.8, scale: 1 + (progress / 100) * 0.5 }}
              className="absolute inset-0 bg-transparent rounded-full shadow-[0_0_80px_rgba(224,255,100,0.6)]"
              style={{ transform: "translateZ(0)" }}
            />

            {/* Грани коробки */}
            <div className="absolute inset-0 bg-slate-900/60 dark:bg-black/60 border border-[#E0FF64]/30 backdrop-blur-md" style={{ transform: `rotateY(180deg) translateZ(${half}px)` }} />
            <div className="absolute inset-0 bg-white/10 border border-[#E0FF64]/40 backdrop-blur-md shadow-[inset_20px_0_40px_rgba(0,0,0,0.5)]" style={{ transform: `rotateY(-90deg) translateZ(${half}px)` }} />
            <div className="absolute inset-0 bg-white/10 border border-[#E0FF64]/40 backdrop-blur-md shadow-[inset_-20px_0_40px_rgba(255,255,255,0.05)]" style={{ transform: `rotateY(90deg) translateZ(${half}px)` }} />
            <div className="absolute inset-0 bg-slate-950 border border-[#E0FF64]/50 shadow-[0_50px_100px_rgba(224,255,100,0.4)]" style={{ transform: `rotateX(-90deg) translateZ(${half}px)` }} />
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border-2 border-[#E0FF64]/50 flex items-center justify-center shadow-[inset_0_0_50px_rgba(224,255,100,0.2)]" style={{ transform: `translateZ(${half}px)` }}>
              <ScanLine className="w-16 h-16 text-[#E0FF64]/50" />
            </div>

            {/* Створки коробки */}
            <motion.div
              animate={{ rotateX: isExploding ? 140 : [0, 20, 0] }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute top-0 w-full h-1/2 bg-white/20 backdrop-blur-md border border-[#E0FF64]/60 origin-top shadow-lg"
              style={{ transform: `translateZ(${half}px)` }}
            />
            <motion.div
              animate={{ rotateX: isExploding ? 140 : [0, 20, 0] }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute top-0 w-full h-1/2 bg-slate-900/60 backdrop-blur-md border border-[#E0FF64]/40 origin-top"
              style={{ transform: `rotateY(180deg) translateZ(${half}px)` }}
            />

            {/* ВЗРЫВ (Вылет иконок по предвычисленным векторам) */}
            <AnimatePresence>
              {isExploding && PROCESS_STEPS.map((step, i) => {
                const vector = explosionVectors[i];
                return (
                  <motion.div
                    key={`explosion-${step.id}`}
                    initial={{ y: 0, x: 0, scale: 0, opacity: 1 }}
                    animate={{ 
                      y: vector.y, 
                      x: vector.x, 
                      scale: [0, 1.5, 1],
                      rotateZ: vector.r,
                      opacity: [1, 1, 0]
                    }}
                    transition={{ duration: 2.5, ease: "easeOut", delay: i * 0.1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="bg-lime-400 dark:bg-[#E0FF64] text-black font-black px-4 py-2 rounded-xl shadow-[0_0_30px_#E0FF64] whitespace-nowrap">
                      {step.title}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Индикатор дропа */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50 animate-bounce pointer-events-none">
            <span className="text-xs font-black uppercase text-lime-600 dark:text-[#E0FF64] tracking-widest mb-2">Бросать сюда</span>
            <ChevronDown className="w-6 h-6 text-lime-600 dark:text-[#E0FF64]" />
          </div>
        </div>

        {/* ДРАГ-Н-ДРОП ЭЛЕМЕНТЫ */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 relative z-50">
          <AnimatePresence>
            {PROCESS_STEPS.map((step, index) => {
              if (placedSteps.includes(index)) return null;

              return (
                <motion.div
                  key={step.id}
                  layoutId={`step-${step.id}`}
                  drag
                  dragSnapToOrigin
                  dragConstraints={containerRef} // Ограничение зоны перетаскивания
                  onDragEnd={(e, info) => handleDragEnd(e, info, index)}
                  whileHover={{ scale: 1.05, y: -10, cursor: "grab" }}
                  whileDrag={{ scale: 1.1, cursor: "grabbing", zIndex: 100, rotate: -5 }}
                  className="bg-white dark:bg-slate-900/80 border-2 border-slate-200 dark:border-white/20 p-4 rounded-2xl flex flex-col items-center text-center shadow-lg hover:border-lime-500 dark:hover:border-[#E0FF64]/50 hover:shadow-2xl transition-colors touch-none"
                >
                  <div className="w-10 h-10 rounded-xl bg-lime-100 dark:bg-white/5 flex items-center justify-center text-lime-600 dark:text-[#E0FF64] mb-3 font-black">
                    {step.id}
                  </div>
                  <h3 className="text-slate-900 dark:text-white font-black uppercase text-[10px] tracking-wide pointer-events-none">
                    {step.title}
                  </h3>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
