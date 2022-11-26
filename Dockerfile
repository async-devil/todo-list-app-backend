FROM node:18.7.0-alpine

WORKDIR /usr/src/app

COPY package.json ./
RUN yarn install --production

COPY . .

EXPOSE 8080

RUN yarn build

RUN chmod +x ./scripts/start.sh
CMD ["/bin/sh", "./scripts/start.sh"]