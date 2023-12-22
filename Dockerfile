FROM node:21-alpine3.18 as build-stage

WORKDIR /app

COPY package.json ./

RUN yarn config set registry https://registry.npm.taobao.org/


RUN yarn

COPY . .

RUN yarn build-only

# production stage
FROM nginx:stable-alpine  as production-stage

VOLUME ["/etc/nginx/cert"]

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /app


EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]