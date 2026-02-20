"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export const LeadForm = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const formatPhone = (val: string) => {
    const cleaned = val.replace(/\D/g, "");
    if (!cleaned) return "";
    let formatted = "+7";
    if (cleaned.length > 1) formatted += ` (${cleaned.slice(1, 4)}`;
    if (cleaned.length >= 5) formatted += `) ${cleaned.slice(4, 7)}`;
    if (cleaned.length >= 8) formatted += `-${cleaned.slice(7, 9)}`;
    if (cleaned.length >= 10) formatted += `-${cleaned.slice(9, 11)}`;
    return formatted;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка при отправке");
      
      setStatus("success");
      setFormData({ name: "", phone: "", email: "" });
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error.message);
    }
  };

  return (
    <section id="form" className="py-32 bg-slate-50 dark:bg-black transition-colors duration-500 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-16 items-center">
        
        <div className="flex-1 text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter transition-colors duration-500">
              Начать <span className="text-lime-500 dark:text-[#E0FF64]">Работу</span>
            </h2>
            <p className="mt-6 text-slate-600 dark:text-slate-400 font-medium text-lg max-w-xl mx-auto lg:mx-0 transition-colors duration-500">
              Оставьте заявку, и наш менеджер свяжется с вами в течение 15 минут для расчета индивидуальных тарифов.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true }}
          className="flex-1 w-full max-w-lg relative"
        >
          {/* Стеклянная подложка формы */}
          <div className="p-8 md:p-10 bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl dark:shadow-[0_0_50px_rgba(224,255,100,0.05)] transition-colors duration-500">
            {status === "success" ? (
              <div className="text-center py-10">
                <CheckCircle2 className="w-20 h-20 text-lime-500 dark:text-[#E0FF64] mx-auto mb-6" />
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase mb-4 transition-colors duration-500">Заявка принята</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium transition-colors duration-500">Мы уже обрабатываем ваши данные. Ожидайте звонка!</p>
                <button onClick={() => setStatus("idle")} className="mt-8 px-6 py-3 bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white rounded-full font-bold uppercase text-xs hover:bg-slate-200 dark:hover:bg-white/20 transition-all">Отправить еще</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 transition-colors duration-500">Имя и Компания</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-5 py-4 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:border-lime-500 dark:focus:border-[#E0FF64] transition-colors duration-500" placeholder="Иван, ООО Логистика" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 transition-colors duration-500">Телефон</label>
                  <input required type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })} className="w-full px-5 py-4 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:border-lime-500 dark:focus:border-[#E0FF64] transition-colors duration-500" placeholder="+7 (999) 000-00-00" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 transition-colors duration-500">Email (опционально)</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-5 py-4 bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:border-lime-500 dark:focus:border-[#E0FF64] transition-colors duration-500" placeholder="hello@company.com" />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-500/10 p-4 rounded-xl text-sm font-medium transition-colors duration-500">
                    <AlertCircle className="w-5 h-5" /> {errorMessage}
                  </div>
                )}

                <button disabled={status === "loading"} type="submit" className="w-full py-4 bg-lime-500 dark:bg-[#E0FF64] text-white dark:text-black font-black uppercase text-sm rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-lime-500/30 dark:shadow-[#E0FF64]/20">
                  {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Отправить заявку</>}
                </button>
              </form>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
