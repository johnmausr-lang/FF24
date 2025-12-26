import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ReactLenis } from "lenis/react";
import { Suspense } from "react";
import { ExitIntentPopup } from "@/components/sections/ExitIntentPopup";
import { FloatingTelegramButton } from "@/components/FloatingTelegramButton";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FF24 | Фулфилмент Нового Поколения",
  description: "Автоматизированная логистика для маркетплейсов. Приемка, упаковка и отгрузка за 24 часа.",
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
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
          {/* ИСПРАВЛЕНО: Убран LoadingScreen из fallback, так как он требует пропсы */}
          <Suspense fallback={<div className="fixed inset-0 bg-black z-[100]" />}>
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
