"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const Footer = () => {
  const navLinks = [
    { label: "Услуги", href: "#benefits" },
    { label: "Процесс", href: "#process" },
    { label: "Заявка", href: "#lead" },
  ];

  return (
    <footer className="relative mt-20 border-t border-white/10 overflow-hidden">
      {/* Световой акцент на верхней границе */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-lime/50 to-transparent" />
      
      {/* Слой стекла с усиленным блюром */}
      <div className="glass bg-white/[0.02] backdrop-blur-3xl pt-24 pb-12 backdrop-transform">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
            
            {/* Блок Лого */}
            <div className="md:col-span-5 flex flex-col items-center md:items-start">
              <Link href="/" className="inline-block mb-10 group">
                <div className="text-6xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                  <span className="gradient-text transition-all duration-500 group-hover:brightness-125">FF</span>
                  <span className="text-white group-hover:text-accent-lime transition-colors duration-500">24</span>
                </div>
              </Link>
              <p className="text-white/50 font-medium text-lg md:text-xl leading-relaxed max-w-md text-center md:text-left uppercase tracking-tight">
                Технологичный фулфилмент полного цикла. <br />
                <span className="text-white">Масштабируем ваш бизнес на маркетплейсах.</span>
              </p>
            </div>

            {/* Навигация */}
            <div className="md:col-span-3 text-center md:text-left">
              <h4 className="font-black uppercase text-xs tracking-[0.4em] mb-10 text-accent-lime/60">
                Навигация
              </h4>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="text-2xl font-black italic uppercase hover:text-accent-lime transition-colors inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Контакты */}
            <div className="md:col-span-4 text-center md:text-right">
              <h4 className="font-black uppercase text-xs tracking-[0.4em] mb-10 text-accent-lime/60">
                Связь с нами
              </h4>
              <div className="space-y-6">
                <a 
                  href={TELEGRAM_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block text-3xl md:text-4xl font-black italic uppercase text-white hover:text-accent-lime transition-all"
                >
                  @manager24ff
                </a>
                <div className="text-xl font-medium text-white/70">
                  <p>+7 (999) 000-24-24</p>
                  <p className="text-sm tracking-widest text-white/30 mt-2 uppercase">г. Москва, ул. Лодочная, д. 5-7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Нижняя панель с защитой от 404 */}
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">
            <div>
              © 2025 FF24 FULFILLMENT. ALL RIGHTS RESERVED.
            </div>
            <div className="flex gap-12">
              {/* prefetch={false} отключает попытку Next.js загрузить несуществующие файлы */}
              <Link href="/privacy" prefetch={false} className="hover:text-white transition-colors">
                Политика
              </Link>
              <Link href="/terms" prefetch={false} className="hover:text-white transition-colors">
                Оферта
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
