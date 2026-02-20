"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
            isScrolled ? "bg-black/80 backdrop-blur-xl border border-white/10 px-6 py-3 shadow-2xl" : "px-2"
          }`}
        >
          <div className="flex items-center gap-6">
            <Link href="/" className="text-2xl font-black italic tracking-tighter text-white">
              FF<span className="text-[#E0FF64]">24</span>
            </Link>
            
            {/* Тот самый бейдж доверия */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-white/80">
              <span className="w-2 h-2 rounded-full bg-[#E0FF64] animate-pulse shadow-[0_0_8px_#E0FF64]" />
              Приём заявок · открыт
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white hover:scale-105 transition-all">Инфраструктура</Link>
            <Link href="#process" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white hover:scale-105 transition-all">Конвейер</Link>
            <Link href="#testimonials" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white hover:scale-105 transition-all">Ниши</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+79990002424" className="text-sm font-bold text-white hover:text-[#E0FF64] transition-colors">
              +7 (999) 000-24-24
            </a>
            {/* Кнопка с эффектом Жидкого Стекла */}
            <button 
              onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-liquid-glass px-6 py-3 rounded-full flex items-center gap-2 group"
            >
              <Phone className="w-4 h-4 text-[#E0FF64] group-hover:rotate-12 transition-transform" />
              <span className="text-xs font-black uppercase tracking-wider text-white">Связаться</span>
            </button>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Мобильное меню (опущено для краткости, там стандартная реализация) */}
    </nav>
  );
};
