"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  ClipboardList,
  Truck,
  HardHat,
  Factory,
  PackageCheck,
  Download,
  CheckCircle2,
  Package,
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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  const xTransform = useTransform(smoothProgress, [0, 1], ["0%", "-70%"]);
  const cargoX = useTransform(smoothProgress, [0, 1], ["5vw", "95vw"]);
  const cargoOpacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <section id="process" ref={targetRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-accent-lime/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="container relative z-30 mb-12">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-none"
          >
            Цикл <span className="text-accent-lime italic">FF24</span>
          </motion.h2>
        </div>

        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 h-px pointer-events-none">
          <div className="absolute inset-x-0 h-[1px] bg-white/10" />
          <motion.div 
            style={{ width: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
            className="absolute left-0 h-[2px] bg-accent-lime shadow-[0_0_20px_#E0FF64]" 
          />
          <motion.div
            style={{ left: cargoX, opacity: cargoOpacity }}
            className="absolute -top-6 -translate-x-1/2 w-12 h-12 rounded-2xl glass bg-accent-lime flex items-center justify-center text-black shadow-[0_0_40px_rgba(224,255,100,0.6)] border-none"
          >
            <Package size={24} className="animate-bounce" />
          </motion.div>
        </div>

        <motion.div style={{ x: xTransform }} className="flex gap-12 px-[10vw] relative z-10 mt-20">
          {steps.map((step, i) => {
            const stepStart = i / steps.length;
            const stepEnd = (i + 1) / steps.length;
            
            const cardScale = useTransform(smoothProgress, [stepStart, (stepStart + stepEnd) / 2, stepEnd], [0.95, 1.05, 0.95]);
            const cardBrightness = useTransform(smoothProgress, [stepStart, (stepStart + stepEnd) / 2, stepEnd], [0.5, 1.2, 0.5]);
            const borderOpacity = useTransform(smoothProgress, [stepStart, (stepStart + stepEnd) / 2, stepEnd], [0.1, 1, 0.1]);

            return (
              <motion.div
                key={i}
                style={{ 
                  scale: cardScale, 
                  filter: useTransform(cardBrightness, (v) => `brightness(${v})`) 
                }}
                className="relative min-w-[320px] md:min-w-[450px] h-[400px] rounded-[3rem] p-[2px] overflow-hidden group backdrop-transform"
              >
                <GlassVideo 
                  src="/videos/process-bg.webm" 
                  opacity={0.3} 
                  blur="blur-[40px]" 
                  overlayColor="bg-black/40"
                  playbackRate={0.5}
                />
                <motion.div 
                  style={{ opacity: borderOpacity }}
                  className="absolute inset-0 bg-gradient-to-r from-accent-lime/50 via-white/20 to-accent-lime/50" 
                />
                <div className="relative h-full w-full bg-white/[0.03] backdrop-blur-[40px] rounded-[3rem] p-10 flex flex-col justify-between border border-white/5">
                  <div className="flex justify-between items-start">
                    <div className="w-20 h-20 rounded-3xl glass bg-white/5 flex items-center justify-center text-accent-lime group-hover:scale-110 transition-transform duration-500">
                      {step.icon}
                    </div>
                    <span className="text-6xl font-black italic opacity-10">0{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black italic uppercase mb-4 text-white">{step.title}</h3>
                    <p className="text-white/40 text-lg leading-relaxed uppercase tracking-tighter">{step.desc}</p>
                  </div>
                  <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      style={{ width: useTransform(smoothProgress, [stepStart, stepEnd], ["0%", "100%"]) }}
                      className="h-full bg-accent-lime"
                    />
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
