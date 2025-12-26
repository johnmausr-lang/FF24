"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { FloatingTelegramButton } from "@/components/FloatingTelegramButton";

export default function HomeContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Таймер для завершения анимации лоадера
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative bg-black min-h-screen">
      {/* 1. ЭКРАН ЗАГРУЗКИ */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onFinished={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* 2. ФОН СО ЗВЕЗДАМИ (ФИКСИРОВАННЫЙ) */}
      {isMounted && (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
          <ParticlesBackground />
        </div>
      )}

      {/* 3. ОСНОВНОЙ КОНТЕНТ */}
      <div 
        className={`relative z-10 transition-opacity duration-1000 ${
          isLoading ? "opacity-0 invisible" : "opacity-100 visible"
        }`}
      >
        <Navbar />
        
        <div className="relative">
          {/* Секции имеют прозрачный фон, чтобы звезды были видны */}
          <Hero />
          
          <div className="border-y border-white/5 bg-transparent">
            <BentoGrid />
          </div>

          <ProcessSteps />

          <div className="border-y border-white/5 bg-transparent">
            <Testimonials />
          </div>

          <FAQ />
          
          <LeadForm />
          
          <Footer />
        </div>

        <ExitIntentPopup />
        <FloatingTelegramButton />
      </div>
    </main>
  );
}
