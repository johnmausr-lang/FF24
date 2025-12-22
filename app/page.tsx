"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Основные секции
import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { LeadForm } from "@/components/sections/LeadForm";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";

// Интерактивные элементы
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { FloatingTelegramButton } from "@/components/FloatingTelegramButton";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-accent-lime selection:text-black antialiased">
      
      {/* Экран загрузки с анимацией выхода */}
      <AnimatePresence mode="wait">
        <LoadingScreen key="loader" />
      </AnimatePresence>

      {/* Глобальная световая подложка (Mesh Gradient).
          Она зафиксирована (fixed), чтобы создать эффект глубины при скролле.
      */}
      <div className="fixed inset-0 z-0 bg-mesh pointer-events-none opacity-60" />

      {/* Навигация (z-index выше основного контента) */}
      <Navbar />
      
      {/* Основной контентный слой */}
      <main className="relative z-10 flex flex-col">
        {/* Главный экран с видео-стеклом */}
        <Hero />
        
        {/* Преимущества в стиле Bento */}
        <BentoGrid />
        
        {/* Горизонтальный скролл этапов */}
        <ProcessSteps />
        
        {/* Секция с формой, усиленная видео-подложкой */}
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-accent-lime/30 to-transparent" />
          <LeadForm />
        </div>
        
        {/* Социальное доказательство */}
        <Testimonials />
        
        {/* Ответы на вопросы */}
        <FAQ />
      </main>

      {/* Подвал сайта */}
      <Footer />

      {/* Плавающие элементы интерфейса */}
      <FloatingTelegramButton />
      <ExitIntentPopup />
    </div>
  );
}
