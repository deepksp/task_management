📝 Task Manager – Frontend Application

A Task Management frontend application built using Next.js, TypeScript, Tailwind CSS, and Axios, integrated with REST APIs to perform full CRUD operations.

🚀 Tech Stack

Framework: Next.js (App Router)

Language: TypeScript

Styling: Tailwind CSS

HTTP Client: Axios

State Management: React Hooks

API Style: REST

📌 Features

✅ Create new tasks

✅ View all tasks

✅ Edit existing tasks

✅ Delete tasks

✅ Responsive UI (mobile & desktop)

✅ Clean, professional UI

✅ Type-safe codebase


## 📁 Project Structure

```
frontend/
src/
 ├── app/
 │    └── page.tsx              # Main page
 ├── components/
 │    ├── TaskForm.tsx          # Create / Edit task form
 │    ├── TaskItem.tsx          # Individual task card
 │    └── TaskList.tsx          # Task listing component
 ├── services/
 │    └── taskService.ts        # Axios API service
 ├── types/
 │    └── task.ts               # Task TypeScript interface
 └── styles/

```


 🔗 API Endpoints Used


 | Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| GET    | `/tasks`     | Retrieve all tasks  |
| GET    | `/tasks/:id` | Retrieve task by ID |
| POST   | `/tasks`     | Create new task     |
| PATCH  | `/tasks/:id` | Update task         |
| DELETE | `/tasks/:id` | Delete task         |

⚙️ Setup Instructions

1️⃣ Clone Repository
```bash
git clone <repository-url>

cd frontend
 ```

2️⃣ Install Dependencies
```bash
npm install
 ```

3️⃣ Configure API URL
```bash
const API_URL = "http://localhost:3001/tasks";
```


## ▶️ Running the Application

**Development Mode**
  ```bash
  npm run dev
  ```

📍 Open in browser:
```bash
http://localhost:3000
 ```
