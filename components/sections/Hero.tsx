"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sun, Moon, Clock, Target, Box } from "lucide-react";
import { useTheme } from "next-themes";

export const Hero = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Защита от гидратации для кнопки переключения темы
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-500">
      
      {/* Кнопка переключения темы (Glassmorphism) */}
      {mounted && (
        <div className="absolute top-24 right-6 md:right-12 z-50">
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="p-3 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-800 dark:text-[#E0FF64] shadow-lg hover:scale-110 transition-all"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      )}

      {/* Декоративные фоновые свечения */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lime-300/20 dark:bg-[#E0FF64]/10 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none transition-colors duration-500" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-emerald-300/20 dark:bg-emerald-900/20 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none transition-colors duration-500" />
      
      {/* Архитектурная сетка */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50 pointer-events-none transition-colors duration-500" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
          
          {/* Верхний бейдж */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm text-xs font-black uppercase tracking-widest text-slate-600 dark:text-white/70 mb-8 transition-colors duration-500"
          >
            <span className="flex h-2 w-2 rounded-full bg-lime-500 dark:bg-[#E0FF64] animate-pulse" />
            Принимаем новые заявки на 2026 год
          </motion.div>

          {/* Главный заголовок */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="space-y-4 max-w-5xl"
          >
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-[0.9] italic transition-colors duration-500">
              Логистика для <br className="hidden md:block" />
              <span className="relative inline-block">
                <span className="text-gradient relative z-10 drop-shadow-sm">
                  лидеров
                </span>
                <motion.span 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 w-full h-3 bg-lime-300/50 dark:bg-[#E0FF64]/30 -z-10 origin-left"
                />
              </span> рынка
            </h1>
          </motion.div>

          {/* Подзаголовок */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl leading-relaxed transition-colors duration-500"
          >
            Автоматизированный фулфилмент FF24. Приемка, упаковка и отгрузка на Wildberries, Ozon и Яндекс.Маркет за 24 часа. Без ошибок, без задержек.
          </motion.p>

          {/* СИСТЕМА ПРЕМИАЛЬНЫХ КНОПОК */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            {/* Кнопка Prime */}
            <button
              onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-prime w-full sm:w-auto group"
            >
              <div className="btn-shine"></div>
              <span>Смотреть конвейер</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            {/* Кнопка Ghost Neon */}
            <button
              onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-ghost w-full sm:w-auto group"
            >
              <span>Рассчитать стоимость</span>
            </button>
          </motion.div>

          {/* ==========================================
              ПРЕМИАЛЬНЫЕ ВИДЖЕТЫ-МЕТРИКИ (ВМЕСТО КОЛХОЗА)
              ========================================== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-24 w-full grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Виджет 1: Скорость */}
            <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 text-left hover:-translate-y-1 hover:border-lime-500 dark:hover:border-[#E0FF64]/50 transition-all duration-300 group shadow-lg dark:shadow-none">
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-white/40">Time-to-market</span>
                <Clock className="w-5 h-5 text-lime-500 dark:text-[#E0FF64] opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-black text-slate-900 dark:text-white leading-none font-mono">24</span>
                <span className="text-sm font-bold text-slate-500 dark:text-white/50 uppercase tracking-widest mb-1">часа</span>
              </div>
              <div className="h-1 w-full bg-slate-100 dark:bg-white/5 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-lime-500 dark:bg-[#E0FF64] w-[100%] rounded-full shadow-[0_0_10px_rgba(224,255,100,0.8)]" />
              </div>
              <p className="mt-4 text-xs font-bold text-slate-500 dark:text-white/40 uppercase tracking-wide">Строгий регламент отгрузки</p>
            </div>

            {/* Виджет 2: SLA и Гарантии */}
            <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 text-left hover:-translate-y-1 hover:border-lime-500 dark:hover:border-[#E0FF64]/50 transition-all duration-300 group shadow-lg dark:shadow-none relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 dark:bg-[#E0FF64]/5 blur-2xl rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-700" />
              <div className="flex justify-between items-start mb-6 relative z-10">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-white/40">Точность сборки</span>
                <Target className="w-5 h-5 text-lime-500 dark:text-[#E0FF64] opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-end gap-1 mb-2 relative z-10">
                <span className="text-4xl font-black text-slate-900 dark:text-white leading-none font-mono">99.9</span>
                <span className="text-xl font-bold text-lime-500 dark:text-[#E0FF64] mb-0.5">%</span>
              </div>
              <div className="mt-4 flex gap-2 relative z-10">
                <span className="px-2 py-1 bg-slate-100 dark:bg-white/10 rounded text-[9px] font-black uppercase text-slate-600 dark:text-white/60 tracking-wider">SLA Договор</span>
                <span className="px-2 py-1 bg-lime-100 dark:bg-[#E0FF64]/10 rounded text-[9px] font-black uppercase text-lime-700 dark:text-[#E0FF64] tracking-wider">Страховка 100%</span>
              </div>
              <p className="mt-4 text-xs font-bold text-slate-500 dark:text-white/40 uppercase tracking-wide relative z-10">Финансовая ответственность</p>
            </div>

            {/* Виджет 3: Инфраструктура */}
            <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 text-left hover:-translate-y-1 hover:border-lime-500 dark:hover:border-[#E0FF64]/50 transition-all duration-300 group shadow-lg dark:shadow-none">
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-white/40">Адаптивность</span>
                <Box className="w-5 h-5 text-lime-500 dark:text-[#E0FF64] opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mb-2">
                <span className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-tight block mb-1">Архитектура</span>
                <span className="text-xl font-black text-lime-500 dark:text-[#E0FF64] uppercase tracking-tight leading-tight block">Любых ниш</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-white/50 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-md border border-slate-200 dark:border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> FMCG
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-white/50 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-md border border-slate-200 dark:border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span> Fashion
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-white/50 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-md border border-slate-200 dark:border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span> КГТ
                </span>
              </div>
            </div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
};
