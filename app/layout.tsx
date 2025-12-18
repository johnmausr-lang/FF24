// app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ReactLenis } from "lenis/react";
import { Suspense } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";

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
      <head>
        {/* Фикс белого флэша — работает на Vercel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.style.backgroundColor = '#000000';
                document.body.style.backgroundColor = '#000000';
                
                const root = document.documentElement;
                root.style.setProperty('--background', '240 10% 3.9%');
                root.style.setProperty('--foreground', '0 0% 98%');
                root.style.setProperty('--accent-DEFAULT', '217 91% 60%');
                root.style.setProperty('--card', '240 10% 3.9%');
                root.style.setProperty('--card-foreground', '0 0% 98%');
                root.style.setProperty('--border', '240 3.7% 15.9%');
              })();
            `,
          }}
        />
      </head>

      <body
        className={`${inter.className} bg-black text-white antialiased selection:bg-[#2563EB] selection:text-black overflow-x-hidden`}
      >
        <ReactLenis
          root
          options={{
            lerp: 0.1,              // Основная плавность (меньше = плавнее)
            wheelMultiplier: 1,     // Скорость скролла колесом
            touchMultiplier: 1.5,   // Скорость на тач-устройствах (чуть быстрее для естественности)
            // infinite: false,     // Бесконечный скролл (если нужно — включи)
          }}
        >
          <Suspense fallback={<LoadingScreen />}>
            {children}
          </Suspense>
        </ReactLenis>
      </body>
    </html>
  );
}
