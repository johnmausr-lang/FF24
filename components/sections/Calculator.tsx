"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"; // Нужен будет отдельный файл компонента
import { Calculator as CalcIcon, Zap } from "lucide-react";

// Прайс-лист на основе данных FF24
const PRICES = {
  base: 25, // Приемка + базовая обработка
  packaging: 15, // Упаковка
  marking: 5, // Маркировка
  delivery: 35, // Доставка до склада (среднее)
};

export const Calculator = () => {
  const [quantity, setQuantity] = useState(100);
  const [services, setServices] = useState(["base", "marking"]);
  const [total, setTotal] = useState(0);

  // Анимация цифр
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const serviceSum = services.reduce((acc, service) => acc + (PRICES[service as keyof typeof PRICES] || 0), 0);
    const newTotal = serviceSum * quantity;
    setTotal(newTotal);
    
    const controls = animate(count, newTotal, { duration: 1, ease: "easeOut" });
    return controls.stop;
  }, [quantity, services]);

  const toggleService = (id: string) => {
    setServices(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  return (
    <section id="calculator" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card border border-border rounded-[3rem] p-8 md:p-16 overflow-hidden relative">
          {/* Декор */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-DEFAULT/10 blur-[80px] -mr-32 -mt-32" />

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 text-accent-DEFAULT mb-6">
                <CalcIcon size={24} />
                <span className="font-black uppercase tracking-widest text-sm">Online-расчет</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black italic uppercase mb-8">
                Рассчитайте <br /> стоимость <span className="text-accent-DEFAULT">фулфилмента</span>
              </h2>

              <div className="space-y-10">
                {/* Слайдер кол-ва */}
                <div>
                  <div className="flex justify-between mb-4">
                    <span className="font-bold uppercase text-sm text-muted-foreground">Кол-во товаров</span>
                    <span className="text-accent-DEFAULT font-black">{quantity} шт.</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="5000" 
                    step="10"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent-DEFAULT"
                  />
                </div>

                {/* Услуги */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: "base", label: "Приемка и проверка" },
                    { id: "packaging", label: "Упаковка в короб" },
                    { id: "marking", label: "Маркировка (ШК)" },
                    { id: "delivery", label: "Доставка до МП" },
                  ].map((s) => (
                    <div 
                      key={s.id}
                      onClick={() => toggleService(s.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                        services.includes(s.id) ? "border-accent-DEFAULT bg-accent-DEFAULT/5" : "border-border hover:border-white/20"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                        services.includes(s.id) ? "bg-accent-DEFAULT border-accent-DEFAULT" : "border-white/20"
                      }`}>
                        {services.includes(s.id) && <div className="w-2 h-2 bg-black rounded-full" />}
                      </div>
                      <span className="text-sm font-bold uppercase">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between items-center text-center">
              <div>
                <span className="text-muted-foreground font-bold uppercase text-xs tracking-[0.3em] mb-4 block">
                  Примерная стоимость
                </span>
                <div className="flex items-baseline gap-2">
                  <motion.span className="text-7xl md:text-8xl font-black italic text-glow">
                    {rounded}
                  </motion.span>
                  <span className="text-2xl font-black text-accent-DEFAULT italic">₽</span>
                </div>
                <p className="mt-6 text-muted-foreground text-sm max-w-[200px] mx-auto">
                  Скидка 10% на первый заказ уже включена в расчет
                </p>
              </div>

              <div className="w-full mt-12 space-y-4">
                <Button className="w-full bg-accent-DEFAULT text-black hover:bg-white py-8 rounded-2xl font-black uppercase italic text-lg shadow-neon group">
                  <Zap className="mr-2 fill-current group-hover:animate-pulse" /> Получить КП
                </Button>
                <p className="text-[10px] text-muted-foreground uppercase font-bold">
                  *точный расчет после уточнения габаритов
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
