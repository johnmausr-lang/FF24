"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Send, Cpu, Activity, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const typingText = "CONNECTING TO FF24 NODE...";

export const Terminal = () => {
  const [typedText, setTypedText] = useState("");
  const [status, setStatus] = useState<"idle" | "typing" | "sending" | "success">("idle");
  const [formData, setFormData] = useState({ name: "", phone: "" });

  useEffect(() => {
    if (status === "idle") {
      const timeout = setTimeout(() => {
        setStatus("typing");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  useEffect(() => {
    if (status === "typing") {
      if (typedText.length < typingText.length) {
        const timeout = setTimeout(() => {
          setTypedText(typingText.slice(0, typedText.length + 1));
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setStatus("idle"), 1000);
        return () => clearTimeout(timeout);
      }
    }
  }, [typedText, status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Имитация отправки
    setTimeout(() => {
      console.log("Отправлено:", formData);
      setStatus("success");
      setTimeout(() => {
        setFormData({ name: "", phone: "" });
        setStatus("idle");
        setTypedText("");
      }, 4000);
    }, 2000);
  };

  return (
    <section id="contact" className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Карта (8 колонок) */}
          <div className="lg:col-span-8 relative bg-primary-dark/40 border border-accent-lime/20 rounded-[3rem] overflow-hidden group min-h-[600px]">
            <div className="absolute top-6 left-6 z-20 flex gap-3">
              <div className="px-5 py-3 bg-black/80 backdrop-blur-md border border-accent-lime/40 rounded-full flex items-center gap-3">
                <div className="w-3 h-3 bg-accent-lime rounded-full animate-pulse" />
                <span className="text-sm font-bold uppercase tracking-widest text-accent-lime">Node: Moscow_North</span>
              </div>
              <div className="px-5 py-3 bg-black/80 backdrop-blur-md border border-accent-blue/30 rounded-full flex items-center gap-2">
                <Activity className="w-4 h-4 text-accent-blue" />
                <span className="text-xs font-mono text-accent-blue">Online</span>
              </div>
            </div>

            {/* Яндекс карта с фильтром */}
            <iframe 
              src="https://yandex.ru/map-widget/v1/?ll=37.447385%2C55.829531&z=15&pt=37.447385%2C55.829531,pm2blm" 
              className="absolute inset-0 w-full h-full opacity-70 grayscale contrast-150 invert hue-rotate-180"
            />

            {/* Терминальный оверлей */}
            <div className="absolute bottom-6 left-6 right-6 z-20 bg-black/90 backdrop-blur-md border border-accent-lime/40 rounded-3xl p-6 font-mono text-sm">
              <div className="text-accent-lime mb-2">
                {status === "typing" && (
                  <span>{typedText}<span className="animate-pulse">|</span></span>
                )}
                {status !== "typing" && typingText}
              </div>
              {status === "sending" && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2 }}
                  className="h-1 bg-accent-lime rounded-full mt-2"
                />
              )}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-accent-lime"
                >
                  {/* Исправлено: экранирование символа > */}
                  &gt; CONNECTION ESTABLISHED<br />
                  &gt; DATA TRANSMITTED SUCCESSFULLY<br />
                  &gt; MANAGER WILL CONTACT YOU SOON
                </motion.div>
              )}
            </div>
          </div>

          {/* Форма (4 колонки) */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-full bg-primary-dark/60 backdrop-blur-xl border border-accent-lime/30 rounded-[3rem] p-10 flex flex-col shadow-neon-lime glow-pulse-lime gradient-border"
            >
              <div className="flex items-center gap-4 mb-8">
                <Cpu className="w-12 h-12 text-accent-lime" />
                <h3 className="text-3xl font-black uppercase italic gradient-text">
                  Execute connect
                </h3>
              </div>

              <AnimatePresence mode="wait">
                {status !== "success" ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6 flex-grow flex flex-col"
                  >
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-accent-lime tracking-widest">Seller_ID</label>
                      <input 
                        required
                        placeholder="IVAN_V."
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-black/50 border border-accent-lime/30 rounded-2xl px-6 py-5 font-mono text-lg focus:border-accent-lime focus:outline-none focus:shadow-neon-lime transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-accent-lime tracking-widest">Contact_Channel</label>
                      <input 
                        required
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-black/50 border border-accent-lime/30 rounded-2xl px-6 py-5 font-mono text-lg focus:border-accent-lime focus:outline-none focus:shadow-neon-lime transition-all"
                      />
                    </div>

                    <div className="mt-auto pt-8">
                      <Button 
                        disabled={status === "sending"}
                        type="submit"
                        className="w-full bg-accent-lime text-primary-dark hover:bg-white shadow-neon-lime glow-pulse-lime gradient-border-thick rounded-3xl py-8 text-2xl font-black uppercase italic"
                      >
                        {status === "sending" ? (
                          <>UPLOADING DATA... <motion.div className="inline-block ml-3 w-6 h-6 border-4 border-primary-dark border-t-transparent rounded-full animate-spin" /></>
                        ) : (
                          <>EXECUTE START <Send className="ml-4 w-8 h-8" /></>
                        )}
                      </Button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-grow flex flex-col items-center justify-center text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="w-40 h-40 rounded-full bg-accent-lime/20 border-8 border-accent-lime flex items-center justify-center mb-8 shadow-neon-lime"
                    >
                      <CheckCircle2 className="w-20 h-20 text-accent-lime" />
                    </motion.div>
                    <h4 className="text-4xl font-black uppercase italic mb-4 gradient-text">
                      Connected
                    </h4>
                    <p className="text-xl text-foreground/80 font-mono">
                      Данные приняты.<br />
                      Ожидайте коннект менеджера.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
