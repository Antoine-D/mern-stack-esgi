FROM node:10

RUN mkdir -p /app/server
WORKDIR /app/server

COPY package*.json /app/server/

RUN npm install

COPY . /app/server/

EXPOSE 8000

CMD [ "node", "server.js" ]