"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Terminal() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")

    try {
      const r = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact }),
      })

      if (!r.ok) throw new Error("send error")
      setStatus("success")
      setName("")
      setContact("")
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="py-24 bg-black text-white">
      <div className="container max-w-xl">
        {status === "success" ? (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
            <h3 className="text-2xl font-bold">Заявка отправлена</h3>
            <p className="text-slate-400">Мы свяжемся с вами в Telegram</p>
          </motion.div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Имя"
              required
              className="w-full bg-white/10 rounded-lg px-4 h-12"
            />
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Телефон или @telegram"
              required
              className="w-full bg-white/10 rounded-lg px-4 h-12"
            />

            <Button disabled={status === "sending"} className="w-full h-12">
              {status === "sending" ? "Отправка..." : "Отправить заявку"}
            </Button>

            {status === "error" && (
              <div className="text-red-400 text-sm">Ошибка отправки</div>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
