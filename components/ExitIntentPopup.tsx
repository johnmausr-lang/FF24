"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Check } from "lucide-react";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let mouseLeft = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !mouseLeft) {
        mouseLeft = true;
        setShow(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-6"
        onClick={() => setShow(false)}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="glass-card glass-card-hover max-w-lg w-full p-12 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Крестик закрытия */}
          <button
            onClick={() => setShow(false)}
            className="absolute top-6 right-6 text-foreground/50 hover:text-white transition-colors"
          >
            <X size={28} />
          </button>

          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-32 h-32 rounded-full bg-accent-lime/20 border-4 border-accent-lime mx-auto mb-8 flex items-center justify-center shadow-neon-lime glow-pulse-lime"
            >
              <Zap className="w-16 h-16 text-accent-lime" />
            </motion.div>

            <h3 className="text-4xl md:text-5xl font-black italic uppercase mb-6 gradient-text">
              Не уходите без расчёта!
            </h3>

            <p className="text-xl text-foreground/90 mb-10 leading-relaxed">
              Получите персональное предложение со скидкой 10% на первый месяц<br />
              и точный расчёт за 24 часа
            </p>

            <div className="flex flex-col gap-4 mb-10">
              <div className="flex items-center justify-center gap-4 text-lg">
                <Check className="w-8 h-8 text-accent-lime" />
                <span>Скидка 10% на первый месяц</span>
              </div>
              <div className="flex items-center justify-center gap-4 text-lg">
                <Check className="w-8 h-8 text-accent-lime" />
                <span>Расчёт под ваш объём и маркетплейс</span>
              </div>
              <div className="flex items-center justify-center gap-4 text-lg">
                <Check className="w-8 h-8 text-accent-lime" />
                <span>Консультация с менеджером</span>
              </div>
            </div>

            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block btn-neon px-16 py-8 text-2xl md:text-3xl"
            >
              Написать в Telegram сейчас
            </a>

            <p className="mt-8 text-foreground/60">
              Или просто закройте это окно — предложение останется в силе
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
