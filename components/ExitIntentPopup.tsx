"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="glass-card max-w-lg w-full p-12 md:p-16 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setShow(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>

          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-black italic uppercase mb-8 text-white">
              Не уходите без расчёта!
            </h3>
            <p className="text-white/80 text-lg md:text-xl mb-12 leading-relaxed">
              Получите персональное предложение со скидкой 10% на первый месяц<br />
              и точный расчёт за 24 часа
            </p>

            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass-lime px-16 py-8 text-2xl md:text-3xl inline-block"
            >
              Написать в Telegram
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
