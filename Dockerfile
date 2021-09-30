FROM node:14

WORKDIR /app

RUN npm install nodemon -g

RUN npm install mocha -g

COPY package.json .

RUN npm install

COPY . .

CMD [ "nodemon", "." ]
