"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { GlassVideo } from "@/components/ui/GlassVideo";

export const Testimonials = () => {
  const [reviews, setReviews] = useState([
    { author: "Александр В.", text: "Отличный фулфилмент! Маркировка Честным Знаком прошла без ошибок.", rating: 5, date: "12.12.2024" },
    { author: "Мария С.", text: "Скорость отгрузки впечатляет, товар на WB появился через день.", rating: 5, date: "10.12.2024" },
    { author: "Дмитрий", text: "Работаем по FBS, забор товара всегда вовремя. Рекомендую.", rating: 5, date: "08.12.2024" },
  ]);

  return (
    <section className="relative py-40 bg-black overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Внутреннее видео фона для сервисных секций */}
      <GlassVideo 
        src="/videos/service-bg.webm" 
        opacity={0.2} 
      />

      <div className="container relative z-10">
        <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-20 text-right">
          ОТЗЫВЫ / <span className="text-accent-lime">CLIENTS</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="glass-card p-10 relative overflow-hidden group"
            >
              <Quote className="absolute -top-4 -right-4 text-white/5 group-hover:text-accent-lime/10 transition-colors" size={120} />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={14} className={s < rev.rating ? "fill-accent-lime text-accent-lime" : "text-white/10"} />
                ))}
              </div>

              <p className="text-white/60 text-sm italic uppercase leading-relaxed mb-8 relative z-10">
                "{rev.text}"
              </p>

              <div className="flex justify-between items-center border-t border-white/5 pt-6">
                <span className="font-bold uppercase tracking-tighter text-accent-lime">{rev.author}</span>
                <span className="text-[10px] font-mono text-white/20 uppercase">{rev.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
