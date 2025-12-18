"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Анимированный прогресс с ускорением в конце
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 12 + 3;
      if (current >= 100) {
        setProgress(100);
        clearInterval(interval);
      } else {
        setProgress(Math.min(current, 100));
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center flex-col gap-12 overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 1, delay: 0.5 } }}
    >
      {/* Фоновые частицы/эффекты */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/20 via-black to-accent-blue/10" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-lime/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-blue/20 blur-[120px] rounded-full animate-pulse-slow" />
      </div>

      {/* Логотип с переливом */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter">
          <span className="gradient-text">FF</span>
          <span className="text-accent-lime glow-pulse-lime">24</span>
        </h1>
        <p className="text-accent-lime/80 text-lg md:text-2xl uppercase tracking-widest mt-8 font-bold">
          System Boot Sequence
        </p>
      </motion.div>

      {/* Прогресс-бар с неоновым свечением */}
      <div className="w-96 md:w-[600px] h-4 bg-primary-dark/50 rounded-full overflow-hidden border border-accent-lime/30 shadow-neon-lime">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-blue via-accent-lime to-accent-blue rounded-full shadow-neon-lime glow-pulse-lime"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut", duration: 0.5 }}
        />
      </div>

      {/* Процент + пульсирующий курсор */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-4 text-accent-lime font-mono text-2xl"
      >
        <span>{Math.round(progress)}%</span>
        <span className="animate-pulse">|</span>
      </motion.div>

      <p className="text-foreground/50 text-sm uppercase tracking-widest mt-12">
        Initializing FF24 Fulfillment Node...
      </p>
    </motion.div>
  );
};
