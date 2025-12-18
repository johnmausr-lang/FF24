/** @type {import('next').NextConfig} */
const nextConfig = {
  // Включаем оптимизацию сборки
  reactStrictMode: true,
  
  // Разрешаем использование внешних изображений (если будут логотипы партнеров)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Помогает избежать ошибок с путями в некоторых окружениях
  typescript: {
    // Мы уже исправили ошибки в layout, но это подстраховка для деплоя
    ignoreBuildErrors: false, 
  },
  
  eslint: {
    // То же самое для линтера
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
