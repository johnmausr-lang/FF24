"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Calculator } from "@/components/sections/Calculator";
import { Terminal } from "@/components/sections/Terminal";
import { FAQ } from "@/components/sections/FAQ";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки всех ресурсов
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <div className="bg-black min-h-screen text-white selection:bg-accent-DEFAULT selection:text-black antialiased">
        <Navbar />
        <main>
          <Hero />
          <BentoGrid />
          <ProcessSteps />
          <Calculator />
          <Terminal />
          <FAQ />
        </main>
        <Footer />
      </div>
    </>
  );
}
