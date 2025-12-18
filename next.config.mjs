/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // важно для Telegram API и iframe карты
  images: {
    remotePatterns: [],
  },

  // App Router стабильно
  experimental: {
    appDir: true,
  },
}

export default nextConfig
