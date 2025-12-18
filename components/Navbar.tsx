"use client"

import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur">
      <div className="container h-16 flex items-center justify-between">
        <a href="#top" className="font-semibold tracking-tight">
          FF24
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <a href="#services" className="hover:text-slate-900">Услуги</a>
          <a href="#process" className="hover:text-slate-900">Процесс</a>
          <a href="#calc" className="hover:text-slate-900">Калькулятор</a>
          <a href="#map" className="hover:text-slate-900">Склад</a>
          <a href="#faq" className="hover:text-slate-900">FAQ</a>
        </nav>

        <Button size="sm" onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}>
          Оставить заявку
        </Button>
      </div>
    </header>
  )
}
