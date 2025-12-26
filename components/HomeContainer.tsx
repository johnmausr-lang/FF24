"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

// Импорт секций (проверьте, чтобы пути совпадали с вашей структурой)
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
    // Имитация загрузки ресурсов
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
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

      {/* 2. ГЛОБАЛЬНЫЙ ФОН СО ЗВЕЗДАМИ (ФИКСИРОВАННЫЙ) */}
      {/* Мы возвращаем opacity-60 и фиксированное позиционирование, как было изначально */}
      {isMounted && (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
          <ParticlesBackground />
        </div>
      )}

      {/* 3. ОСНОВНОЙ КОНТЕНТ САЙТА */}
      <div 
        className={`relative z-10 transition-opacity duration-1000 ${
          isLoading ? "opacity-0 invisible" : "opacity-100 visible"
        }`}
      >
        <Navbar />
        
        <div className="relative">
          {/* Каждая секция bg-transparent, чтобы звезды были видны сквозь них */}
          <Hero />
          
          <section className="border-y border-white/5 bg-transparent">
            <BentoGrid />
          </section>

          <ProcessSteps />

          <section className="border-y border-white/5 bg-transparent">
            <Testimonials />
          </section>

          <FAQ />
          
          <LeadForm />
          
          <Footer />
        </div>

        {/* Всплывающие элементы */}
        <ExitIntentPopup />
        <FloatingTelegramButton />
      </div>
    </main>
  );
}
