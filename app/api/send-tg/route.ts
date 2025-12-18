import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { name, contact } = await req.json()

    if (!name || !contact) {
      return NextResponse.json({ error: "name/contact required" }, { status: 400 })
    }

    const token = process.env.TG_BOT_TOKEN
    const chatId = process.env.TG_CHAT_ID

    if (!token || !chatId) {
      return NextResponse.json(
        { error: "TG_BOT_TOKEN or TG_CHAT_ID missing" },
        { status: 500 }
      )
    }

    const text =
      `🟦 FF24 заявка\n` +
      `👤 Имя: ${name}\n` +
      `📞 Контакт: ${contact}\n` +
      `⏱ ${new Date().toLocaleString("ru-RU")}`

    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    })

    if (!r.ok) {
      const e = await r.text().catch(() => "")
      return NextResponse.json({ error: "telegram error", details: e }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "unknown" }, { status: 500 })
  }
}
