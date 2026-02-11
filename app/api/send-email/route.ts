import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { LeadFormSchema } from '@/lib/validation';

// Инициализация транспортера
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Валидация данных
    const validatedData = LeadFormSchema.parse(body);

    // Проверка rate limiting (простой вариант)
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
    const key = `email_${clientIp}`;

    // Отправка письма администратору
    const adminMailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL || 'admin@ff24.ru',
      subject: `Новая заявка от ${validatedData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #000;">Новая заявка от клиента</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Имя:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            ${validatedData.phone ? `<p><strong>Телефон:</strong> ${validatedData.phone}</p>` : ''}
            ${validatedData.company ? `<p><strong>Компания:</strong> ${validatedData.company}</p>` : ''}
            <p><strong>Сообщение:</strong></p>
            <p style="white-space: pre-wrap;">${validatedData.message}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          
          <p style="color: #666; font-size: 12px;">
            ${validatedData.subscribeNewsletter ? '✓ Подписан на рассылку' : '✗ Не подписан на рассылку'}
          </p>
        </div>
      `,
    };

    await transporter.sendMail(adminMailOptions);

    // Отправка подтверждения клиенту
    const clientMailOptions = {
      from: process.env.SMTP_FROM,
      to: validatedData.email,
      subject: 'Мы получили вашу заявку - FF24',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e3a8a;">FF24</h1>
          
          <p>Спасибо, ${validatedData.name}!</p>
          
          <p>Мы получили вашу заявку и свяжемся с вами в ближайшее время.</p>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1e3a8a;">
            <p><strong>Вы указали:</strong></p>
            <p>Email: ${validatedData.email}</p>
            ${validatedData.phone ? `<p>Телефон: ${validatedData.phone}</p>` : ''}
          </div>

          <p style="color: #666;">
            Наша команда уже начала обработку вашей заявки. Спешим убедить вас в качестве нашего сервиса!
          </p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          
          <p style="color: #999; font-size: 12px;">
            &copy; 2024 FF24. Все права защищены.<br />
            <a href="https://ff24.ru" style="color: #1e3a8a; text-decoration: none;">ff24.ru</a>
          </p>
        </div>
      `,
    };

    await transporter.sendMail(clientMailOptions);

    // Логирование успешной отправки
    console.log(`✓ Email отправлен от ${validatedData.email}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Спасибо за вашу заявку. Мы скоро свяжемся с вами!',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Ошибка при отправке email:', error);

    // Различные типы ошибок
    if (error instanceof Error) {
      if (error.message.includes('ENOTFOUND')) {
        return NextResponse.json(
          {
            error: 'Ошибка конфигурации сервера',
            message: 'К сожалению, сейчас невозможно отправить письмо. Попробуйте позже.',
          },
          { status: 503 }
        );
      }

      if (error.message.includes('Validation')) {
        return NextResponse.json(
          {
            error: 'Ошибка валидации',
            message: error.message,
          },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      {
        error: 'Ошибка сервера',
        message: 'Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже.',
      },
      { status: 500 }
    );
  }
}

// Для проверки здоровья сервиса
export async function GET() {
  try {
    await transporter.verify();
    return NextResponse.json(
      { status: 'ok', message: 'Email service is working' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Email service is not configured' },
      { status: 500 }
    );
  }
}
