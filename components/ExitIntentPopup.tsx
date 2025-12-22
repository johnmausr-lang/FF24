"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, ArrowRight } from "lucide-react";
// БЫЛО: "@/components/ui/GlassVideo"
import { GlassVideo } from "@/components/GlassVideo"; 

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setShow(true);
        setHasShown(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-xl px-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card max-w-lg w-full p-12 relative overflow-hidden border-accent-lime/20"
          >
            <button onClick={() => setShow(false)} className="absolute top-6 right-6 text-white/20 hover:text-white z-50">
              <X size={24} />
            </button>

            <div className="relative z-10 text-center">
              <Gift size={48} className="text-accent-lime mx-auto mb-6 animate-bounce" />
              <h3 className="text-4xl font-black italic uppercase mb-4 tracking-tighter">СТОЙТЕ!</h3>
              <p className="text-white/60 mb-8 uppercase text-xs tracking-widest">Получите скидку 10% на первый месяц по промокоду "СТАРТ"</p>
              
              <a href={TELEGRAM_LINK} target="_blank" className="btn-glass-lime w-full py-5 flex items-center justify-center gap-3">
                ЗАБРАТЬ БОНУС <ArrowRight size={20} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
