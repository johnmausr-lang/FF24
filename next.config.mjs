/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Убираем x-powered-by для безопасности
  poweredByHeader: false,
  
  experimental: {
    // Включаем оптимизацию CSS, так как пакет critters уже установлен
    optimizeCss: true,
  },

  // Игнорируем ошибки типов и ESLint только на этапе продакшн-билда на Vercel, 
  // если хотим, чтобы билд собирался максимально быстро
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
