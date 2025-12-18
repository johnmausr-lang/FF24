"use client";

import { motion } from "framer-motion";

// Импорты согласно вашей структуре в GitHub
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
    <div className="bg-black min-h-screen text-white selection:bg-accent-DEFAULT selection:text-black antialiased">
      <Navbar />

      <main>
        <Hero />
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <BentoGrid />
        </motion.div>

        <ProcessSteps />

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Calculator />
        </motion.div>

        <Terminal />
        
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
