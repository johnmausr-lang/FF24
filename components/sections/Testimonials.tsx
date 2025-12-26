"use client";

import React from "react";
import { ParticlesBackground } from "../ParticlesBackground";

export const Testimonials = () => {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Звезды на фоне секции отзывов для глубины */}
      <div className="absolute inset-0 z-0 opacity-30">
        <ParticlesBackground />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4">
            Голоса <span className="text-accent-lime">рынка</span>
          </h2>
          <p className="text-white/40 uppercase tracking-[0.4em] font-bold text-sm">
            Прямой поток отзывов из Яндекс.Бизнес
          </p>
        </div>

        {/* Официальный виджет Яндекс.Карт */}
        <div className="glass-card p-4 border-white/10 bg-white/[0.02] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <iframe
            src="https://yandex.ru/maps-reviews-widget/240447949600?comments"
            style={{ width: '100%', height: '600px', border: 0, borderRadius: '1.5rem' }}
            loading="lazy"
            title="Yandex Reviews FF24"
          />
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="https://yandex.ru/maps/org/ff24/240447949600/reviews/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-[0.4em] text-white/30 hover:text-accent-lime transition-colors font-bold"
          >
            Смотреть все отзывы в первоисточнике →
          </a>
        </div>
      </div>
    </section>
  );
};
