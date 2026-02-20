"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex items-center justify-between rounded-full transition-all duration-500 ${
            isScrolled ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 px-6 py-3 shadow-2xl" : "px-2"
          }`}
        >
          <div className="flex items-center gap-6">
            <Link href="/" className="text-2xl font-black italic tracking-tighter text-slate-900 dark:text-white transition-colors duration-500">
              FF<span className="text-lime-500 dark:text-[#E0FF64]">24</span>
            </Link>
            
            {/* Пульсирующий бейдж доверия */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-600 dark:text-white/80 transition-colors duration-500">
              <span className="w-2 h-2 rounded-full bg-lime-500 dark:bg-[#E0FF64] animate-pulse shadow-[0_0_8px_rgba(224,255,100,0.8)]" />
              Приём заявок · открыт
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:scale-105 transition-all">Инфраструктура</Link>
            <Link href="#process" className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:scale-105 transition-all">Конвейер</Link>
            <Link href="#testimonials" className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:scale-105 transition-all">Ниши</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+79990002424" className="text-sm font-bold text-slate-600 dark:text-white hover:text-lime-500 dark:hover:text-[#E0FF64] transition-colors">
              +7 (999) 000-24-24
            </a>
            
            {/* НОВАЯ КНОПКА PRIME (уменьшенные отступы для навбара через !py-3 !px-6) */}
            <button 
              onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-prime !py-3 !px-6 group"
            >
              <div className="btn-shine"></div>
              <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>Связаться</span>
            </button>
          </div>

          <button className="md:hidden text-slate-900 dark:text-white p-2" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-black border-b border-slate-200 dark:border-white/10 p-6 flex flex-col gap-4 shadow-xl">
          <button className="absolute top-6 right-6 text-slate-900 dark:text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
          <Link href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Инфраструктура</Link>
          <Link href="#process" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Конвейер</Link>
          <Link href="#testimonials" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Решения для ниш</Link>
          <div className="h-px bg-slate-200 dark:bg-white/10 my-2" />
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-prime w-full group justify-center mt-2"
          >
            <div className="btn-shine"></div>
            <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>Связаться</span>
          </button>
        </div>
      )}
    </nav>
  );
};
