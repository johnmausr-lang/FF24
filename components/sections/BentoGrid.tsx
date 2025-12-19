"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, BarChart3, Clock, Globe, Box } from "lucide-react";

const features = [
  {
    title: "Приёмка 24/7",
    desc: "Товар попадает в систему сразу после разгрузки.",
    icon: <Clock className="w-12 h-12 text-accent-lime" />,
  },
  {
    title: "Безопасность",
    desc: "100% материальная ответственность и страховка.",
    icon: <ShieldCheck className="w-12 h-12 text-white/80" />,
  },
  {
    title: "Аналитика",
    desc: "Отчёты в реальном времени в вашем Telegram.",
    icon: <BarChart3 className="w-12 h-12 text-accent-lime" />,
    special: "chart",
  },
  {
    title: "Все маркетплейсы",
    desc: "Wildberries, Ozon, Яндекс.Маркет — FBO и FBS.",
    icon: <Globe className="w-12 h-12 text-white/80" />,
  },
  {
    title: "Умная упаковка",
    desc: "Снижаем объёмный вес на 15–20%.",
    icon: <Box className="w-12 h-12 text-accent-lime" />,
  },
];

export const BentoGrid = () => {
  return (
    <section id="benefits" className="py-24 sm:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black italic uppercase mb-8 text-white">
            Преимущества <span className="text-accent-lime">FF24</span>
          </h2>
          <p className="text-white/70 text-lg md:text-xl text-contained">
            Мы помогаем селлерам расти, беря логистику на себя.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
              whileHover={{ y: -12, transition: { duration: 0.8, ease: "easeOut" } }}
              className="glass-card group"
            >
              <div className="p-12 flex flex-col items-center text-center h-full">
                <div className="mb-8">
                  <div className="w-20 h-20 rounded-3xl glass bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent-lime transition-all duration-500 ease-out">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-3xl font-black italic uppercase mb-6 text-white">
                  {item.title}
                </h3>
                <p className="text-white/70 text-lg leading-relaxed text-tight">
                  {item.desc}
                </p>

                {item.special === "chart" && (
                  <div className="mt-10 flex items-end gap-3 h-32 justify-center">
                    {[40, 75, 50, 90, 65].map((h, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ delay: 0.5 + idx * 0.1, duration: 1.2, ease: "easeOut" }}
                        className="w-8 bg-gradient-to-t from-accent-lime/40 to-white/10 rounded-t-lg"
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
