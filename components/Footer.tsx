"use client";

import React from "react";
import { MessageCircle, Phone, MapPin, ArrowUpRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-transparent pt-40 pb-16 overflow-hidden border-t border-white/5">
      <div className="container relative z-10">
        
        {/* Массивный Логотип Фон */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02]">
          <h2 className="text-[30vw] font-black italic uppercase leading-none select-none">FF24</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32 items-end">
          <div className="space-y-12">
            <div className="logo-3d-wrapper !justify-start">
              <img src="/logo-ff24.png" alt="FF24" className="logo-3d h-24 w-auto object-contain" />
            </div>
            <h3 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9]">
              Масштабируем <br />
              <span className="text-accent-lime text-neon">вашу прибыль</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ContactLink 
              icon={<MessageCircle size={20} />} 
              label="Telegram" 
              value="@manager24ff" 
              href="https://t.me/manager24ff" 
            />
            <ContactLink 
              icon={<Phone size={20} />} 
              label="Телефон" 
              value="+7 (987) 376-17-22" 
              href="tel:+79873761722" 
            />
            <div className="space-y-2 md:col-span-2">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 flex items-center gap-2">
                <MapPin size={14} /> Наш адрес
              </span>
              <p className="text-lg font-bold uppercase tracking-widest text-white/60">
                ул. Лавочкина, 23, стр. 4, Москва
              </p>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            © 2025 FF24 FULFILLMENT. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-10">
            {["Instagram", "WhatsApp", "VK"].map((social) => (
              <a key={social} href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-accent-lime transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const ContactLink = ({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href: string }) => (
  <a href={href} target="_blank" className="group space-y-2 block">
    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 flex items-center gap-2 transition-colors group-hover:text-accent-lime">
      {icon} {label}
    </span>
    <div className="text-2xl font-bold tracking-tight text-white flex items-center gap-2 group-hover:translate-x-1 transition-transform">
      {value} <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity text-accent-lime" />
    </div>
  </a>
);
