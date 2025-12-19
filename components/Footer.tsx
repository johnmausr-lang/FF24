"use client";

import Link from "next/link";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const Footer = () => {
  return (
    <footer className="glass-nav pt-16 pb-8 px-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="text-center md:text-left">
            <Link href="/" className="inline-block mb-8">
              <div className="text-5xl font-black italic uppercase tracking-tighter">
                <span className="text-accent-lime">FF</span>
                <span className="text-white">24</span>
              </div>
            </Link>
            <p className="text-white/70 text-base leading-relaxed text-contained mx-auto md:mx-0">
              Ваш технологичный партнёр в мире маркетплейсов. 
              Делаем логистику простой, прозрачной и быстрой.
            </p>
          </div>

          <div className="text-center">
            <h4 className="font-bold uppercase text-accent-lime mb-6">
              Навигация
            </h4>
            <ul className="space-y-4 text-white/60">
              <li><Link href="#benefits" className="hover:text-white transition">Услуги</Link></li>
              <li><Link href="#process" className="hover:text-white transition">Процесс</Link></li>
              <li><Link href="#lead" className="hover:text-white transition">Заявка</Link></li>
            </ul>
          </div>

          <div className="text-center md:text-right">
            <h4 className="font-bold uppercase text-accent-lime mb-6">
              Контакты
            </h4>
            <ul className="space-y-4">
              <li>
                <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-accent-lime hover:text-white transition">
                  @manager24ff
                </a>
              </li>
              <li className="text-white text-xl">+7 (999) 000-24-24</li>
              <li className="text-white/70">info@ff24.ru</li>
              <li className="text-white/50 text-sm mt-8">
                г. Москва, ул. Лодочная, д. 5-7
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm text-white/50">
          © 2025 FF24 FULFILLMENT. ALL RIGHTS RESERVED.
          <div className="mt-4 flex justify-center gap-8">
            <Link href="/privacy" className="hover:text-white transition">Политика конфиденциальности</Link>
            <Link href="/offer" className="hover:text-white transition">Публичная оферта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
