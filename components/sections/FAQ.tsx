"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqData = [
  {
    question: "Как вы работаете с браком?",
    answer: "При обнаружении брака на этапе приемки или упаковки товар немедленно фотографируется и заносится в систему со статусом 'Брак'. Мы предоставляем детальный отчет в API, а сам товар перемещается в выделенную зону карантина для последующего возврата поставщику или утилизации по вашему распоряжению."
  },
  {
    question: "Какая минимальная партия для работы?",
    answer: "Мы работаем с бизнесом любого масштаба. У нас нет жестких ограничений по минимальному объему — вы можете начать даже с одной коробки. Мы помогаем малым брендам масштабироваться до федеральных масштабов без лишних барьеров."
  },
  {
    question: "Есть ли интеграция с Wildberries и Ozon?",
    answer: "Да, у нас реализована прямая API-интеграция со всеми крупными маркетплейсами: Wildberries, Ozon и Яндекс.Маркет. Остатки обновляются автоматически каждые 15 минут, что полностью исключает риск отмены заказов из-за отсутствия товара."
  },
  {
    question: "Сколько времени занимает приемка товара?",
    answer: "Стандартное время приемки — до 24 часов с момента прибытия машины на склад. В этот срок входит выгрузка, сверка артикулов, визуальный контроль качества и заведение остатков в вашу систему учета."
  },
  {
    question: "Какие у вас тарифы на хранение?",
    answer: "Тарификация прозрачна: вы платите только за фактически занимаемый объем (паллето-места или ячейки). Мы не берем скрытых комиссий за 'вход' или 'выход' — стоимость логистики фиксируется в договоре и не меняется."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 relative overflow-hidden bg-black">
      <div className="container relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6">
            Остались <span className="text-accent-lime text-neon">вопросы?</span>
          </h2>
        </motion.div>

        <div className="space-y-4 text-left w-full">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className="glass-card !rounded-[2rem] border-white/5 overflow-hidden transition-all duration-500 hover:border-accent-lime/20"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-8 flex items-center justify-between text-left"
              >
                <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-white/90">
                  {item.question}
                </span>
                <div className={`p-2 rounded-full border border-white/10 transition-transform duration-500 ${openIndex === index ? "rotate-180 bg-accent-lime text-black" : "text-white"}`}>
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-8 pb-8"
                  >
                    <p className="text-white/50 text-base leading-relaxed font-medium">
                      {item.answer}
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
