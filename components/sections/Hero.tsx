"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GlassVideo } from "@/components/ui/GlassVideo";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black">
      {/* Видео-подложка: теперь точно отображается */}
      <GlassVideo src="/videos/hero-bg.webm" opacity={0.5} playbackRate={0.5} />
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="logo-3d-wrapper mb-12"
          >
            {/* Логотип с классом logo-3d для объема */}
            <img 
              src="/logo-ff24.png" 
              alt="FF24 Fulfillment" 
              className="logo-3d h-24 md:h-44 w-auto object-contain"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-7xl font-[1000] italic uppercase tracking-tighter leading-[0.9] mb-12"
          >
            Логистика, которая <span className="text-accent-lime text-neon">масштабирует</span> ваш успех
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <a 
              href={TELEGRAM_LINK} 
              target="_blank" 
              className="btn-glass-lime px-14 py-7 text-xl"
            >
              Запустить поток
              <ArrowRight className="ml-3" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
