"use client";

import { ParticlesBackground } from "./ParticlesBackground";

export const Footer = () => {
  return (
    <footer className="relative bg-black pt-32 pb-12 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        <ParticlesBackground />
      </div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-20">
          <div className="flex flex-col items-center md:items-start">
            <img src="/logo-ff24.png" alt="FF24" className="h-16 mb-10" />
            <a href="https://t.me/manager24ff" className="text-4xl font-black italic uppercase hover:text-accent-lime transition-all">@manager24ff</a>
            <p className="text-white/40 mt-4 font-bold">+7 (987) 376-17-22</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <a href="#benefits" className="btn-glass-secondary w-full text-center py-4 font-bold uppercase tracking-widest text-sm">Услуги</a>
            <a href="#process" className="btn-glass-secondary w-full text-center py-4 font-bold uppercase tracking-widest text-sm">Процесс</a>
            <a href="#lead" className="btn-glass-secondary w-full text-center py-4 font-bold uppercase tracking-widest text-sm">Заявка</a>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 text-[10px] text-center text-white/20 tracking-[0.5em] uppercase font-black">
          © 2025 FF24 FULFILLMENT. STARS INCLUDED.
        </div>
      </div>
    </footer>
  );
};
