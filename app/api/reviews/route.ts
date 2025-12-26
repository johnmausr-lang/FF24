import { NextResponse } from "next/server";

export async function GET() {
  try {
    const API_KEY = process.env.YANDEX_REVIEWS_API_KEY;
    const BUSINESS_ID = process.env.YANDEX_BUSINESS_ID;

    if (!API_KEY || !BUSINESS_ID) {
      return NextResponse.json([]);
    }

    const url = `https://reviews-api.yandex.ru/v1/reviews?key=${API_KEY}&businessId=${BUSINESS_ID}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 3600 } 
    });

    if (!response.ok) {
      console.error(`Yandex API Error: ${response.status}`);
      return NextResponse.json([]); // Возвращаем пустой массив, чтобы не падал билд
    }

    const data = await response.json();
    return NextResponse.json(data.reviews || []);
    
  } catch (error) {
    return NextResponse.json([]);
  }
}
