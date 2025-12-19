"use client";

import { motion } from "framer-motion";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { ArrowRight } from "lucide-react";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black">
      <ParticlesBackground />

      {/* Сложные слои градиента для глубины */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(224,255,100,0.05),transparent_70%)] z-0" />

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
                System Status: Operational
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
            Логистика, которая <span className="text-accent-lime">масштабирует</span> ваш бизнес на маркетплейсах
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="btn-glass-lime group">
              Запустить процесс
              <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={24} />
            </a>
            <a href="#benefits" className="btn-glass-secondary">
              Изучить услуги
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/5 pt-12 w-full"
          >
            {[
              { label: "Приемка", val: "24ч" },
              { label: "Точность", val: "100%" },
              { label: "Доставка", val: "Ежедневно" },
              { label: "Поддержка", val: "Личная" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-accent-lime font-black text-2xl italic">{stat.val}</span>
                <span className="text-white/30 text-[10px] uppercase tracking-widest mt-2">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
