FROM node:21-alpine3.18 as build-stage

WORKDIR /app

COPY package.json ./

RUN npm config set registry https://registry.npm.taobao.org/


RUN npm install

COPY . .

RUN npm run build

# production stage
FROM nginx:stable-perl as production-stage

VOLUME /Users/honorsuper/nginx/cert:/etc/nginx/cert

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/default.conf


EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]