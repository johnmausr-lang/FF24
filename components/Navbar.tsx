"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Предполагается наличие shadcn/ui
import { motion } from "framer-motion";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black italic uppercase tracking-tighter group">
          FF24<span className="text-accent-DEFAULT group-hover:text-white transition-colors">.</span>LK
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-muted-foreground">
          <Link href="#services" className="hover:text-accent-DEFAULT transition-colors">Услуги</Link>
          <Link href="#process" className="hover:text-accent-DEFAULT transition-colors">Процесс</Link>
          <Link href="#calculator" className="hover:text-accent-DEFAULT transition-colors">Калькулятор</Link>
        </div>

        <Button 
          variant="outline" 
          className="border-accent-DEFAULT text-accent-DEFAULT hover:bg-accent-DEFAULT hover:text-black rounded-full px-8 font-bold transition-all"
        >
          ВОЙТИ
        </Button>
      </div>
    </nav>
  );
};
