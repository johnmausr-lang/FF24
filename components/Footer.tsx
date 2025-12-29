"use client";

import React from "react";
import { Send, MapPin, Phone, ArrowRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-[#050505] pt-40 pb-20 overflow-hidden border-t border-white/5">
      <div className="section-container relative z-10">
        
        {/* Фоновый текст */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03]">
          <h2 className="text-[35vw] font-black italic uppercase select-none">FF24</h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-24 mb-32">
          <div className="space-y-12">
            <img src="/logo-ff24.png" alt="FF24" className="logo-3d h-20 w-auto object-contain" />
            
            {/* Форма в рамке */}
            <div className="glass-card p-8 md:p-12 space-y-8 max-w-xl">
              <h4 className="text-2xl font-black italic uppercase tracking-tighter">
                Подпишитесь на <span className="text-accent-lime">пульс FF24</span>
              </h4>
              <div className="btn-liquid-frame w-full !p-[1px]">
                <div className="inner-content !bg-black/20 flex items-center !px-4 !py-2">
                  <input 
                    type="email" 
                    placeholder="E-MAIL АДРЕС" 
                    className="w-full bg-transparent border-none px-4 text-xs font-bold tracking-widest focus:outline-none"
                  />
                  <button className="bg-accent-lime p-4 rounded-full text-black hover:scale-110 transition-transform">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card h-[400px] overflow-hidden border-white/10 grayscale">
            <iframe 
              src="https://yandex.ru/map-widget/v1/?ll=37.493928%2C55.850417&z=15" 
              width="100%" height="100%" frameBorder="0"
              style={{ filter: "invert(90%) hue-rotate(180deg) brightness(0.9)" }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-16">
          <ContactBlock icon={<MapPin size={16}/>} label="Локация" value="ул. Лавочкина, 23, Москва" />
          <ContactBlock icon={<Phone size={16}/>} label="Телефон" value="+7 (987) 376-17-22" isPhone />
          <div className="flex justify-end">
            <a href="https://t.me/manager24ff" target="_blank" className="btn-liquid-frame group">
              <div className="inner-content !px-10 !py-5">
                <Send size={18} className="text-accent-lime" />
                <span className="text-2xl font-black italic uppercase tracking-tighter">TELEGRAM</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ContactBlock = ({ icon, label, value, isPhone = false }: any) => (
  <div className="space-y-3">
    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 flex items-center gap-2">
      {icon} {label}
    </span>
    <p className={`text-xl font-bold uppercase tracking-wider ${isPhone ? 'hover:text-accent-lime transition-colors' : 'text-white/70'}`}>
      {isPhone ? <a href={`tel:${value.replace(/\D/g, '')}`}>{value}</a> : value}
    </p>
  </div>
);
