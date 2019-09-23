FROM node:10
WORKDIR /app
RUN npm install -g nodemon
COPY package.json /app
RUN npm install
COPY . /app
CMD npm start
EXPOSE 3000
