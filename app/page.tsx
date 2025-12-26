"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { LeadForm } from "@/components/sections/LeadForm";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { ExitIntentPopup } from "@/components/ExitIntentPopup"; 
import { FloatingTelegramButton } from "@/components/FloatingTelegramButton";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-accent-lime selection:text-black antialiased overflow-x-hidden">
      <AnimatePresence mode="wait">
        <LoadingScreen key="loader" />
      </AnimatePresence>

      <Navbar />

      <main>
        {/* ФОН И СТАРТОВАЯ СТРАНИЦА */}
        <section className="relative">
           {/* Сетка и звезды только здесь */}
           <div className="fixed inset-0 z-0 bg-mesh pointer-events-none opacity-40" />
           <Hero />
        </section>
        
        {/* ОСТАЛЬНЫЕ СЕКЦИИ БЕЗ ГЛОБАЛЬНОГО ФОНА */}
        <div className="relative z-10 bg-black">
          <BentoGrid />
          <ProcessSteps />
          <section className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-accent-lime/30 to-transparent" />
            <LeadForm />
          </section>
          <Testimonials />
          <FAQ />
        </div>
      </main>

      <Footer />
      <FloatingTelegramButton />
      <ExitIntentPopup />

      {/* Шум оставляем, он дает текстуру кнопкам и элементам */}
      <div className="fixed inset-0 z-[99] pointer-events-none opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay" />
    </div>
  );
}
