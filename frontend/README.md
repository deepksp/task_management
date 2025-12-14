# Task Manager Frontend

A modern, responsive task management application built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- ✅ Create, read, update, and delete tasks
- ✅ Real-time task management
- ✅ Responsive design (mobile-friendly)
- ✅ Error handling and loading states
- ✅ Beautiful UI with Tailwind CSS
- ✅ Type-safe with TypeScript
- ✅ Axios for API communication

## Project Structure

```
frontend/src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page component
├── components/
│   ├── TaskForm.tsx         # Form for creating/editing tasks
│   ├── TaskItem.tsx         # Individual task card
│   └── TaskList.tsx         # List of tasks
├── services/
│   └── taskService.ts       # API service with Axios
└── types/
    └── Task.ts              # TypeScript interfaces
```

## Prerequisites

- Node.js 18+ and npm/yarn
- Backend API running on `http://localhost:3001`

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the frontend directory (already provided):

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Change the API URL if your backend runs on a different port/URL.

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Integration

The application communicates with the backend API through the `taskService` located in `src/services/taskService.ts`.

### Available API Endpoints

- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get task by ID
- `POST /tasks` - Create new task
- `PATCH /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

## Components Overview

### TaskForm Component
Handles creating and editing tasks with form validation and error handling.

**Props:**
- `editingTask?: Task | null` - Task being edited (null for create mode)
- `onSubmit: () => void` - Callback when form is submitted
- `onCancel: () => void` - Callback when form is cancelled

### TaskList Component
Displays all tasks in a responsive grid layout with empty state.

**Props:**
- `tasks: Task[]` - Array of tasks to display
- `onEdit: (task: Task) => void` - Callback when edit is clicked
- `onDelete: (id: number) => void` - Callback when delete is clicked
- `onUpdate: () => void` - Callback to refresh tasks
- `isLoading?: boolean` - Loading state indicator

### TaskItem Component
Individual task card with edit and delete actions.

**Props:**
- `task: Task` - Task data to display
- `onEdit: (task: Task) => void` - Callback when edit is clicked
- `onDelete: (id: number) => void` - Callback when delete is completed
- `onUpdate: () => void` - Callback to refresh tasks

## Responsive Design

The application is fully responsive and works seamlessly on:
- 📱 Mobile devices (320px and above)
- 📱 Tablets (768px and above)
- 💻 Desktop (1024px and above)

## Technologies Used

- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Axios** - HTTP client

## Development Notes

- The app uses `'use client'` directive for client-side components
- State management is handled with React hooks (useState, useEffect)
- Error handling is implemented at the service level
- Loading states are shown during API operations
- Confirmation dialogs are used for destructive/details actions

## Troubleshooting

### API Connection Error
If you see "Connection Error" when the app loads:
1. Make sure the backend API is running on `http://localhost:3001`
2. Check your `.env.local` configuration
3. Click the "Retry" button to reconnect

### Port Already in Use
If port 3000 is already in use:
```bash
npm run dev -- -p 3001
```

## License

This project is part of the Task Manager application.
