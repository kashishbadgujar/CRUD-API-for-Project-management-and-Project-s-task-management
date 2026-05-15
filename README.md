# Project Management CRUD API

Backend API for managing projects and their associated tasks, built with a scalable architecture using Node.js, Express.js, TypeScript, Sequelize ORM and PostgreSQL.

---

## Features

### Project Management
- Create new projects
- Fetch all projects
- Update existing project details
- Delete projects
- Input validation and error handling

### Task Management
- Create tasks under specific projects
- Fetch all tasks belonging to a project
- Fetch a single task by ID
- Update task details
- Delete tasks
- Project-task association handling using Sequelize relationships

---

## Technical Highlights

- Built with TypeScript
- Uses Express.js for API routing
- Uses Sequelize ORM for database operations
- PostgreSQL database integration
- Middleware validations
- Centralized error handling and logging
- RESTful API structure

---

## API Endpoints

### Project APIs

- `POST /api/projects/create` → Create project  
- `GET /api/projects` → Get all projects
- `GET /api/projects/:projectId` → Get project by ID 
- `PUT /api/projects/:projectId` → Update project  
- `DELETE /api/projects/:projectId` → Delete project  

### Task APIs

- `POST /api/projects/:projectId/tasks/create` → Create task under project  
- `GET /api/projects/:projectId/tasks` → Get all tasks of a project  
- `GET /api/tasks/:taskId` → Get single task by ID  
- `PUT /api/tasks/:taskId` → Update task  
- `DELETE /api/tasks/:taskId` → Delete task  

---
