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

// Интерактив и компоненты удержания (Исправленные пути)
import { ExitIntentPopup } from "@/components/ExitIntentPopup"; 
import { LoadingScreen } from "@/components/LoadingScreen";
import { ParticlesBackground } from "@/components/ParticlesBackground";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-accent-lime selection:text-black antialiased overflow-x-hidden">
      
      {/* Экран загрузки */}
      <AnimatePresence mode="wait">
        <LoadingScreen key="loader" />
      </AnimatePresence>

      {/* Глобальный фон Mesh Gradient */}
      <div className="fixed inset-0 z-0 bg-mesh pointer-events-none opacity-40 backdrop-transform" />

      {/* Частицы на фоне */}
      <ParticlesBackground />

      <Navbar />

      <main>
        <Hero />
        <BentoGrid />
        <ProcessSteps />
        
        <section className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-accent-lime/30 to-transparent" />
          <LeadForm />
        </section>
        
        <Testimonials />
        <FAQ />
      </main>

      <Footer />
      <ExitIntentPopup />

      {/* Эффект шума */}
      <div className="fixed inset-0 z-[99] pointer-events-none opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay" />
    </div>
  );
}
