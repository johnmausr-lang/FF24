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

// Интерактив и компоненты удержания
import { ExitIntentPopup } from "@/components/sections/ExitIntentPopup";
import { FloatingTelegramButton } from "@/components/FloatingTelegramButton";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-accent-lime selection:text-black antialiased overflow-x-hidden">
      
      {/* Экран загрузки: блокирует скролл до завершения анимации */}
      <AnimatePresence mode="wait">
        <LoadingScreen key="loader" />
      </AnimatePresence>

      {/* Глобальный фон Mesh Gradient: зафиксирован, чтобы просвечивать сквозь стекло секций */}
      <div className="fixed inset-0 z-0 bg-mesh pointer-events-none opacity-40 backdrop-transform" />

      {/* Навигация: всегда поверх контента */}
      <Navbar />
      
      {/* Основной контент */}
      <main className="relative z-10 flex flex-col">
        {/* Главный экран */}
        <Hero />
        
        {/* Преимущества */}
        <BentoGrid />
        
        {/* Промышленный конвейер (Обновленный) */}
        <ProcessSteps />
        
        {/* Форма захвата с визуальным разделителем */}
        <section className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-accent-lime/30 to-transparent" />
          <LeadForm />
        </section>
        
        {/* Отзывы с видео-фонами */}
        <Testimonials />
        
        {/* FAQ с видео-подложкой */}
        <FAQ />
      </main>

      {/* Подвал сайта */}
      <Footer />

      {/* Виджеты обратной связи и удержания */}
      <FloatingTelegramButton />
      
      {/* Попап с видео-фоном, срабатывает при попытке закрыть вкладку */}
      <ExitIntentPopup />

      {/* Глобальный шум для текстуры (опционально для премиальности) */}
      <div className="fixed inset-0 z-[99] pointer-events-none opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay" />
    </div>
  );
}
