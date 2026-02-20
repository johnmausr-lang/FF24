import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GlobalParticles } from "@/components/GlobalParticles";

// Секции
import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { LeadForm } from "@/components/sections/LeadForm";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";

import { ExitIntentPopup } from "@/components/ExitIntentPopup"; 
import { FloatingTelegramButton } from "@/components/FloatingTelegramButton";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-transparent text-slate-900 dark:text-white selection:bg-lime-300 dark:selection:bg-[#E0FF64] selection:text-black antialiased overflow-x-hidden">
      
      {/* Наши глобальные звезды на фоне всего сайта */}
      <GlobalParticles />

      {/* Навигация */}
      <Navbar />
      
      {/* Контент. Обратите внимание: секции прозрачные, чтобы было видно звезды */}
      <main className="relative z-10 flex flex-col">
        <Hero />
        <BentoGrid />
        
        {/* Конвейер имеет свой плотный фон (z-20 и bg-black), чтобы ПЕРЕКРЫТЬ звезды! */}
        <div className="relative z-20 bg-slate-50 dark:bg-black shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          <ProcessSteps />
        </div>
        
        <section className="relative z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#E0FF64]/30 to-transparent" />
          <LeadForm />
        </section>
        
        <Testimonials />
        <FAQ />
      </main>

      <Footer />

      <FloatingTelegramButton />
      <ExitIntentPopup />
    </div>
  );
}
