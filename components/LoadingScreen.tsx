"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + Math.random() * 20));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center flex-col gap-6"
    >
      <div className="text-center">
        <h1 className="text-5xl font-black italic tracking-tighter text-white">
          FF<span className="text-accent-DEFAULT">24</span>
        </h1>
        <p className="text-[10px] text-slate-500 uppercase tracking-[0.4em] mt-2">Initializing System...</p>
      </div>
      <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-accent-DEFAULT shadow-[0_0_15px_#2563EB]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
};
