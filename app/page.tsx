"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { ContactForm } from "@/components/sections/ContactForm";
import { Footer } from "@/components/Footer";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { usePerformance } from "@/hooks/usePerformance";

export default function Home() {
  const { isLowPower } = usePerformance();

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-accent-lime selection:text-black">
      {/* ГЛОБАЛЬНЫЙ ФОН: Звезды рендерятся один раз.
          Если устройство слабое (isLowPower), звезды отключаются для плавности скролла.
      */}
      {!isLowPower && (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
          <ParticlesBackground />
        </div>
      )}

      {/* Навигация всегда сверху */}
      <Navbar />

      {/* КОНТЕНТ: Все секции имеют bg-transparent.
          Z-10 гарантирует, что кнопки кликабельны поверх звезд.
      */}
      <div className="relative z-10">
        
        {/* Главный экран */}
        <section className="bg-transparent">
          <Hero />
        </section>

        {/* Преимущества с анимированными границами */}
        <section className="bg-transparent border-y border-white/5">
          <BentoGrid />
        </section>

        {/* 3D Процесс работы */}
        <section className="bg-transparent">
          <ProcessSteps />
        </section>

        {/* Отзывы с Яндекс.Виджетом */}
        <section className="bg-transparent border-y border-white/5">
          <Testimonials />
        </section>

        {/* Вопросы-ответы (центр) */}
        <section className="bg-transparent">
          <FAQ />
        </section>

        {/* Форма захвата (Lead) */}
        <section id="lead" className="bg-transparent py-20">
          <ContactForm />
        </section>

      </div>

      {/* Подвал сайта */}
      <Footer />
    </main>
  );
}
