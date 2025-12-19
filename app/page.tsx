"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { LeadForm } from "@/components/sections/LeadForm"; // Единая форма
import { FAQ } from "@/components/sections/FAQ";

export default function LandingPage() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-[#E0FF64] selection:text-[#1E1B4B] antialiased">
      <Navbar />
      <main>
        <Hero />
        <BentoGrid />
        <ProcessSteps />
        <LeadForm /> {/* Одна мощная форма */}
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
