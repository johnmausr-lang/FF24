import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Секции
import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { LeadForm } from "@/components/sections/LeadForm";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";

// Интерактив (эти компоненты внутри себя имеют 'use client')
import { ExitIntentPopup } from "@/components/ExitIntentPopup"; 
import { FloatingTelegramButton } from "@/components/FloatingTelegramButton";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#E0FF64] selection:text-black antialiased overflow-x-hidden">
      
      {/* Глобальный фон Mesh Gradient: зафиксирован, чтобы просвечивать сквозь стекло */}
      <div className="fixed inset-0 z-0 bg-mesh pointer-events-none opacity-40 backdrop-transform" />

      {/* Навигация с новым бейджем */}
      <Navbar />
      
      {/* Основной контент (Server-Side Rendered для SEO) */}
      <main className="relative z-10 flex flex-col">
        <Hero />
        <BentoGrid />
        <ProcessSteps />
        
        <section className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#E0FF64]/30 to-transparent" />
          <LeadForm />
        </section>
        
        <Testimonials />
        <FAQ />
      </main>

      <Footer />

      {/* Клиентские компоненты интерактива */}
      <FloatingTelegramButton />
      <ExitIntentPopup />
      
      {/* Нижнее фоновое свечение */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#E0FF64]/5 to-transparent pointer-events-none z-0" />
    </div>
  );
}
