FROM node:10

# Create app directory
WORKDIR /app
COPY ./.next ./.next/
COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./public ./public/
COPY ./.env.local ./
COPY ./next.config.js ./

ENV NODE_ENV production

RUN yarn install

EXPOSE 3000

# start command
CMD [ "yarn", "start" ]
