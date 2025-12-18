"use client";

import { MapPin, Truck, UserCheck } from "lucide-react";

export const MapSection = () => {
  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          
          <div className="lg:col-span-1 space-y-8">
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
              Наши <span className="text-accent-DEFAULT">склады</span>
            </h2>
            
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-card border border-border hover:border-accent-DEFAULT/30 transition-all">
                <div className="flex items-center gap-3 text-accent-DEFAULT mb-3">
                  <UserCheck size={20} />
                  <span className="font-bold uppercase text-xs tracking-widest">КПП №5 — Курьеры</span>
                </div>
                <p className="text-lg font-bold">ул. Лодочная, д. 5</p>
                <p className="text-sm text-muted-foreground mt-2">Приемка мелкогабаритных грузов и возвратов</p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border hover:border-accent-DEFAULT/30 transition-all">
                <div className="flex items-center gap-3 text-accent-DEFAULT mb-3">
                  <Truck size={20} />
                  <span className="font-bold uppercase text-xs tracking-widest">КПП №6 — Водители</span>
                </div>
                <p className="text-lg font-bold">ул. Лодочная, д. 7</p>
                <p className="text-sm text-muted-foreground mt-2">Разгрузка фур и крупногабаритных паллет</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 h-[500px] rounded-[3rem] overflow-hidden border border-border relative group">
            {/* Overlay для стилизации карты */}
            <div className="absolute inset-0 z-10 pointer-events-none border-[12px] border-card/50 rounded-[3rem]" />
            <iframe 
              src="https://yandex.ru/map-widget/v1/?ll=37.447385%2C55.829531&z=16&pt=37.447385%2C55.829531,pm2blm" 
              width="100%" 
              height="100%" 
              className="grayscale invert opacity-80 contrast-125"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
