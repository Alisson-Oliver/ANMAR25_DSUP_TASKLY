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
   git clone https://github.com/Alisson-Oliver/ANMAR25_DSUP_TASKLY.git
   cd ANMAR25_DSUP_TASKLY
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

### **1.1 - Tasks Route**

#### `POST /tasks - Create a new task card`

- **Request Body**

  ```json
  {
    "title": "task title",
    "status": "todo",
    "description": "task description",
    "priority": "low",
    "category": "task category"
  }
  ```

  The **status** field receives values ​​of the Enum type: **todo**, **in_progress**, **done**
  The **priority** field receives values of the Enum type: **low**, **medium**, **high**

  > Only the "title" is required

- **Success Response**

  - Status: `201 Created`
  - Body:
    ```json
    {
      "id": 1,
      "title": "task title",
      "description": "task description",
      "status": "todo",
      "priority": "low",
      "category": "task category",
      "created_at": "2025-04-22T21:55:08.202Z",
      "updated_at": "2025-04-22T21:55:08.202Z"
    }
    ```

- **Error Responses**

  - **400 Bad Request**: If mandatory data is not sent or is invalid

    ```json
    {
      "errors": [
        "'title' is required",
        "'description' cannot be empty",
        "Invalid enum value. Expected 'todo' | 'in_progress' | 'done', received 'dsadsa'",
        "Invalid enum value. Expected 'low' | 'medium' | 'high', received 'dsads'",
        "'category' cannot be empty"
      ]
    }
    ```

    - **500 Internal Server Error**: In case of server error.

    ```json
      {
         "errors": [
            "message": "an internal server error occurred"
         ]
      }
    ```

#### `GET /tasks - List all task cards`

#### Query Parameters (all optional):

| Param      | Example | Description                                                             |
| ---------- | ------- | ----------------------------------------------------------------------- |
| `status`   | `todo`  | Returns tasks with the specified status (`todo`, `in_progress`, `done`) |
| `priority` | `high`  | Returns tasks with the specified priority (`low`, `medium`, `high`)     |
| `title`    | `Task`  | Returns tasks with a part of the title                                  |
| `category` | `Work`  | Returns tasks in the specified category (Ex: `Work`, `Personal`, etc.)  |
| `page`     | `4`     | Defines the result page (default = 1 if not sent or invalid)            |
| `limit`    | `2`     | Number of items per page (default = 5, min = 1, max = 10)               |

#### Example Request

```http
GET /api/v1/tasks?status=todo&page=2&limit=2
```

- **Success Response**

  - Status: `200 OK`
  - Body:
    ```json
    {
      "count": 9,
      "pages": 5,
      "data": [
        {
          "id": 19,
          "title": "task title 2",
          "description": "task description 2",
          "status": "todo",
          "priority": "high",
          "category": "task category 2",
          "created_at": "2025-04-22T21:55:08.202Z",
          "updated_at": "2025-04-22T21:55:08.202Z"
        },
        {
          "id": 18,
          "title": "task title 1",
          "description": "task description 1",
          "status": "todo",
          "priority": "low",
          "category": "task category 1",
          "created_at": "2025-04-22T21:55:08.202Z",
          "updated_at": "2025-04-22T21:55:08.202Z"
        }
      ]
    }
    ```

- **Error Response**
  - **500 Internal Server Error**: In case of error when listing tasks.
    ```json
      {
         "errors": [
            "message": "an internal server error occurred"
         ]
      }
    ```

#### `GET /tasks/status/:status - Search cards by status`

- **Success Response**

  - Status: `200 OK`
  - Body:
    ```json
    {
      "data": {
        "tasks": [
          {
            "id": 4,
            "title": "Study Python",
            "description": "Studying python for tomorrow's test",
            "status": "todo",
            "priority": null,
            "category": "Studies",
            "created_at": "2025-04-22T20:16:16.843Z",
            "updated_at": "2025-04-22T20:16:16.843Z"
          },
          {
            "id": 5,
            "title": "Buy school supplies",
            "description": "Buy notebooks and pens",
            "status": "todo",
            "priority": "low",
            "category": "null",
            "created_at": "2025-04-22T20:17:12.168Z",
            "updated_at": "2025-04-22T20:17:12.168Z"
          }
        ]
      }
    }
    ```

- **Error Responses**
  - **400 Bad Request**: if the status is invalid.
    ```json
    {
      "error": "invalid status"
    }
    ```
  - **500 Internal Server Error**: In case of server error.
    ```json
      {
         "errors": [
            "message": "an internal server error occurred"
         ]
      }
    ```

#### `GET /tasks/:id - Get a specific task card`

- **Success Response**

  - Status: `200 OK`
  - Body:
    ```json
    {
      "id": 4,
      "title": "Study Python",
      "description": "Studying python for tomorrow's test",
      "status": "todo",
      "priority": null,
      "category": "Studies",
      "created_at": "2025-04-22T20:16:16.843Z",
      "updated_at": "2025-04-22T20:16:16.843Z"
    }
    ```

- **Error Responses**
  - **400 Bad Request**: if the ID is invalid or not sent.
    ```json
    {
      "error": "id is required"
    }
    ```
  - **404 Not Found**: If the task is not found.
    ```json
    {
      "error": "task not found"
    }
    ```
  - **500 Internal Server Error**: In case of server error.
    ```json
      {
         "errors": [
            "message": "an internal server error occurred"
         ]
      }
    ```

#### `PUT /tasks/:id - Update a task card`

