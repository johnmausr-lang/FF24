"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Александр В.",
    role: "Seller WB (Оборот 12 млн/мес)",
    text: "Перешел в FF24 после проблем на старом складе. Здесь всё четко: приемка день в день, никаких потерь. Личный менеджер всегда на связи.",
    rating: 5
  },
  {
    name: "Елена М.",
    role: "Бренд одежды (Ozon)",
    text: "Идеальная упаковка. За счет их оптимизации коробов снизили логистические затраты на 15%. Для одежды это критично.",
    rating: 5
  },
  {
    name: "Игорь Д.",
    role: "Электроника (FBS)",
    text: "Система уведомлений в телеграм — это спасение. Вижу каждый шаг своего товара. Рекомендую профессионалам.",
    rating: 5
  }
];

export const Testimonials = () => {
  return (
    <section className="py-32 bg-black relative">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6">
              Голоса <span className="text-accent-lime text-outline-white">Лидеров</span>
            </h2>
            <p className="text-white/40 uppercase tracking-[0.3em] font-bold text-sm">Нам доверяют 500+ активных селлеров</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-card p-10 relative group"
            >
              <Quote className="absolute top-8 right-8 text-white/5 group-hover:text-accent-lime/20 transition-colors duration-700" size={80} />
              
              <div className="flex gap-1 mb-8">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} size={16} className="fill-accent-lime text-accent-lime" />
                ))}
              </div>

              <p className="text-xl text-white/80 leading-relaxed italic mb-10 relative z-10">
                "{t.text}"
              </p>

              <div className="mt-auto">
                <p className="text-white font-black uppercase tracking-wider">{t.name}</p>
                <p className="text-accent-lime/60 text-xs font-bold uppercase tracking-widest mt-1">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
