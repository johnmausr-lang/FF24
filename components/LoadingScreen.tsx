"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

// Лоадер теперь принимает функцию завершения как пропс
export const LoadingScreen = ({ onFinished }: { onFinished: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Эмуляция загрузки, синхронизированная с реальным временем ожидания 3D
    // Модель 6МБ, даем ей ~3.5 секунды на загрузку
    const duration = 3500; 
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      // Нелинейная загрузка (быстро в начале, медленно в конце)
      const newProgress = Math.min(100, Math.round(100 * (1 - Math.pow(1 - currentStep / steps, 2))));
      
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(onFinished, 500); // Небольшая пауза перед скрытием
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }} // Плавное исчезновение шторки
    >
      <div className="relative flex flex-col items-center">
        {/* Логотип в лоадере */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 logo-3d-container"
        >
           <Image
            src="/logo-ff24.png"
            alt="FF24 Loading"
            width={180}
            height={60}
            className="w-auto h-14 md:h-16 logo-3d object-contain"
            priority
          />
        </motion.div>

        {/* Прогресс бар */}
        <div className="w-[240px] h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute inset-y-0 left-0 bg-accent-lime shadow-[0_0_20px_rgba(224,255,100,0.8)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
        
        {/* Текстовый индикатор */}
        <div className="mt-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
            <span className="text-white/40">System Loading</span>
            <motion.span 
                key={progress}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-accent-lime font-bold min-w-[3ch] text-right"
            >
                {progress}%
            </motion.span>
        </div>
      </div>
      
      {/* Фоновые декоративные элементы */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('/noise.png')] z-0"></div>
      <h2 className="text-[12vw] font-[1000] italic uppercase leading-none text-transparent text-outline absolute bottom-[-2vw] left-0 whitespace-nowrap opacity-5 select-none z-0">
        Initializing
      </h2>
    </motion.div>
  );
};
