FROM node:latest

WORKDIR /app

RUN npm install -g backlog-cli-manager

CMD backlog --init