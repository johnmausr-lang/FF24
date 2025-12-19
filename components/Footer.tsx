"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-primary-dark border-t border-accent-lime/10 pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="text-center md:text-left">
            <Link href="/" className="inline-block mb-6">
              <div className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
                <span className="gradient-text">FF</span>
                <span className="text-accent-lime glow-pulse-lime">24</span>
                <span className="text-accent-blue">.</span>LK
              </div>
            </Link>
            <p className="text-foreground/70 font-medium leading-relaxed max-w-sm mx-auto md:mx-0">
              Ваш технологичный партнёр в мире маркетплейсов. 
              Делаем логистику простой, прозрачной и быстрой.
            </p>
          </div>

          <div className="text-center">
            <h4 className="font-black uppercase text-sm mb-6 tracking-widest text-accent-lime">Навигация</h4>
            <ul className="space-y-4 text-foreground/60 font-bold text-sm uppercase">
              <li><Link href="#benefits" className="hover:text-accent-lime transition-colors glow-pulse-lime">Услуги</Link></li>
              <li><Link href="#process" className="hover:text-accent-blue transition-colors">Процесс</Link></li>
              <li><Link href="#lead" className="hover:text-accent-lime transition-colors glow-pulse-lime">Заявка</Link></li>
            </ul>
          </div>

          <div className="text-center md:text-right">
            <h4 className="font-black uppercase text-sm mb-6 tracking-widest text-accent-lime">Контакты</h4>
            <ul className="space-y-4 font-bold text-lg">
              <li className="text-white">+7 (999) 000-24-24</li>
              <li className="text-foreground/70">info@ff24.lk</li>
              <li className="text-xs uppercase opacity-50 mt-6">
                г. Москва, ул. Лодочная, д. 5-7
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-accent-lime/10 text-center text-xs font-bold uppercase tracking-[0.3em] text-foreground/50">
          <div>© 2025 FF24 FULFILLMENT. ALL RIGHTS RESERVED.</div>
          <div className="mt-4 flex justify-center gap-8">
            <Link href="/privacy" className="hover:text-accent-lime transition-colors">Политика конфиденциальности</Link>
            <Link href="/offer" className="hover:text-accent-lime transition-colors">Публичная оферта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
