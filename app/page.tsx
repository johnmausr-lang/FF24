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
    <div className="relative min-h-screen bg-black text-white selection:bg-accent-lime selection:text-black antialiased">
      
      {/* Световая подложка (Mesh Gradient) */}
      <div className="fixed inset-0 z-0 bg-mesh pointer-events-none" />

      {/* Навигация поверх всего */}
      <Navbar />
      
      {/* Контентная часть */}
      <main className="relative z-10">
        {/* Главный экран */}
        <Hero />
        
        {/* Сетка преимуществ с карточками-стеклом */}
        <BentoGrid />
        
        {/* Горизонтальный процесс со световыми акцентами */}
        <ProcessSteps />
        
        {/* Форма захвата (Терминал/Стекло) */}
        <LeadForm />
        
        {/* Социальное доказательство */}
        <Testimonials />
        
        {/* Ответы на вопросы */}
        <FAQ />
      </main>

      {/* Футер */}
      <Footer />

      {/* Плавающие интерактивные элементы */}
      <FloatingTelegramButton />
      <ExitIntentPopup />
    </div>
  );
}
