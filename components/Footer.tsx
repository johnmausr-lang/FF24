"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, MessageCircle } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-transparent pt-32 pb-12 border-t border-white/5 overflow-hidden">
      {/* Декоративное неоновое свечение в углу футера */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-lime/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24 items-start">
          
          {/* Блок бренда и контактов */}
          <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="logo-3d-wrapper mb-10">
              <Link href="/">
                <img 
                  src="/logo-ff24.png" 
                  alt="FF24 Fulfillment" 
                  className="logo-3d h-14 md:h-16 w-auto object-contain" 
                />
              </Link>
            </div>
            
            <div className="space-y-8">
              <motion.a 
                href="https://t.me/manager24ff" 
                target="_blank"
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-4 text-4xl md:text-6xl font-[1000] italic uppercase text-white hover:text-accent-lime transition-all tracking-tighter"
              >
                <MessageCircle size={40} className="md:w-12 md:h-12" />
                @manager24ff
              </motion.a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-white/90">
                <div className="space-y-2">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-accent-lime/60 mb-1">
                    <Phone size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Телефон</span>
                  </div>
                  <a href="tel:+79873761722" className="text-2xl font-bold hover:text-accent-lime transition-colors">
                    +7 (987) 376-17-22
                  </a>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-accent-lime/60 mb-1">
                    <MapPin size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Наш адрес</span>
                  </div>
                  <p className="text-sm uppercase tracking-[0.1em] text-white/50 font-bold leading-relaxed max-w-[250px]">
                    ул. Лавочкина, 23, стр. 4, Москва
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Блок навигации и кнопок */}
          <div className="md:col-span-5 flex flex-col gap-4 w-full max-w-sm mx-auto md:ml-auto">
            <h4 className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-black mb-6 text-center md:text-right">Навигация по системе</h4>
            
            <Link href="#services" className="btn-glass-secondary w-full text-center py-5 font-bold uppercase tracking-widest text-xs group">
              <span className="group-hover:text-accent-lime transition-colors">Услуги фулфилмента</span>
            </Link>
            
            <Link href="#process" className="btn-glass-secondary w-full text-center py-5 font-bold uppercase tracking-widest text-xs group">
              <span className="group-hover:text-accent-lime transition-colors">Процесс работы</span>
            </Link>
            
            <Link href="https://t.me/manager24ff" target="_blank" className="btn-glass-lime w-full text-center py-5 font-[1000] uppercase tracking-[0.2em] text-sm mt-2 flex items-center justify-center gap-3">
              Получить расчет
              <Send size={18} />
            </Link>
          </div>
        </div>
        
        {/* Нижняя часть футера */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] text-center md:text-left text-white/20 tracking-[0.4em] uppercase font-black">
            © {currentYear} FF24 FULFILLMENT. ПРОВЕРЕННАЯ ЛОГИСТИКА.
          </div>
          
          <div className="flex gap-10">
            {/* Ссылки заменены на заглушки для устранения ошибок 404 */}
            <Link href="#" className="text-[9px] uppercase tracking-widest text-white/10 hover:text-white/40 transition-colors font-bold">
              Политика конфиденциальности
            </Link>
            <Link href="#" className="text-[9px] uppercase tracking-widest text-white/10 hover:text-white/40 transition-colors font-bold">
              Публичная оферта
            </Link>
          </div>
        </div>
      </div>

      {/* Огромный фоновый текст для стиля */}
      <div className="absolute -bottom-10 left-0 w-full overflow-hidden pointer-events-none opacity-[0.02] select-none">
        <h2 className="text-[22vw] font-[1000] italic uppercase leading-none text-white whitespace-nowrap">
          FF24 LOGISTICS
        </h2>
      </div>
    </footer>
  );
};
