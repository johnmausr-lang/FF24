import { NextResponse } from "next/server";

export async function GET() {
  try {
    const API_KEY = process.env.YANDEX_REVIEWS_API_KEY;
    const BUSINESS_ID = process.env.YANDEX_BUSINESS_ID;

    // Если переменные не настроены, возвращаем пустой массив, чтобы сайт не падал
    if (!API_KEY || !BUSINESS_ID) {
      console.warn("⚠️ API ключи не найдены в Environment Variables");
      return NextResponse.json([]);
    }

    // ВАЖНО: Используем актуальный формат URL
    const url = `https://reviews-api.yandex.ru/v1/reviews?key=${API_KEY}&businessId=${BUSINESS_ID}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 3600 } 
    });

    // Если Яндекс вернул 404 или другую ошибку
    if (!response.ok) {
      console.error(`❌ Яндекс API вернул статус: ${response.status}`);
      // Возвращаем пустой массив вместо ошибки 500
      return NextResponse.json([]);
    }

    const data = await response.json();
    
    // Яндекс обычно возвращает объект с полем 'reviews'
    const reviews = Array.isArray(data.reviews) ? data.reviews : [];
    return NextResponse.json(reviews);
    
  } catch (error: any) {
    console.error("Internal Server Error:", error.message);
    return NextResponse.json([], { status: 200 }); // Возвращаем пустой список при любой ошибке
  }
}
