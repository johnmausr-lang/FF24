import "@/app/globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FF24 — Фулфилмент для маркетплейсов",
  description: "Приемка, хранение, упаковка и доставка товаров на маркетплейсы",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
