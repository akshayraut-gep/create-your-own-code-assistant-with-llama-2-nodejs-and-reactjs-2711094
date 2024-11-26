FROM node:21-alpine AS builder

WORKDIR /app

COPY backend/package.json ./

RUN ["npm", "install", "--legacy--peer-deps"]

COPY backend/src ./src

RUN npm run build

FROM node:21-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["npm", "start"]

