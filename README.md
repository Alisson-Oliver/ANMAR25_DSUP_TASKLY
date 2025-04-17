# 📃 To-Do List API

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/Alisson-Oliver/ANMAR25_DSUP_TASKLY/blob/main/LICENSE)

## 📘 Description

This API was developed using **Node.js,** **TypeScript**, and **TypeORM** to manage tasks in a **To-Do** list format. The application's goal is to **organize tasks based on their status, allow categorization, set priorities, and add notes to each task**. Each task can have multiple notes, while each note is associated with a single task.

## 💻 Technologies

![NodeJS](https://img.shields.io/badge/Node.js-v22.14.0-339933?style=for-the-badge&logo=node.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-5.1.0-000000?style=for-the-badge&logo=express&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/pg-16.8-336791?style=for-the-badge&logo=postgresql&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-28.1.0-2496ED?style=for-the-badge&logo=docker&logoColor=white) ![TypeORM](https://img.shields.io/badge/TypeORM-0.3.22-FE0803?style=for-the-badge&logo=typeorm&logoColor=white)

## 📦 Installation

### Prerequisites

- **Node.js** installed (v18 or higher recommended)
- Package manager (**npm** or **yarn**)
- **Docker** installed
- **Docker Compose** installed

1. Clone the repository:

   ```bash
   git clone https://github.com/Alisson-Oliver/ANMAR25_DSUP_TASKLY
   ```

2. **Run Docker Compose**:

The project includes a docker-compose.yml file to set up PostgreSQL in a Docker container. To start the database container, run:

```bash
docker-compose up -d
```

This command will start PostgreSQL in the background and expose the database on port `5433`.

3. **Configure the `.env` file**:

   Create a `.env` file at the root of the project with the following variables:

   ```env
   DB_HOST=localhost
   DB_PORT=5433
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_NAME=taskly
   SV_PORT=3000
   ```

   > Modify the environment values ​​if necessary.

4. **Install dependencies**:

   Once the Docker container is up and running, install the necessary dependencies:

   ```bash
   npm install
   ```

### Running the Project

1. **Run the development server**:

   For development purposes, run the following:

   ```bash
   npm run dev
   ```

   This will start the server using `nodemon` and automatically restart the server when you make changes to the code.

2. **Run in production**:

   If you're ready to run the project in production, compile the TypeScript files and start the server:

   ```bash
   npm run build
   npm start
   ```

   The compiled files will be in the `dist/` directory.

### Stopping Docker

To stop the Docker containers, use:

```bash
docker-compose down
```

This will shut down the PostgreSQL container.

## 🌐 API Endpoints

**1.1 - Tasks Route**

```shell
POST /tasks - Create a new task card
GET /tasks - List all task cards
GET /tasks/:id - Get a specific task card
GET /tasks/status/:status - Get task cards by status
PUT /tasks/:id - Update a task card
DELETE /tasks/:id - Delete a task card

```

**1.2 - Notes Route**

```shell
POST /tasks/:taskId/notes - Create a new note
GET /tasks/:taskId/notes - List all notes for a task
GET /notes/:id - Get a specific note
PUT /notes/:id - Update a note
DELETE /notes/:id - Delete a note

```

_In development..._

## 🤝 Contribution

### Workflow

1. Create a branch using Git Flow naming conventions (ex: `feature/example-task`).
2. Make your changes.
3. Commit using [Conventional Commits](https://www.conventionalcommits.org/).
