"use client";

import { useEffect, useState } from "react";
import { Task } from "@/types/task";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "@/services/taskService";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSave = async (data: Omit<Task, "id">, id?: number) => {
    id ? await updateTask(id, data) : await createTask(data);
    setSelectedTask(null);
    loadTasks();
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      <TaskForm selectedTask={selectedTask} onSave={handleSave} />

      <TaskList
        tasks={tasks}
        onEdit={setSelectedTask}
        onDelete={async (id) => {
          await deleteTask(id);
          loadTasks();
        }}
      />
    </main>
  );
}
