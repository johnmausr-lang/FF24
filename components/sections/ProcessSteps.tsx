"use client";

import { motion } from "framer-motion";
import { ClipboardList, Truck, HardHat, Factory, PackageCheck, Download, CheckCircle2 } from "lucide-react";

const steps = [
  { title: "Заявка", desc: "Регистрация и передача ТЗ", icon: <ClipboardList className="w-12 h-12 text-accent-lime" /> },
  { title: "Забор", desc: "Забираем товар у поставщика", icon: <Truck className="w-12 h-12 text-accent-lime" /> },
  { title: "Приёмка", desc: "Сверка и проверка на брак", icon: <HardHat className="w-12 h-12 text-accent-lime" /> },
  { title: "Маркировка", desc: "Наклейка штрих-кодов по ТЗ", icon: <Factory className="w-12 h-12 text-accent-lime" /> },
  { title: "Упаковка", desc: "Оптимальная упаковка в короба", icon: <PackageCheck className="w-12 h-12 text-accent-lime" /> },
  { title: "Отгрузка", desc: "Доставка на склад МП за 24ч", icon: <Download className="w-12 h-12 text-accent-lime" /> },
  { title: "Финиш", desc: "Товар готов к продаже", icon: <CheckCircle2 className="w-12 h-12 text-accent-lime" /> },
];

export const ProcessSteps = () => {
  return (
    <section className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Процесс работы
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card text-center"
            >
              <div className="mb-6">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-slate-600 text-base">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
