import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  display: 'swap', 
});

export const metadata: Metadata = {
  title: "FF24 | Фулфилмент Нового Поколения",
  description: "Автоматизированная логистика для маркетплейсов. Приемка, упаковка и отгрузка за 24 часа.",
  manifest: "/manifest.json", // Необязательно, если нет файла
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
      <body className={`${inter.className} bg-black text-white antialiased selection:bg-accent-DEFAULT selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
