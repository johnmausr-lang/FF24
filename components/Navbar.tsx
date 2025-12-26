"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/50 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* ЛОГОТИП: Только буквы, никакого фона */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <span className="text-3xl font-[900] italic tracking-tighter text-white">
              FF<span className="text-accent-lime drop-shadow-[0_0_10px_rgba(224,255,100,0.4)]">24</span>
            </span>
            <div className="h-5 w-[2px] bg-accent-lime/30 rotate-[20deg] mx-3" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/90 leading-none">
                Fulfillment
              </span>
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-accent-lime/60 mt-1">
                Logistics Solutions
              </span>
            </div>
          </motion.div>
        </Link>

        {/* Меню */}
        <div className="hidden md:flex items-center gap-8">
          {["Процесс", "Услуги", "FAQ"].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-accent-lime transition-colors"
            >
              {item}
            </Link>
          ))}
          <Link 
            href="#lead"
            className="px-6 py-2 bg-accent-lime text-black text-xs font-[900] uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
          >
            Связаться
          </Link>
        </div>
      </div>
    </nav>
  );
};
