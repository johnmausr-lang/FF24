"use client";

import { motion } from "framer-motion";
import { ParticlesBackground } from "@/components/ParticlesBackground";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <ParticlesBackground />

      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/20 via-black to-black" />
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-accent-lime/5 blur-[140px] rounded-full" />
      <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-accent-blue/10 blur-[120px] rounded-full" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-12"
          >
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white">
              FF<span className="text-accent-lime">24</span>
            </h1>
            <p className="text-white/60 text-lg md:text-2xl uppercase tracking-widest mt-6 font-medium">
              Фулфилмент премиум-класса
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-4xl md:text-6xl font-black leading-tight mb-12 text-white"
          >
            Профессиональная логистика<br />
            для маркетплейсов
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto mb-16 font-medium leading-relaxed text-contained"
          >
            Автоматизированный фулфилмент для серьёзного бизнеса. 
            Приёмка, маркировка, упаковка и доставка под полным контролем.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto btn-glass-lime px-12 py-6 text-xl md:text-2xl"
            >
              Получить расчёт
            </a>
            <a
              href="#benefits"
              className="w-full sm:w-auto btn-glass px-12 py-6 text-xl md:text-2xl"
            >
              Наши услуги
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
