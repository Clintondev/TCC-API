FROM node:18

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install

COPY . /app

ENV NODE_ENV=$NODE_ENV

CMD ["sh", "-c", "npm run start"]

