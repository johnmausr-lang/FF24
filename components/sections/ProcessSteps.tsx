"use client";

import React from "react"; // ← Обязательный импорт для useRef
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, PackageCheck, Truck, ClipboardList, HardHat, CheckCircle2, Factory } from "lucide-react";

const steps = [
  { title: "Заявка", desc: "Регистрация в ЛК и передача ТЗ", icon: <ClipboardList className="w-16 h-16" /> },
  { title: "Забор", desc: "Забираем товар от поставщика или из порта", icon: <Truck className="w-16 h-16" /> },
  { title: "Приёмка", desc: "Сверка артикулов и проверка на брак", icon: <HardHat className="w-16 h-16" /> },
  { title: "Маркировка", desc: "Генерация и наклейка штрих-кодов по ТЗ", icon: <Factory className="w-16 h-16" /> },
  { title: "Упаковка", desc: "Упаковка в короба или паллетирование", icon: <PackageCheck className="w-16 h-16" /> },
  { title: "Отгрузка", desc: "Доставка на склад маркетплейса за 24ч", icon: <Download className="w-16 h-16 rotate-180" /> },
  { title: "Финиш", desc: "Товар доступен к продаже на витрине", icon: <CheckCircle2 className="w-16 h-16" /> },
];

export const ProcessSteps = () => {
  const targetRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-6">
        {/* Заголовок секции */}
        <div className="absolute top-24 left-6 md:left-20 z-10">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter gradient-text"
          >
            Процесс работы
          </motion.h2>
        </div>

        {/* Конвейер карточек */}
        <motion.div style={{ x }} className="flex gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              className="glass-card min-w-[380px] md:min-w-[480px] p-12 group relative overflow-hidden"
            >
              {/* Номер шага на фоне */}
              <div className="absolute -top-8 -left-8 text-9xl font-black italic text-white/5 group-hover:text-accent-lime/10 transition-colors duration-700">
                0{i + 1}
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-10">
                  <div className="w-24 h-24 rounded-3xl glass bg-white/10 border border-white/20 flex items-center justify-center group-hover:border-accent-lime group-hover:bg-accent-lime/10 transition-all duration-500">
                    <div className="text-accent-lime group-hover:scale-110 transition-transform duration-500">
                      {step.icon}
                    </div>
                  </div>
                </div>

                <h3 className="text-4xl md:text-5xl font-black italic uppercase mb-6 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-foreground/80 text-xl leading-relaxed flex-grow">
                  {step.desc}
                </p>
              </div>

              {/* Соединительная линия */}
              {i < steps.length - 1 && (
                <div className="absolute top-1/2 -right-12 w-24 h-1 bg-gradient-to-r from-accent-lime/50 to-transparent hidden md:block" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
