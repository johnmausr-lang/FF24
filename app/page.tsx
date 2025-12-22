"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Секции
import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { LeadForm } from "@/components/sections/LeadForm";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";

// Интерактивы
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { FloatingTelegramButton } from "@/components/FloatingTelegramButton";
import { LoadingScreen } from "@/components/LoadingScreen";
import { AnimatePresence } from "framer-motion";

export default function LandingPage() {
  return (
    <>
      <LoadingScreen />
      
      <div className="relative min-h-screen bg-black text-white selection:bg-accent-lime selection:text-black antialiased">
        
        {/* Глобальный фоновый свет (Mesh) */}
        <div className="fixed inset-0 z-0 bg-mesh pointer-events-none opacity-50" />

        <Navbar />
        
        <main className="relative z-10">
          {/* Каждая секция теперь может содержать свое видео внутри */}
          <Hero />
          
          <BentoGrid />
          
          <ProcessSteps />
          
          <div className="relative">
             {/* Дополнительный световой акцент между секциями */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent-lime/20 to-transparent" />
             <LeadForm />
          </div>
          
          <Testimonials />
          
          <FAQ />
        </main>

        <Footer />

        {/* Слой 100+ для поп-апов и плавающих кнопок */}
        <FloatingTelegramButton />
        <ExitIntentPopup />
      </div>
    </>
  );
}
