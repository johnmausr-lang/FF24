"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, BarChart3, Clock, Globe, Box } from "lucide-react";

const features = [
  {
    title: "Приёмка 24/7",
    desc: "Ваш товар попадает в систему сразу после разгрузки.",
    icon: <Clock className="text-accent-lime" />,
    className: "md:col-span-2 md:row-span-1 bg-primary-dark/50 border-accent-lime/30 shadow-neon-lime glow-pulse-lime",
  },
  {
    title: "Безопасность",
    desc: "100% материальная ответственность.",
    icon: <ShieldCheck className="text-accent-blue" />,
    className: "md:col-span-1 md:row-span-1 bg-primary-dark/30 border-accent-blue/30 shadow-neon",
  },
  {
    title: "Аналитика",
    desc: "Отчёты в реальном времени в вашем Telegram.",
    icon: <BarChart3 className="text-accent-lime" />,
    className: "md:col-span-1 md:row-span-2 flex-col justify-between gradient-border",
    special: "chart"
  },
  {
    title: "Все маркетплейсы",
    desc: "WB, Ozon, Яндекс Маркет — работаем по всем моделям.",
    icon: <Globe className="text-accent-blue" />,
    className: "md:col-span-2 md:row-span-1 bg-primary-dark/40 border-accent-blue/20",
  },
  {
    title: "Умная упаковка",
    desc: "Снижаем объёмный вес на 15-20% за счёт оптимизации тары.",
    icon: <Box className="text-accent-lime" />,
    className: "md:col-span-1 md:row-span-1 border-accent-lime/50 shadow-neon-lime glow-pulse-lime",
  }
];

export const BentoGrid = () => {
  return (
    <section id="benefits" className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-black italic uppercase mb-6 gradient-text">
            Технологии <span className="text-accent-lime text-glow-lime">эффективности</span>
          </h2>
          <p className="text-foreground/70 font-medium text-xl max-w-3xl mx-auto">
            Мы не просто склад. Мы — IT-инфраструктура, которая масштабирует ваш бизнес на маркетплейсах.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ 
                y: -12, 
                scale: 1.03,
                transition: { duration: 0.4 }
              }}
              className={`relative overflow-hidden p-10 rounded-[3rem] border backdrop-blur-sm flex flex-col gap-6 group ${item.className}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-accent-lime/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="flex items-center gap-5 relative z-10">
                <div className="p-4 rounded-3xl bg-black/50 border border-accent-lime/30 group-hover:border-accent-lime group-hover:scale-110 transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-black italic uppercase tracking-tighter gradient-text">
                  {item.title}
                </h3>
              </div>
              
              <p className="text-foreground/80 text-lg font-medium relative z-10 leading-relaxed">
                {item.desc}
              </p>

              {item.special === "chart" && (
                <div className="mt-auto pt-8 flex items-end gap-2 h-32">
                  {[45, 80, 55, 95, 70, 90].map((h, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ delay: 0.8 + (idx * 0.1), duration: 1.2 }}
                      className="flex-1 bg-gradient-to-t from-accent-lime to-accent-blue rounded-t-lg border-t-4 border-accent-lime/50"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
