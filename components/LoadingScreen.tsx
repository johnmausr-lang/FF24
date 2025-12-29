"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { GlassVideo } from "@/components/ui/GlassVideo";

interface LoadingScreenProps {
  onFinished?: () => void;
}

export const LoadingScreen = ({ onFinished }: LoadingScreenProps) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Прелоад критических ресурсов (3D модель конвейера)
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = '/models/conveyor.glb';
    link.as = 'fetch';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    // 2. Имитация прогресса инициализации систем
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Задержка перед закрытием для плавного перехода
          setTimeout(() => {
            setLoading(false);
            if (onFinished) onFinished();
          }, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    // 3. Таймаут-предохранитель на 5 секунд
    const safetyTimeout = setTimeout(() => {
      setLoading(false);
      if (onFinished) onFinished();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [onFinished]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.05, 
            filter: "blur(40px)",
            transition: { duration: 1.2, ease: "easeInOut" } 
          }}
          className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center overflow-hidden font-sans"
        >
          {/* Фоновое видео с глубоким размытием */}
          <GlassVideo src="/videos/hero-bg.webm" opacity={0.3} blur="blur-[120px]" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Логотип с 3D-эффектом из globals.css */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-20 logo-3d-wrapper"
            >
              <img 
                src="/logo-ff24.png" 
                alt="FF24" 
                className="logo-3d h-40 md:h-64 w-auto object-contain" 
              />
            </motion.div>

            {/* Блок прогресса */}
            <div className="flex flex-col items-center gap-8">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-accent-lime rounded-full animate-ping" />
                <span className="text-white/20 uppercase tracking-[0.6em] text-[10px] font-black">
                  System Initialization
                </span>
              </div>

              {/* Полоса загрузки в стиле Liquid Lime */}
              <div className="w-[320px] md:w-[600px] h-[2px] bg-white/5 relative rounded-full overflow-hidden">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-accent-lime shadow-[0_0_30px_#E0FF64]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              
              <div className="flex justify-between w-full font-mono">
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/10">Loading Assets</span>
                <span className="text-accent-lime text-2xl font-bold">{progress}%</span>
              </div>
            </div>

            {/* Технологичные декоративные элементы по углам */}
            <div className="absolute -top-32 -left-32 w-64 h-64 border-t border-l border-white/5 rounded-tl-[100px] pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 border-b border-r border-white/5 rounded-br-[100px] pointer-events-none" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
