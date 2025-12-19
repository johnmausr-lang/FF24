"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Секции лендинга
import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { LeadForm } from "@/components/sections/LeadForm";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";

// Вспомогательные компоненты
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { FloatingTelegramButton } from "@/components/FloatingTelegramButton";

export default function LandingPage() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-accent-lime selection:text-black antialiased">
      {/* Навигация фиксирована сверху */}
      <Navbar />
      
      <main>
        {/* Первый экран с частицами */}
        <Hero />
        
        {/* Сетка преимуществ */}
        <BentoGrid />
        
        {/* Горизонтальный скролл этапов работы */}
        <ProcessSteps />
        
        {/* Блок призыва к действию (Форма) */}
        <LeadForm />
        
        {/* Социальное доказательство (Отзывы) */}
        <Testimonials />
        
        {/* Ответы на вопросы */}
        <FAQ />
      </main>

      {/* Подвал */}
      <Footer />

      {/* Глобальные интерактивные элементы */}
      <FloatingTelegramButton />
      <ExitIntentPopup />
    </div>
  );
}
