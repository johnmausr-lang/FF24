import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google"; // Импорт шрифта

// 1. Объявляем переменную шрифта (это то, что потерялось)
const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  display: 'swap', 
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
    <html lang="ru" className="scroll-smooth" style={{ backgroundColor: '#000000' }}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.style.backgroundColor = '#000000';
                document.documentElement.style.setProperty('--background', '240 10% 3.9%');
                document.documentElement.style.setProperty('--accent-DEFAULT', '217 91% 60%');
              })();
            `,
          }}
        />
      </head>
      <body 
        className={`${inter.className} bg-black text-white antialiased`}
        style={{ backgroundColor: '#000000' }}
      >
        {children}
      </body>
    </html>
  );
}
