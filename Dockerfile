FROM node:16


WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 49160
CMD [ "node", "index.js" ]