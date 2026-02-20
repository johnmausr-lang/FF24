"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shirt, Laptop, Sparkles, ShoppingBasket, ArrowUpRight } from "lucide-react";

const NICHES = [
  {
    id: "clothing",
    title: "Одежда и Обувь",
    icon: Shirt,
    metric: "-15% возвратов",
    result: "Внедрили строгую проверку швов и молний на этапе приемки. Переупаковка в зип-локи с плотным картоном сократила порчу товара при примерках.",
  },
  {
    id: "electronics",
    title: "Электроника",
    icon: Laptop,
    metric: "0% потерь",
    result: "Серийный учет каждого устройства (КИЗ). Трехслойная пузырьковая пленка и жесткий короб. Полная страховка хрупких грузов на всех этапах.",
  },
  {
    id: "cosmetics",
    title: "Косметика",
    icon: Sparkles,
    metric: "Срок годности под контролем",
    result: "Соблюдение температурного режима. Автоматическая отбраковка товаров, у которых истекает срок годности (FEFO). Защита от проливания.",
  },
  {
    id: "fmcg",
    title: "Товары для дома",
    icon: ShoppingBasket,
    metric: "Отгрузка день в день",
    result: "Сборка мульти-корзин любой сложности. Надежная упаковка бытовой химии отдельно от других товаров по стандартам маркетплейсов.",
  },
];

export const Testimonials = () => {
  const [activeNiche, setActiveNiche] = useState(NICHES[0]);

  return (
    <section id="testimonials" className="py-32 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter">
            Решения для <span className="text-gradient">Ниш</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Сетка логотипов/ниш */}
          <div className="grid grid-cols-2 gap-4 lg:w-1/2">
            {NICHES.map((niche) => {
              const isActive = activeNiche.id === niche.id;
              return (
                <button
                  key={niche.id}
                  onMouseEnter={() => setActiveNiche(niche)}
                  onClick={() => setActiveNiche(niche)}
                  className={`relative p-8 rounded-3xl border transition-all duration-500 flex flex-col items-center justify-center gap-4 group ${
                    isActive 
                      ? "bg-white/10 border-[#E0FF64]/50 shadow-[0_0_30px_rgba(224,255,100,0.1)]" 
                      : "bg-white/5 border-white/10 grayscale hover:grayscale-0 hover:bg-white/10"
                  }`}
                >
                  <niche.icon className={`w-12 h-12 transition-colors duration-500 ${isActive ? "text-[#E0FF64]" : "text-white/40 group-hover:text-white"}`} />
                  <span className={`font-black uppercase tracking-wider text-xs text-center transition-colors duration-500 ${isActive ? "text-white" : "text-white/40"}`}>
                    {niche.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Карточка с результатом (Жидкое стекло) */}
          <div className="lg:w-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNiche.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full glass-card rounded-3xl p-10 flex flex-col justify-center relative overflow-hidden"
              >
                {/* Декоративный блик */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#E0FF64]/20 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E0FF64]/10 border border-[#E0FF64]/30 rounded-full text-[#E0FF64] font-black uppercase text-xs tracking-widest w-fit mb-8">
                  <ArrowUpRight className="w-4 h-4" />
                  {activeNiche.metric}
                </div>
                
                <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-6">
                  {activeNiche.title}
                </h3>
                
                <p className="text-white/70 text-lg leading-relaxed font-medium">
                  "{activeNiche.result}"
                </p>
                
                <div className="mt-12 pt-8 border-t border-white/10">
                  <button className="btn-liquid-glass px-8 py-4 rounded-full w-full flex justify-center items-center gap-2 group">
                    <span className="text-xs font-black uppercase tracking-widest text-white group-hover:text-[#E0FF64] transition-colors">Адаптировать под мой товар</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};
