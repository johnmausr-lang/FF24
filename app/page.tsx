"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { LeadForm } from "@/components/sections/LeadForm";
import { Footer } from "@/components/Footer";
import { ParticlesBackground } from "@/components/ParticlesBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-accent-lime selection:text-black">
      {/* ГЛОБАЛЬНЫЙ ФОН: 
        Звезды рендерятся один раз и зафиксированы на весь экран.
        pointer-events-none нужен, чтобы фон не перехватывал клики по кнопкам.
      */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        <ParticlesBackground />
      </div>

      {/* Навигация поверх фона */}
      <Navbar />

      {/* ОСНОВНОЙ КОНТЕНТ:
        Все секции имеют bg-transparent, чтобы через них были видны звезды.
        z-10 гарантирует, что контент находится выше фоновых звезд.
      */}
      <div className="relative z-10 w-full">
        
        {/* Главный экран */}
        <section className="bg-transparent">
          <Hero />
        </section>

        {/* Сетка преимуществ */}
        <section className="bg-transparent border-y border-white/5">
          <BentoGrid />
        </section>

        {/* 3D Конвейер с карточками (ProcessSteps) */}
        <section className="bg-transparent">
          <ProcessSteps />
        </section>

        {/* Секция отзывов */}
        <section className="bg-transparent border-y border-white/5">
          <Testimonials />
        </section>

        {/* Вопросы и ответы */}
        <section className="bg-transparent">
          <FAQ />
        </section>

        {/* Форма захвата лидов:
          Используем исправленный импорт LeadForm.tsx
        */}
        <section id="lead" className="bg-transparent py-20">
          <LeadForm />
        </section>

      </div>

      {/* Футер сайта */}
      <Footer />
    </main>
  );
}
