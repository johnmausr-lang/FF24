"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, PackageCheck, Truck, ClipboardList, HardHat, CheckCircle2, Factory } from "lucide-react";

const steps = [
  { title: "Заявка", desc: "Регистрация в ЛК и передача ТЗ", icon: <ClipboardList /> },
  { title: "Забор", desc: "Забираем товар от поставщика или из порта", icon: <Truck /> },
  { title: "Приемка", desc: "Сверка артикулов и проверка на брак", icon: <HardHat /> },
  { title: "Маркировка", desc: "Генерация и наклейка штрих-кодов по ТЗ", icon: <Factory /> },
  { title: "Упаковка", desc: "Упаковка в короба или паллетирование", icon: <PackageCheck /> },
  { title: "Отгрузка", desc: "Доставка на склад маркетплейса за 24ч", icon: <Download className="rotate-180" /> },
  { title: "Финиш", desc: "Товар доступен к продаже на витрине", icon: <CheckCircle2 /> },
];

export const ProcessSteps = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Эффект горизонтального движения ленты
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute top-24 left-6 md:left-20">
          <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter">
            Путь вашего <br /> <span className="text-accent-DEFAULT">товара</span>
          </h2>
          <div className="mt-4 flex items-center gap-2 text-slate-500 font-bold uppercase text-xs tracking-[0.3em]">
            <span className="w-8 h-[1px] bg-slate-500" /> Скролльте вниз
          </div>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-20">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className="group relative flex flex-col justify-center min-w-[300px] md:min-w-[450px] aspect-video bg-card border border-white/5 rounded-[3rem] p-10 hover:border-accent-DEFAULT/50 transition-colors overflow-hidden"
            >
              {/* Номер шага на фоне */}
              <div className="absolute -bottom-10 -right-5 text-[12rem] font-black italic text-white/[0.02] group-hover:text-accent-DEFAULT/[0.05] transition-colors leading-none">
                0{i + 1}
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-accent-DEFAULT/10 border border-accent-DEFAULT/20 flex items-center justify-center text-accent-DEFAULT mb-8 group-hover:scale-110 group-hover:bg-accent-DEFAULT group-hover:text-black transition-all duration-500">
                  {step.icon}
                </div>
                <h3 className="text-3xl font-black italic uppercase mb-4">{step.title}</h3>
                <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-[280px]">
                  {step.desc}
                </p>
              </div>

              {/* Соединительная линия (конвейер) */}
              {i !== steps.length - 1 && (
                <div className="absolute top-1/2 -right-4 w-8 h-[2px] bg-gradient-to-r from-accent-DEFAULT/50 to-transparent hidden md:block" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
