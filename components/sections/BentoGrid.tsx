"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, BarChart3, Clock, Globe, Box } from "lucide-react";

const features = [
  { title: "Приёмка 24/7", desc: "Товар попадает в систему сразу после разгрузки.", icon: <Clock className="w-10 h-10 text-accent-lime" /> },
  { title: "Безопасность", desc: "100% материальная ответственность и страховка.", icon: <ShieldCheck className="w-10 h-10 text-white/80" /> },
  { title: "Аналитика", desc: "Отчёты в реальном времени в вашем Telegram.", icon: <BarChart3 className="w-10 h-10 text-accent-lime" />, special: "chart" },
  { title: "Все маркетплейсы", desc: "Wildberries, Ozon, Яндекс.Маркет — FBO и FBS.", icon: <Globe className="w-10 h-10 text-white/80" /> },
  { title: "Умная упаковка", desc: "Снижаем объёмный вес на 15–20%.", icon: <Box className="w-10 h-10 text-accent-lime" /> },
];

export const BentoGrid = () => {
  return (
    <section id="benefits" className="py-24 sm:py-32 bg-black">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`glass-card p-8 md:p-10 flex flex-col h-full group ${i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-6 border border-white/10 group-hover:border-accent-lime transition-colors">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black italic uppercase text-white mb-4">{item.title}</h3>
              <p className="text-white/70 text-base leading-relaxed mb-6 flex-grow">{item.desc}</p>
              
              {item.special === "chart" && (
                <div className="flex items-end gap-2 h-20 mt-4">
                  {[40, 70, 45, 90, 60].map((h, idx) => (
                    <div key={idx} className="flex-1 bg-accent-lime/20 rounded-t-sm border-t border-accent-lime/40" style={{ height: `${h}%` }} />
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
