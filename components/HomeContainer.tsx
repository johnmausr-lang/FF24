"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
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
    
    // Передача координат мыши в CSS переменные
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      document.documentElement.style.setProperty('--mouse-x', x.toString());
      document.documentElement.style.setProperty('--mouse-y', y.toString());
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-screen bg-transparent">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onFinished={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Звезды со смещением от мыши */}
      {isMounted && (
        <div className="star-field fixed inset-0 z-0 pointer-events-none opacity-60">
          <ParticlesBackground />
        </div>
      )}

      <div className={`relative z-10 transition-opacity duration-1000 flex flex-col items-center ${isLoading ? "opacity-0 invisible" : "opacity-100 visible"}`}>
        <Navbar />
        <div className="w-full flex flex-col items-center">
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
