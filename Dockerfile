FROM node:latest

WORKDIR /app

ENV COMMAND "backlog -la"

COPY package*.json ./

RUN npm install
RUN npm install -g

COPY . .

CMD $COMMAND