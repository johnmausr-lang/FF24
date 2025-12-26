// app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ReactLenis } from "lenis/react";
import { Suspense } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { FloatingTelegramButton } from "@/components/FloatingTelegramButton";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FF24 | Фулфилмент Нового Поколения",
  description: "Автоматизированная логистика: приемка, упаковка и отгрузка на маркетплейсы за 24 часа. Адрес: ул. Лавочкина, 23, стр. 4, Москва.",
  keywords: ["фулфилмент", "вайлдберриз", "озон", "логистика", "маркетплейсы", "FF24"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth" suppressHydrationWarning>
      <body 
        className={`${inter.variable} font-sans bg-black text-white antialiased selection:bg-[#E0FF64] selection:text-black overflow-x-hidden min-h-screen`}
      >
        {/* НАСТРОЙКА МАКСИМАЛЬНОЙ ПЛАВНОСТИ СКРОЛЛА */}
        <ReactLenis root options={{ 
          lerp: 0.06,           // Чем меньше, тем плавнее (инертнее) скролл
          duration: 1.8,       // Время анимации до полной остановки
          smoothWheel: true, 
          wheelMultiplier: 0.8, // Множитель скорости колеса для мягкости
          touchMultiplier: 1.5,
        }}>
          {/* Главный лоадер проекта */}
          <Suspense fallback={<LoadingScreen />}>
            <div className="relative flex flex-col min-h-screen">
              {children}
            </div>
            
            {/* Глобальные элементы */}
            <ExitIntentPopup />
            <FloatingTelegramButton />
          </Suspense>
        </ReactLenis>
      </body>
    </html>
  );
}
