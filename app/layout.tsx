import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FF24 | Фулфилмент для маркетплейсов",
  description: "Полный цикл обработки товаров: приемка, упаковка, доставка на склады WB, Ozon, Яндекс Маркет.",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
