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
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 md:p-24 rounded-[4rem] text-center relative overflow-hidden border-white/10"
        >
          {/* Декоративное неоновое пятно */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-lime/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex w-24 h-24 rounded-3xl bg-accent-lime/10 items-center justify-center text-accent-lime mb-12 border border-accent-lime/20 shadow-[0_0_40px_rgba(224,255,100,0.1)]">
              <MessageCircle size={48} />
            </div>

            <h2 className="text-5xl md:text-8xl font-[1000] italic uppercase tracking-tighter mb-8 leading-none">
              Готовы к <span className="text-accent-lime text-neon">взлету?</span>
            </h2>
            
            <p className="text-white/70 text-xl md:text-2xl mb-14 leading-relaxed max-w-2xl mx-auto font-medium">
              Нажмите кнопку ниже, чтобы перейти в Telegram и получить индивидуальный расчет стоимости за <span className="text-white font-bold underline decoration-accent-lime/40 decoration-2 underline-offset-8">15 минут</span>.
            </p>

            <a 
              href={TELEGRAM_LINK} 
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass-lime w-full md:w-auto px-16 py-8 text-xl inline-flex group"
            >
              Связаться в Telegram
              <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform duration-300" />
            </a>
            
            <p className="mt-12 text-[10px] uppercase tracking-[0.5em] text-white/20 font-black">
              FF24 PREMIUM LOGISTICS / GLOBAL NETWORK
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
