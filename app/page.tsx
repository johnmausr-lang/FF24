"use client";

import { motion } from "framer-motion";

// Импорты по Варианту Б (все компоненты в одной папке /components/)
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { BentoGrid } from "@/components/BentoGrid";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Calculator } from "@/components/Calculator";
import { Terminal } from "@/components/Terminal";
import { FAQ } from "@/components/FAQ";

export default function LandingPage() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-accent-DEFAULT selection:text-black antialiased">
      {/* 1. Навигация */}
      <Navbar />

      <main>
        {/* 2. Главный экран: Кинетический Hero */}
        <section id="hero">
          <Hero />
        </section>

        {/* 3. Преимущества: Bento Grid интерфейс */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          id="benefits"
        >
          <BentoGrid />
        </motion.section>

        {/* 4. Процесс работы: Горизонтальный конвейер */}
        <section id="process">
          <ProcessSteps />
        </section>

        {/* 5. Расчет стоимости: Smart Dashboard Calculator */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          id="calculator"
        >
          <Calculator />
        </motion.section>

        {/* 6. Карта и связь: Логистический Терминал */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          id="contact"
        >
          <Terminal />
        </motion.section>

        {/* 7. Ответы на вопросы */}
        <section id="faq">
          <FAQ />
        </section>
      </main>

      {/* 8. Подвал */}
      <Footer />
    </div>
  );
}
