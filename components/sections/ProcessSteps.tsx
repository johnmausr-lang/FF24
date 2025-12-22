"use client";

import { motion } from "framer-motion";
import { 
  ClipboardList, Truck, HardHat, Factory, 
  PackageCheck, Download, CheckCircle2 
} from "lucide-react";

const steps = [
  { title: "Заявка", desc: "Регистрация и передача ТЗ" },
  { title: "Забор", desc: "Забираем товар у поставщика" },
  { title: "Приёмка", desc: "Сверка и проверка на брак" },
  { title: "Маркировка", desc: "Наклейка штрих-кодов по ТЗ" },
  { title: "Упаковка", desc: "Оптимальная упаковка в короба" },
  { title: "Отгрузка", desc: "Доставка на склад МП за 24ч" },
  { title: "Финиш", desc: "Товар готов к продаже" },
];

const doubledSteps = [...steps, ...steps, ...steps]; // для бесконечности

export const ProcessSteps = () => {
  return (
    <section id="process" className="relative py-32 bg-black overflow-hidden">
      <div className="container relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white mb-20"
        >
          КОНВЕЙЕР <span className="text-accent-lime">FF24</span>
        </motion.h2>
      </div>

      {/* 3D Конвейер */}
      <div className="relative perspective-2000">
        <div className="rotate-x-15 translate-z-0">
          {/* Лента конвейера */}
          <div className="relative h-32 md:h-48 overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black to-transparent opacity-70" />
            <div className="absolute inset-x-0 bottom-4 h-4 bg-accent-lime/30 blur-xl animate-pulse" />
            <div className="absolute inset-x-0 bottom-6 h-1 bg-accent-lime shadow-[0_0_40px_#E0FF64] animate-conveyor" />

            {/* Карточки на конвейере */}
            <div className="flex gap-8 animate-conveyor-slow">
              {doubledSteps.map((step, i) => (
                <motion.div
                  key={i}
                  className="glass-card min-w-[300px] md:min-w-[380px] flex-shrink-0 group"
                  whileHover={{ y: -20, scale: 1.05, transition: { duration: 0.6 } }}
                >
                  <div className="p-10 text-center">
                    <h3 className="text-2xl md:text-3xl font-black uppercase mb-4 text-white">
                      {step.title}
                    </h3>
                    <p className="text-white/70 text-base md:text-lg text-tight">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes conveyor {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes conveyor-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        .animate-conveyor {
          animation: conveyor 20s linear infinite;
        }

        .animate-conveyor-slow {
          animation: conveyor-slow 60s linear infinite;
        }

        .perspective-2000 {
          perspective: 2000px;
        }

        .rotate-x-15 {
          transform: rotateX(15deg);
        }
      `}</style>
    </section>
  );
};
