import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, phone } = await req.json();
    
    // Данные вашего бота (лучше вынести в переменные окружения на Render.com)
    const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    const message = `
🚀 **Новая заявка FF24**
👤 Имя: ${name}
📞 Телефон: ${phone}
    `;

    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
