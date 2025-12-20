FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Estágio de produção
FROM node:20-alpine AS production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/src/migrations ./src/migrations

RUN chown -R nestjs:nodejs /app
USER nestjs

EXPOSE 3000

CMD ["node", "dist/main.js"]