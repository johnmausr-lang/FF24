"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, BarChart3, Globe } from "lucide-react";

export const LiveStats = () => {
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
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-lime opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-lime"></span>
      </span>
      <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">
        Сегодня отгружено: <span className="text-white font-black">{orders.toLocaleString()}</span>
      </span>
    </div>
  );
};

export const BentoGrid = () => {
  const features = [
    {
      title: "Скорость 24/7",
      desc: "Приемка и отгрузка в течение суток. Работаем без выходных.",
      icon: <Zap size={32} />,
      className: "md:col-span-2",
      badge: <LiveStats />
    },
    {
      title: "Контроль брака",
      desc: "Фотоотчет в Telegram сразу после приемки.",
      icon: <ShieldCheck size={32} />,
      className: "md:col-span-1"
    },
    {
      title: "Аналитика",
      desc: "Прозрачная отчетность в личном кабинете.",
      icon: <BarChart3 size={32} />,
      className: "md:col-span-1"
    },
    {
      title: "Глобальность",
      desc: "От 10 до 100 000 единиц товара в месяц.",
      icon: <Globe size={32} />,
      className: "md:col-span-2"
    }
  ];

  return (
    <section id="benefits" className="py-32 bg-transparent relative">
      <div className="container">
        <motion.div 
          initial={{ filter: "blur(10px)", opacity: 0 }}
          whileInView={{ filter: "blur(0px)", opacity: 1 }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6">
            Ваш бизнес на <span className="text-accent-lime">максимуме</span>
          </h2>
          <p className="text-white/40 uppercase tracking-[0.3em] font-bold text-sm">Преимущества премиального сервиса</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={`group relative glass-card p-10 flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-white/[0.01] border border-white/5 transition-all duration-500 ${f.className}`}
            >
              {/* Анимированная градиентная рамка (Glassmorphism 2.0) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-[-1px] bg-gradient-to-r from-accent-lime/50 via-transparent to-accent-lime/50 p-[1px]" />
              </div>

              <div className="relative z-10">
                <div className="mb-8 text-accent-lime group-hover:scale-110 transition-transform duration-500">{f.icon}</div>
                <h3 className="text-3xl font-black italic uppercase mb-4 tracking-tighter">{f.title}</h3>
                <p className="text-white/50 leading-relaxed">{f.desc}</p>
              </div>
              {f.badge && <div className="mt-8 relative z-10">{f.badge}</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
