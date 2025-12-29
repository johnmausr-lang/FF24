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

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-accent-lime selection:text-black antialiased overflow-x-hidden">
      
      {/* Глобальный фон Mesh Gradient: зафиксирован, чтобы просвечивать сквозь стекло секций */}
      <div className="fixed inset-0 z-0 bg-mesh pointer-events-none opacity-40 backdrop-transform" />

      {/* Навигация: всегда поверх контента */}
      <Navbar />

      <main className="relative z-10">
        {/* Главный экран */}
        <Hero />
        
        {/* Сетка преимуществ (Bento) */}
        <BentoGrid />
        
        {/* Обновленный промышленный конвейер (7 этапов) */}
        <ProcessSteps />
        
        {/* Секция формы с декоративным разделителем-градиентом */}
        <section className="relative">
          {/* Тонкая неоновая линия сверху для отделения от конвейера */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-accent-lime/30 to-transparent" />
          <LeadForm />
        </section>
        
        {/* Социальное доказательство: отзывы с видео-подложкой */}
        <Testimonials />
        
        {/* FAQ: раскрывающиеся ответы на фоне динамического видео */}
        <FAQ />
      </main>

      {/* Футер со стеклянным эффектом и навигацией */}
      <Footer />

      {/* Эффект аналогового шума для прибавления текстурности и премиальности */}
      <div className="fixed inset-0 z-[99] pointer-events-none opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay" />
      
      {/* Нижнее свечение (визуальный якорь) */}
      <div className="fixed bottom-0 left-0 w-full h-64 bg-gradient-to-t from-accent-lime/5 to-transparent pointer-events-none z-0" />
    </div>
  );
}
