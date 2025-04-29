# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM node:23-alpine
WORKDIR /usr/src/app
copy . .
RUN npm install 

EXPOSE 8484/tcp
ENTRYPOINT [ "npm", "run", "start" ]
