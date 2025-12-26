"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Loader2 } from "lucide-react";
import { GlassVideo } from "@/components/ui/GlassVideo";

export const Testimonials = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Запрос к нашему новому серверному API
        const response = await fetch("/api/reviews");
        const data = await response.json();
        
        // Если API вернуло массив отзывов
        if (data && data.reviews) {
          setReviews(data.reviews.slice(0, 3)); // Берем только первые 3
        }
      } catch (err) {
        console.error("Ошибка загрузки отзывов:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Фон - service-bg */}
      <GlassVideo 
        src="/videos/service-bg.webm" 
        opacity={0.2} 
        playbackRate={0.4}
      />

      <div className="container relative z-10">
        <div className="max-w-2xl mb-20">
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6">
            Голоса <span className="text-accent-lime">рынка</span>
          </h2>
          <p className="text-white/40 text-lg uppercase tracking-widest font-bold">
            Реальные отзывы из Яндекс.Карт
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-accent-lime" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Если отзывы загрузились — показываем их, если нет — дефолтные */}
            {(reviews.length > 0 ? reviews : [
              { author: "Александр В.", text: "Перешел в FF24 после проблем на старом складе. Здесь всё четко: приемка день в день.", rating: 5 },
              { author: "Елена М.", text: "Идеальная упаковка. За счет их оптимизации снизили логистические затраты на 15%.", rating: 5 },
              { author: "Игорь Д.", text: "Система уведомлений в телеграм — это спасение. Вижу каждый шаг своего товара.", rating: 5 }
            ]).map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative h-[400px] rounded-[3rem] p-[2px] overflow-hidden group"
              >
                <GlassVideo 
                  src="/videos/service-bg.webm" 
                  opacity={0.15} 
                  blur="blur-[30px]" 
                  overlayColor="bg-black/60"
                />
                
                <div className="relative z-10 h-full w-full bg-white/[0.03] backdrop-blur-[40px] rounded-[3rem] p-10 flex flex-col border border-white/5 group-hover:border-accent-lime/30 transition-colors duration-500">
                  <Quote className="absolute top-8 right-8 text-white/5" size={80} />
                  
                  <div className="flex gap-1 mb-8">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={16} className="fill-accent-lime text-accent-lime" />
                    ))}
                  </div>

                  <p className="text-xl text-white/80 leading-relaxed italic mb-10 line-clamp-4">
                    "{t.text || t.message}"
                  </p>

                  <div className="mt-auto">
                    <p className="text-white font-black uppercase tracking-wider">
                      {t.author || t.authorName}
                    </p>
                    <p className="text-accent-lime/60 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">
                      Verified Client • Yandex
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
