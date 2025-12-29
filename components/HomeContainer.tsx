"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Импорт компонентов (убедись, что пути верны)
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { LeadForm } from "@/components/sections/LeadForm";
import { Footer } from "@/components/Footer";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function HomeContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // 1. Логика отслеживания мыши для параллакса звезд
  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      // Передаем координаты в CSS переменные
      document.documentElement.style.setProperty('--mouse-x', x.toString());
      document.documentElement.style.setProperty('--mouse-y', y.toString());
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-screen bg-transparent select-none">
      {/* ЭКРАН ЗАГРУЗКИ (с исправленным типом onFinished) */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onFinished={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* ФОН: Звезды с эффектом параллакса через CSS */}
      {isMounted && (
        <div className="star-field fixed inset-0 z-0 pointer-events-none opacity-60">
          <ParticlesBackground />
        </div>
      )}

      {/* ОСНОВНОЙ КОНТЕНТ: Строго по центру */}
      <div 
        className={`relative z-10 flex flex-col items-center transition-opacity duration-1000 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navbar />
        
        {/* Каждая секция bg-transparent, чтобы звезды были видны */}
        <div className="w-full space-y-0 bg-transparent flex flex-col items-center justify-center">
          <Hero />
          
          <section className="w-full border-y border-white/5 bg-transparent">
            <BentoGrid />
          </section>

          <ProcessSteps />

          <section className="w-full border-y border-white/5 bg-transparent">
            <Testimonials />
          </section>

          <FAQ />
          
          <LeadForm />
          
          <Footer />
        </div>
      </div>
    </main>
  );
}
