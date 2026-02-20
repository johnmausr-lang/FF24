"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Calculator, Zap } from "lucide-react";

export const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Триггер при уходе мыши за верхнюю границу окна
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasTriggered]);

  const closePopup = () => setIsVisible(false);

  const scrollToForm = () => {
    setIsVisible(false);
    document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Темный блюр на фоне */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-md"
          />

          {/* Само окно (Glassmorphism) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 p-8 md:p-12 rounded-[2rem] shadow-2xl overflow-hidden"
          >
            {/* Фоновые декоративные свечения */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-lime-400/20 dark:bg-[#E0FF64]/20 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-emerald-400/20 dark:bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none" />

            {/* Кнопка закрытия */}
            <button
              onClick={closePopup}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/50 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-lime-100 dark:bg-[#E0FF64]/10 rounded-2xl flex items-center justify-center mb-6 border border-lime-200 dark:border-[#E0FF64]/20">
                <Zap className="w-8 h-8 text-lime-600 dark:text-[#E0FF64]" />
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight mb-4 leading-none">
                Подождите!
              </h2>
              
              <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed mb-8">
                Не уходите без индивидуального расчета. Мы подготовим для вас персональные тарифы на фулфилмент со скидкой на первый месяц работы.
              </p>

              <div className="flex flex-col w-full gap-4">
                {/* 1. Кнопка Prime с пролетающим бликом [cite: 21, 24, 25, 26] */}
                <button onClick={scrollToForm} className="btn-prime w-full group">
                  <div className="btn-shine"></div>
                  <Calculator className="w-5 h-5" />
                  <span>Получить расчет</span>
                </button>

                {/* 2. Кнопка Ghost Neon [cite: 29, 32, 34] */}
                <button onClick={closePopup} className="btn-ghost w-full group">
                  <span>Остаться на сайте</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
