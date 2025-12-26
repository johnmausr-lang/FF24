import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Ваш API ключ для Яндекс Отзывов
    const API_KEY = "780fdc73-834e-45e1-801a-f59112bf5915";
    
    // Вставьте сюда ID вашего бизнеса в Яндекс Картах
    // Обычно его можно найти в ссылке на вашу организацию
    const BUSINESS_ID = "ВАШ_BUSINESS_ID_ТУТ"; 

    // ВНИМАНИЕ: URL ниже — примерный. 
    // Яндекс может требовать конкретный метод (Business API или Widgets API)
    const response = await fetch(
      `https://reviews-api.yandex.ru/v1/reviews?key=${API_KEY}&businessId=${BUSINESS_ID}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 }, // Кэшируем отзывы на 1 час, чтобы не спамить в API
      }
    );

    if (!response.ok) {
      throw new Error("Ошибка при получении данных от Яндекса");
    }

    const data = await response.json();
    
    // Возвращаем данные на фронтенд
    return NextResponse.json(data);
  } catch (error) {
    console.error("Reviews API Error:", error);
    return NextResponse.json(
      { error: "Не удалось загрузить отзывы" },
      { status: 500 }
    );
  }
}
