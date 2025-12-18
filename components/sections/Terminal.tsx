"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Send, Cpu, Database, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Terminal = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Имитация задержки сети
    setTimeout(() => setStatus("success"), 2000);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Блок 1: Интерактивная карта (8 колонок) */}
          <div className="lg:col-span-8 bg-card border border-white/10 rounded-[3rem] overflow-hidden relative min-h-[500px] group">
            <div className="absolute top-6 left-6 z-20 flex gap-2">
              <div className="px-4 py-2 bg-black/80 backdrop-blur-md border border-accent-DEFAULT/30 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 bg-accent-DEFAULT rounded-full animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Node: Moscow_North</span>
              </div>
            </div>

            {/* Стилизованная карта */}
            <iframe 
              src="https://yandex.ru/map-widget/v1/?ll=37.447385%2C55.829531&z=15&pt=37.447385%2C55.829531,pm2blm" 
              className="absolute inset-0 w-full h-full grayscale invert opacity-60 contrast-125"
            />
            
            {/* Оверлей терминала поверх карты */}
            <div className="absolute bottom-6 right-6 z-20 space-y-2">
              <div className="p-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl max-w-xs">
                <div className="flex items-center gap-2 text-accent-DEFAULT mb-2">
                  <MapPin size={16} />
                  <span className="text-xs font-black uppercase">Main Hub</span>
                </div>
                <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
                  ЛОДОЧНАЯ 5-7. КПП №5 (КУРЬЕРЫ) / КПП №6 (ГРУЗОВИКИ)
                </p>
              </div>
            </div>
          </div>

          {/* Блок 2: Форма захвата (4 колонки) */}
          <div className="lg:col-span-4 bg-accent-DEFAULT p-1 rounded-[3rem]">
            <div className="bg-black h-full w-full rounded-[2.8rem] p-10 flex flex-col">
              <div className="mb-10">
                <div className="flex items-center gap-2 text-accent-DEFAULT mb-4">
                  <Cpu size={20} />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Access Protocol</span>
                </div>
                <h3 className="text-3xl font-black italic uppercase leading-none">
                  Запустить <br /> <span className="text-accent-DEFAULT text-5xl">интеграцию</span>
                </h3>
              </div>

              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-grow flex flex-col items-center justify-center text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-accent-DEFAULT/20 flex items-center justify-center text-accent-DEFAULT mb-6">
                    <Database size={40} className="animate-bounce" />
                  </div>
                  <h4 className="text-xl font-black uppercase italic">Данные приняты</h4>
                  <p className="text-slate-500 text-sm mt-2">Ожидайте коннект менеджера</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 flex-grow flex flex-col">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-600 ml-4">Seller_Name</label>
                    <input 
                      required placeholder="IVAN_V." 
                      className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl font-mono text-sm focus:border-accent-DEFAULT outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-600 ml-4">Contact_Phone</label>
                    <input 
                      required type="tel" placeholder="+7 (___) ___ - __ - __" 
                      className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl font-mono text-sm focus:border-accent-DEFAULT outline-none transition-all"
                    />
                  </div>
                  
                  <div className="mt-auto pt-10">
                    <Button 
                      disabled={status === "sending"}
                      className="w-full bg-accent-DEFAULT text-black hover:bg-white py-10 rounded-[2rem] font-black uppercase italic text-xl shadow-neon transition-all active:scale-95"
                    >
                      {status === "sending" ? "UPLOADING..." : "EXECUTE START"}
                      <Send size={20} className="ml-2" />
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
