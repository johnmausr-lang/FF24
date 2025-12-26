"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
// Импорты общих компонентов
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { FloatingTelegramButton } from "@/components/FloatingTelegramButton";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";

// ИСПРАВЛЕНО: Пути к секциям (добавлено /sections/)
import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { LeadForm } from "@/components/sections/LeadForm";

export default function HomeContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onFinished={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-1000"}>
        {isMounted && (
          <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
            <ParticlesBackground />
          </div>
        )}
        
        <Navbar />
        
        <div className="relative z-10">
          <Hero />
          <BentoGrid />
          <ProcessSteps />
          <Testimonials />
          <FAQ />
          <LeadForm />
          <Footer />
        </div>
        
        <ExitIntentPopup />
        <FloatingTelegramButton />
      </div>
    </main>
  );
}
