"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ParticlesBackground } from "./ParticlesBackground";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 backdrop-blur-md bg-black/40">
        <div className="container flex justify-between items-center h-20">
          <div className="flex-1 flex justify-start">
            <img src="/logo-ff24.png" alt="FF24" className="h-10 w-auto cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})} />
          </div>

          <div className="hidden md:flex items-center justify-center gap-12 flex-1">
            {["Услуги", "Процесс", "Заявка"].map((item) => (
              <a key={item} href={`#${item === "Услуги" ? "benefits" : item === "Процесс" ? "process" : "lead"}`} 
                 className="text-xs uppercase tracking-widest font-bold hover:text-accent-lime transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex flex-1 justify-end">
            <a href={TELEGRAM_LINK} target="_blank" className="btn-glass-lime w-[200px] text-center py-3 text-sm">
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] bg-black">
            <ParticlesBackground />
            <div className="container h-full flex flex-col p-8 relative z-10">
              <div className="flex justify-end"><button onClick={() => setMobileMenuOpen(false)}><X size={40} /></button></div>
              <div className="flex flex-col items-center gap-8 mt-20">
                <a href="#benefits" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-black uppercase italic">Услуги</a>
                <a href="#process" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-black uppercase italic">Процесс</a>
                <a href="#lead" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-black uppercase italic">Заявка</a>
                <a href={TELEGRAM_LINK} target="_blank" className="btn-glass-lime w-full max-w-sm text-center py-5 mt-10">Написать нам</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
