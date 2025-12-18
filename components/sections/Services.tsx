"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const services = [
  { id: "01", title: "Приемка товара", content: "Проверка целостности упаковки, пересчет единиц, сверка с накладной и маркировка коробов." },
  { id: "02", title: "Обработка товара", content: "Проверка на брак, удаление старых этикеток, вложение инструкций или подарков." },
  { id: "03", title: "Упаковка", content: "Подбор коробов, использование бабл-пленки, ПВД-пакетов или термоусадки согласно регламентам МП." },
  { id: "04", title: "Логистика до маркетплейсов", content: "Ежедневные отгрузки на склады Wildberries, Ozon и Яндекс Маркет (FBO/FBS)." },
  { id: "05", title: "Хранение", content: "Теплый охраняемый склад с адресным хранением и круглосуточным видеонаблюдением." },
  { id: "06", title: "Забор товара", content: "Заберем ваш груз от поставщика, из ТК (Тяк-Москва, Южные ворота) или вашего склада." },
  { id: "07", title: "Прочие услуги", content: "Создание карточек товара, фуд-съемка, работа с возвратами и утилизация." },
];

export const Services = () => {
  const [activeId, setActiveId] = useState<string | null>("01");

  return (
    <section id="services" className="py-24 bg-card/30">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-black italic uppercase mb-16 tracking-tighter">
          Наши <span className="text-accent-DEFAULT">услуги</span>
        </h2>

        <div className="grid gap-4 max-w-4xl">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="border-b border-border last:border-0"
            >
              <button
                onClick={() => setActiveId(activeId === service.id ? null : service.id)}
                className="w-full py-8 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-6">
                  <span className="text-accent-DEFAULT font-black italic text-xl opacity-50">
                    {service.id}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold uppercase group-hover:text-accent-DEFAULT transition-colors">
                    {service.title}
                  </h3>
                </div>
                {activeId === service.id ? <Minus className="text-accent-DEFAULT" /> : <Plus />}
              </button>

              <AnimatePresence>
                {activeId === service.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-muted-foreground text-lg max-w-2xl">
                      {service.content}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
