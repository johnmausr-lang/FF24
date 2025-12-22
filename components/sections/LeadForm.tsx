"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Check } from "lucide-react";
import { GlassVideo } from "@/components/ui/GlassVideo";

const TELEGRAM_LINK = "https://t.me/manager24ff";

export const LeadForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleAction = () => {
    window.open(TELEGRAM_LINK, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="lead" className="py-32 relative overflow-hidden">
      <div className="container relative z-10">
        <motion.div className="glass-card max-w-5xl mx-auto overflow-hidden relative border-accent-lime/20">
          
          {/* Видео-фон только для формы */}
          <GlassVideo 
            src="/videos/process-bg.webm" 
            opacity={0.4} 
            overlayColor="bg-black/60"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
            <div className="p-12 lg:p-20 border-r border-white/5 bg-black/20">
              <h2 className="text-5xl md:text-6xl font-black italic uppercase mb-8 tracking-tighter">
                Готовы к <br/><span className="text-accent-lime">взлету?</span>
              </h2>
              <p className="text-white/60 text-xl mb-12">
                Оставьте заявку и получите персональный расчет стоимости за 24 часа.
              </p>
            </div>

            <div className="p-12 lg:p-20 flex flex-col justify-center items-center text-center">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div key="form" className="w-full">
                    <div className="mb-10 inline-flex items-center gap-2 text-accent-lime">
                      <Sparkles className="animate-pulse" />
                      <span className="font-black uppercase tracking-widest text-sm">Fast Response</span>
                    </div>
                    <button 
                      onClick={handleAction}
                      className="btn-glass-lime !text-xl !py-8 w-full group shadow-[0_0_50px_rgba(224,255,100,0.3)]"
                    >
                      Связаться в Telegram
                      <Send className="ml-4 group-hover:rotate-12 transition-transform" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="success" className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-accent-lime flex items-center justify-center text-black mb-8">
                      <Check size={40} strokeWidth={3} />
                    </div>
                    <h3 className="text-3xl font-black italic uppercase">Ждем вас!</h3>
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
