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
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-6"
        onClick={() => setShow(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-card max-w-lg w-full p-12 md:p-16 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setShow(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition"
          >
            <X size={32} />
          </button>

          <div className="text-center">
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-3xl md:text-4xl font-black italic uppercase mb-8 text-white"
            >
              Не уходите без расчёта!
            </motion.h3>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-white/80 text-lg mb-12 text-tight"
            >
              Получите персональное предложение со скидкой 10% на первый месяц
            </motion.p>

            <motion.a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="btn-glass-lime"
            >
              Написать в Telegram
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
