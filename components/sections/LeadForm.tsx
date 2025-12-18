"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link"; // Добавлен недостающий импорт
import { Button } from "@/components/ui/button";
import { Zap, Check, Mail, Phone, ArrowRight } from "lucide-react";

const steps = [
  { icon: <Zap className="w-8 h-8" />, text: "Персональный расчёт за 24 часа" },
  { icon: <Check className="w-8 h-8" />, text: "Скидка 10% на первый месяц" },
  { icon: <Mail className="w-8 h-8" />, text: "Консультация с менеджером" },
];

export const LeadForm = () => {
  const [formData, setFormData] = useState({ phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь логика отправки (например, fetch на /api/send-tg)
    console.log("Отправка данных:", formData);
    
    // Эмуляция успешной отправки
    setSubmitted(true);
    setFormData({ phone: "", email: "" });
  };

  return (
    <section id="lead" className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Фоновые эффекты */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/20 via-black to-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent-lime/5 blur-[200px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent-blue/10 blur-[180px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black italic uppercase mb-8 gradient-text">
            Получи <span className="text-accent-lime text-glow-lime">персональное</span> <br />
            предложение за 60 секунд
          </h2>
          <p className="text-foreground/70 text-xl md:text-2xl font-medium max-w-4xl mx-auto">
            Мы рассчитаем стоимость именно под ваш объём, товар и маркетплейс. 
            Без шаблонов — только выгодные условия для вашего бизнеса.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Левая часть — преимущества */}
          <div className="space-y-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex items-center gap-6 group"
              >
                <div className="w-20 h-20 rounded-3xl bg-accent-lime/10 border border-accent-lime/30 flex items-center justify-center text-accent-lime group-hover:scale-110 group-hover:bg-accent-lime group-hover:text-primary-dark transition-all duration-500 shadow-neon-lime">
                  {step.icon}
                </div>
                <p className="text-xl md:text-2xl font-bold text-white group-hover:text-accent-lime transition-colors">
                  {step.text}
                </p>
              </motion.div>
            ))}

            <div className="mt-12 pt-12 border-t border-accent-lime/20">
              <p className="text-foreground/60 text-sm uppercase tracking-widest mb-4">Уже доверяют</p>
              <div className="flex flex-wrap gap-8 items-center opacity-70">
                <div className="text-2xl font-black text-white/40">WB</div>
                <div className="text-2xl font-black text-white/40">OZON</div>
                <div className="text-2xl font-black text-white/40">ЯНДЕКС.МАРКЕТ</div>
                <div className="text-lg font-bold text-white/40">+ 200 селлеров</div>
              </div>
            </div>
          </div>

          {/* Правая часть — форма */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-primary-dark/60 backdrop-blur-xl border border-accent-lime/30 rounded-[4rem] p-12 shadow-neon-lime glow-pulse-lime gradient-border">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >
                    <h3 className="text-3xl font-black italic uppercase text-center mb-8 gradient-text">
                      Оставьте заявку
                    </h3>

                    <div className="space-y-6">
                      <div className="relative">
                        <Phone className="absolute left-6 top-6 w-6 h-6 text-accent-lime" />
                        <input
                          type="tel"
                          required
                          placeholder="Ваш телефон"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-black/50 border border-accent-lime/30 rounded-3xl pl-16 pr-6 py-6 text-white placeholder-foreground/40 focus:border-accent-lime focus:outline-none focus:shadow-neon-lime transition-all text-lg"
                        />
                      </div>

                      <div className="relative">
                        <Mail className="absolute left-6 top-6 w-6 h-6 text-accent-lime" />
                        <input
                          type="email"
                          required
                          placeholder="Ваш email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-black/50 border border-accent-lime/30 rounded-3xl pl-16 pr-6 py-6 text-white placeholder-foreground/40 focus:border-accent-lime focus:outline-none focus:shadow-neon-lime transition-all text-lg"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-accent-lime text-primary-dark hover:bg-white shadow-neon-lime glow-pulse-lime gradient-border-thick rounded-3xl py-8 text-2xl font-black uppercase italic"
                    >
                      Получить предложение <ArrowRight className="ml-4 w-8 h-8" />
                    </Button>

                    <p className="text-center text-foreground/50 text-sm">
                      Нажимая кнопку, вы соглашаетесь с <Link href="/privacy" className="underline hover:text-accent-lime">политикой конфиденциальности</Link>
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="w-32 h-32 rounded-full bg-accent-lime/20 border-4 border-accent-lime mx-auto mb-8 flex items-center justify-center"
                    >
                      <Check className="w-16 h-16 text-accent-lime" />
                    </motion.div>
                    <h3 className="text-4xl font-black italic uppercase mb-4 gradient-text">
                      Заявка принята!
                    </h3>
                    <p className="text-xl text-foreground/80">
                      Менеджер свяжется с вами в ближайшее время
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
