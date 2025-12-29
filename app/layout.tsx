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
  description: "Автоматизированная логистика, 24-часовой цикл отгрузки и полная API-интеграция. Масштабируйте ваш бизнес с FF24. Адрес: ул. Лавочкина, 23, стр. 4, Москва.",
  openGraph: {
    title: "FF24 — Умный Фулфилмент",
    description: "Логистика, которая масштабирует ваш успех. Нулевой брак, быстрая приемка и интеграция с маркетплейсами.",
    url: "https://ff-24.vercel.app", 
    siteName: "FF24 Fulfillment",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "FF24 Smart Fulfillment Conveyor",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FF24 | Фулфилмент Нового Поколения",
    description: "Автоматизированный складской комплекс в Москве. Быстрая логистика для вашего бренда.",
    images: ["/og-image.jpg"],
  },
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
            lerp: 0.06,           
            duration: 1.5,        
            smoothWheel: true, 
            wheelMultiplier: 1.1, 
            touchMultiplier: 2    
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
