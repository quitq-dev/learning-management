FROM node:16
EXPOSE 3000
WORKDIR /app
RUN yarn
COPY package.json ./
run yarn
COPY . .
CMD ["yarn", "dev"]

