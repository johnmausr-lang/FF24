"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";

export const LeadForm = () => {
  return (
    <section id="lead" className="py-32 bg-transparent flex items-center justify-center">
      <div className="container max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 md:p-24 text-center relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 rounded-3xl bg-accent-lime/10 items-center justify-center text-accent-lime mb-12 border border-accent-lime/20 flex">
              <MessageCircle size={48} />
            </div>
            <h2 className="text-5xl md:text-8xl font-[1000] italic uppercase tracking-tighter mb-8 leading-none">
              Готовы к <span className="text-accent-lime text-neon">взлету?</span>
            </h2>
            <p className="text-white/60 text-xl md:text-2xl mb-14 leading-relaxed max-w-2xl mx-auto font-medium">
              Нажмите кнопку ниже, чтобы перейти в Telegram и получить индивидуальный расчет стоимости за <span className="text-white font-bold">15 минут</span>.
            </p>
            <a href="https://t.me/manager24ff" target="_blank" className="btn-liquid-lime px-20 py-8 text-2xl inline-flex group">
              Связаться в Telegram
              <ArrowRight className="ml-4 group-hover:translate-x-3 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
