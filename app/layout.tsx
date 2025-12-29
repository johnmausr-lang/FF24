import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ReactLenis } from "lenis/react";
import { Suspense } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { FloatingTelegramButton } from "@/components/FloatingTelegramButton";

// Настройка шрифта Inter с поддержкой кириллицы
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

// Метаданные проекта
export const metadata: Metadata = {
  title: "FF24 | Фулфилмент Нового Поколения",
  description: "Автоматизированная логистика и складские решения. Адрес: ул. Лавочкина, 23, стр. 4, Москва. Тел: +7 (987) 376-17-22.",
};

// Настройки вьюпорта
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-black text-white antialiased overflow-x-hidden min-h-screen`}>
        {/* Интеграция Lenis для магически плавного скролла */}
        <ReactLenis 
          root 
          options={{ 
            lerp: 0.06,           // Коэффициент плавности торможения
            duration: 1.5,        // Длительность прокрутки в секундах
            smoothWheel: true, 
            wheelMultiplier: 1.1, // Чувствительность колеса мыши
            touchMultiplier: 2    // Чувствительность тач-панелей
          }}
        >
          <Suspense fallback={<LoadingScreen />}>
            <div className="relative flex flex-col min-h-screen">
              {children}
            </div>
            
            {/* Глобальные интерактивные компоненты */}
            <ExitIntentPopup />
            <FloatingTelegramButton />
          </Suspense>
        </ReactLenis>
      </body>
    </html>
  );
}
