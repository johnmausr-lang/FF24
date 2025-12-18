import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ReactLenis } from "@studio-freight/lenis";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Suspense } from "react";

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
      <body
        className={`${inter.className} bg-black text-white antialiased selection:bg-[#2563EB] selection:text-black`}
        style={{ backgroundColor: "#000000" }}
      >
        {/* Принудительно задаём CSS-переменные до загрузки Tailwind */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.style.setProperty('--background', '240 10% 3.9%');
                document.documentElement.style.setProperty('--foreground', '0 0% 98%');
                document.documentElement.style.setProperty('--accent-DEFAULT', '217 91% 60%');
                document.documentElement.style.setProperty('--card', '240 10% 3.9%');
                document.documentElement.style.setProperty('--card-foreground', '0 0% 98%');
                document.documentElement.style.setProperty('--border', '240 3.7% 15.9%');
              })();
            `,
          }}
        />

        <ReactLenis root options={{ smoothWheel: true, smoothTouch: true }}>
          <Suspense fallback={<LoadingScreen />}>
            {children}
          </Suspense>
        </ReactLenis>
      </body>
    </html>
  );
}
