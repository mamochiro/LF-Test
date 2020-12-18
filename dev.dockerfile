FROM node:10.16.3-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package.json .
RUN yarn

# Bundle app source
COPY . .

# Exports
EXPOSE 3000
CMD [ "yarn", "dev" ]
