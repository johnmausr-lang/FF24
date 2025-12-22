"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 2));
    }, 30);

    const timeout = setTimeout(() => setLoading(false), 2500);

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
          className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center font-mono"
        >
          <div className="text-center">
            <h2 className="text-6xl md:text-8xl font-black italic mb-4 tracking-tighter">
              FF<span className="text-accent-lime text-outline-white">24</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="w-2 h-2 bg-accent-lime rounded-full animate-ping" />
              <span className="text-white/40 uppercase tracking-[0.3em] text-[10px]">
                System Initialization
              </span>
            </div>
            
            <div className="w-64 h-[2px] bg-white/10 relative overflow-hidden mx-auto">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-accent-lime shadow-[0_0_15px_#E0FF64]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-4 text-[10px] text-accent-lime uppercase tracking-widest">
              {progress}% Ready
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
