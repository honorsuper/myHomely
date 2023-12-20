FROM node:21-alpine3.18 as build-stage

WORKDIR /app

COPY package.json ./

RUN npm config set registry https://registry.npm.taobao.org/


RUN npm install

COPY . .

RUN npm run build

# production stage
FROM nginx:stable-perl as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/myhomely.cn.csr /etc/nginx/cert/myhomely.cn.csr
COPY --from=build-stage /app/myhomely.cn.key /etc/nginx/cert/myhomely.cn.key

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]