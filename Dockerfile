# stage 1 building the code
FROM node:10 as builder
MAINTAINER <Garvit Joshi> "<garvitjoshi@hotmail.com>"
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# stage 2
FROM node:10
MAINTAINER <Garvit Joshi> "<garvitjoshi@hotmail.com>"
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --production

COPY --from=builder /usr/app/dist ./dist
COPY .env.dev .env
COPY swagger.json swagger.json

EXPOSE 8080
CMD node dist/index.js
