"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Box } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Фоновый градиент для глубины */}
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-accent-DEFAULT/10 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-accent-DEFAULT/30 bg-accent-DEFAULT/5 text-accent-DEFAULT text-xs font-black uppercase tracking-[0.2em]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-DEFAULT opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-DEFAULT"></span>
            </span>
            Fulfillment 2.0
          </div>

          <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-[0.85] mb-8">
            Управляй <br />
            <span className="text-accent-DEFAULT text-glow">бизнесом</span> <br />
            в один клик
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-lg mb-10 font-medium leading-relaxed">
            Автоматизированный фулфилмент для селлеров. Заберем, упакуем и доставим ваш товар на маркетплейсы за 24 часа. [cite: 38, 6]
          </p>

          <div className="flex flex-wrap gap-5">
            <Button 
              size="lg" 
              className="bg-accent-DEFAULT text-black hover:bg-white transition-all rounded-2xl px-10 py-8 text-lg font-black uppercase italic shadow-neon"
              onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Рассчитать стоимость <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/10 bg-white/5 hover:bg-white/10 rounded-2xl px-10 py-8 text-lg font-black uppercase italic transition-all"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Наши услуги
            </Button>
          </div>
        </motion.div>

        {/* Интерактивная карточка-визуал */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative bg-card border border-border p-10 rounded-[3rem] shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-16 h-16 rounded-2xl bg-accent-DEFAULT flex items-center justify-center text-black shadow-neon">
                <Box size={32} />
              </div>
              <div>
                <div className="text-sm text-muted-foreground uppercase font-black tracking-widest">Статус склада</div>
                <div className="text-3xl font-black italic uppercase">Работаем 24/7</div>
              </div>
            </div>
            
            <div className="space-y-6">
              {[
                { label: "Приемка", progress: "w-full", color: "bg-accent-DEFAULT" },
                { label: "Упаковка", progress: "w-[85%]", color: "bg-white/20" },
                { label: "Отгрузка", progress: "w-[60%]", color: "bg-white/10" }
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-bold uppercase mb-2 tracking-tighter">
                    <span>{item.label}</span>
                    <span className="text-accent-DEFAULT font-black">Active</span>
                  </div>
                  <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: item.progress.replace('w-[', '').replace('%]', '') + '%' }}
                      transition={{ duration: 1.5, delay: 1 }}
                      className={`h-full ${item.color}`} 
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
