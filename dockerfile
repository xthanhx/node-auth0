FROM node:18-alpine

WORKDIR /app

COPY . /app

RUN rm -rf node_modules && rm yarn.lock
RUN yarn \
  && yarn cache clean\
	&& rm -rf

RUN yarn build

CMD ["yarn", "start"]