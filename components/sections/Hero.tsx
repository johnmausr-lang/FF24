"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ParticlesBackground } from "@/components/ParticlesBackground";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <ParticlesBackground />

      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/40 via-black to-black" />
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-accent-lime/10 blur-[140px] rounded-full animate-pulse-slow" />
      <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-accent-blue/20 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-12"
          >
            <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter gradient-text">
              FF24
            </h1>
            <p className="text-accent-lime/80 text-xl md:text-3xl uppercase tracking-widest mt-4 font-bold">
              Fulfillment 2.0
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-5xl md:text-8xl font-black italic uppercase leading-[0.9] mb-12"
          >
            Управляй <br />
            <span className="text-accent-blue">бизнесом</span> <br />
            в один клик
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-foreground/80 text-xl md:text-2xl max-w-4xl mx-auto mb-16 font-medium leading-relaxed"
          >
            Автоматизированный фулфилмент для селлеров. Заберём, упакуем и доставим ваш товар на маркетплейсы за 24 часа.
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
              className="btn-glass-primary px-16 py-8 text-2xl md:text-3xl"
            >
              Написать в Telegram <ArrowRight className="ml-4 inline w-8 h-8" />
            </a>
            <Button variant="outline" size="lg" className="glass border-white/30 text-white hover:bg-white/10 px-12 py-8 text-xl md:text-2xl font-bold">
              Наши услуги
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
