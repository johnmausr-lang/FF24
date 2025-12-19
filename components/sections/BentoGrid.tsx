"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, BarChart3, Clock, Globe, Box } from "lucide-react";

const features = [
  {
    title: "Приёмка 24/7",
    desc: "Ваш товар попадает в систему сразу после разгрузки.",
    icon: <Clock className="w-12 h-12 text-accent-lime" />,
  },
  {
    title: "Безопасность",
    desc: "100% материальная ответственность и страховка.",
    icon: <ShieldCheck className="w-12 h-12 text-accent-blue" />,
  },
  {
    title: "Аналитика",
    desc: "Отчёты в реальном времени прямо в ваш Telegram.",
    icon: <BarChart3 className="w-12 h-12 text-accent-lime" />,
    special: "chart",
  },
  {
    title: "Все маркетплейсы",
    desc: "Wildberries, Ozon, Яндекс.Маркет — работаем по FBO и FBS.",
    icon: <Globe className="w-12 h-12 text-accent-blue" />,
  },
  {
    title: "Умная упаковка",
    desc: "Снижаем объёмный вес на 15–20% за счёт оптимизации.",
    icon: <Box className="w-12 h-12 text-accent-lime" />,
  },
];

export const BentoGrid = () => {
  return (
    <section id="benefits" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black italic uppercase mb-8 gradient-text">
            Технологии <span className="text-accent-lime">эффективности</span>
          </h2>
          <p className="text-foreground/70 text-xl md:text-2xl font-medium max-w-4xl mx-auto">
            Мы не просто склад — мы IT-инфраструктура, которая масштабирует ваш бизнес.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.6, ease: "easeOut" }
              }}
              className="glass-card group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-lime/5 to-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 p-10 md:p-12 flex flex-col h-full">
                <div className="mb-8">
                  <div className="w-20 h-20 rounded-3xl glass bg-white/10 border border-white/20 flex items-center justify-center group-hover:border-accent-lime transition-all duration-500">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-black italic uppercase mb-6 tracking-tighter">
                  {item.title}
                </h3>
                <p className="text-foreground/80 text-lg leading-relaxed flex-grow">
                  {item.desc}
                </p>

                {item.special === "chart" && (
                  <div className="mt-12 flex items-end gap-3 h-32">
                    {[40, 75, 50, 90, 65, 85].map((h, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ delay: 0.5 + idx * 0.1, duration: 1 }}
                        className="flex-1 bg-gradient-to-t from-accent-lime/60 to-accent-blue/60 rounded-t-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
