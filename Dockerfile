FROM node:17

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY package.json /usr/src/bot
# Need something to bind onto
COPY config.json.example /usr/src/bot/config.json

RUN npm i

COPY . /usr/src/bot

CMD ["node", "./src/index.js"]
