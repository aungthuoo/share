---
title: Node.js Docker <br/>development environment <br/>with hot code reloading
markmap: 
  colorFreezeLevel: 2 
  collapsed: false
  nodeMinHeight: 30
  # maxWidth: 300
  initialExpandLevel: 2
---

## Dev- Starter Kit simple(HMR)
- Project structure  
  - ```sh
      project/
      ├── app/
      │   └── server.js
      ├── docker-compose.yml
      └── package.json
    ```
- `app/server.js`
  - ```js
      // app/server.js
      const express = require('express');
      const app = express();
      const PORT = process.env.PORT || 1234;

      app.get('/', (req, res) => {
        res.send('Hello, Docker with hot reloading!');
      });

      app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
      });
    ```
- package.json 
  - ```json
      {
        "name": "docker-hot-reload-example",
        "version": "1.0.0",
        "main": "app/server.js",
        "scripts": {
          "dev": "nodemon app/server.js"
        },
        "dependencies": {
          "express": "^4.17.1"
        },
        "devDependencies": {
          "nodemon": "^2.0.22"
        }
      }
    ```
- docker-compose.yml
  - ```yaml
      version: '3'
        services:
          app:
            image: node:18
            working_dir: /usr/src/app
            volumes:
              - .:/usr/src/app  # Mounts the project for hot reloading
              - nodemodules:/usr/src/app/node_modules  # Uses named volume for node_modules
            environment:
              - NODE_ENV=development
            command: bash -c "npm install && npm run dev"
            ports:
              - "1234:1234"  # Maps container port to localhost

        volumes:
          nodemodules:
            driver: local  # Defines the named volume for node_modules
    ```
- Run the setup 
  - ```sh  
    ```

## Dev- Starter Kit advanced(with Prisma, Docker, HMR )
- Project structure diagram
  - ```sh
      project/
        ├── app/
        │   └── server.js
        ├── prisma/
        │   └── migrations  
        │     └── schema.prisma  
        ├── .env   
        ├── docker-compose.yml
        └── package.json
    ```
