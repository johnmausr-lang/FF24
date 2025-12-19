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
    <section id="lead" className="py-24 sm:py-32 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black italic uppercase mb-6 text-white leading-tight">
            Получите персональный <span className="text-accent-lime">расчёт</span>
          </h2>
          <p className="text-white/70 text-base md:text-xl max-w-2xl mx-auto">
            Менеджер подготовит предложение под ваш объём и маркетплейс за 24 часа
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="max-w-4xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div 
                key="form"
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card p-8 md:p-16 text-center border-accent-lime/20"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                  <div className="flex items-center gap-4 justify-center sm:justify-start">
                    <div className="w-12 h-12 rounded-full glass flex items-center justify-center shrink-0 border-accent-lime/30">
                      <Check className="w-6 h-6 text-accent-lime" />
                    </div>
                    <p className="text-white font-bold uppercase italic text-sm md:text-base">Экономия до 20%</p>
                  </div>
                  <div className="flex items-center gap-4 justify-center sm:justify-start">
                    <div className="w-12 h-12 rounded-full glass flex items-center justify-center shrink-0 border-accent-lime/30">
                      <Check className="w-6 h-6 text-accent-lime" />
                    </div>
                    <p className="text-white font-bold uppercase italic text-sm md:text-base">Персональный менеджер</p>
                  </div>
                </div>

                <button 
                  onClick={handleClick} 
                  className="btn-glass-lime w-full py-6 md:text-xl shadow-lg shadow-accent-lime/10"
                >
                  Написать в Telegram
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="success" 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-12 md:p-20 text-center border-accent-lime"
              >
                <div className="w-24 h-24 rounded-full bg-accent-lime/10 border-2 border-accent-lime mx-auto mb-8 flex items-center justify-center">
                  <Check className="w-12 h-12 text-accent-lime" />
                </div>
                <h3 className="text-3xl font-black uppercase mb-4 text-white">Система на связи</h3>
                <p className="text-white/70">Ожидайте сообщение в Telegram в ближайшее время</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
