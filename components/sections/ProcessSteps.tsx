"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ClipboardList, Truck, HardHat, Factory, PackageCheck, Download, CheckCircle2 } from "lucide-react";

const steps = [
  { title: "Заявка", desc: "Регистрация и передача ТЗ", icon: <ClipboardList className="w-16 h-16" /> },
  { title: "Забор", desc: "Забираем товар у поставщика", icon: <Truck className="w-16 h-16" /> },
  { title: "Приёмка", desc: "Сверка и проверка на брак", icon: <HardHat className="w-16 h-16" /> },
  { title: "Маркировка", desc: "Наклейка штрих-кодов по ТЗ", icon: <Factory className="w-16 h-16" /> },
  { title: "Упаковка", desc: "Оптимальная упаковка в короба", icon: <PackageCheck className="w-16 h-16" /> },
  { title: "Отгрузка", desc: "Доставка на склад МП за 24ч", icon: <Download className="w-16 h-16 rotate-180" /> },
  { title: "Финиш", desc: "Товар готов к продаже", icon: <CheckCircle2 className="w-16 h-16" /> },
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
        <div className="absolute top-24 left-6 md:left-20 z-10">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white"
          >
            Процесс работы
          </motion.h2>
        </div>

        <motion.div style={{ x }} className="flex gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="glass-card min-w-[380px] md:min-w-[480px] p-12 group relative"
            >
              <div className="absolute -top-8 -left-8 text-9xl font-black italic text-white/5 group-hover:text-accent-lime/10 transition-colors">
                0{i + 1}
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-10">
                  <div className="w-24 h-24 rounded-3xl glass bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent-lime transition-all">
                    <div className="text-white/80 group-hover:text-accent-lime transition-colors">
                      {step.icon}
                    </div>
                  </div>
                </div>

                <h3 className="text-4xl md:text-5xl font-black italic uppercase mb-6 text-white">
                  {step.title}
                </h3>

                <p className="text-white/70 text-xl leading-relaxed flex-grow">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
