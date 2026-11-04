import api from "./api";
import type { Task } from "../types/task";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// GET all tasks
export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get<ApiResponse<Task[]>>("/tasks");
  return response.data.data;
};

// GET task by ID
export const getTaskById = async (id: number): Promise<Task> => {
  const response = await api.get<ApiResponse<Task>>(`/tasks/${id}`);
  return response.data.data;
};

// CREATE task
export const createTask = async (
  task: Pick<Task, "title" | "description" | "priority">
): Promise<Task> => {
  const response = await api.post<ApiResponse<Task>>("/tasks", task);
  return response.data.data;
};

// UPDATE task
export const updateTask = async (
  id: number,
  task: Partial<Task>
): Promise<Task> => {
  const response = await api.put<ApiResponse<Task>>(`/tasks/${id}`, task);
  return response.data.data;
};

// DELETE task
export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};