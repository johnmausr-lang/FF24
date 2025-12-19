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
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav px-6 py-5">
        <div className="container flex justify-between items-center">
          {/* Логотип */}
          <motion.div className="text-3xl md:text-4xl font-black italic tracking-tighter">
            <span className="gradient-text">FF</span>
            <span className="text-white">24</span>
          </motion.div>

          {/* Десктоп меню */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="btn-glass-lime">
              Написать в Telegram
            </a>
          </div>

          {/* Мобильный бургер */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden glass p-3 rounded-full"
          >
            <Menu size={28} className="text-white" />
          </button>
        </div>
      </nav>

      {/* Мобильное меню — выходит сверху, более мутное стекло */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 glass-menu pt-20 pb-12 px-6"
          >
            <div className="container relative">
              {/* Крестик закрытия */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-6 right-0 glass p-3 rounded-full"
              >
                <X size={28} className="text-white" />
              </button>

              {/* Логотип в меню */}
              <div className="text-center mb-12">
                <span className="text-5xl font-black italic uppercase tracking-tighter gradient-text">FF24</span>
              </div>

              {/* Ссылки */}
              <div className="flex flex-col items-center gap-10">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-bold uppercase tracking-wide text-white hover:text-accent-lime transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-glass-lime px-16 py-8 text-2xl"
                >
                  Написать в Telegram
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
