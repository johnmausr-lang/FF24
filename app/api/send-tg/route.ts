import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone } = body;
    
    // Валидация входных данных
    if (!name || !phone) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" }, 
        { status: 400 }
      );
    }

    const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TOKEN || !CHAT_ID) {
      console.error("Telegram credentials missing in environment variables");
      return NextResponse.json(
        { ok: false, error: "Server configuration error" }, 
        { status: 500 }
      );
    }

    const message = `
🚀 **Новая заявка FF24**

👤 Имя: ${name}
📞 Телефон: ${phone}

#заявка #фулфилмент
    `;

    const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Telegram API error:", errorData);
      throw new Error("Failed to send message to Telegram");
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error" }, 
      { status: 500 }
    );
  }
}
