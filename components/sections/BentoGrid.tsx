"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, BarChart3, Globe } from "lucide-react";

const LiveStats = () => {
  const [orders, setOrders] = useState(1420);
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prev => prev + Math.floor(Math.random() * 2));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    // Обертка в стиле жидкого стекла для бейджа внутри карточки
    <div className="btn-liquid-frame !p-[1px]">
      <div className="inner-content !px-4 !py-2 !gap-3 bg-black/60">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E0FF64] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E0FF64]"></span>
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 font-sans">
          Отгружено сегодня: <span className="text-[#E0FF64] font-black">{orders.toLocaleString()}</span>
        </span>
      </div>
    </div>
  );
};

export const BentoGrid = () => {
  const features = [
    {
      title: "Цикл 24 часа",
      desc: "От момента разгрузки до появления товара на остатках маркетплейса проходит не более суток. Мы работаем, пока другие спят.",
      icon: <Zap size={40} />,
      className: "md:col-span-2 md:row-span-2",
      badge: <LiveStats />
    },
    {
      title: "Нулевой брак",
      desc: "Трехэтапная проверка каждой единицы. Фотофиксация процесса и моментальный отчет в ваш Telegram.",
      icon: <ShieldCheck size={40} />,
      className: "md:col-span-2 md:row-span-1"
    },
    {
      title: "Прозрачная IT-среда",
      desc: "Интеграция с вашими API. Контролируйте движение каждой коробки в режиме реального времени через личный кабинет.",
      icon: <BarChart3 size={40} />,
      className: "md:col-span-1 md:row-span-1"
    },
    {
      title: "Масштаб без границ",
      desc: "Гибкие мощности: от тестовой партии в 10 штук до контейнерных отгрузок в 100 000+ единиц ежемесячно.",
      icon: <Globe size={40} />,
      className: "md:col-span-1 md:row-span-1"
    }
  ];

  return (
    <section id="services" className="py-40 bg-black relative overflow-hidden">
      {/* Использование нового section-container для правильных отступов */}
      <div className="section-container">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-left border-l-2 border-[#E0FF64] pl-8"
        >
          <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-4 leading-none">
            БИЗНЕС НА <br />
            <span className="text-[#E0FF64] text-neon">МАКСИМУМЕ</span>
          </h2>
          <p className="text-white/20 uppercase tracking-[0.5em] font-black text-[10px]">
            ПРЕИМУЩЕСТВА ПРЕМИАЛЬНОГО СЕРВИСА FF24
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-fr">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              // Использование glass-card из ваших глобальных стилей
              className={`group relative glass-card p-12 flex flex-col justify-between hover:border-[#E0FF64]/20 ${f.className}`}
            >
              {/* Эффект свечения при наведении из ваших стилей */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#E0FF64]/5 to-transparent" />
              </div>

              <div className="relative z-10">
                <div className="mb-10 text-[#E0FF64] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 w-fit">
                  {f.icon}
                </div>
                <h3 className="text-4xl font-black italic uppercase mb-6 tracking-tighter leading-none group-hover:text-neon transition-all">
                  {f.title}
                </h3>
                <p className="text-white/40 leading-relaxed font-bold uppercase text-[11px] tracking-widest">
                  {f.desc}
                </p>
              </div>
              
              {f.badge && <div className="mt-12 relative z-10 w-fit">{f.badge}</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
