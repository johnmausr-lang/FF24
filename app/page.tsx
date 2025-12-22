"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Секции
import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { LeadForm } from "@/components/sections/LeadForm";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";

// Интерактив
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { FloatingTelegramButton } from "@/components/FloatingTelegramButton";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-accent-lime selection:text-black antialiased">
      
      {/* Экран загрузки */}
      <AnimatePresence mode="wait">
        <LoadingScreen key="loader" />
      </AnimatePresence>

      {/* Глобальный фон Mesh Gradient */}
      <div className="fixed inset-0 z-0 bg-mesh pointer-events-none opacity-50" />

      {/* Навигация */}
      <Navbar />
      
      {/* Основной контент */}
      <main className="relative z-10 flex flex-col">
        <Hero />
        
        <BentoGrid />
        
        <ProcessSteps />
        
        <div className="relative">
          {/* Декоративная линия разделения */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-accent-lime/30 to-transparent" />
          <LeadForm />
        </div>
        
        <Testimonials />
        
        <FAQ />
      </main>

      <Footer />

      {/* Плавающие кнопки и попапы */}
      <FloatingTelegramButton />
      <ExitIntentPopup />
    </div>
  );
}
