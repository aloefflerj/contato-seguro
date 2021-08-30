FROM node:10

WORKDIR /usr/app

COPY ./client/package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]