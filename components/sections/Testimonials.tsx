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
    result: "Внедрили строгую проверку швов и молний на этапе приемки. Переупаковка в зип-локи с плотным картоном сократила порчу товара при примерках. Ваша одежда доезжает до клиента в идеальном виде.",
  },
  {
    id: "electronics",
    title: "Электроника",
    icon: Laptop,
    metric: "0% потерь",
    result: "Серийный учет каждого устройства (КИЗ). Трехслойная пузырьковая пленка и жесткий короб. Полная страховка хрупких грузов на всех этапах и видеонаблюдение над столом упаковщика.",
  },
  {
    id: "cosmetics",
    title: "Косметика",
    icon: Sparkles,
    metric: "FEFO контроль",
    result: "Соблюдение температурного режима. Автоматическая отбраковка товаров, у которых истекает срок годности. Надежная защита жидкостей от проливания с помощью термоусадочной пленки.",
  },
  {
    id: "fmcg",
    title: "Товары для дома",
    icon: ShoppingBasket,
    metric: "Отгрузка день в день",
    result: "Быстрая сборка мульти-корзин любой сложности. Надежная изоляция бытовой химии от других товаров строго по регламентам и стандартам безопасности маркетплейсов.",
  },
];

export const Testimonials = () => {
  const [activeNiche, setActiveNiche] = useState(NICHES[0]);

  return (
    <section id="testimonials" className="py-32 bg-slate-50 dark:bg-black relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter transition-colors">
            Решения для <span className="text-lime-500 dark:text-[#E0FF64]">Ниш</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Левое меню (Навигация по нишам) */}
          <div className="flex flex-col gap-4 lg:w-1/3">
            {NICHES.map((niche) => {
              const isActive = activeNiche.id === niche.id;
              return (
                <button
                  key={niche.id}
                  onClick={() => setActiveNiche(niche)}
                  className={`relative px-8 py-6 rounded-2xl flex items-center gap-6 transition-all duration-300 w-full overflow-hidden group ${
                    isActive 
                      ? "bg-white dark:bg-white/10 shadow-lg dark:shadow-none border border-slate-200 dark:border-white/20" 
                      : "bg-transparent hover:bg-slate-200/50 dark:hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {/* Ползунок активного таба */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-lime-500 dark:bg-[#E0FF64]" 
                    />
                  )}
                  
                  <niche.icon className={`w-8 h-8 transition-colors duration-300 z-10 ${isActive ? "text-lime-600 dark:text-[#E0FF64]" : "text-slate-400 dark:text-white/40 group-hover:text-slate-600 dark:group-hover:text-white/80"}`} />
                  <span className={`font-black uppercase tracking-wider text-sm transition-colors duration-300 z-10 ${isActive ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-white/50"}`}>
                    {niche.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Правая панель (Стеклянный монитор с результатом) */}
          <div className="lg:w-2/3 h-full min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNiche.id}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[2rem] p-10 md:p-14 shadow-2xl relative overflow-hidden flex flex-col justify-center"
              >
                {/* Фоновый неоновый блик */}
                <div className="absolute -top-32 -right-32 w-80 h-80 bg-lime-400/20 dark:bg-[#E0FF64]/10 blur-[100px] rounded-full pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-100 dark:bg-[#E0FF64]/10 border border-lime-200 dark:border-[#E0FF64]/20 rounded-full text-lime-700 dark:text-[#E0FF64] font-black uppercase text-xs tracking-widest w-fit mb-8 shadow-sm">
                    <ArrowUpRight className="w-4 h-4" />
                    Результат: {activeNiche.metric}
                  </div>
                  
                  <h3 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6 transition-colors">
                    {activeNiche.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl leading-relaxed font-medium transition-colors">
                    "{activeNiche.result}"
                  </p>
                  
                  <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/10">
                    <button 
                      onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
                      className="btn-prime group"
                    >
                      <div className="btn-shine"></div>
                      <span>Адаптировать под мой товар</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
