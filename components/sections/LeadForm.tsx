"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const LeadForm = () => {
  return (
    <section id="lead" className="py-32 bg-transparent relative overflow-hidden">
      <div className="container max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-12 md:p-24 rounded-[4rem] text-center relative overflow-hidden"
        >
          {/* Декоративное свечение */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-lime/10 blur-[120px] rounded-full" />
          
          <div className="relative z-10">
            <div className="inline-flex w-24 h-24 rounded-3xl bg-accent-lime/10 items-center justify-center text-accent-lime mb-10 border border-accent-lime/20">
              <MessageCircle size={48} />
            </div>

            <h2 className="text-5xl md:text-7xl font-[1000] italic uppercase tracking-tighter mb-8 leading-none">
              Готовы к <span className="text-accent-lime text-neon">взлету?</span>
            </h2>
            
            <p className="text-white/60 text-xl md:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
              Нажмите кнопку ниже, чтобы перейти в Telegram и получить индивидуальный расчет стоимости за <span className="text-white font-bold underline decoration-accent-lime/40">15 минут</span>.
            </p>

            <a 
              href={TELEGRAM_LINK} 
              target="_blank"
              className="btn-glass-lime w-full md:w-auto px-16 py-8 text-xl inline-flex group"
            >
              Связаться в Telegram
              <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
            </a>
            
            <p className="mt-10 text-[10px] uppercase tracking-[0.4em] text-white/20 font-black">
              FF24 Automated Infrastructure / v.2.0
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
