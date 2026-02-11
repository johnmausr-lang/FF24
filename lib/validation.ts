import { z } from 'zod';

// Валидация схемы для формы лидов
export const LeadFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Имя должно содержать минимум 2 символа' })
    .max(100, { message: 'Имя не может быть длиннее 100 символов' }),
  email: z
    .string()
    .email({ message: 'Введите корректный email' })
    .max(255),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: 'Введите корректный номер телефона' })
    .optional()
    .or(z.literal('')),
  company: z
    .string()
    .max(100)
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, { message: 'Сообщение должно быть минимум 10 символов' })
    .max(1000),
  consent: z
    .boolean()
    .refine(val => val === true, { message: 'Вы должны согласиться с политикой' }),
  subscribeNewsletter: z.boolean().optional(),
});

export type LeadFormData = z.infer<typeof LeadFormSchema>;

// Валидация email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Валидация телефона
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Санитизация input для предотвращения XSS
export const sanitizeInput = (input: string): string => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

// Форматирование номера телефона
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1,3})?(\d{3})?(\d{3})?(\d{4})?$/);

  if (!match) return phone;

  const formatted = [
    match[1] ? `+${match[1]}` : '',
    match[2] ? ` ${match[2]}` : '',
    match[3] ? `-${match[3]}` : '',
    match[4] ? `-${match[4]}` : '',
  ].join('');

  return formatted.trim();
};

// Форматирование даты
export const formatDate = (date: Date, locale = 'ru-RU'): string => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

// Получение дня недели
export const getDayOfWeek = (date: Date, locale = 'ru-RU'): string => {
  return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
};

// Преобразование размера файла
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

// Трансформация текста в slug
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/-+/g, '-');
};

// Цензура простые матюки
export const censorProfanity = (text: string): string => {
  const profanityList = ['badword1', 'badword2']; // добавить список
  let censored = text;

  profanityList.forEach(word => {
    const regex = new RegExp(word, 'gi');
    censored = censored.replace(regex, '*'.repeat(word.length));
  });

  return censored;
};

// Генерирование UUID
export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Делей функция для async операций
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Retry функция для API calls
export const retry = async <T,>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  delayMs = 1000
): Promise<T> => {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxAttempts) {
        await delay(delayMs * attempt);
      }
    }
  }

  throw lastError;
};

// Debounce функция
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Throttle функция
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
