"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GlassVideo } from "@/components/ui/GlassVideo";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black text-center">
      <GlassVideo src="/videos/hero-bg.webm" opacity={0.5} playbackRate={0.5} />
      
      <div className="container relative z-10 flex flex-col items-center justify-center mx-auto">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="mb-8 logo-3d-wrapper"
          >
            {/* УНИФИЦИРОВАННЫЙ ЛОГОТИП */}
            <img 
              src="/logo-ff24.png" 
              alt="FF24" 
              className="logo-3d h-20 md:h-32 w-auto object-contain"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-7xl font-[1000] leading-[0.9] mb-12 text-white max-w-5xl italic uppercase tracking-tighter"
          >
            Логистика, которая <span className="text-accent-lime text-neon">масштабирует</span> ваш успех
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <a href={TELEGRAM_LINK} target="_blank" className="btn-glass-lime px-14 py-7 text-xl rounded-full">
              Запустить поток
              <ArrowRight className="ml-3" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
