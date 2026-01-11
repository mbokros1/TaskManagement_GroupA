FROM node:20-alpine
WORKDIR /app

COPY package*.json ./

COPY backend/package*.json ./backend/

RUN npm ci -w backend --ignore-scripts

COPY backend/ ./backend/

WORKDIR /app/backend

EXPOSE 5000
CMD ["npm", "run", "dev"]
