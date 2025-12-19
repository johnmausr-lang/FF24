"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, BarChart3, Clock, Globe, Box } from "lucide-react";

const features = [
  {
    title: "Приёмка 24/7",
    desc: "Товар попадает в систему сразу после разгрузки.",
    icon: <Clock className="w-10 h-10 text-accent-lime" />,
  },
  {
    title: "Безопасность",
    desc: "100% материальная ответственность и страховка.",
    icon: <ShieldCheck className="w-10 h-10 text-white/80" />,
  },
  {
    title: "Аналитика",
    desc: "Отчёты в реальном времени в вашем Telegram.",
    icon: <BarChart3 className="w-10 h-10 text-accent-lime" />,
    special: "chart",
  },
  {
    title: "Все маркетплейсы",
    desc: "Wildberries, Ozon, Яндекс.Маркет — FBO и FBS.",
    icon: <Globe className="w-10 h-10 text-white/80" />,
  },
  {
    title: "Умная упаковка",
    desc: "Снижаем объёмный вес на 15–20%.",
    icon: <Box className="w-10 h-10 text-accent-lime" />,
  },
];

export const BentoGrid = () => {
  return (
    <section id="benefits" className="py-24 sm:py-32 px-6">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black italic uppercase mb-8 text-white">
            Преимущества <span className="text-accent-lime">FF24</span>
          </h2>
          <p className="text-white/70 text-lg md:text-xl font-medium text-contained mx-auto">
            Мы помогаем селлерам расти, беря логистику на себя.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.6 } }}
              className="glass-card group p-8 md:p-10"
            >
              <div className="mb-6">
                <div className="w-16 h-16 rounded-2xl glass bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent-lime transition-all">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-black italic uppercase mb-4 text-white">
                {item.title}
              </h3>
              <p className="text-white/70 text-base leading-relaxed text-contained">
                {item.desc}
              </p>

              {item.special === "chart" && (
                <div className="mt-8 flex items-end gap-2 h-24">
                  {[40, 75, 50, 90, 65].map((h, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className="flex-1 bg-gradient-to-t from-accent-lime/40 to-white/10 rounded-t-lg"
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
