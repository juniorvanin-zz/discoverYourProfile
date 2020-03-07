FROM node:12 as build-deps
WORKDIR /usr/src/app
COPY . ./
RUN npm install
RUN npm rebuild node-sass
RUN npm run-script build

FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]