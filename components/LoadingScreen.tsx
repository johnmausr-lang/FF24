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
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center flex-col gap-16"
      exit={{ opacity: 0, transition: { duration: 1 } }}
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
        <p className="text-white/60 text-xl md:text-3xl uppercase tracking-widest mt-8 font-medium">
          Loading...
        </p>
      </motion.div>

      <div className="w-80 h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-blue to-accent-lime"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};
