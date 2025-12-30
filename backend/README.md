# Task Manager - Backend API

A robust and scalable Task Management API built with NestJS, TypeScript, and TypeORM.

## 📋 Project Overview

This is the backend service for the Task Manager application. It provides a RESTful API for managing tasks with full CRUD operations, validation, and error handling.

**API Base URL:** `http://localhost:3001`

## 🏗️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **NestJS** | ^10.0.0 | Progressive Node.js framework |
| **TypeScript** | ^5.1.3 | Type-safe language |
| **TypeORM** | ^0.3.x | ORM for database operations |
| **MySql** | - | Database |
| **Express** | ^4.x | HTTP server (integrated in NestJS) |
| **Class Validator** | ^0.14.x | DTO validation |
| **Class Transformer** | ^0.5.x | Object transformation |

## 📁 Project Structure

```
backend/
├── src/
│   ├── app.controller.spec.ts      # App controller tests
│   ├── app.controller.ts           # Main controller
│   ├── app.module.ts               # Root module
│   ├── app.service.ts              # Main service
│   ├── main.ts                     # Application entry point
│   ├── tasks/                      # Tasks feature module
│   │   ├── tasks.controller.spec.ts
│   │   ├── tasks.controller.ts     # Task endpoints
│   │   ├── tasks.module.ts         # Feature module
│   │   ├── tasks.service.spec.ts
│   │   ├── tasks.service.ts        # Business logic
│   │   └── dto/                    # Data Transfer Objects
│   │       ├── create-task-dto.ts  # Create validation
│   │       └── update-task-dto.ts  # Update validation
│   ├── typeorm/
│   │   └── entities/
│   │       └── Task.ts             # Task entity model
│   └── utils/
│       └── types.ts                # Shared type definitions
├── test/
│   ├── app.e2e-spec.ts            # End-to-end tests
│   └── jest-e2e.json               # E2E test config
├── eslint.config.mjs               # ESLint configuration
├── nest-cli.json                   # NestJS CLI config
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── tsconfig.build.json             # Build TypeScript config
└── README.md                       # This file
```

## 🔄 Architecture

### Module Structure

**AppModule (Root)**
```
AppModule
└── TasksModule
    ├── TasksController
    ├── TasksService
    └── Task Entity
```

### Request Flow

```
HTTP Request
    ↓
Router
    ↓
Controller (Validation)
    ↓
Service (Business Logic)
    ↓
TypeORM (Database)
    ↓
Response
```

## 📌 API Endpoints

### Task Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get task by ID |
| POST | `/tasks` | Create new task |
| PATCH | `/tasks/:id` | Update task |
| DELETE | `/tasks/:id` | Delete task |

### Request/Response Examples

**GET /tasks**
```json
Response: [
  {
    "id": 1,
    "name": "Task Name",
    "description": "Task Description",
    "createdAt": "2025-12-14T10:30:00Z"
  }
]
```

**POST /tasks**
```json
Request: {
  "name": "New Task",
  "description": "Task description"
}

Response: {
  "id": 2,
  "name": "New Task",
  "description": "Task description",
  "createdAt": "2025-12-14T10:35:00Z"
}
```

**PATCH /tasks/:id**
```json
Request: {
  "name": "Updated Task",
  "description": "Updated description"
}

Response: {
  "message": "Task updated successfully"
}
```

**DELETE /tasks/:id**
```json
Response: {
  "message": "Task deleted successfully"
}
```

## 🏃 Getting Started

### Prerequisites
- Node.js 18+ with npm
- Database (PostgreSQL, MySQL, SQLite, etc.)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Configure database
# Update .env file or database connection in main.ts
```

### Running the Application

```bash
# Development mode (with auto-reload)
npm run start:dev

# Production build
npm run build

# Production mode
npm run start:prod

# Single run (no watch)
npm run start
```

The API will be available at: **http://localhost:3001**


## 📝 Key Files Description

### Controllers

**tasks.controller.ts**
- Handles HTTP requests for task endpoints
- Validates request parameters and body
- Routes to appropriate service methods
- Returns formatted responses

### Services

**tasks.service.ts**
- Contains business logic for CRUD operations
- Manages database interactions via TypeORM
- Handles error scenarios and validation
- Returns data in expected format

### Entities

**Task.ts**
- Defines Task database model
- Specifies columns and relationships
- Uses TypeORM decorators
- Maps to 'tasks' table

### DTOs (Data Transfer Objects)

**create-task-dto.ts**
- Validates incoming create task requests
- Ensures name and description are provided
- Type-safe data structure

**update-task-dto.ts**
- Validates incoming update task requests
- Similar structure to create DTO
- Used for PATCH operations

### Types

**types.ts**
- `CreateTaskParams` - Type for creating tasks
- `UpdateTaskParams` - Type for updating tasks
- Shared across services and controllers

## 🗂️ Database Schema

### Tasks Table

```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Entity Mapping

```typescript
@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  createdAt: Date;
}
```

## 🔐 Validation & Error Handling

### Request Validation
- Uses class-validator for DTO validation
- Validates required fields
- Returns 400 Bad Request for invalid data

### Error Handling
- 404 Not Found - Task doesn't exist
- 500 Internal Server Error - Server errors
- Descriptive error messages for debugging

### Example Error Response
```json
{
  "statusCode": 404,
  "message": "Task ID 999 not found",
  "error": "Not Found"
}
```

## 📦 Dependencies

### Core Dependencies
```json
{
  "@nestjs/common": "^10.0.0",
  "@nestjs/core": "^10.0.0",
  "@nestjs/platform-express": "^10.0.0",
  "@nestjs/typeorm": "^10.0.0",
  "typeorm": "^0.3.x",
  "reflect-metadata": "^0.1.13",
  "rxjs": "^7.8.1"
}
```

### Development Dependencies
```json
{
  "@nestjs/cli": "^10.0.0",
  "@nestjs/schematics": "^10.0.0",
  "@types/express": "^4.17.x",
  "@types/jest": "^29.x.x",
  "@types/node": "^20.x.x",
  "@typescript-eslint/eslint-plugin": "^6.x.x",
  "eslint": "^8.x.x",
  "jest": "^29.x.x",
  "ts-jest": "^29.x.x",
  "ts-loader": "^9.x.x",
  "typescript": "^5.x.x"
}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Start in Production
```bash
npm run start:prod
```

The built application will be in the `dist/` directory.

### Environment Variables
Create a `.env` file for configuration:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=task_manager
API_PORT=3001
```

## 📋 Development Workflow

### Adding a New Feature

1. **Create Entity** - Define database model
2. **Create DTO** - Define request validation
3. **Create Service** - Implement business logic
4. **Create Controller** - Add HTTP endpoints
5. **Add Tests** - Write unit/e2e tests
6. **Update Module** - Register components

### Example: Adding a New Field

```typescript
// 1. Update Entity
@Column()
priority: string;

// 2. Update DTO
export class CreateTaskDto {
  name: string;
  description: string;
  priority: string;
}

// 3. Update Service
createTask(taskDetails: CreateTaskParams) {
  const newTask = this.taskRepository.create({
    ...taskDetails,
    createdAt: new Date(),
  });
  return this.taskRepository.save(newTask);
}

// 4. Controller automatically handles updated DTO
```


## ✅ Checklist

- ✅ NestJS framework setup
- ✅ TypeORM database integration
- ✅ Task CRUD operations
- ✅ Error handling
- ✅ Request validation
- ✅ Unit and E2E tests
- ✅ TypeScript support
- ✅ ESLint configuration

---




