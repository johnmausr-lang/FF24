"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

// ИСПРАВЛЕНО: onFinished теперь необязательный (?)
export const LoadingScreen = ({ onFinished }: { onFinished?: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000; 
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(100, Math.round(100 * (1 - Math.pow(1 - currentStep / steps, 2))));
      
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(interval);
        // Вызываем только если функция передана
        if (onFinished) {
          setTimeout(onFinished, 500);
        }
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12 logo-3d-wrapper"
        >
          <Image
            src="/logo-ff24.png"
            alt="Загрузка FF24"
            width={180}
            height={60}
            className="w-auto h-14 md:h-16 logo-3d object-contain"
            priority
          />
        </motion.div>

        <div className="w-[240px] h-[1px] bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute inset-y-0 left-0 bg-[#E0FF64] shadow-[0_0_15px_#E0FF64]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.5em] text-[#E0FF64] animate-pulse">
            Инициализация системы {progress}%
        </div>
      </div>
    </motion.div>
  );
};
