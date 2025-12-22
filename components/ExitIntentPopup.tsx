"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, ArrowRight } from "lucide-react";

export const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) setShow(true);
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card max-w-lg w-full p-12 relative border-accent-lime/20"
          >
            <button onClick={() => setShow(false)} className="absolute top-6 right-6 text-white/20 hover:text-white">
              <X size={24} />
            </button>
            <Gift className="text-accent-lime mb-6" size={48} />
            <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">
              СТОЙТЕ! <span className="text-accent-lime">ЕСТЬ БОНУС</span>
            </h2>
            <p className="text-white/40 uppercase text-[10px] tracking-widest leading-relaxed mb-8">
              Получите бесплатный аудит вашей товарной матрицы и -10% на первую партию фулфилмента.
            </p>
            <button className="w-full py-5 bg-accent-lime text-black font-black uppercase italic tracking-tighter hover:bg-white transition-colors flex items-center justify-center gap-3">
              ЗАБРАТЬ СКИДКУ <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
