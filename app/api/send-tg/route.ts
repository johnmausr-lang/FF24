import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { name, contact } = await req.json()

  const token = process.env.TG_BOT_TOKEN
  const chat = process.env.TG_CHAT_ID

  if (!token || !chat) {
    return NextResponse.json({ error: "env missing" }, { status: 500 })
  }

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chat,
      text: `🟦 FF24 заявка\n👤 ${name}\n📞 ${contact}`,
    }),
  })

  return NextResponse.json({ ok: true })
}
