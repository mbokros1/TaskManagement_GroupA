FROM node:20-alpine
WORKDIR /app

COPY package*.json ./

COPY frontend/package*.json ./frontend/

RUN npm ci -w frontend --ignore-scripts

COPY frontend/ ./frontend/

WORKDIR /app/frontend

ENV NODE_ENV development
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
