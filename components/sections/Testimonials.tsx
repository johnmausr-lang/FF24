"use client";

import React from "react";
import { motion } from "framer-motion";

export const Testimonials = () => {
  return (
    <section className="py-32 bg-transparent relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ filter: "blur(15px)", opacity: 0, y: 30 }}
            whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4"
          >
            Голоса <span className="text-accent-lime">рынка</span>
          </motion.h2>
          <p className="text-white/40 uppercase tracking-[0.4em] font-bold text-sm">
            Прямой поток из Яндекс.Бизнес
          </p>
        </div>

        <div className="glass-card p-6 border-white/10 bg-black/40 backdrop-blur-3xl rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/5">
          <iframe
            src="https://yandex.ru/maps-reviews-widget/240447949600?comments"
            style={{ width: '100%', height: '600px', border: 0, borderRadius: '2rem' }}
            loading="lazy"
            title="Yandex Reviews"
          />
        </div>
      </div>
    </section>
  );
};
