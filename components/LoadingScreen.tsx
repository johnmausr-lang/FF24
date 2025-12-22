"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Имитация прогресса
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Гарантированное скрытие лоадера, даже если ресурсы висят
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 секунды максимум

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-6xl md:text-8xl font-black italic mb-4 tracking-tighter">
              FF<span className="text-accent-lime">24</span>
            </h2>
            <div className="flex items-center gap-2 mb-8">
              <span className="w-2 h-2 bg-accent-lime rounded-full animate-ping" />
              <span className="text-white/40 uppercase tracking-[0.3em] text-xs">
                System Initialization
              </span>
            </div>
            
            <div className="w-64 h-[2px] bg-white/10 relative overflow-hidden">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-accent-lime"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-4 text-[10px] text-accent-lime/50 uppercase tracking-widest">
              {progress}% Complete
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
