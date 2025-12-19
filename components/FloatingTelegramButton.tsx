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
      transition={{ delay: 2, duration: 0.8 }}
      whileHover={{ scale: 1.15, y: -6 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 glass w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border border-white/20 shadow-xl group"
    >
      <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-accent-lime group-hover:scale-110 transition-transform" />
      <span className="absolute -top-14 left-1/2 -translate-x-1/2 bg-black/80 glass text-white text-sm font-medium px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Написать в Telegram
      </span>
    </motion.a>
  );
};
