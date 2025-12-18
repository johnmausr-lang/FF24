"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-primary-dark border-t border-accent-lime/10 pt-20 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            {/* Логотип с переливом в подвале */}
            <Link href="/" className="inline-block mb-8">
              <div className="text-5xl font-black italic uppercase tracking-tighter">
                <span className="gradient-text">FF</span>
                <span className="text-accent-lime glow-pulse-lime">24</span>
                <span className="text-accent-blue">.</span>LK
              </div>
            </Link>
            <p className="text-foreground/70 max-w-md font-medium leading-relaxed">
              Ваш технологичный партнёр в мире маркетплейсов. 
              Делаем логистику простой, прозрачной и быстрой.
            </p>
          </div>
          
          <div>
            <h4 className="font-black uppercase text-sm mb-6 tracking-widest text-accent-lime">Навигация</h4>
            <ul className="space-y-4 text-foreground/60 font-bold text-sm uppercase">
              <li><Link href="#benefits" className="hover:text-accent-lime transition-colors glow-pulse-lime">Услуги</Link></li>
              <li><Link href="#process" className="hover:text-accent-blue transition-colors">Процесс</Link></li>
              <li><Link href="#calculator" className="hover:text-accent-lime transition-colors glow-pulse-lime">Калькулятор</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase text-sm mb-6 tracking-widest text-accent-lime">Контакты</h4>
            <ul className="space-y-4 font-bold text-sm">
              <li className="text-white text-xl">+7 (999) 000-24-24</li>
              <li className="text-foreground/70">info@ff24.lk</li>
              <li className="text-xs uppercase opacity-50 leading-relaxed mt-6">
                г. Москва, ул. Лодочная, д. 5-7
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-accent-lime/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold uppercase tracking-[0.3em] text-foreground/50">
          <div>© 2025 FF24 FULFILLMENT. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-10">
            <Link href="#" className="hover:text-accent-lime transition-colors">Политика конфиденциальности</Link>
            <Link href="#" className="hover:text-accent-lime transition-colors">Публичная оферта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
