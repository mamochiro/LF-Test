FROM node:10.16.3-alpine AS dependencies

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --production

RUN cp -R node_modules prod_node_modules

RUN yarn install

COPY . .
#----------------------------------#
FROM dependencies AS build

RUN yarn build
#----------------------------------#
FROM node:10.16.3-alpine AS release

RUN mkdir -p /app
WORKDIR /app

COPY --from=dependencies /app/prod_node_modules ./node_modules
COPY --from=dependencies /app/package.json .
COPY --from=dependencies /app/.sequelizerc .
COPY --from=dependencies /app/entrypoint.sh .
COPY --from=build /app/build ./build

RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
#----------------------------------#
