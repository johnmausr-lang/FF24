"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Calculator } from "@/components/sections/Calculator";
import { MapSection } from "@/components/sections/MapSection";
import { Footer } from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
        <Process />
        <Calculator />
        <MapSection />
      </main>
      <Footer />
    </div>
  );
}
