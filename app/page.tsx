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

// Интерактивные компоненты UI (Проверьте, что они лежат в src/components/ui/ или components/ui/)
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup"; 
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-accent-lime selection:text-black antialiased overflow-x-hidden">
      <LoadingScreen />
      
      {/* Глобальный фон */}
      <div className="fixed inset-0 z-0 bg-mesh pointer-events-none opacity-40" />
      <ParticlesBackground />

      <Navbar />

      <main>
        <Hero />
        <BentoGrid />
        <ProcessSteps />
        <LeadForm />
        <Testimonials />
        <FAQ />
      </main>

      <Footer />
      <ExitIntentPopup />

      {/* Эффект шума */}
      <div className="fixed inset-0 z-[99] pointer-events-none opacity-[0.02] bg-[url('/noise.png')] mix-blend-overlay" />
    </div>
  );
}
