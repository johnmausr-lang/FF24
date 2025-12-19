"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Алексей Иванов",
    role: "Селлер Wildberries, оборот 15 млн/мес",
    text: "FF24 забрали всю логистику на себя. Приёмка в день поставки, без брака, отгрузка за 24 часа. Сэкономили 250к в месяц на штрафах.",
    rating: 5,
  },
  {
    name: "Мария Петрова",
    role: "Селлер Ozon, 5000 заказов/мес",
    text: "Перешли с другого фулфилмента — разница колоссальная. Прозрачная аналитика, быстрая маркировка, поддержка 24/7. Рекомендую!",
    rating: 5,
  },
  {
    name: "Дмитрий Сидоров",
    role: "Селлер Яндекс.Маркет",
    text: "Умная упаковка снизила объёмный вес на 18%. Плюс скидка на первый месяц — отличный старт. Теперь все поставки через FF24.",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black italic uppercase mb-8 gradient-text">
            Что говорят <span className="text-accent-lime text-glow-lime">наши клиенты</span>
          </h2>
          <p className="text-foreground/70 text-xl md:text-2xl font-medium">
            250+ селлеров уже доверяют нам свою логистику
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-card glass-card-hover p-10 group"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, s) => (
                  <Star key={s} className="w-6 h-6 fill-accent-lime text-accent-lime" />
                ))}
              </div>
              <p className="text-foreground/90 text-lg mb-8 leading-relaxed">
                "{t.text}"
              </p>
              <div className="mt-auto">
                <p className="font-black text-xl">{t.name}</p>
                <p className="text-foreground/60 text-sm">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
