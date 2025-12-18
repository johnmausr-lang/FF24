import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Подключаем современный шрифт
const inter = Inter({ subsets: ["latin", "cyrillic"] });

// Настройки метаданных для SEO
export const metadata: Metadata = {
  title: "FF24 | Фулфилмент для маркетплейсов",
  description: "Профессиональный фулфилмент для WB, Ozon и Яндекс Маркет. Заберем, упакуем и доставим ваш товар за 24 часа.",
  keywords: ["фулфилмент", "маркетплейсы", "логистика", "склад", "FF24", "WB", "Ozon"],
  authors: [{ name: "FF24 Team" }],
  icons: {
    icon: "/favicon.ico", // Убедитесь, что файл есть в папке public или удалите строку
  },
};

// Исправленная настройка Viewport для Next.js 14+ 
// Это уберет ошибки при деплое на Vercel
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1A0B2E", // Цвет шапки в мобильных браузерах
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
