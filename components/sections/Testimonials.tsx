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
    <section className="py-24 sm:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black italic uppercase mb-8 text-white">
            Что говорят <span className="text-accent-lime">наши клиенты</span>
          </h2>
          <p className="text-white/70 text-lg md:text-xl text-contained">
            250+ селлеров уже доверяют нам свою логистику
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
              whileHover={{ y: -12, transition: { duration: 0.8, ease: "easeOut" } }}
              className="glass-card group"
            >
              <div className="p-12 flex flex-col h-full">
                <div className="flex gap-1 mb-8 justify-center">
                  {[...Array(t.rating)].map((_, s) => (
                    <Star key={s} className="w-6 h-6 fill-accent-lime text-accent-lime" />
                  ))}
                </div>
                <p className="text-white/90 text-lg leading-relaxed text-tight flex-grow mb-10">
                  "{t.text}"
                </p>
                <div className="text-center mt-auto">
                  <p className="font-black text-xl text-white">{t.name}</p>
                  <p className="text-white/60 text-sm mt-2">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
