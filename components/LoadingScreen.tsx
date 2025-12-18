"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 18 + 5;
      if (current >= 100) {
        setProgress(100);
        clearInterval(interval);
      } else {
        setProgress(current);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center flex-col gap-8"
      exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.4 } }}
    >
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
          FF<span className="text-[#2563EB]">24</span>
        </h1>
        <p className="text-sm text-slate-500 uppercase tracking-widest mt-6">System Boot Sequence</p>
      </div>

      <div className="w-80 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#2563EB] shadow-neon"
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut" }}
        />
      </div>

      <p className="text-xs font-mono text-slate-600 tracking-widest">{Math.round(progress)}%</p>
    </motion.div>
  );
};
