// app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ReactLenis } from "lenis/react";
import { Suspense } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ExitIntentPopup } from "@/components/ExitIntentPopup"; // Попап при выходе

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FF24 | Фулфилмент Нового Поколения",
  description: "Автоматизированная логистика для маркетплейсов. Приемка, упаковка и отгрузка за 24 часа.",
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
    <html lang="ru" className="scroll-smooth">
      <head />
      <body className={`${inter.className} bg-black text-white antialiased selection:bg-[#E0FF64] selection:text-[#1E1B4B] overflow-x-hidden min-h-screen`}>
        <ReactLenis root>
          <Suspense fallback={<LoadingScreen />}>
            {children}
          </Suspense>
        </ReactLenis>

        {/* Exit-intent попап — работает на всей сайте */}
        <ExitIntentPopup />
      </body>
    </html>
  );
}
