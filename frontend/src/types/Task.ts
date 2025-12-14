export interface Task {
  id: number;
  name: string;
  description: string;
  createdAt: string | Date;
}

export interface CreateTaskRequest {
  name: string;
  description: string;
}
