"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, BarChart3, Clock, Globe, Box } from "lucide-react";

const features = [
  { title: "Приёмка 24/7", desc: "Товар попадает в систему сразу после разгрузки.", icon: <Clock className="w-10 h-10 text-accent-lime" /> },
  { title: "Безопасность", desc: "100% материальная ответственность и страховка.", icon: <ShieldCheck className="w-10 h-10 text-slate-900" /> },
  { title: "Аналитика", desc: "Отчёты в реальном времени в вашем Telegram.", icon: <BarChart3 className="w-10 h-10 text-accent-lime" /> },
  { title: "Все маркетплейсы", desc: "Wildberries, Ozon, Яндекс.Маркет — FBO и FBS.", icon: <Globe className="w-10 h-10 text-slate-900" /> },
  { title: "Умная упаковка", desc: "Снижаем объёмный вес на 15–20%.", icon: <Box className="w-10 h-10 text-accent-lime" /> },
];

export const BentoGrid = () => {
  return (
    <section id="benefits" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Преимущества FF24
          </h2>
          <p className="text-white/70 text-lg text-contained">
            Мы помогаем селлерам расти, беря логистику на себя.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-600 text-base">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
