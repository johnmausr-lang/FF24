"use client";

import Link from "next/link";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const Footer = () => {
  return (
    <footer className="glass-nav pt-20 pb-12 px-6 mt-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
          <div className="text-center md:text-left">
            <Link href="/" className="inline-block mb-10">
              <div className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter">
                <span className="gradient-text">FF</span>
                <span className="text-accent-lime">24</span>
                <span className="text-accent-blue">.</span>LK
              </div>
            </Link>
            <p className="text-foreground/70 font-medium text-lg leading-relaxed max-w-md mx-auto md:mx-0">
              Ваш технологичный партнёр в мире маркетплейсов. 
              Делаем логистику простой, прозрачной и быстрой.
            </p>
          </div>

          <div className="text-center">
            <h4 className="font-black uppercase text-lg mb-10 tracking-widest text-accent-lime">Навигация</h4>
            <ul className="space-y-6 text-foreground/60 font-bold text-base uppercase">
              <li><Link href="#benefits" className="hover:text-accent-lime transition-colors">Услуги</Link></li>
              <li><Link href="#process" className="hover:text-accent-blue transition-colors">Процесс</Link></li>
              <li><Link href="#lead" className="hover:text-accent-lime transition-colors">Заявка</Link></li>
            </ul>
          </div>

          <div className="text-center md:text-right">
            <h4 className="font-black uppercase text-lg mb-10 tracking-widest text-accent-lime">Контакты</h4>
            <ul className="space-y-6 font-bold text-lg">
              <li>
                <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-accent-lime hover:text-white transition-colors">
                  @manager24ff
                </a>
              </li>
              <li className="text-white text-2xl">+7 (999) 000-24-24</li>
              <li className="text-foreground/70">info@ff24.lk</li>
              <li className="text-sm uppercase opacity-50 mt-8">
                г. Москва, ул. Лодочная, д. 5-7
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 text-center text-sm font-bold uppercase tracking-[0.3em] text-foreground/50">
          <div>© 2025 FF24 FULFILLMENT. ALL RIGHTS RESERVED.</div>
          <div className="mt-6 flex justify-center gap-12">
            <Link href="/privacy" className="hover:text-accent-lime transition-colors">Политика конфиденциальности</Link>
            <Link href="/offer" className="hover:text-accent-lime transition-colors">Публичная оферта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
