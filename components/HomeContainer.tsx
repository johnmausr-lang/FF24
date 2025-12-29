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

// Ленивая загрузка тяжелой 3D-секции
const ProcessSteps = dynamic(() => import('@/components/sections/ProcessSteps').then(mod => mod.ProcessSteps), {
  ssr: false,
  loading: () => <div className="h-[850px] w-full bg-[#050505]" />,
});

export default function HomeContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Автоматическое скрытие лоадера через 5 секунд (защита от зависаний)
    const timer = setTimeout(() => setIsLoading(false), 5000);

    // Оптимизированный Mouse move listener через requestAnimationFrame
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

    // Подключение Lenis для ultra-smooth scroll
    let lenisRaf: number;
    (async () => {
      const Lenis = (await import('@studio-freight/lenis')).default;
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
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

      {/* Слой звезд с эффектом параллакса */}
      {isMounted && (
        <div className="star-field fixed inset-0 z-0 pointer-events-none opacity-60">
          <ParticlesBackground />
        </div>
      )}

      {/* Контент сайта с принудительным центрированием */}
      <div 
        className={`relative z-10 transition-opacity duration-1000 flex flex-col items-center ${
          isLoading ? "opacity-0 invisible" : "opacity-100 visible"
        }`}
      >
        <Navbar />
        <div className="w-full flex flex-col items-center justify-center space-y-0">
          <Hero />
          <BentoGrid />
          {/* 3D секция загружается лениво */}
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
