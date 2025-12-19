"use client";

import Link from "next/link";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const Footer = () => {
  return (
    <footer className="relative z-10 glass-heavy border-t border-white/10 pt-32 pb-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
          <div className="md:col-span-2">
            <div className="text-5xl font-black italic uppercase mb-10 tracking-tighter cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="gradient-text">FF</span>24
            </div>
            <p className="text-white/40 text-xl leading-relaxed max-w-md font-medium">
              Автоматизированный фулфилмент для маркетплейсов. Мы превращаем хаос логистики в четкую систему.
            </p>
          </div>
          
          <div className="flex flex-col gap-6">
            <h4 className="text-accent-lime uppercase text-sm font-black tracking-[0.3em] mb-4">Навигация</h4>
            <a href="#benefits" className="text-white/60 hover:text-white transition-colors text-lg font-bold uppercase tracking-widest">Услуги</a>
            <a href="#process" className="text-white/60 hover:text-white transition-colors text-lg font-bold uppercase tracking-widest">Процесс</a>
            <a href="#lead" className="text-white/60 hover:text-white transition-colors text-lg font-bold uppercase tracking-widest">Заявка</a>
          </div>

          <div className="flex flex-col gap-6 md:items-end md:text-right">
            <h4 className="text-accent-lime uppercase text-sm font-black tracking-[0.3em] mb-4">Связь</h4>
            <p className="text-2xl font-black italic text-white">+7 (999) 000-24-24</p>
            <p className="text-white/40 uppercase text-sm tracking-[0.2em] font-bold">г. Москва, ул. Лодочная 5-7</p>
            <a href={TELEGRAM_LINK} target="_blank" className="btn-glass-lime !py-3 !px-8 !text-xs mt-4">
              TELEGRAM ЧАТ
            </a>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] uppercase tracking-[0.6em] text-white/20 font-bold">
            © 2025 FF24 FULFILLMENT. ALL SYSTEMS OPERATIONAL.
          </div>
          <div className="flex gap-12 text-[10px] uppercase tracking-[0.3em] font-black text-white/30">
            <Link href="/privacy" className="hover:text-accent-lime transition-colors">Политика</Link>
            <Link href="/terms" className="hover:text-accent-lime transition-colors">Договор</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
