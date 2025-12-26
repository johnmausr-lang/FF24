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
    <div className="glass px-4 py-2 rounded-full border-accent-lime/20 flex items-center gap-3 w-fit bg-black/40">
      <span className="flex h-2 w-2 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E0FF64] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E0FF64]"></span>
      </span>
      <span className="text-[10px] font-bold uppercase tracking-wider text-white/70 font-mono">
        Отгружено сегодня: <span className="text-[#E0FF64] font-black">{orders.toLocaleString()}</span>
      </span>
    </div>
  );
};

export const BentoGrid = () => {
  const features = [
    {
      title: "Цикл 24 часа",
      desc: "От момента разгрузки до появления товара на остатках маркетплейса проходит не более суток. Мы работаем, пока другие спят.",
      icon: <Zap size={32} />,
      className: "md:col-span-2",
      badge: <LiveStats />
    },
    {
      title: "Нулевой брак",
      desc: "Трехэтапная проверка каждой единицы. Фотофиксация процесса и моментальный отчет в ваш Telegram.",
      icon: <ShieldCheck size={32} />,
      className: "md:col-span-1"
    },
    {
      title: "Прозрачная IT-среда",
      desc: "Интеграция с вашими API. Контролируйте движение каждой коробки в режиме реального времени через личный кабинет.",
      icon: <BarChart3 size={32} />,
      className: "md:col-span-1"
    },
    {
      title: "Масштаб без границ",
      desc: "Гибкие мощности: от тестовой партии в 10 штук до контейнерных отгрузок в 100 000+ единиц ежемесячно.",
      icon: <Globe size={32} />,
      className: "md:col-span-2"
    }
  ];

  return (
    <section id="services" className="py-32 bg-transparent relative">
      <div className="container">
        <motion.div 
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center md:text-left"
        >
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6">
            Ваш бизнес на <span className="text-[#E0FF64] text-neon">максимуме</span>
          </h2>
          <p className="text-white/40 uppercase tracking-[0.4em] font-bold text-xs">Преимущества премиального сервиса FF24</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`group relative glass-card p-10 flex flex-col justify-between overflow-hidden ${f.className}`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#E0FF64]/5 to-transparent" />
              </div>

              <div className="relative z-10">
                <div className="mb-8 text-[#E0FF64] group-hover:scale-110 transition-transform duration-500">{f.icon}</div>
                <h3 className="text-3xl font-black italic uppercase mb-4 tracking-tighter leading-none">{f.title}</h3>
                <p className="text-white/50 leading-relaxed font-medium">{f.desc}</p>
              </div>
              {f.badge && <div className="mt-8 relative z-10">{f.badge}</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
