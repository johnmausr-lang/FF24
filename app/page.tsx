"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Zap, ArrowRight, Box } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const containerRef = useRef(null);
  
  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1A0B2E]">
      {/* 1. РЕВОЛЮЦИОННЫЙ ФОН: Динамические орбиты */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-accent-DEFAULT/10 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full"
        />
        {/* Световое пятно за курсором (упрощенно) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge с неоном */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-DEFAULT/30 bg-accent-DEFAULT/5 text-accent-DEFAULT text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-neon-sm">
            <Zap size={14} className="fill-current" /> Fulfillment 2.0 
          </div>

          <h1 className="text-6xl md:text-[120px] font-black italic uppercase leading-[0.85] tracking-tighter mb-10">
            Управляй <br />
            <span className="text-accent-DEFAULT drop-shadow-[0_0_30px_rgba(37,99,235,0.5)]">бизнесом</span> <br />
            в один клик [cite: 32]
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Автоматизированный фулфилмент для селлеров. Заберем, упакуем и доставим ваш товар на маркетплейсы за 24 часа. [cite: 38, 6]
          </p>

          <div className="flex flex-col md:row items-center justify-center gap-6">
            <Button size="lg" className="rounded-2xl px-12 py-8 text-xl group relative overflow-hidden bg-accent-DEFAULT text-black">
              <span className="relative z-10 flex items-center gap-2">
                Рассчитать стоимость <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>
            
            <div className="flex items-center gap-8">
              <div className="text-left">
                <div className="text-2xl font-black italic">24/7</div>
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Статус склада [cite: 38]</div>
              </div>
              <div className="h-10 w-[1px] bg-white/10" />
              <div className="text-left">
                <div className="text-2xl font-black italic text-accent-DEFAULT">98%</div>
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Точность сборки [cite: 87]</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating 3D-like Box */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 opacity-20 hidden lg:block"
      >
        <Box size={200} strokeWidth={0.5} className="text-accent-DEFAULT" />
      </motion.div>
    </section>
  );
}
