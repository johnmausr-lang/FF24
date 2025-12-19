"use client";

import { motion } from "framer-motion";
import { ParticlesBackground } from "@/components/ParticlesBackground";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <ParticlesBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }}
            className="mb-8 md:mb-12"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black italic uppercase tracking-tighter text-white">
              FF<span className="text-accent-lime">24</span>
            </h1>
            <p className="text-white/60 text-lg sm:text-xl md:text-3xl uppercase tracking-widest mt-4 md:mt-8 font-medium">
              Фулфилмент премиум-класса
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.5, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight mb-8 text-white"
          >
            Профессиональная логистика<br className="hidden sm:block" />
            для маркетплейсов
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1.5, ease: "easeOut" }}
            className="text-base md:text-xl text-white/70 max-w-2xl mx-auto mb-12 md:mb-20"
          >
            Автоматизированный фулфилмент для серьёзного бизнеса. 
            Приёмка, маркировка, упаковка и доставка под полным контролем.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center"
          >
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="btn-glass-lime">
              Получить расчёт
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
