"use client";

import { useEffect, useState } from "react";
import { Task } from "@/types/Task";
import { taskService } from "@/services/taskService";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError(
        "Failed to load tasks. Make sure the API is running on http://localhost:3001"
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = () => {
    setEditingTask(null);
    fetchTasks();
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex flex-col max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Task Manager
            </h1>
            <p className="text-gray-600">
              Organize and manage your tasks efficiently
            </p>
          </div>

          {/* API Error Message */}
          {error && !isLoading && (
            <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-lg">
              <p className="font-medium mb-2">⚠️ Connection Error</p>
              <p className="text-sm">{error}</p>
              <button
                onClick={fetchTasks}
                className="mt-3 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded-md transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Task Form */}
          <TaskForm
            editingTask={editingTask}
            onSubmit={handleFormSubmit}
            onCancel={handleCancelEdit}
          />

          {/* Tasks Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {editingTask ? "All Tasks" : "Your Tasks"}
            </h2>
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onUpdate={fetchTasks}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
}
