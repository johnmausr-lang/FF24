import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ReactLenis } from "lenis/react";
import { Suspense } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { FloatingTelegramButton } from "@/components/FloatingTelegramButton";
import { Analytics } from "@vercel/analytics/react";
// Импорт ErrorBoundary как дефолтный экспорт
import ErrorBoundary from "@/components/ErrorBoundary";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "Arial"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ff-24.vercel.app";
const SITE_NAME = "FF24 | Фулфилмент нового поколения";
const SITE_DESCRIPTION = "Автоматизированная логистика для маркетплейсов. Приемка, упаковка и отгрузка за 24 часа. Работаем с Wildberries, Ozon, Yandex.Market";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  keywords: [
    "фулфилмент",
    "логистика",
    "маркетплейсы",
    "wildberries",
    "ozon",
    "yandex market",
    "FF24",
    "автоматизация",
    "доставка",
    "упаковка",
  ],
  authors: [{ name: "FF24 Team" }],
  creator: "FF24",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      addressCountry: "RU",
    },
    sameAs: ["https://t.me/manager24ff"],
  };

  return (
    <html lang="ru" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body 
        className={`${inter.variable} font-sans bg-black text-white antialiased selection:bg-[#E0FF64] selection:text-[#1E1B4B] overflow-x-hidden min-h-screen`}
      >
        <ErrorBoundary>
          <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            <Suspense fallback={<LoadingScreen />}>
              <div className="relative flex flex-col min-h-screen">
                {children}
              </div>
              <ExitIntentPopup />
              <FloatingTelegramButton />
            </Suspense>
          </ReactLenis>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  );
}
