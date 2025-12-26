"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ParticlesBackground } from "./ParticlesBackground";
import { usePerformance } from "@/hooks/usePerformance";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLowPower } = usePerformance();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 backdrop-blur-md bg-black/60">
        <div className="container grid grid-cols-2 md:grid-cols-3 items-center h-20">
          <div className="flex justify-start">
            <img 
              src="/logo-ff24.png" 
              alt="FF24 - Фулфилмент для маркетплейсов" 
              title="FF24 Logo"
              className="h-10 w-auto cursor-pointer object-contain" 
              onClick={() => window.scrollTo({top:0, behavior:'smooth'})} 
            />
          </div>

          <div className="hidden md:flex items-center justify-center gap-10">
            {["Услуги", "Процесс", "Заявка"].map((item) => (
              <a key={item} href={`#${item === "Услуги" ? "benefits" : item === "Процесс" ? "process" : "lead"}`} 
                 title={item}
                 className="text-[10px] uppercase tracking-[0.3em] font-black hover:text-accent-lime transition-all">
                {item}
              </a>
            ))}
          </div>

          <div className="flex justify-end items-center gap-4">
            <a href="https://t.me/manager24ff" target="_blank" className="hidden md:flex btn-glass-lime px-8 py-3 text-xs min-w-[180px] justify-center">
              Консультация
            </a>
            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] bg-black">
            {!isLowPower && <ParticlesBackground />}
            <div className="container h-full flex flex-col p-8 relative z-10">
              <div className="flex justify-end mt-4"><button onClick={() => setMobileMenuOpen(false)}><X size={40} /></button></div>
              <div className="flex flex-col items-center gap-10 mt-20">
                {["Услуги", "Процесс", "Заявка"].map((item) => (
                   <a key={item} href={`#${item === "Услуги" ? "benefits" : item === "Процесс" ? "process" : "lead"}`} 
                      onClick={() => setMobileMenuOpen(false)} 
                      className="text-4xl font-black uppercase italic tracking-tighter">{item}</a>
                ))}
                <a href="https://t.me/manager24ff" target="_blank" className="btn-glass-lime w-full py-6 text-center mt-10">Написать в Telegram</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
