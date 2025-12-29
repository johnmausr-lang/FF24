"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -120 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        isScrolled ? "py-4" : "py-10"
      }`}
    >
      <div className="container px-8 flex items-center justify-between">
        {/* Интеллектуальная стеклянная подложка */}
        <div className={`absolute inset-x-4 inset-y-0 -z-10 transition-all duration-700 rounded-full border ${
          isScrolled 
            ? "bg-black/60 backdrop-blur-3xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
            : "bg-transparent border-transparent"
        }`} />

        <Link href="/" className="logo-3d-wrapper group">
          <img 
            src="/logo-ff24.png" 
            alt="FF24" 
            className="logo-3d h-14 md:h-20 w-auto object-contain transition-all duration-500 group-hover:scale-110" 
          />
        </Link>

        <nav className="hidden md:flex items-center gap-16">
          <ul className="flex items-center gap-12">
            {["Услуги", "Процесс", "FAQ"].map((item) => (
              <li key={item}>
                <Link 
                  href={`#${item.toLowerCase()}`} 
                  className="text-[11px] font-black uppercase tracking-[0.5em] text-white/30 hover:text-accent-lime transition-all"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          
          <a 
            href="https://t.me/manager24ff" 
            target="_blank" 
            className="btn-liquid-lime px-12 py-5 text-[11px] flex items-center gap-3"
          >
            <Send size={14} className="fill-current" />
            Связаться
          </a>
        </nav>
      </div>
    </motion.header>
  );
};
