// app/data/pricing.ts

export type ServiceCategory =
  | "receiving"
  | "processing"
  | "packing"
  | "logistics"
  | "storage"
  | "pickup"
  | "other"

export interface PriceItem {
  title: string
  price: number
  unit: "шт" | "паллет" | "м3" | "короб" | "сутки" | "фикс"
}

export const PRICING: Record<ServiceCategory, PriceItem[]> = {
  receiving: [
    { title: "Приемка в коробах / мешками", price: 50, unit: "шт" },
    { title: "Механизированная приемка (паллет)", price: 500, unit: "шт" },
    { title: "Снятие обрешетки с короба", price: 150, unit: "шт" },
    { title: "Снятие обрешетки с паллета", price: 500, unit: "шт" },
  ],

  processing: [
    { title: "Бирка белая с биркодержателем", price: 10, unit: "шт" },
    { title: "Визуальная проверка на брак", price: 5, unit: "шт" },
    { title: "Полная проверка на брак", price: 16, unit: "шт" },
    { title: "Сложная проверка на брак", price: 25, unit: "шт" },
    { title: "Маркировка (печать + проклейка)", price: 4, unit: "шт" },
    { title: "Сбор товара в комплекты", price: 5, unit: "шт" },
  ],

  packing: [
    { title: "Укладка товара в короб", price: 30, unit: "короб" },
    { title: "Укладка товара на паллет", price: 100, unit: "паллет" },
    { title: "Укладка товара в пакет (наш)", price: 6, unit: "шт" },
    { title: "Укладка товара в пакет (клиента)", price: 7, unit: "шт" },
  ],

  logistics: [
    { title: "Доставка 1 короба (Коледино)", price: 300, unit: "короб" },
    { title: "Доставка 1 короба (Ozon)", price: 500, unit: "короб" },
    { title: "Доставка паллеты (Москва)", price: 2500, unit: "паллет" },
  ],

  storage: [
    { title: "Хранение 7 дней", price: 0, unit: "фикс" },
    { title: "Хранение >7 дней (до 1м3)", price: 50, unit: "сутки" },
    { title: "Хранение месяц (до 1м3)", price: 1000, unit: "фикс" },
  ],

  pickup: [
    { title: "Забор карго (1м3)", price: 2500, unit: "м3" },
    { title: "Забор самовыкупа", price: 50, unit: "шт" },
  ],

  other: [
    { title: "Паллетирование", price: 325, unit: "паллет" },
    { title: "Печать инструкций", price: 5, unit: "шт" },
    { title: "Погрузка паллета", price: 500, unit: "паллет" },
  ],
}
