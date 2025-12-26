import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
        {/* Фоновый шум/текстура */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-6 logo-3d-container">
               {/* НОВЫЙ ЛОГОТИП В ФУТЕРЕ */}
              <Image
                src="/logo-ff24.png"
                alt="FF24 Logo"
                width={160}
                height={50}
                className="w-auto h-12 logo-3d object-contain origin-left"
              />
            </Link>
            <p className="text-white/50 max-w-md mb-8 leading-relaxed">
              Мы создаем будущее электронной коммерции, предоставляя фулфилмент-решения нового поколения. Скорость, точность и технологии — наш приоритет.
            </p>
            
            <div className="flex gap-4">
                {/* Соцсети - заглушки */}
                {['telegram', 'whatsapp', 'vk'].map(social => (
                    <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-accent-lime hover:border-accent-lime hover:text-black transition-all duration-300 group">
                        <span className="capitalize text-xs font-bold">{social[0]}</span>
                    </a>
                ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Навигация</h4>
            <ul className="space-y-4">
              {["Услуги", "Процесс", "Отзывы", "FAQ", "Контакты"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-white/50 hover:text-accent-lime transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-accent-lime rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Контакты</h4>
            <ul className="space-y-4 text-white/50">
              <li className="flex flex-col">
                <span className="text-xs uppercase text-white/30 font-bold mb-1">Телефон</span>
                <a href="tel:+79990000000" className="hover:text-white transition-colors font-mono">+7 (999) 000-00-00</a>
              </li>
               <li className="flex flex-col">
                <span className="text-xs uppercase text-white/30 font-bold mb-1">Email</span>
                <a href="mailto:hello@ff24.ru" className="hover:text-white transition-colors font-mono">hello@ff24.ru</a>
              </li>
              <li className="flex flex-col">
                 <span className="text-xs uppercase text-white/30 font-bold mb-1">Адрес</span>
                 <span>Москва, ул. Примерная, д. 10</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 font-mono uppercase tracking-wider">
          <p>&copy; {currentYear} FF24 Fulfillment. Все права защищены.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Публичная оферта</Link>
          </div>
        </div>
      </div>
       {/* Большой фоновый текст в футере */}
       <div className="absolute -bottom-10 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03]">
            <h2 className="text-[20vw] font-[1000] italic uppercase leading-none text-white whitespace-nowrap">
                FF24 Future Logistics
            </h2>
       </div>
    </footer>
  );
};
