import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin", "cyrillic"], display: 'swap' });

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="scroll-smooth" style={{ backgroundColor: '#000000' }}>
      <head>
        {/* Инъекция стилей для предотвращения вспышки белого */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const root = document.documentElement;
                root.style.backgroundColor = '#000000';
                document.body.style.backgroundColor = '#000000';
                root.style.setProperty('--background', '240 10% 3.9%');
                root.style.setProperty('--accent-DEFAULT', '217 91% 60%');
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
