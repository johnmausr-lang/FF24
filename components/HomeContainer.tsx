"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { LeadForm } from "@/components/sections/LeadForm";
import { Footer } from "@/components/Footer";
import { ParticlesBackground } from "@/components/ParticlesBackground";

export default function HomeContainer() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000); // 3 секунды на прогрузку
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative bg-black min-h-screen">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="logo-3d-wrapper mb-10"
            >
              <Image src="/logo-ff24.png" alt="FF24" width={200} height={80} className="logo-3d h-20 w-auto" />
            </motion.div>
            <div className="w-64 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-[#E0FF64] shadow-[0_0_15px_#E0FF64]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.8 }}
              />
            </div>
            <p className="mt-4 font-mono text-[10px] text-[#E0FF64] uppercase tracking-[0.5em] animate-pulse">Инициализация системы</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={isLoading ? "hidden" : "block"}>
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
          <ParticlesBackground />
        </div>
        <Navbar />
        <div className="relative z-10">
          <Hero />
          <BentoGrid />
          <ProcessSteps />
          <Testimonials />
          <FAQ />
          <section id="связаться"><LeadForm /></section>
          <Footer />
        </div>
      </div>
    </main>
  );
}
