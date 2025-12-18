"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-accent-lime/10 px-6 py-5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Логотип с градиентным переливом */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-black italic tracking-tighter"
        >
          <span className="gradient-text">FF</span>
          <span className="text-accent-lime glow-pulse-lime">24</span>
        </motion.div>
        
        <div className="hidden md:flex gap-10 text-sm font-bold uppercase tracking-widest text-foreground/70">
          <a href="#benefits" className="hover:text-accent-lime transition-colors glow-pulse-lime">Услуги</a>
          <a href="#process" className="hover:text-accent-blue transition-colors">Процесс</a>
          <a href="#calculator" className="hover:text-accent-lime transition-colors glow-pulse-lime">Калькулятор</a>
        </div>

        <Button 
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-accent-lime text-primary-dark hover:bg-white gradient-border-thick shadow-neon-lime glow-pulse-lime rounded-full px-8 py-4 font-black uppercase text-sm tracking-wider"
        >
          Связаться
        </Button>
      </div>
    </nav>
  );
};
