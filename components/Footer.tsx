"use client";

import React from "react";
import { Send, MapPin, Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="relative bg-[#050505] pt-40 pb-20 overflow-hidden border-t border-white/5">
      <div className="container relative z-10">
        
        {/* Фоновая типографика для хай-класс эффекта */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03]">
          <h2 className="text-[35vw] font-black italic uppercase leading-none select-none">FF24</h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-32 mb-40">
          <div className="space-y-16">
            <div className="logo-3d-wrapper !justify-start">
              <img src="/logo-ff24.png" alt="FF24" className="logo-3d h-28 w-auto object-contain" />
            </div>
            
            {/* Форма быстрой подписки в стиле жидкого стекла [user request, cite: globals (2).css] */}
            <div className="glass-card p-10 space-y-8 max-w-xl shadow-[0_30px_100px_rgba(0,0,0,0.4)]">
              <h4 className="text-2xl font-black italic uppercase tracking-tighter text-white">
                Подпишитесь на <span className="text-accent-lime">пульс FF24</span>
              </h4>
              <form className="relative flex items-center">
                <input 
                  type="email" 
                  placeholder="E-MAIL АДРЕС" 
                  className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-6 text-sm font-bold tracking-widest focus:outline-none focus:border-accent-lime/50 transition-all"
                />
                <button type="submit" className="absolute right-2 btn-liquid-lime w-14 h-14 !rounded-full">
                  <ArrowRight size={20} />
                </button>
              </form>
            </div>
          </div>

          {/* Интерактивная карта [user request] */}
          <div className="glass-card overflow-hidden h-[450px] relative border-white/10 shadow-2xl">
            <iframe 
              src="https://yandex.ru/map-widget/v1/?ll=37.493928%2C55.850417&z=15&pt=37.493928%2C55.850417,pm2gnm" 
              width="100%" 
              height="100%" 
              frameBorder="0"
              style={{ filter: "invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.2)" }}
              className="grayscale contrast-125"
            ></iframe>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-end border-t border-white/5 pt-20">
          <div className="space-y-4">
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20 flex items-center gap-3">
              <MapPin size={16} className="text-accent-lime" /> Локация
            </span>
            <p className="text-xl font-bold uppercase tracking-wider text-white/70">
              ул. Лавочкина, 23, стр. 4, Москва
            </p>
          </div>

          <div className="space-y-4">
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20 flex items-center gap-3">
              <Phone size={16} className="text-accent-lime" /> Телефон
            </span>
            <a href="tel:+79873761722" className="text-2xl font-black text-white hover:text-accent-lime transition-colors">
              +7 (987) 376-17-22
            </a>
          </div>

          {/* Только Telegram [user request] */}
          <div className="flex flex-col items-center md:items-end gap-6">
            <a 
              href="https://t.me/manager24ff" 
              target="_blank" 
              className="flex items-center gap-6 text-4xl md:text-6xl font-black italic uppercase text-white hover:text-accent-lime tracking-tighter transition-all"
            >
              <Send size={48} className="text-accent-lime" />
              TELEGRAM
            </a>
          </div>
        </div>

        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6">
          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/10">
            © 2025 FF24 FULFILLMENT. PREMIUM LOGISTICS NETWORK.
          </span>
        </div>
      </div>
    </footer>
  );
};
