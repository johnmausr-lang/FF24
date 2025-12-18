"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <Link href="/" className="text-3xl font-black italic uppercase tracking-tighter mb-6 block">
              FF24<span className="text-accent-DEFAULT">.</span>LK
            </Link>
            <p className="text-muted-foreground max-w-sm font-medium">
              Ваш технологичный партнер в мире маркетплейсов. 
              Делаем логистику простой, прозрачной и быстрой.
            </p>
          </div>
          
          <div>
            <h4 className="font-black uppercase text-sm mb-6 tracking-widest">Навигация</h4>
            <ul className="space-y-4 text-muted-foreground font-bold text-sm uppercase">
              <li><Link href="#services" className="hover:text-accent-DEFAULT transition-colors">Услуги</Link></li>
              <li><Link href="#process" className="hover:text-accent-DEFAULT transition-colors">Процесс</Link></li>
              <li><Link href="#calculator" className="hover:text-accent-DEFAULT transition-colors">Калькулятор</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase text-sm mb-6 tracking-widest">Контакты</h4>
            <ul className="space-y-4 text-muted-foreground font-bold text-sm">
              <li className="text-white">+7 (999) 000-24-24</li>
              <li>info@ff24.lk</li>
              <li className="text-xs uppercase opacity-50 leading-relaxed">
                г. Москва, ул. Лодочная, д. 5-7
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          <div>© 2024 FF24 FULFILLMENT. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
            <Link href="#" className="hover:text-white transition-colors">Публичная оферта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
