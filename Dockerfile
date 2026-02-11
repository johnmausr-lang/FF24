# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем package files
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Строим приложение
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Устанавливаем dumb-init для корректной обработки сигналов
RUN apk add --no-cache dumb-init

# Копируем package files из builder
COPY --from=builder /app/package*.json ./

# Устанавливаем production зависимости только
RUN npm ci --only=production && \
    npm cache clean --force

# Копируем built приложение из builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env.local* ./

# Создаем non-root пользователя для безопасности
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

USER nextjs

# Expose порт
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Запуск приложения через dumb-init
ENTRYPOINT ["/sbin/dumb-init", "--"]
CMD ["npm", "start"]
