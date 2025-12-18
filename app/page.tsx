"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
// Импорты из папки sections
import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Calculator } from "@/components/sections/Calculator";
import { Terminal } from "@/components/sections/Terminal";
import { FAQ } from "@/components/sections/FAQ";

export default function LandingPage() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-accent-DEFAULT selection:text-black antialiased">
      <Navbar />
      <main>
        {/* 1. Главный экран */}
        <Hero />
        
        {/* 2. Сетка преимуществ */}
        <BentoGrid />
        
        {/* 3. Процесс (Конвейер) */}
        <ProcessSteps />
        
        {/* 4. Калькулятор стоимости */}
        <Calculator />
        
        {/* 5. Терминал (Карта + Форма) */}
        <Terminal />
        
        {/* 6. FAQ */}
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
