"use client";

import { useState, useEffect } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Package, Truck, ShieldCheck, Check } from "lucide-react";

const PRICES = {
  base: 25,     // Приемка
  packaging: 15, // Упаковка
  marking: 5,    // ШК
  delivery: 35,  // Доставка
};

export const Calculator = () => {
  const [quantity, setQuantity] = useState(100);
  const [selectedServices, setSelectedServices] = useState(["base", "marking"]);
  
  // Анимация живых цифр
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    const serviceSum = selectedServices.reduce((acc, s) => acc + (PRICES[s as keyof typeof PRICES] || 0), 0);
    const total = serviceSum * quantity;
    const controls = animate(count, total, { duration: 1, ease: "easeOut" });
    return controls.stop;
  }, [quantity, selectedServices]);

  const toggleService = (id: string) => {
    setSelectedServices(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  return (
    <section id="calculator" className="py-24 px-6 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Левая часть: Настройки */}
          <div className="space-y-12">
            <div>
              <h2 className="text-5xl font-black italic uppercase mb-6 tracking-tighter">
                Smart <span className="text-accent-DEFAULT">Cost</span> Control
              </h2>
              <p className="text-slate-400 font-medium italic uppercase text-sm tracking-widest">
                Настройте параметры своей партии
              </p>
            </div>

            {/* Слайдер количества */}
            <div className="bg-card/30 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-xl">
              <div className="flex justify-between items-end mb-8">
                <span className="text-sm font-black uppercase text-slate-500">Объем партии</span>
                <span className="text-4xl font-black italic text-accent-DEFAULT">{quantity} <small className="text-xs">ШТ</small></span>
              </div>
              <input 
                type="range" min="50" max="10000" step="50"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent-DEFAULT"
              />
            </div>

            {/* Сетка услуг */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: "base", label: "Приемка", icon: <Package size={18} /> },
                { id: "packaging", label: "Упаковка", icon: <ShieldCheck size={18} /> },
                { id: "marking", label: "ШК", icon: <Zap size={18} /> },
                { id: "delivery", label: "Доставка", icon: <Truck size={18} /> },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => toggleService(s.id)}
                  className={`flex items-center gap-3 p-5 rounded-2xl border font-bold transition-all ${
                    selectedServices.includes(s.id) 
                    ? "bg-accent-DEFAULT text-black border-accent-DEFAULT shadow-neon-sm scale-95" 
                    : "bg-white/5 border-white/10 text-white hover:border-white/20"
                  }`}
                >
                  {selectedServices.includes(s.id) ? <Check size={18} /> : s.icon}
                  <span className="uppercase text-xs tracking-tighter">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Правая часть: Результат (Dashboard Card) */}
          <div className="relative group">
            <div className="absolute inset-0 bg-accent-DEFAULT/20 blur-[120px] rounded-full group-hover:bg-accent-DEFAULT/30 transition-colors" />
            <div className="relative h-full bg-card border border-white/10 rounded-[4rem] p-12 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                  <div className="w-2 h-2 bg-accent-DEFAULT rounded-full animate-ping" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Live Estimate</span>
              </div>

              <div className="text-center py-10">
                <div className="text-sm font-bold text-slate-500 uppercase mb-2">Итоговая стоимость</div>
                <div className="flex items-center justify-center gap-3">
                  <motion.span className="text-8xl md:text-[120px] font-black italic tracking-tighter leading-none">
                    {rounded}
                  </motion.span>
                  <span className="text-4xl font-black italic text-accent-DEFAULT">₽</span>
                </div>
              </div>

              <div className="space-y-4">
                <Button className="w-full bg-accent-DEFAULT text-black hover:bg-white h-20 rounded-[2rem] font-black uppercase italic text-xl shadow-neon group">
                  Зафиксировать цену <Zap className="ml-2 fill-current group-hover:animate-bounce" />
                </Button>
                <p className="text-[10px] text-center text-slate-500 uppercase font-bold tracking-widest">
                  *Включая скидку 10% на первый заказ
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
