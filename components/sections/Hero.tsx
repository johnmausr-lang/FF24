"use client";

import { motion } from "framer-motion";
import { ParticlesBackground } from "@/components/ParticlesBackground";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <ParticlesBackground />

      <div className="absolute inset-0 bg-black/80" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-6xl font-bold text-white mb-8"
          >
            Профессиональная логистика<br />
            для маркетплейсов
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-white/80 text-large mb-12"
          >
            Автоматизированный фулфилмент премиум-класса. Приёмка, маркировка, упаковка и доставка под полным контролем.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Рассчитать стоимость
            </a>
            <a href="#lead" className="btn-secondary">
              Оставить заявку
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
