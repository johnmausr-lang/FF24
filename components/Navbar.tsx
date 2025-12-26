"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Услуги", href: "#benefits" },
    { label: "Процесс", href: "#process" },
    { label: "Заявка", href: "#lead" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 backdrop-blur-md bg-black/20">
        <div className="container flex justify-between items-center h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img 
              src="/logo-ff24.png" 
              alt="FF24 Logo" 
              className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </motion.div>

          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="nav-link text-sm uppercase tracking-widest font-bold px-4 py-2 hover:text-accent-lime transition-colors">
                {link.label}
              </a>
            ))}
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="btn-glass-lime ml-4">
              Консультация
            </a>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={32} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-black flex flex-col p-8"
          >
            <div className="flex justify-end mb-8">
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={40} className="text-white" />
              </button>
            </div>
            <div className="flex flex-col items-center gap-8 mt-12">
              <img src="/logo-ff24.png" alt="FF24" className="h-16 w-auto mb-8" />
              {navLinks.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-black italic uppercase tracking-tighter text-white hover:text-accent-lime"
                >
                  {link.label}
                </a>
              ))}
              <a href={TELEGRAM_LINK} target="_blank" className="btn-glass-lime w-full text-center py-6 mt-8">
                Telegram
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
