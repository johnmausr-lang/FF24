"use client";

import React, { useState, useEffect } from "react";
import { motion, useSpring, useTransform, animate } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

export const Hero = () => {
  const [targetCount, setTargetCount] = useState(13540);
  const count = useSpring(13000, { stiffness: 10, damping: 20 });
  const displayCount = useTransform(count, (latest) => Math.floor(latest).toLocaleString());

  useEffect(() => {
    animate(count, targetCount, { duration: 3 });
    const interval = setInterval(() => {
      setTargetCount(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [count, targetCount]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black">
      <div className="section-container relative z-10">
        <div className="flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-xl"
          >
            <Zap size={14} className="text-accent-lime animate-pulse fill-current" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">
              Отгружено сегодня: <motion.span className="text-accent-lime">{displayCount}</motion.span> ед.
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 logo-3d-wrapper"
          >
            <img src="/logo-ff24.png" alt="FF24" className="logo-3d h-28 md:h-44 w-auto object-contain" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-[11rem] font-black leading-[0.8] mb-16 italic uppercase tracking-tighter"
          >
            ЛОГИСТИКА <br />
            <span className="text-accent-lime text-neon">БУДУЩЕГО</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <a href="https://t.me/manager24ff" target="_blank" className="btn-liquid-frame group">
              <div className="inner-content">
                <span className="text-[11px] font-black uppercase tracking-[0.5em]">Запустить поток</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </a>
          </motion.div>

          <div className="mt-32 w-full pt-12 border-t border-white/5 opacity-20 flex flex-wrap justify-center gap-12 md:gap-24 grayscale">
            <img src="/logos/wb.png" alt="WB" className="h-6 object-contain" />
            <img src="/logos/ozon.png" alt="Ozon" className="h-6 object-contain" />
            <img src="/logos/yandex.png" alt="Yandex" className="h-6 object-contain" />
            <img src="/logos/ali.png" alt="Ali" className="h-6 object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
};
