"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-black italic tracking-tighter">
          FF<span className="text-accent-DEFAULT">24</span>
        </div>
        
        <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <a href="#benefits" className="hover:text-accent-DEFAULT transition-colors">Услуги</a>
          <a href="#process" className="hover:text-accent-DEFAULT transition-colors">Процесс</a>
          <a href="#calculator" className="hover:text-accent-DEFAULT transition-colors">Калькулятор</a>
        </div>

        <Button 
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-accent-DEFAULT text-black hover:bg-white rounded-full px-6 font-bold uppercase text-[10px]"
        >
          Связаться
        </Button>
      </div>
    </nav>
  );
};
