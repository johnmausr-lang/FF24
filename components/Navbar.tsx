"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./button";

const navItems = [
  { name: "Services", href: "#services" },
  { name: "Process", href: "#process" },
  { name: "Reviews", href: "#testimonials" },
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
        <Link href="/" className="relative z-10 logo-3d-container">
           {/* НОВЫЙ ЛОГОТИП С 3D ЭФФЕКТОМ */}
          <Image
            src="/logo-ff24.png" // Убедитесь, что файл здесь
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
                  className="text-sm font-bold uppercase tracking-wider text-white/70 hover:text-accent-lime transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-accent-lime transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
          <Button variant="neon" size="sm">
            Get Offer
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden relative z-10 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-0 flex flex-col items-center justify-center"
          >
            <ul className="flex flex-col items-center gap-8 mb-12">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                >
                  <Link
                    href={item.href}
                    className="text-4xl font-black uppercase tracking-tighter text-white hover:text-accent-lime transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Button variant="neon" size="lg" onClick={() => setIsMobileMenuOpen(false)}>
              Get Offer
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
