"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, ArrowRight } from "lucide-react";
import { GlassVideo } from "@/components/ui/GlassVideo";

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
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="relative max-w-lg w-full rounded-[4rem] p-[2px] overflow-hidden border-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Видео-фон для попапа */}
            <GlassVideo 
              src="/videos/hero-bg.webm" 
              opacity={0.4} 
              blur="blur-[50px]" 
              overlayColor="bg-black/50"
            />

            <div className="relative z-10 bg-white/[0.03] backdrop-blur-[60px] rounded-[4rem] p-10 md:p-16 border border-white/10">
              <button
                onClick={() => setShow(false)}
                className="absolute top-8 right-8 text-white/30 hover:text-accent-lime transition-colors z-20"
              >
                <X size={24} />
              </button>

              <div className="text-center relative z-10">
                <div className="inline-flex w-20 h-20 rounded-3xl glass bg-accent-lime/10 items-center justify-center text-accent-lime mb-10">
                  <Gift size={40} />
                </div>

                <h3 className="text-4xl md:text-5xl font-black italic uppercase mb-6 tracking-tighter">
                  Подождите!
                </h3>
                
                <p className="text-white/60 text-lg mb-12 leading-relaxed">
                  Закрепите за собой <span className="text-white font-bold">скидку 10%</span> на первый месяц фулфилмента, просто написав нам «СТАРТ».
                </p>

                <div className="flex flex-col gap-4">
                  <a 
                    href={TELEGRAM_LINK} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-glass-lime w-full group py-5 text-lg"
                  >
                    Забрать скидку
                    <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                  </a>
                  <button 
                    onClick={() => setShow(false)}
                    className="text-white/20 hover:text-white/50 text-xs uppercase tracking-widest font-bold py-4 transition-colors"
                  >
                    Я хочу платить полную стоимость
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
