"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Calculator } from "@/components/sections/Calculator";
import { MapSection } from "@/components/sections/MapSection";
import { FAQ } from "@/components/sections/FAQ";
import { ContactForm } from "@/components/sections/ContactForm";
import { Footer } from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-accent-DEFAULT selection:text-black">
      <Navbar />
      <main className="flex-grow">
        {/* 4.1 Hero */}
        <Hero />
        
        {/* 4.3 Услуги (Accordion) */}
        <Services />
        
        {/* 4.4 Процесс работы (Stepper) */}
        <Process />
        
        {/* 4.6 Калькулятор (Key Block) */}
        <Calculator />
        
        {/* 4.8 Карта и склад */}
        <MapSection />
        
        {/* 4.10 FAQ */}
        <FAQ />
        
        {/* 4.11 Финальный CTA + Форма */}
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
