"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BentoGrid } from "@/components/BentoGrid";
import { ProcessSteps } from "@/components/ProcessSteps";
import { GlassVideo } from "@/components/GlassVideo";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { LeadForm } from "@/components/LeadForm";
import { Footer } from "@/components/Footer";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { FloatingTelegramButton } from "@/components/FloatingTelegramButton";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function HomeContainer() {
  // Состояние загрузки. Начальное значение true.
  const [isLoading, setIsLoading] = useState(true);
  // Состояние для отложенного рендеринга тяжелого контента
  const [isContentMounted, setIsContentMounted] = useState(false);

  useEffect(() => {
    // Сразу после монтирования на клиенте начинаем грузить тяжелый контент в фоне
    setIsContentMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      {/* 1. Экран загрузки. Показывается поверх всего */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onFinished={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* 2. Основной контент сайта */}
      {/* Рендерим его сразу, но скрываем под лоадером, чтобы 3D начало инициализироваться */}
      <div className={isLoading ? "opacity-0 pointer-events-none fixed inset-0" : "opacity-100 transition-opacity duration-1000"}>
         {/* Фоновые частицы рендерим только на клиенте во избежание ошибок гидратации */}
        {isContentMounted && <ParticlesBackground />}
        
        <Navbar />
        <Hero />
        <BentoGrid />
        {/* Самый тяжелый компонент. Он начнет грузить модель, пока висит лоадер */}
        {isContentMounted && <ProcessSteps />}
        <GlassVideo />
        <Testimonials />
        <FAQ />
        <LeadForm />
        <Footer />
        
        <ExitIntentPopup />
        <FloatingTelegramButton />
      </div>
    </main>
  );
}
