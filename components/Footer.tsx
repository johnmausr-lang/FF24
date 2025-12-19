"use client";

import Link from "next/link";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const Footer = () => {
  return (
    <footer className="glass-nav pt-20 pb-12 px-6 mt-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {/* Логотип и описание */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-block mb-10">
              <div className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter">
                <span className="gradient-text">FF</span>
                <span className="text-white">24</span>
              </div>
            </Link>
            <p className="text-white/70 font-medium text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
              Ваш технологичный партнёр в мире маркетплейсов. 
              Делаем логистику простой, прозрачной и быстрой.
            </p>
          </div>

          {/* Навигация */}
          <div className="text-center">
            <h4 className="font-black uppercase text-base md:text-lg mb-8 tracking-widest text-accent-lime">
              Навигация
            </h4>
            <ul className="space-y-5 text-white/60 font-medium text-base uppercase">
              <li><Link href="#benefits" className="hover:text-white transition-colors">Услуги</Link></li>
              <li><Link href="#process" className="hover:text-white transition-colors">Процесс</Link></li>
              <li><Link href="#lead" className="hover:text-white transition-colors">Заявка</Link></li>
            </ul>
          </div>

          {/* Контакты */}
          <div className="text-center md:text-right">
            <h4 className="font-black uppercase text-base md:text-lg mb-8 tracking-widest text-accent-lime">
              Контакты
            </h4>
            <ul className="space-y-5 font-medium text-base md:text-lg">
              <li>
                <a 
                  href={TELEGRAM_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent-lime hover:text-white transition-colors"
                >
                  @manager24ff
                </a>
              </li>
              <li className="text-white text-xl md:text-2xl">+7 (999) 000-24-24</li>
              <li className="text-white/70">info@ff24.ru</li>
              <li className="text-sm uppercase text-white/50 mt-8">
                г. Москва, ул. Лодочная, д. 5-7
              </li>
            </ul>
          </div>
        </div>

        {/* Нижняя полоса */}
        <div className="pt-12 border-t border-white/10 text-center text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-white/50">
          <div>© 2025 FF24 FULFILLMENT. ALL RIGHTS RESERVED.</div>
          <div className="mt-6 flex flex-col md:flex-row justify-center gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="/offer" className="hover:text-white transition-colors">
              Публичная оферта
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
