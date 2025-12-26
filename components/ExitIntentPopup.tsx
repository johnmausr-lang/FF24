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
      // Срабатывает, когда курсор уходит вверх (попытка закрыть вкладку)
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
            className="relative max-w-lg w-full rounded-[3.5rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Видео-фон внутри попапа */}
            <GlassVideo 
              src="/videos/hero-bg.webm" 
              opacity={0.3} 
              blur="blur-[40px]" 
              overlayColor="bg-black/60"
            />

            <div className="relative z-10 p-10 md:p-14 text-center">
              <button
                onClick={() => setShow(false)}
                className="absolute top-6 right-6 text-white/30 hover:text-[#E0FF64] transition-colors"
              >
                <X size={24} />
              </button>

              <div className="inline-flex w-20 h-20 rounded-3xl bg-[#E0FF64]/10 items-center justify-center text-[#E0FF64] mb-8 border border-[#E0FF64]/20 shadow-[0_0_30px_rgba(224,255,100,0.1)]">
                <Gift size={40} />
              </div>

              <h3 className="text-4xl md:text-5xl font-black italic uppercase mb-4 tracking-tighter leading-none">
                Подождите!
              </h3>
              
              <p className="text-white/60 text-lg mb-10 leading-relaxed font-medium">
                Закрепите за собой <span className="text-white font-bold">скидку 10%</span> на первый месяц работы. Просто напишите нам <span className="text-[#E0FF64]">«СТАРТ»</span>.
              </p>

              <div className="flex flex-col gap-4">
                <a 
                  href={TELEGRAM_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-glass-lime w-full group py-5 text-lg rounded-2xl"
                >
                  Забрать скидку
                  <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                </a>
                <button 
                  onClick={() => setShow(false)}
                  className="text-white/20 hover:text-white/50 text-[10px] uppercase tracking-[0.3em] font-black py-4 transition-colors"
                >
                  Я хочу платить полную стоимость
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
