"use client";

import { useState, useEffect } from "react";
import { Task } from "@/types/task";

interface Props {
  selectedTask: Task | null;
  onSave: (data: Omit<Task, "id">, id?: number) => void;
}

export default function TaskForm({ selectedTask, onSave }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selectedTask) {
      setName(selectedTask.name);
      setDescription(selectedTask.description);
    }
  }, [selectedTask]);

  const handleSubmit = () => {
    if (!name || !description) {
      alert("All fields required");
      return;
    }

    onSave({ name, description }, selectedTask?.id);
    setName("");
    setDescription("");
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {selectedTask ? "Edit Task" : "Create New Task"}
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Task Name
        </label>
        <input
          type="text"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter task name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Task Description
        </label>
        <textarea
          rows={4}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {selectedTask ? "Update Task" : "Add Task"}
      </button>
    </div>
  );
}
