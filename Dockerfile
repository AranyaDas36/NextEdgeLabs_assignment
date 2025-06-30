# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Debug: Print TypeScript version and list files
RUN npx tsc --version && ls -lR /app/src
RUN npm run build

# Stage 2: Production
FROM node:18-alpine AS prod
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev --ignore-scripts
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/index.js"] 