"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Calculator } from "@/components/sections/Calculator";
import { Terminal } from "@/components/sections/Terminal";
import { FAQ } from "@/components/sections/FAQ";

export default function LandingPage() {
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const [hasError, setHasError] = useState(false);

  // Функция для записи логов
  const addLog = (msg: string) => {
    console.log(`[FF24-DEBUG] ${msg}`);
    setDebugLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);
  };

  useEffect(() => {
    addLog("Инициализация LandingPage...");
    
    // Проверка наличия критических объектов
    if (typeof window !== "undefined") {
      addLog("Window объект доступен");
      addLog(`User Agent: ${navigator.userAgent}`);
    }

    // Проверка загрузки Tailwind (через проверку вычисленных стилей)
    const testElement = document.createElement("div");
    testElement.className = "hidden bg-black text-white";
    document.body.appendChild(testElement);
    const styles = window.getComputedStyle(testElement);
    addLog(`Проверка Tailwind: bg-black свойство = ${styles.backgroundColor}`);
    document.body.removeChild(testElement);

    const timer = setTimeout(() => addLog("Рендеринг завершен успешно"), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Ловим ошибки рендеринга
  if (hasError) {
    return (
      <div className="bg-red-900 text-white p-10 font-mono">
        <h1>Критическая ошибка приложения</h1>
        <pre>{debugLogs.join('\n')}</pre>
      </div>
    );
  }

  try {
    return (
      <div className="bg-black min-h-screen text-white selection:bg-accent-DEFAULT selection:text-black antialiased">
        <Navbar />
        <main>
          {/* Каждая секция в консоли будет отчитываться о загрузке */}
          <section onMouseEnter={() => console.log("Hero hovered")}>
            <Hero />
          </section>
          
          <BentoGrid />
          <ProcessSteps />
          <Calculator />
          <Terminal />
          <FAQ />
        </main>
        <Footer />

        {/* Скрытый отладочный блок (виден только в коде консоли) */}
        <div id="debug-status" data-logs={JSON.stringify(debugLogs)} style={{display: 'none'}} />
      </div>
    );
  } catch (err: any) {
    console.error("Render Error:", err);
    setHasError(true);
    addLog(`RENDER ERROR: ${err.message}`);
    return null;
  }
}
