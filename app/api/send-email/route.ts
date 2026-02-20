import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { LeadFormSchema } from "@/lib/validation";

// Обязательно добавьте эти переменные в файл .env в корне проекта!
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

export async function POST(req: Request) {
  try {
    // 1. Парсим и валидируем входящие данные
    const body = await req.json();
    const validatedData = LeadFormSchema.parse(body);

    // 2. Проверяем наличие настроек SMTP
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !CONTACT_EMAIL) {
      console.error("Ошибка сервера: Не настроены переменные окружения SMTP.");
      return NextResponse.json(
        { error: "Внутренняя ошибка сервера почты. Обратитесь к администратору." },
        { status: 500 }
      );
    }

    // 3. Настраиваем транспорт Nodemailer
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // true для 465, false для других портов
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });

    // 4. Формируем письмо
    const mailOptions = {
      from: `"FF24 Robot" <${SMTP_USER}>`,
      to: CONTACT_EMAIL, // Куда отправлять заявки (ваша почта)
      subject: "🚀 Новая заявка с сайта FF24 Fulfillment",
      text: `
        Поступила новая заявка:
        Имя: ${validatedData.name}
        Телефон: ${validatedData.phone}
        Email: ${validatedData.email || 'Не указан'}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #f4f4f5; border-radius: 10px;">
          <h2 style="color: #18181b;">🚀 Новая заявка с сайта FF24</h2>
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Имя:</strong> ${validatedData.name}</p>
            <p><strong>Телефон:</strong> ${validatedData.phone}</p>
            <p><strong>Email:</strong> ${validatedData.email || 'Не указан'}</p>
          </div>
        </div>
      `,
    };

    // 5. Отправляем письмо
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Заявка успешно отправлена!" },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Ошибка при отправке письма:", error);
    
    // Обработка ошибок валидации Zod
    if (error?.name === "ZodError") {
      return NextResponse.json(
        { error: "Некорректные данные в форме." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Не удалось отправить заявку. Попробуйте связаться с нами в Telegram." },
      { status: 500 }
    );
  }
}
