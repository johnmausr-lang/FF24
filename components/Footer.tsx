"use client";

import React from "react";
import { Send, MapPin, Phone, ArrowRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-[#050505] pt-40 pb-20 overflow-hidden border-t border-white/5">
      <div className="section-container relative z-10">
        
        {/* Декоративный фоновый текст */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02]">
          <h2 className="text-[30vw] font-black italic uppercase select-none">FF24</h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 mb-32">
          <div className="space-y-12">
            <img src="/logo-ff24.png" alt="FF24" className="logo-3d h-16 w-auto object-contain" />
            
            <div className="glass-card p-10 space-y-8 max-w-lg border-white/5">
              <h4 className="text-2xl font-black italic uppercase tracking-tighter">
                ПОДПИШИТЕСЬ НА <span className="text-accent-lime">ПУЛЬС FF24</span>
              </h4>
              <div className="btn-liquid-frame w-full !p-[1px]">
                <div className="inner-content !bg-black/40 flex items-center !px-4 !py-1">
                  <input 
                    type="email" 
                    placeholder="E-MAIL" 
                    className="w-full bg-transparent border-none px-4 text-[10px] font-black tracking-[0.3em] focus:outline-none placeholder:text-white/20"
                  />
                  <button className="bg-accent-lime p-4 rounded-full text-black hover:scale-105 transition-transform shrink-0">
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card h-[350px] overflow-hidden border-white/5 grayscale">
            <iframe 
              src="https://yandex.ru/map-widget/v1/?ll=37.493928%2C55.850417&z=15" 
              width="100%" height="100%" frameBorder="0"
              style={{ filter: "invert(90%) hue-rotate(180deg) brightness(0.8)" }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-white/5 pt-16 items-end">
          <ContactBlock icon={<MapPin size={14}/>} label="ЛОКАЦИЯ" value="ул. Лавочкина, 23, Москва" />
          <ContactBlock icon={<Phone size={14}/>} label="СВЯЗЬ" value="+7 (987) 376-17-22" isPhone />
          
          <div className="flex justify-end">
            <a href="https://t.me/manager24ff" target="_blank" className="btn-liquid-frame group w-full md:w-auto">
              <div className="inner-content !px-8 !py-4">
                <Send size={16} className="text-accent-lime" />
                <span className="text-xl font-black italic uppercase tracking-tighter">TELEGRAM</span>
              </div>
            </a>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.8em] text-white/10">
            © 2025 FF24 FULFILLMENT. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

const ContactBlock = ({ icon, label, value, isPhone = false }: any) => (
  <div className="space-y-2">
    <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20 flex items-center gap-2">
      {icon} {label}
    </span>
    <p className={`text-lg font-bold uppercase tracking-widest ${isPhone ? 'text-accent-lime' : 'text-white/60'}`}>
      {isPhone ? <a href={`tel:${value.replace(/\D/g, '')}`}>{value}</a> : value}
    </p>
  </div>
);
