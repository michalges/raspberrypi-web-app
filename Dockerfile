FROM node:22-alpine

# RUN apk update && apk upgrade

RUN apk add --no-cache iproute2

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN npm prune --production

EXPOSE 8000

CMD ["npm", "start"]
