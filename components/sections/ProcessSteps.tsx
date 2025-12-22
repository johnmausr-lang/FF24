"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ClipboardList, Truck, HardHat, Factory, 
  PackageCheck, Download, CheckCircle2, Settings 
} from "lucide-react";

const steps = [
  { title: "Заявка", desc: "Регистрация технического задания" },
  { title: "Забор", desc: "Логистика от поставщика на склад" },
  { title: "Приёмка", desc: "Проверка на брак и количество" },
  { title: "Маркировка", desc: "Печать и оклейка Честным Знаком" },
  { title: "Упаковка", desc: "Подготовка по стандартам маркетплейсов" },
  { title: "Отгрузка", desc: "Доставка на склады WB/Ozon" },
  { title: "Финиш", desc: "Товар готов к первым продажам" },
];

const icons = [
  <ClipboardList key="1" />, <Truck key="2" />, <HardHat key="3" />, 
  <Factory key="4" />, <PackageCheck key="5" />, <Download key="6" />, <CheckCircle2 key="7" />
];

// Дублируем массив для бесшовности
const doubledSteps = [...steps, ...steps];

export const ProcessSteps = () => {
  return (
    <section id="process" className="relative py-40 bg-black overflow-hidden h-[950px] flex flex-col justify-center">
      
      {/* Заголовок */}
      <div className="container relative z-50 mb-24">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none"
        >
          ЛИНИЯ <span className="text-accent-lime text-outline-white">FF24</span>
        </motion.h2>
      </div>

      {/* 3D Сцена */}
      <div className="relative w-full perspective-3000 preserve-3d">
        
        {/* КОРПУС КОНВЕЙЕРА (СТАНИНА) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[140%] h-[400px] z-10 preserve-3d rotate-x-25">
          {/* Верхняя панель (стекло) */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent border-t border-white/10 rounded-[6rem] backdrop-blur-sm" />
          
          {/* Боковая грань (дает толщину) */}
          <div className="absolute -bottom-12 left-0 w-full h-24 bg-gradient-to-b from-white/10 to-transparent border-x border-white/5 opacity-50" />

          {/* Неоновый индикатор (рельс движения) */}
          <div className="absolute bottom-16 left-0 w-full h-[1px] bg-accent-lime/20">
            <motion.div 
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-1/3 h-full bg-accent-lime shadow-[0_0_35px_#E0FF64]"
            />
          </div>
        </div>

        {/* ЛЕНТА С КАРТОЧКАМИ */}
        <div className="relative z-40 flex overflow-hidden py-32 mask-conveyor rotate-x-25 preserve-3d">
          <div className="flex gap-12 animate-conveyor-loop hover:pause-state">
            {doubledSteps.map((step, i) => (
              <div
                key={i}
                className="relative min-w-[350px] h-[450px] group preserve-3d"
              >
                {/* Тень под карточкой */}
                <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-2/3 h-12 bg-black/80 blur-2xl group-hover:bg-accent-lime/10 transition-colors duration-500" />
                
                {/* Сама карточка */}
                <div className="relative h-full w-full rounded-[3.5rem] p-[1px] bg-white/5 border border-white/10 backdrop-blur-3xl group-hover:border-accent-lime/40 group-hover:-translate-y-10 transition-all duration-700 ease-[0.23,1,0.32,1]">
                  
                  {/* Стеклянный градиент внутри */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] to-transparent" />
                  
                  <div className="relative z-10 p-12 h-full flex flex-col">
                    {/* Иконка и номер */}
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-accent-lime/10 flex items-center justify-center text-accent-lime border border-accent-lime/20 shadow-[inset_0_0_15px_rgba(224,255,100,0.1)]">
                        {icons[i % 7]}
                      </div>
                      <span className="text-[10px] font-mono text-white/20 tracking-[0.3em]">NODE_0{i % 7 + 1}</span>
                    </div>

                    {/* Текст */}
                    <div className="space-y-4">
                      <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-white/40 text-sm uppercase leading-relaxed tracking-wide">
                        {step.desc}
                      </p>
                    </div>

                    {/* Нижний статус */}
                    <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
                          <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Processing</span>
                       </div>
                       <Settings size={14} className="text-white/10 animate-spin-slow" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Стили для маскировки краев и 3D */}
      <style jsx>{`
        .mask-conveyor {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
        .rotate-x-25 {
          transform: rotateX(25deg);
        }
        .pause-state:hover {
          animation-play-state: paused;
        }
        .text-outline-white {
          -webkit-text-stroke: 1px rgba(255,255,255,0.2);
          color: transparent;
        }
      `}</style>
    </section>
  );
};
