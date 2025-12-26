import { NextResponse } from "next/server";

export async function GET() {
  try {
    const API_KEY = process.env.YANDEX_REVIEWS_API_KEY;
    const BUSINESS_ID = process.env.YANDEX_BUSINESS_ID;

    // Если переменные не настроены в Vercel, вернем ошибку
    if (!API_KEY || !BUSINESS_ID) {
      console.error("Missing API Key or Business ID in environment variables");
      return NextResponse.json(
        { error: "Конфигурация сервера не завершена" }, 
        { status: 500 }
      );
    }

    const url = `https://reviews-api.yandex.ru/v1/reviews?key=${API_KEY}&businessId=${BUSINESS_ID}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Кэшируем результат на 1 час
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Yandex API Response Error:", errorText);
      return NextResponse.json(
        { error: "Яндекс API отклонил запрос" }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Возвращаем данные. Если Яндекс вернул массив в поле 'reviews', отдаем его.
    return NextResponse.json(data.reviews || data);
    
  } catch (error: any) {
    console.error("Route Handler Error:", error.message);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" }, 
      { status: 500 }
    );
  }
}