- Create project basic code 
  - `project/app/server.js` 
    - ```js
        const express = require('express');
        const { PrismaClient } = require('@prisma/client');

        const prisma = new PrismaClient();
        const app = express();

        // Use JSON parsing
        app.use(express.json());

        // CORS headers
        app.use((req, res, next) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
          next();
        });

        // Test API route with error handling
        app.get('/test', (req, res, next) => {
          try {
            res.status(200).json({ message: 'Success..3!' });
          } catch (err) {
            next(err);
          }
        });

        // Get all users
        app.get('/users', async (req, res, next) => {
          try {
            const users = await prisma.user.findMany();
            res.status(200).json(users);
          } catch (err) {
            next(err);
          }
        });

        // Get user by ID
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

        // Create user
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

        // Update user
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

        // Delete user
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

        // Start server
        const PORT = process.env.PORT || 1234;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
      ```
  - `project/prisma/migrations/schema.prisma` 
    - ```js
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



  - `project/.env` 
    - ```sh
        DATABASE_URL="postgresql://postgres:postgres@db:5432/postgres"
      ```
  - `docker-compose.yml` 
    - ```sh
        # version: '3.9'
        services:
          app:
            image: node:18
            working_dir: /usr/src/app
            volumes:
              - .:/usr/src/app  # Mounts the project for hot reloading
              - nodemodules:/usr/src/app/node_modules  # Named volume for node_modules
            environment:
              - NODE_ENV=development
            #command: bash -c "npm install && npm run dev"
            command: bash -c "npm install && npx prisma generate && npm run dev"
            ports:
              - "1234:1234"  # Maps container port to localhost
            depends_on:
              - db  # Ensures db service starts before app

          db:
            container_name: pgdb
            image: postgres:12
            restart: always
            environment:
              POSTGRES_USER: postgres
              POSTGRES_PASSWORD: postgres
              POSTGRES_DB: postgres
            ports:
              - "5432:5432"  # Expose PostgreSQL port
            volumes:
              - pgdata:/var/lib/postgresql/data  # Persist data in a named volume

        volumes:
          nodemodules:
            driver: local
          pgdata:
            driver: local
      ```
  - `package.json` 
    - ```sh
        {
          "name": "docker-hot-reload-example",
          "version": "1.0.0",
          "main": "app/server.js",
          "scripts": {
            "dev": "nodemon app/server.js"
          },
          "dependencies": {
            "express": "^4.17.1",
            "@prisma/client": "^4.0.0" 
          },
          "devDependencies": {
            "nodemon": "^2.0.22"
          }
        }
      ```
  - running 
    - ```sh 
        docker ps -a
        docker exec -it pgdb psql -U postgres
        \dt
        docker exec -it backend npx prisma migrate dev --name init
      ```

- Run the setup  
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



## Prod- Node.js deploy to Nginx
- Directory Structure
  - ```plaintext
      project-root
        ├── nginx
        │   └── default.conf
        ├── prisma
        │   └── schema.prisma
        ├── src
        │   └── index.js
        ├── .env
        ├── docker-compose.yml
        └── Dockerfile
    ```

- Prisma Schema (prisma/schema.prisma)
  - ```prisma
      // prisma/schema.prisma
      generator client {
        provider = "prisma-client-js"
      }

      datasource db {
        provider = "postgresql"
        url      = env("DATABASE_URL")
      }

      model User {
        id    Int     @id @default(autoincrement())
        name  String
        email String  @unique
      }
    ```

- Node.js Application (src/index.js)
  - ```javascript
      // src/index.js
      const express = require('express');
      const { PrismaClient } = require('@prisma/client');
      const prisma = new PrismaClient();

      const app = express();
      app.use(express.json());

      app.get('/', async (req, res) => {
        const users = await prisma.user.findMany();
        res.json(users);
      });

      app.post('/user', async (req, res) => {
        const { name, email } = req.body;
        const user = await prisma.user.create({ data: { name, email } });
        res.json(user);
      });

      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    ```

- Nginx Configuration (nginx/default.conf)
  - ```nginx
      # nginx/default.conf
      server {
          listen 80;

          location / {
              proxy_pass http://node:3000;
              proxy_http_version 1.1;
              proxy_set_header Upgrade $http_upgrade;
              proxy_set_header Connection 'upgrade';
              proxy_set_header Host $host;
              proxy_cache_bypass $http_upgrade;
          }
      }
    ```
- Dockerfile for Node.js
  - ```sh
      # Dockerfile
      FROM node:18

      WORKDIR /app

      COPY package*.json ./
      RUN npm install

      COPY . .

      EXPOSE 3000
      CMD ["node", "src/index.js"]
    ```

- Docker Compose File (docker-compose.yml)
  - ```yaml
        # docker-compose.yml
        version: '3.8'

        services:
          postgres:
            image: postgres:12
            environment:
              POSTGRES_USER: user
              POSTGRES_PASSWORD: password
              POSTGRES_DB: mydb
            volumes:
              - postgres_data:/var/lib/postgresql/data

          prisma:
            build: .
            environment:
              DATABASE_URL: postgresql://user:password@postgres:5432/mydb
            depends_on:
              - postgres

          node:
            build: .
            environment:
              DATABASE_URL: postgresql://user:password@postgres:5432/mydb
            ports:
              - "3000:3000"
            depends_on:
              - postgres
            volumes:
              - .:/app
              - /app/node_modules

          nginx:
            image: nginx:latest
            volumes:
              - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
            ports:
              - "80:80"
            depends_on:
              - node

        volumes:
          postgres_data:
      ```

- Environment Variables (.env)
  - ```plaintext
      DATABASE_URL=postgresql://user:password@postgres:5432/mydb
      PORT=3000\
    ```
- Run the Setup
  - ```bash
      docker-compose up -d
      docker-compose run prisma npx prisma migrate dev --name init
    ```


## Docker Testing 
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

## Docker volumes 
- __What are Docker Volumes?__
  - Docker volumes are `storage mechanisms` that:
    - Live on the host filesystem, <br/>outside of the container's file system.
    - Can persist data across container `reboots` or `deletions`.
    - Enable you to `share data between containers`.
    - `Support hot reloading`, <br/>where changes to code or files <br/>are reflected immediately in the running container.

- __Types of Docker Volumes__
  - __Anonymous Volumes__: Created automatically when you don’t specify a volume name.
  - __Named Volumes__: Created with a specific name, allowing reuse across containers.
  - __Bind Mounts__: Directly map a host directory to a container directory, <br/>typically used in development for hot reloading.

- Basic Docker Volume Commands
  - Create a Volume:
    - ```bash
        docker volume create my_volume
      ```
  - List Volumes:
    - ```bash
        docker volume ls
      ```
  - Inspect a Volume:
    - ```bash
        docker volume inspect my_volume
      ```
  - Remove a Volume:
    - ```bash
        docker volume rm my_volume
      ```
  - Remove Unused Volumes:
    - ```bash
        docker volume prune
      ```

- Using Volumes in Docker Containers
  - Volumes are defined in the docker run command <br/>or in a `docker-compose.yml` file.
  - Docker Run with Volumes:
    - ```sh
        docker run -d --name my_container -v my_volume:/app/data my_image 
      ```
    - This command maps my_volume to `/app/data` in the container.
  - Bind Mounting a Local Directory (Development):
    - ```sh
        docker run -d --name my_container -v $(pwd)/my_folder:/app my_image 
      ```
    - Here, `$(pwd)/my_folder` (the host path) is mapped to `/app` in the container, so changes to files in `my_folder` will appear in the container.

- Using Volumes with Docker Compose
  - In development, Docker Compose is particularly useful for setting up volumes with bind mounts.
  - ```sh 
      version: '3'
      services:
        app:
          image: node:16
          volumes:
            - ./my_folder:/app  # bind mount for hot reloading
            - my_data:/app/data  # named volume
          working_dir: /app
          command: npm run dev

      volumes:
        my_data: # This will be a named volume managed by Docker
    ```
  - `./my_folder:/app` is a bind mount that syncs the host folder to the container.
  - `my_data:/app/data` is a named volume, which Docker manages independently of the host file structure.

- Hot Reloading with Docker Compose
  - If you’re in development and want to avoid rebuilding the container each time you change code:
    - Use a bind mount (e.g., `./my_folder:/app`) to map your local code folder to the container.
    - Use tools like `nodemon` for `Node.js` or `webpack-dev-server` in React, so the application watches for file changes and reloads automatically.

- Benefits of Using Volumes
  - __Data Persistence__: Ensures data is not lost when a container stops or is deleted.
  - __Data Sharing__: Allows multiple containers to access the same data.
  - __Efficient Development__: By using bind mounts, you can make changes on your host machine and see them reflected immediately in the container, which speeds up the development process.
