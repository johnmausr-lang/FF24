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
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Логотип в стеклянной рамке на мобильных */}
        <motion.div className="flex items-center gap-4">
          <div className="glass p-3 rounded-2xl hidden md:block">
            <span className="text-3xl md:text-4xl font-black italic tracking-tighter gradient-text">FF24</span>
          </div>
          <span className="text-3xl md:text-4xl font-black italic tracking-tighter gradient-text md:hidden">FF24</span>
        </motion.div>

        {/* Десктоп меню */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-accent-lime transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glass-primary px-10 py-5 text-lg"
          >
            Написать в Telegram
          </a>
        </div>

        {/* Мобильный бургер */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden glass p-4 rounded-2xl"
        >
          <Menu size={28} className="text-white" />
        </button>
      </div>

      {/* Мобильное центрированное меню */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 glass bg-black/80 backdrop-blur-2xl flex items-center justify-center px-6"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-md p-12 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-6 right-6 text-white/70 hover:text-white"
              >
                <X size={32} />
              </button>

              <div className="mb-12">
                <span className="text-6xl font-black italic uppercase tracking-tighter gradient-text">FF24</span>
              </div>

              <div className="space-y-10">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-3xl font-black uppercase tracking-widest text-white hover:text-accent-lime transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block btn-glass-primary px-16 py-8 text-2xl mt-12"
                >
                  Написать в Telegram
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
