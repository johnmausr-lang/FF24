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
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="lead" className="py-32 bg-transparent">
      <div className="max-w-4xl mx-auto px-6">
        <div className="glass-card p-10 md:p-20 rounded-[4rem] border-white/5 bg-white/[0.01] backdrop-blur-3xl relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#E0FF64]/5 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <div className="mb-16 text-center md:text-left">
              <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6 leading-none">
                Оставить <span className="text-[#E0FF64]">заявку</span>
              </h2>
              <p className="text-white/40 uppercase tracking-[0.5em] text-xs font-bold">
                Рассчитаем стоимость вашего фулфилмента за 15 минут
              </p>
            </div>

            {status === "success" ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-16 text-center">
                <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-[#E0FF64]/20 text-[#E0FF64] mb-8">
                  <CheckCircle2 size={56} />
                </div>
                <h3 className="text-4xl font-black uppercase italic mb-4">Данные получены</h3>
                <p className="text-white/40 uppercase tracking-widest text-sm">Свяжемся с вами в ближайшее время</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.5em] font-black text-white/30 ml-6">Ваше имя</label>
                    <input
                      required
                      placeholder="АЛЕКСАНДР"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-3xl px-10 py-7 outline-none focus:border-[#E0FF64]/50 transition-all text-white placeholder:text-white/5 font-bold uppercase tracking-widest text-lg"
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.5em] font-black text-white/30 ml-6">Телефон</label>
                    <input
                      required
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-3xl px-10 py-7 outline-none focus:border-[#E0FF64]/50 transition-all text-white placeholder:text-white/5 font-bold uppercase tracking-widest text-lg"
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <button disabled={status === "loading"} className="btn-glass-lime w-full py-10 rounded-3xl flex items-center justify-center gap-6 group">
                  {status === "loading" ? <Loader2 className="animate-spin" /> : (
                    <>
                      <span className="text-lg font-black uppercase tracking-[0.4em]">Отправить данные</span>
                      <Send size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
