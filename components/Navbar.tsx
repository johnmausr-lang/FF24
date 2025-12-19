"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Услуги", href: "#benefits" },
    { label: "Процесс", href: "#process" },
    { label: "Заявка", href: "#lead" }, // вместо калькулятора
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-accent-lime/10 px-6 py-5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Логотип */}
        <motion.a 
          href="/"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl md:text-4xl font-black italic tracking-tighter"
        >
          <span className="gradient-text">FF</span>
          <span className="text-accent-lime glow-pulse-lime">24</span>
        </motion.a>

        {/* Десктоп меню */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-bold uppercase tracking-widest text-foreground/70 hover:text-accent-lime transition-colors glow-pulse-lime"
            >
              {link.label}
            </a>
          ))}
          <Button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-accent-lime text-primary-dark hover:bg-white shadow-neon-lime glow-pulse-lime gradient-border-thick rounded-full px-8 py-4 font-black uppercase text-sm tracking-wider"
          >
            Связаться
          </Button>
        </div>

        {/* Мобильное меню (гамбургер) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-accent-lime"
        >
          {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Мобильное меню панель */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-accent-lime/20 py-8 px-6"
          >
            <div className="flex flex-col gap-8 items-center">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-black uppercase tracking-widest text-accent-lime glow-pulse-lime"
                >
                  {link.label}
                </a>
              ))}
              <Button 
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="bg-accent-lime text-primary-dark shadow-neon-lime glow-pulse-lime gradient-border-thick rounded-full px-12 py-6 text-xl font-black uppercase"
              >
                Связаться
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
