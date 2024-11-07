---
title: Using Prisma with Node.js <br/>in a Dockerized Environment
markmap: 
  colorFreezeLevel: 2 
  collapsed: false
  nodeMinHeight: 30
  # maxWidth: 300
  initialExpandLevel: 2
---

## Create project folder and Installation
  - ```sh 
      mkdir -p <project_folder>/backend
      cd <project_folder>/backend

      npm init -y
      npm i express prisma @prisma/client
      npx prisma init
    ```
## Create starter kit 
- `<project_folder>/backend/.env` 
  - ```sh 
      DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
    ```
  
- `<project_folder>/backend/prisma/schema.prisma`
  - ```js
      // This is your Prisma schema file,
      // learn more about it in the docs: https://pris.ly/d/prisma-schema

      generator client {
        provider = "prisma-client-js"
      }

      datasource db {
        provider = "postgresql"
        url      = env("DATABASE_URL")
      }

      //User with id as int autoincrement, name as string, email as string
      model User {
        id    Int    @id @default(autoincrement())
        name  String
        email String
      }
    ```
- `<project_folder>/backend/index.js` 
  - ```js 
      const express = require('express');
      const { PrismaClient } = require('@prisma/client');

      const prisma = new PrismaClient();
      const app = express();

      //use json
      app.use(express.json());

      //cors
      app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
      });

      //test api with error handling
      app.get('/test', (req, res, next) => {
        try {
          res.status(200).json({ message: 'Success!' });
        } catch (err) {
          next(err);
        }
      });

      //get all users
      app.get('/users', async (req, res, next) => {
        try {
          const users = await prisma.user.findMany();
          res.status(200).json(users);
        } catch (err) {
          next(err);
        }
      });

      //get user by id
      app.get('/users/:id', async (req, res, next) => {
        try {
          const user = await prisma.user.findUnique({
            where: { id: Number(req.params.id) },
          });
          res.status(200).json(user);
        } catch (err) {
          next(err);
        }
      });

      //create user
      app.post('/users', async (req, res, next) => {
        try {
          const user = await prisma.user.create({
            data: { ...req.body },
          });
          res.status(201).json(user);
        } catch (err) {
          next(err);
        }
      });

      //update user
      app.put('/users/:id', async (req, res, next) => {
        try {
          const user = await prisma.user.update({
            where: { id: Number(req.params.id) },
            data: { ...req.body },
          });
          res.status(200).json(user);
        } catch (err) {
          next(err);
        }
      });

      //delete user
      app.delete('/users/:id', async (req, res, next) => {
        try {
          const user = await prisma.user.delete({
            where: { id: Number(req.params.id) },
          });
          res.status(200).json(user);
        } catch (err) {
          next(err);
        }
      });

      //Start server
      const PORT = process.env.PORT || 4000;
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    ```

- generate the `Prisma schema`
  - ```sh 
      npx prisma generate
    ```
- Before we `dockerize` the backend, cat test it. 
  - Type in your terminal:
    - ```sh 
        node index.js
      ```
    - browser in browser 
      - ```sh
          http://localhost:4000/test 
        ```


## Make dockerize
- `.dockerignore` and add the following content:
  - ```sh 
      **/node_modules
    ```
- `<project_folder>/backend/backend.dockerfile`
  - ```sh 
      FROM node:20

      WORKDIR /app

      COPY package*.json ./

      RUN npm install

      COPY prisma ./prisma

      RUN npx prisma generate

      COPY . .

      EXPOSE 4000

      CMD ["node", "index.js"]
    ```
- `<project_folder>/compose.yaml`
  - ```sh 
      version: '3.9'

      services:
        backend:
          container_name: backend
          image: backend
          build:
            context: ./backend
            dockerfile: backend.dockerfile
          ports:
            - "4000:4000"
          environment:
            - DATABASE_URL=postgresql://postgres:postgres@db:5432/postgres?schema=public
          depends_on:
            - db
        db:
          container_name: pgdb
          image: postgres:12
          restart: always
          environment:
            POSTGRES_USER: postgres
            POSTGRES_PASSWORD: postgres
            POSTGRES_DB: postgres
          ports:
            - "5432:5432"
          volumes:
            - pgdata:/var/lib/postgresql/data

      volumes:
        pgdata: {}
    ```

- Build the `backend` image:
  - ```sh
      docker compose build
    ```
- Start the `backend` container:
  - ```sh 
      docker compose up -d backend
    ```
- Check if the container is running:
  - ```sh 
      docker ps -a
    ```

- Check database 
  - ```sh 
      docker exec -it pgdb psql -U postgres
      \dt
    ```
- Make migration 
  - ```sh 
      docker exec -it backend npx prisma migrate dev --name init
    ```
  - ```sh 
      docker exec -it pgdb psql -U postgres
      \dt
    ```

## Testing 
- will add users in 3 different ways.
  - add user using `Prisma Studio`
    - ```sh 
        cd <project_folder>/backend/
        npx prisma studio
      ```
    - This will open Prisma Studio in your browser at `http://localhost:5555` 
    - (Note: we are not using Docker to run Prisma Studio, we are running it directly on our machine).
    - Add a record: `Aung Thu Oo` and `example@gmail.com`
    - hit `Save 1 change`. You can leave Prisma Studio open in a tab, we will use it later.
    - If we make an http request to `http://localhost:4000/users` we should see 1 user (the one we just created using Prisma Studio).
      - ```json  
        [{
          "id" : "1",
          "name": "Aung Thu Oo",
          "email": "example@gmail.com"
        }]
        ```
  - add user using `Postman`
  - add user using `psql`
    - Let's insert another user using `psql`.
    - ```sh 
        cd <project_folder>/
        docker exec -it pgdb psql -U postgres
        \dt
      ```
    - ```sql  
        insert into "User" (name, email) values ('ATO developer', 'atodev@gmail.com');
        select * from "User";
      ```
    - check again on `Prisma Studio`, and we should see new users now:

# Ref: https://dev.to/francescoxx/javascript-fullstack-web-app-nextjs-docker-4d44