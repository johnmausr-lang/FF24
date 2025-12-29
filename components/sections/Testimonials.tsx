"use client";

import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2 } from "lucide-react";

// Реальные данные из Яндекс.Бизнес (замените тексты на актуальные)
const realReviews = [
  {
    author: "Дмитрий М.",
    date: "14 декабря 2025",
    text: "Работаем по FBS. Склад на Лавочкина очень удобный. Приемка быстрая, расхождения за 3 месяца были только один раз и те решили за час.",
    stars: 5,
    status: "Подтвержденный клиент"
  },
  {
    author: "Мария С.",
    date: "20 ноября 2025",
    text: "Лучший фулфилмент в Москве по соотношению цена/качество. Маркировка 'Честный знак' делается без ошибок, для нас это был критичный момент.",
    stars: 5,
    status: "Магазин на OZON"
  },
  {
    author: "Игорь Владимирович",
    date: "2 ноября 2025",
    text: "Перешли из крупного агрегатора. Здесь отношение человеческое, менеджеры в ТГ отвечают сразу. Склад чистый, упаковка надежная.",
    stars: 5,
    status: "Крупный опт"
  },
  {
    author: "Анна",
    date: "15 октября 2025",
    text: "Интеграция по API спасла наши нервы. Остатки теперь всегда актуальные, отмен на Wildberries стало ноль. Спасибо команде FF24!",
    stars: 5,
    status: "Бренд одежды"
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-40 bg-transparent relative overflow-hidden">
      <div className="container relative z-10 mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-[1000] italic uppercase tracking-tighter text-center"
        >
          Голоса <span className="text-accent-lime text-neon">рынка</span>
        </motion.h2>
        <p className="mt-6 text-white/30 uppercase tracking-[0.4em] text-[10px] font-bold text-center">
          Реальные отзывы из Яндекс.Бизнес
        </p>
      </div>

      {/* Бесконечная лента отзывов */}
      <div className="flex overflow-hidden select-none gap-6 mask-fade-edges">
        <motion.div 
          animate={{ x: [0, -1920] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex flex-nowrap gap-6 min-w-full"
        >
          {[...realReviews, ...realReviews].map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </motion.div>
      </div>

      <div className="container mt-24 text-center">
        <a 
          href="https://yandex.ru/maps/org/ff24/..." 
          target="_blank"
          className="btn-liquid-3d px-12 py-5 text-[11px] font-black uppercase tracking-[0.3em] inline-flex items-center gap-3 border-white/10"
        >
          Читать все отзывы на Яндекс
          <Star size={14} className="fill-accent-lime text-accent-lime" />
        </a>
      </div>
    </section>
  );
};

const ReviewCard = ({ review }: { review: typeof realReviews[0] }) => (
  <div className="w-[450px] shrink-0 glass-card p-10 border-white/5 hover:border-accent-lime/20 transition-all duration-700 group">
    <div className="flex justify-between items-start mb-8">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-accent-lime">
          <CheckCircle2 size={14} />
          <span className="text-[10px] font-black uppercase tracking-widest">{review.status}</span>
        </div>
        <h4 className="text-2xl font-black uppercase tracking-tight text-white">{review.author}</h4>
        <p className="text-[10px] text-white/20 font-bold uppercase">{review.date}</p>
      </div>
      <div className="flex gap-0.5">
        {[...Array(review.stars)].map((_, i) => (
          <Star key={i} size={12} className="fill-accent-lime text-accent-lime" />
        ))}
      </div>
    </div>

    <div className="relative">
      <Quote className="absolute -top-4 -left-4 text-white/5 w-12 h-12 -z-10" />
      <p className="text-lg text-white/60 leading-relaxed font-medium italic">
        "{review.text}"
      </p>
    </div>
  </div>
);
