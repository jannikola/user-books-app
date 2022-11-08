FROM node:12.18.1-alpine3.9

RUN rm -rf /var/cache/apk/* && \
    rm -rf /tmp/*

RUN apk update && \
    apk --no-cache add --virtual builds-deps build-base python3-dev python3

RUN npm install -g nodemon
RUN npm i -g typeorm
RUN npm install -g ts-node

WORKDIR /app

COPY ./package.json ./

COPY . .

RUN npm install