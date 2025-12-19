"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Send, Sparkles } from "lucide-react";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const LeadForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleAction = () => {
    window.open(TELEGRAM_LINK, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="lead" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-accent-lime/5 blur-[120px] rounded-full -translate-x-1/2 left-1/2 w-full max-w-4xl h-full" />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card max-w-5xl mx-auto overflow-hidden border-accent-lime/20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 lg:p-20 bg-white/[0.02] border-r border-white/5">
              <h2 className="text-5xl md:text-6xl font-black italic uppercase mb-8 tracking-tighter leading-none">
                Готовы к <br/><span className="text-accent-lime">взлету?</span>
              </h2>
              <p className="text-white/60 text-xl mb-12 font-medium">
                Оставьте заявку и получите персональный расчет стоимости за 24 часа + чек-лист по подготовке товара.
              </p>
              
              <ul className="space-y-6">
                {[
                  "Скидка 10% на первый месяц",
                  "Бесплатный аудит упаковки",
                  "Личный менеджер в Telegram"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-4 text-white font-bold uppercase tracking-wider text-sm">
                    <div className="w-6 h-6 rounded-full bg-accent-lime flex items-center justify-center text-black">
                      <Check size={14} strokeWidth={4} />
                    </div>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-12 lg:p-20 flex flex-col justify-center items-center text-center">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="w-full"
                  >
                    <div className="mb-10 inline-flex items-center gap-2 text-accent-lime">
                      <Sparkles className="animate-pulse" />
                      <span className="font-black uppercase tracking-widest text-sm">Быстрый старт</span>
                    </div>
                    <button 
                      onClick={handleAction}
                      className="btn-glass-lime !text-xl !py-8 w-full group shadow-[0_0_50px_rgba(224,255,100,0.2)]"
                    >
                      Связаться в Telegram
                      <Send className="ml-4 group-hover:rotate-12 transition-transform" />
                    </button>
                    <p className="mt-8 text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold">
                      Среднее время ответа: 15 минут
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-32 h-32 rounded-full bg-accent-lime flex items-center justify-center text-black mb-8 shadow-[0_0_80px_rgba(224,255,100,0.4)]">
                      <Check size={60} strokeWidth={3} />
                    </div>
                    <h3 className="text-3xl font-black italic uppercase mb-4">Ждем вас!</h3>
                    <p className="text-white/50">Мы уже открыли диалог в Telegram.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
