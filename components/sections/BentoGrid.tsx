"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, BarChart3, Clock, Globe } from "lucide-react";
import { GlassVideo } from "@/components/ui/GlassVideo";

const features = [
  { 
    title: "Приёмка 24/7", 
    desc: "Ваш товар попадает в систему мониторинга сразу после разгрузки.", 
    icon: <Clock size={40} />,
    grid: "md:col-span-2"
  },
  { 
    title: "Безопасность", 
    desc: "Полная материальная ответственность под охраной 24/7.", 
    icon: <ShieldCheck size={40} />,
    grid: "md:col-span-1"
  },
  { 
    title: "Аналитика", 
    desc: "Ежедневные отчеты прямо в ваш Telegram.", 
    icon: <BarChart3 size={40} />, 
    special: "chart",
    grid: "md:col-span-1"
  },
  { 
    title: "Multi-Platform", 
    desc: "WB, Ozon, Я.Маркет. Поддерживаем все схемы: FBO и FBS.", 
    icon: <Globe size={40} />,
    grid: "md:col-span-2"
  },
];

export const BentoGrid = () => {
  return (
    <section id="benefits" className="py-32 bg-black relative">
      <div className="container">
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative glass-card p-10 flex flex-col justify-between group overflow-hidden ${item.grid}`}
            >
              {/* ВИДЕО SERVICE-BG ДЛЯ ВНУТРЕННЕГО КОНТЕНТА */}
              <GlassVideo 
                src="/videos/service-bg.webm" 
                opacity={0.3} 
                blur="blur-[40px]" 
                overlayColor="bg-black/50"
              />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-8 text-accent-lime group-hover:bg-accent-lime group-hover:text-black transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-black uppercase italic mb-4">{item.title}</h3>
                <p className="text-white/50 text-lg leading-relaxed">{item.desc}</p>
              </div>

              {item.special === "chart" && (
                <div className="mt-12 flex items-end gap-2 h-24 relative z-10">
                  {[40, 70, 45, 90, 65, 80].map((h, idx) => (
                    <div 
                      key={idx} 
                      style={{ height: `${h}%` }} 
                      className="flex-1 bg-accent-lime/40 rounded-t-sm group-hover:bg-accent-lime transition-all duration-700"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
