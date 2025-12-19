"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Алексей Иванов",
    role: "Селлер Wildberries, оборот 15 млн/мес",
    text: "FF24 забрали всю логистику на себя. Приёмка в день поставки, без брака, отгрузка за 24 часа. Сэкономили 250k в месяц на штрафах.",
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
    <section className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Что говорят наши клиенты
          </h2>
          <p className="text-white/70 text-lg text-contained">
            250+ селлеров уже доверяют нам свою логистику
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, s) => (
                  <Star key={s} className="w-5 h-5 fill-accent-lime text-accent-lime" />
                ))}
              </div>
              <p className="text-slate-700 text-base mb-8">
                "{t.text}"
              </p>
              <div>
                <p className="font-bold">{t.name}</p>
                <p className="text-slate-600 text-sm">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
