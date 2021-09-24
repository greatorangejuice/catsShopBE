FROM node:12-alpine AS base

WORKDIR /app
COPY package*.json ./
RUN npm install

# BUILD
WORKDIR /app
COPY . .
RUN npm run build

# Application
FROM node:12-alpine as application

COPY --from=base /app/pachage*.json ./
RUN npm install --only=production
RUN npm install pm2 -g
COPY --from=base /app/dist ./dist

USER node
ENV PORT=8080
EXPOSE 8080

CMD ["pm2-runtime", "dist/main.js"]
