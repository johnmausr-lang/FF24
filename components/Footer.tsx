"use client";

import Link from "next/link";
import { ParticlesBackground } from "./ParticlesBackground";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const Footer = () => {
  return (
    <footer className="relative bg-black pt-32 pb-12 border-t border-white/5 overflow-hidden">
      {/* Фон со звездами */}
      <div className="absolute inset-0 z-0 opacity-40">
        <ParticlesBackground />
      </div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20 items-center">
          
          {/* Контакты */}
          <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left">
            <img src="/logo-ff24.png" alt="FF24" className="h-14 mb-8" />
            <div className="space-y-6">
              <a href={TELEGRAM_LINK} target="_blank" className="text-4xl md:text-6xl font-black italic uppercase hover:text-accent-lime transition-all tracking-tighter">
                @manager24ff
              </a>
              <div className="space-y-2 text-white/90">
                <p className="text-2xl font-bold">+7 (987) 376-17-22</p>
                <p className="text-sm uppercase tracking-[0.2em] text-white/40 font-bold leading-relaxed">
                  г. Москва, ул. Лавочкина, 23, стр. 4
                </p>
              </div>
            </div>
          </div>

          {/* Кнопки меню (выровнены по ширине) */}
          <div className="md:col-span-5 flex flex-col gap-3 w-full max-w-sm mx-auto md:ml-auto">
            <h4 className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-black mb-4 text-center md:text-right">Навигация</h4>
            <a href="#benefits" className="btn-glass-secondary w-full text-center py-4 font-bold uppercase tracking-widest text-xs">Услуги</a>
            <a href="#process" className="btn-glass-secondary w-full text-center py-4 font-bold uppercase tracking-widest text-xs">Процесс работы</a>
            <a href="#lead" className="btn-glass-lime w-full text-center py-4 font-bold uppercase tracking-widest text-xs">Оставить заявку</a>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 text-[10px] text-center text-white/20 tracking-[0.5em] uppercase font-black">
          © 2025 FF24 FULFILLMENT. ALL SYSTEMS OPERATIONAL.
        </div>
      </div>
    </footer>
  );
};
