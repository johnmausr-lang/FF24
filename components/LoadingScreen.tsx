"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
// ИСПРАВЛЕНО: Путь изменен на @/components/GlassVideo
import { GlassVideo } from "@/components/GlassVideo";

interface LoadingScreenProps {
  onFinished?: () => void;
}

export const LoadingScreen = ({ onFinished }: LoadingScreenProps) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            if (onFinished) onFinished();
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Премиальный фон с видео в лоадере */}
          <GlassVideo src="/videos/hero-bg.webm" opacity={0.3} blur="blur-[80px]" />
          
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-12"
            >
              <h2 className="text-7xl md:text-9xl font-[1000] italic tracking-tighter text-white uppercase leading-none">
                FF<span className="text-accent-lime text-neon">24</span>
              </h2>
            </motion.div>

            <div className="w-[300px] h-[1px] bg-white/10 relative overflow-hidden rounded-full">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-accent-lime shadow-[0_0_15px_#E0FF64]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="mt-6 flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Initializing FF24 System</span>
              <span className="text-accent-lime font-mono text-sm font-bold">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
