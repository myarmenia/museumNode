FROM node:20.14

WORKDIR /app

RUN npm install -g pm2

COPY package*.json ./

RUN npm install

COPY . .


EXPOSE 5000

CMD ["pm2", "start", "index.js", "--name", "node", "--no-daemon"]
