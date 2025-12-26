"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export const LeadForm = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", phone: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/send-tg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="glass-card p-8 md:p-16 rounded-[3rem] border-white/10 bg-white/[0.02] backdrop-blur-3xl relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
        {/* Анимированный фон внутри формы */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-lime/5 blur-[120px] rounded-full" />
        
        <div className="relative z-10">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">
              Запустить <span className="text-accent-lime">поток</span>
            </h2>
            <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-bold">
              Оставьте заявку на расчет фулфилмента и аудит
            </p>
          </div>

          {status === "success" ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              className="py-12 text-center"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-accent-lime/20 text-accent-lime mb-6">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-3xl font-black uppercase italic mb-2">Заявка принята</h3>
              <p className="text-white/50 text-sm tracking-widest uppercase">Менеджер свяжется с вами скоро</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 ml-4">Ваше имя</label>
                  <input
                    required
                    type="text"
                    placeholder="АЛЕКСАНДР"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-6 outline-none focus:border-accent-lime/50 transition-all text-white placeholder:text-white/5 font-bold uppercase tracking-widest"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 ml-4">Телефон</label>
                  <input
                    required
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-6 outline-none focus:border-accent-lime/50 transition-all text-white placeholder:text-white/5 font-bold uppercase tracking-widest"
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <button
                disabled={status === "loading"}
                className="btn-glass-lime w-full py-8 rounded-2xl flex items-center justify-center gap-4 group disabled:opacity-50"
              >
                {status === "loading" ? (
                  <Loader2 className="animate-spin text-black" size={24} />
                ) : (
                  <>
                    <span className="text-sm font-black uppercase tracking-[0.3em]">Отправить в обработку</span>
                    <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                  </>
                )}
              </button>
              
              <p className="text-center text-[8px] text-white/10 uppercase tracking-[0.2em]">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности FF24
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
