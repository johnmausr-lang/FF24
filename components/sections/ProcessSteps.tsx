"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  ClipboardList, Truck, HardHat, Factory,
  PackageCheck, Download, CheckCircle2, Package,
} from "lucide-react";
import { GlassVideo } from "@/components/ui/GlassVideo";

const steps = [
  { title: "Заявка", desc: "Регистрация и передача ТЗ", icon: <ClipboardList size={48} /> },
  { title: "Забор", desc: "Забираем товар у поставщика", icon: <Truck size={48} /> },
  { title: "Приёмка", desc: "Сверка и проверка на брак", icon: <HardHat size={48} /> },
  { title: "Маркировка", desc: "Наклейка штрих-кодов по ТЗ", icon: <Factory size={48} /> },
  { title: "Упаковка", desc: "Оптимальная упаковка в короба", icon: <PackageCheck size={48} /> },
  { title: "Отгрузка", desc: "Доставка на склад МП за 24ч", icon: <Download size={48} className="rotate-180" /> },
  { title: "Финиш", desc: "Товар готов к продаже", icon: <CheckCircle2 size={48} /> },
];

export const ProcessSteps = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Ультра-плавная пружина для эффекта конвейера
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40, 
    damping: 25,   
    restDelta: 0.001
  });

  // Рассчитываем сдвиг так, чтобы последняя карточка (7-я) выходила полностью.
  // -85% вместо -70% даст нужный запас.
  const xTransform = useTransform(smoothProgress, [0, 0.9], ["0%", "-85%"]);
  
  // Конвейерная линия
  const cargoX = useTransform(smoothProgress, [0, 1], ["10vw", "90vw"]);

  return (
    <section id="process" ref={targetRef} className="relative h-[600vh] bg-black">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Фоновое свечение */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-accent-lime/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="container relative z-30 mb-8">
          <motion.h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter">
            Конвейер <span className="text-accent-lime">FF24</span>
          </motion.h2>
        </div>

        {/* Направляющая конвейера */}
        <div className="absolute inset-x-0 top-[55%] -translate-y-1/2 z-20 h-px pointer-events-none">
          <div className="absolute inset-x-0 h-[1px] bg-white/5" />
          <motion.div 
            style={{ width: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
            className="absolute left-0 h-[2px] bg-accent-lime shadow-[0_0_25px_#E0FF64]" 
          />
          {/* Улучшенная коробка-груз */}
          <motion.div
            style={{ left: cargoX }}
            className="absolute -top-8 -translate-x-1/2 w-16 h-16 rounded-xl glass bg-accent-lime flex items-center justify-center text-black shadow-[0_0_50px_rgba(224,255,100,0.4)] border-none"
          >
            <Package size={32} className="animate-pulse" />
          </motion.div>
        </div>

        {/* Карточки-платформы */}
        <motion.div style={{ x: xTransform }} className="flex gap-10 px-[15vw] relative z-10 mt-12">
          {steps.map((step, i) => {
            const stepStart = i / steps.length;
            const stepEnd = (i + 1) / steps.length;
            
            const cardScale = useTransform(smoothProgress, [stepStart, (stepStart + stepEnd)/2, stepEnd], [0.9, 1, 0.9]);
            const cardOpacity = useTransform(smoothProgress, [stepStart - 0.1, stepStart, stepEnd, stepEnd + 0.1], [0.4, 1, 1, 0.4]);

            return (
              <motion.div
                key={i}
                style={{ scale: cardScale, opacity: cardOpacity }}
                className="relative min-w-[350px] md:min-w-[500px] h-[450px] rounded-[3rem] p-[2px] overflow-hidden backdrop-transform"
              >
                <GlassVideo src="/videos/process-bg.webm" opacity={0.2} />
                
                <div className="relative h-full w-full bg-white/[0.03] backdrop-blur-[40px] rounded-[3rem] p-12 flex flex-col justify-between border border-white/10 group hover:border-accent-lime/30 transition-colors duration-500">
                  <div className="flex justify-between items-start">
                    <div className="w-24 h-24 rounded-3xl glass bg-white/5 flex items-center justify-center text-accent-lime">
                      {step.icon}
                    </div>
                    <span className="text-8xl font-black italic opacity-5 tracking-tighter">0{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-4xl font-black italic uppercase mb-4">{step.title}</h3>
                    <p className="text-white/40 text-lg uppercase tracking-tight leading-tight">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
