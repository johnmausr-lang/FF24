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
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 glass w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border border-white/20 shadow-2xl"
    >
      <MessageCircle className="w-8 h-8 md:w-9 md:h-9 text-accent-lime" />
    </motion.a>
  );
};
