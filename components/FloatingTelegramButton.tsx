"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const FloatingTelegramButton = () => {
  return (
    <motion.a
      href={TELEGRAM_LINK}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.6 }}
      whileHover={{ scale: 1.15, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent-lime/20 backdrop-blur-xl border-4 border-accent-lime shadow-neon-lime glow-pulse-lime group"
    >
      <MessageCircle className="w-10 h-10 md:w-12 md:h-12 text-accent-lime group-hover:scale-110 transition-transform" />
      <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-accent-lime text-sm font-bold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Написать менеджеру
      </span>
    </motion.a>
  );
};
