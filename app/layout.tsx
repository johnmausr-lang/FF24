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
  description: "FF24 — фулфилмент нового поколения. 24-часовой цикл, нулевой брак, API-интеграция. Масштабируйте бизнес без границ. Адрес: ул. Лавочкина, 23, стр. 4, Москва.",
};

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
        <ReactLenis 
          root 
          options={{ 
            lerp: 0.06,           // Плавность торможения
            duration: 1.5,        // Длительность прокрутки
            smoothWheel: true, 
          }}
        >
          <Suspense fallback={<LoadingScreen />}>
            <div className="relative flex flex-col min-h-screen">
              {children}
            </div>
            <ExitIntentPopup />
            <FloatingTelegramButton />
          </Suspense>
        </ReactLenis>
      </body>
    </html>
  );
}
