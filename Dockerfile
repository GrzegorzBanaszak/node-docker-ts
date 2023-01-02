FROM node:16 as development

ARG DATABASE_URL=mysql://admin:Admin123@host.docker.internal:13306/mydb
ENV DATABASE_URL=${DATABASE_URL}

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

RUN npx prisma generate

FROM node:16 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json .

RUN npm i --onlu=production

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node","dist/index.js" ]