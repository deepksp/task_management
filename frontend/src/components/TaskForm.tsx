"use client";

import { Task, CreateTaskRequest } from "@/types/Task";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { taskService } from "@/services/taskService";

interface TaskFormProps {
  editingTask?: Task | null;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function TaskForm({
  editingTask,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTaskRequest>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (editingTask) {
      reset({
        name: editingTask.name,
        description: editingTask.description,
      });
    } else {
      reset({
        name: "",
        description: "",
      });
    }
    setError(null);
  }, [editingTask, reset]);

  const onFormSubmit = async (data: CreateTaskRequest) => {
    setError(null);
    setIsLoading(true);

    try {
      if (editingTask) {
        await taskService.updateTask(editingTask.id, data);
      } else {
        await taskService.createTask(data);
      }

      reset();
      onSubmit();
    } catch (err) {
      setError(editingTask ? "Failed to update task" : "Failed to create task");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="bg-white rounded-lg shadow-md p-6 mb-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {editingTask ? "Edit Task" : "Create New Task"}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Task Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter task name"
            disabled={isLoading}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 transition-colors ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            {...register("name", {
              required: "Task name is required",
              minLength: {
                value: 5,
                message: "Task name cannot be less than 5 characters",
              },
            })}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            placeholder="Enter task description"
            rows={4}
            disabled={isLoading}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 resize-none transition-colors ${
              errors.description
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            {...register("description", {
              required: "Task description is required",
              minLength: {
                value: 5,
                message: "Task description cannot be less than 5 characters",
              },
            })}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium rounded-lg transition-colors"
        >
          {isLoading
            ? "Processing..."
            : editingTask
            ? "Update Task"
            : "Create Task"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
