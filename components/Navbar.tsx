"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
// ИСПРАВЛЕНО: Путь к компоненту Button и импорт
import { Button } from "@/components/ui/button"; 

const navItems = [
  { name: "Услуги", href: "#services" },
  { name: "Процесс", href: "#process" },
  { name: "Отзывы", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "py-4 bg-black/80 backdrop-blur-xl border-b border-white/10"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link href="/" className="relative z-10 logo-3d-wrapper">
          <Image
            src="/logo-ff24.png"
            alt="FF24 Logo"
            width={140}
            height={45}
            className="w-auto h-10 md:h-12 logo-3d object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm font-bold uppercase tracking-wider text-white/70 hover:text-[#E0FF64] transition-colors relative group"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          {/* ИСПРАВЛЕНО: вариант lime вместо neon */}
          <Button variant="lime" size="sm">
            Связаться
          </Button>
        </nav>

        <button
          className="md:hidden relative z-10 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-0 flex flex-col items-center justify-center"
          >
            <ul className="flex flex-col items-center gap-8 mb-12">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-4xl font-black uppercase text-white hover:text-[#E0FF64]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Button variant="lime" size="lg" onClick={() => setIsMobileMenuOpen(false)}>
              Связаться
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
