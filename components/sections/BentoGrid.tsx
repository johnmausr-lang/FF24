"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, BarChart3, Clock, Globe, Box } from "lucide-react";

const features = [
  {
    title: "Приемка 24/7",
    desc: "Ваш товар попадает в систему сразу после разгрузки.",
    icon: <Clock className="text-accent-DEFAULT" />,
    className: "md:col-span-2 md:row-span-1 bg-accent-DEFAULT/5 border-accent-DEFAULT/20",
    animation: { scale: [1, 1.05, 1], transition: { duration: 4, repeat: Infinity } }
  },
  {
    title: "Безопасность",
    desc: "100% материальная ответственность.",
    icon: <ShieldCheck className="text-green-400" />,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Аналитика",
    desc: "Отчеты в реальном времени в вашем Telegram.",
    icon: <BarChart3 className="text-blue-400" />,
    className: "md:col-span-1 md:row-span-2 flex-col justify-between",
    special: "chart"
  },
  {
    title: "Все маркетплейсы",
    desc: "WB, Ozon, Яндекс Маркет — работаем по всем моделям.",
    icon: <Globe className="text-purple-400" />,
    className: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Умная упаковка",
    desc: "Снижаем объемный вес на 15-20% за счет оптимизации тары.",
    icon: <Box className="text-accent-DEFAULT" />,
    className: "md:col-span-1 md:row-span-1 border-accent-DEFAULT/50 shadow-neon-sm",
  }
];

export const BentoGrid = () => {
  return (
    <section id="benefits" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase mb-4">
            Технологии <span className="text-accent-DEFAULT">эффективности</span>
          </h2>
          <p className="text-muted-foreground font-medium max-w-xl">
            Мы не просто склад. Мы — IT-инфраструктура, которая масштабирует ваш бизнес на маркетплейсах.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-full">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative overflow-hidden p-8 rounded-[2.5rem] border border-border bg-card/50 backdrop-blur-sm flex flex-col gap-4 group ${item.className}`}
            >
              {/* Фоновое свечение при наведении */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-DEFAULT/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 rounded-2xl bg-background border border-border group-hover:border-accent-DEFAULT/50 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black italic uppercase tracking-tighter">{item.title}</h3>
              </div>
              
              <p className="text-muted-foreground text-sm font-medium relative z-10 leading-relaxed">
                {item.desc}
              </p>

              {/* Спец-эффект для карточки Аналитики */}
              {item.special === "chart" && (
                <div className="mt-auto pt-6 flex items-end gap-1 h-20">
                  {[40, 70, 45, 90, 65, 80].map((h, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ delay: 0.5 + (idx * 0.1), duration: 1 }}
                      className="flex-1 bg-accent-DEFAULT/20 rounded-t-md border-t border-accent-DEFAULT/40"
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
