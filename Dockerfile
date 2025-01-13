# Dockerfile
FROM node:18

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install

COPY . /app


CMD ["sh", "-c", "npm run start"]

