"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Calculator } from "@/components/sections/Calculator";
import { Terminal } from "@/components/sections/Terminal";
import { FAQ } from "@/components/sections/FAQ";

export default function LandingPage() {
  return (
    <div className="bg-black min-h-screen text-white">
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
  );
}
