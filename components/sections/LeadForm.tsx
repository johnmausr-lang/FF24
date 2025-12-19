"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const LeadForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleClick = () => {
    window.open(TELEGRAM_LINK, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="lead" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Получите персональный расчёт
          </h2>
          <p className="text-white/70 text-lg text-contained">
            Менеджер подготовит предложение под ваш объём и маркетплейс за 24 часа
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="card max-w-4xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div key="form" className="text-center p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="flex flex-col items-center gap-4">
                    <Check className="w-10 h-10 text-accent-lime" />
                    <p className="font-bold">Расчёт за 24 часа</p>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <Check className="w-10 h-10 text-accent-lime" />
                    <p className="font-bold">Скидка 10% на первый месяц</p>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <Check className="w-10 h-10 text-accent-lime" />
                    <p className="font-bold">Персональный менеджер</p>
                  </div>
                </div>

                <button onClick={handleClick} className="btn-primary">
                  Написать в Telegram
                </button>
              </motion.div>
            ) : (
              <motion.div key="success" className="text-center py-20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-32 h-32 rounded-full bg-accent-lime/20 mx-auto mb-8 flex items-center justify-center"
                >
                  <Check className="w-16 h-16 text-accent-lime" />
                </motion.div>
                <h3 className="text-3xl font-bold mb-4">
                  Готово!
                </h3>
                <p className="text-slate-600">
                  Менеджер напишет вам в Telegram в ближайшее время
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
