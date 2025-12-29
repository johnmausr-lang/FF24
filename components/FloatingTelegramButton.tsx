"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const FloatingTelegramButton = () => {
  return (
    <div className="fixed bottom-8 right-8 z-[90]">
      {/* Пульсирующий эффект под кнопкой */}
      <div className="absolute inset-0 bg-accent-lime/20 rounded-full animate-ping scale-150" />
      
      <motion.a
        href={TELEGRAM_LINK}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20, 
          delay: 1.5 
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 0 30px rgba(224, 255, 100, 0.4)" 
        }}
        whileTap={{ scale: 0.9 }}
        className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full glass border-white/20 bg-accent-lime/10 group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-accent-lime/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <MessageCircle 
          className="w-8 h-8 md:w-10 md:h-10 text-accent-lime group-hover:scale-110 transition-transform duration-500" 
          strokeWidth={2.5}
        />

        {/* Тултип (виден только на десктопе при ховере) */}
        <div className="absolute right-full mr-6 top-1/2 -translate-y-1/2 hidden lg:block opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none translate-x-4 group-hover:translate-x-0">
          <div className="glass px-6 py-3 rounded-2xl whitespace-nowrap">
            <span className="text-white text-sm font-black uppercase tracking-widest">
              Спросить в Telegram
            </span>
          </div>
        </div>
      </motion.a>
    </div>
  );
};
