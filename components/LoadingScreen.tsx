"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { GlassVideo } from "@/components/ui/GlassVideo";

export const LoadingScreen = ({ onFinished }: { onFinished?: () => void }) => {
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
    }, 25);
    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05, filter: "blur(40px)" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Видео-фон высокого класса */}
          <GlassVideo src="/videos/hero-bg.webm" opacity={0.3} blur="blur-[120px]" />
          
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-20 logo-3d-wrapper"
            >
              <img src="/logo-ff24.png" alt="FF24" className="logo-3d h-40 md:h-64 w-auto object-contain" />
            </motion.div>

            <div className="flex flex-col items-center gap-8">
              <div className="w-[320px] md:w-[600px] h-[2px] bg-white/5 relative rounded-full overflow-hidden">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-accent-lime shadow-[0_0_30px_#E0FF64]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              
              <div className="flex justify-between w-full font-mono">
                <span className="text-[11px] font-black uppercase tracking-[0.6em] text-white/20">System Pulse</span>
                <span className="text-accent-lime text-2xl font-bold">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
