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
          }, 600);
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
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
          className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          <GlassVideo src="/videos/hero-bg.webm" opacity={0.3} blur="blur-[80px]" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* УНИФИЦИРОВАННЫЙ ЛОГОТИП */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-12 logo-3d-wrapper"
            >
              <img 
                src="/logo-ff24.png" 
                alt="FF24" 
                className="logo-3d h-20 md:h-32 w-auto object-contain"
              />
            </motion.div>

            <div className="w-[300px] h-[1px] bg-white/10 relative overflow-hidden rounded-full">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-accent-lime shadow-[0_0_20px_#E0FF64]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="mt-8 flex flex-col items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40">
                INITIALIZING SYSTEM
              </span>
              <span className="text-accent-lime font-mono text-xl font-bold">
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
