export type Marketplace = "Ozon" | "Wildberries" | "Яндекс Маркет"

export type ServiceKey =
  | "receiving"
  | "processing"
  | "packing"
  | "delivery"
  | "storage"
  | "pickup"
  | "other"

export const SERVICES: { key: ServiceKey; title: string; desc: string }[] = [
  { key: "receiving", title: "Приемка товара", desc: "Приемка, пересчёт, проверка." },
  { key: "processing", title: "Обработка товара", desc: "Маркировка, стикеровка, комплектация." },
  { key: "packing", title: "Упаковка", desc: "Упаковка по требованиям МП." },
  { key: "delivery", title: "Логистика до маркетплейсов", desc: "Доставка на склады/ПВЗ." },
  { key: "storage", title: "Хранение", desc: "Хранение короб/паллет." },
  { key: "pickup", title: "Забор товара", desc: "Забор у поставщика/из точки." },
  { key: "other", title: "Прочие услуги", desc: "Индивидуальные запросы." },
]

// ⚠️ сюда вставишь реальные цены из прайса FF24
export const PRICE = {
  perItemBase: 18,           // базовая обработка за единицу
  perPallet: 550,            // работа/объем (условно)
  services: {
    receiving: 6,            // доплата за услугу на единицу
    processing: 10,
    packing: 12,
    delivery: 9,
    storage: 300,            // за паллету
    pickup: 800,             // фикс
    other: 0,
  } as Record<ServiceKey, number>,
} as const

export const WAREHOUSE_ADDRESSES = [
  { title: "Курьеры", address: "Лодочная д. 5, 5 КПП" },
  { title: "Водители", address: "Лодочная д. 7, 6 КПП" },
] as const
