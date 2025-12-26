"use client";

import React from "react";
import { MessageCircle, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-transparent pt-32 pb-12 border-t border-white/5 flex flex-col items-center justify-center text-center">
      <div className="container flex flex-col items-center justify-center">
        {/* КРУПНЫЙ ЛОГОТИП */}
        <div className="logo-3d-wrapper mb-16">
          <img src="/logo-ff24.png" alt="FF24" className="logo-3d h-20 md:h-32 w-auto object-contain" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20 w-full max-w-5xl">
          <div className="flex flex-col items-center md:items-start gap-6">
            <a href="https://t.me/manager24ff" target="_blank" className="flex items-center gap-4 text-4xl md:text-6xl font-[1000] italic uppercase text-white hover:text-accent-lime tracking-tighter transition-all">
              <MessageCircle size={48} /> @manager24ff
            </a>
            <div className="flex flex-col md:flex-row gap-8 mt-4 text-white/50 font-bold uppercase tracking-widest text-[10px] items-center">
              <div className="flex items-center gap-2"><Phone size={14} /> +7 (987) 376-17-22</div>
              <div className="flex items-center gap-2 text-center"><MapPin size={14} /> ул. Лавочкина, 23, стр. 4, Москва</div>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end justify-center">
             <a href="https://t.me/manager24ff" target="_blank" className="btn-liquid-lime px-16 py-8 text-xl">Запустить поток</a>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 w-full text-[10px] text-white/20 tracking-[0.4em] uppercase font-black">
          © 2025 FF24 FULFILLMENT. ПРОВЕРЕННАЯ ЛОГИСТИКА.
        </div>
      </div>
    </footer>
  );
};
