"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
    };

    const res = await fetch("/api/send-tg", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) setStatus("success");
  };

  return (
    <section id="contact" className="py-32 px-6 bg-accent-DEFAULT relative overflow-hidden">
      {/* Декоративный текст на фоне */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black italic text-black/5 whitespace-nowrap pointer-events-none">
        GET STARTED FF24
      </div>

      <div className="max-w-3xl mx-auto relative z-10 bg-black p-8 md:p-16 rounded-[3rem] shadow-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black italic uppercase mb-4">Начнем работу?</h2>
          <p className="text-muted-foreground font-bold">Оставьте заявку, и мы пришлем прайс-лист через 5 минут</p>
        </div>

        {status === "success" ? (
          <div className="text-center py-10">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold uppercase italic">Менеджер уже пишет вам!</h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              name="name" required placeholder="ВАШЕ ИМЯ" 
              className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl font-bold uppercase focus:border-accent-DEFAULT outline-none transition-all"
            />
            <input 
              name="phone" required type="tel" placeholder="ТЕЛЕФОН" 
              className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl font-bold uppercase focus:border-accent-DEFAULT outline-none transition-all"
            />
            <Button 
              disabled={status === "loading"}
              className="w-full bg-accent-DEFAULT text-black hover:bg-white py-10 rounded-2xl font-black uppercase italic text-xl transition-all"
            >
              {status === "loading" ? "ОТПРАВКА..." : "ОТПРАВИТЬ ЗАЯВКУ"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};
