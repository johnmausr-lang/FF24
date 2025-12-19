"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Check, ArrowRight } from "lucide-react";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const LeadForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleTelegramClick = () => {
    window.open(TELEGRAM_LINK, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <section id="lead" className="py-32 px-6 relative overflow-hidden">
      {/* Фоновые эффекты */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/30 via-black to-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-accent-lime/5 blur-[200px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-accent-blue/10 blur-[180px] rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black italic uppercase mb-8 gradient-text">
            Получи персональный <br />
            <span className="text-accent-lime text-glow-lime">расчёт за 24 часа</span>
          </h2>
          <p className="text-foreground/70 text-xl md:text-2xl font-medium max-w-4xl mx-auto">
            Без шаблонов. Только выгодные условия под ваш объём, товар и маркетплейс.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card glass-card-hover p-12 md:p-16"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="flex flex-col items-center gap-4">
                    <Zap className="w-12 h-12 text-accent-lime" />
                    <p className="text-lg font-bold">Расчёт за 24 часа</p>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <Check className="w-12 h-12 text-accent-lime" />
                    <p className="text-lg font-bold">Скидка 10% на первый месяц</p>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <ArrowRight className="w-12 h-12 text-accent-lime" />
                    <p className="text-lg font-bold">Консультация с менеджером</p>
                  </div>
                </div>

                <Button
                  onClick={handleTelegramClick}
                  className="btn-neon px-16 py-10 text-3xl md:text-4xl"
                >
                  Написать в Telegram
                </Button>

                <p className="mt-8 text-foreground/60 text-sm">
                  Или менеджер сам свяжется с вами в ближайшее время
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-48 h-48 rounded-full bg-accent-lime/20 border-8 border-accent-lime mx-auto mb-12 flex items-center justify-center shadow-neon-lime glow-pulse-lime"
                >
                  <Check className="w-24 h-24 text-accent-lime" />
                </motion.div>
                <h3 className="text-5xl font-black italic uppercase mb-6 gradient-text">
                  Готово!
                </h3>
                <p className="text-2xl text-foreground/80">
                  Менеджер напишет вам в Telegram в ближайшие 15 минут
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Социальное доказательство под формой */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-foreground/60 uppercase tracking-widest mb-8">Уже работают с нами</p>
          <div className="flex flex-wrap justify-center gap-12 items-center opacity-70">
            <div className="text-4xl font-black text-white/40">Wildberries</div>
            <div className="text-4xl font-black text-white/40">Ozon</div>
            <div className="text-4xl font-black text-white/40">Яндекс.Маркет</div>
            <div className="text-2xl font-bold text-white/40">+250 селлеров</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
