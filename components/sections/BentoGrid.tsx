"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, BarChart3, Clock, Globe, Box } from "lucide-react";

const features = [
  { 
    title: "Приёмка 24/7", 
    desc: "Ваш товар попадает в систему мониторинга сразу после разгрузки. Никаких очередей.", 
    icon: <Clock size={40} />,
    grid: "md:col-span-2"
  },
  { 
    title: "Безопасность", 
    desc: "Полная материальная ответственность. Склад под охраной и видеонаблюдением 24/7.", 
    icon: <ShieldCheck size={40} />,
    grid: "md:col-span-1"
  },
  { 
    title: "Аналитика", 
    desc: "Ежедневные отчеты об остатках и движении товара прямо в ваш Telegram.", 
    icon: <BarChart3 size={40} />, 
    special: "chart",
    grid: "md:col-span-1"
  },
  { 
    title: "Multi-Platform", 
    desc: "WB, Ozon, Я.Маркет. Поддерживаем все схемы: FBO и FBS из одного окна.", 
    icon: <Globe size={40} />,
    grid: "md:col-span-2"
  },
];

export const BentoGrid = () => {
  return (
    <section id="benefits" className="py-32 bg-black">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black italic uppercase mb-6 tracking-tighter">
            Почему выбирают <span className="text-accent-lime text-outline-white">FF24</span>
          </h2>
          <div className="h-1 w-40 bg-accent-lime" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-10 flex flex-col justify-between group ${item.grid}`}
            >
              <div>
                <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-8 text-accent-lime group-hover:bg-accent-lime group-hover:text-black transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-black uppercase italic mb-4">{item.title}</h3>
                <p className="text-white/50 text-lg leading-relaxed">{item.desc}</p>
              </div>

              {item.special === "chart" && (
                <div className="mt-12 flex items-end gap-2 h-24">
                  {[40, 70, 45, 90, 65, 80].map((h, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ delay: 0.5 + idx * 0.1, duration: 1 }}
                      className="flex-1 bg-gradient-to-t from-accent-lime/40 to-accent-lime rounded-t-sm"
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
