# 🚀 FF24 - Premium Fulfillment Platform

Современная платформа для автоматизированной логистики маркетплейсов. Приемка, упаковка и отгрузка за 24 часа.

## ✨ Особенности

- 🎯 **High-Performance**: Оптимизирован для максимальной скорости загрузки
- 🔐 **Secure**: Встроенные механизмы безопасности и защиты данных
- 📱 **Responsive**: Идеально работает на всех устройствах
- 🎨 **Modern Design**: Glassmorphism, градиенты и плавные анимации
- 📊 **Analytics**: Встроенная поддержка Google Analytics и Яндекс.Метрики
- ♿ **Accessible**: Полная поддержка доступности (WCAG 2.1 AA)
- 🌐 **SEO Optimized**: Оптимизировано для поисковых систем
- 💬 **Contact Forms**: Встроенная система сбора лидов с валидацией

## 🛠️ Технологический стек

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Smooth animations
- **Three.js + React Three Fiber** - 3D graphics
- **Recharts** - Data visualization
- **Lucide React** - Icons library

### Backend & Services
- **Next.js API Routes** - Serverless functions
- **Nodemailer** - Email service
- **Zod** - Data validation
- **Vercel** - Deployment platform

### Developer Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Unit testing
- **Cypress** - E2E testing

## 📋 Требования

- Node.js >= 18.17.0
- npm >= 9.0.0
- Git

## 🚀 Быстрый старт

### 1. Клонирование репозитория

```bash
git clone https://github.com/johnmausr-lang/FF24.git
cd FF24
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Настройка окружения

Скопируйте `.env.local.example` в `.env.local`:

```bash
cp .env.local.example .env.local
```

Заполните переменные окружения:

```env
NEXT_PUBLIC_SITE_URL=https://ff-24.vercel.app
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
TELEGRAM_BOT_TOKEN=your_bot_token
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### 4. Запуск в режиме разработки

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### 5. Сборка для продакшена

```bash
npm run build
npm run start
```

## 📁 Структура проекта

```
FF24/
├── app/                      # Next.js app directory
│   ├── api/                 # API маршруты
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Главная страница
│   ├── territories/         # Страница территорий
│   └── globals.css          # Глобальные стили
├── components/              # React компоненты
│   ├── sections/           # Секции страниц
│   ├── ui/                 # UI компоненты
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ...
├── lib/                     # Утилиты и хелперы
│   ├── constants.ts        # Константы приложения
│   ├── utils.ts            # Общие утилиты
│   └── validation.ts       # Валидация данных
├── public/                  # Статические файлы
│   ├── videos/             # Видео файлы
│   ├── models/             # 3D модели
│   ├── sounds/             # Аудио файлы
│   ├── data/               # Данные JSON
│   └── manifest.json       # PWA манифест
├── package.json            # Зависимости
├── tsconfig.json           # TypeScript конфиг
├── tailwind.config.ts      # Tailwind конфиг
├── postcss.config.mjs      # PostCSS конфиг
└── next.config.mjs         # Next.js конфиг
```

## 🔧 Доступные скрипты

```bash
# Разработка
npm run dev              # Запуск dev сервера
npm run build            # Сборка для продакшена
npm run start            # Запуск prod сервера

# Проверка качества кода
npm run lint             # ESLint проверка
npm run type-check       # TypeScript проверка типов
npm run format           # Форматирование кода Prettier
npm run validate         # Все проверки сразу

# Тестирование
npm run test             # Запуск Jest тестов
npm run test:watch       # Watch режим тестов
npm run test:e2e         # Cypress E2E тесты

# Аналитика
npm run analyze          # Анализ размера bundle
```

## 🔐 Безопасность

### Реализованные механизмы защиты:

- **HTTPS/TLS**: Обязательное шифрование трафика
- **CSP Headers**: Content Security Policy для предотвращения XSS
- **CSRF Protection**: CSRF token валидация
- **Input Validation**: Валидация всех входящих данных (Zod)
- **Rate Limiting**: Защита от DDoS атак
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, и т.д.

### Для продакшена:

1. Используйте HTTPS везде
2. Установите все необходимые environment variables
3. Регулярно обновляйте зависимости
4. Используйте сильные пароли для сервисов
5. Включите мониторинг ошибок (Sentry)

## 🌐 SEO Оптимизация

Проект включает полную поддержку SEO:

- ✅ Динамические meta теги
- ✅ Open Graph интеграция
- ✅ JSON-LD структурированные данные
- ✅ Sitemap.xml генерация
- ✅ Robots.txt конфигурация
- ✅ Semantic HTML структура
- ✅ Alt теги для изображений

## 📊 Аналитика

### Поддерживаемые платформы:

- **Google Analytics 4** - Основная платформа
- **Яндекс.Метрика** - Для русскоязычной аудитории
- **Sentry** - Error tracking и мониторинг

Настройте ID в `.env.local`:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_YANDEX_METRIKA_ID=00000000
SENTRY_DSN=your_sentry_dsn
```

## 📧 Email система

Проект использует Nodemailer для отправки писем через SMTP.

### Настройка Gmail:

1. Включите 2FA на аккаунте Google
2. Создайте [App Password](https://support.google.com/accounts/answer/185833)
3. Используйте это пароль в `SMTP_PASS`

Конфигурация:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_char_app_password
```

## 🚀 Деплойемент

### Vercel (Рекомендуется)

1. Push код на GitHub
2. Подключите репозиторий к Vercel
3. Установите environment variables
4. Deploy!

```bash
git push origin main
```

### Docker

```bash
docker build -t ff24 .
docker run -p 3000:3000 ff24
```

### Самостоятельный хостинг

```bash
npm install
npm run build
npm run start
```

## 🤝 Контрибьютинг

Мы приветствуем контрибьютинг! Пожалуйста:

1. Форкните репозиторий
2. Создайте фичу бранч (`git checkout -b feature/AmazingFeature`)
3. Коммитьте изменения (`git commit -m 'Add some AmazingFeature'`)
4. Пушьте в бранч (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📝 Лицензия

Это проект распространяется под лицензией MIT. Смотрите файл `LICENSE` для деталей.

## 🆘 Поддержка

Если у вас есть вопросы или вы нашли баг:

- 💬 Telegram: [@manager24ff](https://t.me/manager24ff)
- 📧 Email: support@ff24.ru
- 🐛 GitHub Issues: [Создать issue](https://github.com/johnmausr-lang/FF24/issues)

## 🎯 Дорожная карта

- [ ] User Authentication система
- [ ] API интеграция с маркетплейсами
- [ ] Real-time уведомления (WebSocket)
- [ ] Мобильное приложение (React Native)
- [ ] GraphQL API
- [ ] Микросервисная архитектура
- [ ] AI-powered рекомендации

## 🙏 Спасибо

Спасибо всем, кто помогает делать этот проект лучше!

---

**Сделано с ❤️ FF24 Team**

![Next.js](https://img.shields.io/badge/Next.js-14.2-black)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4)
![License](https://img.shields.io/badge/license-MIT-green)
