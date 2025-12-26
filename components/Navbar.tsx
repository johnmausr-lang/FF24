"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? "py-4 bg-black/60 backdrop-blur-xl" : "py-8 bg-transparent"
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* КРУПНЫЙ ЛОГОТИП С 3D ЭФФЕКТОМ */}
        <Link href="/" className="logo-3d-wrapper">
          <img 
            src="/logo-ff24.png" 
            alt="FF24" 
            className="logo-3d h-16 md:h-20 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-12">
          <ul className="flex items-center gap-10">
            {["Услуги", "Процесс", "FAQ"].map((item) => (
              <li key={item}>
                <Link href={`#${item.toLowerCase()}`} className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-accent-lime transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* КНОПКА В РАМКЕ С ЭФФЕКТОМ ЖИДКОГО СТЕКЛА */}
          <a href="https://t.me/manager24ff" target="_blank" className="btn-liquid-lime px-10 py-4 text-sm tracking-widest">
            Связаться
          </a>
        </nav>
      </div>
    </header>
  );
};
