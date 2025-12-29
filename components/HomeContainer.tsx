"use client";

import { useState, useEffect, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import dynamic from 'next/dynamic';

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { LeadForm } from "@/components/sections/LeadForm";
import { Footer } from "@/components/Footer";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { LoadingScreen } from "@/components/LoadingScreen";

// Ленивая загрузка тяжелой 3D-секции для оптимизации
const ProcessSteps = dynamic(() => import('@/components/sections/ProcessSteps').then(mod => mod.ProcessSteps), {
  ssr: false,
  loading: () => <div className="h-[850px] w-full bg-[#050505]" />,
});

export default function HomeContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Автоматический таймаут для скрытия загрузочного экрана
    const timer = setTimeout(() => setIsLoading(false), 5000);

    // Оптимизированный слушатель движения мыши
    let raf: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        document.documentElement.style.setProperty('--mouse-x', x.toString());
        document.documentElement.style.setProperty('--mouse-y', y.toString());
      });
    };

    // Подключение Lenis для ультра-плавного скролла
    let lenisRaf: number;
    (async () => {
      const Lenis = (await import('lenis')).default; // Обновленный импорт
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function scrollRaf(time: number) {
        lenis.raf(time);
        lenisRaf = requestAnimationFrame(scrollRaf);
      }
      lenisRaf = requestAnimationFrame(scrollRaf);
    })();

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(lenisRaf);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-transparent overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onFinished={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Интерактивный фон со звездами и параллаксом */}
      {isMounted && (
        <div className="star-field fixed inset-0 z-0 pointer-events-none opacity-60">
          <ParticlesBackground />
        </div>
      )}

      {/* Основной контент сайта */}
      <div 
        className={`relative z-10 transition-opacity duration-1000 flex flex-col items-center ${
          isLoading ? "opacity-0 invisible" : "opacity-100 visible"
        }`}
      >
        <Navbar />
        <div className="w-full flex flex-col items-center justify-center space-y-0">
          <Hero />
          <BentoGrid />
          <ProcessSteps />
          <Testimonials />
          <FAQ />
          <LeadForm />
          <Footer />
        </div>
      </div>
    </main>
  );
}
