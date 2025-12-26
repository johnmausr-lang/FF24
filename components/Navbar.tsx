"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ParticlesBackground } from "./ParticlesBackground";

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
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 backdrop-blur-md bg-black/40">
        <div className="container flex justify-between items-center h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img src="/logo-ff24.png" alt="FF24" className="h-10 w-auto object-contain" />
          </motion.div>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-xs uppercase tracking-widest font-bold hover:text-accent-lime transition-colors">
                {link.label}
              </a>
            ))}
            <a href={TELEGRAM_LINK} target="_blank" className="btn-glass-lime min-w-[180px] text-center py-3">
              Консультация
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={32} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black flex flex-col p-8"
          >
            <ParticlesBackground />
            <div className="flex justify-end relative z-10"><button onClick={() => setMobileMenuOpen(false)}><X size={40} /></button></div>
            <div className="flex flex-col items-center gap-6 mt-20 relative z-10">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-3xl font-black uppercase italic text-white w-full text-center">
                  {link.label}
                </a>
              ))}
              <a href={TELEGRAM_LINK} target="_blank" className="btn-glass-lime w-full max-w-sm text-center py-5 mt-4">
                Написать нам
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
