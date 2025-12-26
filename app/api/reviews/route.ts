import { NextResponse } from "next/server";

export async function GET() {
  try {
    const API_KEY = process.env.YANDEX_REVIEWS_API_KEY;
    const BUSINESS_ID = process.env.YANDEX_BUSINESS_ID;

    if (!API_KEY || !BUSINESS_ID) {
      return NextResponse.json({ error: "Конфигурация API не найдена" }, { status: 500 });
    }

    // Запрос к API Яндекс.Отзывов
    const response = await fetch(
      `https://reviews-api.yandex.ru/v1/reviews?key=${API_KEY}&businessId=${BUSINESS_ID}`,
      {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 3600 }, // Кэш на 1 час
      }
    );

    if (!response.ok) {
      throw new Error(`Yandex API Error: ${response.status}`);
    }

    const data = await response.json();
    
    // Возвращаем только список отзывов для удобства фронтенда
    // Обычно структура выглядит так: { reviews: [...] }
    return NextResponse.json(data.reviews || []);
    
  } catch (error) {
    console.error("Ошибка в роуте отзывов:", error);
    return NextResponse.json({ error: "Ошибка загрузки данных" }, { status: 500 });
  }
}
