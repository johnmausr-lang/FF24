"use client";

import { motion } from "framer-motion";
import { ParticlesBackground } from "@/components/ParticlesBackground";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <ParticlesBackground />

      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-7xl font-black italic uppercase tracking-tighter mb-8 text-white"
          >
            FF<span className="text-accent-lime">24</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-3xl sm:text-5xl font-bold mb-12 text-white"
          >
            Профессиональная логистика<br />
            для маркетплейсов
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-lg text-white/70 text-large mb-16"
          >
            Автоматизированный фулфилмент премиум-класса. Приёмка, маркировка, упаковка и доставка под полным контролем.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Получить расчёт
            </a>
            <a href="#benefits" className="btn-secondary">
              Наши услуги
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
