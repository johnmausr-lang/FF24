"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center flex-col p-6"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-8xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">
          <span className="gradient-text">FF</span>
          <span className="text-white text-outline-white">24</span>
        </h1>
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="w-2 h-2 rounded-full bg-accent-lime animate-pulse" />
          <p className="text-white/40 text-xs uppercase tracking-[0.5em] font-black">
            System Initialization
          </p>
        </div>
      </motion.div>

      <div className="w-full max-w-md h-[2px] bg-white/5 relative overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-accent-lime shadow-[0_0_15px_#E0FF64]"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <div className="mt-4 font-mono text-[10px] text-accent-lime/50 uppercase tracking-widest">
        {Math.round(progress)}% Complete
      </div>
    </motion.div>
  );
};
