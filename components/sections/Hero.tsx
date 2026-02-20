"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, PackageCheck, Zap, Shield, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export const Hero = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [init, setInit] = useState(false);

  // Инициализация частиц
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Защита от гидратации (чтобы иконка темы не прыгала при загрузке)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Настройки частиц (динамически меняют цвет в зависимости от темы)
  const isDark = theme === "dark";
  const particleColor = isDark ? "#E0FF64" : "#94a3b8"; // Лаймовый для темной, Slate для светлой
  const linkColor = isDark ? "#E0FF64" : "#cbd5e1";

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-500">
      
      {/* Кнопка переключения темы (абсолютное позиционирование) */}
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

      {/* Интерактивные частицы */}
      {init && (
        <div className="absolute inset-0 z-0 pointer-events-auto opacity-60 dark:opacity-40">
          <Particles
            id="tsparticles"
            options={{
              background: { color: { value: "transparent" } },
              fpsLimit: 60,
              interactivity: {
                events: {
                  onHover: { enable: true, mode: "grab" },
                },
                modes: {
                  grab: { distance: 150, links: { opacity: 0.5 } },
                },
              },
              particles: {
                color: { value: particleColor },
                links: { color: linkColor, distance: 150, enable: true, opacity: 0.3, width: 1 },
                move: { enable: true, speed: 1, direction: "none", random: false, straight: false, outModes: { default: "bounce" } },
                number: { density: { enable: true, width: 800 }, value: 60 },
                opacity: { value: 0.5 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } },
              },
              detectRetina: true,
            }}
          />
        </div>
      )}

      {/* Декоративные фоновые свечения */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lime-300/20 dark:bg-[#E0FF64]/10 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none transition-colors duration-500" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-emerald-300/20 dark:bg-emerald-900/20 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none transition-colors duration-500" />
      
      {/* Сетка для придания технологичности */}
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
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-emerald-600 dark:from-[#E0FF64] dark:to-emerald-400">
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

          {/* Кнопки призыва к действию */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}
              className="group w-full sm:w-auto px-8 py-4 bg-[#E0FF64] text-slate-900 font-black uppercase text-sm rounded-full flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_10px_40px_rgba(224,255,100,0.4)]"
            >
              Смотреть конвейер
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-black uppercase text-sm rounded-full hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm"
            >
              Рассчитать стоимость
            </button>
          </motion.div>

          {/* Блок преимуществ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 pt-10 border-t border-slate-200 dark:border-white/10 w-full grid grid-cols-1 md:grid-cols-3 gap-8 transition-colors duration-500"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-lime-100 dark:bg-[#E0FF64]/10 flex items-center justify-center text-lime-600 dark:text-[#E0FF64] transition-colors duration-500">
                <Zap className="w-6 h-6" />
              </div>
              <p className="text-slate-900 dark:text-white font-black uppercase tracking-wide text-sm transition-colors duration-500">Скорость 24/7</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium transition-colors duration-500">Круглосуточная обработка</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 transition-colors duration-500">
                <Shield className="w-6 h-6" />
              </div>
              <p className="text-slate-900 dark:text-white font-black uppercase tracking-wide text-sm transition-colors duration-500">Гарантия SLA 99.9%</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium transition-colors duration-500">Финансовая ответственность</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 transition-colors duration-500">
                <PackageCheck className="w-6 h-6" />
              </div>
              <p className="text-slate-900 dark:text-white font-black uppercase tracking-wide text-sm transition-colors duration-500">Любые габариты</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium transition-colors duration-500">От косметики до мебели</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
