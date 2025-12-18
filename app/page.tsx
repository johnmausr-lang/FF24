"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Секции с улучшениями
import { Hero } from "@/components/sections/Hero"; // с particles
import { BentoGrid } from "@/components/sections/BentoGrid"; // с 3D-tilt
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { LeadForm } from "@/components/sections/LeadForm"; // новый лид-магнит вместо калькулятора
import { Terminal } from "@/components/sections/Terminal";
import { FAQ } from "@/components/sections/FAQ";

export default function LandingPage() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-[#E0FF64] selection:text-[#1E1B4B] antialiased">
      <Navbar />
      <main>
        {/* 1. Hero с частицами и градиентным логотипом */}
        <Hero />
        
        {/* 2. Преимущества с 3D-tilt карточками */}
        <BentoGrid />
        
        {/* 3. Процесс (конвейер) */}
        <ProcessSteps />
        
        {/* 4. Новый блок — персональное предложение (лид-форма) */}
        <LeadForm />
        
        {/* 5. Терминал с картой и формой */}
        <Terminal />
        
        {/* 6. FAQ */}
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
