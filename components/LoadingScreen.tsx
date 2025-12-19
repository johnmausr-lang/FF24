"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15 + 5;
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
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center flex-col gap-12"
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter">
          <span className="gradient-text">FF</span>
          <span className="text-white">24</span>
        </h1>
      </motion.div>

      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-accent-lime"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
};
