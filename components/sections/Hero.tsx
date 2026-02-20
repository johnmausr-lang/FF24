"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, PackageCheck, Zap, Shield } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-slate-50">
      
      {/* Декоративные фоновые свечения (Мягкий премиальный Glow) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lime-300/20 blur-[150px] rounded-full mix-blend-multiply pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-emerald-300/20 blur-[150px] rounded-full mix-blend-multiply pointer-events-none" />
      
      {/* Сетка для придания технологичности */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
          
          {/* Верхний бейдж (Glassmorphism) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-slate-200 shadow-sm text-xs font-black uppercase tracking-widest text-slate-600 mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-lime-500 animate-pulse" />
            Принимаем новые заявки на 2026 год
          </motion.div>

          {/* Главный заголовок */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="space-y-4 max-w-5xl"
          >
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 uppercase tracking-tighter leading-[0.9] italic">
              Логистика для <br className="hidden md:block" />
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-emerald-600">
                  лидеров
                </span>
                {/* Декоративная линия под словом */}
                <motion.span 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 w-full h-3 bg-lime-300/50 -z-10 origin-left"
                />
              </span> рынка
            </h1>
          </motion.div>

          {/* Подзаголовок */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-lg md:text-xl text-slate-500 font-medium max-w-2xl leading-relaxed"
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
              className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-900 font-black uppercase text-sm rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
            >
              Рассчитать стоимость
            </button>
          </motion.div>

          {/* Блок преимуществ (Trust Badges) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 pt-10 border-t border-slate-200 w-full grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-lime-100 flex items-center justify-center text-lime-600">
                <Zap className="w-6 h-6" />
              </div>
              <p className="text-slate-900 font-black uppercase tracking-wide text-sm">Скорость 24/7</p>
              <p className="text-slate-500 text-xs font-medium">Круглосуточная обработка</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Shield className="w-6 h-6" />
              </div>
              <p className="text-slate-900 font-black uppercase tracking-wide text-sm">Гарантия SLA 99.9%</p>
              <p className="text-slate-500 text-xs font-medium">Финансовая ответственность</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                <PackageCheck className="w-6 h-6" />
              </div>
              <p className="text-slate-900 font-black uppercase tracking-wide text-sm">Любые габариты</p>
              <p className="text-slate-500 text-xs font-medium">От косметики до мебели</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
