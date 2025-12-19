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
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav px-6 py-5">
      <div className="container flex justify-between items-center">
        <motion.div className="text-3xl md:text-4xl font-black italic tracking-tighter">
          <span className="gradient-text">FF</span>
          <span className="text-white">24</span>
        </motion.div>

        {/* Десктоп меню — ссылки в стеклянной рамке */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="btn-glass px-6 py-3 text-sm"
            >
              {link.label}
            </a>
          ))}
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glass-lime px-10 py-4 text-base"
          >
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

      {/* Мобильное меню — как в ТЗ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 z-50 glass-menu pt-20 pb-12 px-6"
          >
            <div className="container relative">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-6 right-0 glass p-3 rounded-full"
              >
                <X size={28} className="text-white" />
              </button>

              <div className="text-center mb-12">
                <span className="text-5xl font-black italic uppercase tracking-tighter gradient-text">FF24</span>
              </div>

              <div className="flex flex-col items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-glass px-12 py-6 text-2xl w-full max-w-sm text-center"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-glass-lime px-16 py-8 text-2xl w-full max-w-sm"
                >
                  Написать в Telegram
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
