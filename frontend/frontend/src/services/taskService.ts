import axios from "axios";
import { Task } from "@/types/task";

const API_URL = "http://localhost:3001/tasks";

export const getTasks = () => axios.get<Task[]>(API_URL);

export const getTaskById = (id: number) =>
  axios.get<Task>(`${API_URL}/${id}`);

export const createTask = (data: Omit<Task, "id">) =>
  axios.post(API_URL, data);

export const updateTask = (id: number, data: Omit<Task, "id">) =>
  axios.patch(`${API_URL}/${id}`, data);

export const deleteTask = (id: number) =>
  axios.delete(`${API_URL}/${id}`);
