"use client";

import { motion } from "framer-motion";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { ArrowRight } from "lucide-react";
import { GlassVideo } from "@/components/ui/GlassVideo";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black">
      {/* Оптимизированное видео-фоне (включается только при просмотре) */}
      <GlassVideo 
        src="/videos/hero-bg.webm" 
        opacity={0.5} 
        playbackRate={0.5} 
      />
      
      <ParticlesBackground />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black z-[5]" />

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <div className="glass px-6 py-2 rounded-full border-white/10 inline-flex items-center gap-3 mb-10">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-lime opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-lime"></span>
              </span>
              <span className="text-white/60 text-xs font-black uppercase tracking-[0.3em]">
                System Status: Active
              </span>
            </div>

            <h1 className="text-7xl md:text-[120px] font-black italic uppercase tracking-tighter leading-none mb-6">
              <span className="gradient-text">FF</span>
              <span className="text-white">24</span>
            </h1>
            
            <p className="text-white/40 text-xl md:text-3xl uppercase tracking-[0.4em] font-bold">
              Premium Fulfillment
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-3xl md:text-5xl font-black leading-tight mb-12 text-white max-w-4xl"
          >
            Логистика, которая <span className="text-accent-lime">масштабирует</span> ваш бизнес
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <a 
              href={TELEGRAM_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-glass-lime group"
            >
              Запустить процесс
              <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={24} />
            </a>
            <a href="#benefits" className="btn-glass-secondary">
              Изучить услуги
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
