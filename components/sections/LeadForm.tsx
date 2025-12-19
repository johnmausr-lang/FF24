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
    <section id="lead" className="py-24 sm:py-32 px-6">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black italic uppercase mb-8 text-white">
            Получите персональный расчёт
          </h2>
          <p className="text-white/70 text-lg md:text-xl font-medium text-contained mx-auto">
            Менеджер подготовит предложение под ваш объём и маркетплейс за 24 часа
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-12 md:p-20"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div key="form" className="text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full glass bg-white/10 border border-white/20 flex items-center justify-center">
                      <Check className="w-8 h-8 text-accent-lime" />
                    </div>
                    <p className="text-base md:text-lg font-bold text-white">Расчёт за 24 часа</p>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full glass bg-white/10 border border-white/20 flex items-center justify-center">
                      <Check className="w-8 h-8 text-accent-lime" />
                    </div>
                    <p className="text-base md:text-lg font-bold text-white">Скидка 10% на первый месяц</p>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full glass bg-white/10 border border-white/20 flex items-center justify-center">
                      <Check className="w-8 h-8 text-accent-lime" />
                    </div>
                    <p className="text-base md:text-lg font-bold text-white">Персональный менеджер</p>
                  </div>
                </div>

                <button
                  onClick={handleClick}
                  className="w-full md:w-auto btn-glass-lime px-12 py-6 text-xl md:text-2xl"
                >
                  Написать в Telegram
                </button>
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
                  className="w-40 h-40 rounded-full glass bg-accent-lime/10 border-4 border-accent-lime mx-auto mb-12 flex items-center justify-center"
                >
                  <Check className="w-20 h-20 text-accent-lime" />
                </motion.div>
                <h3 className="text-4xl font-black uppercase mb-6 text-white">
                  Готово!
                </h3>
                <p className="text-xl text-white/80">
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
