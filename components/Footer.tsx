"use client";

import { ParticlesBackground } from "./ParticlesBackground";

export const Footer = () => {
  return (
    <footer className="relative bg-black pt-32 pb-12 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <ParticlesBackground />
      </div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img src="/logo-ff24.png" alt="FF24" className="h-14 mb-8" />
            <a href="https://t.me/manager24ff" className="text-3xl md:text-5xl font-black italic uppercase hover:text-accent-lime transition-all">
              @manager24ff
            </a>
            <p className="text-white/40 mt-4 font-bold tracking-widest text-lg">+7 (987) 376-17-22</p>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-md mx-auto md:ml-auto">
            <a href="#benefits" className="btn-glass-secondary w-full text-center py-4 font-bold uppercase tracking-widest">Услуги</a>
            <a href="#process" className="btn-glass-secondary w-full text-center py-4 font-bold uppercase tracking-widest">Процесс</a>
            <a href="#lead" className="btn-glass-secondary w-full text-center py-4 font-bold uppercase tracking-widest text-accent-lime">Оставить заявку</a>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 text-[10px] text-center text-white/20 tracking-[0.6em] uppercase font-black">
          © 2025 FF24 FULFILLMENT. ALL SYSTEMS OPERATIONAL.
        </div>
      </div>
    </footer>
  );
};
