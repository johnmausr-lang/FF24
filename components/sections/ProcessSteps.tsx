"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  ClipboardList, Truck, HardHat, Factory,
  PackageCheck, Download, CheckCircle2
} from "lucide-react";
import { GlassVideo } from "@/components/ui/GlassVideo";

const steps = [
  { title: "Заявка", desc: "Регистрация ТЗ", icon: <ClipboardList size={32} /> },
  { title: "Забор", desc: "Логистика", icon: <Truck size={32} /> },
  { title: "Приёмка", desc: "Контроль брака", icon: <HardHat size={32} /> },
  { title: "Маркировка", desc: "Честный Знак", icon: <Factory size={32} /> },
  { title: "Упаковка", desc: "Подготовка", icon: <PackageCheck size={32} /> },
  { title: "Отгрузка", desc: "Склад МП", icon: <Download size={32} className="rotate-180" /> },
  { title: "Финиш", desc: "Готов к продаже", icon: <CheckCircle2 size={32} /> },
];

export const ProcessSteps = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const x = useTransform(smoothProgress, [0, 1], ["0%", "-70%"]);

  return (
    <div id="process" ref={targetRef} className="relative h-[400vh] bg-black">
      {/* ФОН SERVICE-BG */}
      <GlassVideo 
        src="/videos/service-bg.webm" 
        opacity={0.2} 
        playbackRate={0.5} 
      />

      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container mb-20 relative z-20 pointer-events-none">
          <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter opacity-10 leading-none">
            Process <span className="text-accent-lime">Flow</span>
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-[10vw] relative z-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="relative shrink-0 w-[300px] md:w-[450px]"
            >
              <div className="glass-card group h-[500px] p-[1px] bg-gradient-to-br from-white/10 to-transparent">
                <div className="relative z-10 p-8 h-full flex flex-col bg-black/40 backdrop-blur-3xl rounded-[inherit]">
                  <div className="w-16 h-16 rounded-xl bg-accent-lime/10 flex items-center justify-center text-accent-lime mb-6 border border-accent-lime/20">
                    {step.icon}
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-xs font-bold text-accent-lime/40 uppercase tracking-[0.3em]">Этап 0{i + 1}</span>
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter mt-1">{step.title}</h3>
                  </div>
                  
                  <p className="text-white/40 text-sm uppercase leading-snug">
                    {step.desc}
                  </p>

                  <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
                    <div className="w-2 h-2 rounded-full bg-accent-lime animate-pulse" />
                    <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest group-hover:text-accent-lime/60">System Active</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
