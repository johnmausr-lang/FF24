"use client";

import React, { useState, useEffect } from "react";
import { motion, useSpring, useTransform, animate } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

export const Hero = () => {
  const [targetCount, setTargetCount] = useState(13540);
  const count = useSpring(13000, { stiffness: 10, damping: 20 });
  const displayCount = useTransform(count, (latest) => Math.floor(latest).toLocaleString());

  useEffect(() => {
    // Начальная анимация до цели
    const controls = animate(count, targetCount, { duration: 3 });
    
    // Имитация новых заказов в реальном времени
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 5) + 1;
      setTargetCount(prev => prev + increment);
    }, 4000);

    return () => {
      controls.stop();
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    animate(count, targetCount, { duration: 1 });
  }, [targetCount, count]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-black">
      <div className="container relative z-10 flex flex-col items-center">
        
        {/* Анимированный бейдж */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-3 px-6 py-2 rounded-full border border-accent-lime/20 bg-accent-lime/5 backdrop-blur-xl"
        >
          <Zap size={14} className="text-accent-lime animate-pulse fill-current" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80">
            Отгружено сегодня: <motion.span className="text-accent-lime">{displayCount}</motion.span> ед.
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-12 logo-3d-wrapper"
        >
          <img 
            src="/logo-ff24.png" 
            alt="FF24" 
            className="logo-3d h-32 md:h-56 w-auto object-contain"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-9xl font-black leading-[0.85] mb-12 text-white max-w-6xl italic uppercase tracking-tighter text-center"
        >
          Логистика, которая <br />
          <span className="text-accent-lime text-neon">масштабирует</span> успех
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-12 w-full"
        >
          <a 
            href="https://t.me/manager24ff" 
            target="_blank" 
            className="btn-liquid-lime px-20 py-8 text-2xl group shadow-[0_0_50px_rgba(224,255,100,0.3)]"
          >
            Запустить поток
            <ArrowRight className="ml-4 group-hover:translate-x-3 transition-transform" />
          </a>

          <div className="w-full pt-12 border-t border-white/5 opacity-20 grayscale hover:opacity-50 hover:grayscale-0 transition-all duration-1000">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.5em] mb-10 text-white/40">
              Интеграция с крупнейшими сетями
            </p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center">
              <img src="/logos/wb.png" alt="Wildberries" className="h-6 md:h-8 object-contain" />
              <img src="/logos/ozon.png" alt="Ozon" className="h-6 md:h-8 object-contain" />
              <img src="/logos/yandex.png" alt="Yandex" className="h-6 md:h-8 object-contain" />
              <img src="/logos/ali.png" alt="AliExpress" className="h-6 md:h-8 object-contain" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
