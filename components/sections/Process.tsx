"use client";

import { motion } from "framer-motion";

const steps = [
  { title: "Заявка", desc: "Оставляете заявку или звоните нам для обсуждения объемов." },
  { title: "Забор товара", desc: "Забираем товар у поставщика или вы привозите его сами." },
  { title: "Приемка и IT", desc: "Принимаем товар, заносим в систему, вы видите остатки." },
  { title: "Подготовка", desc: "Маркируем, упаковываем по стандартам маркетплейсов." },
  { title: "Проверка", desc: "Контрольное взвешивание и проверка штрих-кодов." },
  { title: "Отгрузка", desc: "Формируем поставку и отвозим на склад маркетплейса." },
  { title: "Результат", desc: "Ваш товар в продаже, вы получаете прибыль." },
];

export const Process = () => {
  return (
    <section id="process" className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black italic uppercase mb-20 text-right tracking-tighter">
          Как мы <span className="text-accent-DEFAULT">работаем</span>
        </h2>

        <div className="relative max-w-3xl mx-auto">
          {/* Линия степпера */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-border md:-translate-x-1/2" />

          <div className="space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex items-center justify-between flex-col md:flex-row ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Точка на линии */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-accent-DEFAULT md:-translate-x-1/2 shadow-neon z-10" />

                <div className="w-full md:w-[42%] ml-12 md:ml-0">
                  <div className={`p-8 rounded-[2rem] bg-card border border-border hover:border-accent-DEFAULT/50 transition-all group`}>
                    <span className="text-accent-DEFAULT font-black italic text-sm mb-2 block uppercase tracking-widest">
                      Шаг 0{index + 1}
                    </span>
                    <h3 className="text-2xl font-black uppercase mb-4 italic group-hover:text-glow">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
                <div className="hidden md:block w-[42%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
