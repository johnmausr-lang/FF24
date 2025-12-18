"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function FinalCTA() {
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<null | boolean>(null)
  const [msg, setMsg] = useState<string>("")

  const submit = async () => {
    setLoading(true)
    setOk(null)
    setMsg("")
    try {
      const r = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact }),
      })
      const data = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(data?.error || "Ошибка отправки")
      setOk(true)
      setMsg("Заявка отправлена! Мы свяжемся с вами в ближайшее время.")
      setName("")
      setContact("")
    } catch (e: any) {
      setOk(false)
      setMsg(e?.message ?? "Ошибка")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="cta" className="container">
      <div className="rounded-2xl border border-slate-100 p-6 md:p-10 bg-white">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight">Готовы начать?</h2>
            <p className="text-slate-600">
              Оставьте имя и телефон/Telegram — заявка уйдет в Telegram-бот. :contentReference[oaicite:3]{index=3}
            </p>
            {msg && (
              <div
                className={`rounded-xl p-4 text-sm ${
                  ok ? "bg-emerald-50 text-emerald-900" : "bg-rose-50 text-rose-900"
                }`}
              >
                {msg}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm text-slate-500">Имя</div>
              <input
                className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Иван"
              />
            </div>

            <div className="space-y-2">
              <div className="text-sm text-slate-500">Телефон или Telegram</div>
              <input
                className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="+7... или @username"
              />
            </div>

            <Button size="lg" className="w-full" disabled={loading || !name || !contact} onClick={submit}>
              {loading ? "Отправляю..." : "Отправить заявку"}
            </Button>

            <div className="text-xs text-slate-500">
              Нажимая кнопку, вы соглашаетесь на обработку данных для связи.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
