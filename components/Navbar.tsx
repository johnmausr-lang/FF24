"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? "py-4" : "py-8"
      }`}
    >
      <div className="section-container relative flex items-center justify-between">
        {/* Подложка Navbar при скролле */}
        <div className={`absolute inset-0 -z-10 transition-all duration-500 rounded-full ${
          isScrolled ? "bg-black/60 backdrop-blur-3xl border border-white/10" : "bg-transparent border-transparent"
        }`} />

        <Link href="/" className="logo-3d-wrapper shrink-0">
          <img src="/logo-ff24.png" alt="FF24" className="logo-3d h-10 md:h-14 w-auto object-contain" />
        </Link>

        <div className="flex items-center gap-10">
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {["Услуги", "Процесс", "FAQ"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`#${item.toLowerCase()}`} 
                    className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-accent-lime transition-all"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <a href="https://t.me/manager24ff" target="_blank" className="btn-liquid-frame group">
            <div className="inner-content !py-3 !px-6">
              <Send size={14} className="text-accent-lime" />
              <span className="text-[10px] font-black uppercase tracking-widest">Связаться</span>
            </div>
          </a>
        </div>
      </div>
    </motion.header>
  );
};
