"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone, MapPin, Send } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-50 dark:bg-black pt-20 pb-10 border-t border-slate-200 dark:border-white/10 overflow-hidden transition-colors duration-500">
      {/* Декоративное свечение на фоне */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-lime-400/10 dark:bg-[#E0FF64]/5 blur-[120px] rounded-full pointer-events-none transition-colors duration-500" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Блок 1: Бренд и Призыв к действию */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="text-3xl font-black italic tracking-tighter text-slate-900 dark:text-white transition-colors duration-500">
              FF<span className="text-lime-500 dark:text-[#E0FF64]">24</span>
            </Link>
            <p className="text-slate-500 dark:text-white/50 text-sm font-medium leading-relaxed transition-colors duration-500">
              Автоматизированный фулфилмент нового поколения. Масштабируем ваш бизнес на Wildberries, Ozon и Яндекс.Маркет.
            </p>
            
            {/* НОВАЯ КНОПКА PRIME */}
            <button 
              onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-prime w-fit group"
            >
              <div className="btn-shine"></div>
              <span>Обсудить проект</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          {/* Блок 2: Навигация */}
          <div className="flex flex-col gap-4">
            <h4 className="text-slate-900 dark:text-white font-black uppercase tracking-widest text-xs mb-2 transition-colors duration-500">Навигация</h4>
            <Link href="#features" className="text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors">Инфраструктура</Link>
            <Link href="#process" className="text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors">Наш конвейер</Link>
            <Link href="#testimonials" className="text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors">Решения для ниш</Link>
            <Link href="#faq" className="text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors">Частые вопросы</Link>
          </div>

          {/* Блок 3: Документы */}
          <div className="flex flex-col gap-4">
            <h4 className="text-slate-900 dark:text-white font-black uppercase tracking-widest text-xs mb-2 transition-colors duration-500">Клиентам</h4>
            <Link href="/privacy" className="text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors">Политика конфиденциальности</Link>
            <Link href="/oferta" className="text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors">Публичная оферта</Link>
            <Link href="/tariffs" className="text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors">Тарифы 2026</Link>
            <Link href="/api-docs" className="text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors">API Документация</Link>
          </div>

          {/* Блок 4: Контакты */}
          <div className="flex flex-col gap-4">
            <h4 className="text-slate-900 dark:text-white font-black uppercase tracking-widest text-xs mb-2 transition-colors duration-500">Контакты</h4>
            <a href="tel:+79990002424" className="flex items-center gap-3 text-slate-500 dark:text-white/50 hover:text-lime-500 dark:hover:text-[#E0FF64] text-sm font-medium transition-colors">
              <Phone className="w-4 h-4" />
              +7 (999) 000-24-24
            </a>
            <a href="mailto:hello@ff24.pro" className="flex items-center gap-3 text-slate-500 dark:text-white/50 hover:text-lime-500 dark:hover:text-[#E0FF64] text-sm font-medium transition-colors">
              <Mail className="w-4 h-4" />
              hello@ff24.pro
            </a>
            <a href="https://t.me/ff24_admin" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-500 dark:text-white/50 hover:text-lime-500 dark:hover:text-[#E0FF64] text-sm font-medium transition-colors">
              <Send className="w-4 h-4" />
              @ff24_admin
            </a>
            <div className="flex items-start gap-3 text-slate-500 dark:text-white/50 text-sm font-medium mt-2 transition-colors duration-500">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
              <span>г. Москва, ул. Логистическая, д. 1 (Складской комплекс А+)</span>
            </div>
          </div>

        </div>

        {/* Нижняя полоса */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors duration-500">
          <p className="text-slate-400 dark:text-white/30 text-xs font-medium">
            © {currentYear} FF24 Fulfillment. Все права защищены.
          </p>
          <div className="flex items-center gap-2 text-slate-400 dark:text-white/30 text-xs font-medium">
            <span>Разработано для лидеров рынка</span>
            <span className="w-1.5 h-1.5 rounded-full bg-lime-500 dark:bg-[#E0FF64]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
