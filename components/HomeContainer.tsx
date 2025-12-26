"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

// Импорты компонентов
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { LeadForm } from "@/components/sections/LeadForm";
import { Footer } from "@/components/Footer";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function HomeContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onFinished={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* ЗВЕЗДЫ: Теперь они всегда на фоне и имеют z-index -1 */}
      {isMounted && (
        <div className="fixed inset-0 z-[-1] pointer-events-none opacity-80">
          <ParticlesBackground />
        </div>
      )}

      <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-1000"}>
        <Navbar />
        
        {/* Все секции теперь bg-transparent, чтобы звезды просвечивали */}
        <div className="relative z-10 bg-transparent">
          <Hero />
          <BentoGrid />
          <ProcessSteps />
          <Testimonials />
          <FAQ />
          <LeadForm />
          <Footer />
        </div>
      </div>
    </main>
  );
}
