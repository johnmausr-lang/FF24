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
      {/* Добавили backdrop-blur-md для корректного наслоения */}
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 backdrop-blur-md bg-black/20">
        <div className="container flex justify-between items-center h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-black italic tracking-tighter cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="gradient-text transition-all duration-300 group-hover:brightness-125">FF</span>
            <span className="text-white">24</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className="btn-glass-secondary !py-2 !px-5 !text-[10px] tracking-widest border-white/5 hover:border-white/20"
              >
                {link.label}
              </a>
            ))}
            <a 
              href={TELEGRAM_LINK} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-glass-lime !py-2.5 !px-6 !text-[10px]"
            >
              Написать в Telegram
            </a>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(true)} 
            className="md:hidden glass p-3 rounded-full hover:border-accent-lime transition-colors"
          >
            <Menu size={24} className="text-white" />
          </button>
        </div>
      </nav>

      {/* Мобильное меню */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-2xl flex flex-col justify-center px-6"
          >
            <div className="container relative h-full flex flex-col justify-center">
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="absolute top-8 right-6 glass p-4 rounded-full border-white/20"
              >
                <X size={32} className="text-white" />
              </button>

              <div className="text-center mb-16">
                <span className="text-6xl font-black italic uppercase tracking-tighter gradient-text">FF24</span>
              </div>

              <div className="flex flex-col items-center gap-4">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-glass-secondary w-full max-w-sm text-base py-5 border-white/10"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-glass-lime w-full max-w-sm text-base py-5"
                >
                  Написать в Telegram
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
