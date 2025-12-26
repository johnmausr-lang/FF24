"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const Footer = () => {
  return (
    <footer className="relative mt-20 border-t border-white/10 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-lime/50 to-transparent" />
      
      <div className="glass bg-white/[0.02] backdrop-blur-3xl pt-24 pb-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
            
            <div className="md:col-span-6 flex flex-col items-center md:items-start">
              <Link href="/" className="inline-block mb-10 group">
                <img src="/logo-ff24.png" alt="FF24" className="h-16 md:h-20 w-auto" />
              </Link>
              <div className="space-y-6 text-center md:text-left">
                <a 
                  href={TELEGRAM_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block text-4xl md:text-5xl font-black italic uppercase text-white hover:text-accent-lime transition-all"
                >
                  @manager24ff
                </a>
                <div className="text-xl md:text-2xl font-medium text-white/70">
                  <p>+7 (987) 376-17-22</p>
                  <p className="text-sm tracking-[0.3em] text-white/30 mt-4 uppercase leading-relaxed">
                    г. Москва, ул. Лавочкина, 23, стр. 4
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-6 flex flex-col md:items-end justify-center">
               <div className="glass p-8 rounded-[2rem] border-white/5 w-full max-w-sm">
                  <p className="text-accent-lime font-bold uppercase tracking-widest text-xs mb-4 text-center md:text-left">Быстрая навигация</p>
                  <div className="flex flex-col gap-4">
                    <a href="#benefits" className="text-white/50 hover:text-white transition-colors uppercase text-sm font-bold">Услуги</a>
                    <a href="#process" className="text-white/50 hover:text-white transition-colors uppercase text-sm font-bold">Процесс работы</a>
                    <a href="#lead" className="text-white/50 hover:text-white transition-colors uppercase text-sm font-bold">Оставить заявку</a>
                  </div>
               </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">
            <div>© 2025 FF24 FULFILLMENT. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-12">
              <Link href="/privacy" prefetch={false} className="hover:text-white transition-colors">Политика</Link>
              <Link href="/terms" prefetch={false} className="hover:text-white transition-colors">Оферта</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
