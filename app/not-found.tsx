'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Construction } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 overflow-hidden relative">
      {/* Фоновое свечение для глубины */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E0FF64]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Анимированная цифра 404 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative inline-block"
        >
          <h1 className="text-[120px] md:text-[200px] font-black leading-none tracking-tighter italic text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 select-none">
            404
          </h1>
          {/* Декоративная плашка */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute -bottom-2 left-0 w-full h-2 bg-[#E0FF64] origin-left shadow-[0_0_20px_rgba(224,255,100,0.4)]"
          />
        </motion.div>

        {/* Текстовый блок */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 space-y-6"
        >
          <div className="flex items-center justify-center gap-3 text-[#E0FF64]">
            <Construction className="w-5 h-5 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Маршрут потерян</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic leading-tight">
            Посылка ушла не в тот <br />
            <span className="text-[#E0FF64]">сортировочный центр</span>
          </h2>
          
          <p className="text-white/40 font-medium max-w-md mx-auto text-sm md:text-base">
            Запрашиваемая страница была перемещена, удалена или никогда не существовала в системе FF24.
          </p>
        </motion.div>

        {/* Кнопки навигации */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="group flex items-center gap-3 px-8 py-4 bg-[#E0FF64] text-black font-black uppercase text-xs rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(224,255,100,0.2)]"
          >
            <Home className="w-4 h-4" />
            Вернуться на конвейер
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase text-xs rounded-full hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Назад
          </button>
        </motion.div>
      </div>

      {/* Элементы декора: имитация технической разметки */}
      <div className="absolute top-10 left-10 pointer-events-none opacity-20 hidden md:block">
        <p className="text-[10px] font-mono text-white uppercase leading-relaxed">
          System: FF24_CORE_v1.0<br />
          Error_Code: 0x404_PAGE_MISSING<br />
          Status: REDIRECT_REQUIRED
        </p>
      </div>
    </div>
  );
}
