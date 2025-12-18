"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Box } from "lucide-react";
import { ParticlesBackground } from "@/components/ParticlesBackground";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Частицы на весь экран */}
      <ParticlesBackground />

      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/50 via-black to-black" />
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-accent-lime/10 blur-[140px] rounded-full animate-pulse-slow" />
      <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-accent-blue/20 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center gap-3 mb-8">
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter gradient-text">
              FF24
            </h1>
          </div>

          <div className="inline-flex items-center gap-2 px-6 py-3 mb-10 rounded-full border border-accent-lime/30 bg-accent-lime/5 text-accent-lime text-sm font-black uppercase tracking-[0.3em] glow-pulse-lime">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-lime opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-lime"></span>
            </span>
            Fulfillment 2.0
          </div>

          <h2 className="text-6xl md:text-8xl font-black italic uppercase leading-[0.85] mb-8">
            Управляй <br />
            <span className="text-accent-blue text-glow">бизнесом</span> <br />
            в один клик
          </h2>

          <p className="text-foreground/80 text-lg md:text-xl max-w-lg mb-12 font-medium leading-relaxed">
            Автоматизированный фулфилмент для селлеров. Заберём, упакуем и доставим ваш товар на маркетплейсы за 24 часа.
          </p>

          <div className="flex flex-wrap gap-6">
            <Button 
              size="lg" 
              className="bg-accent-lime text-primary-dark hover:bg-white gradient-border-thick shadow-neon-lime glow-pulse-lime rounded-3xl px-12 py-8 text-xl font-black uppercase italic"
            >
              Рассчитать стоимость <ArrowRight className="ml-3" />
            </Button>
            <Button variant="outline" size="lg" className="border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-black rounded-3xl px-12 py-8 text-xl font-black">
              Наши услуги
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative hidden lg:block"
        >
          <div className="relative bg-card/80 border border-accent-blue/20 p-12 rounded-[3rem] shadow-neon glow-pulse backdrop-blur-xl gradient-border">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-20 h-20 rounded-3xl bg-accent-lime flex items-center justify-center text-primary-dark shadow-neon-lime">
                <Box size={40} />
              </div>
              <div>
                <div className="text-sm text-foreground/60 uppercase font-black tracking-widest">Статус склада</div>
                <div className="text-4xl font-black italic uppercase text-accent-lime">Работаем 24/7</div>
              </div>
            </div>
            
            <div className="space-y-8">
              {[
                { label: "Приёмка", progress: "w-full", color: "bg-accent-lime" },
                { label: "Упаковка", progress: "w-[82%]", color: "bg-accent-blue/50" },
                { label: "Отгрузка", progress: "w-[68%]", color: "bg-white/20" }
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-bold uppercase mb-3 tracking-tighter">
                    <span className="text-foreground/80">{item.label}</span>
                    <span className="text-accent-lime font-black">Active</span>
                  </div>
                  <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: item.progress }}
                      transition={{ duration: 2, delay: 0.5 + i * 0.3 }}
                      className={`h-full ${item.color} shadow-neon-lime`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
