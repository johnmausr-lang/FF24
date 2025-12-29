"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled ? "py-4" : "py-8"
      }`}
    >
      <div className="container px-6 flex items-center justify-between">
        {/* Стеклянная подложка навигации */}
        <div className={`absolute inset-x-4 inset-y-2 -z-10 transition-all duration-700 rounded-full border border-white/5 ${
          isScrolled ? "bg-black/40 backdrop-blur-2xl shadow-2xl" : "bg-transparent border-transparent"
        }`} />

        <Link href="/" className="logo-3d-wrapper group">
          <img 
            src="/logo-ff24.png" 
            alt="FF24" 
            className="logo-3d h-12 md:h-16 w-auto object-contain transition-transform duration-500 group-hover:scale-110" 
          />
        </Link>

        <nav className="hidden md:flex items-center gap-12">
          <ul className="flex items-center gap-10">
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
          
          <a href="https://t.me/manager24ff" target="_blank" className="btn-liquid-lime px-10 py-4 text-[10px] shadow-[0_0_30px_rgba(224,255,100,0.2)]">
            Связаться
          </a>
        </nav>
      </div>
    </motion.header>
  );
};
