"use client";

import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { ContactForm } from "@/components/sections/ContactForm";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Глобальные звезды на заднем плане */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        <ParticlesBackground />
      </div>

      <Navbar />

      {/* Контент поверх звезд */}
      <div className="relative z-10 w-full">
        <Hero />
        
        <div className="bg-transparent">
          <BentoGrid />
        </div>

        <div className="bg-transparent">
          <ProcessSteps />
        </div>

        <div className="bg-transparent">
          <Testimonials />
        </div>

        <div className="bg-transparent">
          <FAQ />
        </div>

        <div className="bg-transparent" id="lead">
          <ContactForm />
        </div>
      </div>

      <Footer />
    </main>
  );
}
