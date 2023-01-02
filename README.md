# Simple API with docker

The fastest and best way to run this app is to downolad Docker.
App can run without docker but need extre configuration.
Application use Prisma to mapping models that we dont must write any SQL and in the future give us ease way to change database type.

---

**To run app with docker**

```
docker compose -f docker-compose.dev.yml up --build
```

**To run app with without docker you need**

- NODE V16
- MySql Server

Inside .env file add DATABASE_URL varieble to your Sql Server

Example:

```
DATABASE_URL="mysql://login:password@localhost:3306/dbname"
```

Ff you have database url then enter

```
npm install

npm run dev
```

---

###Database relation

![i](images/Firma.png)

#### USE TECHS

![TS](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![PRISMA](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white) ![DOCKER](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) ![MYSQL](https://img.shields.io/badge/MYsql-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
