FROM node:lts-alpine

WORKDIR /home/node/app
COPY package*.json yarn.lock /home/node/app/

RUN yarn
COPY . /home/node/app

EXPOSE 3000
CMD ["yarn", "dev"]
