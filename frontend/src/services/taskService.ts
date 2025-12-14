import axios from "axios";
import { Task, CreateTaskRequest } from "@/types/Task";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const taskService = {
  getAllTasks: async (): Promise<Task[]> => {
    try {
      const response = await apiClient.get<Task[]>("/tasks");
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },
  getTaskById: async (id: number): Promise<Task> => {
    try {
      const response = await apiClient.get<Task>(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error);
      throw error;
    }
  },
  createTask: async (taskData: CreateTaskRequest): Promise<Task> => {
    try {
      const response = await apiClient.post<Task>("/tasks", taskData);
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },
  updateTask: async (
    id: number,
    taskData: CreateTaskRequest
  ): Promise<Task> => {
    try {
      const response = await apiClient.patch<Task>(`/tasks/${id}`, taskData);
      return response.data;
    } catch (error) {
      console.error(`Error updating task ${id}:`, error);
      throw error;
    }
  },

  deleteTask: async (id: number): Promise<void> => {
    try {
      await apiClient.delete(`/tasks/${id}`);
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error);
      throw error;
    }
  },
};
