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
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            if (onFinished) onFinished();
          }, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Видео-фон для лоадера */}
          <GlassVideo src="/videos/hero-bg.webm" opacity={0.4} blur="blur-[100px]" />
          
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 50 }}
              className="mb-16 logo-3d-wrapper"
            >
              <img src="/logo-ff24.png" alt="FF24" className="logo-3d h-32 md:h-56 w-auto object-contain" />
            </motion.div>

            <div className="flex flex-col items-center gap-6">
              <div className="w-[300px] md:w-[500px] h-[1px] bg-white/5 relative overflow-hidden rounded-full">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-accent-lime shadow-[0_0_20px_#E0FF64]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              
              <div className="flex justify-between w-full px-1">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">System Load</span>
                <span className="text-accent-lime font-mono text-lg font-bold">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Декоративные углы как в интерфейсах хай-тек */}
          <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-white/10" />
          <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-white/10" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
