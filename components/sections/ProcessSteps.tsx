"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ClipboardList,
  Truck,
  HardHat,
  Factory,
  PackageCheck,
  Download,
  CheckCircle2,
  Package, // Иконка для "груза"
} from "lucide-react";
import { GlassVideo } from "@/components/ui/GlassVideo"; // Используем наш компонент GlassVideo

const steps = [
  { title: "Заявка", desc: "Регистрация и передача ТЗ", icon: <ClipboardList size={48} /> },
  { title: "Забор", desc: "Забираем товар у поставщика", icon: <Truck size={48} /> },
  { title: "Приёмка", desc: "Сверка и проверка на брак", icon: <HardHat size={48} /> },
  { title: "Маркировка", desc: "Наклейка штрих-кодов по ТЗ", icon: <Factory size={48} /> },
  { title: "Упаковка", desc: "Оптимальная упаковка в короба", icon: <PackageCheck size={48} /> },
  { title: "Отгрузка", desc: "Доставка на склад МП за 24ч", icon: <Download size={48} className="rotate-180" /> },
  { title: "Финиш", desc: "Товар готов к продаже", icon: <CheckCircle2 size={48} /> },
];

export const ProcessSteps = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"], // Отслеживаем весь элемент от появления до полного исчезновения
  });

  // Управляем горизонтальным сдвигом карточек
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]); // Начало и конец сдвига для карточек

  // Управляем позицией "груза" по линии
  // Линия начинается справа от первого элемента и заканчивается после последнего
  const cargoX = useTransform(scrollYProgress, [0, 1], ["-10%", "90%"]); // Примерные значения, нужно будет подстроить
  const cargoOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]); // Появление/исчезновение груза

  return (
    <section id="process" ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Фоновый градиент для подсветки стекла */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[50%] bg-accent-lime/5 blur-[120px] rounded-full" />

        <div className="container mb-20 absolute top-20 left-1/2 -translate-x-1/2 z-20">
          <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter">
            Цикл <span className="text-accent-lime italic">FF24</span>
          </h2>
        </div>

        {/* Контейнер для линии и груза */}
        <div className="absolute inset-0 flex items-center justify-start z-10 px-12 md:px-[10vw]">
          {/* Анимированная неоновая линия */}
          <motion.div
            style={{ x: xTransform }}
            className="absolute left-0 w-[160%] h-[2px] bg-gradient-to-r from-transparent via-accent-lime/70 to-transparent shadow-[0_0_20px_rgba(224,255,100,0.4)]"
          />

          {/* Анимированный "груз" */}
          <motion.div
            style={{
              x: cargoX,
              opacity: cargoOpacity,
            }}
            className="absolute -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full glass bg-accent-lime flex items-center justify-center text-black shadow-[0_0_25px_rgba(224,255,100,0.8)]"
          >
            <Package size={24} />
          </motion.div>
        </div>


        <motion.div style={{ x: xTransform }} className="flex gap-8 px-12 md:px-[10vw] relative z-20">
          {steps.map((step, i) => {
            // Отслеживаем, насколько близко "груз" к текущей карточке
            const opacityCard = useTransform(scrollYProgress,
              [(i * 0.1), (i * 0.1) + 0.05, (i * 0.1) + 0.15, (i * 0.1) + 0.2], // Диапазон скролла для активации
              [0.8, 1, 1, 0.8] // От 80% до 100% и обратно
            );

            return (
              <motion.div
                key={i}
                style={{ opacity: opacityCard }} // Применяем динамическую прозрачность
                className="relative min-w-[350px] md:min-w-[500px] h-[450px] rounded-[3rem] p-[2px] overflow-hidden group"
              >
                {/* Видео-подложка для карточки */}
                <GlassVideo
                  src="/videos/process-bg.webm" // Используем видео для процесса
                  opacity={0.3}
                  blur="blur-[40px]"
                  overlayColor="bg-black/50"
                  playbackRate={0.7}
                />

                {/* Анимированная рамка (Border Glow) */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-accent-lime/20 group-hover:via-accent-lime/30 transition-all duration-700" />

                {/* Тело карточки — усиленное Жидкое Стекло */}
                <div className="relative h-full w-full bg-white/[0.07] backdrop-blur-[50px] rounded-[3rem] p-12 flex flex-col justify-between border border-white/10">
                  <div className="flex justify-between items-start">
                    <div className="w-20 h-20 rounded-3xl glass bg-white/10 flex items-center justify-center text-accent-lime group-hover:bg-accent-lime group-hover:text-black transition-all duration-500 shadow-[0_0_30px_rgba(224,255,100,0.1)]">
                      {step.icon}
                    </div>
                    <span className="text-7xl font-black italic opacity-5 group-hover:opacity-10 transition-opacity">
                      0{i + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-3xl md:text-4xl font-black italic uppercase mb-4 text-white group-hover:text-accent-lime transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-white/50 text-xl font-medium leading-relaxed uppercase tracking-tight">
                      {step.desc}
                    </p>
                  </div>

                  {/* Индикатор прогресса внизу карточки (можно убрать, если не нужен) */}
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 2, delay: 0.5 }}
                      className="h-full bg-accent-lime shadow-[0_0_15px_#E0FF64]"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
