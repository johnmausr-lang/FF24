"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Calculator } from "@/components/sections/Calculator";
import { Terminal } from "@/components/sections/Terminal";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-accent-DEFAULT selection:text-black">
      <Navbar />
      <main>
        {/* 1. Живой Hero с орбитами */}
        <Hero />
        
        {/* 2. Bento Grid вместо обычного списка преимуществ */}
        <BentoGrid />
        
        {/* 3. Горизонтальный конвейер вместо вертикального степпера */}
        <ProcessSteps />
        
        {/* 4. Smart Dashboard Calculator */}
        <Calculator />
        
        {/* 5. Terminal (Карта + Форма) */}
        <Terminal />
        
        {/* 6. FAQ (можно оставить стандартным или добавить неона в стили) */}
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
