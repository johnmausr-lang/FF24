// lib/validation.ts
import { z } from "zod";

export const LeadFormSchema = z.object({
  name: z.string().min(2, "Введите корректное имя"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  email: z.string().email("Неверный формат email").optional().or(z.literal("")),
});

export const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone: string) => {
  return phone.replace(/\D/g, '').length >= 10;
};

export const formatPhoneNumber = (value: string) => {
  const phone = value.replace(/\D/g, '');
  if (!phone) return '';
  if (phone.length < 2) return `+7`;
  if (phone.length < 5) return `+7 (${phone.slice(1)}`;
  if (phone.length < 8) return `+7 (${phone.slice(1, 4)}) ${phone.slice(4)}`;
  if (phone.length < 10) return `+7 (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7)}`;
  return `+7 (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9, 11)}`;
};
