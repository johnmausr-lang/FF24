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
    <div className="glass px-4 py-2 rounded-full border-accent-lime/20 flex items-center gap-3 w-fit">
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
      desc: "Приемка и отгрузка в течение суток. Работаем без выходных, чтобы ваш товар всегда был в наличии.",
      icon: <Zap className="text-accent-lime" size={32} />,
      className: "md:col-span-2",
      badge: <LiveStats />
    },
    {
      title: "Контроль брака",
      desc: "Проверяем каждую единицу. Фотоотчет в Telegram сразу после приемки.",
      icon: <ShieldCheck className="text-accent-lime" size={32} />,
      className: "md:col-span-1"
    },
    {
      title: "Аналитика",
      desc: "Прозрачная отчетность по остаткам и продажам в личном кабинете.",
      icon: <BarChart3 className="text-accent-lime" size={32} />,
      className: "md:col-span-1"
    },
    {
      title: "Масштабирование",
      desc: "Готовы к любым объемам. От 10 до 100 000 единиц в месяц без потери качества.",
      icon: <Globe className="text-accent-lime" size={32} />,
      className: "md:col-span-2"
    }
  ];

  return (
    <section id="benefits" className="py-32 bg-black relative">
      <div className="container">
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6">
            Ваш бизнес на <span className="text-accent-lime text-outline-white">максимуме</span>
          </h2>
          <p className="text-white/40 uppercase tracking-[0.3em] font-bold text-sm">Преимущества премиального сервиса</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className={`glass-card p-10 flex flex-col justify-between border-white/5 bg-white/[0.02] ${f.className}`}
            >
              <div>
                <div className="mb-8">{f.icon}</div>
                <h3 className="text-3xl font-black italic uppercase mb-4 tracking-tighter">{f.title}</h3>
                <p className="text-white/50 leading-relaxed mb-6">{f.desc}</p>
              </div>
              {f.badge && <div className="mt-4">{f.badge}</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