- **Request Body**

  ```json
  {
    "title": "task title",
    "status": "todo",
    "description": "task description",
    "priority": "low",
    "category": "task category"
  }
  ```

  The **status** field receives values ​​of the Enum type: **todo**, **in_progress**, **done**
  The **priority** field receives values of the Enum type: **low**, **medium**, **high**

  > All fields are optional

- **Success Response**

  - Status: `204 No Content`
  - Body: No content returned.

- **Error Responses**
  - **400 Bad Request**: if the ID is invalid or not sent.
    ```json
    {
      "error": "id is required"
    }
    ```
  - **404 Not Found**: If the task is not found.
    ```json
    {
      "error": "task not found"
    }
    ```
  - **500 Internal Server Error**: In case of server error.
    ```json
      {
         "errors": [
            "message": "an internal server error occurred"
         ]
      }
    ```

#### `DELETE /tasks/:id - Delete a task card`

- **Success Response**

  - Status: `204 No Content`
  - Body: No content returned.

- **Error Responses**
  - **400 Bad Request**: if the ID is invalid or not sent.
    ```json
    {
      "error": "id is required"
    }
    ```
  - **404 Not Found**: If the task is not found.
    ```json
    {
      "error": "task not found"
    }
    ```
  - **500 Internal Server Error**: In case of server error.
    ```json
      {
         "errors": [
            "message": "an internal server error occurred"
         ]
      }
    ```

### **1.2 - Notes Route**

#### `POST /tasks/:taskId/notes - Create a new note for a task`

- **Request Body**

  ```json
  {
    "content": "Note content"
  }
  ```

  > The "content" field is required

- **Success Response**

  - Status: `201 Created`
  - Body:
    ```json
    {
      "id": 1,
      "taskId": 1,
      "content": "Note content"
    }
    ```

- **Error Responses**
  - **400 Bad Request**: If the task ID is not sent or is invalid.
    ```json
    {
      "error": "id is required"
    }
    ```
  - **404 Not Found**: If the task is not found.
    ```json
    {
      "error": "task not found"
    }
    ```
  - **500 Internal Server Error**: In case of server error.
    ```json
    {
         "errors": [
            "message": "an internal server error occurred"
         ]
      }
    ```

#### `GET /tasks/:taskId/notes - List all notes for a task`

- **Success Response**

  - Status: `200 OK`
  - Body:
    ```json
      {
         "data": {
            "notes": [
                  {
                     "id": 15,
                     "content": "Stretching before and after training",
                     "created_at": "2025-04-22T20:32:35.233Z",
                     "updated_at": "2025-04-22T20:32:35.233Z"
                  },
                  ...
               ]
         }
      }
    ```

- **Error Responses**
  - **400 Bad Request**: If the task ID is not sent or is invalid.
    ```json
    {
      "error": "id is required"
    }
    ```
  - **404 Not Found**: If the task is not found.
    ```json
    {
      "error": "task not found"
    }
    ```
  - **500 Internal Server Error**: In case of server error.
    ```json
    {
         "errors": [
            "message": "an internal server error occurred"
         ]
      }
    ```

#### `GET /notes/:id - Get a specific note`

- **Success Response**

  - Status: `200 OK`
  - Body:
    ```json
    {
      "id": 12,
      "content": "Resolve document problems",
      "created_at": "2025-04-22T20:32:13.309Z",
      "updated_at": "2025-04-22T20:32:13.309Z",
      "task": {
        "id": 8,
        "title": "Organize internship documents",
        "description": null,
        "status": "done",
        "priority": "high",
        "category": null,
        "created_at": "2025-04-22T20:18:24.171Z",
        "updated_at": "2025-04-22T20:26:38.426Z"
      }
    }
    ```

- **Error Responses**
  - **400 Bad Request**: If the task ID is not sent or is invalid.
    ```json
    {
      "error": "id is required"
    }
    ```
  - **404 Not Found**: If the task is not found.
    ```json
    {
      "error": "task not found"
    }
    ```
  - **500 Internal Server Error**: In case of server error.
    ```json
    {
         "errors": [
            "message": "an internal server error occurred"
         ]
      }
    ```

#### `PUT /notes/:id - Update a note`

- **Request Body**

  ```json
  {
    "content": "New note content"
  }
  ```

  > The "content" field is optional

- **Success Response**

  - Status: `204 No Content`
  - Body: No content returned.

- **Error Responses**
  - **400 Bad Request**: If the task ID is not sent or is invalid.
    ```json
    {
      "error": "id is required"
    }
    ```
  - **404 Not Found**: If the task is not found.
    ```json
    {
      "error": "task not found"
    }
    ```
  - **500 Internal Server Error**: In case of server error.
    ```json
    {
         "errors": [
            "message": "an internal server error occurred"
         ]
      }
    ```

#### `DELETE /notes/:id - Delete a note`

- **Success Response**

  - Status: `204 No Content`
  - Body: No content returned.

- **Error Responses**
  - **400 Bad Request**: If the task ID is not sent or is invalid.
    ```json
    {
      "error": "id is required"
    }
    ```
  - **404 Not Found**: If the task is not found.
    ```json
    {
      "error": "task not found"
    }
    ```
  - **500 Internal Server Error**: In case of server error.
    ```json
    {
         "errors": [
            "message": "an internal server error occurred"
         ]
      }
    ```

## 🤝 Contribution

### Workflow

1. Create a branch using Git Flow naming conventions (ex: `feature/example-task`).
2. Make your changes.
3. Commit using [Conventional Commits](https://www.conventionalcommits.org/).
