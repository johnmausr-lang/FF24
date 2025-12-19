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
      transition={{ delay: 2, duration: 1.2, ease: "easeOut" }}
      whileHover={{ scale: 1.15, y: -6, transition: { duration: 0.6, ease: "easeOut" } }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 glass w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border border-white/20 shadow-2xl group"
    >
      <MessageCircle className="w-8 h-8 md:w-9 md:h-9 text-accent-lime group-hover:scale-110 transition-transform duration-500 ease-out" />

      <span className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white/10 glass text-white text-sm font-medium px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap backdrop-blur-md border border-white/20">
        Написать в Telegram
      </span>
    </motion.a>
  );
};
